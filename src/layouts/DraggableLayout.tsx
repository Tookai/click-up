import useTanState from "@/hooks/use-tan-state"
import { FunctionComponent, PropsWithChildren } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"

const getTicket = (
	id: string,
	arr: any[],
	newState: string,
	newIndex: number
) => {
	const ticket = arr.find((ticket) => ticket.id === id)
	const rest = arr.filter((ticket) => ticket.id !== id)

	return { ticket, rest }
}

const DraggableLayout: FunctionComponent<PropsWithChildren> = ({
	children,
}) => {
	const { data, setData } = useTanState(["tickets", "id"])

	const onDragEnd = (result: DropResult) => {
		const { source, destination, draggableId } = result
		if (!destination) {
			return
		}

		if (destination.droppableId === source.droppableId) {
			if (destination.index === source.index) {
				return
			}
		}

		const { ticket, rest } = getTicket(
			draggableId,
			data,
			destination.droppableId,
			destination.index
		)

		setData([{ ...ticket, state: destination.droppableId }, ...rest])
	}

	return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
}

export default DraggableLayout
