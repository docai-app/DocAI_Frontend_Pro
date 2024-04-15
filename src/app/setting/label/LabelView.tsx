import { Box, Breadcrumbs, Link, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import LabelTable from '../../../components/OrderTable/LabelTable';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

interface ViewProps {
    loading: boolean;
    addNewLabelHandler: any;
    addNewLabelData: any;
    getAllLabelsData: {
        tags: {
            id: string;
            name: string;
            taggings_count: number;
            updated_at: string;
            created_at: string;
        }[];
    };
    setNewLabelName: any;
    newLabelName: string;
    updateLabelNameByIdHandler: any;
    tagTypes: any;
    updateTagFunctionsHandler: any;
    deleteTagFunctionsHandler: any;
    updateTagFeatureHandler: any;
}

function LabelView(props: ViewProps) {
    const {
        loading,
        getAllLabelsData,
        addNewLabelHandler,
        newLabelName,
        setNewLabelName,
        updateLabelNameByIdHandler,
        tagTypes,
        updateTagFunctionsHandler,
        deleteTagFunctionsHandler,
        updateTagFeatureHandler
    } = props;
    const [sortedLabels, setSortedLabels] = useState<any[]>([]);
    const [sortedUnCheckLabels, setSortedUnCheckLabels] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [tag, setTag] = useState('');

    const [label, setLabel] = useState<any>();
    const [chainFeatureIsOpen, setChainFeatureIsOpen] = useState(false);
    const [chain_feature_ids, set_chain_feature_ids] = useState<any>([]);
    const handleSave = (chain_feature_ids: any) => {
        updateTagFeatureHandler(label?.id, chain_feature_ids);
    };

    useEffect(() => {
        if (label) {
            set_chain_feature_ids(label?.meta?.chain_features || []);
        }
    }, [label]);

    useEffect(() => {
        if (getAllLabelsData) {
            setSortedLabels(
                _.filter(getAllLabelsData.tags, function (o: any) {
                    return o.is_checked;
                })
            );

            setSortedUnCheckLabels(
                _.filter(getAllLabelsData.tags, function (o: any) {
                    return !o.is_checked;
                })
            );
        }
    }, [getAllLabelsData]);


    return (
        <>
            {/* <CssVarsProvider disableTransitionOnChange>
                <CssBaseline /> */}
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
                    {/* <Breadcrumbs
                        size="sm"
                        aria-label="breadcrumbs"
                        separator={<ChevronRightRoundedIcon />}
                        sx={{ pl: 0 }}
                    >
                        <Link underline="none" color="neutral" href="/" aria-label="Home">
                            <HomeRoundedIcon />
                        </Link>
                        <Typography color="primary" fontWeight={500} fontSize={12}>
                            Label
                        </Typography>
                    </Breadcrumbs> */}

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
                        <Button color="primary" variant="plain"
                            startDecorator={<KeyboardArrowLeftIcon />}
                        >
                            返回
                        </Button>
                        <Typography level="h2" component="h1">
                            標籤管理
                        </Typography>
                        <Button
                            color="primary"
                            startDecorator={<FileDownloadOutlinedIcon />}
                            size="sm"
                        >
                            新增
                        </Button>
                    </Box>

                    <LabelTable />
                    <Typography level="h3">待查核標籤</Typography>
                    <LabelTable />
                </Box>
            </Box>
            {/* </CssVarsProvider> */}
        </>
    );
}

export default LabelView;
