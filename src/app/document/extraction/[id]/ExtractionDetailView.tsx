import { Box, Breadcrumbs, Link, Typography } from '@mui/joy';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

import Button from '@mui/joy/Button';


import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// import HeaderBreadCrumb from '../../../../components/common/Widget/HeaderBreadCrumb';
// import ChainFeatureSelect from '../../../../components/chatbot/ChainFeatureSelect';
// import ChainFeatureList from '../../../../components/document/extraction/ChainFeatureList';
// import SchemaList from '../../../../components/document/extraction/SchemasList';


import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

interface ExtractionDetailViewProps {
    open: boolean;
    setOpen: any;
    label: any;
    // currentTypeTab: string;
    // setCurrentTypeTab: any;
    smart_extraction_schemas: [];
    meta: any;
    chain_features: [];
    updateTagFeatureHandler?: any;
    updateTagNameHandler?: any;
    updateTagFunctionsHandler?: any;
    deleteTagFunctionsHandler?: any;
    tagTypes: any;
}

function ExtractionDetailView(props: ExtractionDetailViewProps) {
    const {
        open,
        setOpen,
        label,
        // currentTypeTab,
        // setCurrentTypeTab,
        smart_extraction_schemas,
        meta,
        chain_features,
        updateTagFeatureHandler,
        updateTagNameHandler,
        updateTagFunctionsHandler,
        deleteTagFunctionsHandler,
        tagTypes
    } = props;
    const router = useRouter();

    const [chainFeatureIsOpen, setChainFeatureIsOpen] = useState(false);
    const [chain_feature_ids, set_chain_feature_ids] = useState<any>([]);
    const [name, setName] = useState('');
    const handleSave = (chain_feature_ids: any) => {
        updateTagFeatureHandler(label?.id, chain_feature_ids);
        console.log('chain_feature_ids', chain_feature_ids);
    };

    useEffect(() => {
        if (label) {
            console.log(label);

            set_chain_feature_ids(label?.meta?.chain_features || []);
            setName(label.name);
        }
    }, [label]);

    const isContain = (value: any) => {
        const index = _.find(label?.functions, function (func: any) {
            return func.id == value;
        });
        return index;
    };

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
                        <Button color="primary" variant="plain"
                            startDecorator={<KeyboardArrowLeftIcon />}
                            onClick={() => {
                                router.back();
                            }}>
                            返回
                        </Button>

                        <Typography level="h2" component="h1">編輯標籤</Typography>

                        <Button
                            color="primary"
                            // startDecorator={<Add />}
                            size="sm"
                            onClick={() => {
                                updateTagNameHandler(label.id, name);
                            }}>
                            保存
                        </Button>
                    </Box>

                    <div className="my-2">
                        <div className="my-2 flex flex-row items-center">
                            <label className="flex-0">名稱:</label>
                            <input
                                className="block flex-1 mx-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={label?.name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="my-2 flex flex-row items-start">
                            <label>功能:</label>
                            <div className="mx-2 flex flex-col justify-start items-start ">
                                {tagTypes?.functions?.map((item: any, index: number) => {
                                    return (
                                        <div key={index}>
                                            <input
                                                type={'checkbox'}
                                                name={item.title}
                                                defaultChecked={isContain(item.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        updateTagFunctionsHandler(
                                                            label.id,
                                                            item.id
                                                        );
                                                    } else {
                                                        deleteTagFunctionsHandler(
                                                            label.id,
                                                            item.id
                                                        );
                                                    }
                                                }}
                                            />
                                            <label className="ml-2"> {item.title}</label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <Tabs defaultValue="extraction"
                        sx={{ bgcolor: 'transparent' }}
                    >
                        <TabList underlinePlacement="bottom"
                            sx={{
                                p: 0.5,
                                gap: 0.5,
                                borderRadius: 'xl',
                                bgcolor: 'background.level1',
                            }}>
                            <Tab value="extraction" indicatorPlacement="bottom">
                                標籤填表與數據
                            </Tab>
                            <Tab value="chain_feature" indicatorPlacement="bottom">
                                推薦功能
                            </Tab>
                        </TabList>
                        <TabPanel value="extraction">
                            <Box sx={{ my: 2 }}>
                                標籤填表與數據 extraction
                            </Box>
                            {/* <SchemaList
                                label={label}
                                smart_extraction_schemas={smart_extraction_schemas}
                                meta={meta}
                            /> */}
                        </TabPanel>
                        <TabPanel value="chain_feature">
                            <Box sx={{ my: 2 }}>
                                推薦功能 ChainFeatureList
                            </Box>
                            {/* <ChainFeatureList
                                        label={label}
                                        chain_features={chain_features}
                                        chain_feature_ids={chain_feature_ids}
                                        set_chain_feature_ids={set_chain_feature_ids}
                                        handleSave={handleSave}
                                    /> */}
                        </TabPanel>
                    </Tabs>

                    {/* <ChainFeatureSelect
                        chain_features={chain_features}
                        isOpen={chainFeatureIsOpen}
                        setIsOpen={setChainFeatureIsOpen}
                        chain_feature_ids={chain_feature_ids}
                        set_chain_feature_ids={set_chain_feature_ids}
                        handleSave={handleSave}
                    /> */}
                </Box>
            </Box>
        </>
    );
}
export default ExtractionDetailView;
