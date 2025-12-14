"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Github, Loader2 } from "lucide-react"

function AnalyzeContent() {
  const searchParams = useSearchParams()
  const owner = searchParams.get("owner")
  const repo = searchParams.get("repo")
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("Initializing analysis...")

  useEffect(() => {
    if (!owner || !repo) return

    const steps = [
      { progress: 15, status: "Fetching repository data...", delay: 500 },
      { progress: 30, status: "Analyzing code structure...", delay: 800 },
      { progress: 50, status: "Evaluating documentation quality...", delay: 700 },
      { progress: 65, status: "Assessing commit patterns...", delay: 600 },
      { progress: 80, status: "Calculating community metrics...", delay: 700 },
      { progress: 95, status: "Generating insights and roadmap...", delay: 800 },
      { progress: 100, status: "Complete!", delay: 300 },
    ]

    let currentStep = 0
    const runSteps = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep]
        setTimeout(() => {
          setProgress(step.progress)
          setStatus(step.status)
          currentStep++
          if (currentStep === steps.length) {
            setTimeout(() => {
              window.location.href = `/dashboard?owner=${owner}&repo=${repo}`
            }, 500)
          } else {
            runSteps()
          }
        }, step.delay)
      }
    }

    runSteps()
  }, [owner, repo])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 bg-slate-900/50 border-slate-800 backdrop-blur">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Analyzing Repository</h2>
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <Github className="w-4 h-4" />
              <span className="text-sm">
                {owner}/{repo}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-slate-400">{status}</p>
          </div>

          <div className="pt-4 text-xs text-slate-500">This may take a few moments depending on repository size</div>
        </div>
      </Card>
    </div>
  )
}

export default function AnalyzePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnalyzeContent />
    </Suspense>
  )
}
