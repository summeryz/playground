/**
 * Created by tianxia on 2/16/17.
 */
jQuery.noConflict();

var Init = Init || {}

jQuery(window).ready(function () {
    Init._setMapSize();
    Init._setTileCategories(3);
    Init._initEmptyMap();

    console_test(Init._tileCategories);
});

Init._defauleTileCategories = [{
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


//设置地图尺寸
Init._setMapSize = function () {
    this.mapWidth = 6;
    this.mapHeight = 10;
}

//设置有几种花色,最少三种
Init._setTileCategories = function (count) {
    if (typeof count == "undefined" || count < 3 || count > Init._defauleTileCategories.length) {
        count = Init._defauleTileCategories.length;
    }

    this._tileCategories = Init._defauleTileCategories.slice(0, count);
}

//创建为空的地图
Init._initEmptyMap = function () {
    this.mainMap = new Array();

    for (var i = 0; i < this.mapHeight; i++) {
        this.mainMap[i] = new Array();
        for (var j = 0; j < this.mapWidth; j++) {
            this.mainMap[i][j] = 0;
        }
    }
}

Init.generateRandomTile = function () {
    var tiles = this._tileCategories;
    var index = Math.floor(Math.random() * tiles.length);
    console_test(tiles[index]);
}