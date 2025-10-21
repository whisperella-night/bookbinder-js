/**
 * @overview Configuration schema used throughout the app to enforce clean data and type safety, along with . *(Makes use of NodeJS's Zod library, a "TypeScript-first schema declaration and validation library", used to enforce type safety in an environment like JS.)*
 * @license MPL-2.0 (a copy of the MPL can be obtained at https://mozilla.org/MPL/2.0/)
 * 
 * @module configuration
 * @exports {schema, defaultConfig}
 */

import { z, ZodObject, ZodType } from 'zod';
import { PAGE_SIZES } from '../constants';
import { ZodOptional } from 'zod/v4';


/**
 * Catch-all type definition for a dynamic Zod object.
 * @typedef {z.ZodObject<any>} ZodObject
 */

/**
 * Catch-all type definition for a dynamic Zod type.
 * @typedef {z.ZodType<any>} ZodType
 */

/**
 * Catch-all type definition for a dynamic, optional Zod type.
 * @typedef {z.ZodOptional<any>} ZodOptional
 */


/**
 * Wrapper function to allow a Zod schema to accept undefined values for URL safety.
 * @function urlSafe
 * 
 * @param {ZodType} schema - Zod schema to wrap.
 * 
 * @returns {ZodOptional}
 */
const urlSafe = (schema) => schema.optional().catch(() => undefined);


/**
 * Coerced list of numbers from either a comma-separated string, or an array of numbers.
 * @constant {ZodType<number[]>} commaSeparatedNumberList
 */
const commaSeparatedNumberList = z
  .union([z.string(), z.array(z.number())])
  .transform((val) => {
    if (Array.isArray(val)) {
      return val;
    }

    return val.split(/, */);
  })
  .pipe(z.array(z.coerce.number()));

/**
 * Coerced boolean from potential inputs of 'true', 'false', 'on', and actual booleans.
 * @constant {ZodType<boolean>} coercedBoolean
 */
const coercedBoolean = z
  .union([
    z
      .string()
      .toLowerCase()
      .pipe(z.enum(['true', 'false', 'on'])),
    z.boolean(),
  ])
  .transform((val) => val === 'true' || val === 'on' || val === true);

/**
 * URL-safe configuration setting, defining the placement of source pages on a sheet of paper. Any adjustments to this are considered "rotations" of the default layout. (*See examples for clarification.*)
 * @constant {ZodType<string>} sourceRotation
 * @default 'none'
 * 
 * @example
 * // sourceRotation = 'none' (default)
 * +-----------+ s +-----------+
 * | Lorem ips | p | Lorem ips |
 * |           | i |           |
 * |  (pg. 1)  | n |  (pg. 2)  |
 * +-----------+ e +-----------+
 * 
 * // sourceRotation = '90cw'
 * +-----------+
 * | Lorem ips |
 * |  (pg. 1)  |
 * +-----------+
 * |   spine   |
 * +-----------+
 * | Lorem ips |
 * |  (pg. 2)  |
 * +-----------+
 */
const sourceRotation = urlSafe(
  z.enum(['none', '90cw', '90ccw', 'out_binding', 'in_binding'])
).default('none');

/**
 * URL-safe configuration setting, defining which sides of a sheet sewing marks should be placed.
 * @constant {ZodType<string>} sewingMarkLocation
 * @default 'all'
 */
const sewingMarkLocation = urlSafe(z.enum(['all', 'only_out', 'only_in', 'in_n_out'])).default(
  'all'
);

/**
 * List of industrial paper sizes, derived from the keys of {@link PAGE_SIZES}.
 * @constant {string[]} availablePaperSizes
 */
const availablePaperSizes = Object.keys(PAGE_SIZES);

/**
 * URL-safe configuration setting, defining the specific paper size to be used for the print file.
 * @constant {ZodType<string>} paperSize
 * @default 'A4'
 */
const paperSize = urlSafe(z.enum([...availablePaperSizes, 'CUSTOM'])).default('A4');

/**
 * URL-safe configuration setting, defining the unit of measurement to show the user while selecting {@link paperSize}.
 * @constant {ZodType<string>} paperSizeUnit
 * @default 'pt'
 */
const paperSizeUnit = urlSafe(z.enum(['pt', 'in', 'cm'])).default('pt');

/**
 * URL-safe configuration setting, defining a user's printer capabilities (i.e. single-sided or duplex).
 * @constant {ZodType<string>} printerType
 * @default 'duplex'
 */
const printerType = urlSafe(z.enum(['single', 'duplex'])).default('duplex');

/**
 * URL-safe configuration setting, defining the number of pages expected per sheet.
 * @constant {ZodType<string>} pageLayout
 * @default 'folio'
 */
