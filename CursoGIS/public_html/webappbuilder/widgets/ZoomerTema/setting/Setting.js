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
                startup: function()
                { console.log("Se inicia"); },
                destroy: function()
                {
                    this.config["tamano"] = dom.byId("tamano").value;
                    this.config["colorines"] = dom.byId("colorines").value;
                    this.config["estilo"] = dom.byId("estilo").value;
                }
            }
        );
    }
);