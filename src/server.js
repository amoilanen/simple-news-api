const express = require('express');
const { fetchTopArticles, searchArticles } = require('./services/gnews.js');

const app = express();

app.get('/articles', async (req, res) => {
  const query = req.query;
  let articles;
  try {
    if (query.searchTerm) {
      articles = await searchArticles(query.searchTerm, {
        lang: query.lang,
        limit: query.limit
      });
    } else {
      articles = await fetchTopArticles({
        lang: query.lang,
        category: query.category,
        limit: query.limit
      });
    }
    res.json({
      articles
    });
  } catch (error) {
    res.status(error.response.status);
    res.json({
      error: 'Failed to fetch articles'
    })
  }
})

app.get('/', async (_, res) => {
  res.sendFile(__dirname + '/api.yaml');
});

const port = process.env['PORT'] || 3000;
app.listen(port, () => {
  console.log(`Server started on the port: ${port}`)
})