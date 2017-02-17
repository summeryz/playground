/**
 * Created by tianxia on 2/16/17.
 */
console_test = function (obj) {
    console.log(JSON.stringify(obj));
}

jQuery(window).ready(function () {
    Init.setMapSize(6, 10);
    Init.setTileCategories(5);
    Init.TEST_initEmptyMap();

    console_test(Main._tileCategories);
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

