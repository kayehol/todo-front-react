import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

export function Task() {
  return (
    <Card className="w-75 mx-auto my-10 p-3">
      <CardContent>
        <Typography>Title</Typography>
        <Typography>Description</Typography>
        <Typography>Done?</Typography>
      </CardContent>
      <CardActions>
        <Button>Editar</Button>
        <Button>Remover</Button>
      </CardActions>
    </Card>
  )
}
