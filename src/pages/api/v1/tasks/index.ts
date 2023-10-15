import { prisma } from "&/client"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" })
	}

	try {
		const tasks = await prisma.task.findMany()
		return res.status(200).json(tasks)
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}

export default handler
