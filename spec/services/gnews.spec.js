const axios = require('axios');
jest.mock('axios');
const { fetchTopArticles, searchArticles } = require('../../src/services/gnews.js');

test('fetchTopArticles returns articles',  async () => {
  const axiosResponse = {
     data: {
       articles: [
         {
           title: 'title1',
           url: 'url1',
           content: 'content1'
         },
         {
           title: 'title2',
           url: 'url2',
           content: 'content2'
         },
         {
           title: 'title1',
           url: 'url1',
           content: 'content1'
         }
       ]
     }
   };
  axios.get.mockResolvedValueOnce(axiosResponse);
  const articles = await fetchTopArticles();
  expect(articles).toStrictEqual([
    {
      title: 'title1',
      url: 'url1'
    },
    {
      title: 'title2',
      url: 'url2'
    },
    {
      title: 'title1',
      url: 'url1'
    }
  ]);
});