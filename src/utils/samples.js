export const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Go",
  "Java",
  "Rust",
  "C++",
  "PHP",
  "Ruby",
  "SQL",
];

export const SAMPLE_CODE = `const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
app.use(express.json());

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  const query = \`SELECT * FROM users WHERE username = '\${username}'\`;
  const user = await db.query(query);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  if (user.password === password) {
    const token = jwt.sign({ userId: user.id }, 'secret123');
    res.json({ token, user });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/users/:id/data', async (req, res) => {
  const userId = req.params.id;
  const data = await db.query(
    \`SELECT * FROM user_data WHERE user_id = \${userId}\`
  );
  res.json(data);
});

app.listen(3000);
`;
