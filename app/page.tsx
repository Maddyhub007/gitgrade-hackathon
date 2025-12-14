"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Github, TrendingUp, FileCode, Users } from "lucide-react"

export default function HomePage() {
  const [repoUrl, setRepoUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) return

    setIsAnalyzing(true)
    // Extract owner and repo from URL
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
    if (match) {
      const owner = match[1]
      const repo = match[2].replace(".git", "")
      window.location.href = `/analyze?owner=${owner}&repo=${repo}`
    } else {
      setIsAnalyzing(false)
      alert("Please enter a valid GitHub repository URL")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <Github className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">AI-Powered Repository Analysis</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white text-balance">
            Grade Your GitHub
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Repository</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto text-balance">
            Get intelligent insights, detailed scoring, and personalized roadmaps to improve your projects
          </p>
        </div>

        {/* Search Bar */}
        <Card className="max-w-3xl mx-auto p-2 bg-slate-900/50 border-slate-800 backdrop-blur">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter GitHub repository URL (e.g., https://github.com/user/repo)"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              className="flex-1 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 h-12 text-base"
              disabled={isAnalyzing}
            />
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze"}
            </Button>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20">
          <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur hover:border-blue-500/50 transition-colors">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Intelligent Scoring</h3>
            <p className="text-slate-400">
              Comprehensive analysis across code quality, documentation, activity, and community engagement
            </p>
          </Card>

          <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur hover:border-cyan-500/50 transition-colors">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
              <FileCode className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Detailed Insights</h3>
            <p className="text-slate-400">
              Deep dive into repository structure, commit patterns, and code complexity metrics
            </p>
          </Card>

          <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur hover:border-purple-500/50 transition-colors">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Personalized Roadmap</h3>
            <p className="text-slate-400">
              Get actionable recommendations tailored to your repository's unique needs and goals
            </p>
          </Card>
        </div>

        {/* Example Repos */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <p className="text-slate-400 mb-4">Try with popular repositories:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["facebook/react", "vercel/next.js", "microsoft/vscode"].map((repo) => (
              <Button
                key={repo}
                variant="outline"
                size="sm"
                onClick={() => setRepoUrl(`https://github.com/${repo}`)}
                className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                {repo}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
