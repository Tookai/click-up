import { Flex, Spinner } from "@chakra-ui/react"
import { FunctionComponent } from "react"

const Loading: FunctionComponent = () => {
	return (
		<Flex
			w={"100vw"}
			h={"100vh"}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<Spinner />
		</Flex>
	)
}

export default Loading
