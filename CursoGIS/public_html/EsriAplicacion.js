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
    this.capa = null, this.grafica = null;
    
    
    this.cargarMapaOnline = function(id,div)
    { this.mapa = this.api.Utils.createMap(id,div); };
    this.cargarMapaEnBlanco = function(div)
    { this.mapa = new this.api.Map(div,{basemap: "topo",center: [0,0],zoom: 5}); };
    
    
    this.cargarCapaDesdeServicio = function(url)
    { 
        this.mapa.removeLayer(this.capa);
        this.capa = new this.api.FeatureLayer(url);
        
        this.mapa.addLayer(this.capa); 
    };
    this.cargarCapaDesdeServicioCampos = function(url,campos)
    { 
        this.mapa.removeLayer(this.capa);
        this.capa = new this.api.FeatureLayer(url,{ outFields : campos });
        
        this.mapa.addLayer(this.capa);
    };
    
    
    this.agregarCapaGrafica = function()
    {
        this.grafica = new this.api.GraphicsLayer();
        this.grafica.show();
        
        this.mapa.addLayer(this.grafica);
    };
    
       
    this.getMapa = function()
    { return this.mapa; };
    this.getApi = function()
    { return this.api; };
    
    
    this.setMapa = function(mapa)
    { this.mapa = mapa; };
    this.setApi = function(api)
    { this.api = api; };
};