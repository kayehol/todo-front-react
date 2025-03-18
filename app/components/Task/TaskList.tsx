"use client";

import { Alert, Box, Button, List, ListItem, Pagination, Snackbar, Stack, Typography } from "@mui/material"
import TaskCard from "./TaskCard"
import { Task } from "./props/TaskCardProps";
import { useEffect, useState } from "react";
import TaskFormDialog from "./TaskFormDialog";

const TaskList: React.FC = () => {
  const TASKS_PER_PAGE: number = 5;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const openDialogForNewTask = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  const openDialogForEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setEditingTask(null);
  }
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const fetchTasks = async () => {
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:3000/api/task`)

      if (!res.ok)
        throw new Error("Erro ao buscar tarefas");

      const tasks = await res.json();
      setTasks(tasks);
    } catch (err) {
      setError('Erro ao buscar tarefas');
    } finally {
      setLoading(false);
    }
  }

  const removeTask = async (task: Task) => {
    try {
      const res = await fetch(`http://localhost:3000/api/task/${task.id}`, { method: 'DELETE' })

      if (!res.ok)
        throw new Error("Erro ao remover tarefa");

      await fetchTasks();

      setSnackbarMessage("Tarefa removida com sucesso");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setError('Erro ao remover tarefa')

      setSnackbarMessage(error);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  }

  const saveTask = async (method: string) => {
    await fetchTasks();

    setSnackbarMessage(`Tarefa ${method === 'POST' ? 'criada' : 'atualizada'} com sucesso`);
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  }

  const idxLastTask = page * TASKS_PER_PAGE;
  const idxFirstTask = idxLastTask - TASKS_PER_PAGE;
  const currentTasks = tasks.slice(idxFirstTask, idxLastTask);
  const totalPages = Math.ceil(tasks.length / TASKS_PER_PAGE);

  useEffect(() => {

    fetchTasks();
  }, [page])

  return (
    <Box className="p-3">
      <Typography className="mb-10" variant="h5">Lista de tarefas</Typography>
      <Button className="mt-10" color="primary" variant="contained" onClick={openDialogForNewTask}>Adicionar</Button>
      <List>
        {currentTasks.map(task => (
          <ListItem disablePadding key={task.id}>
            <TaskCard
              task={task}
              onEdit={() => openDialogForEditTask(task)}
              onRemove={() => removeTask(task)}
            />
          </ListItem>
        ))}
      </List>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          className="mt-5"
          color="primary"
        />
      </Stack>

      <TaskFormDialog
        open={dialogOpen}
        task={editingTask}
        onClose={handleClose}
        onSave={saveTask}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default TaskList;
