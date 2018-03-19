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
//Aplicación de queries
dependencias.push("esri/tasks/query");
dependencias.push("esri/tasks/QueryTask");
//DOJO, no tocar
dependencias.push("dojo/domReady!");


var EsriAplicacionQueries = function(api)
{
    this.__proto__ = new EsriAplicacionPuntos(api);
    
    
    this.consultarAServicio = function(campos)
    {
        
        /*var tarea = new this.api.QueryTask(direccion);
        
        var consulta = new this.api.Query();
        consulta.outSpatialReference = this.mapa.spatialReference;
        consulta.returnGeometry = true;
        consulta.outFields = campos;
        
        tarea.execute(consulta, function(respuestas) { console.log("Hola" + respuestas.length); });//aplicacion.procesarRespuesta(aplicacion,respuestas); });*/
    };
    this.procesarRespuesta = function(aplicacion,respuestas)
    {
        var simbolo = new aplicacion.api.SimpleMarkerSymbol("STYLE_CIRCLE",10,null,new aplicacion.api.Color("#ff6600"));
        console.log(respuestas);
        for(var respuesta in respuestas.features)
        { 
            respuesta.setSymbol(simbolo);
            aplicacion.mapa.graphics.add(respuesta); 
        }
    };
};