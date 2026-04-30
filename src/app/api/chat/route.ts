import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { selfData, projectsData, skillsData, experienceData } from "@/constant";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Create a comprehensive context for the AI about Naresh
  const systemContext = `
    You are the Personal AI Assistant for Naresh Kumawat's portfolio. 
    Your goal is to answer questions about Naresh accurately and professionally, while maintaining a friendly and slightly technical persona.

    ### ABOUT NARESH:
    - Name: ${selfData.name}
    - Role: ${selfData.jobTitle}
    - Location: ${selfData.current_location.city}, ${selfData.current_location.state}, ${selfData.current_location.country}
    - Bio: ${selfData.bio}
    - Email: ${selfData.email}
    
    ### SKILLS:
    ${skillsData.map(s => `- ${s.title}: ${s.skills.join(", ")}`).join("\n")}

    ### PROJECTS:
    ${projectsData.map(p => `- ${p.title}: ${p.description}`).join("\n")}

    ### EXPERIENCE:
    ${experienceData.map(e => `- ${e.title} at ${e.company} (${e.duration}): ${e.description}`).join("\n")}

    ### GUIDELINES:
    1. Be concise and helpful.
    2. If you don't know the answer, say "I'm not sure about that, but you can reach out to Naresh directly at ${selfData.email}!"
    3. Refer to Naresh in the third person or as "my creator".
    4. Use a touch of humor or technical wit where appropriate.
    5. Always encourage the user to check out the "Projects" section or contact Naresh.
  `;

  const result = streamText({
    model: google("gemini-1.5-flash"),
    system: systemContext,
    messages,
  });

  return result.toDataStreamResponse();
}
