/**
 * @overview Constants used throughout the application for page sizes and imposition schemes.
 * @license MPL-2.0 (a copy of the MPL can be obtained at https://mozilla.org/MPL/2.0/)
 * 
 * @module constants
 * @exports {LINE_LEN, PAGE_SIZES, TARGET_BOOK_SIZE, PAGE_LAYOUTS, BOOKLET_LAYOUTS, PERFECTBOUND_LAYOUTS}
 */

/**
 * Specifications for how to impose the pages from a user's uploaded document onto a sheet of paper (front and back).
 * @typedef {Object} ImpositionSpecs
 * 
 * @property {number[][]} rotations - 2D array specifying individual page rotations for each page on a sheet of paper
 * @property {boolean} landscape - whether the individual pages should be in landscape orientation
 * @property {number} rows - number of rows (of individual pages) to be used per page
 * @property {number} cols - number of columns (of individual pages) to be used per page
 * @property {number} per_sheet - total number of pages expected per sheet (rows &times; cols &times; 2)
 */

/**
 * Numerical arrays specifying how the user's input pages should be ordered - on the front, the back, and in a rotated view (i.e. duplex printing with edges flipped on the long-side). For sanity reasons, page numbering will be 1-based: first page is 1, second page is 2, etc.
 * @typedef {Object} PageOrder
 * 
 * @property {number[]} front - page sequence for front of the sheet, placed in the page rows and columns by order of: **left-to-right** &rarr;, **bottom-to-top** &uarr;, starting in the bottom right
 * @property {number[]} back - page sequence for back of the sheet, placed in the page rows and columns by order of: **left-to-right** &rarr;, **bottom-to-top** &uarr;, starting in the bottom right
 * @property {number[]} rotate - array containing a reversed version of the [back]{@link PageOrder.back} sequence array, for use in cases where alternative rotations might be necessary (i.e. duplex printing, flipped on the long-side)
 */


/**
 * Default line length for crop and fold marks (in pt).
 * @constant {number}
 * @static
 */
export const LINE_LEN = 18;

/**
 * List of industry-recognized paper sizes, measured in pt.
 * @constant {Object}
 * @static
 * 
 * @property {number[]} LETTER - 612 &times; 792 (pt)
 * @property {number[]} NOTE - 540 &times; 720 (pt)
 * @property {number[]} LEGAL - 612 &times; 1008 (pt)
 * @property {number[]} TABLOID - 792 &times; 1224 (pt)
 * @property {number[]} EXECUTIVE - 522 &times; 756 (pt)
 * @property {number[]} POSTCARD - 283 &times; 416 (pt)
 * @property {number[]} A0 - 2384 &times; 3370 (pt)
 * @property {number[]} A1 - 1684 &times; 2384 (pt)
 * @property {number[]} A3 - 842 &times; 1191 (pt)
 * @property {number[]} A4 - 595 &times; 842 (pt)
 * @property {number[]} A5 - 420 &times; 595 (pt)
 * @property {number[]} A6 - 297 &times; 420 (pt)
 * @property {number[]} A7 - 210 &times; 297 (pt)
 * @property {number[]} A8 - 148 &times; 210 (pt)
 * @property {number[]} A9 - 105 &times; 148 (pt)
 * @property {number[]} B0 - 2834 &times; 4008 (pt)
 * @property {number[]} B1 - 2004 &times; 2834 (pt)
 * @property {number[]} B2 - 1417 &times; 2004 (pt)
 * @property {number[]} B3 - 1000 &times; 1417 (pt)
 * @property {number[]} B4 - 708 &times; 1000 (pt)
 * @property {number[]} B5 - 498 &times; 708 (pt)
 * @property {number[]} B6 - 354 &times; 498 (pt)
 * @property {number[]} B7 - 249 &times; 354 (pt)
 * @property {number[]} B8 - 175 &times; 249 (pt)
 * @property {number[]} B9 - 124 &times; 175 (pt)
 * @property {number[]} B10 - 87 &times; 124 (pt)
 * @property {number[]} ARCH_E - 2592 &times; 3456 (pt)
 * @property {number[]} ARCH_C - 1296 &times; 1728 (pt)
 * @property {number[]} ARCH_B - 864 &times; 1296 (pt)
 * @property {number[]} ARCH_A - 648 &times; 864 (pt)
 * @property {number[]} FLSA - 612 &times; 936 (pt)
 * @property {number[]} FLSE - 648 &times; 936 (pt)
 * @property {number[]} HALFLETTER - 396 &times; 612 (pt)
 * @property {number[]} _11X17 - 792 &times; 1224 (pt)
 * @property {number[]} ID_1 - 242.65 &times; 153 (pt)
 * @property {number[]} ID_2 - 297 &times; 210 (pt)
 * @property {number[]} ID_3 - 354 &times; 249 (pt)
 * @property {number[]} LEDGER - 1224 &times; 792 (pt)
 * @property {number[]} CROWN_QUARTO - 535 &times; 697 (pt)
 * @property {number[]} LARGE_CROWN_QUARTO - 569 &times; 731 (pt)
 * @property {number[]} DEMY_QUARTO - 620 &times; 782 (pt)
 * @property {number[]} ROYAL_QUARTO - 671 &times; 884 (pt)
 * @property {number[]} CROWN_OCTAVO - 348 &times; 527 (pt)
 * @property {number[]} LARGE_CROWN_OCTAVO - 365 &times; 561 (pt)
 * @property {number[]} DEMY_OCTAVO - 391 &times; 612 (pt)
 * @property {number[]} ROYAL_OCTAVO - 442 &times; 663 (pt)
 * @property {number[]} SMALL_PAPERBACK - 314 &times; 504 (pt)
 * @property {number[]} PENGUIN_SMALL_PAPERBACK - 314 &times; 513 (pt)
 * @property {number[]} PENGUIN_LARGE_PAPERBACK - 365 &times; 561 (pt)
 */
