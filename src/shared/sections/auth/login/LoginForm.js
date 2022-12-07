import * as Yup from 'yup';
import { useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {Link, useNavigate} from "react-router-dom"
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  CardHeader,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid, Avatar, Typography, Paper
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import {useDispatch, useSelector} from "react-redux";
import OTPInput from "otp-input-react";
import {ToastContainer} from "react-toastify";
import LockIcon from "@mui/icons-material/Lock";
import {Box} from "@mui/system";
import {login, verifyOTP} from "../../../../packages/Auth/store/AuthActions";
import SpinnerLoader from "../../../plugin/loader/SpinnerLoader";
import {FormProvider, RHFCheckbox, RHFTextField} from "../../../components/hook-form";
import Iconify from "../../../components/Iconify";
//
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch=useDispatch()
  const navigate=useNavigate();
  const {submitting,hasSentOTP,verifyingOTP} = useSelector(state=> state.AuthReducer)
  //otp
  const [otp, setOTP] = useState("")
  //

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Please provide a valid username'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    username: '',
    password: '',
    remember: true,
    navigate
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {handleSubmit, getValues} = methods;

  // Formik will show submitting loader automatically
  const onSubmit = async () => {
    const payload = getValues()
    //send
    dispatch(login(payload))
  };
  //verify
  useEffect(() => {
    let payload=getValues();
    if (otp.length===6) {
      let data = {
        username: payload.username,
        password: payload.password,
        otp
      };
      dispatch(verifyOTP(data))
    }
  }, [otp]);

  //
  return (
      <div>
        <ToastContainer theme="colored"/>
        {
          (hasSentOTP || verifyingOTP) ?
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
                                <LockIcon color="error"/>
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
                              Please enter the verification code sent to your email address
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
                                value={otp}
                                onChange={setOTP}
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
              :
              <Box sx={{m:2}}>
                {
                  hasSentOTP ?
                      <Stack spacing={5} md={{m:"10px"}}>
                        <h3></h3>
                      </Stack> :
                      <Stack>
                        <Typography sx={{ color: 'text.secondary', mb: 5 }}>Login To your Aziz to begin your adventure now.</Typography>
                      </Stack>
                }
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={3}>
                    <RHFTextField name="username" label="Email Address" />
                    <RHFTextField
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                              </InputAdornment>
                          ),
                        }}
                    />
                  </Stack>
                  <Stack  direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                    <RHFCheckbox name="remember" label="Remember me" />
                    <Link to="/auth/forgot-password">
                      Forgot password?
                    </Link>
                  </Stack>

                  {
                    submitting ?
                        <LoadingButton fullWidth size="large" color="error" variant="contained">
                          <Iconify sx={{
                            animation: "$spin 2s linear infinite",
                            "@keyframes spin": {
                              "0%": {
                                transform: "rotate(360deg)"
                              },
                              "100%": {
                                transform: "rotate(0deg)"
                              }
                            }
                          }} icon={'icomoon-free:spinner9' } />  Signing in...Please Wait
                        </LoadingButton>
                        :
                        <LoadingButton fullWidth size="large" type="submit" variant="contained">
                          Sign In
                        </LoadingButton>
                  }
                </FormProvider>
              </Box>
        }

      </div>
  );
}
