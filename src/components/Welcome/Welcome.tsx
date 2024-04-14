import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function Welcome() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="max-w-md text-center">
        <Label className="mb-4 text-4xl font-bold">
          Welcome to our AI Chatbot
        </Label>
        <p className="mb-8 text-gray-500">
          Engage in natural conversations and get personalized assistance from
          our intelligent chatbot.
        </p>
        <Button variant="default" className="mb-4">
          Start Chatting
        </Button>
        <Separator className="my-8" />
        <p className="text-gray-500">
          Powered by the latest AI technology, our chatbot is here to help you
          with a wide range of tasks.
        </p>
      </div>
    </div>
  );
}
