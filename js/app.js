angular.module("DevRefApp", ['ngRoute', 'ngAnimate', 'ngSanitize'])
    .controller('mainCtrl', ['$scope', '$routeParams', '$rootScope', '$location', '$window', '$http', '$sce', function ($scope, $routeParams, $rootScope, $location, $window, $http, $sce) {

        $scope.params = $routeParams;
        $scope.data = {};

        $scope.data.changeHeader = function (obj, img) {
            $scope.data.header = obj;
            $scope.data.mainImg = img;
            $scope.location = $location.path() === '/';
        };

        $scope.data.MainArr = [
            {
                name: 'HTML',
                desc: 'Create the structure of web documents',
                img: 'http://www.w3.org/html/logo/downloads/HTML5_Logo_256.png'
            },
            {
                name: 'CSS',
                desc: 'Give style to web documents'
            },
            {
                name: 'Javascript',
                desc: 'Make web documents interactive'
            },
            {
                name: 'Bootstrap',
                desc: 'Use prebuilt CSS with responsive design'
            },
            {
                name: 'JQuery',
                desc: 'Use prebuilt Javascript functions'
            },
            {
                name: 'Angular',
                desc: 'Enhance HTML for web apps'
            },
            {
                name: 'Sass',
                desc: 'Give super powers to CSS',
                img: 'http://sass-lang.com/assets/img/logos/logo-b6e1ef6e.svg'
            },
            {
                name: 'npm',
                desc: 'Install modules for the server-side'
            },
            {
                name: 'bower',
                desc: 'Install components for the client-side'
            },
            {
                name: 'gulp',
                desc: 'Automate tasks'
            },
            {
                name: 'Node',
                desc: 'Use javascript in the server'
            },
            {
                name: 'Mongo',
                desc: 'Store databases as Javascript objects'
            }
        ];


        //for easier manipulation and depending on input Json this ends up instantiated as a javascript array
        $scope.geRefJSONasArray = function (file) {
            $http.get('refs/' + file + '.json')
                .then(function (res) {
                    $scope.data[file + 'Arr'] = [];
                    var key;
                    var i = 0;
                    for (key in res.data) {
                        $scope.data[file + 'Arr'][i] = res.data[key];
                        i++;
                    }
                    console.log($scope.data); //check data loaded
                });
        };

        //for easier manipulation and depending on input Json this ends up instantiated as a javascript object
        $scope.geRefJSONAsObject = function (file) {
            $http.get('refs/' + file + '.json')
                .then(function (res) {
                    $scope.data[file + 'Obj'] = res.data;
                    console.log($scope.data); //check data loaded
                });
        };

        $scope.globalAttrs = function (items, isit) {
            var global = {};
            var other = {};
            angular.forEach(items, function (value, key) {
                if (value.tag === 'HTML elements') {
                    global[key] = value;
                } else {
                    other[key] = value;
                }
            });
            if (isit === 'yes') {
                return global;
            } else {
                return other;
            }
        };

        $scope.trust = function (html) {
            return $sce.trustAsHtml(html);
        };


    }])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'RevDevCtrl',
                templateUrl: 'content/main.html',
            })
            .when('/html', {
                controller: 'HTMLSyntaxCtrl',
                templateUrl: 'content/html.html'
            })
            .when('/html/elements', {
                controller: 'HTMLElementsCtrl',
                templateUrl: 'content/html/elements.html'
            })
            .when('/html/tag/:HTMLElementId', {
                controller: 'HTMLOneElementCtrl',
                templateUrl: 'content/html/element.html'
            })
            .when('/sass', {
                controller: 'SassCtrl',
                templateUrl: 'content/sass.html'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    }])
    .controller('RevDevCtrl', ['$scope', function ($scope) {
        $scope.data.changeHeader({
            name: 'DEVREF',
            desc: 'The complete reference for the Full-Stack Javascript Developer',
            img: 'https://pbs.twimg.com/profile_images/1825435844/Duarte-CircleD-Logo2.png'
        });
            }])
    .controller('SassCtrl', ['$scope', function ($scope) {
        $scope.data.changeHeader($scope.data.MainArr[6]);
        $scope.geRefJSONasArray('SassCLI');
        $scope.geRefJSONasArray('Sass');
            }])
    .controller('HTMLSyntaxCtrl', ['$scope', function ($scope) {
        $scope.data.changeHeader($scope.data.MainArr[0]);
        $scope.geRefJSONasArray('HTMLSyntax');
            }])
    .controller('HTMLOneElementCtrl', ['$scope', function ($scope) {
        $scope.geRefJSONAsObject('HTMLElements');

            }])
    .controller('HTMLElementsCtrl', ['$scope', function ($scope) {
        $scope.geRefJSONAsObject('HTMLGroups');
        $scope.geRefJSONasArray('HTMLElements');


    }])
    .filter('trust', ['$sce', function ($sce) {
        return function (code) {
            return $sce.trustAsHtml(code);
        };
}])
    .directive('square', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: false,
            template: '<div class="square"><div class="content"><div class="table"><div class="table-cell" ng-transclude></div></div></div></div>'
        }
    });
