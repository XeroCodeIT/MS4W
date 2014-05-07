--------------------------------------------------------------------------------
Uzstādīšanas instrukcija:
! Nepieciešams Apache un uz tā uzstādīts MapServer. Pārbaudīts uz versijām 6.0.3 un 6.4.1
! Pašlaik aplikācija ir konfigurēta, lai darbotos šādā direktorijā: C:\MS4W\ms4w\Apache\htdocs\gis\

Lai aplikāciju darbinātu, jāmaina šādu parametru adreses:
gis/*.map failos:
    MS_ERRORFILE
    IMAGEPATH
    wms_onlineresource
    wms_onlineresource
    wfs_onlineresource
    CONNECTION

gis/index.html failā jāmaina URL adreses
gis/*.js failos jāmaina URL adreses
--------------------------------------------------------------------------------
Versijas:
MS4W versija: 3.0.6
Mapserver versija: 6.0.3
OpenLayers versija: 2.13.1
--------------------------------------------------------------------------------
Autortiesības:
1. Šādi SHP faili ir ņemti no resursa: http://latvijas.daba.lv/ftp/Kartes_un_Plani/Latvija/kopskats/ , arhīva Latvija3.shp.7z .
To autors ir Kārlis Kalvišķis.
lat_adm_region - Latvijas administratīvie rajoni
lat_ezl_region - Lielie ezeri
lat_ezv_region - Vidēja izmēra ezeri
lat_kaim_region - Kaimiņvalstu teritorijas
lat_pill_region - Lielpilsētas
lat_pilm_region - Mazpilsētas
lat_pilv_region - Pilsētas
lat_pmts_region	- Kartes pamata taisnstūris
lat_rob_region - Latvijas teritorija
lat_up_s_region - Salas upēs
lat_upld_region - Lielās upes
lat_uplv_polyline - Lielo upu augšteces
lat_upv_polyline - vidēja izmēra upes

2. Šādi SHP faili ir ņemti no resursa: http://www.mapcruzin.com/free-latvia-arcgis-maps-shapefiles.htm
Tie ir iegūti no www.openstreetmap.org. Shapefile licenze: Creative Commons Attribution Share-Alike 2.0 license
roads - ceļi
railways - dzelzceļi
objects - objekti [3670]
places - apdzīvotas vietas [653]
--------------------------------------------------------------------------------
Par aplikāciju:
Ir ieslēgta maksimāla žurnalēšana(DEBUG 5). Kļūdu ziņojumi tiek rakstīti direktorijā tmp
cgi.txt
wms_server.txt
wms_client.txt
wfs_server.txt

output/ direktorija satur MapServer ģenerētos kartes attēlus

index.html ir jāatver caur localhost, nevis kā failu. Piemērs:
http://localhost:1025/gis/index.html
Pretējā gadījumā pie WFS pieprasījumiem būs paziņojums par Cross Domain Request.
--------------------------------------------------------------------------------
Izmantotie resursi:

MapServer 6.4.1 ()
MapServer with OSGeo4W users guide 5.6.5 ()
OpenLayers 2.13.1 (http://openlayers.org)
Geographic Information Systems (http://gis.stackexchange.com)