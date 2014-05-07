window.onload = init; 

function init()
{
    // Longtitude 25' Latitude 57'
    var lon = 25;
    var lat = 57;
    var zoom = 1;
    var map, layer1, layer2, layer3,layer4,layer5;
    //map = new OpenLayers.Map( 'map',{displayProjection: new OpenLayers.Projection("EPSG:3059")} );
    // maxResolution = auto or 0.125
    map = new OpenLayers.Map("map",{maxExtent: new OpenLayers.Bounds(313187.4, 146161.56, 766469.92, 470367.64),maxResolution: '0.125', units: 'meters', projection: "EPSG:3059"});

    layerBackground = new OpenLayers.Layer.MapServer( "Fons", 
            "http://localhost:1025/cgi-bin/mapserv.exe?map=C:/MS4W/ms4w/Apache/htdocs/gis/wfsServer.map", {layers: ['lat_rob_region','lat_kaim_region']},
            {gutter: 15},{isBaseLayer: true});
    map.addLayer(layerBackground);

    layerCities = new OpenLayers.Layer.MapServer( "Pilsetas", 
            "http://localhost:1025/cgi-bin/mapserv.exe?map=C:/MS4W/ms4w/Apache/htdocs/gis/wfsServer.map", {layers: ['lat_pilm_region','lat_pilv_region','lat_pill_region'], transparent: true},
            {gutter: 15},{isBaseLayer: false, opacity: 0.3});
    map.addLayer(layerCities);   

    layerWater = new OpenLayers.Layer.MapServer( "Udeni", 
            "http://localhost:1025/cgi-bin/mapserv.exe?map=C:/MS4W/ms4w/Apache/htdocs/gis/wfsServer.map", {layers: ['lat_ezv_region','lat_ezl_region','lat_upl_polyline','lat_upv_polyline','lat_uplv_polyline','lat_upld_region','lat_up_s_region'], transparent: true},
            {gutter: 15},{isBaseLayer: false, opacity: 0.3});
    map.addLayer(layerWater);

    layerRegions = new OpenLayers.Layer.MapServer( "Regioni", 
            "http://localhost:1025/cgi-bin/mapserv.exe?map=C:/MS4W/ms4w/Apache/htdocs/gis/wfsServer.map", {layers: ['lat_adm_region'], transparent: true},
            {gutter: 15},{isBaseLayer: false, opacity: 0.3});
    map.addLayer(layerRegions);

    layerRailways = new OpenLayers.Layer.MapServer( "Dzelzcels", 
            "http://localhost:1025/cgi-bin/mapserv.exe?map=C:/MS4W/ms4w/Apache/htdocs/gis/wfsServer.map", {layers: ['railways'], transparent: true},
            {gutter: 15},{isBaseLayer: false, opacity: 0.3});
    map.addLayer(layerRailways);

    layerRoads = new OpenLayers.Layer.MapServer( "Celi", 
            "http://localhost:1025/cgi-bin/mapserv.exe?map=C:/MS4W/ms4w/Apache/htdocs/gis/wfsServer.map", {layers: ['roads'], transparent: true},
            {gutter: 15},{isBaseLayer: false, opacity: 0.3});
    map.addLayer(layerRoads);

    layerObjects = new OpenLayers.Layer.MapServer( "Objekti", 
            "http://localhost:1025/cgi-bin/mapserv.exe?map=C:/MS4W/ms4w/Apache/htdocs/gis/wfsServer.map", {layers: ['objects'], transparent: true},
            {gutter: 15},{isBaseLayer: false, opacity: 0.3});
    map.addLayer(layerObjects);

    layerPlaces = new OpenLayers.Layer.MapServer( "Vietas", 
            "http://localhost:1025/cgi-bin/mapserv.exe?map=C:/MS4W/ms4w/Apache/htdocs/gis/wfsServer.map", {layers: ['places'], transparent: true},
            {gutter: 15},{isBaseLayer: false, opacity: 0.3});
    map.addLayer(layerPlaces);

    map.setCenter(new OpenLayers.LonLat(lon, lat), zoom);
    map.addControl( new OpenLayers.Control.LayerSwitcher() );
}