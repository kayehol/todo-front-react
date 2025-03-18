import { Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import Link from "next/link";

export default function Login() {
  return (
    <Card className="w-75 mx-auto my-10 p-3">
      <CardContent>
        <Typography>Login</Typography>
        <form className="flex flex-col gap-3 mt-3">
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            required
          />
          <TextField
            id="password"
            type="password"
            label="Senha"
            variant="outlined"
            required
          />
        </form>
      </CardContent>
      <CardActions>
        <Button>Entrar</Button>
        <Button>
          <Link href="/register">
            Registre-se
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
