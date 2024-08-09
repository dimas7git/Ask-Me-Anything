interface MarkMessageAsAnsweredRequest {
    roomId: string
    messageId: string
  }
  
  export async function MarkMessageAsAnswered({ roomId, messageId }: MarkMessageAsAnsweredRequest) {
    await fetch(`http://localhost:8080/api/rooms/${roomId}/messages/${messageId}/answer`, {
      method: 'PATCH',
    })
  }