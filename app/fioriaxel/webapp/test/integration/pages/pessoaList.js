sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'fiori.elements.axel.fioriaxel',
            componentId: 'pessoaList',
            contextPath: '/pessoa'
        },
        CustomPageDefinitions
    );
});