var locationData = [
    {
        name: 'Royal Botanic Gardens',
        latLng: {lat: -33.868691, lng: 151.217736},
        description: '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
        '<div id="bodyContent">'+
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the '+
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        'south west of the nearest large town, Alice Springs; 450&#160;km '+
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        'Aboriginal people of the area. It has many springs, waterholes, '+
        'rock caves and ancient paintings. Uluru is listed as a World '+
        'Heritage Site.</p>'+
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
        '(last visited June 22, 2009).</p>'+
        '</div>'+
        '</div>'
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

        var myLatLng = {lat: -33.867853, lng: 151.215937};
        map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            zoom: 8,
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
        place(locationData);
    }

