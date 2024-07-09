// register.tsx
// Composant qui affiche le formulaire d'inscription
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { registerUser } from "@/app/lib/actions/register";
import { Button } from "@/app/ui/button";
import '../globals.css';

export default function Register() {
    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data:any) => {
        try {
            await registerUser(data);
            // Handle successful registration, e.g., redirect to login page
        } catch (error) {
            // Handle registration errors
            console.error(error);
        }
    };

    return (
        <div className="bg-gray-200 h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Inscription</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Nom d&apos;utilisateur
                        </label>
                        <Controller
                            name="username"
                            control={control}
                            rules={{ required: "Un nom d'utilisateur est requis." }}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    id="username"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    placeholder="Entrez votre nom d&apos;utilisateur"
                                    {...field}
                                />
                            )}
                        />
                        {
                            errors.username &&
                            // @ts-ignore
                            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                        }
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Courriel
                        </label>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Entrez un courriel valide.",
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message: "Entrez un courriel valide",
                                }
                            }}
                            render={({ field }) => (
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    placeholder="Entrez votre courriel"
                                    {...field}
                                />
                            )}
                        />
                        {
                            errors.email &&
                            // @ts-ignore
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        }
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Mot de passe
                        </label>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: "Un mot de passe est requis." }}
                            render={({ field }) => (
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    placeholder="Entrez votre mot de passe"
                                    {...field}
                                />
                            )}
                        />
                        {
                            errors.password &&
                            // @ts-ignore
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        }
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="passwordConfirmation"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Confirmer le mot de passe
                        </label>
                        <Controller
                            name="passwordConfirmation"
                            control={control}
                            rules={{
                                required: "Un mot de passe de confirmation est requis.",
                                validate: (value) => value === control._formValues.password || "Passwords do not match"
                            }}
                            render={({ field }) => (
                                <input
                                    type="password"
                                    id="passwordConfirmation"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    placeholder="Confirmez votre mot de passe"
                                    {...field}
                                />
                            )}
                        />
                        {
                            errors.passwordConfirmation &&
                            // @ts-ignore
                            <p className="text-red-500 text-sm mt-1">{errors.passwordConfirmation.message}</p>
                        }
                    </div>
                    <RegisterButton isSubmitting={isSubmitting} />
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">Vous avez déjà un compte ? <Link href="/login" className="text-blue-500 hover:text-blue-600">Connexion</Link></p>
                </div>
            </div>
        </div>
    );
}

function RegisterButton(props:{isSubmitting: boolean} ) {
    return (
        <Button className="mt-4 w-full" aria-disabled={props.isSubmitting}>
            {props.isSubmitting ? 'Inscription...' : "S'inscrire"}
        </Button>
    );
}
