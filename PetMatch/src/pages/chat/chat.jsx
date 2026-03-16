import { useChat } from "../../hooks/useChat";
import Message from "../../components/Message";
import ChatInput from "../../components/ChatInput";

const Chat = () => {

  const chatId = "chatTeste";

  const { messages, sendMessage } = useChat(chatId);

  return (
    <div style={{ width: "400px", margin: "auto", marginTop: "40px" }}>

      <h2>Chat</h2>

      <div
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px"
        }}
      >
        {messages.map((msg) => (
          <Message key={msg.id} msg={msg} />
        ))}
      </div>

      <ChatInput sendMessage={sendMessage} />

    </div>
  );
};

export default Chat;