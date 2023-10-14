import useTanState from "@/hooks/use-tan-state"
import axios from "axios"
import { useRouter } from "next/router"
import { FunctionComponent, PropsWithChildren } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"

const getTicket = (id: string, arr: any[]) => {
	const ticket = arr?.find((ticket) => ticket.id === id)
	const rest = arr?.filter((ticket) => ticket.id !== id)

	return { ticket, rest }
}

const DraggableLayout: FunctionComponent<PropsWithChildren> = ({
	children,
}) => {
	const router = useRouter()
	const { id } = router.query as { id: string }

	const { data, setData } = useTanState(["tasks", `${id}`])

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

		const { ticket, rest } = getTicket(draggableId, data)

		setData([{ ...ticket, stateId: destination.droppableId }, ...rest])

		axios.put(`/api/v1/tasks/update/${draggableId}/state`, {
			stateId: destination.droppableId,
		})
	}

	return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
}

export default DraggableLayout
