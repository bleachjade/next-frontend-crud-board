import { useState } from "react";
import { useRouter } from "next/router";
import parseJwt from "@/utils/parseJwt";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      const token = data.access_token;
      const decodedToken = parseJwt(token);

      localStorage.setItem("token", token);
      localStorage.setItem("userId", decodedToken.sub);
      router.push("/");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col-reverse items-center justify-end min-h-screen md:justify-center md:flex-row bg-green-950">
      <div className="flex items-center justify-center w-full md:w-3/4 p-6 min-h-[50svh] md:min-h-screen">
        <div className="">
          <h2 className="text-xl font-semibold text-white">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2 mt-4 border rounded"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 mt-4 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-lg"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center w-full md:w-1/4 min-h-[50svh] text-2xl font-bold text-white bg-green-800 rounded-lg md:min-h-screen">
        a Board
      </div>
    </div>
  );
};
export default LogIn;
