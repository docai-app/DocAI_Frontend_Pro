import SearchInputView from '@/components/common/Views/SearchInputView';
import { DocumentModel } from '@/models/Document';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Box, Breadcrumbs, FormControl, FormLabel, Link, Typography } from '@mui/joy';
import * as React from 'react';

import SearchFilterView from '@/components/Search/SearchFilterView';
import SearchTree from '@/components/Search/SearchTree';
interface ViewProps {
    data: any;
    documents: DocumentModel[];
    handleSearch: any;
    searchTreeData: any;
    getAllLabelsData: any;
    searchParams: {
        tag_id?: string;
        content?: string;
        date?: string;
        from?: string;
        to?: string;
        page?: number;
    };
    setSearchParams: any;
    loading?: boolean;
}

function SearchView(props: ViewProps) {
    const {
        documents,
        handleSearch,
        searchTreeData,
        getAllLabelsData,
        searchParams,
        setSearchParams,
        loading
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
                        <Link underline="none" color="neutral" href="/" aria-label="Home">
                            Home
                        </Link>
                    </Typography>
                    <Typography color="primary" fontWeight={500} fontSize={12}>
                        文件
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
                <Box
                    className="SearchAndFilters-tabletUp"
                    sx={{
                        borderRadius: 'sm',
                        display: { xs: 'flex', sm: 'flex' },
                        flexWrap: 'wrap',
                        gap: 1.5,
                        '& > *': {
                            minWidth: { xs: '120px', md: '160px' }
                        }
                    }}
                >
                    <FormControl sx={{ flex: 1 }} size="sm">
                        <FormLabel>Search for local drive</FormLabel>
                        <SearchInputView
                            loading={loading}
                            handleSearch={(content: string) => {
                                setSearchParams({
                                    ...searchParams,
                                    content: content
                                });
                                handleSearch();
                            }}
                        />
                    </FormControl>
                    <SearchFilterView
                        getAllLabelsData={getAllLabelsData}
                        setTagId={(id: string) => {
                            setSearchParams({
                                ...searchParams,
                                tag_id: id
                            });
                        }}
                    />
                </Box>

                <SearchTree tree={searchTreeData} getAllLabelsData={getAllLabelsData} />
            </React.Fragment>
        </>
    );
}

export default SearchView;
