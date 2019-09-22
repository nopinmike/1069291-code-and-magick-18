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

window.renderStatistics = function (ctx, names, times) {
  var maxValueTimes = Math.max.apply(null, times);
  var namesCopy = names.concat();
  var timesCopy = times.concat();

  function sortNames() {
    var indexMyName = namesCopy.indexOf('Вы');
    var myName = namesCopy.splice(indexMyName, 1)[0];
    var myTime = timesCopy.splice(indexMyName, 1)[0];
    namesCopy.unshift(myName);
    timesCopy.unshift(myTime);
  }

  function cloudRendering() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(CLOUD_POSITION_X + 10, CLOUD_POSITION_Y + 10, CLOUD_WIDTH, CLOUD_HEIGHT);
    ctx.fillStyle = '#fff';
    ctx.fillRect(CLOUD_POSITION_X, CLOUD_POSITION_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  }

  function textRendering() {
    ctx.fillStyle = TEXT_COLOR;
    ctx.font = TEXT_FONT;
    ctx.textBaseline = 'top';
    ctx.fillText('Ура вы победили!', CLOUD_POSITION_X + CLOUD_PADDING_LEFT, CLOUD_POSITION_Y + CLOUD_PADDING_BOTTOM_AND_TOP);
    ctx.fillText('Список результатов:', CLOUD_POSITION_X + CLOUD_PADDING_LEFT, CLOUD_POSITION_Y + CLOUD_PADDING_BOTTOM_AND_TOP + TEXT_LINE_HEIGHT);
  }

  function graphTimeRendering(color, font, text, positionX, positionY) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = 'bottom';
    ctx.fillText(text, positionX, positionY - 5);
  }

  function graphNameRendering(color, font, text, positionX, positionY) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = 'bottom';
    ctx.fillText(text, positionX, positionY - 5);
  }

  function graphColumnRendering(name, positionX, positionY, width, height) {
    if (name === 'Вы') {
      ctx.fillStyle = COLUMN_COLOR_ME;
    } else {
      ctx.fillStyle = getRandomBlueColor();
    }

    ctx.fillRect(positionX, positionY, width, height);
  }

  function graphRendering(index) {
    var resultNumber = Math.round(timesCopy[index]);
    var columnHeigth = (GRAPH_HEIGHT * timesCopy[index]) / maxValueTimes;
    var columnPositionLeft = CLOUD_POSITION_X + CLOUD_PADDING_LEFT + COLUMN_WIDTH * index + COLUMN_SPACING * index;
    var columnPositionTop = CLOUD_HEIGHT - CLOUD_PADDING_BOTTOM_AND_TOP - columnHeigth - 10;

    graphTimeRendering(TEXT_COLOR, TEXT_FONT, resultNumber, columnPositionLeft, columnPositionTop);
    graphNameRendering(TEXT_COLOR, TEXT_FONT, namesCopy[index], columnPositionLeft, CLOUD_HEIGHT);
    graphColumnRendering(namesCopy[index], columnPositionLeft, columnPositionTop, COLUMN_WIDTH, columnHeigth);
  }

  sortNames();
  cloudRendering();
  textRendering();

  for (var i = 0; i < namesCopy.length; i++) {
    graphRendering(i);
  }
};
