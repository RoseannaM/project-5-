// hard coded locations data
var locationData = [
    {
        name: 'Royal Botanic Gardens',
        latLng: {lat: -33.868691, lng: 151.217736},
        description: 'html can go in here'
    },

    {
        name: 'Hyde Park',
        latLng: {lat: -33.873004, lng: 151.211405},
        description: 'House'
    },

    {
        name: 'Centennial Park',
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
        name: 'Moore Park',
        latLng: {lat: -33.897056, lng: 151.218815},
        description: ''
    }
];

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
        var contentString = location.description;

        var infowindow = new google.maps.InfoWindow({
            content: contentString
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