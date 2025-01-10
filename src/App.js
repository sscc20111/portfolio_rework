import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Main from './page/main';
import GuestBook from './page/guestbook';
import TestPage from './page/testpage';
import TestPage2 from './page/testpage2';


function App() {
  return (
    <div className="App">
      <div className='ContentsBody'>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="guestbook" element={<GuestBook />} />
          <Route path="testpage" element={<TestPage />} />
          <Route path="testpage2" element={<TestPage2 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
