import { getOwnPost } from "@/lib/ownPost";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { notFound } from "next/navigation";
import Image from "next/image";
import { auth } from "@/auth";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
// import rehypeHighlight from "rehype-highlight";

type Params = { params: Promise<{ id: string }> }; // urlの情報はparamsで渡ってくる

export default async function showPage({ params }: Params) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session?.user?.email || !userId) {
    throw new Error("不正なリクエストです");
  }

  const { id } = await params; // paramsはPromise型で定義しつつawaitで非同期処理
  const post = await getOwnPost(userId, id); // DBからid指定して情報取得
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-xl mx-auto bg-gray-900 border-gray-900">
        {post.topImage && (
          <div className="relative w-full h-64 lg:h-96">
            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes="100vw"
              className="rounded-t-md object-cover"
              priority
            />
          </div>
        )}
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-white">投稿者: {post.author.name}</p>
            <time className="text-sm text-white">
              {format(new Date(post.createdAt), "yyyy年MM月dd日", {
                locale: ja,
              })}
            </time>
          </div>
          <CardTitle className="text-3xl font-bold text-white">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-white">
          {post.content}
          {/* <div className=" prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              skipHtml={false} // HTMLスキップを無効化
              unwrapDisallowed={true} // Markdownの改行を解釈
            >
              {post.content}
            </ReactMarkdown>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
