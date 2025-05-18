
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useBoardStore } from '@/store/BoardStore';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { boards } = useBoardStore();
  
  // Simple search functionality across boards, lists, and cards
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    const results = [];
    
    // Search in boards
    for (const board of boards) {
      if (board.title.toLowerCase().includes(query)) {
        results.push({
          type: 'board',
          id: board.id,
          title: board.title,
          path: `Board: ${board.title}`,
        });
      }
      
      // Search in lists
      for (const list of board.lists) {
        if (list.title.toLowerCase().includes(query)) {
          results.push({
            type: 'list',
            id: list.id,
            boardId: board.id,
            title: list.title,
            path: `Board: ${board.title} > List: ${list.title}`,
          });
        }
        
        // Search in cards
        for (const card of list.cards) {
          if (
            card.title.toLowerCase().includes(query) ||
            card.description.toLowerCase().includes(query)
          ) {
            results.push({
              type: 'card',
              id: card.id,
              boardId: board.id,
              listId: list.id,
              title: card.title,
              path: `Board: ${board.title} > List: ${list.title} > Card: ${card.title}`,
            });
          }
        }
      }
    }
    
    return results.slice(0, 10); // Limit results
  }, [searchQuery, boards]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };
  
  return (
    <Popover open={isOpen && searchResults.length > 0} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-2.5 text-muted-foreground" />
          <Input
            placeholder="Pesquisar..."
            className="pl-9 w-64 bg-white/20 text-white placeholder:text-white/70 border-white/20"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 max-h-80 overflow-y-auto" align="end">
        <div className="py-2">
          {searchResults.map((result) => (
            <div
              key={`${result.type}-${result.id}`}
              className="px-4 py-2 hover:bg-muted cursor-pointer"
              onClick={() => {
                setIsOpen(false);
                // Handle navigation
              }}
            >
              <div className="font-medium">{result.title}</div>
              <div className="text-xs text-muted-foreground">{result.path}</div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchBar;
