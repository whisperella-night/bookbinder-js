/**
 * @overview This is the main module for the imposition app for bookbinding, creating connections between the UI and various helper JS modules once the DOM is loaded.
 * @license MPL-2.0 (a copy of the MPL can be obtained at {@link https://mozilla.org/MPL/2.0/})
 * 
 * @module Main
 */

import { Book } from './book.js';
import { loadForm } from './utils/formUtils.js';
import { handleFileChange, handleInputChange } from './utils/changeHandlers.js';
import {
  handleGenerateClick,
  handlePreviewClick,
  handleResetSettingsClick,
  handleSewingMarksCheckboxState,
} from './utils/clickHandlers.js';
import { renderPaperSelectOptions } from './utils/renderUtils.js';


/**
 * Event listener to initialize app once DOM is loaded.
 * @listens DOMContentLoaded
 */
window.addEventListener('DOMContentLoaded', () => {
  // render dynamic content
  renderPaperSelectOptions();
  const configuration = loadForm();

  // grab DOM elements
  const generate = document.getElementById('generate');
  const preview = document.getElementById('preview');
  const resetSettings = document.getElementById('reset_settings');
  const bookbinderForm = document.getElementById('bookbinder');
  const fileInput = document.getElementById('input_file');
  const inputs = document.querySelectorAll('input, select');
  const sourceRotation = document.getElementById('source_rotation');
  const sewingMarks = document.getElementById('add_sewing_marks_checkbox');
  const sourceRotationExamples = Array.from(
    document.getElementsByClassName('source_rotation_example')
  );

  /** 
   * @constant {Book} book - {@link Book} instance used to manage the current book being passed to the different event listeners.
   */
  const book = new Book(configuration);

  // add event listeners to grabbed elements
  inputs.forEach((input) => {
    input.addEventListener('change', () => handleInputChange(book, bookbinderForm));
  });
  fileInput.addEventListener('change', (e) => {
    handleFileChange(e, book);
    generate.removeAttribute('disabled');
    preview.removeAttribute('disabled');
  });
  generate.addEventListener('click', () => handleGenerateClick(generate, book));
  preview.addEventListener('click', () => handlePreviewClick(preview, book));
  resetSettings.addEventListener('click', () => {
    console.log('Resetting settings...');
    handleResetSettingsClick(book);
  });
  sourceRotation.addEventListener('change', (e) => {
    const selectedValue = `${e.target.value}_example`;
    sourceRotationExamples.forEach((example) => {
      example.style.display = example.id === selectedValue ? 'flex' : 'none';
    });
  });
  sewingMarks.addEventListener('change', (e) => {
    const willBeEnabled = e.srcElement.checked;
    handleSewingMarksCheckboxState(willBeEnabled);
  });
});
