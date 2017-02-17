/**
 * Created by tianxia on 2/16/17.
 */
jQuery.noConflict();

var Init = Init || {}


//设置地图尺寸
Init.setMapSize = function (width, height) {
    if (typeof width == "undefined" || width < 3 || width > 10) {
        return;
    }

    if (typeof height == "undefined" || height < 3 || height > 10) {
        return;
    }

    Main.mapWidth = width;
    Main.mapHeight = height;
}

//设置有几种花色,最少三种
Init.setTileCategories = function (count) {
    var defaultCategories = Main._defauleTileCategories;
    if (typeof count == "undefined" || count < 3 || count > defaultCategories.length) {
        count = defaultCategories.length;
    }

    Main._tileCategories = defaultCategories.slice(0, count);
}

//创建为空的地图（map entity）
Init._initEmptyMap = function () {
    Main.tileMap = new Array();

    for (var i = 0; i < Main.mapHeight; i++) {
        Main.tileMap[i] = new Array();
        for (var j = 0; j < Main.mapWidth; j++) {
            Main.tileMap[i][j] = null;
        }
    }

    // Main._refreshMapDisplay(Main.tileMap);
    Main._buildEmptyMapDisplay();
}

