"use client";
import { useState } from "react";
import {SessionProvider, useSession} from "next-auth/react"
import { Props } from "next/script";

export default function Home() {

  const {data: session} = useSession()

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    console.log(state);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div>

        <form action=""></form>
        <input
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
        </div>
    </div>
  );
}
