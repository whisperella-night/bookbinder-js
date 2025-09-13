/**
 * @overview Utilities for handling input and file change events from the user interface.
 * @license MPL-2.0 (a copy of the MPL can be obtained at https://mozilla.org/MPL/2.0/)
 * 
 * @module changeHandlers
 * @exports {handleInputChange, handleFileChange}
 */

import { Book } from '../book';
import { saveForm, updateRenderedForm } from './formUtils';
import {
  updatePaperSelectOptionsUnits,
  updateAddOrRemoveCustomPaperOption,
  clearPreview,
} from './renderUtils';

/**
 * Utility function to update bookbinding configurations based on input change.
 * 
 * @param {Book} book - {@link Book} object whose configuration will be updated
 * @param {HTMLFormElement} bookbinderForm - form element containing new configs
 */
export function handleInputChange(book, bookbinderForm) {
  const formData = new FormData(bookbinderForm);
  const updatedConfiguration = saveForm(formData);
  book.update(updatedConfiguration);
  updateAddOrRemoveCustomPaperOption();
  updatePaperSelectOptionsUnits(); // make sure this goes AFTER the Custom update!
  if (book.inputpdf) {
    updateRenderedForm(book);
  }
}

/**
 * Utility function to update the currently loaded PDF file. Also updates the UI to reflect this new book file.
 * 
 * @param {Event} e - file change event, passed from an event listener
 * @param {Book} book - custom {@link Book} object to be updated
 */
export function handleFileChange(e, book) {
  clearPreview();
  const fileList = e.target.files;
  if (fileList.length > 0) {
    const updated = book.openpdf(fileList[0]);
    updated.then(() => updateRenderedForm(book));
  }
}
