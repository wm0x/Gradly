const API_KEY: string = "AIzaSyAPN2VQn9I9UgqaHORwWclSu6mjAG-5f9Q";
const endpoint: string =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

interface GeminiRes {
    candidates?: Array<{
        content?: {
            parts?: Array<{
                text?: string;
            }>;
        };
    }>;
    error?: {
        message: string;
        type: string;
        param: string | null;
        code: string;
    };
}

export async function sendToGemini(userInput: string): Promise<string> {
    // First check if the input is too short or unclear
    if (
        !userInput ||
        userInput.trim().length < 5 ||
        userInput.toLowerCase().includes("test")
    ) {
        return `🤔 I'm not quite sure what you're asking. Could you please provide more details about your academic project or idea? 
        
For example:
- "I need help with a computer science capstone project"
- "Looking for innovative biology research ideas"
- "How can I combine art and technology for my thesis?"

The more details you provide, the better I can help!`;
    }

    try {
        const combinedPrompt = `
🌟 Welcome to Gradly AI - Your Creative Academic Companion! 🌟

You are Gradly, an enthusiastic academic advisor with 10+ years of experience helping students transform vague ideas into award-winning projects. Your specialty is seeing potential where others see obstacles.

Personality Traits:
- Encouraging and motivational
- Creative yet practical
- Passionate about education
- Loves using analogies and examples
- Occasionally uses emojis to emphasize points ✨

Response Guidelines:
1. Always begin with an engaging, personalized greeting
2. Structure responses with:
   - 💡 Idea Spark (core concept)
   - 🎯 Potential Applications (2-3 fields)
   - 🔍 Research Angles (unique approaches)
   - 🛠️ Implementation Tips (technical considerations)
3. Use markdown formatting for readability
4. Include 1-2 inspirational quotes when appropriate
5. For non-academic queries, respond playfully but firmly:
   "🚀 While I'd love to chat about that, my circuits are optimized for academic innovation! How about we brainstorm project ideas instead?"

Current Academic Trends to Consider:
- AI ethics in education
- Sustainable tech solutions
- Interdisciplinary approaches
- Accessibility in technology

Student Request: "${userInput}"

Please provide:
1. Three innovative project variations
2. Technical complexity assessment (Beginner/Intermediate/Advanced)
3. Potential academic disciplines this could benefit
4. One "outside-the-box" twist for each idea
`.trim();

        const res = await fetch(`${endpoint}?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: combinedPrompt }],
                    },
                ],
                generationConfig: {
                    temperature: 0.8,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2000,
                },
            }),
        });

        const data: GeminiRes = await res.json();

        if (!res.ok) {
            console.error("API error:", data);
            return `Connection Issue: Our academic satellites seem to be misaligned. Please try again later! (Error: ${
                data.error?.message || "Unknown"
            })`;
        }

        const reply =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            `🛠️ Idea Generator Temporarily Offline: 
      Our creative engines are revving up! Here's a starter idea while we troubleshoot:
      
      "Smart Campus Guide" - An AR app that helps students navigate university facilities while displaying real-time resource availability. 
      
      Potential Angles: 
      - Accessibility features for visually impaired students
      - Integration with campus event calendars
      - Energy usage visualization`;

        return formatCreativeResponse(reply);
    } catch (error) {
        console.error("Fetch error:", error);
        return `Creative Overflow: Too many brilliant ideas at once! Please try again in a moment.`;
    }
}

function formatCreativeResponse(text: string): string {
    return text
        .replace(/(\d+\.\s)/g, "✨ $1")
        .replace(/Potential/g, "🚀 Potential")
        .replace(/Consider/g, "🔍 Consider")
        .replace(/Tip:/g, "💡 Pro Tip:")
        .replace(/Note:/g, "📝 Note:");
}
