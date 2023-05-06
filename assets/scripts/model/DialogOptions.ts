export class DialogOptions {
    word?: string = ''
    type?: number = DialogType.OnlyOkBtn
    okCb?: Function = null
    okTxt?: string
    cancelCb?: Function = null
    cancelTxt?: string
    closeCb?: Function = null
    showCb?: Function = null
    hideCb?: Function = null
    hAlign?: number = 0
    title?: string = ''
}

export enum DialogType {
    OnlyOkBtn = 0,
    OkCancelBtn,
    OkBtnAndNoCloseBtn,
    OnlyClose
}