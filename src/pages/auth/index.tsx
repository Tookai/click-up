import { Button, Flex, Input } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import type { NextPage } from "next"
import { useForm } from "react-hook-form"

const Index: NextPage = () => {
	const { register, handleSubmit: handleRegister } = useForm({
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			password: "",
		},
	})

	const { mutate: registerUser } = useMutation({
		mutationFn: async (data: any) => {
			return await axios.post("/api/v1/auth/register", { data })
		},
	})

	const handleReg = (data: any) => {
		registerUser(data)
	}

	const { register: login, handleSubmit: handleLogin } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const { mutate: loginUser } = useMutation({
		mutationFn: async (data: any) => {
			return await axios.post("/api/v1/auth/login", { data })
		},
	})

	const handleLog = (data: any) => {
		loginUser(data)
	}

	return (
		<Flex w={"100vw"} h={"100vh"} overflow={"hidden"} gap={3}>
			<Flex
				flexDir={"column"}
				flex={1}
				w={"full"}
				gap={3}
				as={"form"}
				justifyContent={"center"}
				p={6}
			>
				<Input placeholder={"Email"} {...register("email")} />
				<Input placeholder={"Firstname"} {...register("firstName")} />
				<Input placeholder={"Lastname"} {...register("lastName")} />
				<Input placeholder={"Password"} {...register("password")} />

				<Button onClick={handleRegister(handleReg)}>Register</Button>
			</Flex>

			<Flex
				flexDir={"column"}
				flex={1}
				w={"full"}
				gap={3}
				justifyContent={"center"}
				p={6}
			>
				<Input placeholder={"Email"} {...login("email")} />
				<Input placeholder={"Password"} {...login("password")} />

				<Button onClick={handleLogin(handleLog)}>Login</Button>
			</Flex>
		</Flex>
	)
}

export default Index
