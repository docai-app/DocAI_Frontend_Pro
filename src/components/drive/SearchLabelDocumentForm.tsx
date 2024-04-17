/* This example requires Tailwind CSS v2.0+ */
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import _ from 'lodash';

import { useEffect, useState } from 'react';
import useAlert from '../../hooks/useAlert';
import LabelDropdowns from './LabelDropdowns';
import BookmarksSharpIcon from '@mui/icons-material/BookmarksSharp';

export default function SearchLabelDocumentForm(props: any) {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [tagId, setTagId] = useState('');
    const [content, setContent] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tags, setTags] = useState([]);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (visible && props?.getAllLabelsData?.tags?.length > 10) {
            setTags(props?.getAllLabelsData?.tags.slice(0, 10));
        } else {
            setTags(props?.getAllLabelsData?.tags);
        }
    }, [props, visible]);
    return (
        <>
            <React.Fragment>
                <Sheet
                    className="DriveContainer"
                    variant="outlined"
                    sx={{
                        display: { xs: 'none', sm: 'initial' },
                        width: '100%',
                        borderRadius: 'sm',
                        flexShrink: 1,
                        px: 1,
                        py: 1.5,
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mx: 1,
                        }}
                    >
                        <Typography level="title-lg" fontSize={16}>標籤:</Typography>
                        <Link variant="plain" fontSize={14}
                            href={'/setting/label'}>
                            <Chip variant="solid" color="primary"
                                startDecorator={<BookmarksSharpIcon />}
                                sx={{px:1.5}}>
                                標籤管理
                            </Chip>
                        </Link>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 0.5,
                            m: 1
                        }}
                    >
                        {tags?.map((tag: any, index: number) => {
                            return (
                                <LabelDropdowns
                                    label={tag}
                                    key={index}
                                    search={() => {
                                        props.search(
                                            tag.name,
                                            tag.id,
                                            content,
                                            startDate,
                                            endDate
                                        );
                                    }}
                                    visibleFromFilling={tag?.form_schema}
                                    from_filling={() => {
                                        router.push(`/new/form/schema/${tag?.form_schema?.id}`);
                                    }}
                                    approval={() => {
                                        setAlert({
                                            title: '新功能開發中，敬請期待！',
                                            type: 'info'
                                        });
                                    }}
                                    move_execl={() => {
                                        setAlert({
                                            title: '新功能開發中，敬請期待！',
                                            type: 'info'
                                        });
                                    }}
                                />
                                // <button className='bg-blue-500 hover:bg-blue-600 rounded-md text-white px-4 py-1 mx-2 my-1' key={index}
                                //     onClick={() => {
                                //         props.search(tag.id, content, startDate, endDate);

                                //     }}
                                // >{tag.name}</button>
                            );
                        })}

                        {tags != null && (
                            <Link fontWeight={500} fontSize={12} underline="always" onClick={() => { setVisible(!visible); }}>
                                {visible ? '查看更多' : '隱藏'}
                            </Link>
                        )}
                        {tags == null ? (
                            <div className="animate-pulse flex flex-row justify-center items-center gap-2">
                                <div className="h-4 w-32 bg-gray-400 rounded"></div>
                            </div>
                        ) : null}
                    </Box>
                    <Input
                        type="search"
                        name="content"
                        id="content"
                        placeholder="輸入文件的關鍵字或文件的相關内容" variant="outlined"
                        onChange={(e) => { setContent(e.target.value); }}
                    />
                </Sheet>
            </React.Fragment >
        </>
    );
}
