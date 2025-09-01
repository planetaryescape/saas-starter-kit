"use client"

import { useChat } from "@ai-sdk/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MODEL_CONFIGS, type AIModel, getAvailableModels } from "@/lib/ai/providers"
import {
  Send,
  Bot,
  User,
  Loader2,
  Settings,
  X,
  Cloud,
  Calculator,
  Calendar,
  Globe,
  ThermometerSun,
} from "lucide-react"

export function AIChat() {
  const [input, setInput] = useState("")
  const [selectedModel, setSelectedModel] = useState<AIModel>("gpt-4o-mini")
  const [showSettings, setShowSettings] = useState(false)
  const [useTools, setUseTools] = useState(true)

  const availableModels = getAvailableModels()

  const { messages, sendMessage, isLoading, stop } = useChat({
    api: "/api/chat",
    body: {
      model: selectedModel,
      useTools,
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      sendMessage({ text: input })
      setInput("")
    }
  }

  const getToolIcon = (toolName: string) => {
    switch (toolName) {
      case "tool-weather":
        return <ThermometerSun className="h-4 w-4" />
      case "tool-calculator":
        return <Calculator className="h-4 w-4" />
      case "tool-converter":
        return <Globe className="h-4 w-4" />
      case "tool-search":
        return <Cloud className="h-4 w-4" />
      case "tool-date":
        return <Calendar className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <h2 className="font-semibold">AI Assistant</h2>
            <span className="text-muted-foreground text-sm">
              {MODEL_CONFIGS[selectedModel].displayName}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
          >
            {showSettings ? <X className="h-4 w-4" /> : <Settings className="h-4 w-4" />}
          </Button>
        </div>

        {showSettings && (
          <div className="mt-4 space-y-4 border-t pt-4">
            <div>
              <label className="text-sm font-medium">Model</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as AIModel)}
                className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
              >
                {availableModels.map((model) => (
                  <option key={model} value={model}>
                    {MODEL_CONFIGS[model].displayName} ({MODEL_CONFIGS[model].provider})
                  </option>
                ))}
              </select>
              {availableModels.length === 0 && (
                <p className="text-destructive mt-2 text-xs">
                  No API keys configured. Please add API keys in your .env.local file.
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Enable Tools</label>
              <input
                type="checkbox"
                checked={useTools}
                onChange={(e) => setUseTools(e.target.checked)}
                className="rounded border-gray-300"
              />
            </div>

            <div className="text-muted-foreground text-xs">
              <p>Context: {MODEL_CONFIGS[selectedModel].contextWindow.toLocaleString()} tokens</p>
              <p>Max Output: {MODEL_CONFIGS[selectedModel].maxOutput.toLocaleString()} tokens</p>
              <p>Vision: {MODEL_CONFIGS[selectedModel].supportsVision ? "✓" : "✗"}</p>
              <p>Functions: {MODEL_CONFIGS[selectedModel].supportsFunctions ? "✓" : "✗"}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-muted-foreground flex h-full items-center justify-center text-center">
            <div>
              <Bot className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p>Start a conversation with the AI assistant</p>
              <p className="mt-2 text-sm">
                Using {MODEL_CONFIGS[selectedModel].displayName}
                {useTools && " with tools enabled"}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-3 py-2",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted",
                  )}
                >
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <div key={`${message.id}-${i}`} className="whitespace-pre-wrap">
                            {part.text}
                          </div>
                        )
                      case "tool-weather":
                      case "tool-calculator":
                      case "tool-converter":
                      case "tool-search":
                      case "tool-date":
                        return (
                          <div
                            key={`${message.id}-${i}`}
                            className="mt-2 rounded border bg-background/50 p-2 text-xs"
                          >
                            <div className="mb-1 flex items-center gap-1 font-medium">
                              {getToolIcon(part.type)}
                              <span>Tool: {part.type.replace("tool-", "")}</span>
                            </div>
                            <pre className="overflow-x-auto">
                              {JSON.stringify(part, null, 2)}
                            </pre>
                          </div>
                        )
                      case "reasoning":
                        return (
                          <details key={`${message.id}-${i}`} className="mt-2">
                            <summary className="cursor-pointer text-xs opacity-70">
                              View reasoning
                            </summary>
                            <pre className="mt-1 whitespace-pre-wrap text-xs opacity-70">
                              {part.text}
                            </pre>
                          </details>
                        )
                      default:
                        return null
                    }
                  })}
                </div>
                {message.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            disabled={isLoading || availableModels.length === 0}
          />
          {isLoading ? (
            <Button type="button" onClick={stop} variant="destructive" size="icon">
              <X className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || availableModels.length === 0}
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
        {availableModels.length === 0 && (
          <p className="text-destructive mt-2 text-xs">
            Please configure at least one AI provider API key in your .env.local file
          </p>
        )}
      </form>
    </div>
  )
}