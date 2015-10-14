var thisUserMarker; 
var map;
var admin;
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 17, attribution: osmAttrib});



function initMap(){
	map = new L.Map('map');
	map.doubleClickZoom.disable();
    map.setView(new L.LatLng(59.332788, 18.064488),12);
    map.addLayer(osm);
   	determineTopFive();
    }
    

function filterOnCategory(){
	//send request to model containing category as parameter
	//=> in model(index) selected query is executed returning hashtags where category = input
	    var $target = $( event.currentTarget );
      	$target.closest( '.btn-group' ).find( '[data-bind="label"]' ).text( $target.text() ).end().children( '.dropdown-toggle' ).dropdown( 'toggle' );
        var category = $.trim(($target.text()));
        console.log(category);
    
        var request = $.ajax({
            url: "/api/filterOnCategory",
            type: "POST",
            data: {category:category},
            cache: false
        });
        console.log(request);
        
        request.done(function(res) {	
	        	map.eachLayer(function (layer) {
	        		if (layer != osm){
    				map.removeLayer(layer);}
				});
	        	for(i=0; i<res.length;i++) {
		            if(res[i]!=null) { 
		                var marker = L.latLng(res[i].latitude, res[i].longitude);
		                console.log(res[i].hashtag);
		                L.marker(marker).addTo(map).bindPopup(res[i].hashtag);
		            }
		            else {
		                console.log("There is no hashtags in this category");
		            }
		            console.log(res[i]);
	        	}
        });
}

function filterOnHashtag(hashtag){
	//send request to model containing hashtag as parameter
	//=> in model(index) selected query is executed returning hashtags=input
	
	var $target = $( event.currentTarget );
      	$target.closest( '.butt1' ).find( '[data-bind="label"]' ).text( $target.text() ).end();
        var hashtag = $.trim(($target.text()));
        console.log(hashtag);
	     
	     
        var request = $.ajax({
            url: "/api/filterOnHashtag",
            type: "POST",
            data: {hashtag:hashtag},
            cache: false
        }); 
        console.log(request);
        
        request.done(function(res) {
	        	map.eachLayer(function (layer) {
	        		if (layer != osm){
    				map.removeLayer(layer);
    				}
				});	
	        	for(i=0; i<res.length;i++) {
		            if(res[i]!=null) { 
		                var latlng = L.latLng(res[i].latitude, res[i].longitude);
		                console.log(res[i].category);
		                L.marker(latlng).addTo(map).bindPopup(res[i].category);
		            }
		            else {
		                console.log("There is no locations for this hashtag");
		            }
		            console.log(res[i]);
	        	}
        });
}


function toggleFullScreen() {
    var fullHeight = document.getElementById('map').style.height;
    
    if(fullHeight == "100%"){
                document.getElementById('map').style.height = "300px";
                document.getElementById('map').style.width = "100%";
    }
    else{
        document.getElementById('map').style.height = "100%";
        document.getElementById('map').style.width = "100%"; 
    }        
}


function determineTopFive(){	
		//Ask index.js to get the top5 used hashtags and returning them
        var request = $.ajax({
            url: "/api/top5",
            type: "POST",
            cache: false
        }); console.log(request);
  	
        request.done(function(res) {
	    	for(i=0; i<res.length ; i++) { 
	    		console.log(res[i].hashtag);
	       		document.getElementById((i+1)+"").innerHTML=res[i].hashtag;
	       	}
	  	});
}

function updateMap(distr){
	
	var $target = $( event.currentTarget );
      	$target.closest( '.catbutt' ).find( '[data-bind="label"]' ).text( $target.text() ).end();
        var distr = $.trim(($target.text()));
        console.log(distr);
	     
	     if (distr == 'Gamla Stan') {
	     	map.setView([59.325196, 18.071234], 14);
	     }
	     
	     else if (distr == 'Norrmalm'){
	     	map.setView([59.337567, 18.059889], 13);
	     }
	     
	     else if (distr == 'Sodermalm'){
	     	map.setView([59.313136, 18.065277], 13);
	     }
	     
	     else if (distr == 'Kungsholmen') {
	     	map.setView([59.332051, 18.022041], 13);
	     }
	     
	     else if (distr == 'Ostermalm'){
	     	map.setView([59.345225, 18.087243], 13);
	     }
	     
	     else if (distr == 'Vasastan'){
	     	map.setView([59.345174, 18.045063], 13);
	     }
	     
	     else if (distr == 'Djurgarden'){
	     	map.setView([59.326756, 18.126145], 13);
	     }
	     
	     else {
	     	map.setView([59.332788, 18.064488], 12);
	     }
}

function showPosition(position) {
	console.log(position);
	var userCircle = L.circle([position.coords.latitude, position.coords.longitude], position.coords.accuracy,{
     	color: 'blue',
     	fillColor: 'green',
     	fillOpacity: '0.5'}).addTo(map);    	
    map.setView([position.coords.latitude, position.coords.longitude], 15);
}

function getUserLocations() {
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);     
    }  
}

function insertUserLocation(position){	
}	