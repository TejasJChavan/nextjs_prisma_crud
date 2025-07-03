import { prisma } from "@/lib/db";
import UpdateFormClient from "./UpdateFormClient";

export default async function Page({ params }: { params: { slug: string } }) {
    const post = await prisma.post.findUnique({
        where: { slug: params.slug },
    });

    if (!post) return <div>Post not found</div>;

    return <UpdateFormClient slug={post.slug} />;
}
