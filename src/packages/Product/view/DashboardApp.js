// components
import {
    Container,
    Typography,
    Divider,
    Breadcrumbs,
    Link,
     Stack
} from '@mui/material';
import Page from '../../../shared/components/Page';
import {ProductList} from "../../../shared/sections/@dashboard/products";
import PRODUCTS from "../../../shared/_mock/odoo_products.json";

// ----------------------------------------------------------------------

export default function DashboardApp() {
    console.log(PRODUCTS)
    return (
        <Page title="Dashboard">
            <Container maxWidth="xl">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Dashboard
                    </Link>
                    <Typography color="text.primary">Products</Typography>
                </Breadcrumbs>
                <Divider sx={{mt:2}}/>
                <Stack sx={{mt:5}}>
                    <ProductList products={PRODUCTS.result} />
                </Stack>

            </Container>
        </Page>
    );
}
