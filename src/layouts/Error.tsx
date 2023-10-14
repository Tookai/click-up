import { Flex, Heading } from "@chakra-ui/react"
import { FunctionComponent } from "react"

const Error: FunctionComponent = () => {
	return (
		<Flex
			w={"100vw"}
			h={"100vh"}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<Heading colorScheme="error" >Oh no its broken :(</Heading>
		</Flex>
	)
}

export default Error
