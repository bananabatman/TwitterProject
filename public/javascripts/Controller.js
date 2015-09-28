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
    }
    

filterOnCategory(){	
	//send request to model containing category as parameter
	//=> in model(index) selected query is executed returning hashtags where category = input
}


highlightOption(){	
	//show that hashtag is chosen and dull out the other hashtags updateMarkers
	//if top5 clicked clear everything/update markers
}


fullScreenMap(){	
	//makes map full screen/normal size
}


updateMarkers(object:hashtags){	
	//function update top 5:
	//remove old hashtags and replace with new hashtags
	//Input: objects with lat- long-attributes
}

updateMap(position){
	//move to cntre and zoom for location and district	
	//if position = gamla stan -> go to position
	//if position = my location -> {get location}
}

determineTopFive(category){	
}

getUserLocations(){	
}

insertUserLocation(){	
}	





