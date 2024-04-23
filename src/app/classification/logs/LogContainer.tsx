'use client';

import useAxios from 'axios-hooks';
import moment from 'moment';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Api from '../../../apis/index';
import LogView from './LogView';

const apiSetting = new Api();

function LogContainer() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [{ data: countDocumentsStatusByDateData, loading }, countDocumentsStatusByDate] =
        useAxios(
            apiSetting.Statistics.countDocumentsStatusByDate(
                moment().format('YYYY-MM-DD'),
                searchParams.get('page')
            ),
            {
                manual: true
            }
        );

    useEffect(() => {
        countDocumentsStatusByDate();
    }, [countDocumentsStatusByDate]);

    const [currentTabStatus, setCurrentTabStatus] = useState<'all' | 'unfinish' | 'finish'>('all');

    const [props, setProps] = useState<any>({
        currentTabStatus: currentTabStatus,
        setCurrentTabStatus: setCurrentTabStatus
    });

    useEffect(() => {
        setProps((p: any) => ({
            ...p,
            currentTabStatus: currentTabStatus,
            setCurrentTabStatus: setCurrentTabStatus,
            countDocumentsStatusByDateData
        }));
    }, [currentTabStatus, countDocumentsStatusByDateData]);

    useEffect(() => {
        const interval = setInterval(() => {
            countDocumentsStatusByDate();
            console.log('This will load data');
        }, 1000 * 10);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <LogView
                // data = {data}
                loading={loading}
                {...props}
            />
        </>
    );
}
export default LogContainer;
