import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import { encoding_for_model } from "tiktoken";

dotenv.config();

const llm = new ChatOpenAI({
    model: "gpt-4o-mini", // or "gpt-3.5-turbo"
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.2,
});


// Function to count tokens in a string
function countTokens(text) {
    const encoder = encoding_for_model("gpt-4o-mini"); // or "gpt-3.5-turbo"
    const tokens = encoder.encode(text);
    return tokens.length;
}

// Generate summary of the repository
export async function summarizeRepository(files) {
    const fileSummaries = files.map(f => `${f.filename}:\n${f.content}`).join("\n\n");

    // 🔥 Check token count before sending to OpenAI
    const tokenCount = countTokens(fileSummaries);
    console.log(`Token Count: ${tokenCount}`);

    const messages = [
        { role: "system", content: "You are an AI assistant that summarizes GitHub repositories." },
        { role: "user", content: `Summarize this Git repository:\n\n${fileSummaries}` }
    ];

    try {
        // If tokens are too many, truncate or split into chunks
        if (tokenCount > 4096) {
            console.warn("⚠️ Warning: Too many tokens! Consider summarizing in chunks.");
            return "Error: Token limit exceeded.";
        }

        const response = await llm.invoke(messages);
        return response;
    } catch (error) {
        return "Error generating summary.";
    }
}


// Answer questions based on repo content
export async function askQuestion(files, question) {

    const fileSummaries = files.map(f => `${f.filename}:\n${f.content}`).join("\n\n");

    // 🔥 Check token count before sending to OpenAI
    const tokenCount = countTokens(fileSummaries);
    console.log(`Token Count: ${tokenCount}`);

    const messages = [
        { role: "system", content: "You are an AI assistant that answers questions about a GitHub repository." },
        { role: "user", content: `Here is the repository summary:\n\n${fileSummaries}` },
        { role: "user", content: `Question: ${question}` }
    ];

    try {
        if (tokenCount > 4096) {
            console.warn("⚠️ Warning: Too many tokens! Consider summarizing in chunks.");
            return "Error: Token limit exceeded.";
        }

        const response = await llm.invoke(messages);
        return response;
    } catch (error) {
        return "Error generating answer.";
    }
}

