import Link from "next/link";
import { Separator } from "../ui/separator";
export default function LeftSidebar() {
  return (
    <aside className="h-screen p-4">
      <div className="mb-4">
        <a href="/" className="text-blue-500">
          New Conversation
        </a>
      </div>
      <Separator orientation="horizontal" />
      <div className="p-4">
        <ul className="flex flex-col gap-2">
          <li>
            <a href="/chat/1">Conversation 1</a>
          </li>
          <li>
            <a href="/chat/2">Conversation 2</a>
          </li>
          {/* Add more conversation items */}
        </ul>
      </div>
    </aside>
  );
}
