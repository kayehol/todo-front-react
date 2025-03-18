import { Typography } from "@mui/material";
import TaskList from "./components/Task/TaskList";

export default function Home() {
  return (
    <div className="flex flex-row justify-center pt-10">
      <TaskList />
    </div>
  );
}
