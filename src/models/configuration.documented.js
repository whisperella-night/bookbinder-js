/**
 * Configuration schema and defaults for Bookbinder.
 * Defines the Zod schema for configuration and provides default values.
 * @license MPL-2.0
 */

import { z } from 'zod';
import { PAGE_SIZES } from '../constants';

/**
 * Zod schema for Bookbinder configuration.
 * @type {import('zod').ZodObject}
 */
export const schema = z.object({
	// ...existing code...
});

/**
 * Default configuration object, parsed from schema.
 * @type {Configuration}
 */
export const defaultConfig = schema.parse({});

/**
 * @typedef {import('zod').infer<typeof schema>} Configuration
 */
// ...existing code...
// JSDoc comments will be added and revised in the next step.
