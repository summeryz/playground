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

Main._draggableConfig = {
    cursor: "pointer",
    cursorAt: {top: 25, left: 25},
    opacity: 0.75,
    zIndex: 999,
    revert: true,
    revertDuration: 50,
    snapTolerance: 30,
    create: function() {
        // console_test("new tile created:" + JSON.stringify(jQuery(this)));
    },
    start: function (event, ui) {
        Main.originTile = jQuery(this).parent().attr('id');
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
}

Main._tileCategories = Main._defauleTileCategories;
Main.mapWidth = 10;
Main.mapHeight = 10;
Main.tileMap = null;

Main.originTile = null;
Main.targetTile = null;





Main._buildEmptyMapDisplay = function () {
    var htmlStr = "";

    for (var i = 0; i < Main.mapHeight; i++) {
        htmlStr += "<tr>";
        for (var j = 0; j < Main.mapWidth; j++) {
            var tdId = "td_r_" + i + "_c_"+ j;
            htmlStr += "<td id='"+ tdId + "'></td>";
        }
        htmlStr += "</tr>";
    }

    jQuery("#gameMap").html(htmlStr);

    Main._bindDrop();

    Main.refreshMapDisplay(Main.tileMap);
}

Main.refreshMapDisplay = function(obj) {
    if (typeof obj == "undefined") {
        console.error("map entity not found");
    }

    for (var row = 0; row < Main.tileMap.length; row++) {
        for (var col = 0; col < Main.tileMap[0].length; col++) {
            var tdId = "#td_r_" + row + "_c_" + col;
            Main._convertTileObjToDiv(Main.tileMap[row][col]).appendTo(jQuery(tdId));
        }
    }

}

Main._convertTileObjToDiv = function (tileObj) {
    if (tileObj == null) {
        return null;
    }

    return jQuery('<div/>', {
        "class": tileObj.name + " draggable",

    }).attr("tile-type", tileObj.name).draggable(Main._draggableConfig);
}




Main._bindDrop = function() {
    jQuery("#gameMap td").each(function () {
        var tdObj = jQuery(this);

        tdObj.droppable({
            drop: function (event, ui) {
                Main.targetTile = jQuery(this).attr('id');
                // console_test(Main.originTile);
                // console_test(Main.targetTile);

                //no swap
                if (!Main.validateTileSwap()) {
                    return;
                }

                var originTile = jQuery("#" + Main.originTile + " div");
                var targetTile = jQuery("#" + Main.targetTile + " div");


                Main._swapTileDisplay(originTile, targetTile);
                Main.originTile = null;
                Main.targetTile = null;
            }
        });
    });
}

Main.generateRandomTile = function () {
    var tiles = Main._tileCategories;
    var index = Math.floor(Math.random() * tiles.length);

    return tiles[index];
}

//td_r_4_c_5
Main.decomposeTdId = function(str) {
    res = str.split('_');
    return {row: res[2], col: res[4]};
}

Main.validateTileSwap = function() {
    //no swap
    if (Main.originTile == Main.targetTile) {
        return false;
    }

    var originTile = jQuery("#" + Main.originTile + " div");
    var targetTile = jQuery("#" + Main.targetTile + " div");

    //if same tile-type
    if (originTile.attr("tile-type") == targetTile.attr("tile-type") ) {
        return false;
    }

    //out of range, only up, right, down, left are validate, max distance is 1 tile;
    var originPos = Main.decomposeTdId(Main.originTile);
    var targetPos = Main.decomposeTdId(Main.targetTile);
    // console_test(originPos);
    // console_test(targetPos);
    if (Math.abs(originPos.row - targetPos.row) + Math.abs(originPos.col - targetPos.col) > 1) {
        return false;
    }

    //是否能消除
    if (!Main._eliminable()) {
        return false;
    }

    return true;
}


Main._swapTileDisplay = function (origin, target) {
    var originType = origin.attr("tile-type");
    var targetType = target.attr("tile-type");

    origin.removeClass(originType).addClass(targetType).attr("tile-type", targetType);
    target.removeClass(targetType).addClass(originType).attr("tile-type", originType);

}

Main._swapTileEntity = function (origin, target) {


}

Main._eliminable = function () {
    return true;
}

