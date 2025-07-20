// frontend/src/pages/Chat.tsx
import { useRef, useState } from "react";
import { sendChatRequest } from "../helpers/api";

const Chat = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const handleSend = async () => {
    const message = inputRef.current?.value;
    if (!message) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);

    try {
      const data = await sendChatRequest(message);
      setMessages((prev) => [...prev, { role: "model", content: data.response }]);
      inputRef.current!.value = "";
    } catch (err) {
      console.error("Error fetching AI response:", err);
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, i) => (
          <div key={i}><strong>{msg.role}:</strong> {msg.content}</div>
        ))}
      </div>
      <input type="text" ref={inputRef} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
