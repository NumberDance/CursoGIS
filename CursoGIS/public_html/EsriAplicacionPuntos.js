var dependencias = [];
//Dependencias base
dependencias.push("esri/map");
dependencias.push("esri/arcgis/utils");
dependencias.push("esri/layers/FeatureLayer");
dependencias.push("esri/layers/GraphicsLayer");
//Dependencias de puntos
dependencias.push("esri/graphic");
dependencias.push("esri/geometry/Point");
dependencias.push("esri/symbols/SimpleMarkerSymbol");
dependencias.push("esri/Color");
//DOJO, no tocar
dependencias.push("dojo/domReady!");


var EsriAplicacionPuntos = function(api)
{
    this.__proto__ = new EsriAplicacion(api);
    
   
    this.agregarDibujarPuntos = function(id,mapa,api)
    {
        mapa.on
        (
            "click",
            function(evento) 
            {
                var punto = new api.Point(evento.mapPoint.x,evento.mapPoint.y,mapa.spatialReference);
                var simbolo = new api.SimpleMarkerSymbol("STYLE_CIRCLE",10,null,new api.Color("#ff6600"));
                
                var grafico = new api.Graphic(punto,simbolo);
                mapa.getLayer(id).add(grafico);
            }
        );
    };
};

