define
(
    [
        'dojo/_base/declare',
        'jimu/BaseWidgetSetting',
        "dojo/dom"
    ],
    function(declare,BaseWidgetSetting,dom) 
    {
        return declare
        (
            [BaseWidgetSetting], 
            {
                baseclass: 'jimu-widget-dsc-setting',
                onOpen: function ()
                {
                    console.log("TAMANO " + dom.byId("tamano").value);
                    console.log("COLORINES " + dom.byId("colorines").value);
                    console.log("ESTILO " + dom.byId("estilo").value);
                }
            }
        );
    }
);