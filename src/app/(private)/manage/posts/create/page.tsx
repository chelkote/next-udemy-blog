"use client";
import { useState, useActionState } from "react";
//import createPost from "@/lib/actions/createPost";
import createPost from "@/lib/actions/createPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CreatePostPage() {
  const [content, setContent] = useState(""); // 記事の文章
  const [contentLength, setContentLength] = useState(0); // 文字数

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };

  const [preview, setPreview] = useState(false); // プレビュー
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">新規記事投稿(Markdown対応)</h1>
      <form className="space-y-4">
        <div>
          <Label htmlFor="title">タイトル</Label>
          <Input
            id="title"
            type="text"
            name="title"
            placeholder="タイトルを入力してください"
          />
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
        </div>
        {/* <div className="text-right text-sm text-gray-500 mt-1">
          文字数: {contentLength}
        </div> */}
      </form>
    </div>
  );
}
