'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }

        if (!isLogin && password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        // Here you would typically handle the login or registration logic
        console.log(isLogin ? "Logging in..." : "Registering...", { email, password })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <Card className="w-[350px] bg-gray-800 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
                    <CardDescription className="text-center text-gray-400">
                        {isLogin ? "Login to your account" : "Create a new account"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                            <TabsTrigger value="login" onClick={() => setIsLogin(true)}>Login</TabsTrigger>
                            <TabsTrigger value="register" onClick={() => setIsLogin(false)}>Register</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-gray-700 border-gray-600"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-gray-700 border-gray-600"
                                    />
                                </div>
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                <Button type="submit" className="w-full">Login</Button>
                            </form>
                        </TabsContent>
                        <TabsContent value="register">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-gray-700 border-gray-600"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-gray-700 border-gray-600"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirm Password</Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="bg-gray-700 border-gray-600"
                                    />
                                </div>
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                <Button type="submit" className="w-full">Register</Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter className="text-center text-sm text-gray-400">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </CardFooter>
            </Card>
        </div>
    )
}