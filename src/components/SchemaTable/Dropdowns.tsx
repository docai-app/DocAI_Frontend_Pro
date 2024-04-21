/* eslint-disable jsx-a11y/anchor-is-valid */
import { SmartExtractionSchema } from '@/utils/types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import Divider from '@mui/joy/Divider';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AlertDialogModal from '../common/Widget/AlertDialogModal';

interface DropdownsProps {
    row: SmartExtractionSchema;
}

export default function Dropdowns(props: DropdownsProps) {
    const { row } = props;
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Dropdown>
                <MenuButton
                    slots={{ root: IconButton }}
                    slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
                >
                    <MoreHorizRoundedIcon />
                </MenuButton>
                <Menu size="sm" sx={{ minWidth: 140 }}>
                    <MenuItem
                        onClick={() => {
                            router.push(
                                `/document/extraction/documents/schema?schema_id=${row.id}`
                            );
                        }}
                    >
                        <EditIcon />
                        編輯
                    </MenuItem>
                    <Divider />
                    <MenuItem
                        color="danger"
                        onClick={() => {
                            setVisible(true);
                        }}
                    >
                        <DeleteIcon />
                        刪除
                    </MenuItem>
                </Menu>
            </Dropdown>
            {visible && (
                <AlertDialogModal
                    visible={visible}
                    setVisible={setVisible}
                    content={`確認刪除 ${row.name} ?`}
                    confirm={() => {
                        setVisible(visible);
                    }}
                />
            )}
        </>
    );
}
