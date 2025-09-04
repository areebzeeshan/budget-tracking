"use client"

import { useState } from "react"
import { mockUser } from "../../lib/mock-data"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Alert, AlertDescription } from "../ui/alert"

export default function AuthForm({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [localError, setLocalError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError("")
    setIsLoading(true)

    if (!isLogin && password !== confirmPassword) {
      setLocalError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      if (email && password) {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        localStorage.setItem("demo-auth", "true")
        localStorage.setItem("demo-user", JSON.stringify(mockUser))
        onLogin()
      } else {
        throw new Error("Please enter email and password")
      }
    } catch (error) {
      setLocalError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = () => {
    localStorage.setItem("demo-auth", "true")
    localStorage.setItem("demo-user", JSON.stringify(mockUser))
    onLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Budget ERP</CardTitle>
          <CardDescription>{isLogin ? "Sign in to your account" : "Create a new account"}</CardDescription>
          <div className="mt-2 p-2 bg-blue-500/10 border border-blue-500/20 rounded-md">
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Demo Mode: Enter any email/password or use Quick Demo
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {localError && (
              <Alert variant="destructive">
                <AlertDescription>{localError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@example.com"
                required
                className="bg-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password123"
                required
                className="bg-input"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-input"
                />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
            </Button>

            <Button type="button" variant="outline" className="w-full bg-transparent" onClick={handleDemoLogin}>
              Quick Demo Access
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
