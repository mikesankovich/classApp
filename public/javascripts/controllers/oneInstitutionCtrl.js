app.controller('oneInstitutionCtrl', function($scope, $state, $http){
  $scope.institutionAlumni = [];
  $scope.urlId = $state.params.instituteId;
  console.log($scope.urlId);
  $http.get(url + 'institute/' + $state.params.instituteId).success(function(institution) {
    $scope.institution = institution;
    $scope.events = institution.events;
    institution.alumni.forEach(function(e) {
      $http.get(url + '' + e).success(function(user) {
        $scope.institutionAlumni.push(user);
      });
    });
  });
  $http.get(url + 'user').success(function(user) {
    if(user) {
      console.log("user", user);
      $scope.user = user;
      $scope.currentUser = user.username;
      $scope.userId = user._id;
      console.log($scope.userId);
    }
  });
  $scope.joinInstitution = function(user) {
    console.log($state.params.instituteId);
    $http.post(url + 'institution/newalumni/' + $state.params.instituteId, user).success(function() {
    });
    swal("Edit Success!", "You have joined this institution", "success");
  };
  $scope.joinInstitutionOpen = function() {
    $scope.showJoinForm = true;
  };

  $scope.leaveInstitution = function() {
    mixpanel.track("Institution Left");
    console.log($scope.user._id);
    $http.post(url + 'edit/institutionalumni/'+ $state.params.instituteId + "/" + $scope.user._id).success(function() {
      $http.post(url + 'edit/leaveinstitution/' + $state.params.instituteId + "/" + $scope.user._id);
    });
  };

  $scope.addEvent = function(newEvent) {
    console.log(newEvent);
    // $scope.newEvent = newEvent;
    $http.post(url + 'events/new/' + $state.params.instituteId, newEvent).success(function(newEvent) {
      mixpanel.track("New Event Sucessfully Created");
      console.log(newEvent);
      // $state.go($state.current, {}, {reload: true});

      swal("Success!", "You have created an event", "success");
      // swal({
      //   title: "Success!",
      //   text: "You have created a new event",
      //   type: "success",
      // },
      // function(){
      //   // $state.go($state.current, {}, {reload: true});
      // });
    });
  };

  $scope.showOneUser = function() {
    console.log(this.alumni._id);
    $state.go('oneUser', {alumniId:this.alumni._id});
  };
  $scope.showInstitutionEdit = function() {
    instituteId = this.institution._id;
    console.log(instituteId);
    $state.go('editinstitution', {instituteId:instituteId});
    console.log("yes");
  };
});
