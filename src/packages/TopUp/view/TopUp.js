import * as Yup from 'yup';
import * as React from 'react';
import {AlertTitle, LoadingButton} from '@mui/lab';
import {useDispatch, useSelector} from 'react-redux';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Alert,
    Avatar,
    Box, Button,
    Card, CardContent,
    CardHeader, CircularProgress,
    Container, CssBaseline,
    Divider,
    Grid, MenuItem, Paper,
    Stack, Step, StepLabel, Stepper, Typography
} from "@mui/material";
import Page from "../../../shared/components/Page";
import { FormProvider, RHFTextField } from '../../../shared/components/hook-form';
import {StyledBadge} from "../../../shared/components/styledBadge/Styledbadge";
import {ColorlibConnector, ColorlibStepIcon} from "../../../shared/components/stepper/Stepper";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import AuthService from "../../../core/access-control/AuthService";
import {ToastContainer} from "react-toastify";
import MuiPhoneNumber from "material-ui-phone-number";
import {ArrowLeft} from "@mui/icons-material";
import * as yup from "yup";
import {topUpConfirmation, topUpMyAccount} from "../store/TopUpAction";
import ContactlessIcon from '@mui/icons-material/Contactless';
import SpinnerLoader from "../../../shared/plugin/loader/SpinnerLoader";
import OTPInput from 'otp-input-react'

let profile = AuthService?.user;


ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const steps = ['Start Transaction', 'Finish Transaction',];


