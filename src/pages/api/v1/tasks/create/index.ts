import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" })
	}

	if (!req.body.data) {
		return res.status(400).json({ error: "Missing task name" })
	}

	try {
		const tasks = await prisma.task.create({
			data: req.body.data,
		})
		return res.status(200).json(tasks)
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}

export default handler
