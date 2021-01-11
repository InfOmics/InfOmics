/** 
 * Name: labLocOnGmaps.js
 * 
 * Author: Manuel Tognon <manuel.tognon@univr.it>
 * 
 * Description: JS script to insert a Google maps map with a marker pointing to 
 *                  InfOmics lab location.
 *                  
 * Version: 1.0.0
 * 
 * //------------------------------------------------------------------------------
 *      IF MODIFYING THIS CODE, WRITE YOUR CODE AND MAKE A PULL REQUEST ON GITHUB 
 * //------------------------------------------------------------------------------
*/


/**
 * @desc Build a Google maps map to display InfOmics lab location
 */
function getMap() {

    // lab location
    const infomicsLoc = {lat: 45.40399226378825, lng: 10.997719999926861};

    var mapOps = {
        zoom: 15,  // map height
        center: infomicsLoc,  // center map on ca vignal location
        scrollwheel: false, 
        // keep original website map styling 
        styles: [{
            "featureType": "administrative.land_parcel",
            "elementType": "all",
            "stylers": [{ "visibility": "off" }]},
                {
            "featureType": "landscape.man_made",
            "elementType": "all",
            "stylers": [{ "visibility": "off" }]},
                {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{ "visibility": "off" }]},
                { 
            "featureType": "road",
            "elementType": "labels",
            "stylers": [{ 
                "visibility": "simplified" },
                { "lightness": 20 }]},
                {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{ "hue": "#f49935" }]},
                {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [{ "visibility":"simplified" }]},
                {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{ "hue":"#fad959" }]},
                { 
            "featureType": "road.arterial",
            "elementType": "labels",
            "stylers": [{ "visibility": "off" }]},
                {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{ "visibility": "simplified" }]},
                { 
            "featureType": "road.local",
            "elementType": "labels",
            "stylers": [{ "visibility": "simplified" }]},
                {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{ "visibility": "off" }]},
                {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{ "hue":"#a1cdfc" },
            { "saturation": 30 },
            { "lightness": 49 }]}
        ]
    };

    // retrieve map objects
    var mapObj = document.getElementById("map")

    // build the map
    const map = new google.maps.Map(mapObj, mapOps)

    //add marker to the map
    const marker = new google.maps.Marker({
        position: infomicsLoc,
        map: map,
    });

}

