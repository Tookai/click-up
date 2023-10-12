import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import { Inter } from "next/font/google"

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
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}
