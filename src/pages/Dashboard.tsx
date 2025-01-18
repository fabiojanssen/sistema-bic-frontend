import { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePickerWithRange } from '@/components/DateRangePicker';
import { addMonths, subMonths } from 'date-fns';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock data for the charts
const generateMockData = () => {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  return months.map((month) => ({
    name: month,
    atendimentos: Math.floor(Math.random() * 50) + 20,
    pacientes: Math.floor(Math.random() * 30) + 10,
    faturamento: Math.floor(Math.random() * 15000) + 5000,
  }));
};

// Mock data for today's events
const mockEvents = [
  { id: 1, time: '09:00', patient: 'Ana Silva', type: 'Avaliação Inicial' },
  { id: 2, time: '10:00', patient: 'João Santos', type: 'Acompanhamento' },
  { id: 3, time: '11:00', patient: 'Maria Oliveira', type: 'Terapia' },
  { id: 4, time: '13:00', patient: 'Pedro Costa', type: 'Avaliação' },
  { id: 5, time: '14:00', patient: 'Lucia Ferreira', type: 'Acompanhamento' },
  { id: 6, time: '15:00', patient: 'Carlos Souza', type: 'Terapia' },
  { id: 7, time: '16:00', patient: 'Julia Lima', type: 'Avaliação' },
  { id: 8, time: '17:00', patient: 'Rafael Mendes', type: 'Acompanhamento' },
  { id: 9, time: '18:00', patient: 'Beatriz Alves', type: 'Terapia' },
  { id: 10, time: '19:00', patient: 'Gabriel Santos', type: 'Avaliação Final' },
];

const Dashboard = () => {
  const [data, setData] = useState(generateMockData());
  const [dateRange, setDateRange] = useState({
    from: subMonths(new Date(), 6),
    to: new Date(),
  });

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setDateRange(range);
    // In a real application, you would fetch new data based on the date range
    setData(generateMockData());
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <DatePickerWithRange
                date={dateRange}
                onDateChange={handleDateRangeChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Atendimentos Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Atendimentos</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="atendimentos" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Pacientes Ativos Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Pacientes Ativos</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="pacientes" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Faturamento Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Faturamento (R$)</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="faturamento" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Today's Events */}
            <Card>
              <CardHeader>
                <CardTitle>Eventos de Hoje</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {mockEvents.map((event) => (
                    <div
                      key={event.id}
                      className="py-3 flex justify-between items-center"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-500">
                          {event.time}
                        </span>
                        <span className="font-medium">{event.patient}</span>
                      </div>
                      <span className="text-sm text-gray-500">{event.type}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;