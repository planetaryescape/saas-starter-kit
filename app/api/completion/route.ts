import { generateText } from "ai"
import { type AIModel, getModel } from "@/lib/ai/providers"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const {
      prompt,
      model = "gpt-4o-mini",
      system,
    }: {
      prompt: string
      model?: AIModel
      system?: string
    } = await req.json()

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const selectedModel = getModel(model)

    const { text, usage, finishReason } = await generateText({
      model: selectedModel,
      prompt,
      system: system || "You are a helpful AI assistant.",
    })

    return Response.json({
      text,
      usage,
      finishReason,
      model,
    })
  } catch (error) {
    console.error("Completion API error:", error)
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
