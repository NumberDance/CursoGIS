var dependencias = [];
//Dependencias base
dependencias.push('dojo/_base/declare');
dependencias.push('jimu/BaseWidget');
//Eventos
dependencias.push("dojo/on");
dependencias.push("dojo/dom");
//Graficos
dependencias.push("esri/graphic");
dependencias.push("esri/geometry/Point");
dependencias.push("esri/symbols/SimpleMarkerSymbol");
dependencias.push("esri/Color");
//DOJO, no tocar
dependencias.push("dojo/domReady!");

var abierto = false;

define
(
    dependencias,
    function
    (
        declare,BaseWidget,
        on,dom,
        Graphic,Point,SimpleMarkerSymbol,Color
    ) 
    {
        var clazz = declare
        (
            [BaseWidget], 
            {
                startup : function() 
                {
                    var mapa = this.map, documento = dom;
        
                    mapa.on
                    (
                        "click",
                        function(evento) 
                        { 
                            if(abierto)
                            {
                                var punto = new Point(evento.mapPoint.x,evento.mapPoint.y,mapa.spatialReference);
                                var simbolo = new SimpleMarkerSymbol("STYLE_CIRCLE",10,null,new Color("#ff6600"));
                
                                var grafico = new Graphic(punto,simbolo);
                                mapa.graphics.add(grafico);
                            }
                        }
                    );
                    mapa.on
                    (
                        "zoom",
                        function(evento)
                        {
                            console.log("ESCALA");
                            documento.byId("escala").innerHTML = mapa.getScale();
                        }
                    );
            
                    var actualizar = function(mapa,entradas)
                    {
                        var punto = new Point(entradas[0].value,entradas[1].value,mapa.spatialReference);
                        mapa.centerAt(punto);
                        mapa.setZoom(entradas[2].value);
                    };
    
                    var entradas = [ dom.byId("longitud"),dom.byId("latitud"),dom.byId("zoom") ];
                    on(dom.byId("ir"),"click", function(evento) { actualizar(mapa,entradas); });
                },
                onOpen : function()
                { abierto = true; },
                onClose : function()
                { 
                    this.map.graphics.clear(); 
                    abierto = false;
                }
            }
        );
        
        return clazz;
    }
);