import { useNotifications } from "../../hooks/useNotifications";
import { useNavigate } from "react-router-dom";

const Notificacoes = () => {
  const { notifications } = useNotifications();
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h2>Notificações</h2>

      {notifications.length === 0 && <p>Sem notificações</p>}

      {notifications.map((n, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
            cursor: "pointer"
          }}
          onClick={() => navigate(`/chat/${n.chatId}`)}
        >
          <p><strong>Nova mensagem</strong></p>
          <p>{n.lastMessage.text}</p>
          <p>Sobre o pet: {n.petId}</p>
        </div>
      ))}
    </div>
  );
};

export default Notificacoes;