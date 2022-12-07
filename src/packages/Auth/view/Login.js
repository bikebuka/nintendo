import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {Card, Container, Fade, Link, Slide, Stack, Typography} from '@mui/material';
// hooks
import useResponsive from '../../../shared/hooks/useResponsive';
// components
import Page from '../../../shared/components/Page';
// sections
import {appName} from "../../../core/environment/environment";
import {useSelector} from "react-redux";
import {Box} from "@mui/system";
import {LoginForm} from "../../../shared/sections/auth/login";
import {forwardRef} from "react";
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  // justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
  backgroundColor:'#FAFAFA'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// ----------------------------------------------------------------------

export default function Login() {
  const smUp = useResponsive('up', 'sm');
  const {hasSentOTP} = useSelector(state=> state.AuthReducer)
  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Login">
      <RootStyle>

        {mdUp && (
            <SectionStyle>
              <Typography color="primary" variant="h4" sx={{ px: "auto", mt: 10, mb: 5 }}>
                <marquee className="p-2 font-weight-bolder">
                  NFT Trading...
                </marquee>
              </Typography>
              <img src={require('../../../shared/assets/images/remit.gif')} width={"100%"} height={"60%"} alt="login"/>
            </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <SectionStyle justifyItems="center">
              <Box sx={{m:'auto'}}>
                <img src={require("../../../shared/assets/logo/logo.png")} alt="logo" width={150} height={150}/>
              </Box>
              <Stack spacing={2}>
                <LoginForm />
                {smUp && (
                    <Typography variant="body2" align="center" sx={{ m: 3 }}>
                      Don’t have an account?{' '}
                      <Link variant="subtitle2" component={RouterLink} to="/auth/register">
                        Get started
                      </Link>
                    </Typography>
                )}
              </Stack>
            </SectionStyle>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
