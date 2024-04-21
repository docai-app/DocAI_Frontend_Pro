import { DriveDocument } from '@/utils/types';
import { Box, Checkbox, Chip, Link, Typography } from '@mui/joy';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import Dropdowns from './Dropdowns';

import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

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
    setCheckedData?: any;
    checked?: boolean;
}
export default function TableRow(props: TableRowProps) {
    const {
        doc,
        type,
        setMode = () => {},
        setTarget = () => {},
        setVisableDelete,
        setVisableRename,
        setCurrent,
        selectedValue,
        setSelectedValue,
        handleSelectedValue,
        setCheckedData,
        checked
    } = props;
    const router = useRouter();

    const url = doc.storage_url || `/drive/${doc.id}`;

    const check = (e: any) => {
        setCheckedData(type, e.target.checked, e.target.value);
    };

    return (
        <>
            <tr key={doc.id} data-id={doc.id} data-type={type}>
                <td style={{ textAlign: 'center', width: 40 }}>
                    <Checkbox
                        size="sm"
                        checked={checked}
                        value={doc.id}
                        onChange={(e) => {
                            check(e);
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
                            <Link color="neutral" href={url} target="_blank" rel="noreferrer">
                                {doc.name}
                            </Link>
                        )}
                    </Typography>
                </td>
                <td>
                    {type !== 'folders' &&
                    doc?.is_classified === false &&
                    doc?.labels?.length == 0 ? (
                        <Chip color="danger" sx={{ fontSize: 12 }}>
                            {'未分類'}
                        </Chip>
                    ) : (
                        doc?.labels?.map((label: any, index: number) => {
                            return (
                                <Chip key={index} color="success" sx={{ fontSize: 12 }}>
                                    {label?.name}
                                </Chip>
                            );
                        })
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
                <td>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Dropdowns
                            type={type}
                            url={url}
                            name={doc?.name}
                            share={() => {
                                setMode('share');
                                setTarget([doc]);
                            }}
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
                    </Box>
                </td>
            </tr>
        </>
    );
}
