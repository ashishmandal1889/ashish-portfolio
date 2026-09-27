import { useState } from "react";

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "http://localhost:8080/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    if (!response.ok) {
      alert("Invalid username or password");
      return;
    }

    setIsLoggedIn(true);
  } catch (error) {
    console.error("Login error:", error);
    alert("Unable to connect to server");
  }
};

  if (!isLoggedIn) {
    return (
      <section
        style={{
          minHeight: "100vh",
          padding: "120px 20px",
          background: "#000",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            padding: "35px",
            background: "#080808",
            border: "1px solid #222",
            borderRadius: "16px",
          }}
        >
          <p
            style={{
              color: "#22d3ee",
              marginBottom: "10px",
            }}
          >
            Admin Panel
          </p>

          <h1
            style={{
              marginTop: 0,
              marginBottom: "30px",
            }}
          >
            Admin Login
          </h1>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "13px",
                marginBottom: "15px",
                background: "#111",
                color: "white",
                border: "1px solid #333",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "13px",
                marginBottom: "20px",
                background: "#111",
                color: "white",
                border: "1px solid #333",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "13px",
                background: "#22d3ee",
                color: "#000",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "120px 20px",
        background: "#000",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <p style={{ color: "#22d3ee" }}>
          Admin Dashboard
        </p>

        <h1>Welcome, Admin</h1>

        <button
          onClick={() => setIsLoggedIn(false)}
          style={{
            padding: "12px 20px",
            background: "#222",
            color: "white",
            border: "1px solid #333",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </section>
  );
}

export default Admin;