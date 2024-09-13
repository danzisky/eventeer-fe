"use client";
import { useState } from "react";
import { Input, Button, Typography, Card, CardBody } from "@/lib/mat-tailwind";
import PageHeading from "@/components/PageHeading";
import withAuth from "@/utils/authMiddleware";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    participants: [""],
  });

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setEvents((prevEvents) => [...prevEvents, formData]);
    setFormData({
      title: "",
      description: "",
      date: "",
      location: "",
      participants: [""],
    });
  };

  return (
    <div className="container mx-auto p-6">
      <PageHeading title="Create New Event"/>
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
              Create Event
            </Button>
          </form>
        </CardBody>

      </Card>
      {/* Event List */}
      <div className="mt-12">
        <Typography variant="h4" className="mb-6">
          Events
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card key={index} className="shadow-md">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {event.title}
                </Typography>
                <Typography className="text-gray-600 mb-4">{event.description}</Typography>
                <Typography variant="small" className="text-blue-gray-500">
                  {new Date(event.date).toLocaleDateString()} - {event.location}
                </Typography>
                <Typography variant="small" className="text-blue-gray-500 mt-4">
                  Participants: {event.participants.join(", ")}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuth(EventsPage);
