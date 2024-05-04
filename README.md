# simple-news-api

Simple backend service for fetching the articles from GNews API https://gnews.io/

API spec https://github.com/amoilanen/simple-news-api/blob/main/src/api.yaml

### Dev environment setup

1. Make sure you have [node.js](https://nodejs.org/en) installed

2. Install dependencies

```bash
npm install
```

2. Get the API key from https://gnews.io/, set the API key env variable

3. Start the server

```bash
export GNEWS_API_KEY='<insert you API key here>';
npm run start
```

4. Make some requests to test the API

For example using [httpie](https://httpie.io/)

Fetch top 5 articles in the "world" category in the English language:

```bash
http "http://localhost:3000/articles?limit=5&lang=en&category=world"
```

Fetch 5 top search results in English about "iPad":

```bash
http "http://localhost:3000/articles?limit=5&lang=en&searchTerm=iPad"
```

#### Running tests

```
npm run test
```