import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { prisma } from "../../../lib/prisma";
import ConversationList from "@/components/SideBar/ConversationList";
import NewConversation from "@/components/SideBar/NewConversation";
import { Suspense } from "react";

export default async function LeftSidebar({
  params,
  searchParams,
}: {
  params?: { conversationId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <aside className="h-screen overflow-y-auto">
      <div className="flex justify-center bg-gray-100 p-4">
        <NewConversation />
      </div>

      <Separator orientation="horizontal" />
      <Suspense fallback={<div>Loading...</div>}>
        <ConversationList params={params} searchParams={searchParams} />
      </Suspense>
    </aside>
  );
}
