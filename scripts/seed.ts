const { PrismaClient } = require('@prisma/client')

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: 'Gente Famosa' },
                { name: 'Peliculas y Televisión' },
                { name: 'Música' },
                { name: 'Videojuegos' },
                { name: 'Ciencia y Tecnología' },
                { name: 'Deportes' },
                { name: 'Cientificos' }
            ]
        })
    } catch (error) {
        console.log('Error seeding default categories ', error);
    } finally {
        await db.$disconnect();
    }
}

main();