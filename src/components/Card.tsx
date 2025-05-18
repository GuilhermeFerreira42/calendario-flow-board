
import React from 'react';
import { Card as CardType } from '@/types';
import { Card as UICard } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useBoardStore } from '@/store/BoardStore';
import { toast } from '@/components/ui/sonner';

interface CardProps {
  card: CardType;
}

const Card = ({ card }: CardProps) => {
  const { updateCard, deleteCard } = useBoardStore();
  
  const handleDelete = () => {
    deleteCard(card.id);
    toast.success('Cartão excluído com sucesso');
  };
  
  const toggleStatus = () => {
    const newStatus = card.status === 'pending' ? 'completed' : 'pending';
    updateCard(card.id, { status: newStatus });
  };
  
  return (
    <UICard className="p-3 bg-white shadow-sm hover:shadow cursor-pointer">
      <div className="flex justify-between">
        <h3 className="font-medium text-sm">{card.title}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="-mr-2 h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={toggleStatus}>
              {card.status === 'pending' ? 'Marcar como concluído' : 'Marcar como pendente'}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className="text-red-500">
              <Trash className="h-4 w-4 mr-2" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {card.description && (
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
          {card.description}
        </p>
      )}
      
      {card.status === 'completed' && (
        <div className="mt-2 text-xs text-green-500 flex items-center">
          Concluído
        </div>
      )}
    </UICard>
  );
};

export default Card;
