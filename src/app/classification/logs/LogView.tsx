import { ClockIcon } from '@heroicons/react/24/outline';
import { Box, Button, Typography } from '@mui/joy';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PaginationView from '../../../components/common/Widget/PaginationView';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

interface LatestPredictionDataProps {
    prediction: any;
}

function LogView(props: any) {
    const {
        currentTabStatus,
        setCurrentTabStatus,
        countDocumentsStatusByDateData,
        loading,
        error
    } = props;
    const router = useRouter();

    return (
        <>
            <div className=" container mx-auto md:px-4 lg:px-6 pb-10">
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
                        智能文檔處理
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'end', width: '20%' }}></Box>
                </Box>

                {loading ? (
                    <div>載入中...</div>
                ) : (
                    countDocumentsStatusByDateData && (
                        <>
                            <div className="  w-full   overflow-hidden  ">
                                {countDocumentsStatusByDateData?.data.map(
                                    (item: any, index: number) => {
                                        return (
                                            <div className="mb-4" key={index}>
                                                <p className="text-back font-bold">{item.date}</p>

                                                <div className="flex flex-row items-center my-0">
                                                    <label className=" text-sm">
                                                        共上傳了{' '}
                                                        <label className="font-bold">
                                                            {item.uploaded_count}
                                                        </label>{' '}
                                                        份，未處理{' '}
                                                        <label className="font-bold">
                                                            {item.non_ready_count}
                                                        </label>{' '}
                                                        份，已預處理{' '}
                                                        <label className="font-bold">
                                                            {item.ready_count}
                                                        </label>{' '}
                                                        份，智能文檔分類處理了{' '}
                                                        <label className="font-bold">
                                                            {item.confirmed_count}
                                                        </label>{' '}
                                                        份
                                                    </label>
                                                    {item.uploaded_count !=
                                                        item.confirmed_count && (
                                                            <Link
                                                                href={`/classification/validate?date=${item.date}`}
                                                                className="p-2 text-sm underline text-indigo-500"
                                                            >
                                                                繼續處理
                                                            </Link>
                                                        )}
                                                    {item.uploaded_count ==
                                                        item.confirmed_count && (
                                                            <Link
                                                                href={'/classification/show'}
                                                                className="p-2 text-sm underline text-indigo-500"
                                                            >
                                                                查看
                                                            </Link>
                                                        )}
                                                </div>

                                                {item.estimated_time > 0 && (
                                                    <div className="flex flex-row items-center">
                                                        <ClockIcon className="w-5 h-5 text-green-500" />
                                                        <p className="ml-1 text-green-500 text-sm">
                                                            正在進行預處理，需時{' '}
                                                            {Math.ceil(item.estimated_time / 60)}{' '}
                                                            分鐘
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                            <PaginationView
                                meta={countDocumentsStatusByDateData?.meta}
                                pathname={'/classification/logs'}
                                params={''}
                            />
                        </>
                    )
                )}
            </div>
        </>
    );
}

export default LogView;
