import { Task } from "./TaskCardProps";

export interface TaskFormDialogProps {
  open: boolean;
  task: Task | null;
  userId: number | undefined;
  onClose: () => void;
  onSave: (method: string) => void;
}
