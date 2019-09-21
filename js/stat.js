'use strict';

window.renderStatistics = function (ctx, names, times) {
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
  var MAX_VALUE_TIMES = Math.max.apply(null, times);

  function sortNames() {
    var indexMyName = names.indexOf('Вы');
    var myName = names.splice(indexMyName, 1)[0];
    var myTime = times.splice(indexMyName, 1)[0];
    names.unshift(myName);
    times.unshift(myTime);
  }

  function getRandomBlueColor() {
    return 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
  }

  sortNames();

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(CLOUD_POSITION_X + 10, CLOUD_POSITION_Y + 10, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = '#fff';
  ctx.fillRect(CLOUD_POSITION_X, CLOUD_POSITION_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.textBaseline = 'top';
  ctx.fillText('Ура вы победили!', CLOUD_POSITION_X + CLOUD_PADDING_LEFT, CLOUD_POSITION_Y + CLOUD_PADDING_BOTTOM_AND_TOP);
  ctx.fillText('Список результатов:', CLOUD_POSITION_X + CLOUD_PADDING_LEFT, CLOUD_POSITION_Y + CLOUD_PADDING_BOTTOM_AND_TOP + TEXT_LINE_HEIGHT);

  for (var i = 0; i < names.length; i++) {
    var resultNumber = Math.round(times[i]);
    var columnHeigth = (GRAPH_HEIGHT * times[i]) / MAX_VALUE_TIMES;
    var columnPositionLeft = CLOUD_POSITION_X + CLOUD_PADDING_LEFT + COLUMN_WIDTH * i + COLUMN_SPACING * i;
    var columnPositionTop = CLOUD_HEIGHT - CLOUD_PADDING_BOTTOM_AND_TOP - columnHeigth - 10;

    ctx.fillStyle = TEXT_COLOR;
    ctx.font = TEXT_FONT;
    ctx.textBaseline = 'bottom';
    ctx.fillText(resultNumber, columnPositionLeft, columnPositionTop - 5);
    ctx.fillText(names[i], columnPositionLeft, CLOUD_HEIGHT - 5);

    if (!i) {
      ctx.fillStyle = COLUMN_COLOR_ME;
    } else {
      ctx.fillStyle = getRandomBlueColor();
    }

    ctx.fillRect(columnPositionLeft, columnPositionTop, COLUMN_WIDTH, columnHeigth);
  }
};
