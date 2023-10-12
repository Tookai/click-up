import { Divider, Flex, Text } from "@chakra-ui/react"
import { FunctionComponent } from "react"
import { Draggable } from "react-beautiful-dnd"

interface IProps {
	item: any
	index: number
}

const Card: FunctionComponent<IProps> = ({ item, index }) => {
	return (
		<Draggable draggableId={item.id} index={index}>
			{(provided, snap) => (
				<Flex
					flexDir={"column"}
					gap={1}
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
					<Text fontSize={"sm"} noOfLines={2} h={"42px"}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi sed
						culpa porro non! Atque maxime ducimus unde, ratione assumenda quae
						ipsam nihil! Suscipit repellendus saepe repellat quod, maxime
						officiis soluta?
					</Text>
					<Divider />
					<Text fontSize={"2xs"} noOfLines={4} h={"72px"}>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
						facere modi qui maxime cumque! Laudantium, assumenda debitis.
						Repudiandae labore reiciendis sapiente dicta pariatur omnis optio
						nihil, vel repellendus ducimus! Sunt. Odio adipisci error reiciendis
						sint, unde maiores nulla, totam dolor ipsam, blanditiis sed eius
						suscipit labore reprehenderit porro! Alias repellendus animi eius
						quisquam numquam quo magnam corporis libero placeat repellat?
						Suscipit, ipsum. Accusamus magnam quaerat nihil deserunt vel
						corporis! Quidem veritatis molestiae beatae, voluptatibus eaque ad
						laborum numquam nobis excepturi vitae iste reiciendis suscipit
						incidunt non eligendi autem, rerum ullam.
					</Text>
				</Flex>
			)}
		</Draggable>
	)
}

export default Card
