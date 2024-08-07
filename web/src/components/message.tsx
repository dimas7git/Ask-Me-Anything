import { ArrowUp } from "lucide-react";
import { useState } from "react";

interface MessageProps {
    message: string
    amountOfReactions: number,
    answered?: boolean
}

export function Message({message, amountOfReactions, answered = false }: MessageProps) {
    const [hasReacted, setHasReacted] = useState(false)

    function handleReact() {
        setHasReacted(true)
    }

    return (
        <li data-answered={answered} className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none">
            {message}
            {hasReacted ? (
                <button  type="button" className="mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium">
                    <ArrowUp className="size-4" />
                    Curtir pergunta ({amountOfReactions})
                </button>
            ) : (
                <button onClick={handleReact} type="button" className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300">
                    <ArrowUp className="size-4" />
                    Curtir pergunta ({amountOfReactions})
                </button>
            )}
        </li>
    )
}