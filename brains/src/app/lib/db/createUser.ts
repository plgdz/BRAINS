// db/createUser.ts
// Ce fichier contient les fonctions qui permettent de créer un utilisateur dans la base de donnees.
// Auteur : Paul Agudze, Thomas Garneau

import pool from './db';
import bcrypt from 'bcryptjs';

async function getUser(email: string, username: string){
    const user = await pool.users.findMany({
        where: {
            OR: [
                {
                    courriel: email
                },
                {
                    pseudo: username
                }
            ]
        }
    });
    return user;
}

async function passwordValidation(password: string, passwordConfirmation: string){
    if(password.length < 8){
        return {status: "error", message: "Le mot de passe doit contenir au moins 8 caractères"};
    }
    if(password !== passwordConfirmation){
        return {status: "error", message: "Les mots de passe ne correspondent pas"};
    }

    const hash : string = await bcrypt.hash(password, 10);
    return {status: "success", hashedPassword : String(hash)};
}

async function createUser(email: string, username: string, hashedPassword: string){

    const user = await pool.users.create({
        data: {
            pseudo: username,
            courriel: email,
            passwords: {
                create: {
                    password: hashedPassword,
                },
            },
        }
    });
    return user;
}

export async function register(email : string, username : string,password : string, passwordConfirmation: string){
    const user = await getUser(email, username);
    if(user.length > 0){
        return {status: "error", message: "Email ou nom d'utilisateur déjà utilisé"};
    }

    const hashedPassword = await passwordValidation(password, passwordConfirmation);
    if(hashedPassword.status === "error"){
        return hashedPassword;
    }

    await createUser(email, username, String(hashedPassword.hashedPassword));
    return {status: "success", message: "Utilisateur créé avec succès"};
}