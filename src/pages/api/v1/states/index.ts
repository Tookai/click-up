import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" })
	}

	try {
		const states = await prisma.state.findMany()
		return res.status(200).json(states)
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}

export default handler
