import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { AppProps } from "next/app"
import { Inter } from "next/font/google"
import { useState } from "react"

const inter = Inter({ subsets: ["latin"] })

const config = {
	initialColorMode: "dark",
	useSystemColorMode: false,
}

const fonts = {
	body: inter.style.fontFamily,
	heading: inter.style.fontFamily,
}

const theme = extendTheme({ config, fonts })

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: 2,
						refetchOnWindowFocus: false,
						refetchOnReconnect: true,
						refetchOnMount: true,
					},
					mutations: {
						retry: false,
					},
				},
			})
	)

	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</QueryClientProvider>
	)
}
