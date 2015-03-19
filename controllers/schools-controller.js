angular.module('myApp').controller('SchoolsController', ['$scope', 'schoolsMasterList', 'close', 'modalMessage', 'filterBy', function($scope, schoolsMasterList, close, modalMessage, filterBy) {

  $scope.schoolsMasterList = schoolsMasterList;
  $scope.modalMessage = modalMessage;
  $scope.filterBy = filterBy;
  $scope.selectedSchoolId = null;

  $scope.done = function() {
    close($scope.selectedSchoolId, 500); 
  };

  $scope.cancel = function() {
    close(null, 500); 
  };

  $scope.selectSchool = function(schoolId) {
    console.log("Select School " + schoolId);
    $scope.selectedSchoolId = schoolId;
  };

}]);
