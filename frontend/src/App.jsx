// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileTree from './components/FileTree';
import FileViewer from './components/FileViewer';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>競技プログラミングライブラリ ブラウザ</h1>
        <Routes>
          <Route path="/" element={<FileTree />} />
          <Route path="/file" element={<FileViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
