"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function AITestPage() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const testCompletion = async () => {
    setLoading(true)
    setError("")
    setResponse("")
    
    try {
      const res = await fetch("/api/completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: prompt || "Hello, how are you?",
          model: "gpt-4o-mini"
        })
      })
      
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setResponse(data.text)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  const testGenerateObject = async () => {
    setLoading(true)
    setError("")
    setResponse("")
    
    try {
      const res = await fetch("/api/generate-object", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: prompt || "Generate a person named John Doe who is 30 years old",
          model: "gpt-4o-mini",
          schemaType: "person"
        })
      })
      
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setResponse(JSON.stringify(data.object, null, 2))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-8">AI SDK Test Page</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Test Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your test prompt..."
            className="w-full min-h-[100px] p-3 border rounded-lg"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={testCompletion} disabled={loading}>
            Test Completion API
          </Button>
          <Button onClick={testGenerateObject} disabled={loading}>
            Test Generate Object API
          </Button>
        </div>

        {loading && (
          <div className="p-4 bg-muted rounded-lg">
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
            <p className="font-medium">Error:</p>
            <pre className="mt-2 text-sm">{error}</pre>
          </div>
        )}

        {response && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-medium mb-2">Response:</p>
            <pre className="whitespace-pre-wrap text-sm">{response}</pre>
          </div>
        )}

        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h2 className="font-medium mb-2">Configuration Status</h2>
          <p className="text-sm text-muted-foreground">
            This page tests the AI SDK endpoints directly without requiring Convex.
            Make sure you have at least one API key configured in your .env.local file:
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>• OpenAI: OPENAI_API_KEY</li>
            <li>• Anthropic: ANTHROPIC_API_KEY</li>
            <li>• Google: GOOGLE_GENERATIVE_AI_API_KEY</li>
          </ul>
        </div>
      </div>
    </div>
  )
}