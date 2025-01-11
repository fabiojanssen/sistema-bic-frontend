import { Logo } from './Logo';
import { Bell } from 'lucide-react';

export const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5 text-neutral" />
          </button>
        </div>
      </div>
    </header>
  );
};