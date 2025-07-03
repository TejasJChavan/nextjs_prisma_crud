"use client";

import { updatePost } from "@/actions/actions";
import { useActionState } from "react";

export default function UpdateFormClient({ slug }: { slug: string }) {
    const [state, formAction] = useActionState(updatePost, { error: "" });

    return (
        <div className="flex flex-col justify-center place-items-center h-screen gap-10">
            <div className="text-3xl">Update Post</div>
            <form action={formAction} className="flex flex-col gap-10 w-1/2">
                <input type="hidden" name="slug" value={slug} />
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="border p-2 rounded"
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    rows={4}
                    className="border p-2 rounded"
                />
                {state?.error && (
                    <div className="text-red-500">{state.error}</div>
                )}
                <button
                    type="submit"
                    className="bg-blue-400 text-white py-2 rounded hover:bg-blue-700"
                >
                    Update
                </button>
            </form>
        </div>
    );
}