export const PAGE_SIZES = {
  LETTER: [612, 792],
  NOTE: [540, 720],
  LEGAL: [612, 1008],
  TABLOID: [792, 1224],
  EXECUTIVE: [522, 756],
  POSTCARD: [283, 416],
  A0: [2384, 3370],
  A1: [1684, 2384],
  A3: [842, 1191],
  A4: [595, 842],
  A5: [420, 595],
  A6: [297, 420],
  A7: [210, 297],
  A8: [148, 210],
  A9: [105, 148],
  B0: [2834, 4008],
  B1: [2004, 2834],
  B2: [1417, 2004],
  B3: [1000, 1417],
  B4: [708, 1000],
  B5: [498, 708],
  B6: [354, 498],
  B7: [249, 354],
  B8: [175, 249],
  B9: [124, 175],
  B10: [87, 124],
  ARCH_E: [2592, 3456],
  ARCH_C: [1296, 1728],
  ARCH_B: [864, 1296],
  ARCH_A: [648, 864],
  FLSA: [612, 936],
  FLSE: [648, 936],
  HALFLETTER: [396, 612],
  _11X17: [792, 1224],
  ID_1: [242.65, 153],
  ID_2: [297, 210],
  ID_3: [354, 249],
  LEDGER: [1224, 792],
  CROWN_QUARTO: [535, 697],
  LARGE_CROWN_QUARTO: [569, 731],
  DEMY_QUARTO: [620, 782],
  ROYAL_QUARTO: [671, 884],
  CROWN_OCTAVO: [348, 527],
  LARGE_CROWN_OCTAVO: [365, 561],
  DEMY_OCTAVO: [391, 612],
  ROYAL_OCTAVO: [442, 663],
  SMALL_PAPERBACK: [314, 504],
  PENGUIN_SMALL_PAPERBACK: [314, 513],
  PENGUIN_LARGE_PAPERBACK: [365, 561],
};

/**
 * Target book sizes for standard and large formats, measured in pt.
 * @constant {Object}
 * @static
 * 
 * @property {number[]} standard - 314.5 &times; 502.0 (pt)
 * @property {number[]} large - 368.5 &times; 558.5 (pt)
 */
export const TARGET_BOOK_SIZE = {
  standard: [314.5, 502.0],
  large: [368.5, 558.5],
};

/**
 * Collection of {@link ImpositionSpecs} for the folio, quarto, octavo, and sextodecimo layouts, ***not** including how the pages should be ordered.* **(NOTE: Values are based on the degree of rotation a page needs to be imposed on a portrait-oriented page.)**
 * @constant {Object}
 * @static
 * 
 * @property {ImpositionSpecs} folio - 2 pages per side, 4 per sheet
 * @property {ImpositionSpecs} folio_alt - variant of folio, with pages rotated in the opposite direction
 * @property {ImpositionSpecs} quarto - 4 pages per side, 8 per sheet
 * @property {ImpositionSpecs} octavo - 8 pages per side, 16 per sheet
 * @property {ImpositionSpecs} sextodecimo - 16 pages per side, 32 per sheet
 */
