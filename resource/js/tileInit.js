/**
 * Created by tianxia on 2/16/17.
 */
jQuery.noConflict();

var Init = Init || {}

jQuery(window).ready(function () {
    Init._setMapSize(6, 10);
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
Init._setMapSize = function (width, height) {
    if (typeof width == "undefined" || width < 3 || width > 10) {
        width = 10;
    }

    if (typeof height == "undefined" || height < 3 || height > 10) {
        height = 10;
    }

    this.mapWidth = width;
    this.mapHeight = height;
}

//设置有几种花色,最少三种
Init._setTileCategories = function (count) {
    if (typeof count == "undefined" || count < 3 || count > Init._defauleTileCategories.length) {
        count = Init._defauleTileCategories.length;
    }

    this._tileCategories = Init._defauleTileCategories.slice(0, count);
}

//创建为空的地图（map entity）
Init._initEmptyMap = function () {
    this.mapEntity = new Array();

    for (var i = 0; i < this.mapHeight; i++) {
        this.mapEntity[i] = new Array();
        for (var j = 0; j < this.mapWidth; j++) {
            this.mapEntity[i][j] = null;
        }
    }

    Init._refreshMapDisplay(this.mapEntity);
}

//将map entity的数据填充到显示层的table中
Init._refreshMapDisplay = function (obj) {
    if (typeof obj == "undefined") {
        console.error("map entity not found");
    }

    var htmlStr = "";

    for (var i = 0; i < obj.length; i++) {
        htmlStr += "<tr>";
        for (var j = 0; j < obj[i].length; j++) {
            htmlStr += "<td>";
            if (obj[i][j] == null) {
                htmlStr += "233";
            } else {

            }
            htmlStr += "</td>";
        }
        htmlStr += "</tr>";
    }

    jQuery("#gameMap").html(htmlStr);
}

Init.generateRandomTile = function () {
    var tiles = this._tileCategories;
    var index = Math.floor(Math.random() * tiles.length);
    console_test(tiles[index]);
}