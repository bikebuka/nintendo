// routes
import Router from './routes/routes';
// theme
import ThemeProvider from './shared/theme';
// components
import ScrollToTop from './shared/components/ScrollToTop';
import { BaseOptionChartStyle } from './shared/components/chart/BaseOptionChart';
import 'react-toastify/dist/ReactToastify.css';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
