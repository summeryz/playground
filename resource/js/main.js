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
    },
    // {//empty block example
    //     name: "empty",
    //     icon: "empty"
    // }
    ];

Main._draggableConfig = {
    cursor: "pointer",
    cursorAt: {top: 25, left: 25},
    opacity: 0.75,
    zIndex: 999,
    revert: true,
    revertDuration: 50,
    snapTolerance: 30,
    create: function() {
        // console_test("new tile created:" + JSON.stringify(jQuery(this)));
    },
    start: function (event, ui) {
        Main.originTileId = jQuery(this).parent().attr('id');
    },
    drag: function(event, ui) {
        //constraint tiles
        ui.position.top = Math.min( 54, ui.position.top);
        ui.position.top = Math.max( -54, ui.position.top);
        ui.position.left = Math.min( 54, ui.position.left);
        ui.position.left = Math.max( -54, ui.position.left);
    },
    stop: function (event, ui) {

    }
}

Main._tileCategories = Main._defauleTileCategories;
Main.mapWidth = 10;
Main.mapHeight = 10;
Main.tileMap = null;

Main.originTileId = null;
Main.targetTileId = null;





Main._buildEmptyMapDisplay = function () {
    var htmlStr = "";

    for (var i = 0; i < Main.mapHeight; i++) {
        htmlStr += "<tr>";
        for (var j = 0; j < Main.mapWidth; j++) {
            var tdId = "td_r_" + i + "_c_"+ j;
            htmlStr += "<td id='"+ tdId + "'></td>";
        }
        htmlStr += "</tr>";
    }

    jQuery("#gameMap").html(htmlStr);

    Main._bindDrop();

    Main.refreshMapDisplay(Main.tileMap);
}

Main.refreshMapDisplay = function(obj) {
    if (typeof obj == "undefined") {
        console.error("map entity not found");
    }

    for (var row = 0; row < Main.tileMap.length; row++) {
        for (var col = 0; col < Main.tileMap[0].length; col++) {
            var tdId = "#td_r_" + row + "_c_" + col;
            Main._convertTileObjToDiv(Main.tileMap[row][col]).appendTo(jQuery(tdId));
        }
    }

}

Main._convertTileObjToDiv = function (tileObj) {
    if (tileObj == null) {
        return null;
    }

    if (tileObj.name != "empty") {
        return jQuery('<div/>', {
            "class": tileObj.name + " draggable",
        }).attr("tile-type", tileObj.name).draggable(Main._draggableConfig);
    } else {
        return jQuery('<div/>', {
            "class": tileObj.name + " draggable",
        }).attr("tile-type", tileObj.name);
    }
}




Main._bindDrop = function() {
    jQuery("#gameMap td").each(function () {
        var tdObj = jQuery(this);

        tdObj.droppable({
            drop: function (event, ui) {
                Main.targetTileId = jQuery(this).attr('id');
                // console_test(Main.originTileId);
                // console_test(Main.targetTileId);

                //no swap
                if (!Main.validateTileSwap()) {
                    return;
                }


                var originTile = jQuery("#" + Main.originTileId + " div");
                var targetTile = jQuery("#" + Main.targetTileId + " div");


                Main._swapTile(originTile, targetTile);
                Main.originTileId = null;
                Main.targetTileId = null;
            }
        });
    });
}



//td_r_4_c_5
Main.decomposeTdId = function(str) {
    res = str.split('_');
    return {row: parseInt(res[2]), col: parseInt(res[4])};
}

Main.validateTileSwap = function() {
    //no swap
    if (Main.originTileId == Main.targetTileId) {
        return false;
    }

    var originTile = jQuery("#" + Main.originTileId + " div");
    var targetTile = jQuery("#" + Main.targetTileId + " div");

    //if have empty tile
    if (originTile.attr("tile-type") == "empty" || targetTile.attr("tile-type") == "empty") {
        return false;
    }

    //if same tile-type
    if (originTile.attr("tile-type") == targetTile.attr("tile-type") ) {
        return false;
    }

    //out of range, only up, right, down, left are validate, max distance is 1 tile;
    var originPos = Main.decomposeTdId(Main.originTileId);
    var targetPos = Main.decomposeTdId(Main.targetTileId);
    // console_test(originPos);
    // console_test(targetPos);
    if (Math.abs(originPos.row - targetPos.row) + Math.abs(originPos.col - targetPos.col) > 1) {
        return false;
    }

    //是否能消除
    if (!Main._swapEliminable(Main.originTileId, Main.targetTileId)) {
        return false;
    }
    // if (!Main._eliminable(tileObj) && !Main._eliminable(tileObj) ) {
    //     return false;
    // }

    return true;
}


