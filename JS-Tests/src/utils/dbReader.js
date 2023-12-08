import { Database } from 'sqlite3';
import { open } from 'sqlite';

async function readSqlite(source) {
    const db = await open({
        filename: source,
        driver: Database
    });

    try {
        const row = await db.get('SELECT username, password FROM LoginInfo WHERE username = "Admin"');
        return row;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    } finally {
        await db.close();
    }
}

export default readSqlite;