// hard coded locations data
var locationData = [
    {
        name: 'Royal Botanic Gardens, Sydney', //Name as shown in Wikipedia
        latLng: {lat: -33.868691, lng: 151.217736},
        description: ''

    },

    {
        name: 'Hyde Park, Sydney',
        latLng: {lat: -33.873004, lng: 151.211405},
        description: 'House'
    },

    {
        name: 'Centennial Park, New South Wales',
        latLng: {lat: -33.899100, lng: 151.234040},
        description: ''
    },
    {
        name: 'Sydney Park',
        latLng: {lat: -33.910511, lng: 151.184749},
        description: ''
    },

    {
        name: 'Chinese Garden of Friendship',
        latLng: {lat: -33.876531, lng: 151.202768},
        description: ''
    },

    {
        name: 'Moore Park, New South Wales',
        latLng: {lat: -33.897056, lng: 151.218815},
        description: ''
    }
];

var markers = {

}; //location marker object so we can add and remove them from the map
//creating bounce function
function bounce (marker) {//click event for info-window and bounce animation
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () {
        marker.setAnimation(null);
    }, 2000);

}
function initMap() {//Wrap map in a function. Need this for map to work



    var map = new google.maps.Map(document.getElementById('map'), { //map setup
        center: {lat: -33.873004, lng: 151.211405},
        zoom: 13,
        styles: //styles go in here
            [
                {
                    "featureType": "road",
                    "stylers": [
                        {"hue": "#00AEEF"},
                        {"saturation": 2},
                        {"lightness": 34}
                    ]
                }
            ]
    });

    // Location constructor. All marker and info window events go here
    function addMarker(location) {
        $.ajax({ //first call to request the first sentence of a wikipedia article description
            url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=' +
            '&titles=' + location.name + '&indexpageids=true&exsentences=1',
            dataType: "jsonp",
            success: function (descriptionResponse) {
                var articleId = descriptionResponse.query.pageids[0]; //capture the id to use below
                var descriptionArticleId = descriptionResponse.query.pages[articleId].extract;//capture the text using the id
                $.ajax({//second request to get the page image
                    url: 'https://en.wikipedia.org/w/api.php?action=query&titles=' + location.name + '&prop=pageimages' +
                    '&format=json&pithumbsize=300',
                    dataType: "jsonp",
                    success: function (imageResponse) {
                        var descriptionImage = imageResponse.query.pages[articleId].thumbnail.source;
                        var infowindow = new google.maps.InfoWindow({//now add the description and image to the infobox
                            content: '<div id="markerDiv"><p>' + descriptionArticleId + '</p><img id="markerImage" src="' +
                            '' + descriptionImage + '"></div>'
                        });

                        var marker = new google.maps.Marker({//add the markers to the map for each location
                            animation: google.maps.Animation.DROP,
                            position: location.latLng,
                            map: map,
                            icon: 'images/marker.png',
                            title: location.name

                        });

                        marker.addListener('click', function(){
                            bounce(marker);
                            infowindow.open(map, marker);
                        });

                        markers[location.name] = marker;//adding location name keys to the object

                        /*markers.push(marker);*/ //So we can delete them later.

                    },//error handling for Wikipedia description below
                    error: function (error) {
                        alert("Request failed for image of: " + location.name );
                    }
                })
            },//error handling for Wikipedia images below
             error: function (error) {
              alert("Request failed for location: " + location.name);
             }
        });
    }

    function deleteMarkers() {//the method to delete filtered markers
        for (var key in markers){
            markers[key].setMap(null);
        }
        markers = {}; //clears the marker object
    }

    function updateMarkers(locations) {//update filtered markers, delete the ones that were not searched for.
        deleteMarkers();
        locations.forEach(addMarker);//add the ones that are searched
    }

    updateMarkers(locationData);

// ViewModel
    var myViewModel = {
        visiblePlaces: ko.observableArray(locationData),//list of places shown in DOM
        userInput: ko.observable(''),//Searched for text. This changes.
        display: function (a, b)
        {
            bounce(markers[b.toElement.textContent]);
        },

        filterMarkers: function (d, event) {
            if (event.keyCode === 13){
                var locations = [];
                locationData.forEach(function (location) {
                    if (location.name.toLowerCase().indexOf(myViewModel.userInput().toLowerCase()) > -1) { //Checking if userInput is in location.name
                        locations.push(location);
                    }
                });
                updateMarkers(locations);
                myViewModel.visiblePlaces(locations);
            }
        }
    };
    ko.applyBindings(myViewModel);
}


/*
location.addEventListener('click',function(){
    console.log('click') ;
})

 */
