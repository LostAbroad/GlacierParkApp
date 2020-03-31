// Javascript by //

var topoterrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
});

var outdoors = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

//var imagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
//	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
//});

var mapOptions = {
    zoomControl: false,
    center: [48.690176, -113.757130],
    zoom: 9,
    minZoom: 3,
    maxZoom: 18,
    layers: [outdoors]
};

var map = L.map('mapid', mapOptions);

var zoomHome = L.Control.zoomHome({
    position: 'topleft'
});
zoomHome.addTo(map);

var baseMaps = {
    "Default": outdoors,
    "Terrain": topoterrain,
//    "Imagery": imagery
}


// sql queries to get layers

var sqlQuery1 = "SELECT t.the_geom, t.class, t.route_no, t.name, t.meters, t.miles, t.trlname,t.trllabel, t.trluse, t.trlclass, u.first_name, u.last_name, u.trail_id, u.user_date, u.review FROM public.gnp_trailss AS t LEFT OUTER JOIN public.user_review AS u ON t.route_no = u.trail_id";
var sqlQuery2 = "SELECT * FROM public.gnp_roads"; // roads
var sqlQuery5 = "SELECT * FROM public.gnp_poi WHERE poitype = 'Bus Stop / Shuttle Stop'";
var sqlQuery6 = "SELECT * FROM public.gnp_poi WHERE poitype = 'Cabin'";
var sqlQuery7 = "SELECT * FROM public.gnp_poi WHERE poitype = 'Campground'";
var sqlQuery10 = "SELECT * FROM public.gnp_poi WHERE poitype = 'Gas Station'";
var sqlQuery13 = "SELECT * FROM public.gnp_poi WHERE poitype = 'Lodging'";
var sqlQuery14 = "SELECT * FROM public.gnp_poi WHERE poitype = 'Parking'";
var sqlQuery18 = "SELECT * FROM public.gnp_poi WHERE poitype = 'Restroom'";
var sqlQuery19 = "SELECT * FROM public.gnp_poi WHERE poitype = 'Trailhead'";
var sqlQuery20 = "SELECT * FROM public.gnp_poi WHERE poitype = 'Train Station'";
var sqlQuery22 = "SELECT * FROM public.gnp_poi WHERE poitype = 'Viewpoint'";
var sqlQuery23 = "SELECT * FROM public.gnp_poi WHERE poitype = 'Visitor Center'";
//sql for dropdown list
var sqlQueryddl = "SELECT route_no, trllabel FROM public.gnp_trailss"; // trails 
//icons 



var iconTemp = L.Icon.extend({
    options: {
        iconSize: [35, 35],
    }
});
var busIcon = new iconTemp({
    iconUrl: 'js/image/bus.svg'
});
var cabinIcon = new iconTemp({
    iconUrl: 'js/image/cabin.svg'
});
var campIcon = new iconTemp({
    iconUrl: 'js/image/campground.svg'
});
var gasIcon = new iconTemp({
    iconUrl: 'js/image/gasstation.svg'
});
var lodgeIcon = new iconTemp({
    iconUrl: 'js/image/lodging.svg'
});
var parkingIcon = new iconTemp({
    iconUrl: 'js/image/parking.svg'
});
var restroomIcon = new iconTemp({
    iconUrl: 'js/image/restroom.svg'
});
var trailIcon = new iconTemp({
    iconUrl: 'js/image/trailhead1.svg'
});
var trainIcon = new iconTemp({
    iconUrl: 'js/image/train.svg'
});
var viewptIcon = new iconTemp({
    iconUrl: 'js/image/viewpt.svg'
});
var visitorIcon = new iconTemp({
    iconUrl: 'js/image/visitor.svg'
});
//for each point of interest 

var onEachFeature = function (feature, layer) {
    if (feature.properties) {
        var popUpContent = makePopUpContent(feature.properties);
        layer.bindPopup(popUpContent);

        layer.on('mouseover', function (e) {
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            this.closePopup();
        });
    };

}
// function to make our popup-content
var makePopUpContent = function (props) {
    return '<div class="popup-content">' +
        '<p><strong>Name:</strong> ' + props.poilabel + '</p>' +
        '</div>'
}

