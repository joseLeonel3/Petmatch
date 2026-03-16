import { auth } from "../data/firebaseConfig";

const Message = ({ msg }) => {
  const user = auth.currentUser;

  const isMine = msg.senderId === user.uid;

  return (
    <div
      style={{
        textAlign: isMine ? "right" : "left",
        margin: "10px"
      }}
    >
      <span
        style={{
          background: isMine ? "#D98C9A" : "#eee",
          padding: "8px 12px",
          borderRadius: "10px",
          display: "inline-block"
        }}
      >
        {msg.text}
      </span>
    </div>
  );
};

export default Message;