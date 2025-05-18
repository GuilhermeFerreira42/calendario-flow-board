
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Board, List, Card, Settings } from '@/types';

// Generate IDs using the provided function
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
};

interface BoardState {
  boards: Board[];
  activeBoardId: string | null;
  settings: Settings;
  
  // Board actions
  addBoard: (title: string) => void;
  updateBoard: (boardId: string, data: Partial<Board>) => void;
  deleteBoard: (boardId: string) => void;
  setActiveBoard: (boardId: string) => void;
  
  // List actions
  addList: (boardId: string, title: string) => void;
  updateList: (listId: string, data: Partial<List>) => void;
  deleteList: (listId: string) => void;
  moveList: (boardId: string, fromIndex: number, toIndex: number) => void;
  
  // Card actions
  addCard: (listId: string, boardId: string, title: string) => void;
  updateCard: (cardId: string, data: Partial<Card>) => void;
  deleteCard: (cardId: string) => void;
  moveCard: (
    cardId: string, 
    fromListId: string, 
    toListId: string, 
    fromIndex: number, 
    toIndex: number
  ) => void;
  
  // Settings actions
  updateSettings: (settings: Partial<Settings>) => void;
}

// Default settings
const defaultSettings: Settings = {
  theme: 'light',
  scrollOrientation: 'horizontal',
  blockSize: {
    width: 272,
    height: 200,
  },
  autoAdjustBlocks: false,
  editSpreadsheetsInWorkArea: true,
  backgroundImage: null,
  backgroundColor: null,
  autoSaveInterval: 30,
  horizontalBlockAlignment: true,
};

