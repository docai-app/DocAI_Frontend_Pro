import Api from '@/apis';
import SchemaTable from '@/components/SchemaTable';
import { Label, SmartExtractionSchema } from '@/utils/types';
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

interface ViewProps {
    visible: boolean;
    setVisible: any;
    handleSelect: any;
}
const apiSetting = new Api();
export default function SelectSourceModal(props: ViewProps) {
    const { visible, setVisible, handleSelect } = props;
    const router = useRouter();
    const [layout, setLayout] = React.useState<ModalDialogProps['layout'] | undefined>(undefined);
    const [selectedValue, setSelectedValue] = React.useState<SmartExtractionSchema>();


    const [meta, setMeta] = useState();
    const [page, setPage] = useState(1);
    const [has_label, set_has_label] = useState<any>();
    const [currectLabel, setCurrectLabel] = useState<any>();
    const [smart_extraction_schemas, set_smart_extraction_schemas] = useState<SmartExtractionSchema[]>([])

    const [{ data: getAllLabelsData, error: getAllLabelsError }, getAllLabels] = useAxios(
        apiSetting.Tag.getAllTags(),
        { manual: true }
    );

    const [{ data: getAllSchemasData, error: getAllSchemasError }, getAllSchemas] = useAxios(
        apiSetting.SmartExtractionSchemas.getSmartExtractionSchemas(has_label, page),
        { manual: true }
    );

    const [
        {
            data: getSmartExtractionSchemasByLabelData,
            loading: getSmartExtractionSchemasByLabelLoading
        },
        getSmartExtractionSchemasByLabel
    ] = useAxios(apiSetting.SmartExtractionSchemas.getSmartExtractionSchemasByLabel('', page), {
        manual: true
    });


    useEffect(() => {
        getAllLabels();
    }, [router]);

    useEffect(() => {
        if (getAllSchemasData && getAllSchemasData.success) {
            setMeta(getAllSchemasData.meta);
            if (page == 1) {
                set_smart_extraction_schemas(getAllSchemasData.smart_extraction_schemas);
            } else {
                set_smart_extraction_schemas(
                    smart_extraction_schemas.concat(getAllSchemasData.smart_extraction_schemas)
                );
            }
            // console.log('getSmartExtractionSchemasData', getSmartExtractionSchemasData);
        }
    }, [getAllSchemasData]);

    useEffect(() => {
        if (getSmartExtractionSchemasByLabelData && getSmartExtractionSchemasByLabelData.success) {
            setMeta(getSmartExtractionSchemasByLabelData.meta);
            if (page == 1) {
                set_smart_extraction_schemas(getSmartExtractionSchemasByLabelData.smart_extraction_schema);
            } else {
                set_smart_extraction_schemas(
                    smart_extraction_schemas.concat(getSmartExtractionSchemasByLabelData.smart_extraction_schema)
                );
            }
        }
    }, [getSmartExtractionSchemasByLabelData]);



    useEffect(() => {
        if (currectLabel) {
            getSmartExtractionSchemasByLabel(
                apiSetting.SmartExtractionSchemas.getSmartExtractionSchemasByLabel(
                    currectLabel?.id,
                    page
                )
            );
        } else {
            getAllSchemas(
                apiSetting.SmartExtractionSchemas.getSmartExtractionSchemas(has_label, page)
            )
        }
    }, [router, page, has_label, currectLabel]);

    const handleFilterLabel = (label: Label) => {
        setPage(1)
        if (label) {
            setCurrectLabel(label)
        } else {
            set_has_label(false)
            setCurrectLabel(null)
        }
    }

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
                <DialogTitle>選擇來源 - Local Schema</DialogTitle>
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
                    <SchemaTable
                        visibleRadio={true}
                        getAllLabelsData={getAllLabelsData}
                        smart_extraction_schemas={smart_extraction_schemas}
                        handleSelectedValue={(schema: SmartExtractionSchema) => {
                            setSelectedValue(schema);
                        }}
                        handleFilterLabel={handleFilterLabel}
                    />
                </DialogContent>
            </ModalDialog>
        </Modal>
    );
}
