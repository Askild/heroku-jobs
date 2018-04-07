const request = require('request');

console.log('process.env.PING_URLS', process.env.PING_URLS);

const dummyUrl = 'https://www.ulv.no';

const urls = process.env.PING_URLS ? process.env.PING_URLS.split(',') : [dummyUrl]

function createRequestPromiseForUrl(url) {
  const requestPromise = new Promise((resolve, reject) => {
    try {
      request(url, function (err, response, body) {
        if (err) {
          console.log(new Date(), 'Error getting url ', url, err, response && response.statusCode)
          return reject(err);
        }

        console.log(new Date(), 'Pinged url', url, response.statusCode)
        resolve('ok');
      });
    } catch (e) {
      console.log(new Date(), 'Error thrown getting url ', url, e)
      return reject(err);
    }
  });
  return requestPromise;
}

const promises = urls.map(createRequestPromiseForUrl);

Promise.all(promises).then(() => {
  console.log('End of pinging urls');
  process.exit(0);
})
