import { AppProvider } from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/dist/styles.css';

import 'react-quill/dist/quill.snow.css';
import '../src/styles/order-table-heading.css';
import '../src/styles/swal-custom.css';
import '../src/styles/waybill.css';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider i18n={translations}>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
