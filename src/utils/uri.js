/**
 * @overview Quick functions for parsing and updating the provided URLs.
 * @license MPL-2.0 (a copy of the MPL can be obtained at {@link https://mozilla.org/MPL/2.0/})
 *
 * @module URI
 * @exports { toUrlParams, setUrlParams, clearUrlParams, updateWindowLocation }
 */

import { defaultConfig } from '../models/configuration';

/**
 * Parses application settings from provided URL, and returns record of key/value pairs containing this info.
 * 
 * @param {string} url - URL to be parsed
 * @returns {Record<string, unknown>} record of imposition settings taken from provided URL
 */
export const toUrlParams = (url) => {
  const params = new URL(url).searchParams.entries();
  return Object.fromEntries(params);
};

/**
 * Adds parameters to provided URL's searchParams (disregarding default values).
 *
 * @param {string} url - URL to be updated
 * @param {Record<string, unknown>} params - key/value record of imposition settings
 * @returns {string} new URL string with appended parameters
 */
export const setUrlParams = (url, params) => {
  const urlRepresentation = new URL(url);

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (value === defaultConfig[key]) {
      urlRepresentation.searchParams.delete(key);
      continue;
    }

    urlRepresentation.searchParams.set(key, String(value));
  }

  return urlRepresentation.toString();
};

/**
 * Clears parameters from provided URL.
 *
 * @param {string} url - URL to be reset
 * @returns {string} updated URL with empty search/query string
 */
export const clearUrlParams = (url) => {
  const urlRepresentation = new URL(url);
  urlRepresentation.search = '';
  return urlRepresentation.toString();
};

/**
 * Updates browser window location to provided URL.
 *
 * @param {string} url - new browser window location
 */
export const updateWindowLocation = (url) => {
  window.history.pushState({}, '', url.toString());
};
