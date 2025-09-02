import { generateObject } from "ai"
import { z } from "zod"
import { type AIModel, getModel } from "@/lib/ai/providers"

export const maxDuration = 30

const exampleSchemas = {
  person: z.object({
    name: z.string().describe("The person's full name"),
    age: z.number().min(0).max(150).describe("The person's age"),
    email: z.string().email().describe("The person's email address"),
    bio: z.string().describe("A brief biography"),
    interests: z.array(z.string()).describe("List of interests"),
  }),
  product: z.object({
    id: z.string().describe("Product ID"),
    name: z.string().describe("Product name"),
    description: z.string().describe("Product description"),
    price: z.number().positive().describe("Product price"),
    category: z.string().describe("Product category"),
    inStock: z.boolean().describe("Whether the product is in stock"),
    tags: z.array(z.string()).describe("Product tags"),
  }),
  event: z.object({
    title: z.string().describe("Event title"),
    description: z.string().describe("Event description"),
    startDate: z.string().describe("Start date in ISO format"),
    endDate: z.string().describe("End date in ISO format"),
    location: z.object({
      name: z.string().describe("Location name"),
      address: z.string().describe("Full address"),
      coordinates: z
        .object({
          lat: z.number().describe("Latitude"),
          lng: z.number().describe("Longitude"),
        })
        .optional(),
    }),
    attendees: z.array(z.string()).describe("List of attendee names"),
    isVirtual: z.boolean().describe("Whether the event is virtual"),
  }),
}

export async function POST(req: Request) {
  try {
    const {
      prompt,
      model = "gpt-4o-mini",
      schemaType = "person",
      customSchema,
    }: {
      prompt: string
      model?: AIModel
      schemaType?: keyof typeof exampleSchemas
      customSchema?: any
    } = await req.json()

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const selectedModel = getModel(model)

    let schema: z.ZodSchema
    if (customSchema) {
      try {
        schema = z.object(customSchema)
      } catch {
        schema = exampleSchemas[schemaType]
      }
    } else {
      schema = exampleSchemas[schemaType]
    }

    const { object, usage, finishReason } = await generateObject({
      model: selectedModel,
      schema,
      prompt,
      system: "You are a helpful AI assistant that generates structured data based on prompts.",
    })

    return Response.json({
      object,
      usage,
      finishReason,
      model,
      schemaType,
    })
  } catch (error) {
    console.error("Generate object API error:", error)
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
