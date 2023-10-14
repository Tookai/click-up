import useTanState from "@/hooks/use-tan-state"
import { getTicket } from "@/layouts/DraggableLayout"
import { AddIcon } from "@chakra-ui/icons"
import {
	Button,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	Textarea,
	useDisclosure,
} from "@chakra-ui/react"
import { State } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"
import { FunctionComponent } from "react"
import { useForm } from "react-hook-form"

interface IProps {
	stateId?: string
}

const CreateTaskModal: FunctionComponent<IProps> = ({ stateId }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const queryClient = useQueryClient()

	const router = useRouter()
	const { id } = router.query as { id: string }

	const states = queryClient.getQueryData(["states", `${id}`]) as State[]
	const { data, setData } = useTanState(["tasks", `${id}`])
	const { ticket, rest } = getTicket("creation", data)

	const { register, handleSubmit } = useForm({
		defaultValues: {
			name: "",
			content: "",
			stateId: stateId ?? null,
			projectId: id,
		},
	})

	const { mutate, isLoading } = useMutation({
		mutationFn: async (data) => {
			return await axios.post(`/api/v1/tasks/create`, { data })
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
				icon={<AddIcon boxSize={"12px"} />}
				variant={"ghost"}
				rounded={"full"}
				onClick={onOpen}
			/>

			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalContent as={"form"} onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>Create a new task</ModalHeader>
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

						<Select {...register("stateId")}>
							{states?.map((state: State) => (
								<option key={state.id} value={state.id}>
									{state.name}
								</option>
							))}
						</Select>
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

export default CreateTaskModal
