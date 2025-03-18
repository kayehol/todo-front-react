import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, TextField } from "@mui/material";
import { TaskFormDialogProps } from "./props/TaskFormDialogProps";
import { useEffect, useState } from "react";
import { Task } from "./props/TaskCardProps";

const TaskFormDialog: React.FC<TaskFormDialogProps> = ({ open, onClose, task, onSave }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDone(task.done)
    } else {
      setTitle('');
      setDescription('');
      setDone(false);
    }
  }, [task]);

  const handleSubmit = () => {
    if (!title || !description || !done) return;

    const newTask: Task = {
      id: task?.id,
      title,
      description,
      done,
    };

    onSave(newTask);
    onClose();
  };

  return (
    <Dialog
      className="p-10"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: (event: React.FormEvent) => {
            event.preventDefault();
            onClose();
          }
        }
      }}
    >
      <DialogTitle>{task ? 'Editar tarefa' : 'Adicionar tarefa'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Título"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Descrição"
          fullWidth
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <FormControlLabel
          required
          control={<Checkbox checked={done} onChange={() => setDone((prev) => !prev)} />}
          label="Concluído"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">{task ? 'Atualizar' : 'Salvar'}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default TaskFormDialog;
