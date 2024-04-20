import { useRouter } from 'next/navigation';
import { DriveDocument } from '@/utils/types';
import { Box, Checkbox, Chip, Link, Typography } from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import moment from 'moment';
import Dropdowns from './Dropdowns';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ShareSharpIcon from '@mui/icons-material/ShareSharp';

interface TableRowProps {
    doc: DriveDocument;
    type: 'documents' | 'folders';
    setMode: Dispatch<SetStateAction<'view' | 'move' | 'share' | 'newFolder'>>;
    setTarget: any;
    setVisableDelete?: any;
    setVisableRename: any;
    setCurrent?: any;
    selectedValue: any;
    setSelectedValue: any;
    handleSelectedValue: any;
    setSelected: any;
    selected: any;
}
export default function TableRow(props: TableRowProps) {
    const {
        doc,
        type,
        setMode = () => { },
        setTarget = () => { },
        setVisableDelete,
        setVisableRename,
        setCurrent,
        selectedValue,
        setSelectedValue,
        handleSelectedValue,
        setSelected, //setCheckedData
        selected,   //checked 
    } = props;
    const router = useRouter();

    const url = doc.storage_url || `/drive/${doc.id}`;

    return (
        <>
            <tr key={doc.id}
                data-id={doc.id}
                data-type={type}
            >
                <td style={{ textAlign: 'center', width: 120 }}>
                    {/* <Radio
                        size="sm"
                        checked={selectedValue?.id === doc.id}
                        onChange={(event) => {
                            setSelectedValue(doc);
                            handleSelectedValue(doc);
                        }}
                        name="radio-buttons"
                    /> */}
                    <Checkbox
                        size="sm"
                        checked={selected.includes(doc.id)}
                        color={selected.includes(doc.id) ? 'primary' : undefined}
                        onChange={(event) => {
                            setSelected((ids: any) =>
                                event.target.checked
                                    ? ids.concat(doc.id)
                                    : ids.filter((itemId: any) => itemId !== doc.id)
                            );
                        }}
                        slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                        sx={{ verticalAlign: 'text-bottom' }}
                    />
                </td>
                <td>
                    <Typography
                        level="body-xs"
                        startDecorator={
                            type === 'documents' ? (
                                <InsertDriveFileIcon color="info" />
                            ) : (
                                <FolderIcon color="primary" />
                            )
                        }
                    >
                        {type === 'folders' ? (
                            <Link color="neutral" href={`${url}?name=${doc.name}`}>
                                {doc.name}
                            </Link>
                        ) : (
                            <Link color="neutral" href={url}
                                target="_blank"
                                rel="noreferrer">
                                {doc.name}
                            </Link>
                        )}
                    </Typography>
                </td>
                <td>
                    {type !== 'folders' &&
                        doc?.is_classified === false &&
                        doc?.labels?.length == 0 ? (
                        <Chip
                            color="danger"
                            sx={{ fontSize: 12 }}>
                            {'未分類'}
                        </Chip>
                    ) : (
                        doc?.labels?.map((label: any, index: number) => {
                            return (
                                <Chip
                                    key={index}
                                    color="success"
                                    sx={{ fontSize: 12 }}>
                                    {label?.name}
                                </Chip>
                            );
                        })
                    )}
                </td>
                <td style={{ display: 'flex' }}>
                    <Dropdowns
                        type={type}
                        url={url}
                        name={doc?.name}
                        rename={() => {
                            setVisableRename(true);
                            setCurrent({
                                id: doc?.id,
                                name: doc?.name,
                                type: type
                            });
                        }}
                        move={() => {
                            setMode('move');
                            setTarget([doc]);
                            setCurrent({
                                id: doc?.id,
                                name: doc?.name,
                                type: type
                            });
                        }}
                        remove={() => {
                            setVisableDelete(true);
                            setCurrent({
                                id: doc?.id,
                                name: doc?.name,
                                type: type
                            });
                        }}
                        openItems={() => {
                            router.push(`/document/chat?document_id=${doc.id}`);
                        }}
                    />
                    {type === 'folders' && (
                        <IconButton size='sm' sx={{ borderRadius: "50%" }}
                            onClick={() => {
                                setMode('share');
                                setTarget([doc]);
                            }}>
                            <ShareSharpIcon />
                        </IconButton>
                    )}
                </td>
                <td>
                    <Typography level="body-xs">
                        {moment(doc.updated_at).format('YYYY/MM/DD')}
                    </Typography>
                </td>
                <td>
                    <Typography level="body-xs">{doc.user?.nickname}</Typography>
                </td>
            </tr>
        </>
    );
}
