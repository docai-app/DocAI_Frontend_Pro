/* eslint-disable jsx-a11y/anchor-is-valid */
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import ShareIcon from '@mui/icons-material/Share';
import Divider from '@mui/joy/Divider';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

interface DropdownsProps {
    type?: string;
    url?: string;
    name?: string;
    share?: any;
    edit?: any;
    remove?: any;
}

export default function Dropdowns(props: DropdownsProps) {
    const { type, url, name, share, edit, remove } = props;
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                <MenuItem>
                    打開
                </MenuItem>
                <MenuItem>
                    下載
                </MenuItem>
                <MenuItem >
                    重新命名
                </MenuItem>
                <MenuItem onClick={edit}>
                    <EditIcon />
                    移動至
                </MenuItem>
                <Divider />
                <MenuItem color="danger" onClick={remove}>
                    <DeleteIcon />
                    刪除
                </MenuItem>
            </Menu>
        </Dropdown>
    );
}
