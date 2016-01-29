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


function init() {//Wrap map in a function. Need this for map to work

    var markers = []; //location marker array so we can add and remove them from the map

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

                        marker.addListener('click', function () {//click event for info-window
                            infowindow.open(map, marker);
                        });

                        /*marker.addListener('click', toggleBounce);

                         function toggleBounce() {
                         if (marker.getAnimation() !== null) {
                         marker.setAnimation(null);
                         } else {
                         marker.setAnimation(google.maps.Animation.BOUNCE);
                         }
                         }*/
                        markers.push(marker); //So we can delete them later.

                    }
                })
            }/*,
             error: function (error) {
             alert("Request Timeout")
             }*/
        });
    }

    function deleteMarkers() {//the method to delete filtered markers
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];
    }

    function updateMarkers(locations) {//update filtered markers, delete the ones that were not searched for.
        deleteMarkers();
        locations.forEach(addMarker);//add the ones that are searched
    }

    updateMarkers(locationData);

// ViewModel
    var myViewModel = {
        visiblePlaces: locationData,//list of places shown in DOM
        userInput: ko.observable(''),//Searched for text. This changes.
        filterMarkers: function () {
            var locations = [];
            locationData.forEach(function (location) {
                if (location.name.toLowerCase().indexOf(myViewModel.userInput().toLowerCase()) > -1) { //Checking if userInput is in location.name
                    locations.push(location);
                }
            });
            updateMarkers(locations);
        }
    };

    ko.applyBindings(myViewModel);
}


