/**
 * @overview Utility functions for drawing fold lines, crop marks, sewing marks, spine marks, and signature order marks on imposed PDFs.
 * @license MPL-2.0 (a copy of the MPL can be obtained at {@link https://mozilla.org/MPL/2.0/})
 * 
 * @module Drawing
 * @exports {drawFoldlines, drawCropmarks, drawSewingMarks, drawSpineMark, drawSigOrderMark}
 */

import { Book } from '../book.js';
import { LINE_LEN } from '../constants';
import { rgb, grayscale, cmyk, ColorTypes } from '@cantoo/pdf-lib';


/**
 * Represents a point in 2D space.
 * @typedef {Object} Point
 * 
 * @property {number} x - horizontal position
 * @property {number} y - vertical position
 * @property {number} [size] - point size
 * @property {(ColorTypes.RGB|ColorTypes.Grayscale|ColorTypes.CMYK)} [color] - color of created point - expressed in either RGB, Grayscale, or CMYK
 */

/**
 * Represents a line between 2 points in 2D space.
 * @typedef {Object} Line
 * 
 * @property {Point} start - start position
 * @property {Point} end - end position
 * @property {number} [thickness] - (optional) line thickness
 * @property {number} [opacity] - (optional) line opacity
 * @property {number[]} [dashArray] - (optional) sequence of dash and gap lengths to be repeated for a dashed line
 */


/**
 * Generates list of folding lines [*for the back page of a sheet*], based on provided imposition parameters.
 * 
 * @param {boolean} side2flag - flag to ensure these folding lines are only printed on the back side of a sheet (*side 2*)
 * @param {boolean} duplexrotate - flag to determine if back side of sheet needs alternative rotation (*i.e. duplex printing while flipping on the long edge*)
 * @param {number[]} papersize - the printing paper's width &times; length, measured in pt
 * @param {number} per_sheet - number of original pages expected on each sheet of paper, front &amp; back
 * 
 * @returns {Line[]}
 */
export function drawFoldlines(side2flag, duplexrotate, papersize, per_sheet) {
  const lineSettings = {
    opacity: 0.4,
    dashArray: [1, 5],
  };
  let x, xStart, xEnd;
  let y, yStart, yEnd;
  const [width, height] = papersize;
  /** @type {Line[]} */
  const lines = [];

  switch (per_sheet) {
    case 32:
      if (side2flag) {
        lineSettings.dashArray = [1, 5];

        x = duplexrotate ? width * 0.75 : width * 0.25;
        yStart = height * 0.5;
        yEnd = duplexrotate ? height * 0.75 : height * 0.25;

        lines.push({ ...drawVLine(x, yStart, yEnd), ...lineSettings });
      }
    /* falls through */
    case 16:
      if (side2flag) {
        lineSettings.dashArray = [3, 5];

        y = duplexrotate ? height * 0.75 : height * 0.25;
        xStart = width * 0.5;
        xEnd = duplexrotate ? 0 : height;

        lines.push({ ...drawHLine(y, xStart, xEnd), ...lineSettings });
      }
    /* falls through */
    case 8:
      if (side2flag) {
        lineSettings.dashArray = [5, 5];

        x = width * 0.5;
        yStart = height * 0.5;
        yEnd = duplexrotate ? 0 : height;

        lines.push({ ...drawVLine(x, yStart, yEnd), ...lineSettings });
      }
    /* falls through */
    case 4:
      if (!side2flag) {
        lineSettings.dashArray = [10, 5];
        lines.push({ ...drawHLine(height * 0.5, 0, width), ...lineSettings });
      }
      break;
  }
  return lines;
}

/**
 * Generates list of crop marks for a sheet, based on provided imposition paramters.
 * 
 * @param {number[]} papersize - the printing paper's width &times; length, measured in pt
 * @param {number} per_sheet - number of original pages expected on each sheet of paper, front &amp; back
 * 
 * @returns {Line[]}
 */
export function drawCropmarks(papersize, per_sheet) {
  /** @type {Array.<Line>} */
  let lines = [];
  const [width, height] = papersize;
  switch (per_sheet) {
    case 32:
      lines = [
        ...lines,
        ...drawHCrop(height * 0.75, 0, width),
        ...drawHCrop(height * 0.25, 0, width),
        ...drawCross(width * 0.5, height * 0.75),
        ...drawCross(width * 0.5, height * 0.25),
      ];
    /* falls through */
    case 16:
      lines = [
        ...lines,
        ...drawVCrop(width * 0.5, 0, height),
        ...drawCross(width * 0.5, height * 0.5),
      ];
    /* falls through */
    case 8:
      lines = [...lines, ...drawHCrop(height * 0.5, 0, width)];
    /* falls through */
    case 4:
  }

  return lines;
}

