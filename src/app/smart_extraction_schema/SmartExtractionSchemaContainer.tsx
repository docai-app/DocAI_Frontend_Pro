'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import SmartExtractionSchemaView from './SmartExtractionSchemaView';

const apiSetting = new Api();

function SmartExtractionSchemaContainer() {
    const [data, setData] = React.useState();
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [{ data: getAllLabelsData, error: getAllLabelsError }, getAllLabels] = useAxios(
        apiSetting.Tag.getAllTags(),
        { manual: true }
    );

    const [{ data: getAllSchemasData, error: getAllSchemasError }, getAllSchemas] = useAxios(
        apiSetting.SmartExtractionSchemas.getSmartExtractionSchemas(),
        { manual: true }
    );

    useEffect(() => {
        getAllSchemas();
        getAllLabels();
    }, [router]);

    return (
        <SmartExtractionSchemaView
            {...{
                getAllSchemasData,
                getAllLabelsData
            }}
        />
    );
}

export default SmartExtractionSchemaContainer;
