// src/components/FileTree.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const renderTree = (node) => {
  if (node.type === "folder") {
    return (
      <li key={node.path}>
        <strong>{node.name}</strong>
        {node.children && (
          <ul>
            {node.children.map(child => renderTree(child))}
          </ul>
        )}
      </li>
    );
  } else if (node.type === "file") {
    return (
      <li key={node.path}>
        <Link to={`/file?path=${encodeURIComponent(node.path)}`}>
          {node.name}
        </Link>
      </li>
    );
  }
};

function FileTree() {
  const [tree, setTree] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/structure')
      .then(response => response.json())
      .then(data => setTree(data))
      .catch(err => console.error('Error fetching structure:', err));
  }, []);

  if (!tree) return <div>Loading...</div>;

  return (
    <div>
      <h2>ファイルツリー</h2>
      <ul>
        {renderTree(tree)}
      </ul>
    </div>
  );
}

export default FileTree;
