import AI2AnswerView from '@/components/Chatbot/feature/AI2AnswerView';
import AIAnswerView from '@/components/Chatbot/feature/AIAnswerView';
import AIDataView from '@/components/Chatbot/feature/AIDataView';
import ChainFeatureView from '@/components/Chatbot/feature/ChainFeatureView';
import ReadingView from '@/components/Chatbot/feature/ReadingView';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Box, Breadcrumbs, Link, Typography } from '@mui/joy';
import _ from 'lodash';
import moment from 'moment';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Folder } from '../../../components/common/Widget/FolderTree';

interface CreateViewProps {
    chatbot: any;
    setChatbot: any;
    multipleDest: Folder[];
    setMultipleDest: Dispatch<SetStateAction<Folder[]>>;
    handleCreate: any;
    chain_feature_ids?: any;
    set_chain_feature_ids?: any;
    actionContent: string;
    chain_features: [];
    assistant_agents_data: any;
    expert_ids: any[];
    setExpert_ids: any;
}

function CreateView(props: CreateViewProps) {
    const {
        chatbot,
        setChatbot,
        multipleDest = [],
        setMultipleDest,
        handleCreate,
        chain_feature_ids,
        set_chain_feature_ids,
        actionContent,
        chain_features,
        assistant_agents_data,
        expert_ids,
        setExpert_ids
    } = props;
    const [folderTreeIsOpen, setFolderTreeIsOpen] = useState(false);
    const [assistants, setAssistants] = useState<any>([]);
    const [experts, setExperts] = useState<any>([]);

    useEffect(() => {
        if (assistant_agents_data) {
            setAssistants(
                _.filter(assistant_agents_data?.assistant_agents, function (o) {
                    return o.category == 'assistant';
                })
            );
            setExperts(
                _.filter(assistant_agents_data?.assistant_agents, function (o) {
                    return o.category == 'expert';
                })
            );
        }
    }, [assistant_agents_data, expert_ids]);

    useEffect(() => {
        if (chatbot && assistants && assistants.length > 0) {
            if (!chatbot?.meta?.assistant) {
                setChatbot({
                    ...chatbot,
                    meta: {
                        ...chatbot?.meta,
                        assistant: assistants[0].id
                    }
                });
            }
        }
    }, [assistants, chatbot]);
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Breadcrumbs
                    size="sm"
                    aria-label="breadcrumbs"
                    separator={<ChevronRightRoundedIcon />}
                    sx={{ pl: 0 }}
                >
                    <Link underline="none" color="neutral" href="/" aria-label="Home">
                        <HomeRoundedIcon />
                    </Link>
                    <Typography color="primary" fontWeight={500} fontSize={12}>
                        <Link underline="none" color="neutral" href="/chatbot" aria-label="Home">
                            助手
                        </Link>
                    </Typography>
                    <Typography color="primary" fontWeight={500} fontSize={12}>
                        編輯
                    </Typography>
                </Breadcrumbs>
            </Box>
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
                <Typography level="h2" component="h1">
                    編輯智能助手
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', overflow: 'auto', flexDirection: 'column', padding: 0 }}>
                <div className="sm:col-span-6">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        名稱
                    </label>
                    <div className="mt-2">
                        <input
                            id="name"
                            type="text"
                            name="name"
                            defaultValue={chatbot?.name}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="智能助手名稱"
                            onChange={(e) => {
                                setChatbot({
                                    ...chatbot,
                                    name: e.target.value
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        描述
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={chatbot?.description}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="智能助手描述"
                            onChange={(e) => {
                                setChatbot({
                                    ...chatbot,
                                    description: e.target.value
                                });
                            }}
                        ></textarea>
                    </div>
                </div>
                {/* <SetFolderView
                            multipleDest={multipleDest}
                            setMultipleDest={setMultipleDest}
                        /> */}
                {/* <SetCategoryView chatbot={chatbot} setChatbot={setChatbot} /> */}

                <div className="col-span-full w-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        功能(必須選一個)
                    </label>
                    <AIAnswerView chatbot={chatbot} setChatbot={setChatbot} />
                    <AIDataView chatbot={chatbot} setChatbot={setChatbot} />
                    <ChainFeatureView
                        {...{
                            chatbot,
                            setChatbot,
                            chain_features,
                            chain_feature_ids,
                            set_chain_feature_ids
                        }}
                    />
                    <AI2AnswerView
                        chatbot={chatbot}
                        setChatbot={setChatbot}
                        assistants={assistants}
                        expert_ids={expert_ids}
                        experts={experts}
                        setExpert_ids={setExpert_ids}
                    />
                    <ReadingView
                        {...{
                            chatbot,
                            setChatbot
                        }}
                    />
                </div>

                <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        是否公開使用
                    </label>
                    <div className="mt-2">
                        <input
                            type={'checkbox'}
                            defaultChecked={chatbot?.is_public}
                            onClick={() => {
                                setChatbot({
                                    ...chatbot,
                                    is_public: !chatbot?.is_public
                                });
                            }}
                        />
                        公開使用
                    </div>
                </div>
                <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        過期日期
                    </label>
                    <div className="mt-2">
                        <input
                            type={'date'}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={moment(chatbot?.expired_at).format('YYYY-MM-DD')}
                            onChange={(e) => {
                                setChatbot({
                                    ...chatbot,
                                    expired_at: e.target.value
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="sm:col-span-6 mt-4 flex justify-end">
                    <button
                        className=" cursor-pointer block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {
                            handleCreate();
                        }}
                    >
                        確認
                    </button>
                </div>
            </Box>
            {/* <FolderTreeForMultipleSelect
                {...{
                    isOpen: folderTreeIsOpen,
                    setIsOpen: setFolderTreeIsOpen,
                    multipleDest,
                    setMultipleDest
                }}
            /> */}
        </>
    );
}
export default CreateView;
