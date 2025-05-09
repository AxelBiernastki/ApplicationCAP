sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'fiori/elements/axel/fioriaxel/test/integration/FirstJourney',
		'fiori/elements/axel/fioriaxel/test/integration/pages/pessoaList',
		'fiori/elements/axel/fioriaxel/test/integration/pages/pessoaObjectPage'
    ],
    function(JourneyRunner, opaJourney, pessoaList, pessoaObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('fiori/elements/axel/fioriaxel') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThepessoaList: pessoaList,
					onThepessoaObjectPage: pessoaObjectPage
                }
            },
            opaJourney.run
        );
    }
);