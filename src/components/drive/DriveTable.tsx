/* eslint-disable jsx-a11y/anchor-is-valid */
import { DriveDocument, DriveFolder } from '@/utils/types';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import TableRow from './TableRow';

interface ViewProps {
    documents: DriveDocument[];
    folders: DriveFolder[];
    handleSelectedValue: any;
}
export default function DriveTable(props: ViewProps) {
    const { documents, folders, handleSelectedValue } = props;

    const router = useRouter();
    const [selectedValue, setSelectedValue] = React.useState<any>();

    return (
        <React.Fragment>
            <Sheet
                className="DriveContainer"
                variant="outlined"
                sx={{
                    display: { xs: 'none', sm: 'initial' },
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    minHeight: 0
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
                                style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}
                            ></th>
                            <th style={{ width: 300, padding: '12px 6px' }}>名稱</th>
                            <th style={{ width: 200, padding: '12px 6px' }}>標籤</th>
                            <th style={{ width: 120, padding: '12px 6px' }}>更新日期</th>
                            <th style={{ width: 120, padding: '12px 6px' }}>擁有人</th>
                        </tr>
                    </thead>
                    <tbody>
                        {folders.map((row: any, index) => (
                            <TableRow
                                key={index}
                                doc={row}
                                type={'folders'}
                                selectedValue={selectedValue}
                                setSelectedValue={setSelectedValue}
                                handleSelectedValue={handleSelectedValue}
                            />
                        ))}
                        {documents.map((row: any, index) => (
                            <TableRow
                                key={index}
                                doc={row}
                                type={'documents'}
                                selectedValue={selectedValue}
                                setSelectedValue={setSelectedValue}
                                handleSelectedValue={handleSelectedValue}
                            />
                        ))}
                    </tbody>
                </Table>
            </Sheet>
        </React.Fragment>
    );
}
