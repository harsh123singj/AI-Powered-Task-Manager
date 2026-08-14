import { pipeline } from "@huggingface/transformers";


const embeddingPipeline = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
);


export const generateEmbedding = async (text) => {
    const result = await embeddingPipeline(text,
        {
            pooling: "mean",
            normalize: true
        }
    );
    const embedding = result.tolist()[0];
    return embedding;
};




