import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "PUT") {
		return res.status(405).json({ error: "Method not allowed" })
	}

	if (!req.query.id) {
		return res.status(400).json({ error: "Missing task id" })
	}

	if (!req.body.data) {
		return res.status(400).json({ error: "Missing state id" })
	}

	try {
		const task = await prisma.task.update({
			where: {
				id: req.query.id as string,
			},
			data: {
				...req.body.data,
			},
		})

		if (!task) {
			return res
				.status(404)
				.json({ error: `task with id: "${req.query.id}" not found` })
		}

		return res
			.status(200)
			.json({ message: "Task updated successfully", task: task })
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}

export default handler
