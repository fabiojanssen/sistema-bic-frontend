import { Home, Users, Calendar, FileText, Settings, ClipboardCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Users, label: 'Pacientes', href: '/patients' },
  { icon: Calendar, label: 'Agenda', href: '/calendar' },
  { icon: ClipboardCheck, label: 'Resultados de Avaliação', href: '/assessment-results' },
  { icon: FileText, label: 'Relatórios', href: '/reports' },
  { icon: Settings, label: 'Configurações', href: '/settings' },
];

export const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg text-neutral-dark",
                  "hover:bg-primary hover:bg-opacity-10 hover:text-primary-dark",
                  "transition-colors duration-200"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};