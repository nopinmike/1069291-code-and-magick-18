'use strict';

(function () {

  var setupBlock = document.querySelector('.setup');
  var setupUserPic = setupBlock.querySelector('.upload');
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

  function createWizard() {
    var wizard = {};
    wizard.name = window.util.getRandomElementFromArray(window.setup.NAMES) + ' ' + window.util.getRandomElementFromArray(window.setup.SURNAMES);
    wizard.coatColor = window.util.getRandomElementFromArray(window.setup.COAT_COLORS);
    wizard.eyesColor = window.util.getRandomElementFromArray(window.setup.EYES_COLORS);
    return wizard;
  }

  function renderWizard() {
    var wizard = createWizard();
    var wizardElement = similarTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  }

  function changeColorCoat() {
    var randomColor = window.util.getRandomElementFromArray(window.setup.COAT_COLORS);
    wizardCoat.style.fill = randomColor;
    inputWizardCoat.value = randomColor;
  }

  function changeColorEyes() {
    var randomColor = window.util.getRandomElementFromArray(window.setup.EYES_COLORS);
    wizardEyes.style.fill = randomColor;
    inputWizardEyes.value = randomColor;
  }

  function changeColorFireball() {
    var randomColor = window.util.getRandomElementFromArray(window.setup.FIREBALL_COLORS);
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
    var actionFunctions = function () {
      changeColorCoat();
      changeColorEyes();
      changeColorFireball();
    };

    window.util.isEnterEvent(evt, actionFunctions);
  }

  function onEscSetupBlock(evt) {
    if (evt.target !== setupUserName) {
      window.util.isEscEvent(evt, closeSetupBlock);
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
      window.util.isEnterEvent(evt, openSetupBlock);
    });

    buttonCloseSetup.addEventListener('click', closeSetupBlock);

    buttonCloseSetup.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closeSetupBlock);
    });
  }

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < window.setup.WIZARDS_COUNT; i++) {
    fragment.appendChild(renderWizard());
  }

  similarListElement.appendChild(fragment);

  addEventsForSetupBlock();

  setupUserPic.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupBlock.style.top = (setupBlock.offsetTop - shift.y) + 'px';
      setupBlock.style.left = (setupBlock.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          setupUserPic.removeEventListener('click', onClickPreventDefault);
        };

        setupUserPic.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  similar.classList.remove('hidden');
})();