// Default board with example data
const createDefaultBoard = (): Board => ({
  id: generateId(),
  title: 'Pirâmide de Maslow',
  lists: [
    {
      id: generateId(),
      title: 'Necessidades Fisiológicas',
      boardId: 'default-board',
      cards: [
        {
          id: generateId(),
          title: 'Alimentação',
          description: 'Comer alimentos nutritivos e balanceados',
          listId: 'default-list',
          boardId: 'default-board',
          status: 'pending',
        },
        {
          id: generateId(),
          title: 'Hidratação',
          description: 'Beber água regularmente',
          listId: 'default-list',
          boardId: 'default-board',
          status: 'completed',
        },
      ],
    },
    {
      id: generateId(),
      title: 'Segurança',
      boardId: 'default-board',
      cards: [
        {
          id: generateId(),
          title: 'Moradia',
          description: 'Ter uma moradia segura',
          listId: 'default-list-2',
          boardId: 'default-board',
          status: 'pending',
        },
      ],
    },
    {
      id: generateId(),
      title: 'Social',
      boardId: 'default-board',
      cards: [],
    },
    {
      id: generateId(),
      title: 'Estima',
      boardId: 'default-board',
      cards: [],
    },
    {
      id: generateId(),
      title: 'Auto-realização',
      boardId: 'default-board',
      cards: [],
    },
  ],
});

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      boards: [createDefaultBoard()],
      activeBoardId: createDefaultBoard().id,
      settings: defaultSettings,
      
      // Board actions
      addBoard: (title: string) =>
        set((state) => {
          const newBoard: Board = {
            id: generateId(),
            title,
            lists: [],
          };
          return {
            boards: [...state.boards, newBoard],
            activeBoardId: newBoard.id,
          };
        }),
        
      updateBoard: (boardId: string, data: Partial<Board>) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId ? { ...board, ...data } : board
          ),
        })),
        
      deleteBoard: (boardId: string) =>
        set((state) => ({
          boards: state.boards.filter((board) => board.id !== boardId),
          activeBoardId:
            state.activeBoardId === boardId
              ? state.boards.length > 1
                ? state.boards.find((board) => board.id !== boardId)?.id || null
                : null
              : state.activeBoardId,
        })),
        
      setActiveBoard: (boardId: string) =>
        set({
          activeBoardId: boardId,
        }),
        
      // List actions
      addList: (boardId: string, title: string) =>
        set((state) => {
          const newList: List = {
            id: generateId(),
            title,
            boardId,
            cards: [],
          };
          
          return {
            boards: state.boards.map((board) =>
              board.id === boardId
                ? { ...board, lists: [...board.lists, newList] }
                : board
            ),
          };
        }),
        
      updateList: (listId: string, data: Partial<List>) =>
        set((state) => ({
          boards: state.boards.map((board) => ({
            ...board,
            lists: board.lists.map((list) =>
              list.id === listId ? { ...list, ...data } : list
            ),
          })),
        })),
        
      deleteList: (listId: string) =>
        set((state) => ({
          boards: state.boards.map((board) => ({
            ...board,
            lists: board.lists.filter((list) => list.id !== listId),
          })),
        })),
        
      moveList: (boardId: string, fromIndex: number, toIndex: number) =>
        set((state) => {
          const board = state.boards.find((b) => b.id === boardId);
          if (!board) return state;
          
          const newLists = [...board.lists];
          const [removedList] = newLists.splice(fromIndex, 1);
          newLists.splice(toIndex, 0, removedList);
          
          return {
            boards: state.boards.map((b) =>
              b.id === boardId ? { ...b, lists: newLists } : b
            ),
          };
        }),
        
      // Card actions
      addCard: (listId: string, boardId: string, title: string) =>
        set((state) => {
          const newCard: Card = {
            id: generateId(),
            title,
            description: '',
            listId,
            boardId,
            status: 'pending',
          };
          
          return {
            boards: state.boards.map((board) => ({
              ...board,
              lists: board.lists.map((list) =>
                list.id === listId
                  ? { ...list, cards: [...list.cards, newCard] }
                  : list
              ),
            })),
          };
        }),
        
      updateCard: (cardId: string, data: Partial<Card>) =>
        set((state) => ({
          boards: state.boards.map((board) => ({
            ...board,
            lists: board.lists.map((list) => ({
              ...list,
              cards: list.cards.map((card) =>
                card.id === cardId ? { ...card, ...data } : card
              ),
            })),
          })),
        })),
        
      deleteCard: (cardId: string) =>
        set((state) => ({
          boards: state.boards.map((board) => ({
            ...board,
            lists: board.lists.map((list) => ({
              ...list,
              cards: list.cards.filter((card) => card.id !== cardId),
            })),
          })),
        })),
        
      moveCard: (
        cardId: string,
        fromListId: string,
        toListId: string,
        fromIndex: number,
        toIndex: number
      ) =>
        set((state) => {
          // Find the board containing the lists
          const board = state.boards.find((board) =>
            board.lists.some((list) => list.id === fromListId || list.id === toListId)
          );
          
          if (!board) return state;
          
          // Find the lists
          const fromList = board.lists.find((list) => list.id === fromListId);
          const toList = board.lists.find((list) => list.id === toListId);
          
          if (!fromList || !toList) return state;
          
          // Clone the cards arrays
          const newFromCards = [...fromList.cards];
          const newToCards = fromListId === toListId ? newFromCards : [...toList.cards];
          
          // Get the card being moved
          const [movedCard] = newFromCards.splice(fromIndex, 1);
          
          // Update the card's listId if moving between lists
          const updatedCard = fromListId === toListId 
            ? movedCard 
            : { ...movedCard, listId: toListId };
            
          // Insert the card at the new position
          newToCards.splice(toIndex, 0, updatedCard);
          
          return {
            boards: state.boards.map((b) =>
              b.id === board.id
                ? {
                    ...b,
                    lists: b.lists.map((list) => {
                      if (list.id === fromListId) {
                        return { ...list, cards: newFromCards };
                      }
                      if (list.id === toListId && fromListId !== toListId) {
                        return { ...list, cards: newToCards };
                      }
                      return list;
                    }),
                  }
                : b
            ),
          };
        }),
        
      // Settings actions
      updateSettings: (settings: Partial<Settings>) =>
        set((state) => ({
          settings: { ...state.settings, ...settings },
        })),
    }),
    {
      name: 'calendario-storage',
    }
  )
);
