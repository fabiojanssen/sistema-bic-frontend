import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
}

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [isViewEventModalOpen, setIsViewEventModalOpen] = useState(false);
  const { toast } = useToast();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setIsNewEventModalOpen(true);
    }
  };

  const handleCreateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEvent: Event = {
      id: crypto.randomUUID(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      date: date!,
      time: formData.get("time") as string,
    };

    setEvents([...events, newEvent]);
    setIsNewEventModalOpen(false);
    toast({
      title: "Evento criado",
      description: "O evento foi criado com sucesso!",
    });
  };

  const handleUpdateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedEvent: Event = {
      ...selectedEvent!,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      time: formData.get("time") as string,
    };

    setEvents(events.map((event) => 
      event.id === selectedEvent?.id ? updatedEvent : event
    ));
    setIsViewEventModalOpen(false);
    setSelectedEvent(null);
    toast({
      title: "Evento atualizado",
      description: "O evento foi atualizado com sucesso!",
    });
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsViewEventModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Agenda</h1>
            
            <div className="bg-white rounded-lg shadow p-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                locale={ptBR}
                className="rounded-md border w-full"
              />

              {/* Lista de eventos do dia selecionado */}
              {date && events
                .filter(event => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
                .map(event => (
                  <div
                    key={event.id}
                    onClick={() => handleEventClick(event)}
                    className="mt-4 p-4 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80"
                  >
                    <p className="font-medium">{event.time} - {event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                ))}
            </div>

            {/* Modal de Novo Evento */}
            <Dialog open={isNewEventModalOpen} onOpenChange={setIsNewEventModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Novo Evento</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div>
                    <Input
                      name="title"
                      placeholder="Título do evento"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="description"
                      placeholder="Descrição do evento"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="time"
                      name="time"
                      required
                    />
                  </div>
                  <Button type="submit">Criar Evento</Button>
                </form>
              </DialogContent>
            </Dialog>

            {/* Modal de Visualização/Edição de Evento */}
            <Dialog open={isViewEventModalOpen} onOpenChange={setIsViewEventModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Detalhes do Evento</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleUpdateEvent} className="space-y-4">
                  <div>
                    <Input
                      name="title"
                      defaultValue={selectedEvent?.title}
                      placeholder="Título do evento"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="description"
                      defaultValue={selectedEvent?.description}
                      placeholder="Descrição do evento"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="time"
                      name="time"
                      defaultValue={selectedEvent?.time}
                      required
                    />
                  </div>
                  <Button type="submit">Atualizar Evento</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CalendarPage;