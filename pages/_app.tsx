import 'styles/styles.scss';
import type { AppProps } from 'next/app';

import Layout from '../components/Layout';
import AuthenticationStorage from '../contexts/Authentication';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <AuthenticationStorage>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthenticationStorage>
    );
};

export default App;
