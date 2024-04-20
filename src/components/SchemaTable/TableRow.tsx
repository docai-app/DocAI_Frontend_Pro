import { SmartExtractionSchema } from "@/utils/types";
/* eslint-disable jsx-a11y/anchor-is-valid */
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

import { Chip, Link } from '@mui/joy';
import Radio from '@mui/joy/Radio';
import moment from 'moment';
import Dropdowns from "./Dropdowns";

interface ViewProps {
    row: SmartExtractionSchema;
    selectedValue?: SmartExtractionSchema;
    setSelectedValue?: any;
    handleSelectedValue?: any;
    visibleRadio?: boolean;
}
export default function TableRow(props: ViewProps) {
    const {
        row,
        selectedValue,
        setSelectedValue,
        handleSelectedValue,
        visibleRadio = false
    } = props
    return (
        <>
            <tr key={row.id}>
                {visibleRadio &&
                    <td style={{ textAlign: 'center', width: 30 }}>
                        <Radio
                            size="sm"
                            checked={selectedValue?.id === row.id}
                            onChange={(event) => {
                                setSelectedValue(row);
                                handleSelectedValue(row);
                            }}
                            name="radio-buttons"
                        />
                    </td>
                }
                <td>
                    <Typography level="body-sm" sx={{ fontWeight: 'bold' }}>
                        <Link href={`document/smart_extraction_schema/${row.id}`}>
                            {row.name}
                        </Link>
                    </Typography>
                </td>
                <td>
                    <Typography level="body-xs">
                        <Chip
                            color="success"
                            sx={{
                                fontSize: 12
                            }}
                        >
                            {row.has_label ? row.label.name : '數據總表'}
                        </Chip>
                    </Typography>
                </td>
                <td>
                    <Typography level="body-xs">
                        {moment(row.updated_at).format('YYYY-MM-DD')}
                    </Typography>
                </td>
                <td>
                    <Typography level="body-xs">{row.user.nickname}</Typography>
                </td>
                {!visibleRadio &&
                    <td>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Dropdowns row={row} />
                        </Box>
                    </td>
                }
            </tr>
        </>
    )
}