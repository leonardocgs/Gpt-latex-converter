import openaiApi from "@/utils/gpt";
import { latexPrompt } from "@/utils/gpt/prompt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const expression = JSON.parse(req.body).expression ?? "";

      if (expression === "") {
        res.status(400).json({ error: "Expression is required" });
        return;
      }
      const response = await openaiApi.createCompletion({
        model: "text-davinci-003",
        prompt: latexPrompt(expression),
        temperature: 0.3,
      });
      console.log(response.data.choices[0].text);
      res.status(200).json({ response: response.data.choices[0].text });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
}
