import { DocumentModel } from '@/models/Document';
import { Box, Typography } from '@mui/joy';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SellIcon from '@mui/icons-material/Sell';
import Tooltip from '@mui/joy/Tooltip';
import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AmendLabel from '../setting/label/AmendLabel';
import EditLabel from '../setting/label/EditLabel';
import SelectDataSchemaModal from './SelectDataSchemaModal';
interface ViewProps {
    document: DocumentModel;
    getAllLabelsData: any;
}
const apiSetting = new Api();
export default function DocumentCard(props: ViewProps) {
    const router = useRouter();
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const { document, getAllLabelsData } = props;
    const [openSelectShema, setOpenSelectShema] = useState(false);
    const [openAmendLabel, setOpenAmendLabel] = useState(false);
    const [openEditLabel, setOpenEditLabel] = useState(false);

    const [{ data: updateDocumentTagData }, updateDocumentTag] = useAxios(
        apiSetting.Classification.updateDocumentTag([], ''),
        { manual: true }
    );

    const confirmDocumentFormik = useFormik({
        initialValues: {
            document_id: null,
            tag_id: ''
        },
        onSubmit: async (values) => {
            setLoad({ show: true, content: '正在更新數據' });
            const res = await updateDocumentTag({
                data: {
                    document_ids: [document?.id],
                    tag_id: values.tag_id
                }
            });
            setLoad({ show: false });
            if (res.data.success === true) {
                setAlert({ title: '更新成功', type: 'success' });
                // location.reload();
            } else {
                setAlert({ title: '更新失敗', type: 'error' });
            }
        }
    });

    const dropdown = () => {
        return (
            <Dropdown>
                <MenuButton
                    variant="plain"
                    size="sm"
                    sx={{
                        maxWidth: '32px',
                        maxHeight: '32px',
                        borderRadius: '9999999px'
                    }}
                >
                    <IconButton component="span" variant="plain" color="neutral" size="sm">
                        <MoreVertRoundedIcon />
                    </IconButton>
                </MenuButton>
                <Menu
                    placement="bottom-end"
                    size="sm"
                    sx={{
                        zIndex: '99999',
                        p: 1,
                        gap: 1,
                        '--ListItem-radius': 'var(--joy-radius-sm)'
                    }}
                >
                    <a
                        href={document?.storage_url}
                        target={'_blank'}
                        className=" hover:underline cursor-pointer "
                    >
                        <MenuItem>
                            <FileOpenIcon />
                            打開
                        </MenuItem>
                    </a>
                    <MenuItem
                        onClick={() => {
                            setOpenAmendLabel(true);
                        }}
                    >
                        <SellIcon />
                        更新標籤
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setOpenSelectShema(true);
                        }}
                    >
                        <FileCopyIcon />
                        搬資料到Execl
                    </MenuItem>
                </Menu>
            </Dropdown>
        );
    };
    return (
        <>
            <Card variant="outlined" size="sm" sx={{ margin: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ flex: 1 }}>
                        <Tooltip title={document?.name} variant="solid">
                            <Typography
                                level="title-md"
                                sx={{
                                    color: 'black',
                                    width: { xs: 150, sm: 170 },
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                <a
                                    href={document?.storage_url}
                                    target={'_blank'}
                                    className=" hover:underline cursor-pointer "
                                >
                                    {document?.name}
                                </a>
                            </Typography>
                        </Tooltip>
                        {/* <Typography level="body-sm">132.2MB</Typography> */}
                    </Box>
                    {dropdown()}
                </Box>
                <CardOverflow
                    sx={{
                        borderBottom: '1px solid',
                        borderTop: '1px solid',
                        borderColor: 'neutral.outlinedBorder'
                    }}
                >
                    <AspectRatio
                        ratio="16/9"
                        color="primary"
                        sx={{ borderRadius: 0 }}
                        objectFit="contain"
                        minHeight={250}
                        maxHeight={250}
                    >
                        {document?.storage_url && document?.storage_url.trim().endsWith('.pdf') ? (
                            <object
                                className="w-full h-full object-center object-contain"
                                type="application/pdf"
                                data={document?.storage_url + '#toolbar=0'}
                            >
                                <img
                                    src={
                                        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png'
                                    }
                                    alt="PDF file icon"
                                    className="w-full h-full object-contain object-center"
                                />
                            </object>
                        ) : (
                            <img
                                src={document?.storage_url}
                                alt={document?.name}
                                className="w-full h-full object-contain object-center"
                            />
                        )}
                    </AspectRatio>
                </CardOverflow>
                {/* <Typography level="body-xs">
                    {moment(document.created_at).format('YYYY-MM-DD HH:mm')}
                </Typography> */}
            </Card>
            {openSelectShema && (
                <SelectDataSchemaModal
                    open={openSelectShema}
                    setOpen={setOpenSelectShema}
                    document_ids={[document?.id]}
                />
            )}
            {openAmendLabel && (
                <AmendLabel
                    open={openAmendLabel}
                    setOpen={setOpenAmendLabel}
                    allLabelsData={getAllLabelsData}
                    confirmDocumentFormik={confirmDocumentFormik}
                    isSubmit={true}
                    setTagName={(name: string) => { }}
                    setOpenEditLabel={setOpenEditLabel}
                />
            )}
            {openEditLabel && (
                <EditLabel
                    {...{
                        open: openEditLabel,
                        setOpen: setOpenEditLabel,
                        tagTypes: null,
                        newLabelName: '',
                        setNewLabelName: null,
                        addNewLabelHandler: null
                    }}
                />
            )}
        </>
    );
}
