import { ArrowUp, CheckCircle } from "lucide-react"; // Adicione CheckCircle para o ícone de marcar como respondido
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createMessageReaction } from "../http/create-message-reaction";
import { toast } from "sonner";
import { removeMessageReaction } from "../http/remove-message-reaction";
import { MarkMessageAsAnswered } from "../http/mark-message-as-answered"; // Importe a função

interface MessageProps {
  id: string
  text: string
  amountOfReactions: number
  answered?: boolean
}

export function Message({ 
  id: messageId, 
  text, 
  amountOfReactions, 
  answered = false,
}: MessageProps) {
  const { roomId } = useParams()
  const [hasReacted, setHasReacted] = useState(false)
  const [isAnswered, setIsAnswered] = useState(answered) // Estado para controlar se a mensagem foi respondida

  if (!roomId) {
    throw new Error('Messages components must be used within room page')
  }

  async function createMessageReactionAction() {
    if (!roomId) {
      return
    }

    try {
      await createMessageReaction({ messageId, roomId })
    } catch {
      toast.error('Falha ao reagir mensagem, tente novamente!')
    }

    setHasReacted(true)
  }

  async function removeMessageReactionAction() {
    if (!roomId) {
      return
    }

    try {
      await removeMessageReaction({ messageId, roomId })
    } catch {
      toast.error('Falha ao remover reação, tente novamente!')
    }

    setHasReacted(false)
  }

  async function markAsAnswered() {
    if (!roomId) {
      return
    }

    try {
      await MarkMessageAsAnswered({ roomId, messageId })
      setIsAnswered(true)
    } catch {
      toast.error('Falha ao marcar a mensagem como respondida, tente novamente!')
    }
  }

  return (
    <li data-answered={isAnswered} className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none">
      {text}

     

      {hasReacted ? (
        <button 
          type="button" 
          onClick={removeMessageReactionAction} 
          className="mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      ) : (
        <button 
          type="button" 
          onClick={createMessageReactionAction} 
          className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      )}


{isAnswered ? (
        <button 
          type="button" 
          className="mt-3 flex items-center gap-2 text-green-400 text-sm font-medium"
          disabled
        >
          <CheckCircle className="size-4" />
          Pergunta respondida
        </button>
      ) : (
        <button 
          type="button" 
          onClick={markAsAnswered} 
          className="mt-3 flex items-center gap-2 text-blue-400 text-sm font-medium hover:text-blue-500"
        >
          <CheckCircle className="size-4" />
          Marcar como respondida
        </button>
      )}
    </li>
  )
}
