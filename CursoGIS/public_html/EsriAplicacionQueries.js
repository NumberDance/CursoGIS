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
dependencias.push("esri/tasks/FeatureSet");
dependencias.push("esri/tasks/Geoprocessor");
//DOJO, no tocar
dependencias.push("dojo/domReady!");


var EsriAplicacionQueries = function(api)
{
    this.__proto__ = new EsriAplicacionPuntos(api);
    this.filtro = null, this.direccion = null;
    this.vista = null;
    this.datos = [];
    
    
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
        console.log(aplicacion.capa.fields);
        //aplicacion.capa.selectFeatures(aplicacion.filtro);
        //console.log(aplicacion.capa.fields);
        var opciones = {};
        opciones["featureLayer"] = aplicacion.capa;
        opciones["map"] = aplicacion.mapa;
        opciones["outFields"] = ["*"];
        
        aplicacion.vista = new aplicacion.api.FeatureTable(opciones,div);
        aplicacion.vista.startup();
    };
    
    
    this.agregarCalculoRutas = function(aplicacion,ruta)
    { 
        this.mapa.on
        (
            "click", 
            function(evento) 
            { 
                var simbolo = new aplicacion.api.SimpleMarkerSymbol("STYLE_CIRCLE",10,null,new aplicacion.api.Color("#ff6600"));
                var punto = new aplicacion.api.Point(evento.mapPoint.x,evento.mapPoint.y,aplicacion.mapa.spatialReference);
                var grafico = new aplicacion.api.Graphic(punto,simbolo);
                
                aplicacion.grafica.add(grafico);
                aplicacion.datos.push(grafico);
                console.log(aplicacion.datos);
            }
        ); 
    };
    this.calculoRutas = function(aplicacion)
    {
        var coleccion = new aplicacion.api.FeatureSet();
        coleccion.features = aplicacion.datos;
        console.log(coleccion.features);
        
        var procesador = new this.api.Geoprocessor("http://sampleserver6.arcgisonline.com/arcgis/rest/services/NetworkAnalysis/SanDiego/GPServer/FindRoutes");
        procesador.submitJob
        (
            { Stops : coleccion,Measurement_Units : "Minutes" },
            function(informacion) { aplicacion.dibujarRutas(aplicacion,informacion); }
        );
    };
    this.dibujarRutas = function(aplicacion,informacion)
    {
        console.log(informacion);
    };
};