// urls to get layer from carto
var callsite = "https://lostabroad.carto.com/api/v2/sql?format=geojson&q=";
var url5 = callsite + sqlQuery5;
var url6 = callsite + sqlQuery6;
var url7 = callsite + sqlQuery7;
var url10 = callsite + sqlQuery10;
var url13 = callsite + sqlQuery13;
var url14 = callsite + sqlQuery14;
var url18 = callsite + sqlQuery18;
var url19 = callsite + sqlQuery19;
var url20 = callsite + sqlQuery20;
var url22 = callsite + sqlQuery22;
var url23 = callsite + sqlQuery23;


// Point of interest layers for map
var busStop = L.geoJson(null, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: busIcon
        });
    }
});


var cabins = L.geoJson(null, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: cabinIcon
        });
    }
});
var campgrounds = L.geoJson(null, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: campIcon
        });
    }
});

var gasStations = L.geoJson(null, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: gasIcon
        });
    }
});

var lodging = L.geoJson(null, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: lodgeIcon
        });
    }
});
var parking = L.geoJson(null, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: parkingIcon
        });
    }
});

var restroom = L.geoJson(null, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: restroomIcon
        });
    }
});
var trailheads = L.geoJson(null, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: trailIcon
        });
    }
});
var trainStation = L.geoJson(null, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: trainIcon
        });
    }
});

var viewpoint = L.geoJson(null, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: viewptIcon
        });
    }
});
var visitorCenter = L.geoJson(null, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: visitorIcon,
        });
    }
});

$.getJSON(url5, function (data) {
    busStop.addData(data);
}).fail(function (jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
});
$.getJSON(url6, function (data) {
    cabins.addData(data);
}).fail(function (jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
});
$.getJSON(url7, function (data) {
    campgrounds.addData(data);
}).fail(function (jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
});

$.getJSON(url10, function (data) {
    gasStations.addData(data);
}).fail(function (jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
});

$.getJSON(url13, function (data) {
    lodging.addData(data);
}).fail(function (jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
});
$.getJSON(url14, function (data) {
    parking.addData(data);
}).fail(function (jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
});

$.getJSON(url18, function (data) {
    restroom.addData(data);
}).fail(function (jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
});
$.getJSON(url19, function (data) {
    trailheads.addData(data);
}).fail(function (jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
});
$.getJSON(url20, function (data) {
    trainStation.addData(data);
}).fail(function (jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
});

$.getJSON(url22, function (data) {
    viewpoint.addData(data);
}).fail(function (jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
});
$.getJSON(url23, function (data) {
    visitorCenter.addData(data);
}).fail(function (jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
});



// Get trails selection as GeoJSON and Add to Map
var trails = $.getJSON("https://lostabroad.carto.com/api/v2/sql?format=GeoJSON&q=" + sqlQuery1, function (data) {
    trails = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup('<p><b>' + feature.properties.trllabel + '</b><br/><em>' + 'Trail Distance: ' + feature.properties.miles + '<br/><em>'+ 'Trail Use: ' + feature.properties.trluse + '<br/><em>' + 'Reviews: ' + feature.properties.review + ': ' +'<br/>' + 'Date of Review: ' + feature.properties.user_date + '</p>');
            layer.on({
                mouseover: function (e) {
                    layer.setStyle({
                        weight: 3,
                        opacity: 1,
                        color: 'red',
                        dashArray: '5',
                        fillOpacity: 1,
                        fillColor: '#ff0000'
                    });
                    if (!L.Browser.ie && !L.Browser.opera) {
                        layer.bringToFront();
                    }
                },
                mouseout: function (e) {
                    trails.resetStyle(e.target);
                },

            });
        },
        style: styleTrails,
    }).addTo(map);
});


