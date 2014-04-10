'use strict'

angular.module('artPortfolioApp')
  .controller 'NavbarCtrl', ($scope, $location, Auth) ->
    $scope.menu = [
      title: 'Home'
      link: '/'
    ,
    # add other static menu items here
    ]

    $scope.logout = ->
      Auth.logout().then ->
        $location.path "/login"

    $scope.isActive = (route) ->
      route is $location.path()
