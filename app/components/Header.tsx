import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface HeaderProps {
  username: string | undefined;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  }

  return (
    <div className="flex flex-row justify-between items-center mt-5 ">
      <h1 className="text-2xl font-bold ml-5">To-do List App</h1>
      <Box className="flex flex-row gap-5 mr-5 items-center">
        {username && <Typography>{username}</Typography>}
        {username && <Button variant="contained" onClick={handleLogout}>Logout</Button>}
      </Box>
    </div>
  )
}

export default Header;
