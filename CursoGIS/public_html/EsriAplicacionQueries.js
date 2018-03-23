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
dependencias.push("esri/dijit/FeatureTable");
//DOJO, no tocar
dependencias.push("dojo/domReady!");


var EsriAplicacionQueries = function(api)
{
    this.__proto__ = new EsriAplicacionPuntos(api);
    this.filtro = null, this.direccion = null;
    this.vista = null;
    
    
    this.consultarAServicio = function(aplicacion,direccion,consulta)
    { 
        this.direccion = direccion;
        
        this.filtro = new this.api.Query();
        this.filtro.where = consulta;
        this.filtro.outFields = [ "*" ];
        this.filtro.outSpatialReference = this.mapa.spatialReference;
        this.filtro.returnGeometry = true;
        this.filtro.spatialRelationship = this.api.Query.SPATIAL_REL_INTERSECTS;

        var tarea = new this.api.QueryTask(this.direccion);
        tarea.execute(this.filtro,function(resultado) { aplicacion.procesarRespuesta(aplicacion,resultado.features); });
    };
    this.procesarRespuesta = function(aplicacion,respuestas)
    {
        var simbolo = new aplicacion.api.SimpleMarkerSymbol("STYLE_CIRCLE",10,null,new aplicacion.api.Color("#ff6600"));
        
        for(var i = 0; i < respuestas.length; i++)
        {
            var punto = new aplicacion.api.Point(respuestas[i].geometry.x,respuestas[i].geometry.y,aplicacion.mapa.spatialReference);
            var grafico = new api.Graphic(punto,simbolo);
           
            aplicacion.grafica.add(grafico);
        }
    };
    
    
    this.agregarVistaDatos = function(aplicacion,div)
    {
        aplicacion.capa = new aplicacion.api.FeatureLayer(aplicacion.direccion);
        //console.log(aplicacion.direccion);
        //aplicacion.capa.selectFeatures(aplicacion.filtro);
        //console.log(aplicacion.capa.fields);
        var opciones = {};
        opciones["featureLayer"] = aplicacion.capa;
        opciones["map"] = aplicacion.mapa;
        opciones["outFields"] = ["*"];
        
        aplicacion.vista = new aplicacion.api.FeatureTable(opciones,div);
        aplicacion.vista.startup();
    };
};