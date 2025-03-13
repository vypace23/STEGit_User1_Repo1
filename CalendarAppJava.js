import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function CalendarApp() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const addEvent = () => {
    if (newEvent.trim() && date) {
      setEvents([...events, { name: newEvent, date, description }]);
      setNewEvent("");
      setDate("");
      setDescription("");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Calendario</h1>
      <div className="flex flex-col gap-2 mb-4">
        <Input
          type="text"
          placeholder="Nombre del evento"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={addEvent}>Agregar</Button>
      </div>
      <div className="space-y-2">
        {events.map((event, index) => (
          <Card key={index} onClick={() => setSelectedEvent(event)} className="cursor-pointer">
            <CardContent className="p-4">
              <p className="font-semibold">{event.name}</p>
              <p className="text-gray-600">{event.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedEvent && (
        <Dialog open={true} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedEvent.name}</DialogTitle>
            </DialogHeader>
            <p><strong>Fecha:</strong> {selectedEvent.date}</p>
            <p><strong>Descripción:</strong> {selectedEvent.description || "Sin descripción"}</p>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
