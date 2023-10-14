import Error from "@/layouts/Error"
import Loading from "@/layouts/Loading"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { Flex, Heading, IconButton, Spacer, Text } from "@chakra-ui/react"
import { Project, State, Task } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import dayjs from "dayjs"
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
		enabled: !!id,
		queryKey: ["project", `${id}`],
		queryFn: async () =>
			await axios
				.get(`/api/v1/projects/${id}`)
				.then((res) => res.data as Project),
	})

	const {
		data: states,
		isLoading: isStatesLoading,
		isError: isStatesError,
	} = useQuery({
		enabled: !!id,
		queryKey: ["states", `${id}`],
		queryFn: async () =>
			await axios
				.get(`/api/v1/states/project/${id}`)
				.then((res) => res.data as State[]),
	})

	const {
		data: tasks,
		isLoading: isTasksLoading,
		isError: isTasksError,
	} = useQuery({
		enabled: !!id,
		queryKey: ["tasks", `${id}`],
		queryFn: async () =>
			await axios
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

			<Flex
				w={"100vw"}
				h={"100vh"}
				p={3}
				pb={0}
				gap={3}
				flexDir={"column"}
				overflow={"hidden"}
			>
				<Flex h={8} alignItems={"center"} gap={6}>
					<IconButton
						aria-label={"Back"}
						icon={<ArrowBackIcon boxSize={"24px"} />}
						variant={"ghost"}
						rounded={"full"}
						onClick={() => router.push("/")}
					/>
					<Heading as={"h1"} size={"lg"}>
						{project?.name}
					</Heading>

					<Spacer />

					<Text fontSize={"xs"} opacity={0.65}>
						{dayjs(project?.createdAt).format("DD/MM/YYYY")}
					</Text>
				</Flex>

				<Flex flex={1} w={"full"} gap={3} pb={3} overflow={"auto"}>
					<DraggableLayout>
						{states?.map((state) => (
							<Column
								key={state.id}
								state={state}
								cards={filterAndOrder(tasks, state.id)}
							/>
						))}
					</DraggableLayout>
				</Flex>
			</Flex>
		</>
	)
}

export default Index
