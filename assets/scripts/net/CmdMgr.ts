class CmdMgr {

    //获取cmd
    public getCmd(merge: number): number {
        return merge >> 16;
    }

    //获取subCmd
    public getSubCmd(merge: number): number {
        return merge & 0xFFFF;
    }

    //获取mergeCmd
    public getMergeCmd(cmd: number, subCmd: number) {
        return (cmd << 16) + subCmd;
    }

}

export default new CmdMgr();
