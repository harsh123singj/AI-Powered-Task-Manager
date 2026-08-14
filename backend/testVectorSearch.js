import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { searchRelevantTasks } from "./services/vectorSearchService.js";

dotenv.config();

await connectDB();

const result = await searchRelevantTasks(
    "Which tasks are related to AI and RAG?",
    "6a7d94798197854c9a466064"
);

console.log(result);