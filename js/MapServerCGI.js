function init()
{
    if(
        document.getElementById("lat_ezv_region").checked == true &&
        document.getElementById("lat_ezl_region").checked == true &&
        document.getElementById("lat_upv_polyline").checked == true &&
        document.getElementById("lat_uplv_polyline").checked == true &&
        document.getElementById("lat_upld_region").checked == true &&
        document.getElementById("lat_up_s_region").checked == true
    )
    {
        console.log("All water layers are shown");
        document.getElementById("switchWaterCheckbox").checked=true;
    }
    
    if(
        document.getElementById("lat_pilm_region").checked == true &&
        document.getElementById("lat_pilv_region").checked == true &&
        document.getElementById("lat_pill_region").checked == true
    )
    {
        console.log("All city layers are shown");
        document.getElementById("switchCitiesCheckbox").checked=true
    }
}

function switchCities()
{
    if (document.getElementById("switchCitiesCheckbox").checked==true)
    {
        console.log("Show all city layers");
        document.getElementById("lat_pilm_region").checked = true;
        document.getElementById("lat_pilv_region").checked = true;
        document.getElementById("lat_pill_region").checked = true;
    }
    else
    {
        console.log("Hide all city layers");
        document.getElementById("lat_pilm_region").checked = false;
        document.getElementById("lat_pilv_region").checked = false;
        document.getElementById("lat_pill_region").checked = false;
    }
}

function switchWater()
{
    if (document.getElementById("switchWaterCheckbox").checked==true)
    {
        console.log("Show all water layers");
        document.getElementById("lat_ezv_region").checked = true;
        document.getElementById("lat_ezl_region").checked = true;
        document.getElementById("lat_upv_polyline").checked = true;
        document.getElementById("lat_uplv_polyline").checked = true;
        document.getElementById("lat_upld_region").checked = true;
        document.getElementById("lat_up_s_region").checked = true;
    }
    else
    {
        console.log("Hide all water layers");
        document.getElementById("lat_ezv_region").checked = false;
        document.getElementById("lat_ezl_region").checked = false;
        document.getElementById("lat_upv_polyline").checked = false;
        document.getElementById("lat_uplv_polyline").checked = false;
        document.getElementById("lat_upld_region").checked = false;
        document.getElementById("lat_up_s_region").checked = false;
    }
}