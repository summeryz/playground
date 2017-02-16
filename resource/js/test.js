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

    console_test(Init._tileCategories);
});





//创建为空的地图（map entity）
Init.TEST_initEmptyMap = function () {
    this.mapEntity = new Array();

    for (var i = 0; i < this.mapHeight; i++) {
        this.mapEntity[i] = new Array();
        for (var j = 0; j < this.mapWidth; j++) {
            this.mapEntity[i][j] = Init.generateRandomTile();
        }
    }
// console_test(this.mapEntity)
    Init._refreshMapDisplay(this.mapEntity);
}
