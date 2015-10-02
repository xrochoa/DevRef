        $scope.checkAndLoad = function (object, isit) {
            if ($scope.data[object] === undefined) {
                if (isit !== 'no') {
                    $scope.geRefJSON(object);
                } else {
                    $scope.geRefJSONAsObject(object);
                }
            }
        };
