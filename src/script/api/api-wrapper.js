import jQuery from "jquery"
window.$ = window.jQuery = jQuery

class FireController {

  constructor(ip) {
    this.beaglebone_ip = ip;
  }

  loadConfigFromBeaglebone() {
    var self = this;
    return $.get({
      url: this.beaglebone_ip + '/fxs',
      crossDomain: true,
      success: function(res) {
        console.log(res);
        res.parts.forEach(function(part, index) {
          part.id = index;
        });
        self.config = { installation: res };
        return res;
      }
    });
  }



  enableAllParts() {
    var self = this;
    this.getParts().forEach(function(part, index) {
        return $.post(self.beaglebone_ip + '/fxs/', {'fxId':index});
    });
  }

  getParts() {
    return this.config.installation.parts;
  }

  openSolenoid(id) {
    console.log('OPEN_SOLENOID', id);
    return $.post(this.beaglebone_ip + '/fxs/' + id, {'open':1});
  }

  closeSolenoid(id) {
    return $.post(this.beaglebone_ip + '/fxs/' + id, {'open':0});
  }

  triggerSolenoid(id) {
    // $.post({
    //   url: this.config.beaglebone_ip + ''
    // })
    return 'Solenoid fired: ' + id;
  }


}

module.exports = FireController;
