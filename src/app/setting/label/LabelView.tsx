import useLoad from '@/hooks/useLoad';
import { Box, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EditLabel from '../../../components/setting/label/EditLabel';
import LabelTable from '../../../components/setting/label/LabelTable';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Add from '@mui/icons-material/Add';

interface ViewProps {
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
    const router = useRouter();
    const { setLoad } = useLoad();

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
            <EditLabel
                {...{
                    open,
                    setOpen,
                    tag,
                    tagTypes,
                    newLabelName,
                    setNewLabelName,
                    addNewLabelHandler,
                    updateLabelNameByIdHandler,
                    updateTagFunctionsHandler,
                    deleteTagFunctionsHandler
                }}
            />
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
                            標籤管理
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'end', width: '20%' }}>
                            <Button
                                color="primary"
                                startDecorator={<Add />}
                                size="sm"
                                onClick={() => {
                                    setOpen(true);
                                }}
                            >
                                新增
                            </Button>
                        </Box>
                    </Box>

                    {sortedLabels && (
                        <LabelTable
                            labels={sortedLabels}
                            updateLabelNameByIdHandler={updateLabelNameByIdHandler}
                        />
                    )}

                    <Divider sx={{ mt: 1, '--Divider-childPosition': `45%` }} color="primary">
                        <Typography level="h4">待查核標籤</Typography>
                    </Divider>
                    {sortedUnCheckLabels && (
                        <LabelTable
                            labels={sortedUnCheckLabels}
                            updateLabelNameByIdHandler={updateLabelNameByIdHandler}
                        />
                    )}
                </Box>
            </Box>
        </>
    );
}

export default LabelView;
