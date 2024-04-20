/* eslint-disable jsx-a11y/anchor-is-valid */
import { DriveDocument, DriveFolder } from '@/utils/types';
import FolderIcon from '@mui/icons-material/Folder';
import { Typography } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import {
    Dispatch,
    Fragment,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import TableRow from './TableRow';
interface ViewProps {
    documents: DriveDocument[];
    folders: DriveFolder[];
    handleSelectedValue: any;
    setMode: Dispatch<SetStateAction<'view' | 'move' | 'share' | 'newFolder'>>;
    setTarget: Dispatch<SetStateAction<any[]>>;
    setVisableRename: any;
    setVisableDelete: any;
    setCurrent: any;

}
export default function DriveTable(props: ViewProps) {
    const { documents, folders, handleSelectedValue,
        setMode = () => { },
        setTarget = () => { },
        setVisableRename,
        setVisableDelete,
        setCurrent,
    } = props;

    const router = useRouter();
    const [selectedValue, setSelectedValue] = React.useState<any>();
    const [selected, setSelected] = React.useState<readonly string[]>([]);

    return (
        <React.Fragment>
            <Sheet
                className="DriveContainer"
                variant="outlined"
                sx={{
                    display: { xs: 'initial', sm: 'initial' },
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    minHeight: 300,
                    maxHeight: 500
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    hoverRow
                    sx={{
                        bgcolor: '#fff',
                        // '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                        '--TableCell-paddingY': '4px',
                        '--TableCell-paddingX': '8px'
                    }}
                >
                    <thead>
                        <tr>
                            <th
                                style={{ width: 40, textAlign: 'center', padding: '12px 6px' }}
                            ></th>
                            <th style={{ width: "55%", padding: '12px 6px' }}>
                                <Typography startDecorator={<FolderIcon color="primary" />}>
                                    名稱
                                </Typography>
                            </th>
                            <th style={{ width: "12%", padding: '12px 6px' }}>標籤</th>
                            <th style={{ width: "8%", padding: '12px 6px' }}>動作</th>
                            <th style={{ padding: '12px 6px' }}>更新日期</th>
                            <th style={{ padding: '12px 6px' }}>擁有人</th>
                        </tr>
                    </thead>
                    <tbody>
                        {folders.map((row: any, index) => (
                            <TableRow
                                key={index}
                                doc={row}
                                type={'folders'}
                                setMode={setMode}
                                setTarget={setTarget}
                                setVisableRename={setVisableRename}
                                setVisableDelete={setVisableDelete}
                                setCurrent={setCurrent}
                                selectedValue={selectedValue}
                                setSelectedValue={setSelectedValue}
                                handleSelectedValue={handleSelectedValue}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        ))}
                        {documents.map((row: any, index) => (
                            <TableRow
                                key={index}
                                doc={row}
                                type={'documents'}
                                setMode={setMode}
                                setTarget={setTarget}
                                setVisableRename={setVisableRename}
                                setVisableDelete={setVisableDelete}
                                setCurrent={setCurrent}
                                selectedValue={selectedValue}
                                setSelectedValue={setSelectedValue}
                                handleSelectedValue={handleSelectedValue}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        ))}
                    </tbody>
                </Table>
            </Sheet>
        </React.Fragment>
    );
}
