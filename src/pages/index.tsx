import Error from "@/layouts/Error"
import Loading from "@/layouts/Loading"
import { Link } from "@chakra-ui/next-js"
import { Flex, Heading, SimpleGrid } from "@chakra-ui/react"
import { Project } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { NextPage } from "next"

const Index: NextPage = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["projects"],
		queryFn: async () => axios.get("/api/v1/projects").then((res) => res.data),
	})

	if (isLoading) {
		return <Loading />
	}

	if (isError) {
		return <Error />
	}

	return (
		<Flex w={"100vw"} h={"100vh"} flexDir={"column"} p={9} gap={9}>
			<Heading>Chose your project</Heading>

			<SimpleGrid columns={4} gap={6} flex={1}>
				{data.map((project: Project) => (
					<Link
						key={project.id}
						href={`/project/${project.id}`}
						borderWidth={1}
						h={"fit-content"}
						p={3}
						rounded={"lg"}
						_hover={{
							bg: "blue.900",
							textDecoration: "none",
						}}
						textAlign={"center"}
						fontSize={"2xl"}
					>
						{project.name}
					</Link>
				))}
			</SimpleGrid>
		</Flex>
	)
}

export default Index
