const { sequelize, LeaveRequest } = require('./model');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// Get all leave requests
app.get('/api/requests', async (req, res) => {
  const requests = await LeaveRequest.findAll();
  res.json(requests);
});

// Create a new leave request
app.post('/api/requests', async (req, res) => {
  const newRequest = await LeaveRequest.create({
    name: req.body.name,
    dates: req.body.dates
  });
  res.status(201).json(newRequest);
});

// Approve a request
app.post('/api/requests/:id/approved', async (req, res) => {
  const request = await LeaveRequest.findByPk(req.params.id);
  if (request) {
    request.status = 'Approved';
    await request.save();
    res.json(request);
  } else {
    res.status(404).send('Request not found');
  }
});

// Reject a request
app.post('/api/requests/:id/rejected', async (req, res) => {
  const request = await LeaveRequest.findByPk(req.params.id);
  if (request) {
    request.status = 'Rejected';
    await request.save();
    res.json(request);
  } else {
    res.status(404).send('Request not found');
  }
});

// Start the server after syncing the database
async function startServer() {
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
