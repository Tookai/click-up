import { Flex, Heading, VStack } from "@chakra-ui/react"
import { State, Task } from "@prisma/client"
import { FunctionComponent } from "react"
import { Droppable } from "react-beautiful-dnd"
import Card from "./Card"
import CreateTaskModal from "./modals/CreateTaskModal"

interface IProps {
	state: State
	cards: Task[]
}

const Column: FunctionComponent<IProps> = ({ state, cards }) => {
	return (
		<Droppable droppableId={state.id}>
			{(provided) => (
				<VStack
					minW={"300px"}
					w={"300px"}
					maxW={"300px"}
					flex={1}
					flexShrink={0}
					borderWidth={1}
					rounded={"lg"}
					overflow={"hidden"}
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<Flex
						w={"full"}
						textAlign={"center"}
						py={2}
						px={3}
						borderBottomWidth={4}
						alignItems={"center"}
					>
						<Flex w={12} alignItems={"center"}></Flex>
						<Heading size={"md"} flex={1} color={`${state.color}.300`}>
							{state.name}
						</Heading>
						<Flex w={12} justifyContent={"flex-end"} alignItems={"center"}>
							<CreateTaskModal stateId={state.id} />
						</Flex>
					</Flex>

					<VStack flex={1} w={"full"} h={"full"} overflowY={"auto"} p={3}>
						{cards.map((card, index) => (
							<Card key={card.id} item={card} index={index} />
						))}

						{provided.placeholder}
					</VStack>
				</VStack>
			)}
		</Droppable>
	)
}

export default Column
