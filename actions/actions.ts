"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
    await prisma.post.create({
        data: {
            title: formData.get("title") as string,
            slug:
                formData
                    .get("title")
                    ?.toString()
                    .toLowerCase()
                    .replace(/\s+/g, "-") || "",
            content: formData.get("content") as string,
        },
    });

    revalidatePath("/");
}

export async function deletePost(formData: FormData) {
    await prisma.post.delete({
        where: {
            id: formData.get("id") as string,
        },
    });

    revalidatePath("/");
    redirect("/");
}
