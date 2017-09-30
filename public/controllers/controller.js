app.controller('AppCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {
    console.log("Hello World from controller");

    //var request = require('request');
    //var bodyParser = require('body-parser');
    //var multer = require('multer'); // v1.0.5
    //var upload = multer(); // for parsing multipart/form-data

    //app.use(bodyParser.json()); // for parsing application/json
    //app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    /* url  */
    var humidity_url = "https://us.wio.seeed.io/v1/node/GroveTempHumD1/humidity?access_token=d8908e4d902622e615d28306175ebca5";
    var temperature_url = "https://us.wio.seeed.io/v1/node/GroveBaroBMP085I2C0/temperature?access_token=d8908e4d902622e615d28306175ebca5";

	//var refresh = function() {
	
	$http({
	    method: 'GET',
	    url: '/contactlist'
	}).then(function (response){
	   	console.log("I got the data I requested");
	   	$scope.contactlist = response.data;
	},function (error) {
	   	console.log("Error in GET contactlist...");
	});
	//};

	//refresh();

   	$scope.addContact = function() {
   		console.log($scope.contact);
   		$http({
     		method: 'POST',
      		url: '/contactlist',
      		data: $scope.contact
   		}).then(function (response) {
   			console.log("Post data to server");
   			console.log(response.data);
   		    //refresh();
   			$scope.contactlist = response.data;
   			clear();
   		},function (error) {
   			console.log("Error in addContact (POST) contactlist...");
   		});
   	};

   	$scope.remove = function(id) {
   		console.log(id);
   		$http({
     		method: 'DELETE',
      		url: '/contactlist/' +id,
      		data: id
   		}).then(function (response) {
   			console.log("Delete data to server");
   		    //refresh();
   			$scope.contactlist = response.data;
   		},function (error) {
   			console.log("Error in remove (DELETE) contactlist...");
   		});
   	};

   	$scope.edit = function(id) {
   		console.log(id);
   		$http({
     		method: 'GET',
      		url: '/contactlist/' +id
   		}).then(function (response) {
   		    console.log("Edit data to server");
   		    console.log(response.data);
   			$scope.contact = response.data;
   		},function (error) {
   			console.log("Error in EDIT (GET) contactlist...");
   		});
   	};

   	$scope.update = function() {
   		console.log($scope.contact._id);
   		$http({
     		method: 'PUT',
      		url: '/contactlist/' +$scope.contact._id,
      		data: $scope.contact
   		}).then(function (response) {
   			console.log("Put data to server");
   			console.log(response.data);
   		    //refresh();
   			$scope.contactlist = response.data;
   			clear();
   		},function (error) {
   			console.log("Error in UPDATE (PUT) contactlist...");
   		});
   	};

   	$scope.deselect = function() {
   	    clear();
   	};

   	clear = function () {
   	    $scope.contact = {
   	        name: '',
   	        email: '',
   	        number: ''
   	    };
   	};










   	var testdata1 = {
   	    room: 'room1',
   	    users: '1'
   	};

   	var testdata2 = {
   	    room: 'room2',
   	    users: '2'
   	};

   	var testdatas = [testdata1, testdata2];

   	$scope.datas = testdatas;

   	var setLobbyRoom = function (roomData, userId) {
   	    //$scope.testdata = [];
   	    var testdata = {
   	        room: roomData,
   	        users: userId
   	    };
   	    testdatas.push(testdata);
   	};

   	var i = 3;
   	var update = function () {
   	    console.log("timerUpdate");
        setLobbyRoom('room'+ i, i++);
        $route.reload();
   	};

   	setInterval(update, 1000);




   	


   	//var point1 = { x: 0, y: 4 };

   	//var point2 = { x: 1, y: 15 };

   	//var point3 = { x: 2, y: 8 };
     
   	//var plotdatas = [[point1, point2, point3]];

   	//$scope.series = ['Series A'];
   	//$scope.plots = plotdatas;

   	//$scope.onClick = function (points, evt) {
   	//    console.log(points, evt);
   	//};

   	//$scope.options = {
   	//    scales: {
   	//        xAxes: [{
   	//            type: 'linear',
   	//            position: 'bottom'
   	//        }]
   	//    }
   	//};

   	//var setPoints = function (xCoord, yCoord) {
   	//    var point = {
   	//        x: xCoord,
   	//        y: yCoord
   	//    };
   	//    plotdatas.push(point);
   	//};

   	//var i = 3;
   	//var updatePlots = function () {
   	//    console.log("timerUpdatePlots");
   	//    setPoints(i++, i++);
   	//    myLineChart.update();
   	//    $route.reload();
   	//};

   	//setInterval(updatePlots, 1000);


   	//var canvas = document.getElementById('myChart');
   	//var myLineChart = Chart.Line(canvas);

    //var option = {
    //    showLines: true
    //};
    //var myLineChart = Chart.Line($scope.datas, {
    //    data: plotdatas,
    //    options: option
    //});


   	var humidity_data;
   	var update_humidity_data = function () {
   	    console.log('fct entry humidity');
   	    $http({
   	        method: 'GET',
   	        url: humidity_url
   	    }).then(function (response) {
   	        console.log(response.data);
   	        humidity_data = response.data.humidity;
   	        console.log(humidity_data);
   	    }, function (error) {
   	        console.log(error);
   	    });
   	    return humidity_data;
   	};

   	var temperature_data;
   	var update_temperature_data = function () {
   	    console.log('fct entry temperature');
   	    $http({
   	        method: 'GET',
   	        url: temperature_url
   	    }).then(function (response) {
   	        console.log(response.data);
   	        temperature_data = response.data.temperature;
   	        console.log(temperature_data);
   	    }, function (error) {
   	        console.log(error);
   	    });
   	    return temperature_data;
   	};

   	//var temperature_data;
   	//var update_temperature_data = function () {
   	//    console.log('fct entry temperature');
   	//    request({
   	//        method: 'GET',
   	//        url: temperature_url,
   	//        json: true,
   	//        strictSSL: false,
   	//        rejectUnhauthorized: false
   	//    }, function (error, response, body) {
   	//        console.log(body);
   	//        if (!error && response.statusCode == 200) {
   	//            //var info = JSON.parse(body);
   	//            temperature_data = body.celsius_degree;
   	//            console.log('body.celsius_degree: ');
   	//            console.log(body.celsius_degree);
   	//            //socket.emit('temperature_data', temperature_data);
   	//            //console.log(info);
   	//        } else
   	//            console.log(error);
   	//    });
   	//};

   	var canvas = document.getElementById('myChart').getContext('2d');
   	var data = {
   	    //labels: ["January", "February", "March", "April", "May", "June", "July"],
   	    //labels: ["1", "2", "3", "4", "5", "6", "7"],
   	    labels: [1, 2, 3, 4, 5, 6, 7],
   	    datasets: [
            {
                label: "My First dataset",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                pointHitRadius: 10,
                data: [65, 59, 80, 0, 56, 55, 40],
            }
   	    ]
   	};

    //$scope.options = {
    //    scales: {
    //        xAxes: [{
    //              type: 'linear',
    //              position: 'bottom'
    //          }]
    //    }
    //};

   	//$scope.adddata = function adddata() {
    //    console.log("adddata()")
   	//    myLineChart.data.datasets[0].data[7] = 60;
   	//    myLineChart.data.labels[7] = "Newly Added";
   	//    myLineChart.update();
   	//}

   	
   	$scope.adddata = function (newData) {
   	    console.log("adddata()");
   	    //adddataToPlot(getRandomArbitrary(0, 101));
   	    adddataToPlot(update_temperature_data());
   	    //update_humidity_data();
   	    //update_temperature_data();
   	};

   	var dataIdx = 7;
   	var adddataToPlot = function (newData) {
   	    console.log("adddataToPlot()");
   	    myLineChart.data.datasets[0].data[dataIdx] = newData;
   	    myLineChart.data.labels[dataIdx] = ++dataIdx;
   	    myLineChart.update();
   	};

   	var updateDataToPlot = function () {
   	    console.log("updateDataToPlot()");
   	    //adddataToPlot(getRandomArbitrary(0, 101));
   	    //adddataToPlot(update_humidity_data());
   	    //adddataToPlot(update_temperature_data());
   	    var newData = update_temperature_data();
   	    console.log(newData);
   	    if (newData != undefined) {
   	        adddataToPlot(newData);
   	    }
   	};

   	setInterval(updateDataToPlot, 1000);

   	var option = {
   	    title: {
   	        display: true,
   	        fontSize: 24,
            fontStyle: "bold",
   	        text: "My BastelroomTödi Temperature"
   	    },
   	    showLines: true,
   	    scales: {
   	        xAxes: [{
   	            scaleLabel: {
   	                display: true,
   	                labelString: 'Samples [n]'
   	            }
   	        }],
   	        yAxes: [{
   	            scaleLabel: {
   	                display: true,
   	                labelString: 'Temperature [°C]'
                }
            }]
   	    }
   	};
   	var myLineChart = Chart.Line(canvas, {
   	    data: data,
   	    options: option
   	});

   	function getRandomArbitrary(min, max) {
   	    return Math.random() * (max - min) + min;
   	}







   	//var point = [{ x: 0, y: 4 }, { x: 1, y: 15 }, { x: 2, y: 8 }];

   	//$scope.series = ['Series A', 'Series B'];
   	//$scope.plots = [
    //  [{ x: 0, y: 4 }, { x: 1, y: 15 }, { x: 2, y: 8 }]
    //];

   	//$scope.onClick = function (points, evt) {
   	//    console.log(points, evt);
    //};

   	//$scope.options = {
   	//    scales: {
   	//        xAxes: [{
    //              type: 'linear',
    //              position: 'bottom'
    //          }]
   	//    }
   	//};

}]);




app.controller('DataTablesCtrl', ['$scope', function ($scope) {
    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.colors = [
      { // grey
          backgroundColor: 'rgba(148,159,177,0.2)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointHoverBackgroundColor: 'rgba(148,159,177,1)',
          borderColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // dark grey
          backgroundColor: 'rgba(77,83,96,0.2)',
          pointBackgroundColor: 'rgba(77,83,96,1)',
          pointHoverBackgroundColor: 'rgba(77,83,96,1)',
          borderColor: 'rgba(77,83,96,1)',
          pointBorderColor: '#fff',
          pointHoverBorderColor: 'rgba(77,83,96,0.8)'
      }
    ];
    $scope.options = { legend: { display: false } };
    $scope.randomize = function () {
        $scope.data = $scope.data.map(function (data) {
            return data.map(function (y) {
                y = y + Math.random() * 10 - 5;
                return parseInt(y < 0 ? 0 : y > 100 ? 100 : y);
            });
        });
    };
}]);