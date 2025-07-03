// app/ClientPostPage.tsx
"use client";

import { createPost } from "@/actions/actions";
import Link from "next/link";
import { useActionState } from "react";
import React from "react";

type Post = {
    id: string;
    title: string;
    slug: string;
};

export default function ClientPostPage({
    posts,
    count,
}: {
    posts: Post[];
    count: number;
}) {
    const [state, formAction] = useActionState(createPost, { error: "" });

    return (
        <div className="flex flex-col h-screen pt-24 place-items-center">
            <div className="p-10 text-3xl">All Posts ({count})</div>
            <div className="grid gap-3 grid-cols-3 border-y border-black/10 py-10 w-1/2">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-sky-50 flex justify-center p-3 rounded"
                    >
                        <Link href={`/${post.slug}`}>{post.title}</Link>
                    </div>
                ))}
            </div>
            <div className="p-10">Add Post</div>
            <form className="flex flex-col gap-4 w-1/2 pb-10" action={formAction}>
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
                {state?.error && (
                    <div className="text-red-500">{state.error}</div>
                )}
                <button
                    type="submit"
                    className="bg-blue-400 text-white py-2 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
