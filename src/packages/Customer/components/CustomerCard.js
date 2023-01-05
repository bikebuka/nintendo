import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import {
    Button,
    Card,
    MenuItem,
    CardContent,
    Container,
    styled,
    Stack,
    TextField,
    Box,
} from "@mui/material";
import * as Yup from "yup";
import Page from "../../../shared/components/Page";

 
// import { registerCustomers } from '../store/CustomersAction';
import { FormProvider, RHFTextField } from "../../../shared/components/hook-form";
import Slide from '@mui/material/Slide';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
 
 

const CreateUserSchema = Yup.object().shape({
    business_name: Yup.string().required("required"),
    business_type: Yup.string().required("required"),
    mobile_number: Yup.string().required("required"),
    email_address: Yup.string().required("required"),
    business_activity: Yup.string().required("required"),
    postal_address: Yup.string().required("required"),
    business_activity_details: Yup.string().required("required"),
    physical_address: Yup.string().required("required"),
    longitudes: Yup.string().required("required"),
    latitudes: Yup.string().required("required"),
    county: Yup.string().required("required"),
    sub_county: Yup.string().required("required"),
    ward: Yup.string().required("required"),
    village: Yup.string().required("required"),

});
const defaultValues = {
    business_name: "",
    business_type: "",
    mobile_number: "",
    email_address: "",
    business_activity: "",
    business_activity_details: "",
    physical_address: "",
    longitudes: "",
    latitudes: "",
    county: "",
    sub_county: "",
    ward: "",
    village: "",
    physical_address: "",
};

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '0px 0px 0px 0px',
    padding: theme.spacing(1)
}))

export default function CustomerCard() {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const [data, setPayloadStack] = useState({
        business: {},
        charges: [],
        owners: []
    })

    const methods = useForm({
        resolver: yupResolver(CreateUserSchema),
        defaultValues,
    });


    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });



    const {
        handleSubmit, getValues, setValue,
        // formState: { isSubmitting },
    } = methods;

    const navigate = useNavigate()
    const onSubmit = async () => {

        const payload = {
            module: 1,
            business_details: getValues(),
            busness_owners: data.owners.map((owner) => {
                return {
                    "owner": owner.id
                }
            }),
            billitems: data.charges.map((record) => {
                return {
                    "module": record.fee.module,
                    "amount": record.amount,
                    "units": record.units,
                    "total_amount": record.total_amount,
                    "fee": record.fee.id,
                    "fiscal_year": 1
                }
            })
        }


       // dispatch(registerBusiness(payload, navigate))
        console.log(payload, "BARIDI")
    }
    const onFail = () => {
        console.log(getValues())
    }

    const onReset = async (e) => {
        const payload = data
    }

    const Spacer = () => (<Container sx={{ my: 2 }} />)

    // useEffect(() => {
    //     makeCalls()
    // }, [])


    // const makeCalls = () => {
    //     dispatch(getBusinessTypes())
    //     dispatch(getCounties())
    
    // }

  

    // for the map Dialog
    const handleClickOpen = (e) => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

     

    


    return (
        <Page title="Business Management">
            <Container maxWidth>
                 

                <StyledCard sx={{ p: 4,display:!open?'':'none' }}>
                    <CardContent>
                        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit, onFail)}>
                            <StyledCard>
                                <Stack direction='row' spacing={2} mt={5}>
                                    <RHFTextField fullWidth size={'small'} name="business_name" label='First Name' />
                                    <RHFTextField fullWidth size={'small'} name="mobile_number" label='Last Name' />
                                </Stack>

                                <Stack direction='row' spacing={2} mt={5}>
                                <RHFTextField fullWidth size={'small'} name="email_address" label='Username' />
                                <RHFTextField fullWidth size={'small'} name="email_address" label='Email Address' />

                                </Stack>

                                
                            

                                <Stack direction='row' spacing={2} mt={5}>
                                <RHFTextField
                                        type="number"
                                        size={'small'}
                                        select
                                        name="business_type"
                                        label='Select Business Type'
                                    >
                                        <MenuItem value={0}>---SELECT---</MenuItem>
                                        {/* {
                                            business_types?.map(res => {
                                                return <MenuItem key={res.id} value={parseInt(res.id)}>{res.name}</MenuItem>


                                            })
                                        } */}

                                    </RHFTextField>
                                </Stack>

                            </StyledCard>
                            <Spacer/>
                             
                            <Button type='reset' color='error' variant='contained' size='small'>
                                Back
                            </Button>
                            <Button type='submit' sx={{ ml: 2 }} color='info' variant='contained' size='small'>
                                Register User
                            </Button>
                        </FormProvider>
                      
                    </CardContent>
                </StyledCard>
            </Container>
        </Page >
    )
}