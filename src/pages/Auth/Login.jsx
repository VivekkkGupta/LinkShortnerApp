import React, { useEffect, useState } from "react";
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
import { BeatLoader } from "react-spinners";
import Error from "../../components/error";
import * as Yup from "yup";
import useFetch from '../../hooks/use-fetch';
import { login } from '../../db/apiAuth'; // Ensure login is imported
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "../../context/context";

const Login = () => {

    const navigate = useNavigate();
    const [searcParams] = useSearchParams();
    const longLink = searcParams.get("createNew")

    // Input UseState
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    //Input Handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    //Errors UseState
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");

    //Our Custom Hook
    const { error, loading, fn: fnLogin, data } = useFetch(login, formData);

    const { fetchUser } = UrlState();

    useEffect(() => {
        if (error === null && data) {
            // console.log("Login successful:", data); // Add logging
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
            fetchUser();
        }
        if (error) {
            console.error("Login error:", error); // Add logging
            setGeneralError(error.message); // Set general error
        }
    }, [data, error]);

    //Handle Login Button
    const handleLogin = async () => {
        setErrors({});
        setGeneralError("");
        try {
            const schema = Yup.object().shape({
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

            // Log form data before API call
            // console.log("Form data:", formData);

            //api call
            await fnLogin();

        } catch (e) {

            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        }
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardDescription className="ml-6 mb-4">
                {generalError && <Error message={generalError} />}
            </CardDescription>
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
                    onClick={handleLogin}
                >
                    {loading ? <BeatLoader /> : "Login"}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default Login;
