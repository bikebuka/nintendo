// components
import {
    Grid,
    Container,
    Typography,
    Divider,
    Breadcrumbs,
    Link,
    Card,
    CardContent,
    CardHeader, Stack
} from '@mui/material';
import Page from '../../../shared/components/Page';
import { AppWidgetSummary } from '../../../shared/sections/@dashboard/app';
import AuthService from "../../../core/access-control/AuthService";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../store/DashboardAction";
import {useEffect} from "react";
import SpinnerLoader from "../../../shared/plugin/loader/SpinnerLoader";

// ----------------------------------------------------------------------

export default function DashboardApp() {
    const user=AuthService?.user
    const dispatch=useDispatch()
    const {profile,loading}=useSelector(state=>state.DashboardReducer)

    useEffect(() => {
        dispatch(getProfile(user.mobile_number))
    }, [dispatch]);

    return (
        <Page title="Dashboard">
            <Container maxWidth="xl">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Dashboard
                    </Link>
                    <Typography color="text.primary">Statistics</Typography>
                </Breadcrumbs>
                <Divider sx={{mt:2}}/>
                {
                    loading ?
                        <Grid container justifyContent='center'>
                            <Grid item mt={5}>
                                <SpinnerLoader/>
                            </Grid>
                        </Grid>
                        :
                        <Stack mt={5}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <AppWidgetSummary title="AML SCORE" value={profile?.aml_score} icon={'ic:outline-business'} />
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <AppWidgetSummary title="REDEEMED POINTS" value={profile?.redeemed_points} color="info" icon={'ri:bank-fill'} />
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <AppWidgetSummary title="CUMULATIVE SPENT AMOUNT" currency="KES" value={profile?.cumulative_spent_amount} color="warning" icon={'carbon:types'} />
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <AppWidgetSummary title=" AVAILABLE POINTS" value={profile?.available_points} color="error" icon={'material-symbols:group-work-outline'} />
                                </Grid>
                            </Grid>

                            {
                                profile && <Stack>
                                    <Divider sx={{ mt: 2 }} />
                                    <Grid sx={{ mt: 3 }} container spacing={3}>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <AppWidgetSummary  title='Account Balance' currency={`${profile?.currency_code} `} value={parseInt(user?.customer_balance, 10)} icon='fa-solid:wallet' color='primary' />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <AppWidgetSummary isInt={false} title='Account Number' value={profile?.customer_account_number} icon='bxs:user-account' color='error' />
                                        </Grid>
                                    </Grid>
                                </Stack>
                            }
                        </Stack>
                }

            </Container>
        </Page>
    );
}
