import axios from "axios";

const API_URL = "https://api.openai.com/v1/chat/completions";

export const sendMessageToOpenAI = async (message: string) => {
  const response = await axios.post(
    API_URL,
    {
      model: "gpt-4",
      messages: [
        { role: "system", content: "I am a helpful assistant." },
        { role: "user", content: message },
      ],
      stream: true,
    },
    {
      headers: {
        //`Bearer ${process.env.OPENAI_API_KEY}`
        Authorization: `Bearer`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log("response chatService", response.data);
  return response.data;
};
