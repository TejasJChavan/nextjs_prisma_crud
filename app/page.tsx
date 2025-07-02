import { createPost } from "@/actions/actions";
import { prisma } from "@/lib/db";
import Link from "next/link";
import React from "react";

const page = async () => {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            title: true,
            slug: true,
        },
    });
    const count = await prisma.post.count();

    return (
        <>
            <div className="flex flex-col h-screen pt-24 place-items-center">
                <div className="p-10">All Posts ({count})</div>
                <div className="grid gap-3 grid-cols-3 border-y border-black/10 py-10 w-1/2">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-sky-50 flex justify-center"
                        >
                            <Link href={`/${post.slug}`}>{post.title}</Link>
                        </div>
                    ))}
                </div>
                <form
                    className="flex flex-col gap-4 w-1/2 mt-10"
                    action={createPost}
                >
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="border p-2 rounded"
                        required
                    />
                    <textarea
                        name="content"
                        placeholder="Content"
                        className="border p-2 rounded"
                        rows={4}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default page;
