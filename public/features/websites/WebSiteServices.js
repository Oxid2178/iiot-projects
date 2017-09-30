app.factory('WebSiteService', function ($http) {

    //*** work both ***
    var findAll = function (callback) {
        $http({
            method: 'GET',
            url: '/rest/website'
        }).then(callback);
    };

    //*** work both ***
    //var findAll = function (callback) {
    //    $http.get('/rest/website')
    //    .then(callback);
    //}

    var create = function (website, callback) {
        $http.post('/rest/website', website)
        .then(callback);
    };

    var remove = function (id, callback) {
        $http({
            method: 'DELETE',
            url: '/rest/website/' + id,
            data: id
        }).then(callback);
    };

    return {
        create: create,
        findAll: findAll,
        remove: remove
    }

});