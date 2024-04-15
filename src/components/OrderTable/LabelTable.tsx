/* eslint-disable jsx-a11y/anchor-is-valid */
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Dropdown from '@mui/joy/Dropdown';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Sheet from '@mui/joy/Sheet';
import { ColorPaletteProp } from '@mui/joy/styles';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import _ from 'lodash';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';

const rows = [
    {
        id: 'a65ae4d7-2d3e-46fd-a611-dd061e69bf2b',
        name: "生產部文件",
        is_checked: true,
        smart_extraction_schemas_count: 0,
        functions: [
            {
                title: "一般審批",
            }
        ],
        meta: { chain_features: [] },
    },
    {
        id: "0b4ae534-b227-4dbb-8884-2614393c027d",
        name: '11月的請假表',
        functions: [],
        is_checked: true,
        smart_extraction_schemas_count: 0,
        meta: { chain_features: [] },
    },
    {
        id: "056b73e5-26cb-431e-8a42-fd77a8c1c511",
        name: 'CHYB請假表',
        functions: [
            {
                title: "表格深度理解",
            },
            {
                title: "一般審批"
            }
        ],
        is_checked: true,
        smart_extraction_schemas_count: 0,
        meta: {
            chain_features: ["2", "7", "11", 27],
        },
    },
    {
        id: "056b73sse5-26cb-431e-8a42-fd77a8c1c511",
        name: 'CHYB請假表2',
        functions: [
            {
                title: "表格深度理解",
            },
            {
                title: "一般審批"
            }
        ],
        is_checked: false,
        smart_extraction_schemas_count: 0,
        meta: {
            chain_features: ["2", "7", "11", 27],
        },
    }
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


export default function OrderTable() {
    const [order, setOrder] = React.useState<Order>('desc');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    return (
        <React.Fragment>
            <Sheet
                className="OrderTableContainer"
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
                        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                        '--TableCell-paddingY': '4px',
                        '--TableCell-paddingX': '8px'
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ width: 80, padding: '12px 6px' }}>
                                <Link
                                    underline="none"
                                    color="primary"
                                    component="button"
                                    onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                                    fontWeight="lg"
                                    endDecorator={<ArrowDropDownIcon />}
                                    sx={{
                                        '& svg': {
                                            transition: '0.2s',
                                            transform:
                                                order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)'
                                        }
                                    }}
                                >
                                    名稱
                                </Link>
                            </th>
                            <th style={{ width: 140, padding: '12px 6px' }}> 功能</th>
                            <th style={{ width: '20%', padding: '12px 6px' }}> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {stableSort(rows, getComparator(order, 'id')).map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <Link
                                        color="primary"
                                        underline="hover"
                                        href={`/search?content=&tag_id=${row?.id}&from=&to=`}
                                    >
                                        {row.name}
                                    </Link>
                                </td>
                                <td>
                                    {_.join(_.map(row?.functions, 'title'), ', ')}
                                    {row?.smart_extraction_schemas_count > 0 && (
                                        <>、數據提取({row?.smart_extraction_schemas_count || 0})</>
                                    )}
                                    {row?.meta?.chain_features?.length > 0 && (
                                        <>、推薦功能({row?.meta?.chain_features?.length || 0})</>
                                    )}
                                </td>

                                <td>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        gap: 2, 
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Link
                                            level="body-xs"
                                            href={`/document/extraction/${row?.id}`}
                                        >
                                            编辑
                                        </Link>

                                        {row && !row?.is_checked && (
                                            <Button
                                                size={"sm"}
                                                endDecorator={<AddToPhotosOutlinedIcon />}
                                                onClick={() => {
                                                    console.log('加到名单！')
                                                }}
                                            >
                                                加到名單
                                            </Button>
                                        )}
                                    </Box>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Sheet>
        </React.Fragment>
    );
}
