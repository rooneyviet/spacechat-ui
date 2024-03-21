import { NextResponse } from "next/server";
import markdownToHtml from "@/utils/markdown";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const markdown = searchParams.get("markdown");

  if (!markdown) {
    return NextResponse.json(
      { error: "Missing markdown parameter" },
      { status: 400 }
    );
  }

  const html = await markdownToHtml(markdown);
  return NextResponse.json({ html });
}
