import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD } = process.env;

// create a SQL connection to the neon database using env variables
const sql = neon(`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`);

export default sql;

// this sql function we export is uesed to tagged template literals
// it is a way to write sql queries in a more readable and type-safe way
// this is a feature of neon that allows us to use the sql keyword in our code
// it is a way to write sql queries in a more readable and type-safe way

// example: 
// const result = await sql`SELECT * FROM users WHERE id = ${id}`;
// this is equivalent to:
// const result = await sql.query(sql`SELECT * FROM users WHERE id = ${id}`);


export async function initializeDatabase() {
  try {
    // create a table for users
    await sql`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20), 
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    
    // create a table for restaurants
    await sql`CREATE TABLE IF NOT EXISTS restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(255) NOT NULL,
    cover_image VARCHAR(255) NOT NULL,
    rating DECIMAL(2,1) NOT NULL,
    delivery_time VARCHAR(50) NOT NULL,
    delivery_fee VARCHAR(50) NOT NULL,
    minimum_order VARCHAR(50) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    
    // create table for tags
    await sql`CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;     

    // create table for restaurant_tags
    await sql`CREATE TABLE IF NOT EXISTS restaurant_tags (
    restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (restaurant_id, tag_id),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    // create order table
    await sql`CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    restaurant_id INTEGER REFERENCES restaurants(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}








