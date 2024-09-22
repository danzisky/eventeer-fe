"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Typography, Card, CardBody, Button } from "@/lib/mat-tailwind";
import PageHeading from "@/components/PageHeading";
import LoadingComponent from "@/components/LoadingComponent";
import api from "@/lib/axios";
import withAuth from "@/utils/authMiddleware";
import { useAuth } from "@/hooks/useAuth";

const EventDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the event ID from the URL
  const [event, setEvent] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (id) {
          const response = await api.get(`/events/${id}`);
          setEvent(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleBack = () => {
    router.push("/events"); // Navigate back to the events list
  };

  const handleDelete = async () => {
    if (event.creator.id !== user?.id) return;
    try {
      await api.delete(`/events/${id}`);
      router.push("/events"); // Redirect to events list after deletion
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  const handleEdit = () => {
    if (event.creator.id !== user?.id) return;
    router.push(`/events/edit/${id}`); // Navigate to the edit page
  };

  if (!event) {
    return <LoadingComponent></LoadingComponent>;
  }

  return (
    <div className="container mx-auto p-6">
      <PageHeading title={`Event: ${event.title}`}></PageHeading>
      <Card className="rounded-none">
        <CardBody>
          <Typography variant="h4" className="mb-4">
            {event.title}
          </Typography>
          <Typography variant="h6" color="teal" className="mb-2 italic">
            {event.creator.username} - {event.creator.email}
          </Typography>
          <Typography className="text-gray-600 mb-4">{event.description}</Typography>
          <Typography variant="small" className="text-blue-gray-500">
            {new Date(event.date).toLocaleDateString()} - {event.location}
          </Typography>
          <Typography variant="small" className="text-blue-gray-500 mt-4">
            Participants: {event.participants.join(", ")}
          </Typography>
          <div className="mt-4 space-x-4">
            <Button disabled={event.creator.id !== user?.id} color="blue" className="rounded-none" onClick={handleEdit}>
              Edit
            </Button>
            <Button disabled={event.creator.id !== user?.id} color="red" className="rounded-none" onClick={handleDelete}>
              Delete
            </Button>
            <Button color="blue" className="rounded-none" onClick={handleBack}>
              Back to Events
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default withAuth(EventDetailPage);