Main._swapEliminable = function(originTileId, targetTileId) {
    var result = false;

    var originObj= jQuery("#" + originTileId + " div");
    var targetObj = jQuery("#" + targetTileId + " div");

    var originPos = Main.decomposeTdId(originTileId);
    var targetPos = Main.decomposeTdId(targetTileId);

    Main._swapTileEntity(originObj, targetObj);

    if (Main._eliminable(targetPos.row, targetPos.col) || Main._eliminable(originPos.row, originPos.col)) {
        result = true;
        Main._eliminable(originPos.row, originPos.col);//两个都可以的时候防止highlight被短路
    }

    Main._swapTileEntity(originObj, targetObj);

    return result;
}


Main._swapTileDisplay = function (origin, target) {
    var originType = origin.attr("tile-type");
    var targetType = target.attr("tile-type");

    origin.removeClass(originType).addClass(targetType).attr("tile-type", targetType);
    target.removeClass(targetType).addClass(originType).attr("tile-type", originType);

}

Main._swapTileEntity = function (origin, target) {
    var originPos = Main.decomposeTdId(jQuery(origin).parent().attr('id'));
    var targetPos = Main.decomposeTdId(jQuery(target).parent().attr('id'));
    //
    // console_test("origin" + JSON.stringify(originPos) + JSON.stringify(Main.tileMap[originPos.row][originPos.col]));
    // console_test("target" + JSON.stringify(targetPos) + JSON.stringify(Main.tileMap[targetPos.row][targetPos.col]));
    var tempTile = Main.tileMap[targetPos.row][targetPos.col];
    Main.tileMap[targetPos.row][targetPos.col] = Main.tileMap[originPos.row][originPos.col];
    Main.tileMap[originPos.row][originPos.col] = tempTile;


    // console_test(" " + JSON.stringify(originPos) + JSON.stringify(Main.tileMap[originPos.row][originPos.col]));
    // console_test(" " + JSON.stringify(targetPos) + JSON.stringify(Main.tileMap[targetPos.row][targetPos.col]));
}

Main._swapTile = function (origin, target) {
    Main._swapTileDisplay(origin, target);
    Main._swapTileEntity(origin, target);
}


/****************************************************/
/**
 * 消除规则
 * 1. 直线3连即消除，大于等于5连，消除所在行／列
 * 2. 十字相连总数大于等于5连，消除交叉点所在行和列
 * 3. 以后再扩充
 *
 * @param {row:0, col:0, type:"round"}
 * @returns {boolean}
 * @private
 */
Main._eliminable = function (row, col) {
    // console_test([row, col]);
    var matched = Main._tileMatching(row, col);
    console_test(matched);
    Main.highlightMatched(matched);

    return matched.result;
}

// Main._getTileTypeByPos = function(row, col) {
//     var res =  jQuery("#td_r_" + row + "_c_" + col).children("div:first").attr("tile-type");
//     console_test(res);
//     return res;
// }

Main._getTileTypeByPos = function(row, col) {
    // console_test([row, col, Main.tileMap[row][col].name]);
    return Main.tileMap[row][col].name;
}

//基于一个前提，如果是十字消失，拖动的那个tile一定是中轴
Main._tileMatching = function (row, col) {
    var type = Main._getTileTypeByPos(row, col);

    var result = false;
    var top = row;
    var right = col;
    var bottom = row;
    var left = col;

    if (type == "empty") {
        return {result: result, top:top, right:right, bottom:bottom, left:left, originRow: row, originCol: col};;
    }

    //top
    while (top > 0 && Main._getTileTypeByPos(top - 1, col) == type) {
        top--;
    }

    //right
    while (right + 1 < Main.mapWidth && Main._getTileTypeByPos(row, right + 1) == type) {
        right++;
    }

    //bottom
    while ((bottom + 1 < Main.mapHeight) && Main._getTileTypeByPos(bottom + 1, col) == type) {
        bottom++;
    }

    //left
    while (left > 0 && Main._getTileTypeByPos(row, left - 1) == type) {
        left--;
    }

    if (bottom - top + 1 >= 3 || right - left + 1 >= 3) {
        result = true;
    }

    top = bottom - top + 1 >= 3 ? top : row;
    bottom = bottom - top + 1 >= 3 ? bottom : row;
    left = right - left + 1 >= 3 ? left : col;
    right = right - left + 1 >= 3 ? right : col;

    return {result: result, top:top, right:right, bottom:bottom, left:left, originRow: row, originCol: col};
}

Main.highlightMatched = function (matched) {
    if (!matched.result) {
        return;
    }

    //horizontal
    for (var i = matched.left; i <= matched.right; i++) {
        var id = "#td_r_" + matched.originRow + "_c_" + i;
        jQuery(id).addClass("highlighted");
    }

    //vertical
    for (var i = matched.top; i <= matched.bottom; i++) {
        var id = "#td_r_" + i + "_c_" + matched.originCol;
        jQuery(id).addClass("highlighted");
    }
}

Main.clearTileEntity = function (row, col) {
    Main.tileMap[row][col] = {
        name: "empty",
        icon: "empty"
    };
}