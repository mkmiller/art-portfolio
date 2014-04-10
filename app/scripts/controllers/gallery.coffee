'use strict'

angular.module('artPortfolioApp')
  .controller 'GalleryCtrl', ($scope, $upload, Artwork) ->
    $scope.updateImages = ->
        $scope.images = Artwork.query()

    $scope.onFileSelect = (files) ->
      angular.forEach files, (file) ->
        $scope.upload = ($upload.upload
          url: '/api/upload'
          file: file
          data:
            title: $scope.title,
            comment: $scope.comment
          ).success (data, status, headers, config) ->
            $scope.updateImages()

    $scope.remove = (image) ->
        image.$delete ->
            $scope.updateImages()

    $scope.updateImages()
