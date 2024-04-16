import useAlert from '@/hooks/useAlert';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, Input, Sheet } from '@mui/joy';
import { useState } from 'react';
interface ViewProps {
    handleSearch: any;
}

export default function SearchInputView(props: ViewProps) {
    const { handleSearch } = props;
    const { setAlert } = useAlert();
    const [content, setContent] = useState('');

    const verify = () => {
        if (content.trim() == '') {
            setAlert({ title: '提示', content: '請輸入內容' });
            return;
        } else {
            handleSearch(content);
        }
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
                    size="sm"
                    placeholder="Search"
                    type={'search'}
                    startDecorator={<SearchIcon />}
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
