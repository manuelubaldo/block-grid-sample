angular.module("umbraco").controller("callToActionBlockController", function ($scope, mediaResource) {
    var buttonType = "btn-secondary";
    if ($scope.block.data.type) {
        var btnType = $scope.block.data.type[0];
        if (btnType) {
            buttonType = "btn-" + btnType.toLowerCase();
        }
    }
    $scope.buttonClass = "btn " + buttonType;
});