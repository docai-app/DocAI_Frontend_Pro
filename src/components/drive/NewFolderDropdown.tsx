import Button from '@mui/joy/Button';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

import Add from '@mui/icons-material/Add';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';

interface DropdownsProps {
    newfolder?: any;
}

export default function NewFolderDropdown(props: DropdownsProps) {
    const { newfolder } = props;
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: Button }}
                slotProps={{ root: { color: 'primary', size: 'sm' } }}
                startDecorator={<Add />}
                endDecorator={<KeyboardDoubleArrowDownIcon />}
            >
                <span className="sr-only">Create new file</span>
                新增
            </MenuButton>

            <Menu size="md" sx={{ minWidth: 140 }}>
                <MenuItem onClick={newfolder}>
                    <FolderCopyOutlinedIcon />
                    資料夾
                </MenuItem>
            </Menu>
        </Dropdown>

    );
}
