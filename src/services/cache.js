/*
 * For the sake of simplicity naive in-memory cache implementation:
 *  - no expiration of the keys
 *  - the cache is assumed to be always up and running with no failures
 *
 * A better option is to, for example, use an ElastiCache instance and connect to it from cache.js
 */

let cache = {};

async function get(key) {
  return cache[key];
}

async function put(key, value) {
  cache[key] = value;
}

function constructCacheKey(method, params) {
  const paramsSerialization = Object.entries(params)
  .map(([key, value]) => `${key}:${value}`)
  .join(';');
  return `${method};${paramsSerialization}`;
}

async function cached(method, params, f) {
  const cacheKey = constructCacheKey(method, params);
  const cached = await get(cacheKey);
  if (cached !== undefined) {
    return cached;
  } else {
    const value = await f();
    put(cacheKey, value);
    return value;
  }
}

module.exports = {
  cached
};