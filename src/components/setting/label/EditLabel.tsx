// components/feature/classification/AmendLabel.tsx
import { Box, Breadcrumbs, Link, Typography } from '@mui/joy';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import { Dialog, Transition } from '@headlessui/react';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import _ from 'lodash';
import React, { Fragment, useRef, useState } from 'react';

interface EditLabelProps {
    open: boolean;
    setOpen: any;
    tag?: any;
    tagTypes: any;
    newLabelName: string;
    addNewLabelHandler: any;
    setNewLabelName: any;
    updateLabelNameByIdHandler?: any;
    updateTagFunctionsHandler?: any;
    deleteTagFunctionsHandler?: any;
}

export default function EditLabel(props: EditLabelProps) {
    const {
        open,
        setOpen,
        tag,
        tagTypes,
        newLabelName,
        addNewLabelHandler,
        setNewLabelName,
        updateLabelNameByIdHandler,
        updateTagFunctionsHandler,
        deleteTagFunctionsHandler
    } = props;
    const cancelButtonRef = useRef(null);
    const [feature, setFeature] = useState('');
    const inputRef = React.createRef<HTMLInputElement>();
    const confirmDocument = () => {
        setOpen(false);
        if (tag) {
            updateLabelNameByIdHandler(tag.id, inputRef.current?.value, tag.is_checked);
        } else {
            addNewLabelHandler();
        }
    };
    const isContain = (value: any) => {
        const index = _.findIndex(tag?.functions, function (func: any) {
            return func.id == value;
        });
        return index == -1;
    };

    return (
        <React.Fragment>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* This element is to trick the browser into centering the modal contents. */}
                    {/* <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span> */}
                    <DialogTitle>
                        <PencilSquareIcon
                            className="h-6 w-6 text-sky-600"
                            aria-hidden="true"
                        />
                        {tag ? '編輯標籤' : '新增標籤'}
                    </DialogTitle>
                    <form
                        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            setFeature('');
                            confirmDocument();
                            setOpen(false);
                        }}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>名稱:</FormLabel>
                                <Input autoFocus required
                                    id="type"
                                    name="type"
                                    type="string"
                                    defaultValue={tag && tag.name}
                                    onChange={async (e) => {
                                        setNewLabelName(e.target.value);
                                    }} />
                                {tag && tagTypes && tagTypes?.functions && (
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <FormLabel>名稱:</FormLabel>
                                        {tagTypes?.functions?.map(
                                            (item: any, index: number) => {
                                                return (
                                                    <Checkbox key={index} color="primary" variant="solid"
                                                        name={item.title}
                                                        defaultChecked={!isContain(item.id)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                updateTagFunctionsHandler(
                                                                    tag.id,
                                                                    item.id
                                                                );
                                                            } else {
                                                                deleteTagFunctionsHandler(
                                                                    tag.id,
                                                                    item.id
                                                                );
                                                            }
                                                        }}
                                                    // sx={{ [`& > .${checkboxClasses.checkbox}`]: { position: 'relative' } }}
                                                    // slotProps={{ action: { className: checkboxClasses.focusVisible } }} 
                                                    />
                                                );
                                            })
                                        }
                                    </Box>
                                )}
                            </FormControl>

                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center' }}>
                                <Button
                                    onClick={() => {
                                        setFeature('');
                                        setOpen(false);
                                    }}
                                    ref={cancelButtonRef}
                                >取消</Button>
                                <Button color="neutral" type="submit">確認</Button>
                            </Box>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment >

    );
}
