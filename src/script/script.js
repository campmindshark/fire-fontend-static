const a = [1, 2, 3]
console.log('checking sourcemap')
console.log(...a)

import jQuery from "jquery"
window.$ = window.jQuery = jQuery

var FireController = require('./api/api-wrapper');
var signfireFireController = new FireController(require('../../config').sign_ip);
var eyefireFireController = new FireController(require('../../config').eyefire_ip);

function buildOutletButtons(container, parts) {
  parts.forEach(function(part, index) {
    var li = $('<li></li>'),
      btn = $('<button></button>');
      console.log(index, part);
      btn.data('part_id', part.id);
      btn.data('part_name', part.name);
      btn.text(part.name);

      li.html(btn);

      $(container).append(li);
  });
}

function buildSwitches(container, parts) {
  parts.forEach(function(part, index) {
    var li = $('<li></li>'),
      switchInput = $('<label class="switch"></label>'),
      label = $('<span class="switch-label"></span>');

      switchInput.html('<input type="checkbox" data-part_name="' + part.name + '" data-part_id="' + part.id + '"><span class="slider round"></span></input>');

      label.text(part.name);

      li.append(label);
      li.append(switchInput);

      $(container).append(li);
  });
}

function filterPartsByType(parts, targetType) {
    return parts.filter(function(part) {
      return part.type == targetType;
    });
}

$(window).on("load", function() {

  var loaded = signfireFireController.loadConfigFromBeaglebone();
  var loaded2 = eyefireFireController.loadConfigFromBeaglebone();

  loaded.done(function() {
    var signContainer = $('#signfire');
    buildOutletButtons(signContainer.find('ul.outlets'), filterPartsByType(signfireFireController.getParts(), 'outlet'));
    buildSwitches(signContainer.find('ul.pilots'), filterPartsByType(signfireFireController.getParts(), 'pilot'));

    buildSwitches(signContainer.find('ul.ignitors'), filterPartsByType(signfireFireController.getParts(), 'ignitor'));

    signfireFireController.enableAllParts()
  });

  loaded2.done(function() {
    var eyefireContainer = $('#eyefire');
    buildOutletButtons(eyefireContainer.find('ul.outlets'), filterPartsByType(eyefireFireController.getParts(), 'outlet'));
    buildSwitches(eyefireContainer.find('ul.pilots'), filterPartsByType(eyefireFireController.getParts(), 'pilot'));

    buildSwitches(eyefireContainer.find('ul.ignitors'), filterPartsByType(eyefireFireController.getParts(), 'ignitor'));

    eyefireFireController.enableAllParts()
  });

  // loaded2.done(function() {
  //   console.log(eyefireFireController);
  // });

  loaded.done(function(controller) {

    // $('#signfire .switch input').change(function() {
    //   if ($(this).is(':checked')) {
    //     signfireFireController.openSolenoid($(this).data('part_id'));
    //   } else {
    //     signfireFireController.closeSolenoid($(this).data('part_id'));
    //   }
    // });
    //
    //
    // $('#signfire .outlet-container button').mousedown(function() {
    //   signfireFireController.openSolenoid($(this).data('part_id'));
    // });
    //
    // $('#signfire .outlet-container button').mouseup(function() {
    //   console.log('mouseup');
    //   signfireFireController.closeSolenoid($(this).data('part_id'));
    // });

    // $('#eyefire .outlet-container button').mousedown(function() {
    //   eyefireFireController.openSolenoid($(this).data('part_id'));
    // });
    //
    // $('#eyefire .outlet-container button').mouseup(function() {
    //   console.log('mouseup');
    //   eyefireFireController.closeSolenoid($(this).data('part_id'));
    // });
  });


});
