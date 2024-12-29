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

function Signup() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Signup</CardTitle>
            </CardHeader>
            <CardContent>
                <Input type="email" className="" placeHolder="Enter email" />
            </CardContent>
            <CardContent>
                <Input type="password" className="" placeHolder="Enter Password" />
            </CardContent>
            <CardContent>
                <Input type="password" className="" placeHolder="Confirm Password" />
            </CardContent>
            <CardFooter>
                <Button className="w-full">Signup</Button>
            </CardFooter>
        </Card>
    )
}

export default Signup