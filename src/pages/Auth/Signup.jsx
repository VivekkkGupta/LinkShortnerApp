import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signup } from '../../db/apiAuth';
import useFetch from '../../hooks/use-fetch';
import Error from '../../components/error';
import * as Yup from 'yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '../../context/context';
import { BeatLoader } from 'react-spinners';

function Signup() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Our Custom Hook
    const { error, loading, fn: fnSignup, data } = useFetch(signup, formData);

    const { fetchUser } = UrlState();

    useEffect(() => {
        if (error === null && data) {
            // console.log("Signup successful:", data);
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
            fetchUser();
        }
        if (error) {
            console.error("Signup error:", error);
            setGeneralError(error.message);
        }
    }, [data, error]);

    const handleSignUp = async () => {
        setErrors({});
        setGeneralError("");
        try {
            const schema = Yup.object().shape({
                name: Yup
                    .string()
                    .required("Name is required"),
                email: Yup
                    .string()
                    .email("Invalid email")
                    .required("Email is required"),
                password: Yup
                    .string()
                    .required("Password is required")
                    .min(6, "Password must be of minimum 6 characters"),
            });
            await schema.validate(formData, { abortEarly: false });
            // api call
            await fnSignup();
        } catch (error) {
            const newErrors = {};
            error?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Signup</CardTitle>
            </CardHeader>
            <CardDescription className="ml-6 mb-4">
                {generalError && <Error message={generalError} />}
            </CardDescription>
            <CardContent>
                <Input
                    type="text"
                    className=""
                    placeholder="Enter name"
                    name="name"
                    onChange={handleInputChange}
                />
                {errors.name && <Error message={errors.name} />}
            </CardContent>
            <CardContent>
                <Input
                    type="email"
                    className=""
                    placeholder="Enter email"
                    name="email"
                    onChange={handleInputChange}
                />
                {errors.email && <Error message={errors.email} />}
            </CardContent>
            <CardContent>
                <Input
                    type="password"
                    className=""
                    placeholder="Enter Password"
                    name="password"
                    onChange={handleInputChange}
                />
                {errors.password && <Error message={errors.password} />}
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full"
                    onClick={handleSignUp}
                >
                    {loading ? <BeatLoader /> : "Create Account"}
                </Button>
            </CardFooter>
        </Card>
    );
}

export default Signup;