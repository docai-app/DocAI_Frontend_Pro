import { ModelTypes } from '@/utils/constant';
import { SmartExtractionSchema, UserProps } from '@/utils/types';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Select, Stack } from '@mui/joy';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Option from '@mui/joy/Option';
import Textarea from '@mui/joy/Textarea';
import _ from 'lodash';
import * as React from 'react';
import SelectSourceModal from './modals/SelectSourceModal';

export type MessageInputProps = {
    textAreaValue: string;
    setTextAreaValue: (value: string) => void;
    onSubmit: () => void;
    model: string;
    setModel: any;
    getAllLabelsData: any;
    getAllSchemasData: any;
    sender?: UserProps;
    updateChatSender: any;
};

export default function MessageInput(props: MessageInputProps) {
    const {
        textAreaValue,
        setTextAreaValue,
        onSubmit,
        model,
        setModel,
        getAllLabelsData,
        getAllSchemasData,
        sender,
        updateChatSender
    } = props;
    const textAreaRef = React.useRef<HTMLDivElement>(null);
    const [visibleSchema, setVisibleSchema] = React.useState(false);
    const [types, setTypes] = React.useState<any>([]);

    React.useEffect(() => {
        if (sender?.source) {
            if (sender?.source.value == 'none') setTypes(ModelTypes['none']);
            if (sender?.source.value == 'schema') setTypes(ModelTypes['schema']);
            if (sender?.source.value == 'documents') setTypes(ModelTypes['documents']);
        }
    }, [sender?.source]);
    const sources = [
        {
            name: '無來源',
            value: 'none',
            onClick: () => {}
        },
        {
            name: '數據源',
            value: 'schema',
            onClick: () => {
                setVisibleSchema(true);
            }
        },
        {
            name: '文件夾或文件',
            value: 'documents',
            onClick: () => {}
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
            }
        });
    };

    const handleChangeModel = (value: any) => {
        console.log('value', value);

        const _model = _.find(types, function (s) {
            return s.value == value;
        });
        console.log('_model', _model);

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
                                            handleChangeSource(value);
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
                                            setModel(value);
                                            handleChangeModel(value);
                                        }}
                                        value={model}
                                    >
                                        <Option value={''} disabled>
                                            請選擇模型
                                        </Option>
                                        {types.map((model: any, index: number) => (
                                            <Option key={index} value={model.value}>
                                                {model.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Box>
                            </div>
                            <Button
                                size="sm"
                                color="primary"
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
                    getAllLabelsData,
                    getAllSchemasData,
                    handleSelectSchema
                }}
            />
        </>
    );
}
