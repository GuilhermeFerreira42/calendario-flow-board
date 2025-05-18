
import React from 'react';
import { useBoardStore } from '@/store/BoardStore';
import ListContainer from './ListContainer';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const Board = () => {
  const { boards, activeBoardId, addList } = useBoardStore();
  const activeBoard = boards.find(board => board.id === activeBoardId);
  
  if (!activeBoard) {
    return (
      <div className="flex flex-1 items-center justify-center h-[calc(100vh-48px)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Selecione um quadro</h2>
          <p className="text-muted-foreground">
            Selecione um quadro na barra lateral ou crie um novo
          </p>
        </div>
      </div>
    );
  }
  
  const handleAddList = () => {
    addList(activeBoard.id, 'Nova Lista');
  };
  
  return (
    <div className="flex-1 overflow-hidden bg-slate-100">
      <div className="h-12 px-4 flex items-center border-b bg-white">
        <h2 className="font-semibold text-lg">{activeBoard.title}</h2>
      </div>
      
      <ScrollArea className="h-[calc(100vh-96px)]">
        <div className="p-4">
          <div className="flex space-x-4 min-w-full" style={{ minWidth: '100vw' }}>
            {activeBoard.lists.map((list) => (
              <ListContainer key={list.id} list={list} boardId={activeBoard.id} />
            ))}
            
            <Button
              onClick={handleAddList}
              className="list-container flex items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-500 h-16"
            >
              <Plus className="mr-2 h-5 w-5" />
              Adicionar outra lista
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Board;
