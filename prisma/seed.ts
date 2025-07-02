import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const initialPosts : Prisma.postCreateInput[] = [
    {
        title: 'First Post',
        slug: 'first-post',
        content: 'Wow first post'
    }
]

async function main() {
    
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
