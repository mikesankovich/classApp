app.controller('editInstitutionCtrl', function($scope, $state, $http){
  $scope.institutionAlumni = [];
  $http.get(url + 'institute/' + $state.params.instituteId).success(function(institution) {
    $scope.institution = institution;
    console.log(institution);
    institution.alumni.forEach(function(e) {
      $http.get(url + '' + e).success(function(user) {
        $scope.institutionAlumni.push(user);
      });
    });
  });

  $scope.showTag = function() {
    if ($scope.showTagForm === true) { return $scope.showTagForm = false;
    } else { return $scope.showTagForm = true; }
  };
  $scope.editTag = function(institution) {
    $http.post(url + 'edit/institutiontag/'+ $state.params.instituteId, institution).success(function(response) {
      console.log(response);
    });
  };

// NEEDS TO BE DONE ------------------------------------------------

  // $scope.hideButtons = function() {
  //   if (USER IS SIGNED IN) {
  //     joinButton Add Class "hideButton"
  //     addEventButton remove class "hideButton"
  //     leaveinstitution remove class "hideButton"
  //   }
  //   else if (USER IS NOT SIGNED IN) {
  //     joinButton remove class "hideButton"
  //     addEventButton add class "hideButton"
  //     leaveinstitution add class "hideButton"
  //   }
  // }

// NEEDS TO BE DONE ------------------------------------------------


  $scope.showPic = function() {
    if ($scope.showPicForm === true) { return $scope.showPicForm = false;
    } else { return $scope.showPicForm = true; }
  };
  $scope.editPic = function(institution) {
    $http.post(url + 'edit/institutionpic/'+ $state.params.instituteId, institution).success(function(response) {
      console.log(response);
    });
  };

  $scope.showBio = function() {
    if ($scope.showBioForm === true) {
      return $scope.showBioForm = false;
    } else {
      return $scope.showBioForm = true;
    }
  };
  $scope.editBio = function(institution) {
    $http.post(url + 'edit/institutionbio/'+ $state.params.instituteId, institution).success(function(response) {
      console.log(response);
    });
  };


  $scope.removeAlumni = function() {
    mixpanel.track("Alumni Removed");
    console.log(this.alumni._id);
    $http.post(url + 'edit/institutionalumni/'+ $state.params.instituteId + "/" + this.alumni._id).success(function() {
      $http.post(url + 'edit/leaveinstitution/' + $state.params.instituteId + "/" + this.alumni._id);
    });
    swal("Edit Success!", "You have removed "+ this.alumni.fullName + " from the institution", "success");
  };

});
