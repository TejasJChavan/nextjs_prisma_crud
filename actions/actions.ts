"use server";

import { prisma } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(
    prevState: { error: string },
    formData: FormData
): Promise<{ error: string } | never> {
    const slug =
        formData.get("title")?.toString().toLowerCase().replace(/\s+/g, "-") ||
        "";
    try {
        await prisma.post.create({
            data: {
                title: formData.get("title") as string,
                slug,
                content: formData.get("content") as string,
            },
        });

        revalidatePath("/");
    } catch (err: any) {
        return {
            error: "Title slug already taken, our bad. Please change title.",
        };
    }
    redirect(`/${slug}`);
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

export async function updatePost(
    prevState: { error: string },
    formData: FormData
): Promise<{ error: string }> {
    const content = formData.get("content")?.toString();
    const title = formData.get("title")?.toString();
    let slug = formData.get("slug")?.toString();

    if (!title && !content) {
        return { error: "At least one of title or content is required." };
    }

    const data: any = {};
    if (content) data.content = content;
    if (title) {
        data.title = title;
        data.slug = title.toLowerCase().replace(/\s+/g, "-") || "";
        slug = data.slug;
    }
    try {
        await prisma.post.update({
            where: {
                slug: formData.get("slug") as string,
            },
            data,
        });
        revalidatePath("/");
        revalidatePath(`/${slug}`);
    } catch (err: any) {
        console.log(err);
        return { error: err.message };
    }
    redirect(`/${slug}`);
}
