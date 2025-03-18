'use client';

import { Alert, Box, Button, Card, CardActions, CardContent, CircularProgress, Snackbar, TextField, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      const baseUrl = "http://localhost:3000/api";
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.access_token);

        setError("");
        setSnackbarMessage("Login feito com sucesso");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

        router.push('/');
      } else {
        setError(data.message);

        setSnackbarMessage("Erro ao fazer login");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (err) {
      setError('Erro ao fazer login');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }


  return (
    <Card className="w-100 mx-auto my-10 p-3">
      {loading ? (
        <Box className="flex justify-center items-center h-full">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <CardContent>
            <Typography variant="h4" className="font-bold">📝 To-do List App</Typography>
            <Typography className="py-3">
              Login
            </Typography>
            <form className="flex flex-col gap-3 mt-5">
              <TextField
                id="username"
                value={username}
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                required
              />
              <TextField
                id="password"
                type="password"
                value={password}
                label="Senha"
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                required
              />
            </form>
            {error && <Typography>{error}</Typography>}
          </CardContent>
          <CardActions className="flex justify-between my-3">
            <Button onClick={handleLogin} variant="contained">
              <LoginIcon fontSize="small" className="mr-2" />
              Entrar
            </Button>
            <Button variant="contained">
              <Link href="/register">
                <PersonAddIcon fontSize="small" className="mr-2" />
                Registre-se
              </Link>
            </Button>
          </CardActions>

        </>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
}
