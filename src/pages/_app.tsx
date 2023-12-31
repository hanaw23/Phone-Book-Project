import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../../lib/apollo";
import ContactProvider from "@/context/detailContactContext";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ContactProvider>
        <Component {...pageProps} />
      </ContactProvider>
    </ApolloProvider>
  );
}
