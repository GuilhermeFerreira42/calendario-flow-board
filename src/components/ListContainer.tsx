
import React, { useState } from 'react';
import { List } from '@/types';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Plus, X } from 'lucide-react';
import { useBoardStore } from '@/store/BoardStore';
import CardComponent from './Card';

interface ListContainerProps {
  list: List;
  boardId: string;
}

const ListContainer = ({ list, boardId }: ListContainerProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  
  const { updateList, deleteList, addCard } = useBoardStore();
  
  const handleUpdateTitle = () => {
    if (newTitle.trim() !== '') {
      updateList(list.id, { title: newTitle });
    }
    setIsEditing(false);
  };
  
  const handleAddCard = () => {
    if (newCardTitle.trim() !== '') {
      addCard(list.id, boardId, newCardTitle);
      setNewCardTitle('');
    }
    setIsAddingCard(false);
  };
  
  return (
    <Card className="list-container shadow-sm bg-gray-50 max-h-full flex flex-col">
      <div className="p-2 flex items-center justify-between border-b">
        {isEditing ? (
          <div className="flex w-full">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={handleUpdateTitle}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleUpdateTitle();
                if (e.key === 'Escape') setIsEditing(false);
              }}
              className="h-8"
              autoFocus
            />
          </div>
        ) : (
          <div
            className="font-medium truncate flex-1 px-1 cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {list.title}
          </div>
        )}
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-1">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-2 list-scrollbar">
        {list.cards.map((card) => (
          <CardComponent key={card.id} card={card} />
        ))}
      </div>
      
      <div className="p-2 border-t">
        {isAddingCard ? (
          <div className="space-y-2">
            <Input
              placeholder="Insira um título para este cartão..."
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddCard();
                if (e.key === 'Escape') setIsAddingCard(false);
              }}
              className="text-sm"
              autoFocus
            />
            <div className="flex space-x-1">
              <Button 
                onClick={handleAddCard} 
                disabled={!newCardTitle.trim()}
                size="sm"
              >
                Adicionar
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsAddingCard(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            className="text-muted-foreground justify-start w-full"
            onClick={() => setIsAddingCard(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Adicionar um cartão
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ListContainer;
