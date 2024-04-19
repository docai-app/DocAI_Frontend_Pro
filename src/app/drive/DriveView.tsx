import { Box, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import DriveTable from '../../components/drive/DriveTable';
import SearchLabelDocumentForm from '../../components/drive/SearchLabelDocumentForm';

import BreadCrumb from '@/components/drive/BreadCrumb';
import { DriveDocument, DriveFolder } from '@/utils/types';
import Add from '@mui/icons-material/Add';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

interface DriveViewProps {
    id: any;
    name: string | null;
    allDrivesData: any;
    documents: DriveDocument[];
    folders: DriveFolder[];
    getAllLabelsData: any;
}
export default function DriveView(props: DriveViewProps) {
    const { id, name, allDrivesData, documents, folders, getAllLabelsData } = props;

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                    component="main"
                    className="MainContent"
                    sx={{
                        px: { xs: 2, md: 6 },
                        pt: {
                            xs: 'calc(12px + var(--Header-height))',
                            sm: 'calc(12px + var(--Header-height))',
                            md: 3
                        },
                        pb: { xs: 2, sm: 2, md: 3 },
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        height: '100dvh',
                        gap: 1
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            mb: 1,
                            gap: 1,
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'start', sm: 'center' },
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'
                        }}
                    >
                        {allDrivesData && (
                            <BreadCrumb
                                ancestors={allDrivesData?.ancestors}
                                id={id?.toString()}
                                name={name?.toString()}
                            />
                        )}
                        <Typography level="h2">文件倉庫</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                gap: 1,
                                width: '20%'
                            }}
                        >
                            {/* <Link fontWeight={500} fontSize={12} color="primary" underline="always">
                                智能文檔處理
                            </Link> */}
                            <Button
                                size="sm"
                                color="primary"
                                startDecorator={<Add />}
                                endDecorator={<KeyboardDoubleArrowDownIcon />}
                            >
                                新增
                            </Button>
                        </Box>
                    </Box>

                    <DriveTable
                        {...{
                            documents,
                            folders,
                            handleSelectedValue: () => {}
                        }}
                    />

                    <SearchLabelDocumentForm
                        getAllLabelsData={getAllLabelsData}
                        search={undefined}
                    />
                </Box>
            </Box>
        </>
    );
}
