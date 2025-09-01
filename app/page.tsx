"use client"

import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react"
import Link from "next/link"
import { api } from "../convex/_generated/api"

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 flex flex-row items-center justify-between border-slate-200 border-b-2 bg-background p-4 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <span className="font-semibold">AI Chat SaaS</span>
          <nav className="flex gap-4">
            <Link href="/ai" className="text-sm text-muted-foreground hover:text-foreground">
              AI Assistant
            </Link>
          </nav>
        </div>
        <UserButton />
      </header>
      <main className="flex flex-col gap-8 p-8">
        <h1 className="text-center font-bold text-4xl">AI-Powered Chat Assistant</h1>
        <p className="text-center text-lg text-muted-foreground">
          Multi-provider AI chat with built-in tools for weather, calculations, and more
        </p>
        <Authenticated>
          <Content />
        </Authenticated>
        <Unauthenticated>
          <SignInForm />
        </Unauthenticated>
      </main>
    </>
  )
}

function SignInForm() {
  return (
    <div className="mx-auto flex w-96 flex-col gap-8">
      <div className="rounded-lg border bg-card p-6 text-center">
        <h2 className="mb-4 text-2xl font-semibold">Get Started with AI Chat</h2>
        <p className="mb-6 text-muted-foreground">
          Sign in to access powerful AI models from OpenAI, Anthropic, and Google
        </p>
        <div className="space-y-3">
          <SignInButton mode="modal">
            <button className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="w-full rounded-md border bg-background px-4 py-2 hover:bg-accent">
              Create Account
            </button>
          </SignUpButton>
        </div>
      </div>
      <div className="text-center">
        <Link href="/ai" className="text-sm text-muted-foreground hover:text-foreground">
          Preview AI Chat Features →
        </Link>
      </div>
    </div>
  )
}

function Content() {
  const { viewer, numbers } =
    useQuery(api.myFunctions.listNumbers, {
      count: 10,
    }) ?? {}
  const addNumber = useMutation(api.myFunctions.addNumber)

  if (viewer === undefined || numbers === undefined) {
    return (
      <div className="mx-auto">
        <p>loading... (consider a loading skeleton)</p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-8">
      <p className="text-lg">Welcome {viewer ?? "Anonymous"}!</p>

      <div className="rounded-lg border bg-primary/5 p-6 text-center">
        <h2 className="mb-3 text-2xl font-semibold">Try the AI Chat Assistant</h2>
        <p className="mb-4 text-muted-foreground">
          Chat with multiple AI models, use built-in tools, and more
        </p>
        <Link
          href="/ai"
          className="inline-block rounded-md bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Launch AI Chat →
        </Link>
      </div>

      <div className="border-t pt-6">
        <p className="mb-4 text-sm text-muted-foreground">
          Demo: Click the button below to test real-time data persistence with Convex
        </p>
        <p>
          <button
            className="rounded-md bg-foreground px-4 py-2 text-background text-sm"
            onClick={() => {
              void addNumber({ value: Math.floor(Math.random() * 10) })
            }}
          >
            Add a random number
          </button>
        </p>
        <p>
          Numbers: {numbers?.length === 0 ? "Click the button!" : (numbers?.join(", ") ?? "...")}
        </p>
      </div>

      <div className="border-t pt-6">
        <p className="mb-4 text-sm text-muted-foreground">Developer Resources:</p>
        <div className="space-y-2 text-sm">
          <p>
            Edit{" "}
            <code className="rounded-md bg-slate-200 px-1 py-0.5 font-bold font-mono text-xs dark:bg-slate-800">
              convex/myFunctions.ts
            </code>{" "}
            to change your backend
          </p>
          <p>
            Edit{" "}
            <code className="rounded-md bg-slate-200 px-1 py-0.5 font-bold font-mono text-xs dark:bg-slate-800">
              app/page.tsx
            </code>{" "}
            to change your frontend
          </p>
          <p>
            See the{" "}
            <Link href="/server" className="underline hover:no-underline">
              /server route
            </Link>{" "}
            for an example of loading data in a server component
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="font-bold text-lg mb-4">Useful resources:</p>
        <div className="flex gap-2">
          <div className="flex w-1/2 flex-col gap-2">
            <ResourceCard
              title="Convex docs"
              description="Read comprehensive documentation for all Convex features."
              href="https://docs.convex.dev/home"
            />
            <ResourceCard
              title="Stack articles"
              description="Learn about best practices, use cases, and more."
              href="https://stack.convex.dev/"
            />
          </div>
          <div className="flex w-1/2 flex-col gap-2">
            <ResourceCard
              title="Templates"
              description="Browse our collection of templates to get started quickly."
              href="https://www.convex.dev/templates"
            />
            <ResourceCard
              title="Discord"
              description="Join our developer community to ask questions."
              href="https://www.convex.dev/community"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ResourceCard({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <div className="flex h-28 flex-col gap-2 overflow-auto rounded-md bg-slate-200 p-4 dark:bg-slate-800">
      <a href={href} className="text-sm underline hover:no-underline">
        {title}
      </a>
      <p className="text-xs">{description}</p>
    </div>
  )
}
