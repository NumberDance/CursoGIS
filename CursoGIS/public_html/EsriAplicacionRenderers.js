var dependencias = [];
//Dependencias base
dependencias.push("esri/map");
dependencias.push("esri/arcgis/utils");
dependencias.push("esri/layers/FeatureLayer");
dependencias.push("esri/layers/GraphicsLayer");
//Renderers
dependencias.push("esri/symbols/SimpleMarkerSymbol");
dependencias.push("esri/renderers/SimpleRenderer");
dependencias.push("esri/renderers/HeatmapRenderer");
dependencias.push("esri/InfoTemplate");
dependencias.push("esri/dijit/InfoWindow");
dependencias.push("dojo/dom");
dependencias.push("dojo/dom-construct");
//DOJO, no tocar
dependencias.push("dojo/domReady!");


var EsriAplicacionRenderers = function(api)
{
    this.__proto__ = new EsriAplicacion(api);
    this.capa = null;
    
    
    this.cargarCapaDesdeServicio = function(url)
    { 
        this.capa = new this.api.FeatureLayer(url);
        this.mapa.addLayer(this.capa); 
    };
    this.cargarCapaDesdeServicioCampos = function(url,campos)
    { 
        this.capa = new this.api.FeatureLayer(url,{ outFields : campos });
        this.mapa.addLayer(this.capa); 
    };
    
    
    this.renderizarCapaValor = function(campo,minimo,maximo)
    {
        var renderizador = new this.api.SimpleRenderer(new this.api.SimpleMarkerSymbol());
            
        var filtro = {}; 
        filtro["type"] = "sizeInfo";
        filtro["field"] = campo;
        filtro["minSize"] = 5;
        filtro["maxSize"] = 50;
        filtro["minDataValue"] = minimo;
        filtro["maxDataValue"] = maximo;
        renderizador.setVisualVariables([filtro]);
        
        this.capa.setRenderer(renderizador);
    };
    this.renderizarCapaCalor = function(campo,minimo,maximo,intensidad)
    {
        var filtro = {};
        filtro["colors"] = ["rgba(0, 0, 255, 0)","rgb(0, 0, 255)","rgb(255, 0, 255)", "rgb(255, 0, 0)"];
        filtro["blurRadius"] = intensidad;
        filtro["minPixelIntensity"] = minimo;
        filtro["maxPixelIntensity"] = maximo;
        filtro["field"] = campo;
        var renderizador = new this.api.HeatmapRenderer(filtro);
        
        this.capa.setRenderer(renderizador);
    };
    this.renderizarTextoCampo = function(campo,capa)
    {
        var plantilla = new this.api.InfoTemplate();
        plantilla.setTitle("<b>${" + campo + "}</b>");
        plantilla.setContent
        (
            function(grafico) 
            {
                return "<b>${" + campo + "}</b>";
            }
        );
        this.capa.setInfoTemplate(plantilla);
    };
    
    
    this.getCapa = function()
    { return this.capa; };
};


