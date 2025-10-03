import express, { Request, Response } from "express";
import cors from "cors";
import { readRepositoryFiles, fetchRepoInsights } from "./utils/repoManager.js";
import {
  summarizeRepository,
  askQuestion,
} from "./utils/langchainProcessor.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.post("/summarize", async (req: Request, res: Response) => {
  try {
    const { repoUrl } = req.body;
    if (!repoUrl)
      return res.status(400).json({ error: "Repository URL is required" });

    const repoName = repoUrl.split("/").pop().replace(".git", "");
    const files = await readRepositoryFiles(repoUrl, repoName);
    const summary = await summarizeRepository(files);

    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
});

app.post("/ask", async (req: Request, res: Response) => {
  try {
    const { repoUrl, question } = req.body;
    if (!repoUrl || !question)
      return res
        .status(400)
        .json({ error: "Both repoUrl and question are required" });

    const repoName = repoUrl.split("/").pop().replace(".git", "");
    const files = await readRepositoryFiles(repoUrl, repoName);
    const answer = await askQuestion(files, question);

    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
});

app.post("/stats", async (req: Request, res: Response) => {
  try {
    const { repoUrl } = req.body;
    if (!repoUrl) {
      return res.status(404).json({ error: "Repo Url is not found" });
    }

    const stats = await fetchRepoInsights(repoUrl);
    return res.json({ data: stats });
    
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
