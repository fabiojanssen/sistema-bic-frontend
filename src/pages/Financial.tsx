import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

const COLORS = ['#9b87f5', '#F2FCE2', '#FEC6A1', '#7E69AB'];

const mockTransactions = {
  income: [
    { id: 1, title: 'Consulta João', description: 'Atendimento psicológico', dateCreated: '2024-03-20', dueDate: '2024-03-25', amount: 150, status: 'pago' },
    { id: 2, title: 'Palestra Empresa X', description: 'Palestra sobre saúde mental', dateCreated: '2024-03-18', dueDate: '2024-03-30', amount: 2000, status: 'pendente' },
    { id: 3, title: 'Curso Online', description: 'Curso de desenvolvimento infantil', dateCreated: '2024-03-15', dueDate: '2024-03-28', amount: 500, status: 'pago' },
  ],
  expenses: [
    { id: 1, title: 'Aluguel', description: 'Aluguel do consultório', dateCreated: '2024-03-01', dueDate: '2024-03-10', amount: 2000, status: 'pago' },
    { id: 2, title: 'Energia', description: 'Conta de energia', dateCreated: '2024-03-05', dueDate: '2024-03-15', amount: 300, status: 'pendente' },
    { id: 3, title: 'Material', description: 'Material de escritório', dateCreated: '2024-03-08', dueDate: '2024-03-20', amount: 150, status: 'pago' },
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

const TransactionTable = ({ transactions, title }: { transactions: any[], title: string }) => (
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
          <TableRow key={transaction.id}>
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
  const totalIncome = mockIncomeData.reduce((sum, item) => sum + item.value, 0);
  const totalExpenses = mockExpensesData.reduce((sum, item) => sum + item.value, 0);
  const profit = totalIncome - totalExpenses;

  const profitData = [{ name: 'Lucro', value: profit }];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Financeiro</h1>
      
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
        <TransactionTable transactions={mockTransactions.income} title="Entradas" />
        <TransactionTable transactions={mockTransactions.expenses} title="Saídas" />
      </div>
    </div>
  );
};

export default Financial;