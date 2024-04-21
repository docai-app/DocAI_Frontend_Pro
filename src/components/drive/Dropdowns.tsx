/* eslint-disable jsx-a11y/anchor-is-valid */
import Divider from '@mui/joy/Divider';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileMoveTwoToneIcon from '@mui/icons-material/DriveFileMoveTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import FileOpenTwoToneIcon from '@mui/icons-material/FileOpenTwoTone';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import ShareSharpIcon from '@mui/icons-material/ShareSharp';

interface DropdownsProps {
    type?: string;
    url?: string;
    name?: string;
    move?: any;
    rename?: any;
    remove?: any;
    openItems?: any;
    share?: any;
}

export default function Dropdowns(props: DropdownsProps) {
    const { type, url, name, move, rename, remove, openItems, share } = props;
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { color: 'neutral', size: 'sm' } }}
                sx={{ borderRadius: '50%' }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                {type === 'folders' && (
                    <MenuItem onClick={share}>
                        <ShareSharpIcon />
                        分享
                    </MenuItem>
                )}
                {type !== 'folders' && (
                    <MenuItem onClick={openItems}>
                        <FileOpenTwoToneIcon />
                        打開
                    </MenuItem>
                )}
                {type !== 'folders' && (
                    <MenuItem>
                        <SaveAltOutlinedIcon />
                        <Link color="neutral" href={url} download={name}>
                            下載
                        </Link>
                    </MenuItem>
                )}
                <MenuItem onClick={rename}>
                    <EditTwoToneIcon />
                    重新命名
                </MenuItem>
                <MenuItem onClick={move}>
                    <DriveFileMoveTwoToneIcon />
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
