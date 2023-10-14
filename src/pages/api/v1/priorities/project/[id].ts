import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" })
	}

	if (!req.query.id) {
		return res.status(400).json({ error: "Missing project id" })
	}

	try {
		const priorities = await prisma.priority.findMany({
			where: {
				projectId: req.query.id as string,
			},
			orderBy: {
				position: "asc",
			},
		})

		return res.status(200).json(priorities)
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}

export default handler
