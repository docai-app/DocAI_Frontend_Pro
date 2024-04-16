import { Box, Breadcrumbs, Link, Typography } from '@mui/joy';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';

import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EditSchemaDataModal from '../../../../../components/common/Widget/EditSchemaDataModal';
import ExtractSchemaRow from '../../../../../components/document/extraction/ExtractSchemaRow';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ContrySelector from '@/components/CountrySelector';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import CloseIcon from '@mui/icons-material/Close';

interface SchemaViewProps {
    label: any;
    open: boolean;
    setOpen: any;
    extractSchema: {
        name: string;
        description: string;
        label_id: string;
        schema: any[];
        data_schema: any;
    };
    setExtractSchema: any;
    handleSave: any;
    actionContent: string;
    visableAdd?: boolean;
}

function SchemaView(props: SchemaViewProps) {
    const {
        label,
        open,
        setOpen,
        extractSchema,
        setExtractSchema,
        handleSave,
        actionContent,
        visableAdd = true
    } = props;
    const router = useRouter();
    const [visable, setVisable] = useState(false);
    const [currectExtraScheam, setCurrectExtraSchema] = useState();
    const [currectPosition, setCurrectPosition] = useState(-1);
    const [accurateMode, setAccurateMode] = useState(false);

    useEffect(() => {
        if (extractSchema && extractSchema?.schema && extractSchema?.schema[0]) {
            setAccurateMode(_.isArray(extractSchema?.schema[0].query));
        }
    }, [extractSchema]);

    const editExtraSchema = (position: number) => {
        setVisable(true);
        setCurrectPosition(position);
        setCurrectExtraSchema(extractSchema?.schema[position]);
    };

    const removeExtraSchema = (position: number) => {
        extractSchema?.schema.splice(position, 1);
        setExtractSchema({
            ...extractSchema,
            schema: extractSchema?.schema
        });
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

                        <Typography level="h2" component="h1">編輯Schema</Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'end', width: '20%' }}>
                            <Button color="primary" size="sm"
                                onClick={() => { handleSave(); }}>
                                確認
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography level="h2" fontSize="md">來源:</Typography>
                        {label && (
                            <Button
                                startDecorator={<DescriptionTwoToneIcon />}
                                // className="mx-2 flex flex-row items-center cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => {
                                    window.history.pushState(null, '/search',
                                        `?content=&tag_id=${label?.id}&from=&to=&label=${label?.name}`
                                    );
                                }}
                            >
                                {label?.name}({label?.taggings_count || 0})
                            </Button>
                        )}

                    </Box>

                    <Typography level="h2" fontSize="md">目的地:</Typography>

                    <Box>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            startDecorator={<Typography>名稱:</Typography>}
                            placeholder="名稱"
                            defaultValue={extractSchema?.name}
                            onChange={(e) => {
                                setExtractSchema({
                                    ...extractSchema,
                                    name: e.target.value
                                });
                            }}
                            sx={{ mb: 1 }}>
                        </Input>
                        <Textarea minRows={2}
                            id="description"
                            name="description"
                            placeholder="描述"
                            startDecorator={<Typography sx={{ ml: 1 }}>描述:</Typography>}
                            defaultValue={extractSchema?.description}
                            onChange={(e) => {
                                setExtractSchema({
                                    ...extractSchema,
                                    description: e.target.value
                                });
                            }}
                            sx={{ mb: 1 }}>
                        </Textarea>

                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        精準模式:
                        <Checkbox color="primary" variant="solid"
                            checked={accurateMode}
                            disabled={extractSchema?.schema?.length > 0}
                            onChange={() => {
                                setAccurateMode(!accurateMode);
                            }}
                            sx={{ [`& > .${checkboxClasses.checkbox}`]: { position: 'relative' } }}
                            slotProps={{ action: { className: checkboxClasses.focusVisible } }}>
                        </Checkbox>
                    </Box>

                    <Box >
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className=" border-b">
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                    >
                                        Column Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Data Type
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Prompt
                                    </th>

                                    <th
                                        scope="col"
                                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                                    >
                                        {visableAdd && (
                                            <div className="flex justify-end">
                                                <a
                                                    className=" cursor-pointer block rounded-md  text-center text-sm font-semibold text-indigo-500  hover:text-indigo-700  "
                                                    onClick={() => {
                                                        setCurrectPosition(-1);
                                                        setVisable(true);
                                                    }}
                                                >
                                                    + Column
                                                </a>
                                            </div>
                                        )}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {extractSchema?.schema?.map(
                                    (schema: any, index: number) => {
                                        return (
                                            <ExtractSchemaRow
                                                key={index}
                                                position={index}
                                                schema={schema}
                                                edit={editExtraSchema}
                                                remove={removeExtraSchema}
                                                visableAdd={visableAdd}
                                            />
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </Box>
                </Box>
            </Box >

            <EditSchemaDataModal
                visable={visable}
                extractSchema={currectExtraScheam}
                accurateMode={accurateMode}
                cancelClick={() => {
                    console.log('---');
                    setVisable(false);
                }}
                confirmClick={(data: any) => {
                    console.log('data', data);
                    if (currectPosition > -1) {
                        console.log(data);
                        extractSchema?.schema.splice(currectPosition, 1, data);
                        setVisable(false);
                    } else {
                        extractSchema?.schema?.push(data);
                    }
                    setExtractSchema({
                        ...extractSchema,
                        schema: extractSchema?.schema
                    });
                }}
            />
        </>
    );
}
export default SchemaView;
