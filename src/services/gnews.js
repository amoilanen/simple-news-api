const axios = require('axios');

const GNEWS_HOST = 'https://gnews.io';
const API_KEY = process.env['GNEWS_API_KEY'];

const DEFAULT_ARTICLES_PARAMS = {
  category: 'general',
  lang: 'en',
  limit: 10
}

function parseArticlesFromResponse(response) {
  return response.data.articles.map(article => ({
    title: article.title,
    url: article.url
  }));
}

async function fetchTopArticles({lang, category, limit} = DEFAULT_ARTICLES_PARAMS) {
  category = category || DEFAULT_TOP_ARTICLES_PARAMS.category;
  lang = lang || DEFAULT_TOP_ARTICLES_PARAMS.lang;
  limit = limit || DEFAULT_TOP_ARTICLES_PARAMS.limit;
  try {
    const response = await axios.get(`${GNEWS_HOST}/api/v4/top-headlines`, {
      params: {
        lang, category, max: limit, apikey: API_KEY
      }
    });
    return parseArticlesFromResponse(response);
  } catch (error) {
    //TODO: Handle this error in the server.js
    console.error(error);
  }
}

async function searchArticles(searchTerm, {lang, limit} = DEFAULT_ARTICLES_PARAMS) {
  lang = lang || DEFAULT_TOP_ARTICLES_PARAMS.lang;
  limit = limit || DEFAULT_TOP_ARTICLES_PARAMS.limit;
  try {
    const response = await axios.get(`${GNEWS_HOST}/api/v4/search`, {
      params: {
        q: searchTerm, lang, max: limit, apikey: API_KEY
      }
    });
    return parseArticlesFromResponse(response);
  } catch (error) {
    //TODO: Handle this error in the server.js
    console.error(error);
  }
}