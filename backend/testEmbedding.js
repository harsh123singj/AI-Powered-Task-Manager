import { generateEmbedding } from "./services/embeddingService.js";

const embed= await generateEmbedding("complete backedn authentication");

console.log(embed);
