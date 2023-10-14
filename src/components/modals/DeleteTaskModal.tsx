import useTanState from "@/hooks/use-tan-state"
import { getTicket } from "@/layouts/DraggableLayout"
import { DeleteIcon } from "@chakra-ui/icons"
import {
	Button,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Text,
	useDisclosure,
} from "@chakra-ui/react"
import { Task } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"
import { FunctionComponent } from "react"

interface IProps {
	item: Task
}

const DeleteTaskModal: FunctionComponent<IProps> = ({ item }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const router = useRouter()
	const { id } = router.query as { id: string }

	const { data, setData } = useTanState(["tasks", `${id}`])
	const { ticket, rest } = getTicket(item.id, data)

	const { mutate, isLoading } = useMutation({
		mutationFn: async () => {
			return await axios.delete(`/api/v1/tasks/delete/${item.id}`)
		},
		onSuccess: () => {
			setData(rest)
			onClose()
		},
		onError: (error) => {
			console.log(error)
		},
	})

	const onSubmit = (data: any) => {
		mutate(data)
	}

	return (
		<>
			<IconButton
				size={"sm"}
				aria-label={"Edit"}
				icon={<DeleteIcon boxSize={"12px"} />}
				variant={"outline"}
				rounded={"full"}
				onClick={onOpen}
			/>

			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalContent>
					<ModalHeader>Delete this task</ModalHeader>
					<ModalCloseButton />
					<ModalBody display={"flex"} flexDir={"column"} gap={3}>
						<Text>
							You are about to delete this task forever. Are you sure this is
							what you want to do ?
						</Text>

						<Text fontSize={"lg"} fontWeight={"bold"} textAlign={"center"}>
							{item.name}
						</Text>

						<Text>
							No one will be able to recover this task once it has been deleted.
						</Text>
					</ModalBody>

					<ModalFooter
						display={"flex"}
						w={"full"}
						justifyContent={"space-between"}
					>
						<Button variant={"outline"} onClick={onClose}>
							Oh no no no
						</Button>
						<Button onClick={onSubmit} isLoading={isLoading}>
							Yup delete it
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default DeleteTaskModal
