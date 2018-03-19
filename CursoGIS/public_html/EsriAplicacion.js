var dependencias = [];
//Dependencias base
dependencias.push("esri/map");
dependencias.push("esri/arcgis/utils");
dependencias.push("esri/layers/FeatureLayer");
dependencias.push("esri/layers/GraphicsLayer");
//DOJO, no tocar
dependencias.push("dojo/domReady!");


var EsriAplicacion = function(api)
{    
    this.api = api;
    this.mapa = null;
    
    
    this.cargarMapaOnline = function(id,div)
    { this.mapa = this.api.Utils.createMap(id,div); };
    this.cargarMapaEnBlanco = function(div)
    { this.mapa = new this.api.Map(div,{basemap: "topo",center: [0,0],zoom: 5}); };
    
    
    this.cargarCapaDesdeServicio = function(url)
    { this.mapa.addLayer(new this.api.FeatureLayer(url)); };
    
    
    this.agregarCapaGrafica = function(id)
    {
        var capa = new this.api.GraphicsLayer();
        capa.id = id;
        capa.show();
        
        this.mapa.addLayer(capa);
    };
    
       
    this.getMapa = function()
    { return this.mapa; };
    this.getApi = function()
    { return this.api; };
};