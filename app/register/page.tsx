'use client'

import { Alert, Box, Button, Card, CardActions, CardContent, CircularProgress, Snackbar, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const validateForm = (): boolean => {
    if (!username || !password || !passwordConfirm) {
      setError("Todos os campos são obrigatórios");
      return false;

    }

    if (password !== passwordConfirm) {
      setError("Confirmação de senha incorreta");
      return false;
    }

    return true;
  }

  const handleRegister = async () => {

    if (!validateForm()) return;

    try {
      setLoading(true);

      const baseUrl = "http://localhost:3000/api";
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        setSnackbarMessage("Usuário criado com sucesso");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

        router.push('/login');
      } else {
        setError(data.message);

        setSnackbarMessage("Erro ao criar usuário");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (err) {
      setError('Erro ao criar usuário');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Card className="w-100 mx-auto my-10 p-3">
      <Typography variant="h4" className="font-bold">📝 To-do List App</Typography>
      {loading ? (
        <Box className="flex justify-center items-center h-full">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <CardContent>
            <Typography className="py-3">Criar nova conta</Typography>
            <form className="flex flex-col gap-3 mt-3">
              <TextField
                id="username"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                required
              />
              <TextField
                id="password"
                type="password"
                label="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                required
              />
              <TextField
                id="passwordConfirm"
                type="password"
                label="Confirmar senha"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                variant="outlined"
                required
              />
            </form>
            {error && <Typography color="error">{error}</Typography>}
          </CardContent>
          <CardActions className="flex justify-end">
            <Button onClick={handleRegister} variant="contained" disabled={loading}>
              <SaveIcon fontSize="small" className="mr-3" />
              Enviar
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
  )
}
