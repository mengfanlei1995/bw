import AssetUtil from "../utils/AssetUtil";
import BundleUtil from "../utils/BundleUtil";
import StorageMgr from "./StorageMgr";

class SoundMgr {

    private audioCache: { [key: string]: cc.AudioClip } = cc.js.createMap();
    private currEffectId: number = -1;
    private currMusicId: number = -1;

    init() {
        let volume = this.getVolumeToLocal();
        if (volume) {
            this.volume = volume;
        } else {
            this.volume.musicVolume = 1;
            this.volume.effectVolume = 1;
        }
        this.setVolumeToLocal();
        // this.playMusic();
    }

    /** volume */
    private volume: Volume = new Volume();
    getVolume() {
        return this.volume;
    }

    public resumeOrPauseMusic(is: boolean) {
        if (is) {
            if (!cc.audioEngine.isMusicPlaying())
                cc.audioEngine.resumeMusic();
        } else {
            if (cc.audioEngine.isMusicPlaying()) cc.audioEngine.pauseMusic();
        }
    }

    /**设置音量  */
    public setMusicVolume(musicVolume: number) {
        this.resumeOrPauseMusic(!!musicVolume);
        this.volume.musicVolume = musicVolume;
        this.setVolumeToLocal();
    }
    public setEffectVolume(effectVolume: number) {
        this.volume.effectVolume = effectVolume;
        this.setVolumeToLocal();
    }

    public stopMusic() {
        cc.audioEngine.stopMusic();
    }

    /** 播放背景音乐 */
    public async playMusic(url: string = "audio/bgm", loop = true) {
        if (!url || url === '') return;
        if (cc.audioEngine.isMusicPlaying()) return;
        if (this.audioCache[url]) {
            cc.audioEngine.playMusic(this.audioCache[url], loop);
            return;
        }
        let sound = await AssetUtil.loadResSync<cc.AudioClip>(url, false);
        this.audioCache[url] = sound;
        this.currMusicId = cc.audioEngine.playMusic(sound, loop);
    }

    /** 播放音效 */
    public async playEffect(url: string, loop = false) {
        if (StorageMgr.effectPercent == 0) return;
        if (!url || url === '') return;

        if (this.audioCache[url]) {
            cc.audioEngine.playEffect(this.audioCache[url], loop);
            return;
        }
        let sound = await AssetUtil.loadResSync<cc.AudioClip>(url, false);
        this.audioCache[url] = sound;
        this.currEffectId = cc.audioEngine.playEffect(sound, loop);
    }

    /** 播放音效 by bundle*/
    public async playEffectByBundle(bundleName: string, url: string, loop = false) {
        if (StorageMgr.effectPercent == 0) return;
        if (!url || url === '') return;

        if (this.audioCache[bundleName + url]) {
            cc.audioEngine.playEffect(this.audioCache[bundleName + url], loop);
            return;
        }
        let sound = await BundleUtil.loadResSync<cc.AudioClip>(bundleName, url);
        this.audioCache[bundleName + url] = sound;
        this.currEffectId = cc.audioEngine.playEffect(sound, loop);
    }

    /**播放按钮音效 */
    public async playBtnEffect() {
        if (StorageMgr.effectPercent == 0) return;
        let url = "audio/click";
        if (this.audioCache[url]) {
            cc.audioEngine.playEffect(this.audioCache[url], false);
            return;
        }
        let sound = await AssetUtil.loadResSync<cc.AudioClip>(url, false);
        this.audioCache[url] = sound;
        this.currEffectId = cc.audioEngine.playEffect(sound, false);
    }

    /** 从本地读取 */
    private getVolumeToLocal() {
        let music: number = StorageMgr.bgmPercent
        let sound: number = StorageMgr.effectPercent
        return { musicVolume: music, effectVolume: sound }
    }
    /** 设置音量 */
    private setVolumeToLocal() {
        cc.audioEngine.setMusicVolume(this.volume.musicVolume);
        cc.audioEngine.setEffectsVolume(this.volume.effectVolume);
        StorageMgr.bgmPercent = this.volume.musicVolume;
        StorageMgr.effectPercent = this.volume.effectVolume;
    }

    /**
     * 恢复或者停止当前的音效
     * @param active 恢复-false还是停止-true
     * @param id 音效id
     */
    public setEffectActive(active: boolean, id: number = -1) {
        if (active) {
            cc.audioEngine.stop(id < 0 ? this.currEffectId : id);
        } else {
            cc.audioEngine.resume(id < 0 ? this.currEffectId : id);
        }
    }
}

class Volume {
    musicVolume: number;
    effectVolume: number;
}

export default new SoundMgr();
