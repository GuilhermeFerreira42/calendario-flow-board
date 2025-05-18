
import React from 'react';
import { Calendar } from 'lucide-react';
import CreateButton from './CreateButton';
import SearchBar from './SearchBar';
import { useBoardStore } from '@/store/BoardStore';

const Header = () => {
  const { activeBoardId, boards } = useBoardStore();
  const activeBoard = boards.find(board => board.id === activeBoardId);
  
  return (
    <header className="h-12 bg-calendario-blue text-white flex items-center px-4 shadow-md">
      <div className="flex items-center">
        <Calendar className="h-5 w-5 mr-2" />
        <span className="font-semibold">Calendário</span>
      </div>
      
      <div className="ml-auto flex items-center space-x-4">
        <SearchBar />
        <CreateButton />
      </div>
    </header>
  );
};

export default Header;