function styleTrails(feature) {
    type = feature.properties.trluse;
    var colorToUse;
    if (type === "Very Low Use / Low level of maintenance") colorToUse = 'green';
    else if (type === "Low Use / Low level of maintenance") colorToUse = 'yellow';
    else if (type === "Moderate to High Use / Highest level of maintenance") colorToUse = 'orange';
    else colorToUse = "red";

    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2.5,
    };
}

function styleFilterTrails(feature) {
    return {
        "color": 'blue',
        "fillColor": 'blue',
        "weight": 3,
    };
}

var roads = $.getJSON("https://lostabroad.carto.com/api/v2/sql?format=GeoJSON&q=" + sqlQuery2, function (data) {
    roads = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup('<p><b>' + feature.properties.rdlabel + '</b><br /><em>' + 'Surface Type: ' + feature.properties.rdsurface + '</p>');
            layer.on({
                mouseover: function (e) {
                    layer.setStyle({
                        weight: 3,
                        color: "#00FFFF",
                        opacity: 1
                    });
                    if (!L.Browser.ie && !L.Browser.opera) {
                        layer.bringToFront();
                    }
                },
                mouseout: function (e) {
                    roads.resetStyle(e.target);
                },

            });
        },
        style: styleRoads,
    }).addTo(map);
});

function styleRoads(feature) {
    type = feature.properties.rdsurface;
    var colorToUse;
    if (type === "Gravel") colorToUse = '#BF9D7E';
    else if (type === "Asphalt") colorToUse = 'black';
    else colorToUse = "red";

    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
    };
}

var groupedOverlays = {
    "Transportation": {
        "<img src='js/image/bus.svg' width='35' height='35'>&nbsp;Shuttle Stop": busStop,
        "<img src='js/image/parking.svg' width='35' height='35'>&nbsp;Parking Location": parking,
        "<img src='js/image/train.svg' width='35' height='35'>&nbsp;Train Stop": trainStation
    },
    "Park Details": {
        "<img src='js/image/gasstation.svg' width='35' height='35'>&nbsp;Gas Station": gasStations,
        "<img src='js/image/restroom.svg' width='35' height='35'>&nbsp;Restroom": restroom,
        "<img src='js/image/visitor.svg' width='35' height='35'>&nbsp;Visitor Center": visitorCenter
    },
    "Lodging and Campgrounds": {
        "<img src='js/image/lodging.svg' width='35' height='35'>&nbsp;Main Lodging": lodging,
        "<img src='js/image/cabin.svg' width='35' height='35'>&nbsp;Trail Cabin": cabins,
        "<img src='js/image/campground.svg' width='35' height='35'>&nbsp;Campground": campgrounds
    },
    "Trail Details": {
        "<img src='js/image/trailhead1.svg' width='35' height='35'>&nbsp;Trail Start": trailheads,
        "<img src='js/image/viewpt.svg' width='35' height='35'>&nbsp;Vista Point": viewpoint
    },
};


var layerControl = L.control.groupedLayers(baseMaps, groupedOverlays).addTo(map);
map.addControl(layerControl);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
    //    position: "bottomright",
    drawCircle: true,
    follow: true,
    setView: true,
    keepCurrentZoomLevel: true,
    markerStyle: {
        weight: 1,
        opacity: 0.8,
        fillOpacity: 0.8
    },
    circleStyle: {
        weight: 1,
        clickable: false
    },
    icon: "fa fa-compass",
    metric: false,
    strings: {
//        title: "Current location",
//        popup: "You are within {distance} {unit} from this point",
//        outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
    },
    locateOptions: {
        maxZoom: 18,
        watch: true,
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 10000
    }
}).addTo(map);


function getsearchdata() {
    var sqlSer = "SELECT poilabel, poitype, the_geom FROM public.gnp_poi WHERE poitype IN ('Bus Stop / Shuttle Stop','Cabin','Campground','Gas Station','Lodging','Parking','Restroom','Trailhead', 'Train Station','Viewpoint','Visitor Center')";
    var searchLayer = $.getJSON("https://lostabroad.carto.com/api/v2/sql?format=GeoJSON&q=" + sqlSer, function (data) {
        return L.geoJson(data);
        console.log(L.geoJson(data));
    });
}

