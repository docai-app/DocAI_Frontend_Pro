import { FormControl, FormLabel, Select } from "@mui/joy";
import Option from '@mui/joy/Option';
import React from "react";

interface ViewProps {
    setTagId: any;
    getAllLabelsData: any;
}

export default function SearchFilterView(props: ViewProps) {
    const {
        setTagId,
        getAllLabelsData
    } = props;

    const handleChange = (event: any, newValue: any) => {
        console.log(newValue);
        setTagId(newValue)
    };

    const renderFilters = () => (

        <React.Fragment>
            <FormControl size="sm">
                <FormLabel>標籤</FormLabel>
                <Select
                    size="sm"
                    placeholder="請選擇標籤"
                    slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                    onChange={handleChange}
                >
                    {getAllLabelsData?.tags?.map((tag: any, index: number) => (
                        <Option value={tag?.id} key={index} >{tag?.name}</Option>
                    ))}
                </Select>
            </FormControl>
        </React.Fragment>
    );

    return (
        <>
            {renderFilters()}
        </>
    )
}