/**
 * Generates list of points representing where on a 2-page spread to draw sewing marks, based on provided signature and page positioning info.
 * 
 * @param {Book.PageInfo} sigDetails - information on the overall signature, and where the current page resides in its sequence of pages
 * @param {Book.Position} position - information on the current page's positioning on a sheet of paper (*coordinates denoted in pt*)
 * @param {string} sewingMarkLocation - configuration which determines whether sewing marks for this page's signature should be drawn along the spine (***only_out***), in the innermost 2-page spread (***only_in***), on both (***in_n_out***), or across *every* 2-page spread (***all***)
 * @param {number} amount - number of sewing points to be added
 * @param {number} marginPt - required distance between the page's edges and first/last sewing marks (*measured in pt*)
 * @param {number} tapeWidthPt - width of bookbinding tape that the sewing marks are meant to encase (*measured in pt*)
 * 
 * @returns {Point[]}
 */
export function drawSewingMarks(
  sigDetails,
  position,
  sewingMarkLocation,
  amount,
  marginPt,
  tapeWidthPt
) {
  // Here normalize coordinates to always think in x an y like this
  // | P        |H|    P |
  // |  A       |E|   A  |
  // |   G      |I|  G   |
  // |    E     |G| E    |
  // |          |T|      |
  // |-POSITION-| |      |

  // Left pages have spine position on the edge :/
  console.log('try to draw');
  if (position.isLeftPage) return [];
  console.log('  on right');

  if (sewingMarkLocation == 'only_out' && !sigDetails.isSigStart) return [];
  console.log('  a');
  if (sewingMarkLocation == 'only_in' && !sigDetails.isSigMiddle) return [];
  console.log('  b');
  if (sewingMarkLocation == 'in_n_out' && !(sigDetails.isSigStart || sigDetails.isSigMiddle))
    return [];
  console.log('  c');

  var arePageRotated = Math.abs(position.rotation) === 90;
  let totalSpineHeight = 0;
  let spinePosition = 0;

  if (arePageRotated) {
    totalSpineHeight = Math.abs(position.spineMarkTop[0] - position.spineMarkBottom[0]);
    spinePosition = position.spineMarkTop[1];
  } else {
    totalSpineHeight = Math.abs(position.spineMarkTop[1] - position.spineMarkBottom[1]);
    spinePosition = position.spineMarkTop[0];
  }

  const workingWidth = totalSpineHeight - 2 * marginPt;
  const spaceBetweenPoints = workingWidth / (amount + 1);

  const sewingPoints = [];
  for (let index = 1; index <= amount; index++) {
    const halfOfTape = tapeWidthPt / 2;
    sewingPoints.push(
      { pointHeight: marginPt + spaceBetweenPoints * index + halfOfTape },
      { pointHeight: marginPt + spaceBetweenPoints * index - halfOfTape }
    );
  }

  const allPoints = [
    { pointHeight: marginPt },
    { pointHeight: totalSpineHeight - marginPt },
    ...sewingPoints,
  ];

  const commonCircleValues = { size: 1, color: grayscale(0.0) };
  const drawablePoints = allPoints.map((point) => {
    point = { ...point, ...commonCircleValues };
    if (arePageRotated) {
      point.y = spinePosition;
      point.x = point.pointHeight + position.spineMarkBottom[0];
    } else {
      point.y = point.pointHeight + position.spineMarkBottom[1];
      point.x = spinePosition;
    }
    return point;
  });

  return drawablePoints;
}

/**
 * Generates a line at either the top or bottom of a 2-page spread, indicateing where the spine should be located.
 * 
 * @param {boolean} draw_top_mark - flag to determine if the line should be drawn at the top (**true**) or bottom (**false**)
 * @param {Book.Position} position - information on the current page's positioning on a sheet of paper (*coordinates denoted in pt*)
 * @param {number} w - expected size of spine mark (*measured in pt*)
 * 
 * @returns {Line}
 */
export function drawSpineMark(draw_top_mark, position, w) {
  let startX, startY, endX, endY;
  if (draw_top_mark) {
    [startX, startY] = position.spineMarkTop;
    [endX, endY] = position.spineMarkTop;
  } else {
    [startX, startY] = position.spineMarkBottom;
    [endX, endY] = position.spineMarkBottom;
  }

  if (position.rotation == 0 || position.rotation == 180) {
    startX -= w / 2;
    endX += w / 2;
  } else {
    startY -= w / 2;
    endY += w / 2;
  }

  const drawLineArgs = {
    start: { x: startX, y: startY },
    end: { x: endX, y: endY },
    thickness: position.rotation == 0 ? 0.5 : 0.25,
    color: rgb(0, 0, 0),
    opacity: 1,
  };

  console.log(' --> draw this: ', drawLineArgs);
  return drawLineArgs;
}

