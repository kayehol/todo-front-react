export interface Task {
  id?: number;
  title: string;
  description: string;
  done: boolean;
}

export interface TaskCardProps {
  task: Task;
  onEdit: () => void
}
