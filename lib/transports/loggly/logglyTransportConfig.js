'use strict';

const VO = require('hapiest-vo');

class LogglyTransportConfig extends VO {

    /**
     * @returns {boolean}
     */
    get enabled() {return this.get('enabled')}

    /**
     * @returns {error|warn|notice|info|debug}
     */
    get level() {return this.get('level')}

}

module.exports = LogglyTransportConfig;
