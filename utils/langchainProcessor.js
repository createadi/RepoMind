import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.2,
});

// Generate summary of the repository
export async function summarizeRepository(files) {

    const fileSummaries = files.map(f => `${f.filename}:\n${f.content.substring(0, 200)}...`).join("\n\n");

    const messages = [
        { role: "system", content: "You are an AI assistant that summarizes GitHub repositories." },
        { role: "user", content: `Summarize this Git repository:\n\n${fileSummaries}` }
    ];

    try {
        const response = await llm.invoke(messages);
        return response;
    } catch (error) {
        return "Error generating summary.";
    }
}


// Answer questions based on repo content
export async function askQuestion(files, question) {

    const fileSummaries = files.map(f => `${f.filename}:\n${f.content.substring(0, 200)}...`).join("\n\n");

    const messages = [
        { role: "system", content: "You are an AI assistant that answers questions about a GitHub repository." },
        { role: "user", content: `Here is the repository summary:\n\n${fileSummaries}` },
        { role: "user", content: `Question: ${question}` }
    ];

    try {
        const response = await llm.invoke(messages);
        return response;
    } catch (error) {
        return "Error generating answer.";
    }
}

