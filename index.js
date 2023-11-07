const express = require('express');
const app = express();
const { Player } = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <form method="post" action="/postplayer">
      <input type="text" name="name" placeholder="Player Name" required />
      <button type="submit">Add Player</button>
    </form>
  `);
});

app.post('/postplayer', async (req, res) => {
  const { name } = req.body;
  try {
    const player = await Player.create({ name });
    res.redirect('/players');
  } catch (err) {
    res.status(500).send('Failed to add the player.');
  }
});

app.get('/players', async (req, res) => {
  const players = await Player.findAll();
  res.send(JSON.stringify(players, null, 2));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
