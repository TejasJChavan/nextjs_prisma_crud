import { deletePost } from "@/actions/actions";
import { prisma } from "@/lib/db";
import React from "react";

export default async function PagePost({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params; // Await the params to resolve the slug

    const post = await prisma.post.findUnique({
        where: {
            slug: slug,
        },
    });

    if (!post) return <div>Post Not Found</div>;

    return (
        <div className="flex flex-col h-screen pt-24 place-items-center">
            <div className="p-10">{post.title}</div>
            <div className="border-y border-black/10 py-10 w-1/2 flex justify-center">
                {post.content}
            </div>
            <form action={deletePost}>
                <input type="hidden" name="id" value={post.id} />
                <button
                    type="submit"
                    className="p-3 bg-gray-300 rounded-3xl mt-10"
                >
                    Delete
                </button>
            </form>
        </div>
    );
}
