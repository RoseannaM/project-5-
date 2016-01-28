// hard coded locations data
var locationData = [
    {
        name: 'Royal Botanic Gardens, Sydney',
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

/*
var wikiDescriptionUrl = '//https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Stack%20Overflow';
var wikiImageUrl = '';
*/

function init() {//need this for map to work

    var markers = []; //location marker array

    var map = new google.maps.Map(document.getElementById('map'), {
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

    // Location constructor
    function addMarker(location) {
        /*var contentString = location.description;*/
        $.ajax({
            url:'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + location.name + '&indexpageids=true&exsentences=1',
            dataType: "jsonp",
            success: function (descriptionResponse) {
                var articleId = descriptionResponse.query.pageids[0]; //capture the id to use below
                var descriptionArticleId = descriptionResponse.query.pages[articleId].extract;
                console.log(descriptionArticleId);
                $.ajax({
                    url:'https://en.wikipedia.org/w/api.php?action=query&titles=' + location.name + '&prop=pageimages&format=json&pithumbsize=100',
                    dataType: "jsonp",
                    success: function (imageResponse) {
                        var descriptionImage = imageResponse.query.pages[articleId].thumbnail.source;
                        console.log(descriptionImage);
                        var infowindow = new google.maps.InfoWindow({
                            zIndex: 10,
                            content: '<div id="markerDiv"><p>' + descriptionArticleId + '</p><img id="markerImage" src="' + descriptionImage + '"></div>'
                        });

                        var marker = new google.maps.Marker({
                            animation: google.maps.Animation.DROP,
                            position: location.latLng,
                            map: map,
                            icon: 'images/marker.png',
                            title: location.name
                        });

                        marker.addListener('click', function () {
                            infowindow.open(map, marker);
                        });

                        marker.addListener('click', toggleBounce);

                        function toggleBounce() {
                            if (marker.getAnimation() !== null) {
                                marker.setAnimation(null);
                            } else {
                                marker.setAnimation(google.maps.Animation.BOUNCE);
                            }
                        }
                        markers.push(marker); //So we can delete them later.

                    }
                })
            }
        });
    }

    function deleteMarkers() {
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];
    }

    function updateMarkers(locations) {
        deleteMarkers();
        locations.forEach(addMarker)
    }

    updateMarkers(locationData);

// ViewModel
    var myViewModel = {
        visiblePlaces: locationData,
        userInput: ko.observable(''),
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

//Api calls

/*var locationNames =[];
locationData.forEach(function(location){
    locationNames.push(location.name)
});
console.log(locationNames);

var placeName = $ ('#searchName').textInput;
console.log(placeName);
var $wikiElem = $('#content');

var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + placeName + '&format=json&callback=wikiCallback'; //test url
var wikiURL2 = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + locationData.name + '';
console.log(wikiURL2);


$.ajax({
        url:wikiURL,
        dataType: "jsonp",
        success: function(response){
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++){
                articleStr = articleList[i];
                var url = 'https://en.wikipedia.org/wiki/'+ articleStr;
                $wikiElem.append('<li><a href="' + url + '">'+
                    articleStr + '</a></li>');
            }
            /!*articleList.forEach(function(articleStr){
             var url = 'https://en.wikipedia.org/wiki/'+ articleStr;
             $wikiElem.append('<li><a href="' + url + '">'+
             articleStr + '</a></li>');
             })*!/
        }
    }

);*/
