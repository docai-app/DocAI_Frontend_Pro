import SchemaTable from '@/components/SchemaTable';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Box, Breadcrumbs, Link, Typography } from '@mui/joy';

interface ViewProps {
    getAllSchemasData: any;
    getAllLabelsData: any;
}

function SmartExtractionSchemaView(props: ViewProps) {
    const {
        getAllSchemasData,
        getAllLabelsData
    } = props;

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Breadcrumbs
                    size="sm"
                    aria-label="breadcrumbs"
                    separator={<ChevronRightRoundedIcon />}
                    sx={{ pl: 0 }}
                >
                    <Link underline="none" color="neutral" href="/" aria-label="Home">
                        <HomeRoundedIcon />
                    </Link>
                    <Typography color="primary" fontWeight={500} fontSize={12}>
                        數據源
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'start', sm: 'center' },
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                }}
            >
                <Typography level="h2" component="h1">
                    數據源
                </Typography>
            </Box>


            <SchemaTable
                {...{
                    getAllSchemasData,
                    getAllLabelsData,
                    handleSelectedValue: () => { }
                }}
            />
        </>
    );
}

export default SmartExtractionSchemaView;
