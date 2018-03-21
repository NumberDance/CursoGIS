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
    this.capa = null;
    
    
    this.cargarCapaDesdeServicio = function(url)
    { 
        this.capa = new this.api.FeatureLayer(url);
        this.mapa.addLayer(this.capa); 
    };
    
    
    this.consultarAServicio = function(aplicacion,id,url,consulta)
    { 
        var filtro = new this.api.Query();
        filtro.where = consulta;
        filtro.outFields = [ "*" ];
        filtro.outSpatialReference = this.mapa.spatialReference;
        filtro.returnGeometry = true;
        filtro.spatialRelationship = this.api.Query.SPATIAL_REL_INTERSECTS;

        var tarea = new this.api.QueryTask(url);
        tarea.execute(filtro,function(resultado) 
        {
            console.log(resultado.features);
            aplicacion.procesarRespuesta(aplicacion,id,resultado.features); });
    };
    this.procesarRespuesta = function(aplicacion,id,respuestas)
    {
        var simbolo = new aplicacion.api.SimpleMarkerSymbol("STYLE_CIRCLE",10,null,new aplicacion.api.Color("#ff6600"));
        
        for(var i = 0; i < respuestas.length; i++)
        { 
            console.log(respuestas[i]);
            var punto = new aplicacion.api.Point(respuestas[i].geometry.x,respuestas[i].geometry.y,aplicacion.mapa.spatialReference);
            var grafico = new api.Graphic(punto,simbolo);
           
            aplicacion.mapa.getLayer(id).add(grafico);
        }
    };
};