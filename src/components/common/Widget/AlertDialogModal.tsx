import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Button from '@mui/joy/Button';
import DialogActions from '@mui/joy/DialogActions';
import DialogContent from '@mui/joy/DialogContent';
import DialogTitle from '@mui/joy/DialogTitle';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import * as React from 'react';

export default function AlertDialogModal(props: any) {
    return (
        <React.Fragment>
            <Modal open={props?.visible || false} onClose={() => props?.setVisible(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRoundedIcon color="warning" />
                        Tip
                    </DialogTitle>
                    <Divider />
                    <DialogContent>{props?.content}</DialogContent>
                    <DialogActions>
                        <Button
                            variant="solid"
                            color="danger"
                            onClick={() => {
                                props?.confirm();
                                props?.setVisible(false);
                            }}
                        >
                            Confirm
                        </Button>
                        <Button
                            variant="plain"
                            color="neutral"
                            onClick={() => props?.setVisible(false)}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
