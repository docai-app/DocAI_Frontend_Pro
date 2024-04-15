import { XCircleIcon } from '@heroicons/react/24/outline';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Breadcrumbs, Button, Link, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';

interface ViewProps {
    chatbot: any;
    assistive_questions: any;
    set_assistive_questions: any;
    handleUpdate: any;
}
export default function AssistiveQuestionView(props: ViewProps) {
    const {
        chatbot,
        assistive_questions,
        set_assistive_questions,
        handleUpdate
    } = props;

    const router = useRouter();

    const addAssistiveQuestions = () => {
        const newData = [...assistive_questions, ''];
        set_assistive_questions(newData);
    };

    const updateAssistiveQuestions = (index: number, value: string) => {
        assistive_questions[index] = value;
        const newData = [...assistive_questions];
        set_assistive_questions(newData);
    };

    const removeAssistiveQuestions = (index: number) => {
        assistive_questions.splice(index, 1);
        const newData = [...assistive_questions];
        set_assistive_questions(newData);
    };
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
                        編輯輔助問題
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
                    {chatbot?.name}
                </Typography>
                <Button
                    color="primary"
                    startDecorator={<SaveIcon />}
                    size="sm"
                    onClick={() => {
                        handleUpdate()
                    }}>
                    保存
                </Button>
            </Box>
            <div  >

                <div className="col-span-full">
                    <div className="flex flex-row justify-between items-center">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            輔助問題
                        </label>
                        <a
                            className="block cursor-pointer p-2 text-xl font-medium leading-6  text-indigo-600"
                            onClick={addAssistiveQuestions}
                        >
                            +
                        </a>
                    </div>

                    <div className="mt-2">
                        {assistive_questions?.map((question: any, index: number) => (
                            <div key={index} className="my-1 flex flex-row items-center">
                                <input
                                    type={'text'}
                                    className="block flex-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={question}
                                    placeholder="輔助問題"
                                    onChange={(e) => {
                                        updateAssistiveQuestions(index, e.target.value);
                                    }}
                                />
                                <div
                                    className="flex-0 p-2 cursor-pointer "
                                    onClick={() => {
                                        removeAssistiveQuestions(index);
                                    }}
                                >
                                    <XCircleIcon className="w-5 hover:text-red-500 " />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
