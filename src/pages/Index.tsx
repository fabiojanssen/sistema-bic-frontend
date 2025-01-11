import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { PatientList } from '@/components/PatientList';

const Index = () => {
  return (
    <div className="min-h-screen bg-neutral-light">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <PatientList />
        </main>
      </div>
    </div>
  );
};

export default Index;