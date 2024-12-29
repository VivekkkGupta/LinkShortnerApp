import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BeatLoader } from "react-spinners";

const Login = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <Input type="email" className="" placeHolder="Enter email" />
            </CardContent>
            <CardContent>
                <Input type="password" className="" placeHolder="Enter Password" />
            </CardContent>
            <CardFooter>
                <Button className="w-full">
                    {false ? <BeatLoader /> : "Login"}
                </Button>
            </CardFooter>
        </Card>

    )
}

export default Login