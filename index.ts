import "dotenv/config";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { postgres } from "ai-sql";

const DATABASE_URL = process.env.DATABASE_URL;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

const openai = createOpenAI({
  compatibility: "strict",
  apiKey: OPENAI_API_KEY
});

const { text } = await generateText({
  model: openai("gpt-4o-mini"),
  tools: {
    database: await postgres(DATABASE_URL)
  },
  maxSteps: 5,
  prompt: "List the users names"
})

console.log(text)