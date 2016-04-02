var app = angular.module('angularFireApp', ['firebase']);
app.controller('fireCtrl', function ($scope, $firebaseObject) {
    var ref = new Firebase("https://popping-heat-3614.firebaseio.com");
    $scope.data = $firebaseObject(ref);
    console.log($scope.data);
});

app.controller('mainCtrl', function ($scope) {
    $scope = {
        locality: {},
        timeSlots: {}
    }
});
var myFirebaseRef = new Firebase("https://popping-heat-3614.firebaseio.com/");
$('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
        var name = $('#nameInput').val();
        var text = $('#messageInput').val();
        myFirebaseRef.set('User' + name + 'says' + text);
        $('#messageInput').val();
    }
});