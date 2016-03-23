$(function () {
    var userCurrentLocation = {
        lat: 19,
        lon: 72,
        accuracy: 200
    }

    getLocation();
    showMap();

    function showMap() {
        $("#somecomponent").locationpicker({
            location: {
                latitude: userCurrentLocation.lat,
                longitude: userCurrentLocation.lon
            },
            radius: userCurrentLocation.accuracy,
            inputBinding: {
                locationNameInput: $("#us2-address")
            }
        });
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getLocationSuccess, getLocationError, getLocationOptions);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    function getLocationSuccess(pos) {
        userCurrentLocation = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            accuracy: pos.coords.accuracy
        }
        console.log(pos);
        console.log(userCurrentLocation);
        showMap();
    }

    function getLocationError(err) {
        console.log('ERROR(' + err.code + '): ' + err.message);
    }

    var getLocationOptions = {
        enableHighAccuracy: true
    }
});