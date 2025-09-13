/**
 * @overview Utility functions for managing the local storage of user settings.
 * @license MPL-2.0 (a copy of the MPL can be obtained at https://mozilla.org/MPL/2.0/)
 *
 * @module localStorageUtils
 * @exports { getLocalSettings, setLocalSettings, clearLocalSettings }
 */

/** @constant {string} */
const STORAGE_KEY = 'bookbinderSettings';

/**
 * Grabs local/cached bookbinder settings stored under {@link STORAGE_KEY}. If this key doesn't exist, creates new entry on storage object and sets its value to empty.
 * 
 * @returns {Storage} object (containing an entry for {@link STORAGE_KEY})
 */
export function getLocalSettings() {
  const emptySettings = {};
  const localSettings = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!localSettings) {
    setLocalSettings(emptySettings);
    return getLocalSettings();
  }
  return localSettings;
}

/**
 * Saves provided settings to local storage in entry for {@link STORAGE_KEY}.
 * 
 * @param {Storage} newSettings - various settings to store
 */
export function setLocalSettings(newSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
}

/**
 * Clears user's local storage setting that matches {@link STORAGE_KEY}.
 */
export function clearLocalSettings() {
  localStorage.removeItem(STORAGE_KEY);
}
