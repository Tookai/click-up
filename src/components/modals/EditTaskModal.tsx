import useTanState from "@/hooks/use-tan-state"
import { getTicket } from "@/layouts/DraggableLayout"
import { EditIcon } from "@chakra-ui/icons"
import {
	Button,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Textarea,
	useDisclosure,
} from "@chakra-ui/react"
import { Task } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"
import { FunctionComponent } from "react"
import { useForm } from "react-hook-form"

interface IProps {
	item: Task
}

const EditTaskModal: FunctionComponent<IProps> = ({ item }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const router = useRouter()
	const { id } = router.query as { id: string }

	const { data, setData } = useTanState(["tasks", `${id}`])
	const { ticket, rest } = getTicket(item.id, data)

	const { register, handleSubmit } = useForm({
		defaultValues: {
			name: item.name,
			content: item.content,
		},
	})

	const { mutate, isLoading } = useMutation({
		mutationFn: async (data) => {
			return await axios.put(`/api/v1/tasks/update/${item.id}`, { data })
		},
		onSuccess: (res) => {
			if (res.data.task) {
				setData([res.data.task, ...rest])
			}
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
				icon={<EditIcon boxSize={"12px"} />}
				variant={"outline"}
				rounded={"full"}
				onClick={onOpen}
			/>

			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalContent as={"form"} onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>Edit this task</ModalHeader>
					<ModalCloseButton />
					<ModalBody display={"flex"} flexDir={"column"} gap={3}>
						<Textarea
							placeholder="Task Name"
							{...register("name")}
							resize={"none"}
							h={"80px"}
						/>
						<Textarea
							placeholder="Task Content"
							{...register("content")}
							resize={"none"}
							h={"200px"}
						/>
					</ModalBody>

					<ModalFooter
						display={"flex"}
						w={"full"}
						justifyContent={"space-between"}
					>
						<Button variant={"outline"} onClick={onClose}>
							Close
						</Button>
						<Button type={"submit"} isLoading={isLoading}>
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default EditTaskModal
