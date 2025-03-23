import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/header';
import Main from './page/main';
import GuestBook from './page/guestbook';


function App() {
  return (
    <div className="App">
      <Header />
      <div className='ContentsBody'>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="guestbook" element={<GuestBook />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
