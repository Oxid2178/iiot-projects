app.controller("WebSiteController",
function ($scope, $http, WebSiteService) {
    $scope.hello = "Hello from WebSiteController";

    WebSiteService.findAll(function (response) {
        console.log("Get all websites from mongodb");
        $scope.websites = response.data;
    }, function (error) {
        console.log("Error in Get all websites from mongodb");
    });

    //$http({
    //    method: 'GET',
    //    url: '/rest/website'
    //}).then(function (response) {
    //    console.log("Get all websites from mongodb");
    //    $scope.websites = response.data;
    //}, function (error) {
    //    console.log("Error in Get all websites from mongodb");
    //});

    $scope.add = function (website) {
        WebSiteService.create(website, function (response) {
            console.log("Add a website over POST request");
            console.log(response.data);
            $scope.websites = response.data;
        }, function (error) {
            console.log("Error in add a website over POST request");
        });
    };

    //$scope.add = function (website) {
    //    console.log(website);
    //    $http({
    //        method: 'POST',
    //        url: '/rest/website',
    //        data: website
    //    }).then(function (response) {
    //        console.log("Add a website over POST request");
    //        console.log(response.data);
    //        $scope.websites = response.data;
    //    }, function (error) {
    //        console.log("Error in add a website over POST request");
    //    });
    //};

    $scope.remove = function (id) {
        WebSiteService.remove(id, function (response) {
            console.log("Delete data over _id in mongodb");
            $scope.websites = response.data;
        }, function (error) {
            console.log("Error in Delete data over _id in mongodb");
        });
    }

    //$scope.remove = function (id) {
    //    console.log(id);
    //    $http({
    //        method: 'DELETE',
    //        url: '/rest/website/' + id,
    //        data: id
    //    }).then(function (response) {
    //        console.log("Delete data over _id in mongodb");
    //        $scope.websites = response.data;
    //    }, function (error) {
    //        console.log("Error in Delete data over _id in mongodb");
    //    });
    //};

});