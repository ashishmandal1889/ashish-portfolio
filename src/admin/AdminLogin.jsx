import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  LoaderCircle,
  Eye,
  EyeOff,
} from "lucide-react";

import "./AdminLogin.css";

const API_URL = "http://localhost:8080/api/auth/login";

function AdminLogin() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    if (!identifier.trim() || !password) {
      setError("Enter your username and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // IMPORTANT:
        // Backend expects "username", not "email"
        body: JSON.stringify({
          username: identifier.trim(),
          password: password,
        }),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        // Backend response is not JSON
      }

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : data.message ||
              data.error ||
              "Invalid username or password."
        );
      }

      // Your backend returns:
      // {
      //   "token": "..."
      // }

      const token = data.token;

      if (!token) {
        throw new Error(
          "Login successful, but authentication token was not received."
        );
      }

      // Save JWT
      localStorage.setItem("adminToken", token);

      // Go to admin dashboard
      navigate("/admin/dashboard", {
        replace: true,
      });
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.message || "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* =========================
            HEADER
        ========================== */}

        <div className="login-heading">

          <div className="login-logo">
            <ShieldCheck
              size={30}
              strokeWidth={1.8}
            />
          </div>

          <h1>Admin Login</h1>

          <p>
            Sign in to manage your portfolio
          </p>

        </div>

        {/* =========================
            LOGIN FORM
        ========================== */}

        <form
          onSubmit={handleLogin}
          className="login-form"
        >

          {/* USERNAME */}

          <div className="login-field">

            <label htmlFor="identifier">
              Username
            </label>

            <input
              id="identifier"
              type="text"
              placeholder="Enter your username"
              value={identifier}
              onChange={(event) => {
                setIdentifier(event.target.value);
                setError("");
              }}
              autoComplete="username"
              autoFocus
              required
              disabled={loading}
            />

          </div>

          {/* PASSWORD */}

          <div className="login-field">

            <label htmlFor="password">
              Password
            </label>

            <div className="password-wrapper">

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                autoComplete="current-password"
                required
                disabled={loading}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous
                  )
                }
                disabled={loading}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* =========================
              ERROR MESSAGE
          ========================== */}

          {error && (
            <div
              className="login-error"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* =========================
              LOGIN BUTTON
          ========================== */}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            {loading ? (
              <>
                <LoaderCircle
                  size={18}
                  className="login-spinner"
                />

                Signing in...
              </>
            ) : (
              "Login"
            )}

          </button>

        </form>

        {/* =========================
            FOOTER
        ========================== */}

        <div className="login-footer">

          <span className="status-dot"></span>

          Secure administrator access

        </div>

      </div>
    </div>
  );
}

export default AdminLogin;