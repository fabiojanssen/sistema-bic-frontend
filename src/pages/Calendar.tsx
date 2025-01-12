import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronDown, Filter, Printer, Share2 } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  patientId?: string;
}

const mockPatients = [
  { id: "1", name: "João Silva" },
  { id: "2", name: "Maria Santos" },
  { id: "3", name: "Pedro Oliveira" },
];

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [isViewEventModalOpen, setIsViewEventModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("month");
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
      patientId: formData.get("patient") as string,
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
      patientId: formData.get("patient") as string,
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
          <div className="max-w-7xl mx-auto">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow">
              <div className="flex items-center space-x-2">
                <Button variant="default" className="bg-primary text-white">
                  Novo evento
                </Button>
                <div className="flex items-center border rounded-md">
                  <Button variant="ghost" className={`rounded-none ${viewMode === 'day' ? 'bg-secondary' : ''}`} onClick={() => setViewMode('day')}>
                    Dia
                  </Button>
                  <Button variant="ghost" className={`rounded-none ${viewMode === 'week' ? 'bg-secondary' : ''}`} onClick={() => setViewMode('week')}>
                    Semana
                  </Button>
                  <Button variant="ghost" className={`rounded-none ${viewMode === 'month' ? 'bg-secondary' : ''}`} onClick={() => setViewMode('month')}>
                    Mês
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
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
                  <div>
                    <Select name="patient" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o paciente" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockPatients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                  <div>
                    <Select name="patient" defaultValue={selectedEvent?.patientId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o paciente" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockPatients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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