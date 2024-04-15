/* eslint-disable jsx-a11y/anchor-is-valid */
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Dropdown from '@mui/joy/Dropdown';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Sheet from '@mui/joy/Sheet';
import { ColorPaletteProp } from '@mui/joy/styles';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import _ from 'lodash';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';

const labels = [
    {
        id: 'a65ae4d7-2d3e-46fd-a611-dd061e69bf2b',
        name: "生產部文件",

    },
    {
        id: "0b4ae534-b227-4dbb-8884-2614393c027d",
        name: '11月的請假表',
    },
    {
        id: "056b73e5-26cb-431e-8a42-fd77a8c1c511",
        name: 'CHYB請假表',
    },
];


export default function LabelManagement() {
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    return (
        <React.Fragment>
            <Sheet
                className="DriveContainer"
                variant="outlined"
                sx={{
                    display: { xs: 'none', sm: 'initial' },
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    minHeight: 0,
                }}
            >
                <Box
                sx={{
                    mx:1,
                    my:2
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        my:1
                    }}>
                        <Typography>標籤:</Typography>
                        <Link color="primary">標籤管理</Link>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            mx:2,
                            mt:1,
                            mb:2
                        }}
                    >
                        {labels.map((label) => (
                            <Chip key={label.id} variant="solid" startDecorator={<InsertDriveFileIcon />}
                            >{label.name}</Chip>
                        ))}
                        <Link underline='always'>查看更多</Link>
                    </Box>

                    <Input placeholder="輸入文件的關鍵字或文件的相關内容" variant="outlined"/>
                </Box>
            </Sheet>
        </React.Fragment>
    );
}
