import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {Link, useNavigate} from "react-router-dom"
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import {useDispatch, useSelector} from "react-redux";

import {ToastContainer} from "react-toastify";
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
  const {submitting} = useSelector(state=> state.AuthReducer)

  const LoginSchema = Yup.object().shape({
    login: Yup.string().required('Please provide a valid username'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    login: '',
    password: '',
    db:"admin-nftstrading-co",
    platform:"web",
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
  //
  return (
      <div>
        <ToastContainer theme="colored"/>
        <Box sx={{m:2}}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <RHFTextField name="login" label="Email Address" />
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

      </div>
  );
}
