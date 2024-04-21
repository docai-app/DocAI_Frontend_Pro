/* eslint-disable jsx-a11y/anchor-is-valid */
import Api from '@/apis';
import { Label, SmartExtractionSchema } from '@/utils/types';
import { CircleStackIcon } from '@heroicons/react/20/solid';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import * as React from 'react';
import TableRow from './TableRow';

interface ViewProps {
    visibleRadio?: boolean;
    getAllLabelsData: any;
    smart_extraction_schemas: SmartExtractionSchema[];
    handleSelectedValue?: any;
    handleFilterLabel: any;
}
const apiSetting = new Api();
export default function SchemaTable(props: ViewProps) {
    const { visibleRadio = false, getAllLabelsData, smart_extraction_schemas, handleSelectedValue, handleFilterLabel } = props;

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState<SmartExtractionSchema>();


    const renderFilters = () => (
        <React.Fragment>
            <FormControl size="sm">
                <FormLabel>標籤</FormLabel>
                <Select
                    size="sm"
                    placeholder="請選擇標籤"
                    slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                >
                    <Option value="" onClick={() => {
                        handleFilterLabel(null)
                    }}>{"數據總表"}</Option>
                    {getAllLabelsData?.tags?.map((tag: Label, index: number) => (
                        <Option key={index} value={tag?.id}
                            onClick={() => {
                                handleFilterLabel(tag)
                            }}
                        >{tag?.name} {tag?.smart_extraction_schemas_count > 0 && `(${tag?.smart_extraction_schemas_count})`}</Option>
                    ))}
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
                    minHeight: 300
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
                            {visibleRadio &&
                                <th
                                    style={{ width: 30, textAlign: 'center', padding: '12px 6px' }}
                                ></th>
                            }
                            <th style={{ width: 300, padding: '12px 6px' }}>
                                <Typography startDecorator={<CircleStackIcon className="h-5 text-gray-400 " />}>
                                    名稱
                                </Typography>
                            </th>
                            <th style={{ width: 200, padding: '12px 6px' }}>標籤</th>
                            <th style={{ width: 120, padding: '12px 6px' }}>更新日期</th>
                            <th style={{ width: 100, padding: '12px 6px' }}>擁有人</th>
                            {!visibleRadio &&
                                <th style={{ width: 30, padding: '12px 6px' }}> </th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {smart_extraction_schemas?.map(
                            (row: SmartExtractionSchema) => (
                                <TableRow
                                    key={row.id}
                                    row={row}
                                    selectedValue={selectedValue}
                                    setSelectedValue={setSelectedValue}
                                    visibleRadio={visibleRadio}
                                    handleSelectedValue={handleSelectedValue}
                                />
                            )
                        )}
                    </tbody>
                </Table>
            </Sheet>
        </React.Fragment>
    );
}
