"use client";
import { useChatStore } from "@/stores/chatStore";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface MessageInputProps {
  isWelcomePage?: boolean;
}

const formSchema = z.object({
  message: z.string().trim().min(1),
});

const MessageInput = ({ isWelcomePage = false }: MessageInputProps) => {
  const { userSendMessage: sendMessage, setIsWelcomePage } = useChatStore();
  //const params = useParams<{ conversationId?: string }>();

  useEffect(() => {
    setIsWelcomePage(isWelcomePage);
  }, [isWelcomePage, setIsWelcomePage]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    sendMessage(data.message);
    form.reset();
  };

  // Handle Enter key press to submit the form
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (form.formState.isValid) {
        form.handleSubmit(onSubmit)();
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full items-center space-x-2"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Textarea
                  placeholder="Type a message..."
                  className="flex-grow"
                  onKeyDown={handleKeyDown}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the message you want to send. Press Enter to send,
                Shift+Enter for new line.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Send</Button>
      </form>
    </Form>
  );
};

export default MessageInput;
