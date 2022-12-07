import * as Yup from 'yup';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Backdrop, Box, Card, Container, Grid, Snackbar, Stack, Typography } from "@mui/material";
import Page from "../../../shared/components/Page";
import { FormProvider, RHFTextField } from '../../../shared/components/hook-form';
import {  getStorageItem, postDataAuth } from '../../../shared/utils/helper/generalFunctions';
import { BASE } from '../../../shared/utils/helper/urls';
import ConfirmDialog from '../../../shared/components/ConfirmDialog';

const raw = getStorageItem('profile')
let profile = { customer_account_number: '' }
if (raw !== '') {
    profile = JSON.parse(raw)
} 

export default function WithdrawMoney() {
    // const profile = useSelector(state => state.profile)
    const WithdrawMoneySchema = Yup.object().shape({
        beneficiary_account_number: Yup.string()
            .required('Invalid account number'),
        sasapay_agent_number: Yup.string().required("Agent number is required"),
        amount: Yup.number().min(1, 'Invalid payment amount')
            .required('Provide a valid amount'),
    });

    const defaultValues = {
        beneficiary_account_number: profile&&profile.customer_account_number,
        amount: 0,
        sasapay_agent_number: ''
    }
    // React.useEffect(() => {

    // }, [profile])

    const methods = useForm({
        resolver: yupResolver(WithdrawMoneySchema),
        defaultValues,
    });

    const {
        handleSubmit, getValues, reset,
        formState: { isSubmitting },

    } = methods;

    const [state, setState] = React.useState({
        open: false,
        isOpen: false,
        vertical: 'top',
        horizontal: 'center',
        severity: 'error',
        message: '',
        openSasaPayDiag: false,
        confirmed: false,
        submitting: false
    });

    const { vertical, horizontal, severity, isOpen, message, confirmed, submitting } = state;

    const [backDropOpen, setBackDropOpen] = React.useState(false)
    const [confirmMessage, setConfirmMessage] = React.useState('')
    const onSubmit = async () => {
        if (confirmed) {
            toggleConfirmDialog()
            setState({ ...state, submitting: true })
            const values = getValues()
            const response = await postDataAuth(`${BASE}waas/cashout/`, values, 'POST')
            if (response.status) {
                setBackDropOpen(!backDropOpen)
                reset()
            }
            setState({ ...state, isOpen: true, message: response.message, severity: response.status ? 'success' : 'error', confirmed: false, submitting: false });
        } else {
            const values = getValues()
            const response = await postDataAuth(`${BASE}waas/cashout-confirm/`, values, 'POST')

            if (response.status) {
                setConfirmMessage(response.message)
                toggleConfirmDialog()
                setState({ ...state, confirmed: true });
            } else {
                setState({ ...state, isOpen: true, message: response.message, severity: response.status ? 'success' : 'error' });
            }
        }
    };



    const handleSnackClose = () => {
        setState({ ...state, isOpen: false });
    };


    const toggleConfirmDialog = () => {
        setBackDropOpen(!backDropOpen)
    };

    return (
        <Page title='WIthdraw Money'>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backDropOpen}
            >
                <ConfirmDialog title='Confirm' open={backDropOpen} onDecline={toggleConfirmDialog} showDismiss={false} acceptText='Proceed' onDismiss={toggleConfirmDialog} cancelText='Cancel!' isSubmitting={isSubmitting}
                    message={confirmMessage} onConfirm={onSubmit} />

            </Backdrop>

            <Snackbar key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }} open={isOpen} autoHideDuration={20000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <Container maxWidth='md'>
                <Grid item xs={12} md={12} lg={12}>
                    <Card>
                        <Stack direction="column" mr={5} ml={5} mt={5} mb={5}>
                            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                                <Stack direction='row'>
                                    <Box sx={{ pb: 2 }}>
                                        <Typography variant='body1'>Withdraw Money to Agent</Typography>
                                    </Box>
                                </Stack>
                                <Stack spacing={3}>
                                    <RHFTextField name="sasapay_agent_number" label="Agent  number" />
                                    <RHFTextField fullWidth={false} name="amount" label="Transaction Amount" />
                                </Stack>


                                <Stack sx={{ mt: 3 }} alignItems="end">
                                    <LoadingButton
                                        autoFocus
                                        size="small"
                                        type='submit'
                                        color='info'
                                        variant="contained"
                                        loading={isSubmitting || submitting}
                                    >
                                        Initiate Withdrawal
                                    </LoadingButton>
                                </Stack>
                            </FormProvider>
                        </Stack>
                    </Card>
                </Grid>
            </Container>
        </Page>
    )
}