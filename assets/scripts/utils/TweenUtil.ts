import CocosUtil from "./CocosUtil";

/**
 * Tween 工具
 */
class TweenUtil {
    /**
     * 水平翻转（卡片翻转）
     * @param node 节点
     * @param duration 总时长
     * @param onMiddle 中间状态回调
     * @param onComplete 完成回调
     */
    public  flip(node: cc.Node, duration: number, onMiddle?: Function, onComplete?: Function): Promise<void> {
        return new Promise<void>(res => {
            const tween = cc.tween,
                time = duration / 2,
                scaleX = node.scale,
                skewY = scaleX > 0 ? 20 : -20;
            tween(node)
                .parallel(
                    tween().to(time, { scaleX: 0 }, { easing: 'quadIn' }),
                    tween().to(time, { skewY: -skewY }, { easing: 'quadOut' }),
                )
                .call(() => {
                    onMiddle && onMiddle();
                })
                .parallel(
                    tween().to(time, { scaleX: -scaleX }, { easing: 'quadOut' }),
                    tween().to(time, { skewY: 0 }, { easing: 'quadIn' }),
                )
                .call(() => {
                    onComplete && onComplete();
                    res();
                })
                .start();
        });
    }

    /**
     * 水平翻转（卡片翻转）
     * @param node 节点
     * @param duration 总时长
     * @param onMiddle 中间状态回调
     * @param onComplete 完成回调
     */
    public  flipNoSkew(node: cc.Node, duration: number, onMiddle?: Function, onComplete?: Function): Promise<void> {
        return new Promise<void>(res => {
            const tween = cc.tween,
                time = duration / 4,
                scaleX = node.scaleX,
                posY = node.y;

            tween(node)
                .parallel(
                    tween().to(0.15, { scaleX: 0 }, { easing: 'quadIn' }),
                    tween().to(0.15, { y: posY + 50 }, { easing: 'quadIn' }),
                )
                .call(() => {
                    onMiddle && onMiddle();
                })
                .parallel(
                    tween().to(0.15, { scaleX: -scaleX }, { easing: 'quadOut' }),
                    tween().to(0.15, { y: posY - 40 }, { easing: 'quadOut' }),
                )
                .parallel(
                    tween().to(0.15, { scale: 0.85 }, { easing: 'quadIn' }),
                    tween().to(0.15, { y: posY + 25 }, { easing: 'quadIn' }),
                )
                .delay(0.15)
                .call(() => {
                    onComplete && onComplete();
                    res();
                })
                .start();
        });
    }

    /**
     * 
     * @param target 
     * @param repeat -1，表示永久执行
     * @param tweens 
     */
    public  async runRepeatTweenSync(target: any, repeat: number, ...tweens: cc.Tween[]) {
        return new Promise(resolve => {
            let selfTween = cc.tween(target);
            for (const tmpTween of tweens) {
                selfTween = selfTween.then(tmpTween);
            }
            if (repeat < 0) {
                cc.tween(target).repeatForever(selfTween).start();
            } else {
                cc.tween(target).repeat(repeat, selfTween).call(() => {
                    resolve(true);
                }).start();
            }
        });
    }

    /** 同步的tween */
    public  async runTweenSync(target: any, ...tweens: cc.Tween[]): Promise<void> {
        return new Promise(resolve => {
            let selfTween = cc.tween(target);
            for (const tmpTween of tweens) {
                selfTween = selfTween.then(tmpTween);
            }
            selfTween.call(() => {
                resolve();
            }).start();
        });
    }

    /** 停止tween */
    public stopTween(target: any) {
        cc.Tween.stopAllByTarget(target);
    }

    public stopTweenByTag(tag: number) {
        cc.Tween.stopAllByTag(tag);
    }

    /** 同步的动作, 在2.4.x action已经被废弃了, 不建议使用 */
    public  async runActionSync(node: cc.Node, ...actions: cc.FiniteTimeAction[]) {
        if (!actions || actions.length <= 0) return;
        return new Promise(resolve => {
            actions.push(cc.callFunc(() => {
                resolve(true);
            }));
            node.runAction(cc.sequence(actions));
        });
    }

    /** 同步的动画 */
    public  async runAnimSync(node: cc.Node, animName?: string | number) {
        let anim = node.getComponent(cc.Animation);
        if (!anim) return;
        let clip: cc.AnimationClip = null;
        if (!animName) clip = anim.defaultClip;
        else {
            let clips = anim.getClips();
            if (typeof (animName) === "number") {
                clip = clips[animName];
            } else if (typeof (animName) === "string") {
                for (let i = 0; i < clips.length; i++) {
                    if (clips[i].name === animName) {
                        clip = clips[i];
                        break;
                    }
                }
            }
        }
        if (!clip) return;
        await CocosUtil.sleepSync(clip.duration);
    }

}

export default new TweenUtil();