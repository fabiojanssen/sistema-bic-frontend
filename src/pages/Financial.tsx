import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { format } from "date-fns";

const mockIncomeData = [
  { name: 'Atendimentos', value: 5000 },
  { name: 'Palestras', value: 2000 },
  { name: 'Aulas', value: 1500 },
  { name: 'Cursos', value: 3000 },
];

const mockExpensesData = [
  { name: 'Água', value: 200 },
  { name: 'Energia', value: 300 },
  { name: 'Aluguel', value: 2000 },
  { name: 'Funcionários', value: 4000 },
  { name: 'Outros', value: 500 },
];

interface Transaction {
  id: number;
  title: string;
  description: string;
  dateCreated: string;
  dueDate: string;
  amount: number;
  status: 'pago' | 'pendente';
  type?: 'entrada' | 'saida';
}

const mockTransactions = {
  income: [
    { id: 1, title: 'Consulta João', description: 'Atendimento psicológico', dateCreated: '2024-03-20', dueDate: '2024-03-25', amount: 150, status: 'pago' as const, type: 'entrada' as const },
    { id: 2, title: 'Palestra Empresa X', description: 'Palestra sobre saúde mental', dateCreated: '2024-03-18', dueDate: '2024-03-30', amount: 2000, status: 'pendente' as const, type: 'entrada' as const },
    { id: 3, title: 'Curso Online', description: 'Curso de desenvolvimento infantil', dateCreated: '2024-03-15', dueDate: '2024-03-28', amount: 500, status: 'pago' as const, type: 'entrada' as const },
  ],
  expenses: [
    { id: 1, title: 'Aluguel', description: 'Aluguel do consultório', dateCreated: '2024-03-01', dueDate: '2024-03-10', amount: 2000, status: 'pago' as const, type: 'saida' as const },
    { id: 2, title: 'Energia', description: 'Conta de energia', dateCreated: '2024-03-05', dueDate: '2024-03-15', amount: 300, status: 'pendente' as const, type: 'saida' as const },
    { id: 3, title: 'Material', description: 'Material de escritório', dateCreated: '2024-03-08', dueDate: '2024-03-20', amount: 150, status: 'pago' as const, type: 'saida' as const },
  ],
};

const StatusBadge = ({ status }: { status: string }) => {
  const color = status === 'pago' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const TransactionTable = ({ 
  transactions, 
  title,
  onRowClick 
}: { 
  transactions: Transaction[], 
  title: string,
  onRowClick: (transaction: Transaction) => void 
}) => (
  <Card className="p-4">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Data Cadastro</TableHead>
          <TableHead>Vencimento</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow 
            key={transaction.id}
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => onRowClick(transaction)}
          >
            <TableCell>{transaction.title}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{new Date(transaction.dateCreated).toLocaleDateString('pt-BR')}</TableCell>
            <TableCell>{new Date(transaction.dueDate).toLocaleDateString('pt-BR')}</TableCell>
            <TableCell>R$ {transaction.amount.toFixed(2)}</TableCell>
            <TableCell>
              <StatusBadge status={transaction.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
);

const Financial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateCreated: '',
    dueDate: '',
    amount: '',
    status: 'pendente' as const,
    type: 'entrada' as const
  });

  const totalIncome = mockIncomeData.reduce((sum, item) => sum + item.value, 0);
  const totalExpenses = mockExpensesData.reduce((sum, item) => sum + item.value, 0);
  const profit = totalIncome - totalExpenses;
  const profitData = [{ name: 'Lucro', value: profit }];

  const handleNewTransaction = () => {
    setSelectedTransaction(null);
    setFormData({
      title: '',
      description: '',
      dateCreated: format(new Date(), 'yyyy-MM-dd'),
      dueDate: '',
      amount: '',
      status: 'pendente',
      type: 'entrada'
    });
    setIsModalOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setFormData({
      title: transaction.title,
      description: transaction.description,
      dateCreated: transaction.dateCreated,
      dueDate: transaction.dueDate,
      amount: transaction.amount.toString(),
      status: transaction.status,
      type: transaction.type || 'entrada'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Financeiro</h1>
        <Button onClick={handleNewTransaction}>Novo</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2 text-center">Entradas</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockIncomeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockIncomeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `R$ ${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center font-semibold">Total: R$ {totalIncome.toFixed(2)}</p>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2 text-center">Saídas</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockExpensesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockExpensesData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `R$ ${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center font-semibold">Total: R$ {totalExpenses.toFixed(2)}</p>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2 text-center">Lucro</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={profitData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill={profit >= 0 ? '#4ade80' : '#ef4444'} />
                </Pie>
                <Tooltip formatter={(value) => `R$ ${value}`} />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center font-semibold">Total: R$ {profit.toFixed(2)}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TransactionTable 
          transactions={mockTransactions.income} 
          title="Entradas" 
          onRowClick={handleEditTransaction}
        />
        <TransactionTable 
          transactions={mockTransactions.expenses} 
          title="Saídas" 
          onRowClick={handleEditTransaction}
        />
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedTransaction ? 'Editar Transação' : 'Nova Transação'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Transação</Label>
              <RadioGroup
                value={formData.type}
                onValueChange={(value: 'entrada' | 'saida') => 
                  setFormData({ ...formData, type: value })}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="entrada" id="entrada" />
                  <Label htmlFor="entrada">Entrada</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="saida" id="saida" />
                  <Label htmlFor="saida">Saída</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateCreated">Data de Cadastro</Label>
              <Input
                id="dateCreated"
                type="date"
                value={formData.dateCreated}
                onChange={(e) => setFormData({ ...formData, dateCreated: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Data de Vencimento</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Valor</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pago' | 'pendente' })}
              >
                <option value="pendente">Pendente</option>
                <option value="pago">Pago</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {selectedTransaction ? 'Salvar' : 'Criar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Financial;