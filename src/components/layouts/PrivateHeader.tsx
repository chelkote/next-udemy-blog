import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { auth } from "@/auth"; // 認証情報
import Setting from "./Setting";

export default async function PrivateHeader() {
  const session = await auth(); // サーバーサイドでセッション情報を取得
  if (!session?.user?.email) throw new Error("不正なリクエストです");
  return (
    <header className="border-b ">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className="font-bold text-xl" asChild>
                <Link href="/dashboard" passHref>
                  管理ページ
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Setting session={session} />
      </div>
    </header>
  );
}
