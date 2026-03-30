import { useState } from "react";
import "../components/ChatInput.css";

const ChatInput = ({ sendMessage }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    sendMessage(text);
    setText("");
  };

  return (
    <div id="caixaTexto">
      <input
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