/**
 * Draws a signature order mark on the spine edge of the page.
 * @todo these params should probably be pushed into a config... maybe next time/next pass
 *
 * @param {Book.PageInfo} sigDetails - page info object
 * @param {Book.Position} position - position info object
 * @param {number} maxSigCount - number of total signatures
 * @param {number} w - width of ordering mark, measured in pt
 * @param {number} suggested_h - suggested height of the mark, measured in pt (*can be scaled down to fit all marks between PDF top/bottom*)
 * 
 * @returns {Line}
 */
export function drawSigOrderMark(sigDetails, position, maxSigCount, w, suggested_h) {
  const top = drawSpineMark(true, position, w);
  const bottom = drawSpineMark(false, position, w);

  let x = top.start.x;
  let y = top.start.y;

  const dist = position.rotation == 0 ? top.start.y - bottom.start.y : top.start.x - bottom.start.x;
  let h = Math.min(suggested_h, dist / maxSigCount);
  const offset = h * sigDetails.signatureNum;
  // console.log("Looking at signature ",sigDetails.signatureNum," of ",maxSigCount," PDF top/bottom distance ",dist," results in ",h," (",suggested_h," vs ",(dist/maxSigCount),") order mark height w/ offset ",offset," (width ",w,")");

  if (position.rotation == 0) {
    h = h * -1;
    y -= offset;
  } else {
    const temp = h;
    h = w;
    w = temp * -1;
    x -= offset;
  }

  return {
    x: x,
    y: y,
    width: w,
    height: h,
    borderWidth: 0,
    color: rgb(0, 0, 0),
    opacity: 0.5,
  };
}


/**
 * Quick helper to generate a vertical line.
 * 
 * @param {number} x - horizontal position of this vertical line
 * @param {number} ystart - starting vertical position
 * @param {number} yend - ending vertical position
 * 
 * @returns {Line}
 */
function drawVLine(x, ystart, yend) {
  return { start: { x: x, y: ystart }, end: { x: x, y: yend } };
}

/**
 * Quick helper to generate a horizontal line.
 * 
 * @param {number} y - vertical position of this horizontal line
 * @param {number} xstart - starting horizontal position
 * @param {number} xend - ending horizontal position
 * 
 * @returns {Line}
 */
function drawHLine(y, xstart, xend) {
  return { start: { x: xstart, y: y }, end: { x: xend, y: y } };
}

/**
 * Quick helper to generate 2 lines which signify where a user should **vertically** crop a sheet of paper. (*Both lines have a height determined by the global {@link LINE_LEN} constant.*)
 * 
 * @param {number} x - horizontal position of both crop marks
 * @param {number} ystart - starting vertical position of first line
 * @param {number} yend - ending vertical position of last line
 * 
 * @returns {Line[]}
 */
function drawVCrop(x, ystart, yend) {
  return [
    { start: { x: x, y: ystart }, end: { x: x, y: ystart + LINE_LEN }, opacity: 0.4 },
    { start: { x: x, y: yend - LINE_LEN }, end: { x: x, y: yend }, opacity: 0.4 },
  ];
}

/**
 * Quick helper to generate 2 lines which signify where a user should **horizontally** crop a sheet of paper. (*Both lines have a width determined by the global {@link LINE_LEN} constant.*)
 * 
 * @param {number} y - vertical position of both crop marks
 * @param {number} xstart - starting horizontal position of first line
 * @param {number} xend - ending horizontal position of last line
 * 
 * @returns {Line[]}
 */
function drawHCrop(y, xstart, xend) {
  return [
    { start: { x: xstart, y: y }, end: { x: xstart + LINE_LEN, y: y }, opacity: 0.4 },
    { start: { x: xend - LINE_LEN, y: y }, end: { x: xend, y: y }, opacity: 0.4 },
  ];
}

/**
 * Quick helper to generate a vertical and horizontal line, whose midpoints intersect at [x, y], creating a crosshair. (*Overall height and width of the crosshair is 2 &times; {@link LINE_LEN}, a global constant.*)
 * 
 * @param {number} x - horizontal position of the crosshair's midpoint
 * @param {number} y - vertical position of the crosshair's midpoint
 * 
 * @returns {Line[]}
 */
function drawCross(x, y) {
  return [
    { start: { x: x - LINE_LEN, y: y }, end: { x: x + LINE_LEN, y: y }, opacity: 0.4 },
    { start: { x: x, y: y - LINE_LEN }, end: { x: x, y: y + LINE_LEN }, opacity: 0.4 },
  ];
}
