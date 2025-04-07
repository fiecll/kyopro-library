// src/components/FileViewer.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

function FileViewer() {
  const [searchParams] = useSearchParams();
  const filePath = searchParams.get('path');
  const [fileData, setFileData] = useState({ path: '', content: '' });

  useEffect(() => {
    if (filePath) {
      fetch(`http://localhost:5000/api/file?path=${encodeURIComponent(filePath)}`)
        .then(response => response.json())
        .then(data => setFileData(data))
        .catch(err => console.error('Error fetching file:', err));
    }
  }, [filePath]);

  useEffect(() => {
    hljs.highlightAll();
  }, [fileData]);

  return (
    <div>
      <h2>{fileData.path}</h2>
      <pre>
        <code className="cpp">
          {fileData.content}
        </code>
      </pre>
      <p><Link to="/">ファイルツリーに戻る</Link></p>
    </div>
  );
}

export default FileViewer;
