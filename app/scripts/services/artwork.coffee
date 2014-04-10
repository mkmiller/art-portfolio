"use strict"

angular.module("artPortfolioApp")
  .factory "Artwork", ($resource) ->
    $resource "/api/artwork/:id",
      id: "@_id"

