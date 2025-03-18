import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { TaskFormDialogProps } from "./props/TaskFormDialogProps";
import { useEffect, useState } from "react";
import { Task } from "./props/TaskCardProps";

const TaskFormDialog: React.FC<TaskFormDialogProps> = ({ open, onClose, task, onSave, userId }) => {
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

  const validateForm = (): boolean => {
    if (!title || !description)
      return false;

    return true;
  }

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const newTask: Task = {
      id: task ? task.id : undefined,
      title,
      description,
      done,
      userId
    };
    try {
      const method = task ? 'PATCH' : 'POST';
      const baseUrl = 'http://localhost:3000/api/task';
      const updateEndpoint = `${baseUrl}/${task?.id}`;
      const endpoint = task ? updateEndpoint : baseUrl;
      const token = localStorage.getItem('token');

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(newTask),
      });

      if (!res.ok)
        throw new Error('Erro ao salvar task');

      onSave(method);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar task', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          required
        />
        <TextField
          label="Descrição"
          fullWidth
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          required
        />
        <FormControlLabel
          control={<Checkbox checked={done} onChange={() => setDone((prev) => !prev)} />}
          label="Concluído"
        />
      </DialogContent>
      <DialogActions className="flex justify-end p-3">
        <Button onClick={onClose} color="secondary" variant="contained">
          <CloseIcon fontSize="small" />
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="success" variant="contained">
          <SaveIcon fontSize="small" />
          {task ? 'Atualizar' : 'Salvar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TaskFormDialog;
