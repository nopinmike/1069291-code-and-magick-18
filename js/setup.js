'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupBlock = document.querySelector('.setup');
var similar = setupBlock.querySelector('.setup-similar');
var similarListElement = similar.querySelector('.setup-similar-list');
var similarTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var buttonOpenSetup = document.querySelector('.setup-open');
var buttonCloseSetup = setupBlock.querySelector('.setup-close');
var setupUserName = setupBlock.querySelector('.setup-user-name');
var setupWizard = setupBlock.querySelector('.setup-wizard');
var setupFireballWrap = setupBlock.querySelector('.setup-fireball-wrap');
var inputFireballWrap = setupFireballWrap.querySelector('input[name="fireball-color"]');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var inputWizardCoat = setupBlock.querySelector('input[name="coat-color"]');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var inputWizardEyes = setupBlock.querySelector('input[name="eyes-color"]');

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElementFromArray(array) {
  return array[getRandomInRange(0, array.length - 1)];
}

function createWizard() {
  var wizard = {};
  wizard.name = getRandomElementFromArray(NAMES) + ' ' + getRandomElementFromArray(SURNAMES);
  wizard.coatColor = getRandomElementFromArray(COAT_COLORS);
  wizard.eyesColor = getRandomElementFromArray(EYES_COLORS);
  return wizard;
}

function renderWizard(wizard) {
  var wizardElement = similarTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}

function changeColorCoat() {
  var randomColor = getRandomElementFromArray(COAT_COLORS);
  wizardCoat.style.fill = randomColor;
  inputWizardCoat.value = randomColor;
}

function changeColorEyes() {
  var randomColor = getRandomElementFromArray(EYES_COLORS);
  wizardEyes.style.fill = randomColor;
  inputWizardEyes.value = randomColor;
}

function changeColorFireball() {
  var randomColor = getRandomElementFromArray(FIREBALL_COLORS);
  setupFireballWrap.style.background = randomColor;
  inputFireballWrap.value = randomColor;
}

function onChangeColorWizard(evt) {
  switch (evt.target) {
    case wizardCoat: changeColorCoat();
      break;
    case wizardEyes: changeColorEyes();
      break;
  }
}

function onEnterChangeColorWizard(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    changeColorCoat();
    changeColorEyes();
    changeColorFireball();
  }
}

function onEscSetupBlock(evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== setupUserName) {
    closeSetupBlock();
  }
}

function openSetupBlock() {
  setupBlock.classList.remove('hidden');
  document.addEventListener('keydown', onEscSetupBlock);
  setupWizard.addEventListener('keydown', onEnterChangeColorWizard);
  setupWizard.addEventListener('click', onChangeColorWizard);
  setupFireballWrap.addEventListener('click', changeColorFireball);
}

function closeSetupBlock() {
  setupBlock.classList.add('hidden');
  document.removeEventListener('keydown', onEscSetupBlock);
  setupWizard.removeEventListener('keydown', onEnterChangeColorWizard);
  setupWizard.removeEventListener('click', onChangeColorWizard);
  setupFireballWrap.removeEventListener('click', changeColorFireball);
}

function addEventsForSetupBlock() {
  buttonOpenSetup.addEventListener('click', openSetupBlock);

  buttonOpenSetup.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openSetupBlock();
    }
  });

  buttonCloseSetup.addEventListener('click', closeSetupBlock);

  buttonCloseSetup.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeSetupBlock();
    }
  });
}

function init() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < WIZARDS_COUNT; i++) {
    fragment.appendChild(renderWizard(createWizard()));
  }

  similarListElement.appendChild(fragment);

  addEventsForSetupBlock();

  similar.classList.remove('hidden');
}

init();
