
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBoardStore } from '@/store/BoardStore';
import { toast } from '@/components/ui/sonner';

const CreateButton = () => {
  const { addBoard } = useBoardStore();
  
  const handleCreateBoard = () => {
    const boardName = `Novo Quadro ${new Date().toLocaleDateString()}`;
    addBoard(boardName);
    toast.success('Novo quadro criado com sucesso!');
  };
  
  return (
    <Button 
      onClick={handleCreateBoard}
      className="bg-calendario-blue hover:bg-blue-600 text-white flex items-center"
    >
      <Plus className="h-4 w-4 mr-1" />
      Criar Quadro
    </Button>
  );
};

export default CreateButton;
