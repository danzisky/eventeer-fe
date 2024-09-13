"use client";
import { Card, CardBody, CardFooter, Button, Typography } from "@/lib/mat-tailwind";
import Link from "next/link";

const EventCard = ({ event }) => {
  return (
    <Card className="w-full max-w-sm mx-auto bg-opacity-80 shadow-none bg-green-100 rounded-none flex flex-col">
      <CardBody className="grow">
        <Typography variant="h5" color="green" className="mb-2 uppercase">
          {event.title}
        </Typography>
        <Typography className="text-gray-600 mb-4">
          <p className="line-clamp-4">
            {event.description}
          </p>
        </Typography>
        <Typography className="text-gray-700 mb-2">
          Location: {event.location}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex flex-row justify-between items-center">
        <Link href={`/events/${event.id}`}>
          <Button color="green" size="sm" className="rounded-none shadow-none">
            View Details
          </Button>
        </Link>
        <Typography variant="small" className="text-green-500">
          {new Date(event.date).toLocaleDateString()} - {event.time ?? 'all day'}
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
