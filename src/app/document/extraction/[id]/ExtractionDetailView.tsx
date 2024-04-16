import { Box, Breadcrumbs, Link, Typography } from '@mui/joy';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Checkbox from '@mui/joy/Checkbox';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';


import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChainFeatureSelect from '../../../../components/Chatbot/feature/ChainFeatureSelect';
import ChainFeatureList from '../../../../components/document/extraction/ChainFeatureList';
import SchemaList from '../../../../components/document/extraction/SchemasList';


import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ContrySelector from '@/components/CountrySelector';

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
            console.log(label)

            set_chain_feature_ids(label?.meta?.chain_features || []);
            setName(label.name);
        }
    }, [label]);

    const isContain = (value: any) => {
        const index = _.find(label?.functions, function (func: any) {
            return func.id === value;
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

                        <Box sx={{ display: 'flex', justifyContent: 'end', width: '20%' }}>
                            <Button
                                color="primary"
                                size="sm"
                                onClick={() => {
                                    updateTagNameHandler(label.id, name);
                                }}>
                                保存
                            </Button>
                        </Box>
                    </Box>

                    <Input autoFocus required fullWidth color="primary"
                        startDecorator={<Typography>名稱:</Typography>}
                        defaultValue={label?.name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }} />
                    <Box sx={{ display: 'flex', gap: 1, ml: 1.5, my: 1 }}>
                        功能:
                        {label && tagTypes?.functions?.map((item: any, index: number) => {
                            return (
                                <Checkbox key={index} variant="solid" color="primary"
                                    label={item.title}
                                    defaultChecked={isContain(item.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            updateTagFunctionsHandler(
                                                label.id, item.id
                                            );
                                        } else {
                                            deleteTagFunctionsHandler(
                                                label.id, item.id
                                            );
                                        }
                                    }} />
                            );
                        })}
                    </Box>

                    <Tabs defaultValue="extraction"
                        sx={{ bgcolor: 'transparent' }}
                    >
                        <TabList underlinePlacement="bottom" size="sm"
                            sx={{
                                pl: { xs: 0, md: 4 },
                                justifyContent: 'left',
                                [`&& .${tabClasses.root}`]: {
                                    fontWeight: '600',
                                    flex: 'initial',
                                    color: 'text.tertiary',
                                    [`&.${tabClasses.selected}`]: {
                                        bgcolor: 'transparent',
                                        color: 'text.primary',
                                        '&::after': {
                                            height: '2px',
                                            bgcolor: 'primary.500'
                                        }
                                    }
                                }
                            }}>
                            <Tab value="extraction" indicatorPlacement="bottom"
                                sx={{ borderRadius: '6px 6px 0 0' }}>
                                標籤填表與數據</Tab>
                            <Tab value="chain_feature" indicatorPlacement="bottom"
                                sx={{ borderRadius: '6px 6px 0 0' }}>
                                推薦功能</Tab>
                        </TabList>
                        <TabPanel value="extraction">
                            <SchemaList
                                label={label}
                                smart_extraction_schemas={smart_extraction_schemas}
                                meta={meta}
                            />
                        </TabPanel>
                        <TabPanel value="chain_feature">
                            <ChainFeatureList
                                label={label}
                                chain_features={chain_features}
                                chain_feature_ids={chain_feature_ids}
                                set_chain_feature_ids={set_chain_feature_ids}
                                handleSave={handleSave}
                            />
                        </TabPanel>
                    </Tabs>

                    <ChainFeatureSelect
                        chain_features={chain_features}
                        isOpen={chainFeatureIsOpen}
                        setIsOpen={setChainFeatureIsOpen}
                        chain_feature_ids={chain_feature_ids}
                        set_chain_feature_ids={set_chain_feature_ids}
                        handleSave={handleSave}
                    />
                </Box>
            </Box>
        </>
    );
}
export default ExtractionDetailView;
