import type { UIMessage } from "ai"
import { convertToModelMessages, stepCountIs, streamText } from "ai"
import { type AIModel, getModel } from "@/lib/ai/providers"
import { allTools } from "@/lib/ai/tools"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const {
      messages,
      model = "gpt-4o-mini",
      useTools = true,
    }: {
      messages: UIMessage[]
      model?: AIModel
      useTools?: boolean
    } = await req.json()

    const selectedModel = getModel(model)

    const result = streamText({
      model: selectedModel,
      messages: convertToModelMessages(messages),
      stopWhen: stepCountIs(5),
      tools: useTools ? allTools : undefined,
      system: `You are a helpful AI assistant. You have access to various tools to help answer questions.
      
When using tools:
- Use the weather tool to get current weather information for any location
- Use the calculator tool for mathematical calculations
- Use the converter tool to convert between different units of measurement
- Use the search tool to find information on the web
- Use the date tool to get current date and time information

Always be helpful, accurate, and concise in your responses.`,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
