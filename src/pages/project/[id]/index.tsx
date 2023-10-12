import { ticketList } from "@/data"
import { Flex } from "@chakra-ui/react"
import type { NextPage } from "next"
import dynamic from "next/dynamic"
import { useState } from "react"

const DraggableLayout = dynamic(() => import("@/layouts/DraggableLayout"), {
	ssr: false,
})

const Column = dynamic(() => import("@/components/Column"), {
	ssr: false,
})

const Index: NextPage = () => {
	const [state, setState] = useState({ tickets: ticketList })

	return (
		<Flex w={"100vw"} h={"100vh"} p={3} gap={3}>
			<DraggableLayout state={state} setState={setState}>
				<Column
					droppableId={"column-1"}
					title="PENDING"
					cards={state.tickets["column-1"]}
				/>

				<Column
					droppableId={"column-2"}
					title="IN PROGRESS"
					cards={state.tickets["column-2"]}
				/>

				<Column
					droppableId={"column-3"}
					title="DONE"
					cards={state.tickets["column-3"]}
				/>
			</DraggableLayout>
		</Flex>
	)
}

export default Index
