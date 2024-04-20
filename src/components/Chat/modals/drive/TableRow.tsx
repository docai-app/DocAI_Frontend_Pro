import { DriveDocument } from '@/utils/types';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Chip, Link, Radio, Typography } from '@mui/joy';
import moment from 'moment';

interface TableRowProps {
    doc: DriveDocument;
    type: 'documents' | 'folders';
    selectedValue: any;
    setSelectedValue: any;
    handleSelectedValue: any;
}
export default function TableRow(props: TableRowProps) {
    const { doc, type, selectedValue, setSelectedValue, handleSelectedValue } = props;

    const url = doc.storage_url || `/drive/${doc.id}`;

    return (
        <>
            <tr key={doc.id}>
                <td style={{ textAlign: 'center', width: 120 }}>
                    <Radio
                        size="sm"
                        checked={selectedValue?.id === doc.id}
                        onChange={(event) => {
                            setSelectedValue(doc);
                            handleSelectedValue(doc);
                        }}
                        name="radio-buttons"
                    />
                </td>
                <td>
                    <Typography
                        level="body-sm"
                        sx={{ fontWeight: 'bold' }}
                        startDecorator={
                            type === 'documents' ? (
                                <InsertDriveFileIcon color="info" />
                            ) : (
                                <FolderIcon color="primary" />
                            )
                        }
                    >
                        {type === 'folders' ? (
                            <Link href={`${url}?name=${doc.name}`} className="hover:underline">
                                {doc.name}
                            </Link>
                        ) : (
                            <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline"
                            >
                                {doc.name}
                            </a>
                        )}
                    </Typography>
                </td>
                <td>
                    {type !== 'folders' &&
                    doc?.is_classified === false &&
                    doc?.labels?.length == 0 ? (
                        <Chip
                            color="danger"
                            sx={{
                                fontSize: 12
                            }}
                        >
                            {'未分類'}
                        </Chip>
                    ) : (
                        doc?.labels?.map((label: any, index: number) => {
                            return (
                                <Chip
                                    key={index}
                                    color="success"
                                    sx={{
                                        fontSize: 12
                                    }}
                                >
                                    {label?.name}
                                </Chip>
                            );
                        })
                    )}
                </td>
                <td>
                    <Typography level="body-xs">
                        {moment(doc.updated_at).format('YYYY-MM-DD')}
                    </Typography>
                </td>
                <td>
                    <Typography level="body-xs">{doc.user?.nickname}</Typography>
                </td>
            </tr>
        </>
    );
}
