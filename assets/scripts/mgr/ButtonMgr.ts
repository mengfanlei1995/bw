import SoundMgr from "../mgr/SoundMgr";

(function () {
    var Super = function () { };
    Super.prototype = cc.Button.prototype;
    //实例化原型
    Super.prototype._onTouchEnded = function (t) {
        if (this.interactable && this.enabledInHierarchy) {
            SoundMgr.playBtnEffect();
            if (this._pressed) {
                cc.Component.EventHandler.emitEvents(this.clickEvents, t);
                this.node.emit("click", this);
            }
            this._pressed = !1;
            this._updateState();
            t.stopPropagation();
        }
    };
})();
