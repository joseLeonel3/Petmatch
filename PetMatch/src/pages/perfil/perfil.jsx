import { auth } from "../../data/firebaseConfig";

const Perfil = () => {
  const user = auth.currentUser;

  return (
    <div>
      <h1>Perfil</h1>
      <p>Email: {user?.email}</p>
      <p>nome: {user?.displayName}</p>

    </div>
  );
};

export default Perfil;