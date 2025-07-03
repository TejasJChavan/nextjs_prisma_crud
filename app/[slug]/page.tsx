import { deletePost } from "@/actions/actions";
import { prisma } from "@/lib/db";
import Link from "next/link";
import React from "react";

// Define the type for your params, now as a Promise
interface PageProps {
    params: { slug: string };
}

export default async function PagePost({
    params,
}: PageProps) {
    const { slug } = params;

    const post = await prisma.post.findUnique({
        where: {
            slug: slug,
        },
    });

    if (!post) return <div>Post Not Found</div>;

    return (
        <div className="flex flex-col h-screen pt-24 place-items-center">
            <div className="p-10 text-3xl">{post.title}</div>
            <div className="border-y border-black/10 py-10 w-1/2 flex justify-center">
                {post.content}
            </div>
            <div className="flex p-5 justify-center items-center gap-10">
                <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <button
                        type="submit"
                        className="p-3 bg-red-300 rounded-3xl"
                    >
                        Delete
                    </button>
                </form>
                <Link
                    href={`/${post.slug}/update`}
                    className="p-3 bg-blue-200 rounded-3xl"
                >
                    Update
                </Link>
            </div>
        </div>
    );
}