import SearchInputView from '@/components/common/Views/SearchInputView';
import { DocumentModel } from '@/models/Document';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Box, Breadcrumbs, Link, Sheet, Typography } from '@mui/joy';
import * as React from 'react';

import SearchTree from '@/components/Search/SearchTree';
interface ViewProps {
    data: any;
    documents: DocumentModel[];
    handleSearch: any;
    searchTreeData: any;
    getAllLabelsData: any;
}

function SearchView(props: ViewProps) {
    const { documents, handleSearch, searchTreeData, getAllLabelsData } = props;

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
                        Home
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    mb: 1,
                    gap: 1,
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'start', sm: 'center' },
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                }}
            >
                <Typography level="h2" component="h1">
                    Search Local Drive
                </Typography>
            </Box>
            <React.Fragment>
                <Sheet
                    className="SearchAndFilters-mobile"
                    sx={{
                        display: { xs: 'flex', sm: 'flex' },
                        my: 1,
                        gap: 1
                    }}
                >
                    <SearchInputView handleSearch={handleSearch} />
                </Sheet>

                <SearchTree
                    document={documents}
                    setChecedkData={undefined}
                    // checked={_.includes(documents_items, document?.id)}
                    setDocument={undefined}
                    tree={searchTreeData}
                    getAllLabelsData={getAllLabelsData}
                />
            </React.Fragment>
        </>
    );
}

export default SearchView;
