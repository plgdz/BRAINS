// db/db.ts
// Ce fichier contient la configuration de la base de données.
// Auteur : Paul Agudze, Thomas Garneau

import {PrismaClient} from "@prisma/client";

const pool = new PrismaClient();

export default pool;


