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

var map;

    var place = function(locations) {
        locations.forEach(function (location) {
            var contentString = location.description;

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            var marker = new google.maps.Marker({
                position: location.latLng,
                map: map,
                title: location.name
            });

            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });

        })
    };

    function initMap() {

        var myLatLng = {lat: -33.873004, lng: 151.211405};
        map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: //styles go in here
                [
                    {
                        "featureType": "road",
                        "stylers": [
                            {"hue": "#f600ff"},
                            {"saturation": 2},
                            {"lightness": 34}
                        ]
                    }
                ]
        });
        place(locationData);
        /*var contentString = "This is a Marker";

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Uluru (Ayers Rock)'
        });
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });*/

    }

