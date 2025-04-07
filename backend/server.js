// backend/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS の許可（必要に応じて）
app.use(cors());

// フロントエンドのビルド成果物を静的ファイルとして提供
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

// BASE_DIR はライブラリのルートディレクトリ（kyoprolibrary フォルダ）
const BASE_DIR = path.resolve(__dirname, '../');

// 除外するフォルダ
const EXCLUDE_FOLDERS = ['backend', 'frontend', 'node_modules'];

// 再帰的にディレクトリ構造を取得する関数
function getDirectoryTree(dir) {
  const stats = fs.statSync(dir);
  const name = path.basename(dir);

  if (!stats.isDirectory()) {
    if (!name.endsWith('.cpp')) return null;
    return {
      type: "file",
      path: path.relative(BASE_DIR, dir),
      name: name
    };
  }

  if (EXCLUDE_FOLDERS.includes(name)) return null;

  const children = fs.readdirSync(dir)
    .map(child => getDirectoryTree(path.join(dir, child)))
    .filter(child => child !== null);

  return {
    type: "folder",
    path: path.relative(BASE_DIR, dir),
    name: name,
    children: children
  };
}

// API: ディレクトリ構造の取得
app.get('/api/structure', (req, res) => {
  try {
    const tree = getDirectoryTree(BASE_DIR);
    res.json(tree);
  } catch (err) {
    res.status(500).json({ error: 'ディレクトリ構造の取得に失敗しました' });
  }
});

// API: cpp ファイルの内容取得（拡張子チェックあり）
app.get('/api/file', (req, res) => {
  const relativeFilePath = req.query.path;
  if (!relativeFilePath) return res.status(400).json({ error: 'ファイルパスが指定されていません' });
  const absolutePath = path.join(BASE_DIR, relativeFilePath);
  if (!absolutePath.startsWith(BASE_DIR)) return res.status(403).json({ error: '不正なパスです' });
  if (!absolutePath.endsWith('.cpp')) return res.status(400).json({ error: '対象は cpp ファイルのみです' });
  fs.readFile(absolutePath, 'utf8', (err, data) => {
    if (err) return res.status(404).json({ error: 'ファイルが見つかりません' });
    res.json({ path: relativeFilePath, content: data });
  });
});

// ※ フロントエンドのルーティング対応
// Express 側で上記 API 以外のリクエストはフロントエンドの index.html を返す
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});
