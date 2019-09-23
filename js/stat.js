'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_POSITION_X = 100;
var CLOUD_POSITION_Y = 10;
var CLOUD_PADDING_LEFT = 40;
var CLOUD_PADDING_BOTTOM_AND_TOP = 15;
var TEXT_LINE_HEIGHT = 20;
var TEXT_COLOR = '#000';
var TEXT_FONT = '16px PT Mono';
var GRAPH_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_SPACING = 50;
var COLUMN_COLOR_ME = 'rgba(255, 0, 0, 1)';

function getRandomBlueColor() {
  return 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
}

function sortNames(names, times) {
  var indexMyName = names.indexOf('Вы');
  var myName = names.splice(indexMyName, 1)[0];
  var myTime = times.splice(indexMyName, 1)[0];
  names.unshift(myName);
  times.unshift(myTime);
}

function cloudRendering(ctx) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(CLOUD_POSITION_X + 10, CLOUD_POSITION_Y + 10, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = '#fff';
  ctx.fillRect(CLOUD_POSITION_X, CLOUD_POSITION_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function textRendering(ctx) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.textBaseline = 'top';
  ctx.fillText('Ура вы победили!', CLOUD_POSITION_X + CLOUD_PADDING_LEFT, CLOUD_POSITION_Y + CLOUD_PADDING_BOTTOM_AND_TOP);
  ctx.fillText('Список результатов:', CLOUD_POSITION_X + CLOUD_PADDING_LEFT, CLOUD_POSITION_Y + CLOUD_PADDING_BOTTOM_AND_TOP + TEXT_LINE_HEIGHT);
}

function graphTimeRendering(ctx, color, font, text, positionX, positionY) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = 'bottom';
  ctx.fillText(text, positionX, positionY - 5);
}

function graphNameRendering(ctx, color, font, text, positionX, positionY) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = 'bottom';
  ctx.fillText(text, positionX, positionY - 5);
}

function graphColumnRendering(ctx, name, positionX, positionY, width, height) {
  if (name === 'Вы') {
    ctx.fillStyle = COLUMN_COLOR_ME;
  } else {
    ctx.fillStyle = getRandomBlueColor();
  }
  ctx.fillRect(positionX, positionY, width, height);
}

function graphRendering(index, ctx, maxValueTimes, namesCopy, timesCopy) {
  var resultNumber = Math.round(timesCopy[index]);
  var columnHeigth = (GRAPH_HEIGHT * timesCopy[index]) / maxValueTimes;
  var columnPositionLeft = CLOUD_POSITION_X + CLOUD_PADDING_LEFT + COLUMN_WIDTH * index + COLUMN_SPACING * index;
  var columnPositionTop = CLOUD_HEIGHT - CLOUD_PADDING_BOTTOM_AND_TOP - columnHeigth - 10;
  graphTimeRendering(ctx, TEXT_COLOR, TEXT_FONT, resultNumber, columnPositionLeft, columnPositionTop);
  graphNameRendering(ctx, TEXT_COLOR, TEXT_FONT, namesCopy[index], columnPositionLeft, CLOUD_HEIGHT);
  graphColumnRendering(ctx, namesCopy[index], columnPositionLeft, columnPositionTop, COLUMN_WIDTH, columnHeigth);
}

window.renderStatistics = function (ctx, names, times) {
  var maxValueTimes = Math.max.apply(null, times);
  var namesCopy = names.concat();
  var timesCopy = times.concat();

  sortNames(namesCopy, timesCopy);
  cloudRendering(ctx);
  textRendering(ctx);

  for (var i = 0; i < namesCopy.length; i++) {
    graphRendering(i, ctx, maxValueTimes, namesCopy, timesCopy);
  }
};
