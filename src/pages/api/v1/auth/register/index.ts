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
		const hashedPassword = await bcrypt.hash(req.body.data.password, 10)

		const user = await prisma.user.create({
			data: {
				email: req.body.data.email.toLowerCase(),
				firstName: req.body.data.firstName,
				lastName: req.body.data.lastName.toUpperCase(),
				password: hashedPassword,
			},
		})

		const { password, ...rest } = user

		return res
			.status(200)
			.json({ message: "User created successfully", user: rest })
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}

export default handler
