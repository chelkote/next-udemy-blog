import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchBox from "@/components/post/SearchBox";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function PublicHeader() {
  return (
    <div>
      <header className="border-gray-900 bg-gray-900 rounded-lg shadow-sm">
        <div className="container mx-auto px-18 py-4 flex items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="font-bold text-xl text-white hover:bg-gray-600 hover:text-white"
                  >
                    Blog
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <SearchBox />
            <Button asChild className="bg-gray-900 hover:bg-gray-600">
              <Link href="/login">login</Link>
            </Button>
            <Button asChild className="bg-gray-900 hover:bg-gray-600">
              <Link href="/register">Registration</Link>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
