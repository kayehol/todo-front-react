import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import { TaskCardProps } from "./props/TaskCardProps";

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onRemove }) => {
  return (
    <Card
      sx={{
        backgroundColor: task.done ? 'green' : '',
        color: task.done ? 'white' : ''
      }}
      className="w-75 mx-auto my-5 p-5"
    >
      <CardContent >
        <Typography variant="h5" component="div">{task.title}</Typography>
        <Typography variant="body2" color="text.secondary">{task.description}</Typography>
        <Typography>{task.done}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" variant="contained" onClick={onEdit}>Editar</Button>
        <Button size="small" color="error" onClick={onRemove} variant="contained">Remover</Button>
      </CardActions>
    </Card>

  )
}

export default TaskCard;
