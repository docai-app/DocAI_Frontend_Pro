import { DocumentModel } from '@/models/Document';
import { Box } from '@mui/joy';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import DocumentCard from './DocumentCard';
import MyTreeView from './MyTreeView';

interface SearchRowProps {
    tree?: any;
    getAllLabelsData: any;
    documents: DocumentModel[];
}

const trees = [
    {
        subtree_title: 'DocAI - Roy Ho',
        children: [
            {
                id: 'be88691a-aee8-4e88-a114-aadc2785be86',
                storage_url:
                    'https://m2mda.blob.core.windows.net/chyb-document-storage/d6e77a24-8e78-4cc9-a658-07a56b8ed5a5_docai - roy ho.pdf',
                name: 'DocAI - Roy Ho.pdf'
            },
            {
                id: '1f66ee2f-6435-4ddb-8457-f1c430b361ff',
                storage_url:
                    'https://m2mda.blob.core.windows.net/chyb-document-storage/068ca2e7-b457-4061-897a-cf14bdcadcb7_docai - roy ho.jpg',
                name: 'DocAI - Roy Ho.jpg'
            },
            {
                id: 'c27b30ed-a690-4c66-8696-de2fb1cb1733',
                storage_url:
                    'https://m2mda.blob.core.windows.net/chyb-document-storage/04a34a49-9a1f-4397-baf6-378772cecd66_58f9ce92faa44a24f59122cacf3a87f8.jpeg',
                name: '58f9ce92faa44a24f59122cacf3a87f8.jpeg'
            },
            {
                id: 'c55d1af7-46b2-4491-a47a-c2b336bb2db2',
                storage_url:
                    'https://m2mda.blob.core.windows.net/chyb-document-storage/8b9b5e86-2881-4f9d-b811-b328717bd59a_wechatimg2626.jpeg',
                name: 'WechatIMG2626.jpeg'
            },
            {
                id: 'cdf066cf-8fbf-4b76-ab3a-2402d40e81d0',
                storage_url:
                    'https://m2mda.blob.core.windows.net/chyb-document-storage/a0680e68-4f11-46a9-bd85-5ebea7f7e37e_docai - roy ho.pdf',
                name: 'DocAI - Roy Ho.pdf'
            }
        ]
    },
    {
        subtree_title: 'Alice Corporation - Kazuki Yamamoto',
        children: [
            {
                id: '015bbb46-0a70-44fb-b5da-fd6249be6f79',
                storage_url:
                    'https://m2mda.blob.core.windows.net/chyb-document-storage/aa87022e-8038-41e2-9219-cf61e2e29943_kazuki yamamoto.jpg',
                name: 'Kazuki Yamamoto.jpg'
            }
        ]
    },
    {
        subtree_title: 'MJSSEYA - Bobby Lian',
        children: [
            {
                id: '912b9bbe-7f90-4bb4-8cac-9ed04ddd8237',
                storage_url:
                    'https://m2mda.blob.core.windows.net/chyb-document-storage/006462a6-b714-4147-bce7-7ffd9ca8fec6_image.jpg',
                name: 'image.jpg'
            }
        ]
    }
];

export default function SearchRow(props: SearchRowProps) {
    const { tree = [], getAllLabelsData, documents } = props;
    const [objectDocuments, setObjectDocuments] = useState<any>();

    useEffect(() => {
        if (documents && documents.length > 0) {
            setObjectDocuments(_.keyBy(documents, 'id'));
        }
    }, [documents]);

    const ifChildren = (document: any, deep: number) => {
        // 判断是否为最后一层
        if (document?.children) {
            return (
                <>
                    <div
                        className={
                            deep == 0
                                ? 'text-black font-bold text-l border-b-2 border-black'
                                : 'text-black border-b-2 border-black'
                        }
                    >
                        {document?.subtree_title}
                    </div>
                    <div
                        className={
                            document?.children &&
                            document.children.length > 0 &&
                            document.children[0]?.subtree_title
                                ? 'flex flex-col'
                                : 'flex flex-row flex-wrap'
                        }
                    >
                        {document?.children?.map((child: any, index: number) => {
                            return (
                                <div key={index} className="">
                                    {' '}
                                    {ifChildren(child, deep + 1)}
                                </div>
                            );
                        })}
                    </div>
                </>
            );
        } else {
            const _document = objectDocuments && document?.id && objectDocuments[document?.id];
            return (
                <DocumentCard
                    key={document.id}
                    document={_document}
                    getAllLabelsData={getAllLabelsData}
                />
            );
        }
    };

    return (
        <>
            {tree && tree.length > 0 && documents && documents.length > 0 && (
                <div className="flex scroll-smooth">
                    <div className="text-sm bg-white shadow-md border  border-neutral-300 rounded-[2px] pr-2 py-2 w-1/5  min-h-[500px]  pl-5 pt-2">
                        <MyTreeView
                            tree={tree}
                            documents={documents}
                            objectDocuments={objectDocuments}
                        />
                    </div>
                    <div className="w-4/5">
                        <Box
                            sx={{
                                display: 'grid',
                                gap: 2,
                                mx: 2,
                                flexDirection: 'row'
                            }}
                        >
                            {tree.map((children: any, index: number) => {
                                return (
                                    <div key={index} className="">
                                        {ifChildren(children, 0)}
                                    </div>
                                );
                            })}
                        </Box>
                    </div>
                </div>
            )}
        </>
    );
}
