import { stateList, ticketList } from "@/data"
import { Flex, Spinner, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import type { NextPage } from "next"
import dynamic from "next/dynamic"

const DraggableLayout = dynamic(() => import("@/layouts/DraggableLayout"), {
	ssr: false,
})

const Column = dynamic(() => import("@/components/Column"), {
	ssr: false,
})

const filterAndOrder = (arr: any[] | undefined, id: string) => {
	return arr?.filter((item) => item.state === id) ?? []
}

const Index: NextPage = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["tickets", "id"],
		queryFn: () => ticketList,
	})

	if (isLoading) {
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

	if (isError) {
		return (
			<Flex
				w={"100vw"}
				h={"100vh"}
				justifyContent={"center"}
				alignItems={"center"}
			>
				<Text color={"red.200"}>I is broken</Text>
			</Flex>
		)
	}

	return (
		<Flex w={"100vw"} h={"100vh"} p={3} gap={3}>
			<DraggableLayout>
				{stateList.map((state) => (
					<Column
						key={state.id}
						droppableId={state.id}
						title={state.name}
						cards={filterAndOrder(data, state.id)}
					/>
				))}
			</DraggableLayout>
		</Flex>
	)
}

export default Index
