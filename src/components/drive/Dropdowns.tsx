/* eslint-disable jsx-a11y/anchor-is-valid */
import Divider from '@mui/joy/Divider';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Link from '@mui/joy/Link';

import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import FileOpenTwoToneIcon from '@mui/icons-material/FileOpenTwoTone';
import CloudDownloadTwoToneIcon from '@mui/icons-material/CloudDownloadTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DriveFileMoveTwoToneIcon from '@mui/icons-material/DriveFileMoveTwoTone';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';

interface DropdownsProps {
    type?: string;
    url?: string;
    name?: string;
    move?: any;
    rename?: any;
    remove?: any;
    openItems?: any;
}

export default function Dropdowns(props: DropdownsProps) {
    const { type, url, name, move, rename, remove, openItems } = props;
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { color: 'neutral', size: 'sm' } }}
            >
                <IconButton aria-label="Open options" component="a">
                    <MoreHorizRoundedIcon />
                </IconButton>
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                {type !== 'folders' && (
                    <MenuItem onClick={openItems}>
                        <FileOpenTwoToneIcon />
                        打開
                    </MenuItem>
                )}
                {type !== 'folders' && (
                    <MenuItem>
                        <SaveAltOutlinedIcon />
                        <Link color="neutral" href={url} download={name}>下載</Link>
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
