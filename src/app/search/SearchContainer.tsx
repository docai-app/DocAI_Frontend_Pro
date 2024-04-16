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
        initialValues: {
            tag_id: '',
            content: '',
            date: '',
            from: '',
            to: '',
            page: 1
        },
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
                                    setSearchTreeData(jsonData.tree);
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
        searchDocumentFormik.setValues({
            content: '',
            date: '',
            tag_id: 'adafcb0d-79cd-4ef8-ad74-4ad77b73537a',
            from: '',
            to: '',
            page: 1
        });
        searchDocumentFormik.handleSubmit();
    };

    const gatTags = () => {
        getAllLabels().then((res) => {
            console.log(res.data);
        });
    };
    return (
        <SearchView
            {...{
                data,
                documents,
                handleSearch,
                searchTreeData,
                getAllLabelsData
            }}
        />
    );
}

export default SearchContainer;
