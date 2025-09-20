import { signOut } from "@/auth"; // ログアウト処理
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth"; // Session 型をインポート
import { handleLogout } from "@/actions/auth";

export default function Setting({ session }: { session: Session }) {
  const handleLogout = async () => {
    "use server";
    await signOut({ redirectTo: "/" }); // CSRF対応済み
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="font-medium">
          {session.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <form action={handleLogout}>
            <button type="submit" className="w-full text-left cursor-pointer">
              ログアウト
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
