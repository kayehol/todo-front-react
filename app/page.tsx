import { Button, Typography } from '@mui/material';

export default function Home() {
  return (
    <div className="p-8">
      <Typography variant="h4" gutterBottom>
        Hello, welcome to my Next.js app with Tailwind and Material UI!
      </Typography>
      <Button variant="contained" color="primary">
        MUI Button
      </Button>
    </div>
  );
}
