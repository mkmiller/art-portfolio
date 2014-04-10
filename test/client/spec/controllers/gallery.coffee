'use strict'

describe 'Controller: GalleryCtrl', () ->
  GalleryCtrl = {}
  scope = {}
  $httpBackend = {}

  beforeEach ->
    # load the controller's module
    module 'artPortfolioApp'

    # Initialize the controller and a mock scope
    inject ($rootScope, $controller, _$httpBackend_) ->
      scope = $rootScope.$new()
      GalleryCtrl = $controller 'GalleryCtrl', {
        $scope: scope
      }
      $httpBackend = _$httpBackend_
      $httpBackend.when('GET', '/api/artwork').respond ['My masterpaysa', 'Masterpaysa part deux', 'Artwork']
      $httpBackend.when('DELETE', '/api/artwork').respond {}

  it 'should attach a list of artwork images to the scope', () ->
      expect(scope.images).toBeDefined()
      expect(scope.images).not.toBeNull()
      $httpBackend.flush()
      expect(scope.images.length).toBe 3

  it 'should remove an image via delete', () ->
      $httpBackend.flush()
      expect(scope.images.length).toBe 3
      scope.remove scope.images[0]
      $httpBackend.flush()
      $httpBackend.verifyNoOutstandingExpectation()
      $httpBackend.verifyNoOutstandingRequest()

