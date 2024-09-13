"use client";
import EventCard from "@/components/EventCard";
import PageHeading from "@/components/PageHeading";
import { Button, Input } from "@/lib/mat-tailwind";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

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
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    searchText: "",
    city: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = new URLSearchParams(filters);
        const response = await api.get(`/events?${params.toString()}`);
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto p-6">
      <PageHeading title="Upcoming Events" action={<NewButton />} />

      {/* Filter Form */}
      <div className="mb-6">
        <form className="grid grid-cols-1 md:grid-cols-2 ld:grid-cols-3 gap-4">
          <Input
            label="Search"
            name="searchText"
            value={filters.searchText}
            onChange={handleFilterChange}
            className="rounded-none"
            size="lg"
            placeholder="Search events"
          />
          <Input
            label="City"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="rounded-none"
            size="lg"
            placeholder="Filter by city"
          />
          <div className="flex gap-4 max-md:col-span-2">
            <Input
              label="Start Date"
              name="startDate"
              type="date"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="rounded-none"
              size="lg"
            />
            <Input
              label="End Date"
              name="endDate"
              type="date"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="rounded-none"
              size="lg"
            />
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
