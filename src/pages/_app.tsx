import "~/styles/globals.css";

import { NextPage } from "next";
import NextAdapterPages from "next-query-params";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode, useState } from "react";
import { QueryParamAdapter, QueryParamProvider } from "use-query-params";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function Adapter(props: {
  children(adapter: QueryParamAdapter): React.ReactElement | null;
}) {
  return (
    <NextAdapterPages
      {...props}
      shallow={false}
    />
  );
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 300_000,
            notifyOnChangeProps: () => "all",
          },
        },
      })
  );
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Starter Template"
        />
        <title>Starter Template</title>
      </Head>
      <QueryParamProvider adapter={Adapter}>
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </QueryParamProvider>
    </>
  );
}
