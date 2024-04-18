import { SmartExtractionSchema } from '@/utils/types';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Select, Stack } from '@mui/joy';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Option from '@mui/joy/Option';
import Textarea from '@mui/joy/Textarea';
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
};

export default function MessageInput(props: MessageInputProps) {
    const {
        textAreaValue,
        setTextAreaValue,
        onSubmit,
        model,
        setModel,
        getAllLabelsData,
        getAllSchemasData
    } = props;
    const textAreaRef = React.useRef<HTMLDivElement>(null);
    const [visibleSchema, setVisibleSchema] = React.useState(false);

    const handleChangeSource = (value: any) => {
        console.log(value);
    };
    const handleClick = () => {
        if (textAreaValue.trim() !== '') {
            onSubmit();
            setTextAreaValue('');
        }
    };

    const handleSelectSchema = (schema: SmartExtractionSchema) => {
        setVisibleSchema(false);
        console.log(schema);
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
                                        onChange={(event, value) => handleChangeSource(value)}
                                    >
                                        <Option value={''} disabled>
                                            請選擇來源
                                        </Option>
                                        <Option value={'none'}>無來源</Option>
                                        <Option
                                            value={'schema'}
                                            onClick={() => setVisibleSchema(true)}
                                        >
                                            數據源
                                        </Option>
                                        <Option value={'documents'}>文件夾或文件</Option>
                                        {/* <Option value={'chatbot'}>機器人</Option> */}
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
                                        }}
                                        value={model}
                                    >
                                        <Option value={''} disabled>
                                            請選擇模型
                                        </Option>
                                        <Option value={'chart'}>圖表</Option>
                                        <Option value={'statistics'}>統計</Option>
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
