"use client";
import { useState, useActionState } from "react";
//import createPost from "@/lib/actions/createPost";
import { createPost } from "@/lib/actions/createPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import rehypeHighlight from "rehype-highlight";

export default function CreatePostPage() {
  const [content, setContent] = useState(""); // 記事の文章
  const [contentLength, setContentLength] = useState(0); // 文字数
  const [preview, setPreview] = useState(false); // プレビュー

  const [state, formAction] = useActionState(createPost, {
    success: false,
    errors: {},
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">新規記事投稿(Markdown対応)</h1>
      <form action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="title">タイトル</Label>
          <Input
            id="title"
            type="text"
            name="title"
            placeholder="タイトルを入力してください"
          />
          {state.errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.title.join(",")}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="topImage">トップ画像</Label>
          <Input type="file" id="topImage" accept="image/*" name="topImage" />
          {state.errors.topImage && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.topImage.join(",")}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="content">内容(Markdown)</Label>
          <TextareaAutosize
            id="content"
            value={content}
            name="content"
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-2"
            minRows={8}
            placeholder="Markdown形式で入力してください"
          />
          {state.errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.content.join(",")}
            </p>
          )}
        </div>
        {/* <div className="text-right text-sm text-gray-500 mt-1">
          文字数: {contentLength}
        </div> */}
        <div>
          <Button
            type="button"
            className="bg-gray-500 text-white"
            onClick={() => setPreview(!preview)}
          >
            {preview ? "プレビューを閉じる" : "プレビューを表示する"}
          </Button>
        </div>
        {preview && (
          <div className="border p-4 bg-gray-50 prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              skipHtml={false} // HTMLスキップを無効化
              unwrapDisallowed={true} // Markdownの改行を解釈
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
        <Button
          type="submit"
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          投稿する
        </Button>
      </form>
    </div>
  );
}
