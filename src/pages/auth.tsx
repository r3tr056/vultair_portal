import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthProvider"
import { FormEvent, useState } from "react"


export default function LoginPage() {

    const { login } = useAuth();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await login({ username, password });
        } catch (error) {
            console.error("Login failed: ", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-[350px] bg-white">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center text-gray-800">Login</CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Enter your email and password to login
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" type="text" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} value={username} autoComplete="username" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password" >Password</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" />
                            <label
                                htmlFor="remember"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remember me
                            </label>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col">
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white" type="submit">Login</Button>
                        <p className="mt-2 text-center text-sm text-gray-800">
                            Don't have an account?{" "}
                            <a href="#" className="text-green-500 hover:underline">
                                Sign up
                            </a>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

