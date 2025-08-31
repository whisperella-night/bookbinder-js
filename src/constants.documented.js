/**
 * Constants for page sizes, layouts, and imposition schemes used throughout Bookbinder.
 * Includes standard sizes, layout definitions, and imposition templates for various binding styles.
 * @license MPL-2.0
 */

/**
 * Page sizes in points (pt), keyed by name.
 * @type {Object<string, number[]>}
 */
export const PAGE_SIZES = {
	// ...existing code...
};

/**
 * Target book sizes for standard and large formats.
 * @type {Object<string, number[]>}
 */
export const TARGET_BOOK_SIZE = {
	// ...existing code...
};

/**
 * Default line length for crop and fold marks (in points).
 * @type {number}
 */
export const LINE_LEN = 18;

/**
 * Layout definitions for folio, quarto, octavo, and sextodecimo impositions.
 * Each layout specifies rotations, orientation, rows, columns, and pages per sheet.
 * @type {Object<string, Object>}
 */
export const PAGE_LAYOUTS = {
	// ...existing code...
};

/**
 * Imposition templates for booklet binding, keyed by pages per sheet.
 * Each template includes front, back, and rotate arrays (1-indexed).
 * @type {Object<number, Object>}
 */
export const BOOKLET_LAYOUTS = {
	// ...existing code...
};

/**
 * Imposition templates for perfect bound books, keyed by pages per sheet.
 * Each template includes front, back, and rotate arrays (1-indexed).
 * @type {Object<number, Object>}
 */
export const PERFECTBOUND_LAYOUTS = {
	// ...existing code...
};

/**
 * Imposition templates for fukurotoji (pouch-binding), keyed by pages per sheet.
 * Each template includes front, back, and rotate arrays (1-indexed).
 * @type {Object<number, Object>}
 */
export const FUKUROTOJI_LAYOUTS = {
	// ...existing code...
};
