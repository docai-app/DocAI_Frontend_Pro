'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import { DocumentModel } from '@/models/Document';
import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SearchView from './SearchView';

const apiSetting = new Api();

function SearchContainer() {
    const [data, setData] = React.useState();
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();
    const [documents, setDocuments] = useState<DocumentModel[]>([]);
    const [meta, setMeta] = useState([]);
    const [searchTreeData, setSearchTreeData] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState({
        tag_id: '',
        content: '',
        date: '',
        from: '',
        to: '',
        page: 1
    });

    const [{ data: getAllLabelsData, error: getAllLabelsError }, getAllLabels] = useAxios(
        apiSetting.Tag.getAllTags(),
        { manual: true }
    );

    const [
        {
            data: searchDocumentByContentData,
            loading: searchDocumentByContentLoading,
            error: searchDocumentByContentError,
            response: searchDocumentByContentResponse
        },
        searchDocumentByContent
    ] = useAxios(apiSetting.Search.searchDocumentByTagContent(), {
        manual: true
    });

    useEffect(() => {
        gatTags();
    }, [router]);

    // useEffect(() => {
    //     if (searchDocumentByContentData && searchDocumentByContentData.success === true) {
    //         console.log('searchDocumentByContentData', searchDocumentByContentData);
    //         setDocuments(searchDocumentByContentData.documents);
    //         setMeta(searchDocumentByContentData.meta);
    //     } else if (searchDocumentByContentData && !searchDocumentByContentData.success) {
    //         console.log('searchDocumentByContentData', searchDocumentByContentData);

    //     }
    // }, [searchDocumentByContentData]);

    const searchDocumentFormik = useFormik({
        initialValues: searchParams,
        onSubmit: async (values) => {
            const res = await searchDocumentByContent({
                params: {
                    ...values
                }
            });
            if (res.data) {
                const fetchData = async () => {
                    const response = await fetch('/api/stream/tree', {
                        method: 'POST',
                        headers: {
                            accept: 'text/event-stream',
                            'Content-Type': 'application/json',
                            Connection: 'keep-alive'
                        },
                        body: JSON.stringify({ documents: res.data.documents })
                    });

                    if (response.body) {
                        // console.log('Response body:', response.body);
                        const reader = response.body.getReader();
                        const decoder = new TextDecoder();
                        setLoading(false);
                        try {
                            while (true) {
                                const { done, value } = await reader.read();
                                if (done) break;
                                const rawData = decoder.decode(value);
                                // console.log('Raw data:', rawData);
                                const data = rawData.replace(/^data: ?/, '');
                                let jsonData: any = {};
                                try {
                                    jsonData = JSON.parse(data);
                                } catch (error) {
                                    continue;
                                }
                                if (jsonData && jsonData.tree) {
                                    setSearchTreeData(jsonData.tree.tree);
                                }
                                if (jsonData && jsonData.storage_url) {
                                    setDocuments(jsonData?.storage_url?.documents);
                                }
                            }
                        } catch (error) {
                            console.error('Stream reading failed:', error);
                        }
                    }
                };

                fetchData();
            }
        }
    });

    const handleSearch = () => {
        if (!searchParams.tag_id) {
            setAlert({ title: '請選擇標籤', type: 'info' });
            return;
        }
        // console.log('searchParams', searchParams);
        setLoading(true);
        searchDocumentFormik.setValues(searchParams);
        searchDocumentFormik.handleSubmit();
    };

    const gatTags = () => {
        getAllLabels();
    };
    return (
        <SearchView
            {...{
                data,
                documents,
                handleSearch,
                searchTreeData,
                getAllLabelsData,
                searchParams,
                setSearchParams,
                loading
            }}
        />
    );
}

export default SearchContainer;
