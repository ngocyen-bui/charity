import "../styles/globals.css";
import "../styles/_header.css";
import 'animate.css';
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@mui/material";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Nunito Sans", "Roboto", "sans-serif"].join(","),
  },
});
function MyApp({ Component, pageProps }) {
  
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <MuiThemeProvider theme={theme}>
          <Component {...pageProps} />
        </MuiThemeProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
