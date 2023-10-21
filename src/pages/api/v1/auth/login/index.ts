import { prisma } from "&/client"
import bcrypt from "bcrypt"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" })
	}

	if (!req.body.data) {
		return res.status(400).json({ error: "Missing payload" })
	}

	try {
		const user = await prisma.user.findUnique({
			where: {
				email: req.body.data.email.toLowerCase(),
			},
		})

		if (!user) {
			return res.status(401).json({ error: "Invalid credentials. Bip Boup." })
		}

		const isPwValid = bcrypt.compareSync(req.body.data.password, user.password)

		if (!isPwValid) {
			return res.status(401).json({ error: "Invalid credentials. Berp Berp." })
		}

		const { password, ...rest } = user

		return res.status(200).json({ message: "Welcome back !", user: rest })
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}

export default handler
