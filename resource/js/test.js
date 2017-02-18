/**
 * Created by tianxia on 2/16/17.
 */
jQuery.noConflict();

var Test = Test || {}


console_test = function (obj) {
    console.log(JSON.stringify(obj));
}

jQuery(window).ready(function () {
    Init.setMapSize(6, 10);
    Init.setTileCategories(5);
    Init.TEST_initEmptyMap();

    console_test(Main._tileCategories);
    Test.displayElimination();
});




//创建为空的地图（map entity）
Init.TEST_initEmptyMap = function () {
    Main.tileMap = new Array();

    for (var i = 0; i < Main.mapHeight; i++) {
        Main.tileMap[i] = new Array();
        for (var j = 0; j < Main.mapWidth; j++) {
            Main.tileMap[i][j] = Main.generateRandomTile();
        }
    }
// console_test(this.mapEntity)
//     Main._refreshMapDisplay(Main.tileMap);
    console_test(Main.tileMap);
    Main._buildEmptyMapDisplay();
}


Test.displayElimination = function() {
    jQuery("#gameMap td").each(function () {
        var _self = this;
        //start test Main._eliminable
        jQuery(_self).on('click', function() {
            var type = jQuery(_self).children("div:first").attr("tile-type");
            var tdId = jQuery(_self).attr("id");
            var obj = Main.decomposeTdId(tdId);
            obj.type = type;

            Main._eliminable(obj);
        });
    });
}