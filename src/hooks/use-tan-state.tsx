import { useQueryClient } from "@tanstack/react-query"

const useTanState = (key: any[]) => {
	const queryClient = useQueryClient()

	const data = queryClient.getQueryData(key) as any

	const setData = (newData: any) => {
		queryClient.setQueryData(key, newData)
	}

	return { data, setData }
}

export default useTanState
