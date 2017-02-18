/**
 * Created by tianxia on 2/16/17.
 */
jQuery.noConflict();

var Test = Test || {}

Test.enable = true;

console_test = function (obj) {
    console.log(JSON.stringify(obj));
}

jQuery(window).ready(function () {
    Init.setMapSize(6, 10);
    Init.setTileCategories(5);

    // Init.TEST_initEmptyMap();

    Init.initStartMap();

    console_test(Main._tileCategories);
    Test.displayElimination();
});




//创建为空的地图（map entity）
Init.TEST_initEmptyMap = function () {
    Main.tileMap = new Array();

    for (var i = 0; i < Main.mapHeight; i++) {
        Main.tileMap[i] = new Array();
        for (var j = 0; j < Main.mapWidth; j++) {
            Main.tileMap[i][j] = Init.randomTileGenerator();
        }
    }
// console_test(this.mapEntity)
//     Main._refreshMapDisplay(Main.tileMap);
    console_test(Main.tileMap);
    Main._buildEmptyMapDisplay();
}


// Test.displayElimination = function() {
//     jQuery("#gameMap td").each(function () {
//         var _self = this;
//         //start test Main._eliminated
//         jQuery(_self).on('click', function() {
//             //only for test
//             var type = jQuery(_self).children("div:first").attr("tile-type");
//             var tdId = jQuery(_self).attr("id");
//             var obj = Main.decomposeTdId(tdId);
//             obj.type = type;
//             obj.entityType = Main._getTileTypeByPos(obj.row, obj.col);
//             console_test(obj);
//             //only for test
//
//
//             Main._eliminated(obj.row, obj.col);
//         });
//     });
// }

Test.displayElimination = function() {
    jQuery("#gameMap td").each(function () {
        var _self = this;
        //start test Main._eliminated
        jQuery(_self).on('click', function() {
            //only for test
            var type = jQuery(_self).children("div:first").attr("tile-type");
            var tdId = jQuery(_self).attr("id");
            var obj = Main.decomposeTdId(tdId);
            obj.type = type;
            obj.entityType = Main._getTileTypeByPos(obj.row, obj.col);

            //only for test
            console_test(obj);
            console_test(Main.tileMap[obj.row][obj.col]);

        });
    });
}

Test.displayTileStatus = function() {
    if (!Test.enable) {
        return;
    }

    for (var i = 0; i < Main.mapHeight; i++) {
        for (var j = 0; j < Main.mapWidth; j++) {
            var tdId = "#td_r_" + i + "_c_"+ j;
            var moveDown = Main.tileMap[i][j].moveDown;
            var removable = Main.tileMap[i][j].removable;
            jQuery(tdId).children("div:first").html(moveDown);
        }
    }
}