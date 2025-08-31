/**
 * Main entry point for Bookbinder web application.
 * Sets up event listeners, initializes configuration, and manages UI interactions for PDF imposition.
 * @license MPL-2.0
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
 * Initializes the Bookbinder UI and event listeners on DOMContentLoaded.
 * Handles form input, file selection, and button actions for generating and previewing PDFs.
 */
window.addEventListener('DOMContentLoaded', () => {
	// ...existing code...
});
