"use client";
import { Card, CardBody, CardFooter, Button, Typography } from "@/lib/mat-tailwind";

const EventCard = ({ event }) => {
  return (
    <Card className="w-full max-w-sm mx-auto bg-opacity-80 shadow-none bg-green-100 rounded-none flex flex-col">
      <CardBody className="grow">
        <Typography variant="h5" color="green" className="mb-2 uppercase">
          {event.title}
        </Typography>
        <Typography className="text-gray-600 mb-4">{event.description}</Typography>
      </CardBody>
      <CardFooter className="pt-0 flex flex-row justify-between items-center">
        <Button color="green" size="sm" className="rounded-none shadow-none">
          View Details
        </Button>
        <Typography variant="small" className="text-green-500">
          {new Date(event.date).toLocaleDateString()} at {event.time}
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