//map.addControl(new L.Control.Search({
//    sourceData: getsearchdata,
//    propertyName: 'poilabel',
//    textPlaceholder: 'Search for Point of Interest...',
//    markerLocation: true
//}));


$(document).ready(function () {
    $("#query-trails-reset").click(function () {
        $("#query_trails_form")[0].reset();
        $('#trailFiltOutput').empty();
    });
//
//    $('<p class = "controlHeader">Basemap Tilesets</p>').insertBefore('div.leaflet-control-layers-base');
//
    $("#sidebar-toggle-btn").click(function () {
        animateSidebar();
        return false;
    });
    
    $("#sidebar-toggle-btn2").click(function () {
        animateSidebar();
        return false;
    });
    
    $("#sidebar-toggle-btn3").click(function () {
        animateSidebar();
        return false;
    });

    $("#sidebar-hide-btn").click(function () {
        animateSidebar();
        return false;
    });
//    open and close sidebar
    function animateSidebar() {
        $("#sidebar").animate({
            width: "toggle"
        }, 100, function () {
            map.invalidateSize();
        });
    }

//    function openReview() {
//        $("#reviewTrails").animate('show');
//        $("#filterTrails").collapse('hide');
//    }
//
//    function openFilter() {
//        $("#filterTrails").collapse('show');
//        $("#reviewTrails").collapse('hide');
//    }

    /* Highlight search box text on click */
    $("#searchbox").click(function () {
        $(this).select();
    });
    /* Prevent hitting enter from refreshing the page */
    $("#searchbox").keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
        }
    });
    $("#review-btn").click(function () {
        animateSidebar();
        openReview();
        return false;
    });
    $("#filter-btn").click(function () {
        animateSidebar();
        openFilter();
        return false;
    });

    var ddlTrails = document.getElementById("ddlTrails")
    $.get("https://lostabroad.carto.com/api/v2/sql?q=" + sqlQueryddl,
        function (data) {
            console.log(data);
            for (i = 0; i < data.total_rows; i++) {
                var option = document.createElement("OPTION");
                option.innerHTML = data.rows[i].trllabel;

                //Set route_no in Value part.
                option.value = data.rows[i].route_no;

                //Add the Option element to DropDownList.
                ddlTrails.options.add(option);
            }
        });

    $("#reviewSubmitBtn").click(function (e) {
        e.preventDefault(); //just use when testing
//
        var x = $("#review_trails_form").serializeArray();
        
        var fn1 = x[0].value;
        var fn= "'"+fn1+"'";
        var ln1 = x[1].value;
        var ln = "'"+ln1+"'";
        var trailVal1 = x[2].value;
        var trailVal = "'"+trailVal1+"'";
        var review_1 = x[3].value;
        var review_ = "'"+review_1+"'";
        var userDate1 = x[4].value;
        var userDate ="'"+userDate1+"'";
        
        
        var sqlReview = "INSERT INTO public.user_review(first_name, last_name, trail_id, review, user_date) VALUES(" + fn +","+ ln + "," + trailVal +"," + review_ + "," + userDate + ")";
//        var sqlReview = "INSERT INTO public.user_review(trail_id, review, first_name, last_name) VALUES(" + trailVal + ", '" + review_ + "' , '" + fn + "' ,'" + ln + "')";

        var posting = 
            $.post("https://lostabroad.carto.com/api/v2/sql?api_key=23bcc80f5aebb7dc4cbdd6f526fac56021980c55&q=" + sqlReview).done(function () {alert("Your review has been submitted!");
            // Reset the form
            $("#review_trails_form")[0].reset();
        }).fail(function (xhr) {
            alert("Unable to submit! All five submission categories are necessary.")
        });
//        console.log(posting.sql);

    });
    
    $("#querySubmitBtn").click(function (e) {
        e.preventDefault(); //just use when testing
        $('#trailFiltOutput').empty();
        map.removeLayer(trails);

        //        map.removeLayer(filterTrails);

        var x = $("#query_trails_form").serializeArray();
        console.log(x);

        var surfaceType = x[1].value;
        console.log(surfaceType);
        //        "WHERE trluse = 'surfaceType'"

        var classType = x[2].value;
        console.log(classType);
        //        "WHERE trlclass LIKE 'classType'"

        var distanceRange = x[0].value;
        console.log(distanceRange);
        //        "WHERE miles distanceRange"


        var sqlFilter = "SELECT t.the_geom, t.class, t.route_no, t.name, t.meters, t.miles, t.trlname,t.trllabel, t.trluse, t.trlclass, u.first_name, u.last_name, u.trail_id, u.user_date, u.review FROM public.gnp_trailss AS t LEFT OUTER JOIN public.user_review AS u ON t.route_no = u.trail_id"



        // If no filters are selected
        if (surfaceType == "" && classType == "" && distanceRange == "") {
            var sql = sqlFilter;
        }

        // If at least one filter is selected
        else {
            // Add WHERE clause root
            var sql = sqlFilter + " WHERE ";
            // If surface type is not null, add surfaceType to WHERE clause
            if (surfaceType != "") {
                var where_surface = "t.trluse = '" + surfaceType + "'";
                sql += where_surface;
            }
            // If classType is not null, add classType to WHERE clause
            if (classType != "") {
                var where_class = "t.trlclass LIKE '" + classType + "'";
                if (surfaceType != "") {
                    sql += " AND " + where_class;
                } else {
                    sql += where_class;
                }
            }
            // If distanceRange is not null, add distanceRange to WHERE clause
            if (distanceRange != "") {
                var where_dist = "t.miles " + distanceRange;
                if (surfaceType != "" || classType != "") {
                    sql += " AND " + where_dist;
                } else {
                    sql += where_dist;
                }
            }
        }
        console.log(sql);

        var filterTrails = $.getJSON("https://lostabroad.carto.com/api/v2/sql?format=GeoJSON&q=" + sql, function (data) {
            trails = L.geoJson(data, {
                onEachFeature: function (feature, layer) {
                    console.log(feature);
                    console.log(feature.properties);
                    layer.bindPopup('<p><b>' + feature.properties.trllabel + '</b><br/><em>' + 'Trail Distance: ' + feature.properties.miles + '<br/><em>'+ 'Trail Usage: ' + feature.properties.trluse + '<br/><em>' + 'Reviews: '  + feature.properties.review + '<br/>' + 'Date of Review: '+ feature.properties.user_date+'</p>');
                    $('#trailFiltOutput').append('<p class="trail-filter">' + feature.properties.trllabel + '</p>')
                    layer.on({
                        mouseover: function (e) {
                            layer.setStyle({
                                weight: 3,
                            opacity: 1,
                            color: 'red',
                            dashArray: '5',
                            fillOpacity: 1,
                            fillColor: '#ff0000'
                            });
                            if (!L.Browser.ie && !L.Browser.opera) {
                                layer.bringToFront();
                            }
                        },
                        mouseout: function (e) {
                            trails.resetStyle(e.target);
                        },

                    });
                },
                style: styleFilterTrails,
            }).addTo(map);
        });

    });

/*Legend specific*/
var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Trails and Roads</h4>";
  div.innerHTML += '<i style="background: black"></i><span>Asphalt</span><br>';
  div.innerHTML += '<i style="background: #BF9D7E"></i><span>Gravel</span><br>';
  div.innerHTML += '<i style="background: green"></i><span>Trail Use: Very Low</span><br>';
  div.innerHTML += '<i style="background: yellow"></i><span>Trail Use: Low</span><br>';
  div.innerHTML += '<i style="background: orange"></i><span>Trail Use: High</span><br>';
//  div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';

  return div;
};

legend.addTo(map);

    // Leaflet patch to make layer control scrollable on touch browsers
    var container = $(".leaflet-control-layers")[0];
    if (!L.Browser.touch) {
        L.DomEvent
            .disableClickPropagation(container)
            .disableScrollPropagation(container);
    } else {
        L.DomEvent.disableClickPropagation(container);
    }

});
