"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function SearchBox() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const router = useRouter();
  // デバウンス (高頻度に呼び出されるのを防ぐ 500ms後に実行
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      router.push(`/?search=${debouncedSearch.trim()}`);
    } else {
      router.push("/");
    }
  }, [debouncedSearch, router]);

  return (
    <Input
      placeholder="Search for articles..."
      className="w-[200px] lg:w-[300px] border-gray-600 text-white  placeholder:text-white focus-visible:border-black focus-visible:ring-black/50"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
