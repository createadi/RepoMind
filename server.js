import express from "express";
import cors from "cors";
import { cloneRepository, readRepositoryFiles } from "./utils/repoManager.js";
import { summarizeRepository, askQuestion } from "./utils/langchainProcessor.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.post("/analyze", async (req, res) => {
    try {
        const { repoUrl } = req.body;
        if (!repoUrl) return res.status(400).json({ error: "Repository URL is required" });

        const repoName = repoUrl.split("/").pop().replace(".git", "");
        const repoPath = await cloneRepository(repoUrl, repoName);
        const files = await readRepositoryFiles(repoPath);
        const summary = await summarizeRepository(files);

        res.json({ summary });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/ask", async (req, res) => {
    try {
        const { repoUrl, question } = req.body;
        if (!repoUrl || !question) return res.status(400).json({ error: "Both repoUrl and question are required" });

        const repoName = repoUrl.split("/").pop().replace(".git", "");
        const repoPath = `./repos/${repoName}`;
        const files = await readRepositoryFiles(repoPath);
        const answer = await askQuestion(files, question);

        res.json({ answer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => { });
