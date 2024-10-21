import { useState } from "react";
import "./App.css";

import { CredentialResponse, useGoogleLogin } from "@react-oauth/google";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  const googleLogin = useGoogleLogin({
    onSuccess: (credential) => fetchLogin(credential as CredentialResponse),
    onError: () => console.log("Erro ao fazer login"),
  });

  const fetchLogin = async (credential: CredentialResponse) => {
    console.log("Credenciais:", credential);
    const response = await fetch("http://localhost:3000/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credential,
      }),
    });

    const data = await response.json();

    setUser(data);

    console.log("Resposta do servidor:", data);
  };

  return (
    <>
      {user ? <h2>Autenticado</h2> : <h2>Faça Login com Google</h2>}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {!user && (
          <button onClick={() => googleLogin()}>Entrar com Google!</button>
        )}
        {user && user.userData.email}
      </div>
    </>
  );
}

export default App;
