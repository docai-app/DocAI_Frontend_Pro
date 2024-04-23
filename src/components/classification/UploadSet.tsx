// import { CheckBox } from '@mui/icons-material';
import { Box, Breadcrumbs, Link, Typography, Chip, Button, Input, Card } from '@mui/joy';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import Autocomplete from '@mui/joy/Autocomplete';

interface UploadSetProps {
    needAutoUpload?: boolean;
    setNeedAutoUpload: any;
    needs_deep_understanding?: boolean;
    set_needs_deep_understanding: any;
    set_needs_approval: any;
    setTagId: any;
    set_form_schema_id: any;
    getAllLabelsData: any;
    schemasStatusReadyData: any;
}

export default function UploadSet(props: UploadSetProps) {
    const {
        needAutoUpload,
        setNeedAutoUpload,
        needs_deep_understanding,
        set_needs_deep_understanding,
        set_needs_approval,
        setTagId,
        set_form_schema_id,
        getAllLabelsData,
        schemasStatusReadyData
    } = props;
    return (
        <>
            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography level="h2" fontSize="md">批量上傳</Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Checkbox
                        name="needAutoUpload"
                        onChange={(e) => {
                            setNeedAutoUpload(e.target.checked);
                        }} />
                    <Typography level="title-lg" fontSize="md">是否需要自動批量上傳? {' '}
                        <Typography level="body-sm" color="neutral">(需要統一標籤)</Typography>
                    </Typography>
                </Box>

                {needAutoUpload && (
                    <>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Typography level="title-md" sx={{width:'20%'}}>批量文件的類別:</Typography>
                            {/* <Autocomplete
                                id="select_tag"
                                name="location"
                                placeholder="請選擇類別"
                                options={getAllLabelsData?.tags.name}
                                sx={{ width: "60%" }}
                                
                            /> */}

                            <select
                                id="select_tag"
                                name="location"
                                className="block w-2/3 rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue=""
                                onChange={(e) => {
                                    setTagId(e.target.value);
                                }}
                            >
                                <option value="" disabled>
                                    請選擇類別
                                </option>
                                {getAllLabelsData?.tags.map((tag: any, index: number) => {
                                    return (
                                        <option key={index} value={tag.id}>
                                            {tag.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Checkbox
                                name="needAutoUpload"
                                onChange={(e) => {
                                    set_needs_deep_understanding(e.target.checked);
                                }} />
                            <Typography level="title-lg" fontSize="md">是否需要表格深度理解? {' '}
                                <Typography level="body-sm" color="neutral">(需要統一標籤)</Typography>
                            </Typography>
                        </Box>
                    </>
                )}
                
                {needs_deep_understanding && (
                    <>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Typography level="title-md" sx={{width:'20%'}}>表格深度理解的模型:</Typography>
                            <select
                                id="select_tag_function"
                                name="location"
                                className="block w-2/3 rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue=""
                                onChange={(e) => {
                                    set_form_schema_id(e.target.value);
                                }}
                            >
                                <option value="" disabled>
                                    請選擇模型
                                </option>
                                {schemasStatusReadyData?.form_schema?.map(
                                    (schema: any, index: number) => {
                                        return (
                                            <option key={index} value={schema.id}>
                                                {schema.name}
                                            </option>
                                        );
                                    }
                                )}
                            </select>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Checkbox
                                name="needApproval"
                                onChange={(e) => {
                                    set_needs_approval(e.target.checked);
                                }} />
                            <Typography level="title-lg" fontSize="md"> 是否需要進行審批?</Typography>
                        </Box>
                    </>
                )}
            </Card>
        </>
    );
}
