/**
 * Created by tianxia on 2/16/17.
 */
console_test = function (obj) {
    console.log(JSON.stringify(obj));
}

jQuery(window).ready(function () {
    Init._setMapSize(6, 10);
    Init._setTileCategories(5);
    Init.TEST_initEmptyMap();

    console_test(Main._tileCategories);
});




//创建为空的地图（map entity）
Init.TEST_initEmptyMap = function () {
    Main.mapEntity = new Array();

    for (var i = 0; i < Main.mapHeight; i++) {
        Main.mapEntity[i] = new Array();
        for (var j = 0; j < Main.mapWidth; j++) {
            Main.mapEntity[i][j] = Main.generateRandomTile();
        }
    }
// console_test(this.mapEntity)
    Main._refreshMapDisplay(Main.mapEntity);
}
