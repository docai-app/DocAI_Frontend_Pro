import { XMarkIcon } from '@heroicons/react/24/outline';
import { Box, Card, Link, Typography, Chip, Button, Input } from '@mui/joy';
import useAlert from '../../hooks/useAlert';
import { ChangeEvent, useRef, useState } from 'react';


interface UploadOperateProps {
    myfiles: [];
    setMyFiles: any;
    setDocuments: any;
    setDisable: any;
    selectName: string;
    multiple?: boolean;
}
export default function UploadOperate(props: UploadOperateProps) {
    const { myfiles, setMyFiles, setDocuments, setDisable, selectName, multiple } = props;

    const fileInput = useRef<HTMLInputElement>(null);
    const { setAlert } = useAlert();

    const readableSize = (size: number) => {
        if (size > 1000000) return `${Math.round(size / 1000000)}MB`;
        if (size > 1000) return `${Math.round(size / 1000)}kB`;
        return `${size}B`;
    };

    const deleteAll = () => {
        if (fileInput.current != null) fileInput.current.value = '';
        setDocuments([]);
        setMyFiles([]);
        setDisable(true)
    };
    const deleteOne = (index: number) => {
        const fileListArr = Array.from(myfiles);
        if (myfiles?.length as Number == 1) { setDisable(true) }
        fileListArr.splice(index, 1); // here u remove the file
        setDocuments(fileListArr);
        setMyFiles(fileListArr);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Set the selected maximum file limit to 50 files:
        if (event.target.files && event.target.files.length > 50) {
            setAlert({ title: '最多只能上傳50個文檔', type: 'warning' });
            return;
        } else if (event.target.files && event.target.files.length > 0) {
            setDisable(false)
            setDocuments(event.target.files);
            setMyFiles(event.target.files);
        }
    };


    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>已選擇
                    <Typography color="primary" sx={{ mx: 1 }}>{myfiles?.length}</Typography>份文檔
                </Typography>
                <Link underline="always" color="danger" onClick={deleteAll}>全部刪除</Link>
            </Box>

            <div className={`flex flex-row flex-wrap items-center mb-8 w-full ${myfiles?.length == 0 ? 'justify-center' : ''}`}>
                {myfiles != null &&
                    Array.from(myfiles)?.map((doc: any, index) => {
                        return (
                            <div
                                key={`file_${doc.name}`}
                                className="w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/5 h-60 p-2 flex relative z-10"
                            >
                                <div className="w-full h-full rounded-lg border-2 border-dashed border-neutral-200 bg-neutral-50 shadow-sm">
                                    {doc.type.includes('image/') ? (
                                        <div className="h-40 flex items-center">
                                            <img
                                                alt="Image Preview"
                                                src={URL.createObjectURL(doc)}
                                                className="rounded-lg shadow-sm object-contain object-center h-full w-full"
                                            />
                                        </div>
                                    ) : null}
                                    {doc.type.includes('application/pdf') ? (
                                        <object
                                            className="w-full h-40 flex justify-center items-center"
                                            type="application/pdf"
                                            data={URL.createObjectURL(doc)}
                                        >
                                            <img
                                                alt="PDF Preview"
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png"
                                                className="rounded-lg shadow-sm object-contain object-center h-20"
                                            />
                                        </object>
                                    ) : null}
                                    <div className="p-2">
                                        <div className="text-sm text-neutral-900 whitespace-nowrap text-ellipsis overflow-hidden">
                                            {doc.name}
                                        </div>
                                        <div className="text-sm">
                                            大小：{readableSize(doc.size)}
                                        </div>
                                    </div>
                                </div>
                                <div className=" absolute flex -right-1 -top-1">
                                    <button
                                        type="button"
                                        className="cursor-pointer inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => deleteOne(index)}
                                    >
                                        {/* <label className="cursor-pointer h-5 w-5">X</label> */}
                                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    {/* <label className=' cursor-pointer p-10 text-white bg-red-500 text-center justify-center items-center rounded-full'>X</label> */}
                                </div>
                            </div>
                        );
                    })}

                <div className="w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/5 h-56 m-2 relative flex flex-col justify-center items-center text-gray-500 bg-white border-4 border-dashed border-gray-200 rounded-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20 stroke-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                    </svg>
                    <div className="flex justify-center items-center">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                            <p className="px-4">{selectName}</p>
                            <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                multiple={multiple}
                                // accept="image/*,.pdf"
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                ref={fileInput}
                            />
                        </label>
                    </div>
                    <span className="mt-2 block text-sm font-medium text-center">支持20MB大小的文件</span>
                </div>

            </div>
        </>
    );
}
