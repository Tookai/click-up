import { prisma } from "&/client"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" })
	}

	if (!req.query.id) {
		return res.status(400).json({ error: "Missing priority id" })
	}

	try {
		const priority = await prisma.priority.findUnique({
			where: {
				id: req.query.id as string,
			},
		})

		if (!priority) {
			return res
				.status(404)
				.json({ error: `priority with id: "${req.query.id}" not found` })
		}

		return res.status(200).json(priority)
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}

export default handler
