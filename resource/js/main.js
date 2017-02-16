/**
 * Created by tianxia on 2/16/17.
 */
jQuery.noConflict();

var Main = Main || {}


Main._defauleTileCategories = [{
        name: "box",
        icon: "box.png"
    },
    {
        name: "circling",
        icon: "circling.png"
    },
    {
        name: "round",
        icon: "round.png"
    },
    {
        name: "screen",
        icon: "screen.png"
    },
    {
        name: "song",
        icon: "song.png"
    }];


Main._tileCategories = Main._defauleTileCategories;
Main.mapWidth = 10;
Main.mapHeight = 10;
Main.mapEntity = null;

Main.originTile = null;
Main.targetTile = null;




//将map entity的数据填充到显示层的table中
Main._refreshMapDisplay = function (obj) {
    if (typeof obj == "undefined") {
        console.error("map entity not found");
    }

    var htmlStr = "";

    for (var i = 0; i < obj.length; i++) {
        htmlStr += "<tr>";
        for (var j = 0; j < obj[i].length; j++) {
            var className = "null";
            if (obj[i][j] != null) {
                className = obj[i][j].name;
            }
            htmlStr += "<td><div class='"+className+"'></div></td>";
        }
        htmlStr += "</tr>";
    }

    jQuery("#gameMap").html(htmlStr);

    Main._bindDragAndDrop();
}

Main._bindDragAndDrop = function () {

    jQuery("#gameMap td").each(function () {
        var col = jQuery(this).parent().children().index(jQuery(this));
        var row = jQuery(this).parent().parent().children().index(jQuery(this).parent());

        jQuery(this).draggable({
            cursor: "pointer",
            cursorAt: {top: 25, left: 25},
            // snap: true,
            // snapTolerance: 30,
            opacity: 0.75,
            zIndex: 999,
            revert: true,
            revertDuration: 50,
            snapTolerance: 30,
            start: function (event, ui) {
                Main.originTile = {"col": col, "row": row};
                console_test(Main.originTile);
            },
            drag: function(event, ui) {
                //constraint tiles
                ui.position.top = Math.min( 54, ui.position.top);
                ui.position.top = Math.max( -54, ui.position.top);
                ui.position.left = Math.min( 54, ui.position.left);
                ui.position.left = Math.max( -54, ui.position.left);

            },
            stop: function (event, ui) {

            }
        });


    });




}

Main.generateRandomTile = function () {
    var tiles = Main._tileCategories;
    var index = Math.floor(Math.random() * tiles.length);

    return tiles[index];
}



