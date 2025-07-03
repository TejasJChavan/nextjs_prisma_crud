// app/page.tsx (server component)
import { prisma } from "@/lib/db";
import ClientPostPage from "./ClientPostPage";

export default async function Page() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        select: { id: true, title: true, slug: true },
    });
    const count = await prisma.post.count();

    return <ClientPostPage posts={posts} count={count} />;
}
