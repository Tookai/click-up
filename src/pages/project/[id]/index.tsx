import Error from "@/layouts/Error"
import Loading from "@/layouts/Loading"
import { Flex } from "@chakra-ui/react"
import { Project, State, Task } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { NextPage } from "next"
import dynamic from "next/dynamic"
import Head from "next/head"
import { useRouter } from "next/router"

const DraggableLayout = dynamic(() => import("@/layouts/DraggableLayout"), {
	ssr: false,
})

const Column = dynamic(() => import("@/components/Column"), {
	ssr: false,
})

const filterAndOrder = (arr: Task[] | undefined, id: string) => {
	return arr?.filter((item) => item.stateId === id) ?? []
}

const Index: NextPage = () => {
	const router = useRouter()
	const { id } = router.query as { id: string }

	const {
		data: project,
		isLoading: isProjectLoading,
		isError: isProjectError,
	} = useQuery({
		queryKey: ["project", `${id}`],
		queryFn: async () =>
			axios.get(`/api/v1/projects/${id}`).then((res) => res.data as Project),
	})

	const {
		data: states,
		isLoading: isStatesLoading,
		isError: isStatesError,
	} = useQuery({
		queryKey: ["states", `${id}`],
		queryFn: async () =>
			axios
				.get(`/api/v1/states/project/${id}`)
				.then((res) => res.data as State[]),
	})

	const {
		data: tasks,
		isLoading: isTasksLoading,
		isError: isTasksError,
	} = useQuery({
		queryKey: ["tasks", `${id}`],
		queryFn: async () =>
			axios
				.get(`/api/v1/tasks/project/${id}`)
				.then((res) => res.data as Task[]),
	})

	if (
		[isProjectLoading, isStatesLoading, isTasksLoading].some((v) => v === true)
	) {
		return <Loading />
	}

	if ([isProjectError, isStatesError, isTasksError].some((v) => v === true)) {
		return <Error />
	}

	return (
		<>
			<Head>
				<title>{project?.name}</title>
			</Head>

			<Flex w={"100vw"} h={"100vh"} p={3} gap={3}>
				<DraggableLayout>
					{states?.map((state) => (
						<Column
							key={state.id}
							droppableId={state.id}
							title={state.name}
							cards={filterAndOrder(tasks, state.id)}
						/>
					))}
				</DraggableLayout>
			</Flex>
		</>
	)
}

export default Index
