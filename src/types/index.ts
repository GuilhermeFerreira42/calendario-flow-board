
export interface Board {
  id: string;
  title: string;
  lists: List[];
  backgroundImage?: string;
  backgroundColor?: string;
}

export interface List {
  id: string;
  title: string;
  boardId: string;
  cards: Card[];
}

export interface Card {
  id: string;
  title: string;
  description: string;
  listId: string;
  boardId: string;
  status: 'pending' | 'completed';
  checklists?: ChecklistItem[];
  attachments?: Attachment[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
}

export interface Folder {
  id: string;
  name: string;
  boardIds: string[];
  isExpanded: boolean;
  isPinned: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Settings {
  theme: 'light' | 'dark';
  scrollOrientation: 'horizontal' | 'vertical';
  blockSize: {
    width: number;
    height: number;
  };
  autoAdjustBlocks: boolean;
  editSpreadsheetsInWorkArea: boolean;
  backgroundImage: string | null;
  backgroundColor: string | null;
  autoSaveInterval: number;
  horizontalBlockAlignment: boolean;
}

export type DragItem = {
  id: string;
  type: 'LIST' | 'CARD';
  index: number;
  listId?: string;
  boardId: string;
};
