window.onload = init; 

function init()
{
    var map, layerBackground, layerWaterPolygon, layerWaterPolyline, layerRegions, layerRailways, layerRoads, layerObjects, layerCities,layerGoogleTerrain,layerGoogleStreets,layerGoogleHybrid,layerGoogleSatellite;

    // 1. izveidojam kartes objektu
    map = new OpenLayers.Map("map",{maxExtent: new OpenLayers.Bounds(2337244.77, 7502451.47, 3098144.66, 7956990.04),maxResolution: '0.125', units: 'meters', projection: "EPSG:3857"});

    // 2. izveidojam slāņus
        // START google slāņi
    layerGoogleSatellite = new OpenLayers.Layer.Google(
        "Google Satellite",
        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22,isBaseLayer: true}
    )

    layerGoogleTerrain = new OpenLayers.Layer.Google(
                "Google Physical",
                {type: google.maps.MapTypeId.TERRAIN}
            )
    
    layerGoogleStreets = new OpenLayers.Layer.Google(
        "Google Streets",
        {numZoomLevels: 20}
    )

    layerGoogleHybrid = new OpenLayers.Layer.Google(
        "Google Hybrid",
        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
    )
        // END google slāņi

    layerCities = new OpenLayers.Layer.WFS("Pilsētas","http://localhost:1025/cgi-bin/mapserv.exe?map=C:/MS4W/ms4w/Apache/htdocs/gis/wfsServer.map",{typename: ['lat_pilm_region','lat_pilv_region','lat_pill_region']},{extractAttributes: true});

    layerWaterPolygon = new OpenLayers.Layer.WFS("Ūdeņi polygon","http://localhost:1025/cgi-bin/mapserv.exe?map=C:/MS4W/ms4w/Apache/htdocs/gis/wfsServer.map",{typename: ['lat_ezv_region','lat_ezl_region','lat_upld_region','lat_up_s_region']},{extractAttributes: true});
    
    layerWaterPolyline = new OpenLayers.Layer.WFS("Ūdeņi polyline","http://localhost:1025/cgi-bin/mapserv.exe?map=C:/MS4W/ms4w/Apache/htdocs/gis/wfsServer.map",{typename: ['lat_upl_polyline','lat_upv_polyline','lat_uplv_polyline']},{extractAttributes: true});
        
    layerRailways = new OpenLayers.Layer.MapServer( "Dzelzceļš", 
            "http://localhost:1025/cgi-bin/mapserv.exe?map=C:/MS4W/ms4w/Apache/htdocs/gis/wfsServer.map", {layers: ['railways'], transparent: true},
            {gutter: 15},{isBaseLayer: false, opacity: 0.3});

    layerRoads = new OpenLayers.Layer.MapServer( "Ceļi", 
            "http://localhost:1025/cgi-bin/mapserv.exe?map=C:/MS4W/ms4w/Apache/htdocs/gis/wfsServer.map", {layers: ['roads'], transparent: true},
            {gutter: 15},{isBaseLayer: false, opacity: 0.3});

    layerRegions = new OpenLayers.Layer.MapServer( "Reģioni", 
            "http://localhost:1025/cgi-bin/mapserv.exe?map=C:/MS4W/ms4w/Apache/htdocs/gis/wfsServer.map", {layers: ['lat_adm_region'], transparent: true},
            {gutter: 15},{isBaseLayer: false, opacity: 0.3});
    
    layerObjects = new OpenLayers.Layer.WFS("Objekti/vietas","http://localhost:1025/cgi-bin/mapserv.exe?map=C:/MS4W/ms4w/Apache/htdocs/gis/wfsServer.map",{typename: ['objects','places']},{extractAttributes: true});    
    
    // 3. Izveidojam kontroles
        // rādām getFeatureInfo pie peles klikšķa uz attiecīgā objekta
    var selectObject = new OpenLayers.Control.SelectFeature(layerObjects,{callbacks: {'click': feature_info1}});
    var selectCity = new OpenLayers.Control.SelectFeature(layerCities,{callbacks: {'click': feature_info1}});
    var selectWaterPolyline = new OpenLayers.Control.SelectFeature(layerWaterPolyline,{callbacks: {'click': feature_info1}});
    var selectWaterPolygon = new OpenLayers.Control.SelectFeature(layerWaterPolygon,{callbacks: {'click': feature_info1}});

    map.addControl(selectObject);   
    map.addControl(selectCity);         
    map.addControl(selectWaterPolyline);    
    map.addControl(selectWaterPolygon);  

    selectObject.activate();  
    selectCity.activate();    
    selectWaterPolyline.activate();    
    selectWaterPolygon.activate();    

        // slāņu redzamība
    map.addControl( new OpenLayers.Control.LayerSwitcher() );
    
        // peles kursora pozīcija
    map.addControl(new OpenLayers.Control.MousePosition({
            div: document.getElementById('mousePosition'),
            prefix: 'Koordinātas: ',
            suffix: ' (<a href="http://spatialreference.org/ref/sr-org/6864/">EPSG:3857</a>)'
        })
    );
    
    // 4. pievienojam slāņus
    map.addLayer(layerGoogleSatellite);    
    map.addLayer(layerGoogleTerrain);    
    map.addLayer(layerGoogleStreets);    
    map.addLayer(layerGoogleHybrid);
    
    map.addLayer(layerObjects);
    map.addLayer(layerRegions);
    map.addLayer(layerRoads);    
    map.addLayer(layerRailways);
    map.addLayer(layerWaterPolyline);
    map.addLayer(layerWaterPolygon);
    map.addLayer(layerCities);

    // 5. slāņu redzamība, pēc noklusējuma
    // layerBackground.setVisibility(true);
    layerRegions.setVisibility(false);
    layerRailways.setVisibility(false);
    layerRoads.setVisibility(false);
    layerWaterPolygon.setVisibility(false);
    layerWaterPolyline.setVisibility(false);
    layerCities.setVisibility(false);
    layerObjects.setVisibility(false);
    
    // 6. noklusētais kartes centrs
    var lon = 2673666;
    var lat = 7726666;
    var zoom = 7;
    map.setCenter(new OpenLayers.LonLat(lon, lat), zoom);
}

function feature_info1(feature)
{
    var html = "";
    for(var i in feature.attributes)
    {
        html +="<b>" + i + "</b> " + feature.attributes[i] + "<br />";
        if(i == "osm_id") // make ajax call, get info, show it
        {
        
            var osm_id = feature.attributes[i];
            var xmlhttp;
            if (window.XMLHttpRequest)
            {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp=new XMLHttpRequest();
            }
            else
            {// code for IE6, IE5
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange=function()
            {
                if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {
                    console.log("XML response: " + xmlhttp.responseText);
                    OpenLayers.Util.getElement('feature_info').innerHTML +="<b>Papildus info:</b> " + xmlhttp.responseText;
                }
            }
            xmlhttp.open("GET","http://www.xerocode.com/gis/index.php?osm_id="+osm_id,true);
            xmlhttp.send();
        }
        else
        {
            console.log("2");
        }
    }
    OpenLayers.Util.getElement('feature_info').innerHTML = html;
}