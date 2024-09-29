"use client";
import { useEffect, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { Props } from "next/script";
import React from "react";
import { signIn } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);

  const handleLogin = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    console.log(state);
  };

  const handleSubmit = async (event: any) => {
    try {
      if (status === "authenticated") {
        signIn("credentials", {
          username: state.username,
          password: state.password,
          redirect: "/dashboard",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {}, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="bg-black">
        <form onSubmit={handleSubmit}>
          <input
            className=""
            name="username"
            value={state.username}
            type="text"
            onChange={handleLogin}
          />
          <input
            name="password"
            value={state.password}
            type="password"
            onChange={handleLogin}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
