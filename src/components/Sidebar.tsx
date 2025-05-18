
import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useBoardStore } from '@/store/BoardStore';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { boards, activeBoardId, setActiveBoard, addBoard } = useBoardStore();
  
  const handleAddBoard = () => {
    const boardName = `Novo Quadro ${new Date().toLocaleDateString('pt-BR')}`;
    addBoard(boardName);
  };
  
  return (
    <aside
      className={cn(
        'bg-sidebar border-r border-border h-[calc(100vh-48px)] transition-all duration-300 flex flex-col',
        collapsed ? 'w-12' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-2">
        {!collapsed && <span className="font-medium">Calendário</span>}
        <Button 
          variant="ghost" 
          size="sm" 
          className="ml-auto" 
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <Separator className="my-2" />
      
      <div className="flex items-center justify-between px-4 py-2">
        {!collapsed && <span className="text-sm font-medium">Quadros</span>}
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-1" 
          onClick={handleAddBoard}
          aria-label="Adicionar quadro"
        >
          <Plus size={16} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {boards.map((board) => (
          <Button
            key={board.id}
            variant="ghost"
            className={cn(
              'flex justify-start w-full text-left my-1', 
              collapsed ? 'px-2' : 'px-4',
              activeBoardId === board.id && 'bg-muted'
            )}
            onClick={() => setActiveBoard(board.id)}
          >
            <span className="w-4 h-4 bg-calendario-green rounded mr-2 flex-shrink-0" />
            {!collapsed && (
              <span className="truncate">{board.title}</span>
            )}
          </Button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
