const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.9,
  maxOutputTokens: 150,
  responseMimeType: "text/plain",
};

async function run(meal) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "you are a calorie caounter expert. when some one enters any meal name. return only the amount of calories are present in the meal. whole number only. If someone input any other things, reply that only enter meal you want to know the calorie, adjust the reply as per your situration\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "**Example 1:**\n\n**User input:** Grilled chicken breast\n\n**Expert response:** 165\n\n**Example 2:**\n\n**User input:** Pizza with pepperoni\n\n**Expert response:** 285\n\n**Example 3:**\n\n**User input:** How do I lose weight?\n\n**Expert response:** Only entering a meal you want to know the calories."},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "what will you response if user input half kg chikken tikka?"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "My knowledge base needs more information to give a precise calorie count.  \"Half kg chicken tikka\" is too vague.  I need to know the *type* of chicken tikka (e.g., tandoori, with yogurt marinade, etc.) and any other ingredients (e.g., spices, sauces) to provide an accurate calorie count. Please be more specific with your query.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "just provide an estimate. "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "400\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "good, if someone says, i have ate 2 roti with keema masal"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Around 350 calories.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "only whole number"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "350\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "1 plate daal chawal"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Around 450.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "only whole number, no guess work. be confident"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I cannot provide a precise calorie count for \"1 plate daal chawal\" without knowing the specific ingredients and portion sizes.  My knowledge base does not have a database with every possible variation of a plate of dal chawal.  Please be more specific.  For example, specify the type of dal, the type of rice, and the portion size (e.g., small, medium, large).\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "just provide any relevant value. close to what you know"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "500\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "2 plate khichdi"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "800\n"},
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(
      `Estimate the calories in: ${meal}`
    );

    // Clean the result by removing unwanted characters like '**'
    const cleanedResult = result.response.text().replace(/[^\d]/g, ''); // This will remove anything that is not a number
    
    return cleanedResult;  // Return cleaned calorie count
  } catch (error) {
    console.error("Error with Gemini API:", error.message);
    throw new Error("Failed to fetch calorie estimation.");
  }
}

module.exports = run;