using FirstAppSrv as service from '../../srv/service';
annotate service.pessoa with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'nome',
                Value : nome,
            },
            {
                $Type : 'UI.DataField',
                Label : 'cpf',
                Value : cpf,
            },
            {
                $Type : 'UI.DataField',
                Label : 'idade',
                Value : idade,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Nome',
            Value : nome,
        },
        {
            $Type : 'UI.DataField',
            Label : 'CPF',
            Value : cpf,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Idade',
            Value : idade,
        },
    ],
    UI.SelectionFields : [
        cpf,
        nome,
    ],
);

annotate service.pessoa with {
    cpf @(
        Common.Label : 'CPF',
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'pessoa',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : cpf,
                    ValueListProperty : 'cpf'
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'nome'
                },
            ],
        },
        Common.ValueListWithFixedValues : true      
    )
};

annotate service.pessoa with {
    nome @(
        Common.Label : 'Nome',
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'pessoa',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : nome,
                    ValueListProperty : 'nome'
                },
            ],
        },
        Common.ValueListWithFixedValues : true
    )
};

