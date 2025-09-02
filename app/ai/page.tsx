import { AIChat } from "@/components/ai/chat"

export default function AIPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="font-bold text-3xl">AI Assistant</h1>
        <p className="mt-2 text-muted-foreground">
          Chat with AI using multiple providers including OpenAI (GPT-5, GPT-4o), Anthropic
          (Claude), and Google (Gemini).
        </p>
      </div>

      <div className="h-[calc(100vh-20rem)] overflow-hidden rounded-lg border bg-card sm:h-[500px] md:h-[600px] lg:h-[700px]">
        <AIChat />
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="font-semibold text-xl">Features</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">🤖 Multiple AI Providers</h3>
            <p className="text-muted-foreground text-sm">
              Switch between OpenAI, Anthropic, and Google models seamlessly
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">🛠️ Built-in Tools</h3>
            <p className="text-muted-foreground text-sm">
              Weather, calculator, unit converter, search, and date/time tools
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">💬 Streaming Responses</h3>
            <p className="text-muted-foreground text-sm">
              Real-time streaming of AI responses for better user experience
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">🔧 Customizable</h3>
            <p className="text-muted-foreground text-sm">
              Configure models, enable/disable tools, and customize the system prompt
            </p>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/50 p-4">
          <h3 className="mb-2 font-medium">⚙️ Configuration Required</h3>
          <p className="text-muted-foreground text-sm">
            To use the AI chat, you need to configure at least one AI provider API key in your{" "}
            <code className="rounded bg-muted px-1">.env.local</code> file:
          </p>
          <ul className="mt-2 space-y-1 text-muted-foreground text-sm">
            <li>
              • OpenAI: <code className="rounded bg-muted px-1">OPENAI_API_KEY</code>
            </li>
            <li>
              • Anthropic: <code className="rounded bg-muted px-1">ANTHROPIC_API_KEY</code>
            </li>
            <li>
              • Google: <code className="rounded bg-muted px-1">GOOGLE_GENERATIVE_AI_API_KEY</code>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
