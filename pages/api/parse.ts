// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getAIResponse from "@/lib/chatgpt";

type Data = {
  parsed: string | null;
  error: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        res.status(405).json({
            parsed: null,
            error: "Method Not Allowed",
        });
        return;
    }
    try {
        const { body } = req;
        const prompt = body;
        let aires = await getAIResponse(prompt);
        let aa:string = aires;
        res.status(200).json({ parsed: aa, error: null })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ parsed: null, error: "Error"})
    }
  
}
