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
    Grid,
    Stack, Step, StepLabel, Stepper
} from "@mui/material";
import Page from "../../../shared/components/Page";
import { FormProvider, RHFTextField } from '../../../shared/components/hook-form';
import {StyledBadge} from "../../../shared/components/styledBadge/Styledbadge";
import {ColorlibConnector, ColorlibStepIcon} from "../../../shared/components/stepper/Stepper";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {queryBeneficiary, sendMoney, sendMoneyConfirmation} from "../store/SendMoneyAction";
import AuthService from "../../../core/access-control/AuthService";
import {ToastContainer} from "react-toastify";
import MuiPhoneNumber from "material-ui-phone-number";
import {ArrowLeft} from "@mui/icons-material";

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


export default function SendMoney() {
    const [currentStep,setCurrentStep]=useState(0)
    let {message,loading,submitting,isBeneficiary,processPayment}=useSelector(state=>state.sendMoneyReducer)
    const [goBack,setGoBack]=useState(false)

    const dispatch=useDispatch()
    // const profile = useSelector(state => state.profile)
    const SendMoneySchema = Yup.object().shape({
        'amount': Yup.string().required('Please provide amount'),
    });


    const defaultValues = {
        sender_account_number: profile && profile.customer_account_number,
        amount: 1,
        recipient_account_number: ''
    }
    const methods = useForm({
        resolver: yupResolver(SendMoneySchema),
        defaultValues,
    });

    const {
        handleSubmit, getValues, reset,watch,setValue,
        formState: { isSubmitting },

    } = methods;

    const onSubmit = async () => {
        dispatch(sendMoneyConfirmation(getValues()))
    };
    useEffect(()=>{
        if (processPayment) {
            setCurrentStep(1)
        }
    },[processPayment])
    const completeTransaction = ()=> {
        dispatch(sendMoney(getValues()))
    }
    const cancelTransaction = () => {
        setCurrentStep(0)
        message="";
        isBeneficiary=false
        setGoBack(true)
    }
    //
    const handleOnPhoneChange= (value) => {
        setValue('recipient_account_number',value);
        if (value.length===13) {
            dispatch(queryBeneficiary(getValues()))
        }
    }


    return (
        <Page title='Send Money'>
            <ToastContainer theme="colored"/>
            <Container maxWidth='md'>
                <Grid item xs={12} md={12} lg={12}>
                    <Card>
                        <CardHeader
                            title={<h4 className="textSecondary"><span className="textGrey">Send</span> Money</h4>}
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
                                                    <RHFTextField name="" variant="standard" label="What's it For?" placeholder={"Dinner"} />
                                                </Stack>
                                                <Stack spacing={3} direction={'row'} sx={{mt:5}}>
                                                    <h3>To Whom?</h3>
                                                </Stack>
                                                <Stack spacing={3} direction={'row'} sx={{mt:5}}>
                                                    <StyledBadge
                                                        overlap="circular"
                                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                        variant="dot"
                                                    >
                                                        <Avatar alt="Aziz User" src="/static/images/avatar/1.jpg" />
                                                    </StyledBadge>
                                                    <MuiPhoneNumber fullWidth defaultCountry={'ke'} onlyCountries={['ke']} onChange={handleOnPhoneChange}/>

                                                    {
                                                        <>
                                                        {
                                                            (!isBeneficiary && message && !goBack)?
                                                               <Box sx={{width: '100%'}}>
                                                                   <Alert severity="error">{message}</Alert>
                                                               </Box>
                                                                : <></>

                                                        }
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
                                                    {message}
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
