import { useParams } from "react-router-dom";
import { Message } from "./message";
import { getRoomMessages } from "../http/get-room-messages";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMessagesWebSockets } from "../hooks/use-messages-web-sockets";

export function Messages() {
  const { roomId } = useParams();
  
  if (!roomId) {
    throw new Error('Messages component must be used within a room page');
  }

  const { data, error } = useSuspenseQuery({
    queryKey: ['messages', roomId],
    queryFn: () => getRoomMessages({ roomId }),
  });

  if (error) {
    console.error('Error fetching messages:', error);
    return <div>Error fetching messages</div>;
  }

  useMessagesWebSockets({ roomId });


  if (!data || !data.messages || data.messages.length === 0) {
    return <div>No messages found</div>;
  }

  const sortedMessages = data.messages.sort((a, b) => {
    return b.amountOfReactions - a.amountOfReactions;
  });

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {sortedMessages.map(message => {
        return (
          <Message 
            key={message.id}
            id={message.id}
            text={message.text}
            amountOfReactions={message.amountOfReactions} 
            answered={message.answered} 
          />
        )
      })}
    </ol>
  );
}
