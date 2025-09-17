"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
//import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postSchema } from "@/validations/post";
import { saveImage } from "@/utils/image";

// ActionStateの型定義
type ActionState = { success: boolean; errors: Record<string, string[]> };

export async function createPost(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // フォームの情報を取得
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const topImageInput = formData.get("topImage");
  const topImage = topImageInput instanceof File ? topImageInput : null;

  // バリデーション
  const validationResult = postSchema.safeParse({ title, content, topImage });
  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // 画像保存
  const imageUrl = topImage ? await saveImage(topImage) : null;
  if (topImage && !imageUrl) {
    return {
      success: false,
      errors: { topImage: ["画像の保存に失敗しました"] },
    };
  }

  //DB保存
  const session = await auth();
  const userId = session?.user?.id;

  if (!session?.user?.email || !userId) {
    throw new Error("不正なリクエストです");
  }

  await prisma.post.create({
    data: {
      title,
      content,
      authorId: userId,
      published: true,
      topImage: imageUrl,
    },
  });

  redirect("/dashboard");

  // const session = await auth();

  // if (!session?.user?.id) {
  //   throw new Error("認証が必要です");
  // }

  // const title = formData.get("title") as string;
  // const content = formData.get("content") as string;

  // if (!title || !content) {
  //   throw new Error("タイトルと内容は必須です");
  // }

  // try {
  //   const post = await prisma.post.create({
  //     data: {
  //       title,
  //       content,
  //       authorId: session.user.id,
  //       published: false, // デフォルトで非公開
  //     },
  //   });

  //   revalidatePath("/dashboard");
  //   return { success: true, postId: post.id };
  // } catch (error) {
  //   console.error("記事作成エラー:", error);
  //   throw new Error("記事の作成に失敗しました");
  // }
}
