import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let sql, db;

const DB_PATH = process.env.DATABASE_PATH as string

interface NewUser {
    email:string | null |undefined
    name:string | null |undefined
    image:string | null |undefined
}

// Create users table
export async function createUserTable() {
    try {
        const db = await open({
            filename: DB_PATH,
            driver: sqlite3.Database
        });

        const sql = `
            CREATE TABLE IF NOT EXISTS users(
                uid INTEGER PRIMARY KEY, 
                email TEXT UNIQUE, 
                name VARCHAR(64),
                image TEXT
            )
        `;
        await db.run(sql);  // Awaiting db.run

        await db.close();
    } catch (error) {
        console.error('Error creating user table:', error);
        throw error;
    }
}

// Insert a new user
export async function InsertUser({email,name,image}:NewUser) {
    try {
        const db = await open({
            filename: DB_PATH,
            driver: sqlite3.Database
        });

        const sql = "INSERT INTO users (email, name, image) VALUES (?,?,?)";
        await db.run(sql, [email, name, image]);  // Awaiting db.run

        await db.close();
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
}


// Search for a user by email
export async function FindUserByEmail(email: string | null | undefined): Promise<any> {
    if (!email) {
        throw new Error("Email is required");
    }

    try {
        const db = await open({
            filename: DB_PATH,
            driver: sqlite3.Database
        });

        const sql = "SELECT * FROM users WHERE email = ?";
        const rows = await db.all(sql, [email]);

        await db.close();
        return rows;
    } catch (error) {
        console.error(error);
        throw error;  // Propagate the error so it can be caught by the caller
    }
}


