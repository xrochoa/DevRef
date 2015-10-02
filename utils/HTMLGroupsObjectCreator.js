//Used inside angular to extract data to a json organized file       

$scope.HTMLGrouping = function (data) {
    $scope.data.HTMLGroups = {
        "The Root Element": [],
        "Document Metadata": [],
        "Sections": [],
        "Grouping Content": [],
        "Text-level Semantics": [],
        "Links": [],
        "Edits": [],
        "Embedded Content": [],
        "Tabular Data": [],
        "Forms": [],
        "Interactive Elements": [],
        "Scripting": []
    };

    for (i = 0; i < $scope.data[data].length; i++) {
        $scope.data.HTMLGroups[$scope.data[data][i].type[0]].push($scope.data[data][i].tag);
        if ($scope.data[data][i].type[1] !== undefined) {
            $scope.data.HTMLGroups[$scope.data[data][i].type[1]].push($scope.data[data][i].tag);
        }

    }
    console.log($scope.data.HTMLGroups); //sent this to as a string to a url and then saved as a json file

};


$scope.geRefJSON = function (file) {
    $http.get('refs/' + file + '.json')
        .then(function (res) {
            $scope.data[file] = [];
            var key;
            var i = 0;
            for (key in res.data) {
                $scope.data[file][i] = res.data[key];
                i++;
            }
            console.log($scope.data); //check data loaded
            if (file === 'HTMLElements') {
                $scope.HTMLGrouping('HTMLElements');
            }
        });
};
