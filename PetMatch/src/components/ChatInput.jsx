import { useState } from "react";

const ChatInput = ({ sendMessage }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    sendMessage(text);
    setText("");
  };

  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
      <input
        style={{ flex: 1 }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite uma mensagem..."
      />

      <button onClick={handleSend}>
        Enviar
      </button>
    </div>
  );
};

export default ChatInput;