// login.tsx
// Composant qui affiche le formulaire de connexion
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, { useState } from "react";
import '../globals.css';
import {useFormState, useFormStatus} from "react-dom";
import {authenticate} from "@/app/lib/actions/authenticate";
import {Button} from "@/app/ui/button";


export default function LoginComponent() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined)

    return (

        <div className="bg-gray-200 h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-6 text-center">Connexion</h2>
                <form action={dispatch}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Courriel
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Entrez votre courriel"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Entrez votre mot de passe"
                        />
                    </div>
                    <LoginButton/>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">Vous n&apos;avez pas de compte ?</p>
                    <a href="/register" className="text-blue-500 hover:text-blue-600">Inscrivez-vous ici</a>
                </div>
            </div>
        </div>

    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button className="mt-4 w-full" aria-disabled={pending}>
            Connexion
        </Button>
    );
}