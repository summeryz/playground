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
            Main.tileMap[i][j] = {
                    name: "empty",
                    icon: "empty"
                };
        }
    }

    // Main._refreshMapDisplay(Main.tileMap);
    Main._buildEmptyMapDisplay();
}

Init.initStartMap = function() {
    Init._initEmptyMap();

    for (var row = Main.mapHeight - 1; row >= 0; row--) {
        for(var col = Main.mapWidth - 1; col >= 0; col--) {
            Init.initTileGenerator(row, col);
        }
    }

    Main._buildEmptyMapDisplay();
}

//
Init.initTileGenerator = function (row, col) {
    var test = 100;

    while (Main.tileMap[row][col].name == "empty") {
        if (test-- < 0) {
            throw "dead loop in tile generator";
        }

        Main.tileMap[row][col] = Init.randomTileGenerator();

        //初始不能有 已经可消除的块
        if (Main._tileMatching(row, col).result) {
            console_test([row, col]);
            console_test(Main.tileMap[row][col]);
            Main.clearTileEntity(row, col);
        }
    }
}

Init.randomTileGenerator = function () {
    var tiles = Main._tileCategories;
    var index = Math.floor(Math.random() * tiles.length);

    return tiles[index];
}
