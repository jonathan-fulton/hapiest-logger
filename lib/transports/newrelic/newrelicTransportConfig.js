'use strict';

const VO = require('hapiest-vo');

class NewRelicTransportConfig extends VO {

    /**
     * @returns {boolean}
     */
    get enabled() {return this.get('enabled')}

}

module.exports = NewRelicTransportConfig;
