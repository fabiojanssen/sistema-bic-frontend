import { useState } from 'react';
import { Home, Users, Calendar, FileText, Settings, ClipboardCheck, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from 'react-router-dom';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Users, label: 'Pacientes', href: '/patients' },
  { icon: Calendar, label: 'Agenda', href: '/calendar' },
  { icon: ClipboardCheck, label: 'Resultados de Avaliação', href: '/assessment-results' },
  { icon: DollarSign, label: 'Financeiro', href: '/financial' },
  { icon: FileText, label: 'Relatórios', href: '/reports' },
  { icon: Settings, label: 'Configurações', href: '/settings' },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const SidebarContent = () => (
    <nav className="p-4">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg text-neutral-dark",
                "hover:bg-primary hover:bg-opacity-10 hover:text-primary-dark",
                "transition-colors duration-200"
              )}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="w-full bg-white h-full">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-white border-r border-gray-200 h-screen">
        <SidebarContent />
      </div>
    </>
  );
};
