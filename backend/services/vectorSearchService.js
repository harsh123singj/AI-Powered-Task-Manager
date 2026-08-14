import Task from "../models/Task.model.js";
import { generateEmbedding } from "./embeddingService.js";
import mongoose from "mongoose";
export const searchRelevantTasks = async (query, userId) => {

    const queryEmbedding = await generateEmbedding(query);

    const results = await Task.aggregate([
    {
        $vectorSearch: {
            index: "vector_index",
            path: "embedding",
            queryVector: queryEmbedding,
            exact: false,
            numCandidates: 100,
            limit: 5,
            filter: {
                user: new mongoose.Types.ObjectId(userId)
            }
        }
    }
]);

    return results;
};