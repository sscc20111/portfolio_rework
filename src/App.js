import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Main from './page/main';
import GuestBook from './page/guestbook';
import TestPage from './page/testpage';


function App() {
  return (
    <div className="App">
      <div className='ContentsBody'>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="guestbook" element={<GuestBook />} />
          <Route path="testpage" element={<TestPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
