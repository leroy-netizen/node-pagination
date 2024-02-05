const express = require('express');
const app = express();
const port = 3000;

// Sample data
const data = [...Array(50).keys()].map((i) => ({ id: i + 1, name: `Item ${i + 1}` }));

// Endpoint to get paginated data
app.get('/api/items', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = data.slice(startIndex, endIndex);

  res.json({
    page,
    pageSize,
    totalItems: data.length,
    totalPages: Math.ceil(data.length / pageSize),
    data: paginatedData,
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
