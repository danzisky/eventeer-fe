"use client";
import EventCard from "@/components/EventCard";
import PageHeading from "@/components/PageHeading";
import { Button } from "@/lib/mat-tailwind";
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Music Concert",
    description: "Join us for an amazing night of live music!",
    date: "2024-09-30",
    time: "7:00 PM",
  },
  {
    id: 2,
    title: "Art Exhibition",
    description: "Explore stunning art from local and international artists.",
    date: "2024-10-15",
    time: "11:00 AM",
  },
  {
    id: 3,
    title: "Tech Conference",
    description: "A day of talks and workshops on the latest in technology.",
    date: "2024-11-05",
    time: "9:00 AM",
  },
];

function NewButton() {
  return (
    <Link href="events/create">
      <Button color="green" variant="filled" className="rounded-none">
        Create New Event
      </Button>
    </Link>
  );
}

export default function Events() {
  return (
    <div className="container mx-auto p-6">
      <PageHeading title="Upcoming Events" action={<NewButton />} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
