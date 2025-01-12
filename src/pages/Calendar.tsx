import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Filter, Printer, Share2 } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  patientId: string;
}

interface Patient {
  id: string;
  name: string;
}

const mockPatients: Patient[] = [
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
  const [editMode, setEditMode] = useState(false);
  const { toast } = useToast();

  const getFilteredEvents = () => {
    if (!date) return [];
    
    switch (viewMode) {
      case "day":
        return events.filter(event => 
          isSameDay(new Date(event.date), date)
        );
      case "week":
        const weekStart = startOfWeek(date);
        const weekEnd = endOfWeek(date);
        return events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= weekStart && eventDate <= weekEnd;
        });
      case "month":
        const monthStart = startOfMonth(date);
        const monthEnd = endOfMonth(date);
        return events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= monthStart && eventDate <= monthEnd;
        });
      default:
        return events;
    }
  };

  const handleCreateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEvent: Event = {
      id: selectedEvent?.id || crypto.randomUUID(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      date: new Date(formData.get("date") as string),
      time: formData.get("time") as string,
      patientId: formData.get("patient") as string,
    };

    if (editMode && selectedEvent) {
      setEvents(events.map(event => event.id === selectedEvent.id ? newEvent : event));
      toast({
        title: "Evento atualizado",
        description: "O evento foi atualizado com sucesso!",
      });
    } else {
      setEvents([...events, newEvent]);
      toast({
        title: "Evento criado",
        description: "O evento foi criado com sucesso!",
      });
    }

    setIsNewEventModalOpen(false);
    setIsViewEventModalOpen(false);
    setEditMode(false);
    setSelectedEvent(null);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setEditMode(true);
    setIsViewEventModalOpen(false);
    setIsNewEventModalOpen(true);
  };

  const getPatientName = (patientId: string) => {
    return mockPatients.find(p => p.id === patientId)?.name || "Paciente não encontrado";
  };

  const handleNewEventClick = () => {
    setEditMode(false);
    setSelectedEvent(null);
    setIsNewEventModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="default" 
                  className="bg-primary text-white"
                  onClick={handleNewEventClick}
                >
                  Novo evento
                </Button>
                <div className="flex items-center border rounded-md">
                  <Button 
                    variant="ghost" 
                    className={`rounded-none ${viewMode === 'day' ? 'bg-secondary' : ''}`} 
                    onClick={() => setViewMode('day')}
                  >
                    Dia
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`rounded-none ${viewMode === 'week' ? 'bg-secondary' : ''}`} 
                    onClick={() => setViewMode('week')}
                  >
                    Semana
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`rounded-none ${viewMode === 'month' ? 'bg-secondary' : ''}`} 
                    onClick={() => setViewMode('month')}
                  >
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
            
            <div className="flex gap-6">
              <div className="bg-white rounded-lg shadow p-6 w-[40%]">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={ptBR}
                  className="rounded-md border w-full scale-130"
                />
              </div>

              <div className="bg-white rounded-lg shadow p-6 w-[60%]">
                <h2 className="text-xl font-semibold mb-4">
                  Eventos {viewMode === 'day' ? 'do dia' : viewMode === 'week' ? 'da semana' : 'do mês'}
                </h2>
                <div className="space-y-4">
                  {getFilteredEvents().map(event => (
                    <div
                      key={event.id}
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsViewEventModalOpen(true);
                      }}
                      className="p-4 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80"
                    >
                      <p className="font-medium">{event.time} - {event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <p className="text-sm text-primary mt-1">
                        Paciente: {getPatientName(event.patientId)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Dialog open={isNewEventModalOpen} onOpenChange={setIsNewEventModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editMode ? "Editar Evento" : "Novo Evento"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div>
                    <Input
                      name="title"
                      placeholder="Título do evento"
                      defaultValue={selectedEvent?.title}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="description"
                      placeholder="Descrição do evento"
                      defaultValue={selectedEvent?.description}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="date"
                      name="date"
                      defaultValue={format(selectedEvent?.date || date || new Date(), 'yyyy-MM-dd')}
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
                    <Select name="patient" defaultValue={selectedEvent?.patientId} required>
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
                  <Button type="submit">{editMode ? "Atualizar" : "Criar"} Evento</Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isViewEventModalOpen} onOpenChange={setIsViewEventModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Detalhes do Evento</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Input
                      value={selectedEvent?.title}
                      readOnly
                      className="bg-secondary"
                    />
                  </div>
                  <div>
                    <Textarea
                      value={selectedEvent?.description}
                      readOnly
                      className="bg-secondary"
                    />
                  </div>
                  <div>
                    <Input
                      type="date"
                      value={selectedEvent?.date ? format(new Date(selectedEvent.date), 'yyyy-MM-dd') : ''}
                      readOnly
                      className="bg-secondary"
                    />
                  </div>
                  <div>
                    <Input
                      type="time"
                      value={selectedEvent?.time}
                      readOnly
                      className="bg-secondary"
                    />
                  </div>
                  <div>
                    <Input
                      value={getPatientName(selectedEvent?.patientId || '')}
                      readOnly
                      className="bg-secondary"
                    />
                  </div>
                  <Button onClick={() => handleEditEvent(selectedEvent!)}>Editar Evento</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CalendarPage;