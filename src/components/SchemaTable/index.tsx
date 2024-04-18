/* eslint-disable jsx-a11y/anchor-is-valid */
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Dropdown from '@mui/joy/Dropdown';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import * as React from 'react';

import { SmartExtractionSchema } from '@/utils/types';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import SearchIcon from '@mui/icons-material/Search';
import { Chip } from '@mui/joy';
import Radio from '@mui/joy/Radio';
import moment from 'moment';


function RowMenu() {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm', 'z-index': 100 } }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                <MenuItem>編輯</MenuItem>
                <Divider />
                <MenuItem color="danger">刪除</MenuItem>
            </Menu>
        </Dropdown>
    );
}

interface ViewProps {
    getAllLabelsData: any;
    getAllSchemasData: any;
    handleSelectedValue: any;
}
export default function SchemaTable(props: ViewProps) {
    const {
        getAllLabelsData,
        getAllSchemasData,
        handleSelectedValue
    } = props

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState<SmartExtractionSchema>();
    const renderFilters = () => (
        <React.Fragment>
            <FormControl size="sm">
                <FormLabel>標籤</FormLabel>
                <Select
                    size="sm"
                    placeholder="Filter by status"
                    slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                >
                    <Option value="paid">Paid</Option>
                    <Option value="pending">Pending</Option>
                    <Option value="refunded">Refunded</Option>
                    <Option value="cancelled">Cancelled</Option>
                </Select>
            </FormControl>
        </React.Fragment>
    );
    return (
        <React.Fragment>
            <Sheet
                className="SearchAndFilters-mobile"
                sx={{
                    display: { xs: 'flex', sm: 'none' },
                    my: 1,
                    gap: 1
                }}
            >
                <Input
                    size="sm"
                    placeholder="Search"
                    startDecorator={<SearchIcon />}
                    sx={{ flexGrow: 1 }}
                />
                <IconButton
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    onClick={() => setOpen(true)}
                >
                    <FilterAltIcon />
                </IconButton>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
                        <ModalClose />
                        <Typography id="filter-modal" level="h2">
                            Filters
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {renderFilters()}
                            <Button color="primary" onClick={() => setOpen(false)}>
                                Submit
                            </Button>
                        </Sheet>
                    </ModalDialog>
                </Modal>
            </Sheet>
            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                    borderRadius: 'sm',
                    py: 2,
                    display: { xs: 'none', sm: 'flex' },
                    flexWrap: 'wrap',
                    gap: 1.5,
                    '& > *': {
                        minWidth: { xs: '120px', md: '160px' }
                    }
                }}
            >
                <FormControl sx={{ flex: 1 }} size="sm">
                    <FormLabel>Search for schema</FormLabel>
                    <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
                </FormControl>
                {renderFilters()}
            </Box>
            <Sheet
                className="OrderTableContainer"
                variant="outlined"
                sx={{
                    display: { xs: 'initial', sm: 'initial' },
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
                            <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>

                            </th>
                            <th style={{ width: 300, padding: '12px 6px' }}>
                                名稱
                            </th>
                            <th style={{ width: 200, padding: '12px 6px' }}>標籤</th>
                            <th style={{ width: 120, padding: '12px 6px' }}>更新日期</th>
                            <th style={{ width: 120, padding: '12px 6px' }}>擁有人</th>
                            {/* <th style={{ width: 50, padding: '12px 6px' }}> </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {getAllSchemasData?.smart_extraction_schemas?.map((row: SmartExtractionSchema) => (
                            <tr key={row.id}>
                                <td style={{ textAlign: 'center', width: 120 }}>
                                    <Radio
                                        size='sm'
                                        checked={selectedValue?.id === row.id}
                                        onChange={(event) => {
                                            setSelectedValue(row)
                                            handleSelectedValue(row)
                                        }}
                                        name="radio-buttons"
                                    />
                                </td>
                                <td>
                                    <Typography level="body-sm" sx={{ fontWeight: 'bold' }}>{row.name}</Typography>
                                </td>
                                <td>
                                    <Typography level="body-xs">
                                        <Chip color='success' sx={{
                                            fontSize: 12
                                        }}>
                                            {row.has_label ? row.label.name : '數據總表'}
                                        </Chip>

                                    </Typography>
                                </td>
                                <td>
                                    <Typography level="body-xs">{moment(row.updated_at).format("YYYY-MM-DD")}</Typography>
                                </td>
                                <td>
                                    <Typography level="body-xs">{row.user.nickname}</Typography>
                                </td>
                                {/* <td>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <RowMenu />
                                    </Box>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Sheet>
        </React.Fragment>
    );
}
