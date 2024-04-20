import useAlert from '@/hooks/useAlert';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import { CircularProgress, IconButton, Input, Sheet } from '@mui/joy';
import { useRef, useState } from 'react';
interface ViewProps {
    handleSearch: any;
    loading?: boolean;
}

export default function SearchInputView(props: ViewProps) {
    const { handleSearch, loading } = props;
    const { setAlert } = useAlert();
    const [content, setContent] = useState('');
    const textInputRef = useRef<HTMLInputElement>(null);

    const verify = () => {
        if (textInputRef.current == null) return;
        const text = textInputRef.current.value;
        // if (content.trim() == '') {
        //     setAlert({ title: '提示', content: '請輸入內容' });
        //     return;
        // } else {
        //     handleSearch(content);
        // }
        handleSearch(text);
    };
    const onKeyUp = (e: any) => {
        if (e.keyCode === 13) {
            verify();
        }
    };

    return (
        <>
            <Sheet
                className="SearchAndFilters-mobile"
                sx={{
                    display: { xs: 'flex', sm: 'flex' }
                }}
            >
                <Input
                    ref={textInputRef}
                    size="sm"
                    placeholder="Search"
                    type={'search'}
                    startDecorator={<SearchIcon />}
                    endDecorator={loading && <CircularProgress size="sm" />}
                    sx={{ flexGrow: 1 }}
                    onKeyUp={onKeyUp}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />
                <IconButton
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    onClick={() => {
                        verify();
                    }}
                    sx={{
                        display: { xs: 'flex', sm: 'none' }
                    }}
                >
                    <SendIcon />
                </IconButton>
            </Sheet>
        </>
    );
}
