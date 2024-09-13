"use client";
import "@/app/globals.css";
import { ThemeProvider } from "@/lib/mat-tailwind";
import Layout from "@/components/layout";
import { wrapper } from '@/store';
import { Provider } from 'react-redux';

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
