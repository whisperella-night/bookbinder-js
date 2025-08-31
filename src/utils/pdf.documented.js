/**
 * PDF manipulation utilities for Bookbinder.
 * Provides functions for interleaving pages and embedding pages from source PDFs.
 * @license MPL-2.0
 */

import { PDFDocument } from '@cantoo/pdf-lib';

/**
 * Joins two PDFs together, alternating pages from each.
 * Example: pdfA = [1,2,3], pdfB = [A,B,C] → [1,A,2,B,3,C]
 * @param {PDFDocument} pdfA - First PDF document
 * @param {PDFDocument} pdfB - Second PDF document
 * @returns {Promise<PDFDocument>} Merged PDF document with interleaved pages
 */
export async function interleavePages(pdfA, pdfB) {
	// ...existing code...
}

/**
 * Generates a new PDF and embeds the prescribed pages of the source PDF into it.
 * If pageNumbers contains 'b', reconstructs the embedded pages to match their index positions.
 * @param {PDFDocument} sourcePdf - Source PDF document
 * @param {(string|number)[]} [pageNumbers] - Array of page numbers (e.g., [1,5,6,'b',10]) or null for all pages
 * @returns {Promise<[PDFDocument, PDFEmbeddedPage[]]>} PDF with embedded pages and array of embedded page objects
 */
export async function embedPagesInNewPdf(sourcePdf, pageNumbers) {
	// ...existing code...
}
// ...existing code...
// JSDoc comments will be added and revised in the next step.
