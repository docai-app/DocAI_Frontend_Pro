/* eslint-disable jsx-a11y/anchor-is-valid */
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import Divider from '@mui/joy/Divider';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

interface DropdownsProps {
    share?: any;
    edit?: any;
    editQuesion?: any;
    remove?: any;
}

export default function Dropdowns(props: DropdownsProps) {
    const { share, edit, editQuesion, remove } = props;
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                <MenuItem onClick={share}>分享</MenuItem>
                <MenuItem onClick={edit}>編輯資料</MenuItem>
                <MenuItem onClick={editQuesion}>編輯輔助問題</MenuItem>
                <Divider />
                <MenuItem color="danger" onClick={remove}>
                    刪除
                </MenuItem>
            </Menu>
        </Dropdown>
    );
}
