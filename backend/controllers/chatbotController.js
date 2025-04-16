import dotenv from "dotenv";
dotenv.config();
import axios from 'axios';

export const getChatbotResponse = async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
      { inputs: userMessage },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
        },
      }
    );

    const reply = response.data?.[0]?.generated_text || "Sorry, I didn't understand that.";
    res.json({ reply });
  } catch (error) {
    console.error("Chatbot Error:", error.message);
    res.status(500).json({ message: "Failed to get response from chatbot" });
  }
};
