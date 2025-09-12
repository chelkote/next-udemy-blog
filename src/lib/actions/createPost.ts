"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export default async function createPost(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("認証が必要です");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    throw new Error("タイトルと内容は必須です");
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        published: false, // デフォルトで非公開
      },
    });

    revalidatePath("/dashboard");
    return { success: true, postId: post.id };
  } catch (error) {
    console.error("記事作成エラー:", error);
    throw new Error("記事の作成に失敗しました");
  }
}
