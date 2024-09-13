"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input, Button, Typography, Card, CardBody } from "@/lib/mat-tailwind";
import PageHeading from "@/components/PageHeading";
import withAuth from "@/utils/authMiddleware";
import api from "@/lib/axios";

const EditEventPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    participants: [""],
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (id) {
          const response = await api.get(`/events/${id}`);
          const event = response.data;
          setFormData({
            title: event.title,
            description: event.description,
            date: event.date.split('T')[0],
            location: event.location,
            participants: event.participants || [""],
          });
        }
      } catch (error) {
        console.error("Failed to fetch event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleParticipantChange = (index, value) => {
    const newParticipants = [...formData.participants];
    newParticipants[index] = value;
    setFormData((prev) => ({ ...prev, participants: newParticipants }));
  };

  const addParticipantField = () => {
    setFormData((prev) => ({ ...prev, participants: [...prev.participants, ""] }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(`/events/${id}`, formData);
      if (res.data) {
        router.push(`/events/${res.data.id}`);
      }
    } catch (error) {
      console.error("Failed to update event:", error);
    }
  };

  if (!formData.title) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className="container mx-auto p-6">
      <PageHeading title="Edit Event" />
      {/* Event Form */}
      <Card className="rounded-none">
        <CardBody>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Location (City)"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <Input
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              multiline
            />
            <Input
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
            <div className="space-y-4">
              <Typography variant="h5">Participants</Typography>
              {formData.participants.map((participant, index) => (
                <Input
                  key={index}
                  label={`Participant ${index + 1}`}
                  value={participant}
                  onChange={(e) => handleParticipantChange(index, e.target.value)}
                  required
                />
              ))}
              <Button color="blue" variant="text" onClick={addParticipantField}>
                Add Participant
              </Button>
            </div>

            <Button color="green" type="submit" fullWidth>
              Update Event
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default withAuth(EditEventPage);
