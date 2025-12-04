import postgres from 'postgres';
import 'dotenv/config';

async function main() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error('DATABASE_URL not found in .env');
        process.exit(1);
    }

    const sql = postgres(connectionString);

    console.log('Dropping tables...');
    await sql`DROP TABLE IF EXISTS profiles CASCADE`;
    await sql`DROP TABLE IF EXISTS users CASCADE`;
    console.log('Tables dropped.');
    
    await sql.end();
    process.exit(0);
}

main().catch(console.error);
