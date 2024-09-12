"use client";
import "../app/globals.css";
import { ThemeProvider } from "../lib/mat-tailwind";
import Layout from "../components/layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}