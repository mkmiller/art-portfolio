'use strict'

angular.module('artPortfolioApp')
  .factory 'Session', ($resource) ->
    $resource '/api/session/'
