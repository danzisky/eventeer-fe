"use client";
import EventCard from "@/components/EventCard";
import { Typography } from "@/lib/mat-tailwind";

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

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <Typography color="green" variant="h3" className="text-left mb-8">
        Upcoming Events
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
