import Api from '@/apis';
import { getAllChainFeatureByIdsDatas } from '@/apis/AirtableChainFeature';
import { ModelTypes } from '@/utils/constant';
import { DriveDocument, Label, SmartExtractionSchema, UserProps } from '@/utils/types';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Select, Stack } from '@mui/joy';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Option from '@mui/joy/Option';
import Textarea from '@mui/joy/Textarea';
import useAxios from 'axios-hooks';
import _ from 'lodash';
import * as React from 'react';
import ChainFeatureDetail from '../ChainFeature/ChainFeatureDetail';
import SelectDocumentsModal from './modals/SelectDocumentsModal';
import SelectSourceModal from './modals/SelectSourceModal';

export type MessageInputProps = {
    writing: boolean;
    textAreaValue: string;
    setTextAreaValue: (value: string) => void;
    onSubmit: () => void;
    model: string;
    setModel: any;
    sender?: UserProps;
    setSender: any;
    updateChatSender: any;
};
const apiSetting = new Api();
export default function MessageInput(props: MessageInputProps) {
    const {
        writing,
        textAreaValue,
        setTextAreaValue,
        onSubmit,
        model,
        setModel,
        sender,
        setSender,
        updateChatSender
    } = props;
    const textAreaRef = React.useRef<HTMLDivElement>(null);
    const [visibleSchema, setVisibleSchema] = React.useState(false);
    const [visibleDocuments, setVisibleDocuments] = React.useState(false);
    const [types, setTypes] = React.useState<any>([]);
    const [chain_features, set_chain_features] = React.useState<any>([]);
    const [chain_feature, set_chain_feature] = React.useState<any>();
    const [label, setLabel] = React.useState<Label>();
    const [openIframe, setOpenIframe] = React.useState(false);
    const [document, setDocument] = React.useState<any>();

    const [{ data: getLabelByIdData }, getLabelById] = useAxios(apiSetting.Tag.getTagById(''), {
        manual: true
    });

    React.useEffect(() => {
        if (sender && sender?.source?.value == 'documents') {
            // console.log('model_types', sender);
            setTypes(ModelTypes['documents']);
            if (sender?.model_types && sender?.model_types?.length > 0) {
                setTypes(sender?.model_types);
            }
        }
    }, [sender]);

    React.useEffect(() => {
        if (sender?.source) {
            if (sender?.source.value == 'none') setTypes(ModelTypes['none']);
            if (sender?.source.value == 'schema') setTypes(ModelTypes['schema']);
            if (sender?.source.value == 'documents') {
                // setTypes(ModelTypes['documents'])
            }
        }
    }, [sender?.source]);

    React.useEffect(() => {
        if (label) {
            getChainFeature();
        }
    }, [label]);

    React.useEffect(() => {
        if (chain_features) {
            const _types = _.map(chain_features, (cf) => {
                return {
                    name: cf.fields.name,
                    value: cf.id
                };
            });
            setTypes(ModelTypes['documents'].concat(_types));
            updateChatSender({
                ...sender,
                model_types: ModelTypes['documents'].concat(_types)
            });
        }
    }, [chain_features]);
    const sources = [
        {
            name: 'ChatGPT',
            value: 'none',
            onClick: () => { }
        },
        {
            name: '數據源',
            value: 'schema',
            onClick: () => {
                setVisibleSchema(true);
            }
        },
        {
            name: '文件',
            value: 'documents',
            onClick: () => {
                setVisibleDocuments(true);
            }
        }
    ];

    const handleChangeSource = (value: any) => {
        const _source = _.find(sources, function (s) {
            return s.value == value;
        });

        updateChatSender({
            ...sender,
            source: {
                name: _source?.name,
                value: _source?.value
            },
            model_type: null
        });
    };

    const handleChangeModel = (value: any) => {
        const _model = _.find(types, function (s) {
            return s.value == value;
        });
        updateChatSender({
            ...sender,
            model_type: _model
        });
    };

    const handleClick = () => {
        if (textAreaValue.trim() !== '') {
            onSubmit();
            setTextAreaValue('');
        }
    };

    const handleSelectSchema = (schema: SmartExtractionSchema) => {
        setVisibleSchema(false);
        updateChatSender({
            ...sender,
            source: {
                ...sender?.source,
                schema: schema
            }
        });
    };

    const handleSelectDriveDocument = (document: DriveDocument) => {
        setDocument(document);
        setVisibleDocuments(false);
        const label_id = document.labels && document.labels[0] && document.labels[0].id;
        if (label_id) {
            setLabel(document.labels[0]);
        }

        updateChatSender({
            ...sender,
            source: {
                ...sender?.source,
                document: document
            }
        });
    };

    // const getLabelDataById = (label_id: string) => {
    //     getLabelById({
    //         ...apiSetting.Tag.getTagById(label_id)
    //     }).then((res) => {
    //         setLabel(res.data.tag)
    //     })
    // }

    const getChainFeature = () => {
        // if (!_.isEmpty(chain_features)) return;
        if (label?.meta?.chain_features) {
            getAllChainFeatureByIdsDatas(label?.meta?.chain_features).then((res) => {
                // console.log(res);
                set_chain_features(res);
            });
        }
    };
    return (
        <>
            <Box sx={{ px: 0, pb: 0 }}>
                <Textarea
                    placeholder="Type something here…"
                    aria-label="Message"
                    ref={textAreaRef}
                    onChange={(e) => {
                        setTextAreaValue(e.target.value);
                    }}
                    value={textAreaValue}
                    minRows={2}
                    maxRows={10}
                    endDecorator={
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            flexGrow={1}
                            sx={{
                                py: 1,
                                pr: 1,
                                borderTop: '1px solid',
                                borderColor: 'divider'
                            }}
                        >
                            <div>
                                <Box
                                    sx={{
                                        display: 'flex'
                                    }}
                                >
                                    <Select
                                        size="sm"
                                        placeholder="請選擇來源"
                                        sx={{
                                            minWidth: 100,
                                            mx: 1
                                        }}
                                        slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                                        onChange={(event, value) => {
                                            if (value) handleChangeSource(value);
                                        }}
                                        value={sender?.source?.value || ''}
                                    >
                                        <Option value={''} disabled>
                                            請選擇來源
                                        </Option>
                                        {sources.map((so) => (
                                            <Option
                                                key={so.value}
                                                value={so.value}
                                                onClick={so.onClick}
                                            >
                                                {so.name}
                                            </Option>
                                        ))}
                                    </Select>
                                    <Select
                                        size="sm"
                                        placeholder="請選擇模型"
                                        sx={{
                                            minWidth: 100,
                                            mx: 1
                                        }}
                                        slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                                        onChange={(event, value) => {
                                            if (value) {
                                                setModel(value);
                                                handleChangeModel(value);
                                            }
                                        }}
                                        value={model}
                                    >
                                        <Option value={''} disabled>
                                            請選擇模型
                                        </Option>
                                        {types.map((model: any, index: number) => (
                                            <Option
                                                key={index}
                                                value={model.value}
                                                onClick={() => {
                                                    if (
                                                        sender?.source?.value == 'documents' &&
                                                        model.value != 'qa'
                                                    ) {
                                                        setOpenIframe(true);
                                                        set_chain_feature(model);
                                                    } else {
                                                        setOpenIframe(false);
                                                    }
                                                }}
                                            >
                                                {model.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Box>
                            </div>
                            <Button
                                size="sm"
                                color="primary"
                                disabled={writing}
                                sx={{ alignSelf: 'center', borderRadius: 'sm' }}
                                endDecorator={<SendRoundedIcon />}
                                onClick={handleClick}
                            >
                                Send
                            </Button>
                        </Stack>
                    }
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
                            handleClick();
                        }
                    }}
                    sx={{
                        '& textarea:first-of-type': {
                            minHeight: 72
                        }
                    }}
                />
            </Box>

            <SelectSourceModal
                {...{
                    visible: visibleSchema,
                    setVisible: setVisibleSchema,
                    handleSelect: handleSelectSchema
                }}
            />
            <SelectDocumentsModal
                {...{
                    visible: visibleDocuments,
                    setVisible: setVisibleDocuments,
                    handleSelect: handleSelectDriveDocument
                }}
            />
            {openIframe && (
                <ChainFeatureDetail
                    open={openIframe}
                    setOpen={setOpenIframe}
                    chain_feature_id={chain_feature?.value}
                    selectDocument={document || sender?.source?.document}
                />
            )}
        </>
    );
}
