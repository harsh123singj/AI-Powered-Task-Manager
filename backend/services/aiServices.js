import { GoogleGenerativeAI } from "@google/generative-ai";
import Task from "../models/Task.model.js";
import { searchRelevantTasks } from "./vectorSearchService.js";

const gen_AI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = gen_AI.getGenerativeModel({
    model: "gemini-3.5-flash"
});


const formatTasks = (tasks) => {
    return tasks
        .map(task => `
Title: ${task.title}
Description: ${task.description || "No description"}
Status: ${task.status}
Priority: ${task.priority}
Due Date: ${task.dueDate || "No due date"}
`)
        .join("\n");
};


const isPendingQuery = (prompt) => {
    const text = prompt.toLowerCase();

    return (
        text.includes("pending") ||
        text.includes("unfinished") ||
        text.includes("incomplete")
    );
};


const isCompletedQuery = (prompt) => {
    const text = prompt.toLowerCase();

    return (
        text.includes("completed") ||
        text.includes("complete") ||
        text.includes("finished")
    );
};


const isDeadlineQuery = (prompt) => {
    const text = prompt.toLowerCase();

    return (
        text.includes("due") ||
        text.includes("deadline") ||
        text.includes("this week") ||
        text.includes("next week") ||
        text.includes("upcoming")
    );
};


const isCreateQuery = (prompt) => {
    const text = prompt.toLowerCase();

    return (
        text.includes("create a task") ||
        text.includes("create task") ||
        text.includes("add a task") ||
        text.includes("add task") ||
        text.includes("make a task") ||
        text.includes("new task")
    );
};


const getStartOfToday = () => {
    const date = new Date();

    date.setHours(0, 0, 0, 0);

    return date;
};


const getEndOfToday = () => {
    const date = new Date();

    date.setHours(23, 59, 59, 999);

    return date;
};


const getEndOfWeek = () => {
    const date = new Date();

    const day = date.getDay();

    const daysUntilSunday = 7 - day;

    date.setDate(date.getDate() + daysUntilSunday);

    date.setHours(23, 59, 59, 999);

    return date;
};


export const generateAIResponse = async (prompt, userId) => {

    const text = prompt.toLowerCase();


    // ==========================================
    // FEATURE 1: PENDING TASK SUMMARY
    // ==========================================

    if (isPendingQuery(prompt)) {

        const tasks = await Task.find({
            user: userId,
            status: "pending"
        }).sort({
            dueDate: 1
        });

        if (tasks.length === 0) {
            return "You currently have no pending tasks.";
        }

        const taskList = tasks
            .map((task, index) => {
                return `${index + 1}. ${task.title} — ${task.priority} priority — ${
                    task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "No due date"
                }`;
            })
            .join("\n");

        return `You currently have ${tasks.length} pending task(s):

${taskList}`;
    }


    // ==========================================
    // FEATURE 1: COMPLETED TASK SUMMARY
    // ==========================================

    if (isCompletedQuery(prompt)) {

        const tasks = await Task.find({
            user: userId,
            status: "completed"
        }).sort({
            dueDate: -1
        });

        if (tasks.length === 0) {
            return "You currently have no completed tasks.";
        }

        const taskList = tasks
            .map((task, index) => {
                return `${index + 1}. ${task.title}`;
            })
            .join("\n");

        return `You have completed ${tasks.length} task(s):

${taskList}`;
    }


    // ==========================================
    // FEATURE 2: DEADLINE QUERIES
    // ==========================================

    if (isDeadlineQuery(prompt)) {

        let startDate = getStartOfToday();
        let endDate = getEndOfWeek();

        if (text.includes("today")) {
            endDate = getEndOfToday();
        }

        const tasks = await Task.find({
            user: userId,
            status: { $ne: "completed" },
            dueDate: {
                $gte: startDate,
                $lte: endDate
            }
        }).sort({
            dueDate: 1
        });

        if (tasks.length === 0) {
            return "You don't have any pending tasks due within the requested time period.";
        }

        const taskList = tasks
            .map((task, index) => {
                return `${index + 1}. ${task.title} — due ${new Date(
                    task.dueDate
                ).toLocaleDateString()} — ${task.priority} priority`;
            })
            .join("\n");

        return `Here are your upcoming deadlines:

${taskList}`;
    }


    // ==========================================
    // FEATURE 3: CREATE TASK
    // ==========================================

    if (isCreateQuery(prompt)) {

        const extractionPrompt = `
Extract task information from the following user request.

Return ONLY valid JSON.

Required format:

{
    "title": "task title",
    "description": "task description",
    "priority": "low | medium | high",
    "dueDate": "YYYY-MM-DD"
}

User request:
${prompt}

Rules:
- Create a short useful title.
- If no description is provided, use an empty string.
- If priority is not specified, use "medium".
- If no due date is provided, use null.
- Do not add any explanation.
`;

        try {

            const result = await model.generateContent(extractionPrompt);

            const responseText = result.response.text();

            const cleaned = responseText
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            const taskData = JSON.parse(cleaned);

            const newTask = await Task.create({
                title: taskData.title,
                description: taskData.description || "",
                priority: taskData.priority || "medium",
                dueDate: taskData.dueDate
                    ? new Date(taskData.dueDate)
                    : null,
                status: "pending",
                user: userId
            });

            return `Task created successfully.

Title: ${newTask.title}
Priority: ${newTask.priority}
Status: ${newTask.status}
Due Date: ${
                newTask.dueDate
                    ? new Date(newTask.dueDate).toLocaleDateString()
                    : "No due date"
            }`;

        } catch (error) {

            console.error("AI task creation error:", error);

            return "I couldn't create the task right now. Please try again.";
        }
    }


    // ==========================================
    // NORMAL RAG / SEMANTIC SEARCH
    // ==========================================

    const relevantTasks = await searchRelevantTasks(
        prompt,
        userId
    );

    const taskContext = formatTasks(relevantTasks);

    const finalPrompt = `
You are an AI task assistant.

Use ONLY the user's task information provided below.

Relevant tasks:

${taskContext || "No relevant tasks found."}

User's question:

${prompt}

Rules:
- Answer clearly and concisely.
- Do not invent tasks.
- Do not claim a task exists if it is not provided.
- If no relevant tasks are found, say so.
- Explain your answer using the task information.
`;

    const result = await model.generateContent(finalPrompt);

    return result.response.text();
};