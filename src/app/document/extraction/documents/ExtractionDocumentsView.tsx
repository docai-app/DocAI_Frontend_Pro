import { Box, Breadcrumbs, Link, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import Router, { useRouter } from 'next/navigation';
import SchemaList from '../../../../components/document/extraction/SchemasList';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Add from '@mui/icons-material/Add';

interface ViewProps {
    open: boolean;
    setOpen: any;
    label: any;
    smart_extraction_schemas: [];
    meta: any;
}

function ExtractionDocuementsView(props: ViewProps) {
    const { open, setOpen, label, smart_extraction_schemas, meta } = props;
    const router = useRouter();

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
                        gap: 1
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            mb: 1,
                            mr: 3,
                            gap: 1,
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'start', sm: 'center' },
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Button
                            color="primary"
                            variant="plain"
                            startDecorator={<KeyboardArrowLeftIcon />}
                            onClick={() => {
                                router.back();
                            }}
                        >
                            返回
                        </Button>

                        <Typography level="h2" component="h1">
                            數據總表
                        </Typography>
                    </Box>

                    <Box>
                        <SchemaList
                            label={label}
                            smart_extraction_schemas={smart_extraction_schemas}
                            meta={meta}
                            has_label={false}
                        />
                    </Box>
                    {/* <div className="max-w-7xl mx-auto h-[calc(100vh-18.5rem)] px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between mb-4  ">
                                <label
                                    className=" px-4 py-2 rounded-md cursor-pointer text-indigo-500"
                                    onClick={() => {
                                        router.back();
                                    }}
                                >
                                    {'<'} 返回
                                </label>
                                <label className="text-2xl font-bold">數據總表</label>
                                <label>{''}</label>
                            </div>
                            <div className="my-2">
                                <SchemaList
                                    label={label}
                                    smart_extraction_schemas={smart_extraction_schemas}
                                    meta={meta}
                                    has_label={false}
                                />
                            </div>
                        </div>
                    </div> */}
                </Box>
            </Box>
        </>
    );
}
export default ExtractionDocuementsView;
