export interface Task {
  id?: number;
  title: string;
  description: string;
  done: boolean;
  userId: number | undefined;
}

export interface TaskCardProps {
  task: Task;
  onEdit: () => void
  onRemove: () => void
}
