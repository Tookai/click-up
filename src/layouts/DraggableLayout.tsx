import { FunctionComponent, PropsWithChildren } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"

const reorder = (list: any, startIndex: any, endIndex: any) => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

interface IProps {
	state: any
	setState: any
}

const DraggableLayout: FunctionComponent<PropsWithChildren<IProps>> = ({
	children,
	state,
	setState,
}) => {
	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result
		if (!destination) {
			return
		}

		if (destination.droppableId === source.droppableId) {
			if (destination.index === source.index) {
				return
			}

			const tickets = reorder(
				state.tickets[source.droppableId],
				source.index,
				destination.index
			)

			const updateState = {
				tickets: {
					...state.tickets,
					[source.droppableId]: tickets,
				},
			}

			setState(updateState)
		} else {
			const startColumn = [...state.tickets[source.droppableId]]
			const finishColumn = [...state.tickets[destination.droppableId]]
			const [removed] = startColumn.splice(source.index, 1)
			finishColumn.splice(destination.index, 0, removed)

			const updateState = {
				tickets: {
					...state.tickets,
					[source.droppableId]: startColumn,
					[destination.droppableId]: finishColumn,
				},
			}
			setState(updateState)
		}
	}

	return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
}

export default DraggableLayout
