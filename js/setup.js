'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var wizards = [];
var setupBlock = document.querySelector('.setup');
var similar = setupBlock.querySelector('.setup-similar');
var similarListElement = similar.querySelector('.setup-similar-list');
var similarTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createWizard() {
  var wizard = {};
  wizard.name = NAMES[getRandomInRange(0, NAMES.length - 1)] + ' ' + SURNAMES[getRandomInRange(0, SURNAMES.length - 1)];
  wizard.coatColor = COAT_COLORS[getRandomInRange(0, COAT_COLORS.length - 1)];
  wizard.eyesColor = EYES_COLORS[getRandomInRange(0, EYES_COLORS.length - 1)];
  return wizard;
}

function renderWizard(wizard) {
  var wizardElement = similarTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}

for (var i = 0; i < 4; i++) {
  wizards.push(createWizard());
}

for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}

similarListElement.appendChild(fragment);
setupBlock.classList.remove('hidden');
similar.classList.remove('hidden');

