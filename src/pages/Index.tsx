
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Board from '@/components/Board';

const Index = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <Board />
      </div>
    </div>
  );
};

export default Index;
