import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { SENDER } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { inputValue } = await req.json();
    const newConversation = await prisma.iConversation.create({
      data: {
        title: "New Conversation1",
        messages: {
          create: [
            {
              sender: SENDER.user,
              content: inputValue,
            },
          ],
        },
      },
    });
    //const data = await res.json();

    return NextResponse.json(newConversation);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create conversation posts" },
      { status: 500 }
    );
  }
}
