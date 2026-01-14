import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Video } from "lucide-react";

export default function SchedulePage() {
  const events = [
    { id: 1, title: "Technical Interview - Alice", time: "10:00 AM - 11:30 AM", type: "Video Call" },
    { id: 2, title: "Team Sync", time: "01:00 PM - 02:00 PM", type: "Conference Room A" },
    { id: 3, title: "Final Round - Bob", time: "03:30 PM - 04:30 PM", type: "Video Call" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
        <Button>New Event</Button>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-6 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <CalendarIcon className="h-6 w-6" />
                  </div>
                  <div>
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {event.time}</span>
                          <span className="flex items-center gap-1"><Video className="h-3 w-3" /> {event.type}</span>
                      </div>
                  </div>
               </div>
               <Button variant="outline">Reschedule</Button>
            </CardContent>
          </Card>
        ))}
        
        <div className="text-center text-muted-foreground py-10">
            <p>No more events for today.</p>
        </div>
      </div>
    </div>
  );
}
