
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const endpoint = isRegister
        ? `${import.meta.env.VITE_API_URL}/auth/register`
        : `${import.meta.env.VITE_API_URL}/auth/login`;

      const body = isRegister
        ? {
            name,
            email,
            password,
          }
        : {
            email,
            password,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Something went wrong"
        );
      }

      // REGISTER
      if (isRegister) {
        setSuccess("Account created successfully! You can now login.");

        setName("");
        setEmail("");
        setPassword("");

        // Switch back to login
        setIsRegister(false);
      }

      // LOGIN
      else {
        const token = data.token || data.accessToken;

        if (!token) {
          throw new Error("Token not received from server");
        }

        localStorage.setItem("adminToken", token);

        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsRegister(!isRegister);
    setError("");
    setSuccess("");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            SHOOPO
          </h1>

          <p className="text-gray-500 mt-2">
            {isRegister
              ? "Create your admin account"
              : "Admin Panel Login"}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-5 p-3 rounded-lg bg-green-50 text-green-600 text-sm">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name - Register only */}
          {isRegister && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              minLength={6}
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50 transition"
          >
            {loading
              ? isRegister
                ? "Creating Account..."
                : "Logging in..."
              : isRegister
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        {/* Switch Login/Register */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            {isRegister
              ? "Already have an account?"
              : "Don't have an account?"}
          </p>

          <button
            type="button"
            onClick={switchMode}
            className="mt-2 font-semibold text-black hover:underline"
          >
            {isRegister ? "Login here" : "Create an account"}
          </button>
        </div>

      </div>
    </div>
  );
}


// ### Ab kaise work karega?

// **New user:**

// `Create an account` → Name + Email + Password → `Create Account` → MongoDB mein account create → Login screen.

// **Existing user:**

// Email + Password → `Login` → JWT token → Dashboard `/`.

// ### Ek important check

// Aapke `.env` mein agar:

// ```env
// VITE_API_URL=http://localhost:8000/api
// ```

// hai, to ye automatically:

// ```text
// POST http://localhost:8000/api/auth/register
// POST http://localhost:8000/api/auth/login
// ```

// ko call karega.

// Aur deployed frontend ke liye `VITE_API_URL` mein **aapke deployed backend ka `/api` URL** hona chahiye.
