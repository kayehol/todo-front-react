import { Task } from "./TaskCardProps";

export interface TaskFormDialogProps {
  open: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
}
