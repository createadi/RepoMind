import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import { encoding_for_model } from "tiktoken";

dotenv.config();

const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.2,
});

interface File {
  filename: string;
  content: string;
}

// Function to count tokens in a string
function countTokens(text: string): number {
  const encoder = encoding_for_model("gpt-3.5-turbo");
  const tokens = encoder.encode(text);
  return tokens.length;
}

// Generate summary of the repository
export async function summarizeRepository(files: File[]): Promise<string> {
  const fileSummaries = files
    .map((f) => `${f.filename}:\n${f.content}`)
    .join("\n\n");

  // 🔥 Check token count before sending to OpenAI
  const tokenCount = countTokens(fileSummaries);

  const messages = [
    {
      role: "system",
      content: "You are an AI assistant that summarizes GitHub repositories. Structure the format like ChatGPT, using proper paragraphs and bullet points and codeblocks.",
    },
    {
      role: "user",
      content: `Summarize this Git repository:\n\n${fileSummaries} and do not include any title and code at all.`,
    },
  ];

  try {
    // If tokens are too many, truncate or split into chunks
    if (tokenCount > 4096) {
      return "Error: Token limit exceeded.";
    }
    const response = await llm.invoke(messages);
    return typeof response.content === "string"
      ? response.content
      : JSON.stringify(response.content);
  } catch (error) {
    return "Error generating summary.";
  }
}

// Answer questions based on repo content
export async function askQuestion(
  files: File[],
  question: string
): Promise<string> {
  const fileSummaries = files
    .map((f) => `${f.filename}:\n${f.content}`)
    .join("\n\n");

  // 🔥 Check token count before sending to OpenAI
  const tokenCount = countTokens(fileSummaries);

  const messages = [
    {
      role: "system",
      content:
        "You are an AI assistant that answers questions about a GitHub repository.",
    },
    {
      role: "user",
      content: `Here is the repository summary:\n\n${fileSummaries}`,
    },
    { role: "user", content: `Question: ${question}` },
  ];

  try {
    if (tokenCount > 4096) {
      return "Error: Token limit exceeded.";
    }

    const response = await llm.invoke(messages);
    return typeof response.content === "string"
      ? response.content
      : JSON.stringify(response.content);
  } catch (error) {
    return "Error generating answer.";
  }
}
