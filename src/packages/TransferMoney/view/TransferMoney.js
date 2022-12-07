import * as Yup from 'yup';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Alert, Backdrop, Box, Card, Chip, Container, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Radio, RadioGroup, Select, Snackbar, Stack, Typography } from "@mui/material";
import Page from "../../../shared/components/Page";
import { FormProvider, RHFTextField } from '../../../shared/components/hook-form';
import { getStorageItem, postDataAuth } from '../../../shared/utils/helper/generalFunctions';
import { BASE } from '../../../shared/utils/helper/urls';
import ConfirmDialog from '../../../shared/components/ConfirmDialog';

const ITEM_HEIGHT = 60;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const METHODS = {
    '0': 'SasaPay',
    '63902': 'M-PESA',
    '63903': 'AIRTEL',
    '63907': 'T-KASH',
    'bank': 'BANK',
}

const raw = getStorageItem('profile')
let profile = { customer_account_number: '' }
if (raw !== '') {
    profile = JSON.parse(raw)
} 

export default function TransferMoney() {
    // const profile = useSelector(state => state.profile)
    const TransferSchema = Yup.object().shape({
        beneficiary_account_number: Yup.string(),
        receiver_account_number: Yup.string()
            .when("network_code", {
                is: '0' || 'bank',
                then: Yup.string('This field is required')
                    .required('Please provide this field')
            }).notRequired(),
        network_code: Yup.string()
            .required('Please select a Top Up method'),
        mobile_number: Yup.string()
            .when("network_code", {
                is: '63902' || '63903' || '63907',
                then: Yup.string('This field is required')
                    .required('Please provide this field')
            }).notRequired(),
        amount: Yup.number().min(1, 'Invalid payment amount')
            .required('Provide a valid amount'),
        channel_code: Yup.string()
    });

    // React.useEffect(() => {

    // }, [profile])
    const defaultValues = {
        network_code: "0",
        mobile_number: '',
        beneficiary_account_number: profile && profile.customer_account_number,
        amount: 0,
        receiver_account_number: '',
        channel_code: ''
    }
    const methods = useForm({
        resolver: yupResolver(TransferSchema),
        defaultValues,
    });

    const {
        handleSubmit, getValues, setValue, reset,
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
        submitting: false,
        channelCodes: []
    });

    const { vertical, horizontal, severity, isOpen, message, confirmed, submitting, channelCodes } = state;

    const [backDropOpen, setBackDropOpen] = React.useState(false)
    const [transferoption, setTransferOption] = React.useState('0')
    const [confirmMessage, setConfirmMessage] = React.useState('')
    const [options, setOptions] = React.useState(METHODS)
    const toggleConfirmDialog = () => {
        setBackDropOpen(!backDropOpen)
    };



    const handleSnackClose = () => {
        setState({ ...state, isOpen: false });
    };

    const getOptionUI = (type) => {
        const UIs = {
            '0': <RHFTextField name="receiver_account_number" label="Mobile Number" />,
            'bank': <RHFTextField name="receiver_account_number" label="Bank Account Number" />,
            'default': <RHFTextField name="mobile_number" label="Mobile Number" />,
        };
        // setValue('mobile_number', '')
        // setValue('receiver_account_number', '')
        return (UIs[type] || UIs.default);
    }

    const onSubmit = async () => {
        if (confirmed) {
            toggleConfirmDialog()
            setState({ ...state, submitting: true })
            const values = getValues()
            let PATH = ''
            if (values.network_code === '0') {
                PATH = 'waas/send/sasapay-user/'
            } else if (values.network_code === 'bank') {
                PATH = 'waas/send/bank/'
            } else {
                PATH = 'waas/send/mobile-money/'
            }

            const response = await postDataAuth(`${BASE}${PATH}`, values, 'POST')

            if (response.status) {
                setBackDropOpen(!backDropOpen)
                reset()
            }
            setState({ ...state, isOpen: true, message: response.message, severity: response.status ? 'success' : 'error', confirmed: false, submitting: false });
        } else {
            const values = getValues()
            let PATH = ''
            if (values.network_code === '0') {
                PATH = 'waas/send/sasapay-user-confirm/'
            } else if (values.network_code === 'bank') {
                PATH = 'waas/send/bank-confirm/'
            } else {
                PATH = 'waas/send/mobile-money-confirm/'
            }


            const response = await postDataAuth(`${BASE}${PATH}`, values, 'POST')


            if (response.status) {
                setConfirmMessage(response.message)
                toggleConfirmDialog()
                setState({ ...state, confirmed: true });
            } else {
                setState({ ...state, isOpen: true, message: response.message, severity: response.status ? 'success' : 'error' });
            }
        }
    };


    const getChannels = async () => {
        const response = await postDataAuth(`${BASE}waas/channel-codes/`, {}, 'GET')
        if (response.status) {
            setState({ ...state, channelCodes: response.channel_codes })
        } else {
            setState({ ...state, isOpen: true, message: response.message, severity: response.status ? 'success' : 'error' });
        }
    }
    return (
        <Page title='Transfer'>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backDropOpen}
            >
                <ConfirmDialog title='Confirm' open={backDropOpen} acceptText='Confirm' onDecline={() => {
                    reset()
                    toggleConfirmDialog()
                    setState({ ...state, confirmed: false })
                }} showDismiss={false} cancelText='Cancel!' isSubmitting={isSubmitting}
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
                                        <Typography variant='body1'>Transfer Money</Typography>
                                    </Box>
                                </Stack>
                                <Stack spacing={3}>

                                    <FormControl>
                                        <FormLabel id="payment_channel">Transfer Method</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="payment_channel"
                                            name="network_code"
                                            onChange={(e) => {
                                                setValue('network_code', e.target.value);
                                                setTransferOption(e.target.value)
                                                if (e.target.value === 'bank') {
                                                    getChannels()
                                                }
                                            }}

                                            defaultValue='0'
                                        >
                                            {
                                                Object.values(options).map((key, index) => <FormControlLabel key={index} value={Object.keys(options)[index]} control={<Radio />} label={key} />)
                                            }

                                        </RadioGroup>
                                    </FormControl>
                                    {transferoption === 'bank' && <>
                                        <InputLabel id="channel-code">Destination Bank</InputLabel>
                                        <Select
                                            labelId="channel-code"
                                            id="channel_code"
                                            name="channel_code"
                                            onChange={(e) => {
                                                setValue('channel_code', e.target.value);
                                            }}
                                            input={<OutlinedInput label="Destination Bank" />}
                                            renderValue={(value) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    <Chip key={value} label={channelCodes.filter(p => p.bank_code === value)[0].bank_name} />
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            <MenuItem disabled value="">
                                                <em>Choose an option</em>
                                            </MenuItem>
                                            {channelCodes && channelCodes.map((bank) => (
                                                <MenuItem key={bank.bank_code} value={bank.bank_code}>
                                                    <ListItemText primary={bank.bank_name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </>}
                                    {getOptionUI(transferoption)}
                                    <RHFTextField fullWidth={false} name="amount" label="Transfer Amount" />
                                </Stack>


                                <Stack sx={{ mt: 3 }} alignItems="end">
                                    <LoadingButton
                                        autoFocus
                                        size="small"
                                        type='submit'
                                        color='info'
                                        // onClick={toggleOpen}
                                        variant="contained"
                                        loading={isSubmitting || submitting}
                                    >
                                        Initiate Payment
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