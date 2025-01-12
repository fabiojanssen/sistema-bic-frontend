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
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
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
  const { toast } = useToast();

  const getFilteredEvents = () => {
    if (!date) return [];
    
    switch (viewMode) {
      case "day":
        return events.filter(event => 
          format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
        );
      case "week":
        const weekStart = startOfWeek(date);
        const weekEnd = endOfWeek(date);
        return events.filter(event => 
          event.date >= weekStart && event.date <= weekEnd
        );
      case "month":
        const monthStart = startOfMonth(date);
        const monthEnd = endOfMonth(date);
        return events.filter(event => 
          event.date >= monthStart && event.date <= monthEnd
        );
      default:
        return events;
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

  const getPatientName = (patientId: string) => {
    return mockPatients.find(p => p.id === patientId)?.name || "Paciente não encontrado";
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
                <Button 
                  variant="default" 
                  className="bg-primary text-white"
                  onClick={() => setIsNewEventModalOpen(true)}
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
              {/* Calendar */}
              <div className="bg-white rounded-lg shadow p-6 flex-1">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={ptBR}
                  className="rounded-md border w-full scale-130"
                />
              </div>

              {/* Events List */}
              <div className="bg-white rounded-lg shadow p-6 w-1/3">
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

            {/* New Event Modal */}
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

            {/* View/Edit Event Modal */}
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