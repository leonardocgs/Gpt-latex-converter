import { Configuration, OpenAIApi } from "openai";
let configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openaiApi = new OpenAIApi(configuration);
export default openaiApi;
