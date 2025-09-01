"use client"

import { type Preloaded, useMutation, usePreloadedQuery } from "convex/react"
import { api } from "../../convex/_generated/api"

export default function Home({
  preloaded,
}: {
  preloaded: Preloaded<typeof api.myFunctions.listNumbers>
}) {
  const data = usePreloadedQuery(preloaded)
  const addNumber = useMutation(api.myFunctions.addNumber)
  return (
    <>
      <div className="flex flex-col gap-4 rounded-md bg-slate-200 p-4 dark:bg-slate-800">
        <h2 className="font-bold text-xl">Reactive client-loaded data</h2>
        <code>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </code>
      </div>
      <button
        className="mx-auto rounded-md bg-foreground px-4 py-2 text-background"
        onClick={() => {
          void addNumber({ value: Math.floor(Math.random() * 10) })
        }}
      >
        Add a random number
      </button>
    </>
  )
}
