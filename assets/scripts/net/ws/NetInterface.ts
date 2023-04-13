
/*
*   网络相关接口定义
*/
export type NetCallFunc = (code: number, data: Uint8Array) => void;

// Socket接口
export interface ISocket {
    onopen(event: Event): void
    onclose(event: CloseEvent): void
    onmessage(event: MessageEvent): void
    onerror(event: Event): void
}