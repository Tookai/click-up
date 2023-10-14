import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "DELETE") {
		return res.status(405).json({ error: "Method not allowed" })
	}

	if (!req.query.id) {
		return res.status(400).json({ error: "Missing task id" })
	}

	try {
		const task = await prisma.task.delete({
			where: {
				id: req.query.id as string,
			},
		})

		if (!task) {
			return res
				.status(404)
				.json({ error: `task with id: "${req.query.id}" not found` })
		}

		return res.status(200).json({ message: "Task deleted successfully" })
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}

export default handler
