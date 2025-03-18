'use client'

import { jwtDecode, JwtPayload } from "jwt-decode";
import TaskList from "./components/Task/TaskList";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Box } from "@mui/material";

interface User {
  id: number | undefined;
  username: string | undefined;
}

interface IJwtPayload extends JwtPayload {
  id: number;
  username: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const { username, sub } = decodedToken as IJwtPayload;

      setUser({
        username,
        id: Number(sub)
      });
    } catch (err) {
      console.error('Token inválido');
      localStorage.removeItem('token');
      router.push('/login');
    }

  }, [router]);

  return (
    <>
      <Header username={user?.username} />
      <Box className="flex flex-row justify-center pt-10">
        <TaskList userId={user?.id} />
      </Box>
    </>
  );
}
