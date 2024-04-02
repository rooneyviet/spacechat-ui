-- CreateEnum
CREATE TYPE "SENDER" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM');

-- CreateTable
CREATE TABLE "IConversation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "IConversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IMessage" (
    "id" SERIAL NOT NULL,
    "sender" "SENDER" NOT NULL DEFAULT 'USER',
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "conversationId" INTEGER,
    "isError" BOOLEAN NOT NULL DEFAULT false,
    "interrupted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "IMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IMessage" ADD CONSTRAINT "IMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "IConversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
