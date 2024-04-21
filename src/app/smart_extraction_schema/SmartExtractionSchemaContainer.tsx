'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import { Label, SmartExtractionSchema } from '@/utils/types';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SmartExtractionSchemaView from './SmartExtractionSchemaView';

const apiSetting = new Api();

function SmartExtractionSchemaContainer(props: any) {
    const [data, setData] = React.useState();
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();
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
        <SmartExtractionSchemaView
            {...{
                smart_extraction_schemas,
                getAllLabelsData,
                handleFilterLabel
            }}
        />
    );
}

export default SmartExtractionSchemaContainer;