export const PAGE_LAYOUTS = {
  folio: {
    rotations: [[-90], [-90]],
    landscape: true,
    rows: 2,
    cols: 1,
    per_sheet: 4,
  },
  folio_alt: {
    rotations: [[90], [90]],
    landscape: true,
    rows: 2,
    cols: 1,
    per_sheet: 4,
  },
  quarto: {
    rotations: [
      [0, 0],
      [-180, -180],
    ],
    landscape: false,
    rows: 2,
    cols: 2,
    per_sheet: 8,
  },
  octavo: {
    rotations: [
      [-90, 90],
      [-90, 90],
      [-90, 90],
      [-90, 90],
    ],
    landscape: true,
    rows: 4,
    cols: 2,
    per_sheet: 16,
  },
  sextodecimo: {
    rotations: [
      [0, 0, 0, 0],
      [-180, -180, -180, -180],
      [0, 0, 0, 0],
      [-180, -180, -180, -180],
    ],
    landscape: false,
    rows: 4,
    cols: 4,
    per_sheet: 32,
  },
};

/**
 * Collection of {@link PageOrder} objects for booklet layouts, indexed by number of pages per sheet (front &plus; back). All layouts assume 1-indexed numbering of pages.
 * @constant {Object} BOOKLET_LAYOUTS
 * @static
 * 
 * @property {PageOrder} 4 - layout for 4 pages per sheet (2 per side)
 * @property {PageOrder} 8 - layout for 8 pages per sheet (4 per side)
 * @property {PageOrder} 16 - layout for 16 pages per sheet (8 per side)
 * @property {PageOrder} 32 - layout for 32 pages per sheet (16 per side)
 */
export const BOOKLET_LAYOUTS = {
  4: {
    front: [3, 2],
    back: [1, 4],
    rotate: [4, 1],
  },
  8: {
    front: [6, 3, 7, 2],
    back: [8, 1, 5, 4],
    rotate: [4, 5, 1, 8],
  },
  16: {
    front: [3, 6, 14, 11, 15, 10, 2, 7],
    back: [1, 8, 16, 9, 13, 12, 4, 5],
    rotate: [5, 4, 12, 13, 9, 16, 8, 1],
  },
  32: {
    front: [30, 3, 6, 27, 19, 14, 11, 22, 18, 15, 10, 23, 31, 2, 7, 26],
    back: [32, 1, 8, 25, 17, 16, 9, 24, 20, 13, 12, 21, 29, 4, 5, 28],
    rotate: [28, 5, 4, 29, 21, 12, 13, 20, 24, 9, 16, 17, 25, 8, 1, 32],
  },
};

/**
 * **Not currently in use within the app - {@link BOOKLET_LAYOUTS} in circulation instead, as they are functionally identical.** Collection of {@link PageOrder} objects for perfect-bound layouts, indexed by number of pages per sheet (front &plus; back). All layouts assume 1-indexed numbering of pages.
 * @constant {Object} PERFECTBOUND_LAYOUTS
 * @static
 * 
 * @property {PageOrder} 4 - layout for 4 pages per sheet (2 per side)
 * @property {PageOrder} 8 - layout for 8 pages per sheet (4 per side)
 * @property {PageOrder} 16 - layout for 16 pages per sheet (8 per side)
 * @property {PageOrder} 32 - layout for 32 pages per sheet (16 per side)
 * 
 * @deprecated 
 */
export const PERFECTBOUND_LAYOUTS = {
  4: {
    front: [3, 2],
    back: [1, 4],
    rotate: [4, 1],
  },
  8: {
    front: [4, 1, 7, 6],
    back: [8, 5, 3, 2],
    rotate: [2, 3, 5, 8],
  },
  16: {
    front: [5, 10, 8, 11, 3, 16, 2, 13],
    back: [1, 14, 4, 15, 7, 12, 6, 9],
    rotate: [9, 6, 12, 7, 15, 4, 14, 1],
  },
  32: {
    front: [8, 5, 10, 11, 27, 26, 21, 24, 32, 29, 18, 19, 3, 2, 13, 16],
    back: [4, 1, 14, 15, 31, 30, 17, 20, 28, 25, 22, 23, 7, 6, 9, 12],
    rotate: [12, 9, 6, 7, 23, 22, 25, 28, 20, 17, 30, 31, 15, 14, 1, 4],
  },
};
