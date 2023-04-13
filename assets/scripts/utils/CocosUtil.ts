
/** 一些cocos api 的封装, promise函数统一加上sync后缀 */
class CocosUtil {

    /** 等待时间, 秒为单位 */
    public sleepSync = function (dur: number): Promise<boolean> {
        return new Promise(resolve => {
            cc.Canvas.instance.scheduleOnce(() => {
                resolve(true);
            }, dur);
        });
    }

    /**
     * 寻找子节点
     */
    public findChildInNode(nodeName: string, rootNode: cc.Node): cc.Node {
        if (rootNode.name == nodeName) {
            return rootNode;
        }
        for (let i = 0; i < rootNode.childrenCount; i++) {
            let node = this.findChildInNode(nodeName, rootNode.children[i]);
            if (node) {
                return node;
            }
        }
        return null;
    }

    /** 获得Component的类名 */
    public getComponentName(com: Function) {
        let arr = com.name.match(/<.*>$/);
        if (arr && arr.length > 0) {
            return arr[0].slice(1, -1);
        }
        return com.name;
    }

    /**
     * 屏幕适配
     */
    public setFitSreenMode() {
        let node = cc.find('Canvas');
        let size = cc.view.getFrameSize();
        let w = size.width;
        let h = size.height;

        let cvs = node.getComponent(cc.Canvas);
        let dw = cvs.designResolution.width;
        let dh = cvs.designResolution.height;
        //如果更宽 则让高显示满
        if ((w / h) > (dw / dh)) {
            cvs.fitHeight = true;
            cvs.fitWidth = false;
        }
        else {
            //如果更高，则让宽显示满
            cvs.fitHeight = false;
            cvs.fitWidth = true;
        }
    }

    /** 截图 */
    public captureScreen(camera: cc.Camera, prop?: cc.Node | cc.Rect) {
        let newTexture = new cc.RenderTexture();
        let oldTexture = camera.targetTexture;
        let rect: cc.Rect = cc.rect(0, 0, cc.visibleRect.width, cc.visibleRect.height);
        if (prop) {
            if (prop instanceof cc.Node) {
                rect = prop.getBoundingBoxToWorld();
            } else {
                rect = prop;
            }
        }
        newTexture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, cc.game['_renderContext'].STENCIL_INDEX8);
        camera.targetTexture = newTexture;
        camera.render();
        camera.targetTexture = oldTexture;

        let buffer = new ArrayBuffer(rect.width * rect.height * 4);
        let data = new Uint8Array(buffer);
        newTexture.readPixels(data, rect.x, rect.y, rect.width, rect.height);
        return data;
    }

}

export default new CocosUtil();