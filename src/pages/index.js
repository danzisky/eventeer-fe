import { Typography, Button } from "../lib/mat-tailwind";

export default function Home() {
  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-4 text-gray-800">
        Welcome to My App
      </Typography>
      <Typography variant="paragraph" className="mb-6 text-gray-600">
        This is a simple app using Next.js, Tailwind CSS, and Material Tailwind UI.
      </Typography>
      <Button color="blue" variant="filled" size="md">
        Get Started
      </Button>
    </div>
  );
}
