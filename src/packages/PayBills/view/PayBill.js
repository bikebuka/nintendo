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
    Card,
    CardHeader, CircularProgress,
    Container,
    Divider,
    Grid, InputAdornment,
    Stack, Step, StepLabel, Stepper
} from "@mui/material";
import Page from "../../../shared/components/Page";
import { FormProvider, RHFTextField } from '../../../shared/components/hook-form';
import {StyledBadge} from "../../../shared/components/styledBadge/Styledbadge";
import {ColorlibConnector, ColorlibStepIcon} from "../../../shared/components/stepper/Stepper";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import AuthService from "../../../core/access-control/AuthService";
import {ToastContainer} from "react-toastify";
import StoreIcon from '@mui/icons-material/Store';
import {ArrowLeft} from "@mui/icons-material";
import {lipaBill, queryPaybill} from "../store/PayBillAction";

let profile = AuthService.user;


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


export default function SendMoney() {
    const [currentStep,setCurrentStep]=useState(0)
    let {message,submitting,isBeneficiary,paybill,querying,resultFound,queryMessage}=useSelector(state=>state.PayBillReducer)
    const [goBack,setGoBack]=useState(false)

    const dispatch=useDispatch()
    // const profile = useSelector(state => state.profile)
    const PayBillSchema = Yup.object().shape({
        'amount': Yup.string().required('Please provide amount'),
        'beneficiary_account_number':Yup.string().required('Please provide recipient account number'),
        'sasapay_paybill_number':Yup.string().required('Please provide SasaPay Paybill'),
        'account_number':Yup.string().required('Please provide recipient account number')
    });

    const defaultValues = {
        beneficiary_account_number: profile && profile.customer_account_number,
        amount: '',
        account_number: '',
        sasapay_paybill_number: ''
    }
    const methods = useForm({
        resolver: yupResolver(PayBillSchema),
        defaultValues,
    });

    const {
        handleSubmit, getValues, reset,watch,setValue,
        formState: { isSubmitting,dirtyFields },

    } = methods;

    const onSubmit = async () => {
        setCurrentStep(1)
    };
    useEffect(()=>{
        watch(({sasapay_paybill_number})=>{
            if (sasapay_paybill_number.length>=5) {
                setValue('sasapay_paybill_number',parseInt(sasapay_paybill_number))
                dispatch(queryPaybill(getValues()))
            }
        })
    },[watch])
    //
    const completeTransaction = ()=> {
        dispatch(lipaBill(getValues()))
        setTimeout(()=>{
            setCurrentStep(0)
            reset()
        },3000)
    }
    const cancelTransaction = () => {
        setCurrentStep(0)
        setGoBack(true)
    }

    return (
        <Page title='Send Money'>
            <ToastContainer theme="colored"/>
            <Container maxWidth='md'>
                <Grid item xs={12} md={12} lg={12}>
                    <Card>
                        <CardHeader
                            title={<h4 className="textSecondary">Pay Bills</h4>}
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
                                                <Stack spacing={3} direction={'row'}>
                                                    <RHFTextField name="amount" variant="standard" label="How Much?" placeholder={"KES 50"}/>
                                                    <RHFTextField
                                                        color={resultFound ? 'primary' :'error'}
                                                        helperText={querying? 'Searching for paybill...Please wait' : resultFound? ` You're about to pay bill to ${paybill.display_name}! ` : queryMessage }
                                                        name="sasapay_paybill_number"
                                                        variant="standard"
                                                        label="SasaPay Paybill Number"
                                                        placeholder={"Enter paybill number"}
                                                    />
                                                </Stack>
                                                <Stack spacing={3} direction={'row'} sx={{mt:5}}>
                                                    <h3>To Account Number?</h3>
                                                </Stack>
                                                <Stack spacing={3} direction={'row'} sx={{mt:5}}>
                                                    <StyledBadge
                                                        overlap="circular"
                                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                        variant="dot"
                                                    >
                                                        <Avatar alt="Aziz User" src="/static/images/avatar/1.jpg" />
                                                    </StyledBadge>
                                                    <RHFTextField
                                                        id="account_number"
                                                        label="Account Number"
                                                        name="account_number"
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                   <StoreIcon/>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        variant="standard"
                                                    />

                                                    {
                                                        <>
                                                            {
                                                                isBeneficiary ?
                                                                    <LoadingButton
                                                                        size="large"
                                                                        type='submit'
                                                                        color='error'
                                                                        variant="contained"
                                                                    >
                                                                        {submitting? 'Processing...' : 'Proceed'} <ArrowCircleRightIcon color="white"/>
                                                                    </LoadingButton> : <></>

                                                            }

                                                        </>
                                                    }

                                                </Stack>

                                            </FormProvider>
                                        </Stack>
                                    </>
                                    :
                                    <>
                                        <Stack direction="column" mr={5} ml={5} mt={5} mb={5}>
                                            <Box sx={{width:'100%',m:5}}>
                                                <Alert severity="info">
                                                    <AlertTitle>Confirm Payment</AlertTitle>
                                                    Hello {profile.display_name}, you're about to send KES <strong>{(getValues().amount) }.00</strong> to <br/>
                                                    to SasaPay Paybill <strong>{getValues().sasapay_paybill_number}</strong> for account number <strong>{getValues().account_number}</strong>.<br/><br/>
                                                     Click on the <strong>Finish</strong> button to complete payment.
                                                </Alert>
                                            </Box>
                                            <Divider/>
                                            <Grid container spacing={2} mt={5}>
                                                <Grid item sm={6}>
                                                    <Box>
                                                        <Button variant='outlined' onClick={cancelTransaction} color={'error'} size='medium' ><ArrowLeft color="error" size={15}/> Go Back</Button>
                                                    </Box>
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <Box display="flex" justifyContent="flex-end">
                                                        {
                                                            submitting ?
                                                                <Button type="submit" variant='outlined' color={'error'} size='medium' ><CircularProgress color="error" size={15}/> Processing...</Button>
                                                                :
                                                                <Button
                                                                    size="medium"
                                                                    onClick={completeTransaction}
                                                                    color='primary'
                                                                    variant="contained"
                                                                >
                                                                    Finish <ArrowCircleRightIcon color="white"/>
                                                                </Button>

                                                        }
                                                    </Box>
                                                </Grid>
                                            </Grid>

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
