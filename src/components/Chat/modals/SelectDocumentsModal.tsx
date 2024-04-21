import Api from '@/apis';
import { DriveDocument } from '@/utils/types';
import { Box, Button } from '@mui/joy';
import DialogContent from '@mui/joy/DialogContent';
import DialogTitle from '@mui/joy/DialogTitle';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';
import DriveTable from './drive/DriveTable';

interface ViewProps {
    visible: boolean;
    setVisible: any;
    handleSelect: any;
}
const apiSetting = new Api();
export default function SelectDocumentsModal(props: ViewProps) {
    const router = useRouter();
    const { visible, setVisible, handleSelect } = props;
    const [layout, setLayout] = React.useState<ModalDialogProps['layout'] | undefined>(undefined);
    const [selectedValue, setSelectedValue] = React.useState<DriveDocument>();
    const [page, setPage] = useState(1);
    const [documents, setDocuments] = useState<DriveDocument[]>([]);

    const [
        { data: allDrivesData, loading: showAllDriveLoading, error: showAllDriveError },
        showAllDrives
    ] = useAxios({}, { manual: true });

    useEffect(() => {
        showAllDrives(apiSetting.Drive.showAllRootItems(page));
    }, [router]);

    useEffect(() => {
        if (allDrivesData && allDrivesData.success) {
            setDocuments(allDrivesData?.documents);
        }
    }, [allDrivesData]);

    return (
        <Modal
            open={props?.visible}
            onClose={() => {
                props?.setVisible(false);
                setLayout(undefined);
            }}
            sx={{ mt: { xs: 'var(--Header-height)', sm: 0 }, height: { xs: '90dvh', sm: '100vh' } }}
        >
            <ModalDialog layout={layout}>
                <ModalClose />
                <DialogTitle>選擇來源 - Local Drive</DialogTitle>
                <DialogContent>
                    <Box className="Pagination-laptopUp">
                        <Box sx={{ flex: 1 }} />

                        <Button
                            size="sm"
                            variant="solid"
                            color="primary"
                            disabled={!selectedValue}
                            onClick={() => {
                                handleSelect(selectedValue);
                            }}
                        >
                            <label>確認</label>
                        </Button>
                    </Box>
                    <DriveTable
                        handleSelectedValue={(value: DriveDocument) => {
                            setSelectedValue(value);
                        }}
                        documents={documents}
                    />
                </DialogContent>
            </ModalDialog>
        </Modal>
    );
}
