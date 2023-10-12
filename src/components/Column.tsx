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
					p={3}
					overflowX={"hidden"}
					overflowY={"auto"}
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<Heading
						size={"md"}
						w={"full"}
						textAlign={"center"}
						pb={2}
						borderBottomWidth={4}
					>
						{title}
					</Heading>

					{cards.map((card, index) => (
						<Card key={`${droppableId}-${index}`} item={card} index={index} />
					))}

					{provided.placeholder}
				</VStack>
			)}
		</Droppable>
	)
}

export default Column
