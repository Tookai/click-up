import { Divider, Flex, Spacer, Text } from "@chakra-ui/react"
import { Task } from "@prisma/client"
import { FunctionComponent } from "react"
import { Draggable } from "react-beautiful-dnd"
import DeleteTaskModal from "./modals/DeleteTaskModal"
import EditTaskModal from "./modals/EditTaskModal"

interface IProps {
	item: Task
	index: number
}

const Card: FunctionComponent<IProps> = ({ item, index }) => {
	return (
		<Draggable draggableId={item.id} index={index}>
			{(provided, snap) => (
				<Flex
					flexDir={"column"}
					gap={3}
					w={"full"}
					p={3}
					borderWidth={1}
					rounded={"md"}
					backdropFilter={"blur(24px)"}
					outlineColor={snap.isDragging ? "blue.900" : "transparent"}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<Text fontSize={"sm"} noOfLines={2} maxH={"42px"}>
						{item.name}
					</Text>
					{item.content && (
						<>
							<Divider />
							<Text fontSize={"2xs"} noOfLines={4} maxH={"72px"}>
								{item.content}
							</Text>
						</>
					)}

					<Divider />
					<Flex w={"full"} gap={3}>
						<EditTaskModal item={item} />

						<Spacer />
						<DeleteTaskModal item={item} />
					</Flex>
				</Flex>
			)}
		</Draggable>
	)
}

export default Card
