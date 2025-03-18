import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import { TaskCardProps } from "./props/TaskCardProps";

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  return (
    <Card className="w-75 mx-auto my-10 mb-2 p-3">
      <CardContent>
        <Typography variant="h5" component="div">{task.title}</Typography>
        <Typography variant="body2" color="text.secondary">{task.description}</Typography>
        <Typography>{task.done}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onEdit}>Editar</Button>
        <Button size="small">Remover</Button>
      </CardActions>
    </Card>
  )
}

export default TaskCard;
