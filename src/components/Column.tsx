import { Heading, VStack } from "@chakra-ui/react"
import { FunctionComponent } from "react"
import { Droppable } from "react-beautiful-dnd"
import Card from "./Card"

interface IProps {
	droppableId: string
	title: string
	cards: any[]
}

const Column: FunctionComponent<IProps> = ({ droppableId, title, cards }) => {
	return (
		<Droppable droppableId={droppableId}>
			{(provided) => (
				<VStack
					w={"380px"}
					maxW={"380px"}
					flex={1}
					borderWidth={1}
					rounded={"lg"}
					overflow={"hidden"}
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<Heading
						size={"md"}
						w={"full"}
						textAlign={"center"}
						py={2}
						borderBottomWidth={4}
					>
						{title}
					</Heading>

					<VStack flex={1} w={"full"} h={"full"} overflowY={"auto"} p={3}>
						{cards.map((card, index) => (
							<Card
								key={card.id}
								item={{
									...card,
									position: index,
								}}
								index={index}
							/>
						))}

						{provided.placeholder}
					</VStack>
				</VStack>
			)}
		</Droppable>
	)
}

export default Column
