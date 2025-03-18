import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import { TaskCardProps } from "./props/TaskCardProps";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onRemove }) => {
  return (
    <Card
      sx={{
        backgroundColor: task.done ? 'green' : '',
        color: task.done ? 'white' : ''
      }}
      className="w-100 mx-auto my-5 p-5"
    >
      <CardContent >
        <Typography variant="h5" component="div">{task.title}</Typography>
        <Typography variant="body2" color="text.secondary" className="py-3">{task.description}</Typography>
        <Typography>{task.done}</Typography>
      </CardContent>
      <CardActions className="flex justify-end">
        <Button size="small" color="primary" variant="contained" onClick={onEdit}>
          <EditIcon fontSize="small" />
          Editar
        </Button>
        <Button size="small" color="error" onClick={onRemove} variant="contained">
          <DeleteIcon fontSize="small" />
          Remover
        </Button>
      </CardActions>
    </Card>

  )
}

export default TaskCard;
