"use client";
import { useState } from "react";
import { Input, Button, Typography, Card, CardBody } from "@/lib/mat-tailwind";
import PageHeading from "@/components/PageHeading";
import withAuth from "@/utils/authMiddleware";
import api from "@/lib/axios";
import { useRouter } from "next/router";

const EventsPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    participants: [""],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errors = {};
    if (!formData.title) errors.title = "Title is required";
    if (!formData.location) errors.location = "Location is required";
    if (!formData.description) errors.description = "Description is required";
    if (!formData.date) errors.date = "Date is required";

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    if (formData.date < today) {
      errors.date = "Date cannot be in the past";
    }

    // Ensure at least one participant is added
    if (formData.participants.some(participant => !participant.trim())) {
      errors.participants = "All participant fields must be filled";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

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
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await api.post('/events/create', formData);
      if (res.data) {
        router.push(`/events/${res.data.id}`);
      }
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <PageHeading title="Create New Event" />
      {/* Event Form */}
      <Card className="rounded-none">
        <CardBody>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
                {errors.title && <Typography className="text-red-500">{errors.title}</Typography>}
              </div>
              <div>
                <Input
                  label="Location (City)"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
                {errors.location && <Typography className="text-red-500">{errors.location}</Typography>}
              </div>
            </div>
            <div>
              <Input
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                multiline
              />
              {errors.description && <Typography className="text-red-500">{errors.description}</Typography>}
            </div>
            <div>
              <Input
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
              {errors.date && <Typography className="text-red-500">{errors.date}</Typography>}
            </div>
            <div className="space-y-4">
              <Typography variant="h5">Participants</Typography>
              {formData.participants.map((participant, index) => (
                <div key={index}>
                  <Input
                    label={`Participant ${index + 1}`}
                    value={participant}
                    onChange={(e) => handleParticipantChange(index, e.target.value)}
                    required
                  />
                </div>
              ))}
              {errors.participants && <Typography className="text-red-500">{errors.participants}</Typography>}
              <Button color="blue" variant="text" onClick={addParticipantField}>
                Add Participant
              </Button>
            </div>

            <Button color="green" type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Create Event"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default withAuth(EventsPage);