export default function TopUp() {
    const [currentStep,setCurrentStep]=useState(0)
    const {submitting,verifyingOTP,hasSentOTP,checkout_request_id,verified}=useSelector(state=>state.TopUpReducer)
    const [verification_code,setVerificationCode]=useState('')
    const [requestId,setCheckoutRequestId]=useState("")

    const dispatch=useDispatch()
    // const profile = useSelector(state => state.profile)
    const SendMoneySchema = Yup.object().shape({
        'amount': Yup.string().required('Please provide amount'),
        'mobile_number': Yup.string().required('Please provide mobile number'),
        'network_code': Yup.string().required('Please provide operator'),
        'account_number': Yup.string().required('Please provide account number')
            .oneOf([profile.customer_account_number,null],'This is not your account number')
    });


    const defaultValues = {
        account_number: profile?.customer_account_number,
        amount: "",
        network_code: "",
        mobile_number:''
    }
    const methods = useForm({
        resolver: yupResolver(SendMoneySchema),
        defaultValues,
    });

    const {
        handleSubmit, getValues,setValue,

    } = methods;

    const onSubmit = async () => {
        dispatch(topUpMyAccount(getValues()))
    };
    //
    useEffect(()=>{
        if (hasSentOTP) {
            setCurrentStep(1)
            setCheckoutRequestId(checkout_request_id)
        }
    },[hasSentOTP,checkout_request_id])
    //
    const handleOnPhoneChange= (value) => {
        setValue('mobile_number',value);
    }
    //verify
    useEffect(() => {
        let payload=getValues();
        //
        if (verification_code.length===6) {
            let data = {
                account_number: payload.account_number,
                checkout_request_id: requestId,
                verification_code
            };
            dispatch(topUpConfirmation(data))

            setTimeout(()=>{

            })
        }
    }, [verification_code]);
    //check if payment has been verified
    useEffect(() => {
        if (verified) {
            setCurrentStep(0)
        }
    }, [verified]);

    //
    return (
        <Page title='Load Wallet'>
            <ToastContainer theme="colored"/>
            <Container maxWidth='md'>
                <Grid item xs={12} md={12} lg={12}>
                    <Card>
                        <CardHeader
                            title={<h4 className="textSecondary">Load Wallet</h4>}
                            action={<img src={require('../../../shared/assets/aziz-final-icon-trans.png')} alt='' width="100" height={100}/>}
                            sx={{}}
                        />
                        <Divider sx={{mt:2}}/>
                        <Box sx={{width:'100%'}}>
                            <Stepper alternativeLabel activeStep={currentStep} connector={<ColorlibConnector />}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                        <Box sx={{width: '70%',margin: 'auto'}}>
                            {
                                currentStep===0 ?
                                    <>
                                        <Stack direction="column" mr={5} ml={5} mt={5} mb={5}>
                                            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                                                <Stack mb={3} spacing={3} direction={'row'}>
                                                    <RHFTextField select name="network_code" variant="standard" label="Who is the Operator?" >
                                                        <MenuItem key={"0"} value={"0"}>SasaPay</MenuItem>
                                                    </RHFTextField>
                                                    <RHFTextField readonly name="account_number" variant="standard" label="Account Number" placeholder={"Dinner"} />
                                                </Stack>

                                                <Stack spacing={3} direction={'row'}>
                                                    <RHFTextField name="amount" variant="standard" label="How Much?" placeholder={"KES 50"}/>
                                                </Stack>
                                                <Stack spacing={3} direction={'row'} sx={{mt:5}}>
                                                    <h3>From SasaPay Account?</h3>
                                                </Stack>
                                                <Stack spacing={3} direction={'row'} sx={{mt:5}}>
                                                    <StyledBadge
                                                        overlap="circular"
                                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                        variant="dot"
                                                    >
                                                        <Avatar alt="Aziz User" src="/static/images/avatar/1.jpg" />
                                                    </StyledBadge>
                                                    <MuiPhoneNumber label={"Enter SasaPay account to load money from"} fullWidth defaultCountry={'ke'} onlyCountries={['ke']} onChange={handleOnPhoneChange}/>

                                                </Stack>
                                                <Stack direction="row" spacing={3} mt={5}>
                                                    <LoadingButton
                                                        size="large"
                                                        type='submit'
                                                        fullWidth
                                                        color='primary'
                                                        variant="contained"
                                                    >
                                                        {submitting? 'Processing...' : 'Send OTP'} <ArrowCircleRightIcon color="white"/>
                                                    </LoadingButton>
                                                </Stack>

                                            </FormProvider>
                                        </Stack>
                                    </>
                                    :
                                    <>
                                        <Stack direction="column" mr={5} ml={5} mt={5} mb={5}>
                                            <Card spacing={3}>
                                                <CardHeader
                                                    title={""}
                                                />
                                                <CardContent>
                                                    <Container component="main" maxWidth="sm">
                                                        <CssBaseline />
                                                        <div>
                                                            <Grid
                                                                container
                                                                style={{ backgroundColor: "white" }}
                                                                justify="center"
                                                                alignItems="center"
                                                                spacing={3}
                                                            >
                                                                <Grid item container justify="center">
                                                                    <Grid item container alignItems="center" direction="column">
                                                                        <Grid item>
                                                                            <Avatar>
                                                                                <ContactlessIcon color="error"/>
                                                                            </Avatar>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Typography component="h1" variant="h5">
                                                                                Verification Code
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={12} textAlign="center">
                                                                    <Paper elevation={0}>
                                                                        <Typography variant="h6">
                                                                         Verification code sent to your phone.
                                                                        </Typography>
                                                                    </Paper>
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    container
                                                                    justify="center"
                                                                    alignItems="center"
                                                                    direction="column"
                                                                >
                                                                    <Grid item spacing={3} justify="center">
                                                                        <OTPInput
                                                                            autoFocus
                                                                            OTPLength={6}
                                                                            value={verification_code}
                                                                            onChange={setVerificationCode}
                                                                            otpType="number"
                                                                            disabled={false}
                                                                            secure
                                                                            separator={
                                                                                <span>-</span>
                                                                            }
                                                                            inputStyle={{
                                                                                width: "4rem",
                                                                                height: "5rem",
                                                                                margin: "0 1rem",
                                                                                fontSize: "2rem",
                                                                                borderRadius: 4,
                                                                                border: "1px solid rgba(0,0,0,0.3)"
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    </Container>
                                                    {
                                                        verifyingOTP ?
                                                            <SpinnerLoader/>
                                                            :<></>
                                                    }
                                                </CardContent>
                                            </Card>
                                        </Stack>
                                    </>
                            }
                        </Box>
                    </Card>
                </Grid>
            </Container>
        </Page>
    )
}
