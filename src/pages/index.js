import PageHeading from "@/components/PageHeading";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/lib/mat-tailwind";
import Link from "next/link";
import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { Typography } from "@material-tailwind/react";
import Pagination from "@/components/Pagination";
import api from "@/lib/axios";

export default function Home() {
  const [events, setEvents] = useState();

  const { isAuthenticated } = useAuth();

  const fetchEvents = async (page = 1) => {
    try {
      const params = new URLSearchParams({
        page,
      });

      const response = await api.get(`/events?${params.toString()}`);
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchEvents(1);
  }, [])

  return (
    <div className="mx-auto p-6 flex flex-col min-h-[50vh] h-full">
      <PageHeading title={isAuthenticated ? 'Welcome User' : 'Anonymous'}></PageHeading>
      <div className="py-6 w-full">
        <Link href="/events">
          <Button>
            Go to your events
          </Button>
        </Link>
      </div>

      {/* Events Grid */}
      <div className="grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events?.data?.length ? (
            events.data.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <Typography className="py-8 w-max mx-auto place-self-center">No events found.</Typography>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="my-8 w-max mx-auto">
        <Pagination
          pagination={events?.pagination}
          onPageChange={fetchEvents}
        />
      </div>

    </div>
  );
}
