/**
 * @overview Utilities for handling "Generate PDF Output", "Preview PDF", "Reset Settings", and the checkbox event for "Add marks for sewing:".
 * @license MPL-2.0 (a copy of the MPL can be obtained at https://mozilla.org/MPL/2.0/)
 *
 * @module clickHandlers
 * @exports {handleGenerateClick, handlePreviewClick, handleResetSettingsClick, handleSewingMarksCheckboxState}
 */

import { Book } from '../book';
import { resetForm } from './formUtils';
import {
  clearPreview,
  updateAddOrRemoveCustomPaperOption,
  updatePaperSelectOptionsUnits,
} from './renderUtils';

/**
 * Utility function to generate an imposed PDF from stored {@link Book} object when a user clicks "Generate PDF Output".
 * 
 * @param {HTMLElement} generateEl - "Generate PDF Output" button element
 * @param {Book} book - {@link Book} object with PDF file to be imposed, and configs on how to do so
 */
export function handleGenerateClick(generateEl, book) {
  generateEl.setAttribute('disabled', true);
  generateEl.style.fontSize = '13px';
  generateEl.innerText = 'Generating, this may take a little while...';
  console.log('The whole Book model:', book);
  const result = book.createoutputfiles(false);
  result
    .then(() => {
      console.log('Generated result!');
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      generateEl.removeAttribute('disabled');
      generateEl.style.fontSize = '24px';
      generateEl.innerText = 'Generate PDF Output';
    });
}

/**
 * Utility function to generate UI preview of the to-be-imposed {@link Book} object when a user clicks "Preview PDF".
 * 
 * @param {HTMLElement} previewEl - "Preview PDF" button element
 * @param {Book} book - {@link Book} object with PDF file to be previewed, and configs on how to impose it
 */
export function handlePreviewClick(previewEl, book) {
  previewEl.setAttribute('disabled', true);
  previewEl.innerText = 'Generating Preview...';
  clearPreview();
  const result = book.createoutputfiles(true);
  result
    .then(() => {
      console.log('Preview result!');
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      previewEl.removeAttribute('disabled');
      previewEl.innerText = 'Preview Output';
    });
}

/**
 * Utility function to reset the form to its default settings.
 * 
 * @param {Book} book - {@link Book} object needing to be reset
 */
export function handleResetSettingsClick(book) {
  const defaultConfiguration = resetForm();
  book.update(defaultConfiguration);
  updateAddOrRemoveCustomPaperOption();
  updatePaperSelectOptionsUnits();
}

/**
 * Utility function to handle state change of "Add marks for sewing:" checkbox.
 * 
 * @param {boolean} sewingMarksEnabled - whether sewing marks are enabled
 */
export function handleSewingMarksCheckboxState(sewingMarksEnabled) {
  const sewingMarkDetailsEl = document.getElementById('sewing_marks_details');
  if (sewingMarksEnabled) {
    sewingMarkDetailsEl.setAttribute('open', 0);
  } else {
    sewingMarkDetailsEl.removeAttribute('open');
  }
}
