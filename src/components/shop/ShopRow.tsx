import { Box, Breadcrumbs, Link, Typography, Chip, Button, Input, Card } from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import useAlert from '../../hooks/useAlert';

import LocalGroceryStoreTwoToneIcon from '@mui/icons-material/LocalGroceryStoreTwoTone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
interface Props {
    title: string;
    description: string;
    price: string;
}

export default function ShopRow(props: Props) {
    const { title, description, price } = props;
    const { setAlert } = useAlert();
    return (
        <>
            <Card
                variant="outlined"
                color="primary"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '12rem',
                    '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' }
                }}
            >
                <Box>
                    <Typography
                        level="title-sm"
                        fontWeight={600}
                        color="primary"
                        sx={{ overflow: 'hidden' }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        level="body-sm"
                        fontSize={12}
                        sx={{ mt: 0.5, overflow: 'hidden', height: '9rem' }}
                    >
                        {description}
                    </Typography>
                </Box>

                <Chip
                    size="lg"
                    variant="plain"
                    startDecorator={<AttachMoneyIcon />}
                    sx={{ position: 'absolute', bottom: '0.875rem', left: '0.5rem' }}
                >
                    {price}
                </Chip>
                <IconButton
                    aria-label="Add to cart"
                    variant="plain"
                    color="primary"
                    size="md"
                    sx={{ position: 'absolute', bottom: '0.875rem', right: '0.5rem' }}
                    onClick={() => {
                        setAlert({
                            title: '新功能開發中，敬請期待！',
                            type: 'info'
                        });
                    }}
                >
                    <LocalGroceryStoreTwoToneIcon />
                </IconButton>
            </Card>
        </>
    );
}
