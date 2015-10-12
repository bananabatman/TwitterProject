var thisUserMarker; 
var map;
var admin;
function initMap(){
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});
    map = new L.Map('map');
    map.doubleClickZoom.disable();
    map.setView(new L.LatLng(59.332788, 18.064488),8);
    map.addLayer(osm);
    filterOnCategory('sport');
    }
    

function filterOnCategory(category){
	//send request to model containing category as parameter
	//=> in model(index) selected query is executed returning hashtags where category = input
	        console.log(category);
        var request = $.ajax({
            url: "/api/filterOnCategory",
            type: "POST",
            data: {category:category},
            cache: false
        }); console.log(request);
        
        request.done(function(res) {	
        		console.log(res);
        		updateMarkers(res);  // sends resluts to updateMarkers(), Kanske måste ta ur bara lat och long och skicka
        	});
	
	// return request;	

}

function filterOnHashtag(hashtag){
	//send request to model containing hashtag as parameter
	//=> in model(index) selected query is executed returning hashtags=input
	        console.log(category);
        var request = $.ajax({
            url: "/api/filterOnHashtag",
            type: "POST",
            data: {hashtag:hashtag},
            cache: false
        }); console.log(request);
        
        request.done(function(res) {	
        		console.log(res);
        		updateMarkers(res);  // sends resluts to updateMarkers(), Kanske måste ta ur bara lat och long och skicka
        	});
	
	// return request;	

}



function filterOnHashtag(hashtag){
	//takes a hashtag as input and sends it to index.js whihch retreives all those hashtags as an array from the database
	//Then calls updateMArkers()
	        console.log(hashtag);
        var request = $.ajax({
            url: "/api/filterOnHashtag",
            type: "POST",
            data: {hashtag:hashtag},
            cache: false
        }); console.log(request);
        
        request.done(function(res) {	
        		console.log(res);
        		updateMarkers(res);  // sends resluts to updateMarkers(), Kanske måste ta ur bara lat och long och skicka
        	});
	
	// return request;	

}


function fullScreenMap(){	//Mesele
	//makes map full screen/normal size
}


function updateMarkers(tweets){	
	//Used for all updates, both from category and showing specific hashtag
	//remove old hashtags and replace with new hashtags
	//Input: objects with lat- long-attributes
}

function updateMap(position){ //Mesele
	//move to cntre and zoom for location and district	
	//if position = gamla stan -> go to position
	//if position = my location -> {get location}
}

function determineTopFive(category){	
}

function getUserLocations(){	//Mesele
}

function insertUserLocation(){	
}	





