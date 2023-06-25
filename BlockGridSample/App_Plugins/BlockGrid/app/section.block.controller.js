angular.module("umbraco").controller("sectionBlockController", function ($scope, mediaResource) {
    console.log("sectionBlockController", $scope.block.settingsData);
    var settings = $scope.block.settingsData;
    $scope.blockStyles = "";
    $scope.blockClasses = "section-block";

    var textColor = "#FFF";
    var backgroundColor = "transparent";
    var backgroundImage = "";
    var background = "";
    var size = "M";
    var fullWidth = false;

    if (settings.contrast) {
        textColor = "#" + settings.contrast.value;
    }

    if (settings.color) {
        backgroundColor = "#" + settings.color.value;
        background = backgroundColor;
    }

    if (settings.image && settings.image.length > 0) {
        var mediaKey = settings.image[0].mediaKey;
        mediaResource.getById(mediaKey)
            .then(function (media) {
           
                backgroundImage = media.mediaLink;
                backgroundColor = hexToRgb(backgroundColor,0.9);
                background = `linear-gradient(${backgroundColor}, ${backgroundColor}), url(${backgroundImage})`;
                $scope.blockStyles += "--section-block-background: " + background + ";";
            })
    }

    if (settings.size) {
        var size = settings.size[0];
    }

    

    switch (size) {
        case "S":
            $scope.blockClasses += " section-block--small";
            break;
        case "M":
            $scope.blockClasses += " section-block--medium";
            break;
        case "L":
            $scope.blockClasses += " section-block--large";
            break;
        default:
    }

    $scope.blockStyles = "padding-right:1rem;padding-left:1rem;";
    $scope.blockStyles += "--section-block-color: " + textColor + ";";
    $scope.blockStyles += "--section-block-background: " + background + ";";

    function hexToRgb(hex, opacity = 1) {
        // Remove the # symbol if present
        hex = hex.replace("#", "");

        // Check if it's a 3-character hexadecimal color code
        if (hex.length === 3) {
            // Duplicate each character to expand to 6 characters
            hex = hex.replace(/(.)/g, "$1$1");
        }

        // Convert the hexadecimal string to decimal values
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        // Return the RGBA format as a string
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
});