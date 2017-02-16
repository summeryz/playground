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
            htmlStr += "<td class='"+className+"'></td>";
        }
        htmlStr += "</tr>";
    }

    jQuery("#gameMap").html(htmlStr);
}

Main.generateRandomTile = function () {
    var tiles = Main._tileCategories;
    var index = Math.floor(Math.random() * tiles.length);

    return tiles[index];
}



