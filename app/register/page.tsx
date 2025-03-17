import { Button, Card, CardActions, CardContent, Link, TextField, Typography } from "@mui/material";

export default function Register() {
  return (
    <Card className="w-75 mx-auto my-10 p-3">
      <CardContent>
        <Typography>Criar nova conta</Typography>
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
        <Button>Enviar</Button>
      </CardActions>
    </Card>
  )
}
