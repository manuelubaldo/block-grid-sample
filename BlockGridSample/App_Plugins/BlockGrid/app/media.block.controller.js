angular.module("umbraco").controller("mediaBlockController", function ($scope, mediaResource) {
    //your property is called image so the following will contain the udi:
    var imageUdi = $scope.block.data.image[0].mediaKey;
    //the mediaResource has a getById method:
    mediaResource.getById(imageUdi).then(function (media) {
        //set a property on the 'scope' called imageUrl for the returned media object's mediaLink
        $scope.imageUrl = media.mediaLink;
    });
});