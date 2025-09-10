"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Alert, AlertDescription } from "../ui/alert"
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@/lib/firebase"
import { doc, setDoc, collection, addDoc } from "firebase/firestore"
import { updateProfile } from "firebase/auth"
import { db } from "@/lib/firebase"

// Helper function to create a session
async function createSession(idToken) {
  const response = await fetch('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idToken }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to create session')
  }
}

// Helper function to get user-friendly auth error messages
function getAuthErrorMessage(code) {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.'
    case 'auth/user-not-found':
      return 'No account found with this email.'
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.'
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.'
    default:
      return null
  }
}

export default function AuthForm() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [localError, setLocalError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')
    setIsLoading(true)

    try {
      if (!isLogin) {
        // Sign up logic
        if (password !== confirmPassword) {
          throw new Error("Passwords don't match")
        }

        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Create user document in Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: name || user.email.split('@')[0],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })

        // Create default categories for the user
        const defaultCategories = [
          { name: 'Food', type: 'expense', color: '#FF6B6B' },
          { name: 'Transportation', type: 'expense', color: '#4ECDC4' },
          { name: 'Housing', type: 'expense', color: '#45B7D1' },
          { name: 'Salary', type: 'income', color: '#96CEB4' },
          { name: 'Other', type: 'both', color: '#FFEEAD' }
        ]

        const categoriesRef = collection(db, `users/${user.uid}/categories`)
        for (const category of defaultCategories) {
          await addDoc(categoriesRef, {
            ...category,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
        }

        // Update user profile with display name if provided
        if (name) {
          await updateProfile(user, { displayName: name })
        }

        // Get ID token and create session
        const idToken = await user.getIdToken()
        await createSession(idToken)
        
        // Redirect to home page after successful signup
        router.push('/')
      } else {
        // Sign in logic
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const idToken = await userCredential.user.getIdToken()
        await createSession(idToken)
        
        // Redirect to home page after successful sign in
        router.push('/')
      }
    } catch (error) {
      console.error('Auth error:', error)
      setLocalError(getAuthErrorMessage(error.code) || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div>
            <CardTitle className="text-2xl font-bold">Budget ERP</CardTitle>
            <CardDescription>
              {isLogin ? "Sign in to your account" : "Create a new account"}
            </CardDescription>
          </div>
          
          <div className="mt-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
            <p className="text-sm text-blue-600 dark:text-blue-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                className="ml-1 font-medium hover:underline"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setLocalError('');
                }}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
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

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required={!isLogin}
                  className="bg-input"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
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
                placeholder={isLogin ? "••••••••" : "••••••••"}
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

            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (isLogin ? "Signing in..." : "Creating account...") : isLogin ? "Sign In" : "Sign Up"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