const pageLayout = urlSafe(z.enum(['folio', 'quarto', 'octavo', 'sextodecimo'])).default('folio');

/**
 * URL-safe configuration setting, defining how pages should be scaled to fit the paper size.
 * @constant {ZodType<string>} pageScaling
 * @default 'lockratio'
 */
const pageScaling = urlSafe(z.enum(['centered', 'lockratio', 'stretch'])).default('lockratio');

/**
 * URL-safe configuration setting, defining how pages should be aligned in relation to the spine.
 * @constant {ZodType<string>} pagePositioning
 * @default 'centered'
 */
const pagePositioning = urlSafe(z.enum(['centered', 'binding_aligned'])).default('centered');

/**
 * URL-safe configuration setting, defining the signature format to be used in generating a print file.
 * @constant {ZodType<string>} sigFormat
 * @default 'standardsig'
 */
const sigFormat = urlSafe(
  z.enum([
    'booklet',
    'perfect',
    'standardsig',
    'customsig',
    '1_3rd',
    'A7_2_16s',
    '8_zine',
    'a_3_6s',
    'a9_3_3_4',
    'a_4_8s',
    'a10_6_10s',
  ])
).default('standardsig');

/**
 * URL-safe configuration setting, defining the chosen spacing style expected for "wacky small" signature layouts.
 * @constant {ZodType<string>} wackySpacing
 * @default 'wacky_pack'
 */
const wackySpacing = urlSafe(z.enum(['wacky_pack', 'wacky_gap'])).default('wacky_pack');

/**
 * URL-safe configuration setting, defining which files should be generated with impositioned PDF.
 * @constant {ZodType<string>} printFile
 * @default 'both'
 * 
 * @example
 * // printFile = 'aggregated'
 * generated_output.zip
 * ├── /signatures
 *     ├── signature_1.pdf
 *     ├── ...
 * ├── settings.txt
 * 
 * // printFile = 'signatures'
 * generated_output.zip
 * ├── output.pdf
 * ├── settings.txt
 */
const printFile = urlSafe(z.enum(['aggregated', 'signatures', 'both'])).default('both');


/**
 * Zod schema which defines the app's configuration structure. Utilize while parsing and validating config data.
 * @constant {ZodObject} schema
 * @static
 * 
 * @example
 * // Parsing incoming form data before updating app configuration:
 * schema.parse({
 *    sourceRotation: form.get('source_rotation'),
 *    ...
 * });
 */
export const schema = z.object({
  printFile,
  sourceRotation,
  rotatePage: urlSafe(coercedBoolean).default(false),
  paperSize,
  paperSizeUnit,
  printerType,
  paperRotation90: urlSafe(coercedBoolean).default(false),
  pageLayout,
  cropMarks: urlSafe(coercedBoolean).default(false),
  cutMarks: urlSafe(coercedBoolean).default(false),
  pdfEdgeMarks: urlSafe(coercedBoolean).default(false),
  sigOrderMarks: urlSafe(coercedBoolean).default(false),
  pageScaling,
  pagePositioning,
  mainForeEdgePaddingPt: urlSafe(z.coerce.number()).default(0),
  bindingEdgePaddingPt: urlSafe(z.coerce.number()).default(0),
  topEdgePaddingPt: urlSafe(z.coerce.number()).default(0),
  bottomEdgePaddingPt: urlSafe(z.coerce.number()).default(0),
  sigFormat,
  sigLength: urlSafe(z.coerce.number()).default(4), // Specific to standard
  customSigLength: urlSafe(commaSeparatedNumberList).default(null), // Specific to custom.
  foreEdgePaddingPt: urlSafe(z.coerce.number()).default(0), // specific to wacky small
  wackySpacing, // specific to wacky small
  flyleafs: urlSafe(z.coerce.number()).default(1),

  sewingMarksEnabled: urlSafe(coercedBoolean).default(false),
  sewingMarkLocation,
  sewingMarksMarginPt: urlSafe(z.coerce.number()).default(72),
  sewingMarksAmount: urlSafe(z.coerce.number()).default(3),
  sewingMarksTapeWidthPt: urlSafe(z.coerce.number()).default(36),

  paperSizeCustomWidth: urlSafe(z.coerce.number()).default(0),
  paperSizeCustomHeight: urlSafe(z.coerce.number()).default(0),
});

/**
 * Zod instance meant to hold the app's default configuration values (based on {@link schema}).
 * @constant {ZodObject} defaultConfig
 * @static
 * 
 * @example
 * // Checking if a config has changed from default while constructing a page URL:
 * if (value === defaultConfig[key]) {
 *    urlRepresentation.searchParams.delete(key);
 * }
 */
export const defaultConfig = schema.parse({});