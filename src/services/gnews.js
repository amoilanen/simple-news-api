const axios = require('axios');

const GNEWS_HOST = 'https://gnews.io';
const API_KEY = process.env['GNEWS_API_KEY'];

const DEFAULT_ARTICLES_PARAMS = {
  category: 'general',
  lang: 'en',
  country: 'us',
  limit: 10
}

function parseArticlesFromResponse(response) {
  return response.data.articles.map(article => ({
    title: article.title,
    url: article.url
  }));
}

async function fetchTopArticles({lang, category, limit} = DEFAULT_ARTICLES_PARAMS) {
  category = category || DEFAULT_ARTICLES_PARAMS.category;
  lang = lang || DEFAULT_ARTICLES_PARAMS.lang;
  limit = limit || DEFAULT_ARTICLES_PARAMS.limit;
  const response = await axios.get(`${GNEWS_HOST}/api/v4/top-headlines`, {
    params: {
      lang, category, max: limit, apikey: API_KEY
    }
  });
  return parseArticlesFromResponse(response);
}

async function searchArticles(searchTerm, {lang, country, limit} = DEFAULT_ARTICLES_PARAMS) {
  lang = lang || DEFAULT_ARTICLES_PARAMS.lang;
  limit = limit || DEFAULT_ARTICLES_PARAMS.limit;
  country = country || DEFAULT_ARTICLES_PARAMS.country;
  const response = await axios.get(`${GNEWS_HOST}/api/v4/search`, {
    params: {
      q: searchTerm, lang, country, max: limit, apikey: API_KEY
    }
  });
  return parseArticlesFromResponse(response);
}

module.exports = {
  fetchTopArticles,
  searchArticles
};