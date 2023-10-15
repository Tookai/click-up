import { prisma } from "&/client"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" })
	}

	if (!req.query.id) {
		return res.status(400).json({ error: "Missing state id" })
	}

	try {
		const state = await prisma.state.findUnique({
			where: {
				id: req.query.id as string,
			},
		})

		if (!state) {
			return res
				.status(404)
				.json({ error: `state with id: "${req.query.id}" not found` })
		}

		return res.status(200).json(state)
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}

export default handler
