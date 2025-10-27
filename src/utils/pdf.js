/**
 * @overview Asynchronous helper functions for manipulating PDFs.
 * @license MPL-2.0 (a copy of the MPL can be obtained at {@link https://mozilla.org/MPL/2.0/})
 *
 * @module PDF
 * @exports { interleavePages, embedPagesInNewPdf }
 */

import { PDFDocument, PDFEmbeddedPage } from '@cantoo/pdf-lib';

/**
 * Array/tuple containing a PDFDocument and an array of embedded pages.
 * @typedef PDFDocAndEmbeds
 * @type Array.<{pdf: PDFDocument, embeddedPages: PDFEmbeddedPage[]}>
 * 
 * @property {PDFDocument} pdf - PDF document
 * @property {PDFEmbeddedPage[]} embeddedPages - Array of embedded page objects
 */


/**
 * Joins 2 PDFs together, alternating pages such that if pdfA = [1, 2, 3] and pdfB = [A, B, C], the final pdf is [1, A, 2, B, 3, C].
 * @async
 * 
 * @param {PDFDocument} pdfA - pdf document A
 * @param {PDFDocument} pdfB - pdf document B
 * @returns {PDFDocument} merged pdf document with interleaved pages
 */
export async function interleavePages(pdfA, pdfB) {
  const mergedPdf = await PDFDocument.create();
  const pageCount = Math.max(pdfA.getPageCount(), pdfB.getPageCount());
  const promises = [];

  const pagesAPromise = mergedPdf.copyPages(pdfA, pdfA.getPageIndices());
  const pagesBPromise = mergedPdf.copyPages(pdfB, pdfB.getPageIndices());

  promises.push(pagesAPromise, pagesBPromise);

  const [pagesA, pagesB] = await Promise.all([pagesAPromise, pagesBPromise]);

  for (let i = 0; i < pageCount; i++) {
    if (i < pagesA.length) mergedPdf.addPage(pagesA[i]);
    if (i < pagesB.length) mergedPdf.addPage(pagesB[i]);
  }

  await Promise.all(promises); // Wait for all page retrieval promises to resolve
  return mergedPdf;
}

/**
 * Generates a new PDF & embeds the prescribed pages of the source PDF into it
 * @async
 * 
 * @param {PDFDocument} sourcePdf - source PDF document
 * @param {Array.<(number|string)>} [pageNumbers] - (optional) array of page numbers, in string/number format
 * @return {PDFDocAndEmbeds} newly embedded PDF, and an array of the embedded pages
 *
 * @example
 * // (all pages are embedded)
 * pageNumbers = null
 * 
 * // (pages 2, 3, 4, 7, and 8 are embedded)
 * pageNumbers = [2, 3, 4, 7, 8]
 * 
 * // (reconstructing behavior is triggered to ensure embedded pages are in their correct index positions)
 * pageNumbers = [..., 'b', ...] 
 */
export async function embedPagesInNewPdf(sourcePdf, pageNumbers) {
  const newPdf = await PDFDocument.create();
  const needsReSorting = pageNumbers != null && pageNumbers.includes('b');
  if (pageNumbers == null) {
    pageNumbers = Array.from(Array(sourcePdf.getPageCount()).keys());
  } else {
    pageNumbers = pageNumbers.filter((p) => {
      return typeof p === 'number';
    });
  }
  let embeddedPages = await newPdf.embedPdf(sourcePdf, pageNumbers);
  // what a gnarly little hack. Letting this sit for now --
  //   --- downstream code requires embeds to be in their 'correct' index possition
  //    but we want to only embed half the pages for the aggregate single sides
  //    thus we expand the embedded pages to allow those gaps to return. This is gross & dumb but whatever...
  if (needsReSorting) {
    embeddedPages = embeddedPages.reduce((acc, curVal, curI) => {
      acc[pageNumbers[curI]] = curVal;
      return acc;
    }, []);
  }
  return [newPdf, embeddedPages];
}
