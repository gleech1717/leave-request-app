const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

let requests = [];

app.get('/api/requests', (req, res) => {
  res.json(requests);
});

app.post('/api/requests', (req, res) => {
  const newRequest = {
    id: requests.length + 1,
    name: req.body.name,
    dates: req.body.dates,
    status: 'Pending'
  };
  requests.push(newRequest);
  res.status(201).json(newRequest);
});

// Approve a request
app.post('/api/requests/:id/approved', (req, res) => {
  const id = parseInt(req.params.id);
  const request = requests.find(r => r.id === id);
  if (request) {
    request.status = 'Approved';
    res.json(request);
  } else {
    res.status(404).send('Request not found');
  }
});

// Reject a request
app.post('/api/requests/:id/rejected', (req, res) => {
  const id = parseInt(req.params.id);
  const request = requests.find(r => r.id === id);
  if (request) {
    request.status = 'Rejected';
    res.json(request);
  } else {
    res.status(404).send('Request not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
