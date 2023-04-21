export interface LuckyDiceGameInfoVo {
  oddsInfoList?: OddsInfoVo[];
  gameResultList?: LuckyDiceWinDto[];
  gameNum?: number;
  bankerId?: string;
  currOptUserId?: string;
  totalOptSeconds?: number;
  leftOptSeconds?: number;
  dealCardMilliseconds?: Long;
  leftPaiNum?: number;
  qiPai?: string;
  turnType?: number;
}

export function encodeLuckyDiceGameInfoVo(message: LuckyDiceGameInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeLuckyDiceGameInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodeLuckyDiceGameInfoVo(message: LuckyDiceGameInfoVo, bb: ByteBuffer): void {
  // repeated OddsInfoVo oddsInfoList = 1;
  let array$oddsInfoList = message.oddsInfoList;
  if (array$oddsInfoList !== undefined) {
    for (let value of array$oddsInfoList) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeOddsInfoVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated LuckyDiceWinDto gameResultList = 2;
  let array$gameResultList = message.gameResultList;
  if (array$gameResultList !== undefined) {
    for (let value of array$gameResultList) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeLuckyDiceWinDto(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional int32 gameNum = 3;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional string bankerId = 4;
  let $bankerId = message.bankerId;
  if ($bankerId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $bankerId);
  }

  // optional string currOptUserId = 5;
  let $currOptUserId = message.currOptUserId;
  if ($currOptUserId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $currOptUserId);
  }

  // optional int32 totalOptSeconds = 6;
  let $totalOptSeconds = message.totalOptSeconds;
  if ($totalOptSeconds !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($totalOptSeconds));
  }

  // optional int32 leftOptSeconds = 7;
  let $leftOptSeconds = message.leftOptSeconds;
  if ($leftOptSeconds !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($leftOptSeconds));
  }

  // optional int64 dealCardMilliseconds = 8;
  let $dealCardMilliseconds = message.dealCardMilliseconds;
  if ($dealCardMilliseconds !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, $dealCardMilliseconds);
  }

  // optional int32 leftPaiNum = 9;
  let $leftPaiNum = message.leftPaiNum;
  if ($leftPaiNum !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($leftPaiNum));
  }

  // optional string qiPai = 10;
  let $qiPai = message.qiPai;
  if ($qiPai !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $qiPai);
  }

  // optional int32 turnType = 11;
  let $turnType = message.turnType;
  if ($turnType !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($turnType));
  }
}

export function decodeLuckyDiceGameInfoVo(binary: Uint8Array): LuckyDiceGameInfoVo {
  return _decodeLuckyDiceGameInfoVo(wrapByteBuffer(binary));
}

function _decodeLuckyDiceGameInfoVo(bb: ByteBuffer): LuckyDiceGameInfoVo {
  let message: LuckyDiceGameInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated OddsInfoVo oddsInfoList = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.oddsInfoList || (message.oddsInfoList = []);
        values.push(_decodeOddsInfoVo(bb));
        bb.limit = limit;
        break;
      }

      // repeated LuckyDiceWinDto gameResultList = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.gameResultList || (message.gameResultList = []);
        values.push(_decodeLuckyDiceWinDto(bb));
        bb.limit = limit;
        break;
      }

      // optional int32 gameNum = 3;
      case 3: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional string bankerId = 4;
      case 4: {
        message.bankerId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currOptUserId = 5;
      case 5: {
        message.currOptUserId = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 totalOptSeconds = 6;
      case 6: {
        message.totalOptSeconds = readVarint32(bb);
        break;
      }

      // optional int32 leftOptSeconds = 7;
      case 7: {
        message.leftOptSeconds = readVarint32(bb);
        break;
      }

      // optional int64 dealCardMilliseconds = 8;
      case 8: {
        message.dealCardMilliseconds = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 leftPaiNum = 9;
      case 9: {
        message.leftPaiNum = readVarint32(bb);
        break;
      }

      // optional string qiPai = 10;
      case 10: {
        message.qiPai = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 turnType = 11;
      case 11: {
        message.turnType = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LBBeginBetVO {
  notifyType?: number;
  lastMsgId?: string;
  currMsgId?: string;
  gameInfo?: LuckyBallGameInfoVo;
}

export function encodeLBBeginBetVO(message: LBBeginBetVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeLBBeginBetVO(message, bb);
  return toUint8Array(bb);
}

function _encodeLBBeginBetVO(message: LBBeginBetVO, bb: ByteBuffer): void {
  // optional int32 notifyType = 1;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($notifyType));
  }

  // optional string lastMsgId = 2;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 3;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $currMsgId);
  }

  // optional LuckyBallGameInfoVo gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeLuckyBallGameInfoVo($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeLBBeginBetVO(binary: Uint8Array): LBBeginBetVO {
  return _decodeLBBeginBetVO(wrapByteBuffer(binary));
}

function _decodeLBBeginBetVO(bb: ByteBuffer): LBBeginBetVO {
  let message: LBBeginBetVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 notifyType = 1;
      case 1: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // optional string lastMsgId = 2;
      case 2: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 3;
      case 3: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional LuckyBallGameInfoVo gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeLuckyBallGameInfoVo(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LuckyDiceWinDto {
  gameNum?: number;
  id?: number;
  dices?: number[];
  controlSingleState?: number;
}

export function encodeLuckyDiceWinDto(message: LuckyDiceWinDto): Uint8Array {
  let bb = popByteBuffer();
  _encodeLuckyDiceWinDto(message, bb);
  return toUint8Array(bb);
}

function _encodeLuckyDiceWinDto(message: LuckyDiceWinDto, bb: ByteBuffer): void {
  // optional int32 gameNum = 1;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional int32 id = 2;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($id));
  }

  // repeated int32 dices = 3;
  let array$dices = message.dices;
  if (array$dices !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$dices) {
      writeVarint64(packed, intToLong(value));
    }
    writeVarint32(bb, 26);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // optional int32 controlSingleState = 4;
  let $controlSingleState = message.controlSingleState;
  if ($controlSingleState !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($controlSingleState));
  }
}

export function decodeLuckyDiceWinDto(binary: Uint8Array): LuckyDiceWinDto {
  return _decodeLuckyDiceWinDto(wrapByteBuffer(binary));
}

function _decodeLuckyDiceWinDto(bb: ByteBuffer): LuckyDiceWinDto {
  let message: LuckyDiceWinDto = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 gameNum = 1;
      case 1: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional int32 id = 2;
      case 2: {
        message.id = readVarint32(bb);
        break;
      }

      // repeated int32 dices = 3;
      case 3: {
        let values = message.dices || (message.dices = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint32(bb));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint32(bb));
        }
        break;
      }

      // optional int32 controlSingleState = 4;
      case 4: {
        message.controlSingleState = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LuckyBallRoomInfoVo {
  roomState?: number;
  roomId?: string;
  lastMsgId?: string;
  currMsgId?: string;
  userId?: string;
  playing?: boolean;
  gameType?: number;
  roomType?: number;
  roomLevel?: number;
  baseMultiple?: number;
  maxGameNum?: number;
  currGameNum?: number;
}

export function encodeLuckyBallRoomInfoVo(message: LuckyBallRoomInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeLuckyBallRoomInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodeLuckyBallRoomInfoVo(message: LuckyBallRoomInfoVo, bb: ByteBuffer): void {
  // optional int32 roomState = 1;
  let $roomState = message.roomState;
  if ($roomState !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($roomState));
  }

  // optional string roomId = 2;
  let $roomId = message.roomId;
  if ($roomId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $roomId);
  }

  // optional string lastMsgId = 3;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 4;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $currMsgId);
  }

  // optional string userId = 5;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $userId);
  }

  // optional bool playing = 6;
  let $playing = message.playing;
  if ($playing !== undefined) {
    writeVarint32(bb, 48);
    writeByte(bb, $playing ? 1 : 0);
  }

  // optional int32 gameType = 7;
  let $gameType = message.gameType;
  if ($gameType !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($gameType));
  }

  // optional int32 roomType = 8;
  let $roomType = message.roomType;
  if ($roomType !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, intToLong($roomType));
  }

  // optional int32 roomLevel = 9;
  let $roomLevel = message.roomLevel;
  if ($roomLevel !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($roomLevel));
  }

  // optional int32 baseMultiple = 10;
  let $baseMultiple = message.baseMultiple;
  if ($baseMultiple !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, intToLong($baseMultiple));
  }

  // optional int32 maxGameNum = 11;
  let $maxGameNum = message.maxGameNum;
  if ($maxGameNum !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($maxGameNum));
  }

  // optional int32 currGameNum = 12;
  let $currGameNum = message.currGameNum;
  if ($currGameNum !== undefined) {
    writeVarint32(bb, 96);
    writeVarint64(bb, intToLong($currGameNum));
  }
}

export function decodeLuckyBallRoomInfoVo(binary: Uint8Array): LuckyBallRoomInfoVo {
  return _decodeLuckyBallRoomInfoVo(wrapByteBuffer(binary));
}

function _decodeLuckyBallRoomInfoVo(bb: ByteBuffer): LuckyBallRoomInfoVo {
  let message: LuckyBallRoomInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 roomState = 1;
      case 1: {
        message.roomState = readVarint32(bb);
        break;
      }

      // optional string roomId = 2;
      case 2: {
        message.roomId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string lastMsgId = 3;
      case 3: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 4;
      case 4: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string userId = 5;
      case 5: {
        message.userId = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool playing = 6;
      case 6: {
        message.playing = !!readByte(bb);
        break;
      }

      // optional int32 gameType = 7;
      case 7: {
        message.gameType = readVarint32(bb);
        break;
      }

      // optional int32 roomType = 8;
      case 8: {
        message.roomType = readVarint32(bb);
        break;
      }

      // optional int32 roomLevel = 9;
      case 9: {
        message.roomLevel = readVarint32(bb);
        break;
      }

      // optional int32 baseMultiple = 10;
      case 10: {
        message.baseMultiple = readVarint32(bb);
        break;
      }

      // optional int32 maxGameNum = 11;
      case 11: {
        message.maxGameNum = readVarint32(bb);
        break;
      }

      // optional int32 currGameNum = 12;
      case 12: {
        message.currGameNum = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DTDoEnterRoomVO {
  lastMsgId?: string;
  currMsgId?: string;
  roomInfo?: DragonAndTigerRoomInfoVo;
  gameInfo?: DragonAndTigerGameInfoVo;
  betList?: PointBetCoinsNotifyVo[];
  betCoinMap?: { [key: number]: Long };
  betSelfCoinMap?: { [key: number]: Long };
  betCoinList?: Long[];
  onlinePlayers?: number;
}

export function encodeDTDoEnterRoomVO(message: DTDoEnterRoomVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeDTDoEnterRoomVO(message, bb);
  return toUint8Array(bb);
}

function _encodeDTDoEnterRoomVO(message: DTDoEnterRoomVO, bb: ByteBuffer): void {
  // optional string lastMsgId = 1;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 2;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $currMsgId);
  }

  // optional DragonAndTigerRoomInfoVo roomInfo = 3;
  let $roomInfo = message.roomInfo;
  if ($roomInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeDragonAndTigerRoomInfoVo($roomInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional DragonAndTigerGameInfoVo gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeDragonAndTigerGameInfoVo($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated PointBetCoinsNotifyVo betList = 5;
  let array$betList = message.betList;
  if (array$betList !== undefined) {
    for (let value of array$betList) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodePointBetCoinsNotifyVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<int32, int64> betCoinMap = 6;
  let map$betCoinMap = message.betCoinMap;
  if (map$betCoinMap !== undefined) {
    for (let key in map$betCoinMap) {
      let nested = popByteBuffer();
      let value = map$betCoinMap[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 50);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<int32, int64> betSelfCoinMap = 7;
  let map$betSelfCoinMap = message.betSelfCoinMap;
  if (map$betSelfCoinMap !== undefined) {
    for (let key in map$betSelfCoinMap) {
      let nested = popByteBuffer();
      let value = map$betSelfCoinMap[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 58);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated int64 betCoinList = 8;
  let array$betCoinList = message.betCoinList;
  if (array$betCoinList !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$betCoinList) {
      writeVarint64(packed, value);
    }
    writeVarint32(bb, 66);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // optional int32 onlinePlayers = 9;
  let $onlinePlayers = message.onlinePlayers;
  if ($onlinePlayers !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($onlinePlayers));
  }
}

export function decodeDTDoEnterRoomVO(binary: Uint8Array): DTDoEnterRoomVO {
  return _decodeDTDoEnterRoomVO(wrapByteBuffer(binary));
}

function _decodeDTDoEnterRoomVO(bb: ByteBuffer): DTDoEnterRoomVO {
  let message: DTDoEnterRoomVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string lastMsgId = 1;
      case 1: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 2;
      case 2: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional DragonAndTigerRoomInfoVo roomInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.roomInfo = _decodeDragonAndTigerRoomInfoVo(bb);
        bb.limit = limit;
        break;
      }

      // optional DragonAndTigerGameInfoVo gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeDragonAndTigerGameInfoVo(bb);
        bb.limit = limit;
        break;
      }

      // repeated PointBetCoinsNotifyVo betList = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.betList || (message.betList = []);
        values.push(_decodePointBetCoinsNotifyVo(bb));
        bb.limit = limit;
        break;
      }

      // optional map<int32, int64> betCoinMap = 6;
      case 6: {
        let values = message.betCoinMap || (message.betCoinMap = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: number | undefined;
        let value: Long | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              value = readVarint64(bb, /* unsigned */ false);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: betCoinMap");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // optional map<int32, int64> betSelfCoinMap = 7;
      case 7: {
        let values = message.betSelfCoinMap || (message.betSelfCoinMap = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: number | undefined;
        let value: Long | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              value = readVarint64(bb, /* unsigned */ false);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: betSelfCoinMap");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // repeated int64 betCoinList = 8;
      case 8: {
        let values = message.betCoinList || (message.betCoinList = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint64(bb, /* unsigned */ false));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint64(bb, /* unsigned */ false));
        }
        break;
      }

      // optional int32 onlinePlayers = 9;
      case 9: {
        message.onlinePlayers = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Dice3DoEnterRoomVO {
  lastMsgId?: string;
  currMsgId?: string;
  betCoinList?: Long[];
  onlinePlayers?: number;
  betSelfCoinMap?: { [key: number]: Long };
  betCoinMap?: { [key: number]: Long };
  betList?: PointBetCoinsNotifyVo[];
  gameInfo?: Dice3GameInfoVo;
  roomInfo?: Dice3RoomInfoVo;
}

export function encodeDice3DoEnterRoomVO(message: Dice3DoEnterRoomVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeDice3DoEnterRoomVO(message, bb);
  return toUint8Array(bb);
}

function _encodeDice3DoEnterRoomVO(message: Dice3DoEnterRoomVO, bb: ByteBuffer): void {
  // optional string lastMsgId = 1;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 2;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $currMsgId);
  }

  // repeated int64 betCoinList = 3;
  let array$betCoinList = message.betCoinList;
  if (array$betCoinList !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$betCoinList) {
      writeVarint64(packed, value);
    }
    writeVarint32(bb, 26);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // optional int32 onlinePlayers = 4;
  let $onlinePlayers = message.onlinePlayers;
  if ($onlinePlayers !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($onlinePlayers));
  }

  // optional map<int32, int64> betSelfCoinMap = 5;
  let map$betSelfCoinMap = message.betSelfCoinMap;
  if (map$betSelfCoinMap !== undefined) {
    for (let key in map$betSelfCoinMap) {
      let nested = popByteBuffer();
      let value = map$betSelfCoinMap[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 42);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<int32, int64> betCoinMap = 6;
  let map$betCoinMap = message.betCoinMap;
  if (map$betCoinMap !== undefined) {
    for (let key in map$betCoinMap) {
      let nested = popByteBuffer();
      let value = map$betCoinMap[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 50);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated PointBetCoinsNotifyVo betList = 7;
  let array$betList = message.betList;
  if (array$betList !== undefined) {
    for (let value of array$betList) {
      writeVarint32(bb, 58);
      let nested = popByteBuffer();
      _encodePointBetCoinsNotifyVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional Dice3GameInfoVo gameInfo = 8;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 66);
    let nested = popByteBuffer();
    _encodeDice3GameInfoVo($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Dice3RoomInfoVo roomInfo = 9;
  let $roomInfo = message.roomInfo;
  if ($roomInfo !== undefined) {
    writeVarint32(bb, 74);
    let nested = popByteBuffer();
    _encodeDice3RoomInfoVo($roomInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeDice3DoEnterRoomVO(binary: Uint8Array): Dice3DoEnterRoomVO {
  return _decodeDice3DoEnterRoomVO(wrapByteBuffer(binary));
}

function _decodeDice3DoEnterRoomVO(bb: ByteBuffer): Dice3DoEnterRoomVO {
  let message: Dice3DoEnterRoomVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string lastMsgId = 1;
      case 1: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 2;
      case 2: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // repeated int64 betCoinList = 3;
      case 3: {
        let values = message.betCoinList || (message.betCoinList = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint64(bb, /* unsigned */ false));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint64(bb, /* unsigned */ false));
        }
        break;
      }

      // optional int32 onlinePlayers = 4;
      case 4: {
        message.onlinePlayers = readVarint32(bb);
        break;
      }

      // optional map<int32, int64> betSelfCoinMap = 5;
      case 5: {
        let values = message.betSelfCoinMap || (message.betSelfCoinMap = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: number | undefined;
        let value: Long | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              value = readVarint64(bb, /* unsigned */ false);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: betSelfCoinMap");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // optional map<int32, int64> betCoinMap = 6;
      case 6: {
        let values = message.betCoinMap || (message.betCoinMap = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: number | undefined;
        let value: Long | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              value = readVarint64(bb, /* unsigned */ false);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: betCoinMap");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // repeated PointBetCoinsNotifyVo betList = 7;
      case 7: {
        let limit = pushTemporaryLength(bb);
        let values = message.betList || (message.betList = []);
        values.push(_decodePointBetCoinsNotifyVo(bb));
        bb.limit = limit;
        break;
      }

      // optional Dice3GameInfoVo gameInfo = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeDice3GameInfoVo(bb);
        bb.limit = limit;
        break;
      }

      // optional Dice3RoomInfoVo roomInfo = 9;
      case 9: {
        let limit = pushTemporaryLength(bb);
        message.roomInfo = _decodeDice3RoomInfoVo(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RoomUserVo {
  winCoins?: Long;
  winRate?: number;
  userInTableState?: number;
  seatNo?: number;
  userId?: string;
  status?: number;
  nickName?: string;
  portrait?: string;
  vipLevel?: number;
  balanceCoins?: Long;
  autoPlay?: boolean;
  autoPlayTimes?: number;
  playNums?: number;
  maxPlayNums?: number;
  extra?: string;
  roundCount?: number;
  winRoundCount?: number;
  totalWinCoins?: Long;
  userType?: number;
  winBalance?: Long;
  loseBalance?: Long;
}

export function encodeRoomUserVo(message: RoomUserVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeRoomUserVo(message, bb);
  return toUint8Array(bb);
}

function _encodeRoomUserVo(message: RoomUserVo, bb: ByteBuffer): void {
  // optional int64 winCoins = 1;
  let $winCoins = message.winCoins;
  if ($winCoins !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $winCoins);
  }

  // optional int32 winRate = 3;
  let $winRate = message.winRate;
  if ($winRate !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($winRate));
  }

  // optional int32 userInTableState = 4;
  let $userInTableState = message.userInTableState;
  if ($userInTableState !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($userInTableState));
  }

  // optional int32 seatNo = 5;
  let $seatNo = message.seatNo;
  if ($seatNo !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($seatNo));
  }

  // optional string userId = 6;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $userId);
  }

  // optional int32 status = 7;
  let $status = message.status;
  if ($status !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($status));
  }

  // optional string nickName = 8;
  let $nickName = message.nickName;
  if ($nickName !== undefined) {
    writeVarint32(bb, 66);
    writeString(bb, $nickName);
  }

  // optional string portrait = 9;
  let $portrait = message.portrait;
  if ($portrait !== undefined) {
    writeVarint32(bb, 74);
    writeString(bb, $portrait);
  }

  // optional int32 vipLevel = 10;
  let $vipLevel = message.vipLevel;
  if ($vipLevel !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, intToLong($vipLevel));
  }

  // optional int64 balanceCoins = 11;
  let $balanceCoins = message.balanceCoins;
  if ($balanceCoins !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, $balanceCoins);
  }

  // optional bool autoPlay = 12;
  let $autoPlay = message.autoPlay;
  if ($autoPlay !== undefined) {
    writeVarint32(bb, 96);
    writeByte(bb, $autoPlay ? 1 : 0);
  }

  // optional int32 autoPlayTimes = 13;
  let $autoPlayTimes = message.autoPlayTimes;
  if ($autoPlayTimes !== undefined) {
    writeVarint32(bb, 104);
    writeVarint64(bb, intToLong($autoPlayTimes));
  }

  // optional int32 playNums = 14;
  let $playNums = message.playNums;
  if ($playNums !== undefined) {
    writeVarint32(bb, 112);
    writeVarint64(bb, intToLong($playNums));
  }

  // optional int32 maxPlayNums = 15;
  let $maxPlayNums = message.maxPlayNums;
  if ($maxPlayNums !== undefined) {
    writeVarint32(bb, 120);
    writeVarint64(bb, intToLong($maxPlayNums));
  }

  // optional string extra = 16;
  let $extra = message.extra;
  if ($extra !== undefined) {
    writeVarint32(bb, 130);
    writeString(bb, $extra);
  }

  // optional int32 roundCount = 17;
  let $roundCount = message.roundCount;
  if ($roundCount !== undefined) {
    writeVarint32(bb, 136);
    writeVarint64(bb, intToLong($roundCount));
  }

  // optional int32 winRoundCount = 18;
  let $winRoundCount = message.winRoundCount;
  if ($winRoundCount !== undefined) {
    writeVarint32(bb, 144);
    writeVarint64(bb, intToLong($winRoundCount));
  }

  // optional int64 totalWinCoins = 19;
  let $totalWinCoins = message.totalWinCoins;
  if ($totalWinCoins !== undefined) {
    writeVarint32(bb, 152);
    writeVarint64(bb, $totalWinCoins);
  }

  // optional int32 userType = 20;
  let $userType = message.userType;
  if ($userType !== undefined) {
    writeVarint32(bb, 160);
    writeVarint64(bb, intToLong($userType));
  }

  // optional int64 winBalance = 21;
  let $winBalance = message.winBalance;
  if ($winBalance !== undefined) {
    writeVarint32(bb, 168);
    writeVarint64(bb, $winBalance);
  }

  // optional int64 loseBalance = 22;
  let $loseBalance = message.loseBalance;
  if ($loseBalance !== undefined) {
    writeVarint32(bb, 176);
    writeVarint64(bb, $loseBalance);
  }
}

export function decodeRoomUserVo(binary: Uint8Array): RoomUserVo {
  return _decodeRoomUserVo(wrapByteBuffer(binary));
}

function _decodeRoomUserVo(bb: ByteBuffer): RoomUserVo {
  let message: RoomUserVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 winCoins = 1;
      case 1: {
        message.winCoins = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 winRate = 3;
      case 3: {
        message.winRate = readVarint32(bb);
        break;
      }

      // optional int32 userInTableState = 4;
      case 4: {
        message.userInTableState = readVarint32(bb);
        break;
      }

      // optional int32 seatNo = 5;
      case 5: {
        message.seatNo = readVarint32(bb);
        break;
      }

      // optional string userId = 6;
      case 6: {
        message.userId = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 status = 7;
      case 7: {
        message.status = readVarint32(bb);
        break;
      }

      // optional string nickName = 8;
      case 8: {
        message.nickName = readString(bb, readVarint32(bb));
        break;
      }

      // optional string portrait = 9;
      case 9: {
        message.portrait = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 vipLevel = 10;
      case 10: {
        message.vipLevel = readVarint32(bb);
        break;
      }

      // optional int64 balanceCoins = 11;
      case 11: {
        message.balanceCoins = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional bool autoPlay = 12;
      case 12: {
        message.autoPlay = !!readByte(bb);
        break;
      }

      // optional int32 autoPlayTimes = 13;
      case 13: {
        message.autoPlayTimes = readVarint32(bb);
        break;
      }

      // optional int32 playNums = 14;
      case 14: {
        message.playNums = readVarint32(bb);
        break;
      }

      // optional int32 maxPlayNums = 15;
      case 15: {
        message.maxPlayNums = readVarint32(bb);
        break;
      }

      // optional string extra = 16;
      case 16: {
        message.extra = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 roundCount = 17;
      case 17: {
        message.roundCount = readVarint32(bb);
        break;
      }

      // optional int32 winRoundCount = 18;
      case 18: {
        message.winRoundCount = readVarint32(bb);
        break;
      }

      // optional int64 totalWinCoins = 19;
      case 19: {
        message.totalWinCoins = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 userType = 20;
      case 20: {
        message.userType = readVarint32(bb);
        break;
      }

      // optional int64 winBalance = 21;
      case 21: {
        message.winBalance = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 loseBalance = 22;
      case 22: {
        message.loseBalance = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RYBBeginBetVO {
  notifyType?: number;
  lastMsgId?: string;
  currMsgId?: string;
  gameInfo?: RedYellowBlueGameInfoVo;
}

export function encodeRYBBeginBetVO(message: RYBBeginBetVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeRYBBeginBetVO(message, bb);
  return toUint8Array(bb);
}

function _encodeRYBBeginBetVO(message: RYBBeginBetVO, bb: ByteBuffer): void {
  // optional int32 notifyType = 1;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($notifyType));
  }

  // optional string lastMsgId = 2;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 3;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $currMsgId);
  }

  // optional RedYellowBlueGameInfoVo gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeRedYellowBlueGameInfoVo($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeRYBBeginBetVO(binary: Uint8Array): RYBBeginBetVO {
  return _decodeRYBBeginBetVO(wrapByteBuffer(binary));
}

function _decodeRYBBeginBetVO(bb: ByteBuffer): RYBBeginBetVO {
  let message: RYBBeginBetVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 notifyType = 1;
      case 1: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // optional string lastMsgId = 2;
      case 2: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 3;
      case 3: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional RedYellowBlueGameInfoVo gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeRedYellowBlueGameInfoVo(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DragonAndTigerRoomInfoVo {
  roomState?: number;
  roomId?: string;
  lastMsgId?: string;
  currMsgId?: string;
  userId?: string;
  playing?: boolean;
  gameType?: number;
  roomType?: number;
  roomLevel?: number;
  baseMultiple?: number;
  maxGameNum?: number;
  currGameNum?: number;
}

export function encodeDragonAndTigerRoomInfoVo(message: DragonAndTigerRoomInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeDragonAndTigerRoomInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodeDragonAndTigerRoomInfoVo(message: DragonAndTigerRoomInfoVo, bb: ByteBuffer): void {
  // optional int32 roomState = 1;
  let $roomState = message.roomState;
  if ($roomState !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($roomState));
  }

  // optional string roomId = 2;
  let $roomId = message.roomId;
  if ($roomId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $roomId);
  }

  // optional string lastMsgId = 3;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 4;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $currMsgId);
  }

  // optional string userId = 5;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $userId);
  }

  // optional bool playing = 6;
  let $playing = message.playing;
  if ($playing !== undefined) {
    writeVarint32(bb, 48);
    writeByte(bb, $playing ? 1 : 0);
  }

  // optional int32 gameType = 7;
  let $gameType = message.gameType;
  if ($gameType !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($gameType));
  }

  // optional int32 roomType = 8;
  let $roomType = message.roomType;
  if ($roomType !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, intToLong($roomType));
  }

  // optional int32 roomLevel = 9;
  let $roomLevel = message.roomLevel;
  if ($roomLevel !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($roomLevel));
  }

  // optional int32 baseMultiple = 10;
  let $baseMultiple = message.baseMultiple;
  if ($baseMultiple !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, intToLong($baseMultiple));
  }

  // optional int32 maxGameNum = 11;
  let $maxGameNum = message.maxGameNum;
  if ($maxGameNum !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($maxGameNum));
  }

  // optional int32 currGameNum = 12;
  let $currGameNum = message.currGameNum;
  if ($currGameNum !== undefined) {
    writeVarint32(bb, 96);
    writeVarint64(bb, intToLong($currGameNum));
  }
}

export function decodeDragonAndTigerRoomInfoVo(binary: Uint8Array): DragonAndTigerRoomInfoVo {
  return _decodeDragonAndTigerRoomInfoVo(wrapByteBuffer(binary));
}

function _decodeDragonAndTigerRoomInfoVo(bb: ByteBuffer): DragonAndTigerRoomInfoVo {
  let message: DragonAndTigerRoomInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 roomState = 1;
      case 1: {
        message.roomState = readVarint32(bb);
        break;
      }

      // optional string roomId = 2;
      case 2: {
        message.roomId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string lastMsgId = 3;
      case 3: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 4;
      case 4: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string userId = 5;
      case 5: {
        message.userId = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool playing = 6;
      case 6: {
        message.playing = !!readByte(bb);
        break;
      }

      // optional int32 gameType = 7;
      case 7: {
        message.gameType = readVarint32(bb);
        break;
      }

      // optional int32 roomType = 8;
      case 8: {
        message.roomType = readVarint32(bb);
        break;
      }

      // optional int32 roomLevel = 9;
      case 9: {
        message.roomLevel = readVarint32(bb);
        break;
      }

      // optional int32 baseMultiple = 10;
      case 10: {
        message.baseMultiple = readVarint32(bb);
        break;
      }

      // optional int32 maxGameNum = 11;
      case 11: {
        message.maxGameNum = readVarint32(bb);
        break;
      }

      // optional int32 currGameNum = 12;
      case 12: {
        message.currGameNum = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface JhandiMundaRoomInfoVo {
  roomState?: number;
  roomId?: string;
  lastMsgId?: string;
  currMsgId?: string;
  userId?: string;
  playing?: boolean;
  gameType?: number;
  roomType?: number;
  roomLevel?: number;
  baseMultiple?: number;
  maxGameNum?: number;
  currGameNum?: number;
}

export function encodeJhandiMundaRoomInfoVo(message: JhandiMundaRoomInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeJhandiMundaRoomInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodeJhandiMundaRoomInfoVo(message: JhandiMundaRoomInfoVo, bb: ByteBuffer): void {
  // optional int32 roomState = 1;
  let $roomState = message.roomState;
  if ($roomState !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($roomState));
  }

  // optional string roomId = 2;
  let $roomId = message.roomId;
  if ($roomId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $roomId);
  }

  // optional string lastMsgId = 3;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 4;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $currMsgId);
  }

  // optional string userId = 5;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $userId);
  }

  // optional bool playing = 6;
  let $playing = message.playing;
  if ($playing !== undefined) {
    writeVarint32(bb, 48);
    writeByte(bb, $playing ? 1 : 0);
  }

  // optional int32 gameType = 7;
  let $gameType = message.gameType;
  if ($gameType !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($gameType));
  }

  // optional int32 roomType = 8;
  let $roomType = message.roomType;
  if ($roomType !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, intToLong($roomType));
  }

  // optional int32 roomLevel = 9;
  let $roomLevel = message.roomLevel;
  if ($roomLevel !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($roomLevel));
  }

  // optional int32 baseMultiple = 10;
  let $baseMultiple = message.baseMultiple;
  if ($baseMultiple !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, intToLong($baseMultiple));
  }

  // optional int32 maxGameNum = 11;
  let $maxGameNum = message.maxGameNum;
  if ($maxGameNum !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($maxGameNum));
  }

  // optional int32 currGameNum = 12;
  let $currGameNum = message.currGameNum;
  if ($currGameNum !== undefined) {
    writeVarint32(bb, 96);
    writeVarint64(bb, intToLong($currGameNum));
  }
}

export function decodeJhandiMundaRoomInfoVo(binary: Uint8Array): JhandiMundaRoomInfoVo {
  return _decodeJhandiMundaRoomInfoVo(wrapByteBuffer(binary));
}

function _decodeJhandiMundaRoomInfoVo(bb: ByteBuffer): JhandiMundaRoomInfoVo {
  let message: JhandiMundaRoomInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 roomState = 1;
      case 1: {
        message.roomState = readVarint32(bb);
        break;
      }

      // optional string roomId = 2;
      case 2: {
        message.roomId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string lastMsgId = 3;
      case 3: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 4;
      case 4: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string userId = 5;
      case 5: {
        message.userId = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool playing = 6;
      case 6: {
        message.playing = !!readByte(bb);
        break;
      }

      // optional int32 gameType = 7;
      case 7: {
        message.gameType = readVarint32(bb);
        break;
      }

      // optional int32 roomType = 8;
      case 8: {
        message.roomType = readVarint32(bb);
        break;
      }

      // optional int32 roomLevel = 9;
      case 9: {
        message.roomLevel = readVarint32(bb);
        break;
      }

      // optional int32 baseMultiple = 10;
      case 10: {
        message.baseMultiple = readVarint32(bb);
        break;
      }

      // optional int32 maxGameNum = 11;
      case 11: {
        message.maxGameNum = readVarint32(bb);
        break;
      }

      // optional int32 currGameNum = 12;
      case 12: {
        message.currGameNum = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface TeenPattiWarPokerResultDto {
  pais?: string[];
  paisAttr?: number;
}

export function encodeTeenPattiWarPokerResultDto(message: TeenPattiWarPokerResultDto): Uint8Array {
  let bb = popByteBuffer();
  _encodeTeenPattiWarPokerResultDto(message, bb);
  return toUint8Array(bb);
}

function _encodeTeenPattiWarPokerResultDto(message: TeenPattiWarPokerResultDto, bb: ByteBuffer): void {
  // repeated string pais = 1;
  let array$pais = message.pais;
  if (array$pais !== undefined) {
    for (let value of array$pais) {
      writeVarint32(bb, 10);
      writeString(bb, value);
    }
  }

  // optional int32 paisAttr = 2;
  let $paisAttr = message.paisAttr;
  if ($paisAttr !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($paisAttr));
  }
}

export function decodeTeenPattiWarPokerResultDto(binary: Uint8Array): TeenPattiWarPokerResultDto {
  return _decodeTeenPattiWarPokerResultDto(wrapByteBuffer(binary));
}

function _decodeTeenPattiWarPokerResultDto(bb: ByteBuffer): TeenPattiWarPokerResultDto {
  let message: TeenPattiWarPokerResultDto = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated string pais = 1;
      case 1: {
        let values = message.pais || (message.pais = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }

      // optional int32 paisAttr = 2;
      case 2: {
        message.paisAttr = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface TeenPattiWarRoomInfoVo {
  roomState?: number;
  roomId?: string;
  lastMsgId?: string;
  currMsgId?: string;
  userId?: string;
  playing?: boolean;
  gameType?: number;
  roomType?: number;
  roomLevel?: number;
  baseMultiple?: number;
  maxGameNum?: number;
  currGameNum?: number;
}

export function encodeTeenPattiWarRoomInfoVo(message: TeenPattiWarRoomInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeTeenPattiWarRoomInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodeTeenPattiWarRoomInfoVo(message: TeenPattiWarRoomInfoVo, bb: ByteBuffer): void {
  // optional int32 roomState = 1;
  let $roomState = message.roomState;
  if ($roomState !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($roomState));
  }

  // optional string roomId = 2;
  let $roomId = message.roomId;
  if ($roomId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $roomId);
  }

  // optional string lastMsgId = 3;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 4;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $currMsgId);
  }

  // optional string userId = 5;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $userId);
  }

  // optional bool playing = 6;
  let $playing = message.playing;
  if ($playing !== undefined) {
    writeVarint32(bb, 48);
    writeByte(bb, $playing ? 1 : 0);
  }

  // optional int32 gameType = 7;
  let $gameType = message.gameType;
  if ($gameType !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($gameType));
  }

  // optional int32 roomType = 8;
  let $roomType = message.roomType;
  if ($roomType !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, intToLong($roomType));
  }

  // optional int32 roomLevel = 9;
  let $roomLevel = message.roomLevel;
  if ($roomLevel !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($roomLevel));
  }

  // optional int32 baseMultiple = 10;
  let $baseMultiple = message.baseMultiple;
  if ($baseMultiple !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, intToLong($baseMultiple));
  }

  // optional int32 maxGameNum = 11;
  let $maxGameNum = message.maxGameNum;
  if ($maxGameNum !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($maxGameNum));
  }

  // optional int32 currGameNum = 12;
  let $currGameNum = message.currGameNum;
  if ($currGameNum !== undefined) {
    writeVarint32(bb, 96);
    writeVarint64(bb, intToLong($currGameNum));
  }
}

export function decodeTeenPattiWarRoomInfoVo(binary: Uint8Array): TeenPattiWarRoomInfoVo {
  return _decodeTeenPattiWarRoomInfoVo(wrapByteBuffer(binary));
}

function _decodeTeenPattiWarRoomInfoVo(bb: ByteBuffer): TeenPattiWarRoomInfoVo {
  let message: TeenPattiWarRoomInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 roomState = 1;
      case 1: {
        message.roomState = readVarint32(bb);
        break;
      }

      // optional string roomId = 2;
      case 2: {
        message.roomId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string lastMsgId = 3;
      case 3: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 4;
      case 4: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string userId = 5;
      case 5: {
        message.userId = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool playing = 6;
      case 6: {
        message.playing = !!readByte(bb);
        break;
      }

      // optional int32 gameType = 7;
      case 7: {
        message.gameType = readVarint32(bb);
        break;
      }

      // optional int32 roomType = 8;
      case 8: {
        message.roomType = readVarint32(bb);
        break;
      }

      // optional int32 roomLevel = 9;
      case 9: {
        message.roomLevel = readVarint32(bb);
        break;
      }

      // optional int32 baseMultiple = 10;
      case 10: {
        message.baseMultiple = readVarint32(bb);
        break;
      }

      // optional int32 maxGameNum = 11;
      case 11: {
        message.maxGameNum = readVarint32(bb);
        break;
      }

      // optional int32 currGameNum = 12;
      case 12: {
        message.currGameNum = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LuckyDiceRoomInfoVo {
  roomState?: number;
  roomId?: string;
  lastMsgId?: string;
  currMsgId?: string;
  userId?: string;
  playing?: boolean;
  gameType?: number;
  roomType?: number;
  roomLevel?: number;
  baseMultiple?: number;
  maxGameNum?: number;
  currGameNum?: number;
}

export function encodeLuckyDiceRoomInfoVo(message: LuckyDiceRoomInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeLuckyDiceRoomInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodeLuckyDiceRoomInfoVo(message: LuckyDiceRoomInfoVo, bb: ByteBuffer): void {
  // optional int32 roomState = 1;
  let $roomState = message.roomState;
  if ($roomState !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($roomState));
  }

  // optional string roomId = 2;
  let $roomId = message.roomId;
  if ($roomId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $roomId);
  }

  // optional string lastMsgId = 3;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 4;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $currMsgId);
  }

  // optional string userId = 5;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $userId);
  }

  // optional bool playing = 6;
  let $playing = message.playing;
  if ($playing !== undefined) {
    writeVarint32(bb, 48);
    writeByte(bb, $playing ? 1 : 0);
  }

  // optional int32 gameType = 7;
  let $gameType = message.gameType;
  if ($gameType !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($gameType));
  }

  // optional int32 roomType = 8;
  let $roomType = message.roomType;
  if ($roomType !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, intToLong($roomType));
  }

  // optional int32 roomLevel = 9;
  let $roomLevel = message.roomLevel;
  if ($roomLevel !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($roomLevel));
  }

  // optional int32 baseMultiple = 10;
  let $baseMultiple = message.baseMultiple;
  if ($baseMultiple !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, intToLong($baseMultiple));
  }

  // optional int32 maxGameNum = 11;
  let $maxGameNum = message.maxGameNum;
  if ($maxGameNum !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($maxGameNum));
  }

  // optional int32 currGameNum = 12;
  let $currGameNum = message.currGameNum;
  if ($currGameNum !== undefined) {
    writeVarint32(bb, 96);
    writeVarint64(bb, intToLong($currGameNum));
  }
}

export function decodeLuckyDiceRoomInfoVo(binary: Uint8Array): LuckyDiceRoomInfoVo {
  return _decodeLuckyDiceRoomInfoVo(wrapByteBuffer(binary));
}

function _decodeLuckyDiceRoomInfoVo(bb: ByteBuffer): LuckyDiceRoomInfoVo {
  let message: LuckyDiceRoomInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 roomState = 1;
      case 1: {
        message.roomState = readVarint32(bb);
        break;
      }

      // optional string roomId = 2;
      case 2: {
        message.roomId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string lastMsgId = 3;
      case 3: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 4;
      case 4: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string userId = 5;
      case 5: {
        message.userId = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool playing = 6;
      case 6: {
        message.playing = !!readByte(bb);
        break;
      }

      // optional int32 gameType = 7;
      case 7: {
        message.gameType = readVarint32(bb);
        break;
      }

      // optional int32 roomType = 8;
      case 8: {
        message.roomType = readVarint32(bb);
        break;
      }

      // optional int32 roomLevel = 9;
      case 9: {
        message.roomLevel = readVarint32(bb);
        break;
      }

      // optional int32 baseMultiple = 10;
      case 10: {
        message.baseMultiple = readVarint32(bb);
        break;
      }

      // optional int32 maxGameNum = 11;
      case 11: {
        message.maxGameNum = readVarint32(bb);
        break;
      }

      // optional int32 currGameNum = 12;
      case 12: {
        message.currGameNum = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RedYellowBlueWinDto {
  gameNum?: number;
  id?: number;
  reelIndex?: number;
  controlSingleState?: number;
}

export function encodeRedYellowBlueWinDto(message: RedYellowBlueWinDto): Uint8Array {
  let bb = popByteBuffer();
  _encodeRedYellowBlueWinDto(message, bb);
  return toUint8Array(bb);
}

function _encodeRedYellowBlueWinDto(message: RedYellowBlueWinDto, bb: ByteBuffer): void {
  // optional int32 gameNum = 1;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional int32 id = 2;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($id));
  }

  // optional int32 reelIndex = 3;
  let $reelIndex = message.reelIndex;
  if ($reelIndex !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($reelIndex));
  }

  // optional int32 controlSingleState = 4;
  let $controlSingleState = message.controlSingleState;
  if ($controlSingleState !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($controlSingleState));
  }
}

export function decodeRedYellowBlueWinDto(binary: Uint8Array): RedYellowBlueWinDto {
  return _decodeRedYellowBlueWinDto(wrapByteBuffer(binary));
}

function _decodeRedYellowBlueWinDto(bb: ByteBuffer): RedYellowBlueWinDto {
  let message: RedYellowBlueWinDto = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 gameNum = 1;
      case 1: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional int32 id = 2;
      case 2: {
        message.id = readVarint32(bb);
        break;
      }

      // optional int32 reelIndex = 3;
      case 3: {
        message.reelIndex = readVarint32(bb);
        break;
      }

      // optional int32 controlSingleState = 4;
      case 4: {
        message.controlSingleState = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RYBSendDrawMsgGameInfoVO {
  leftOptSeconds?: number;
  gameNum?: number;
  onlinePlayers?: number;
}

export function encodeRYBSendDrawMsgGameInfoVO(message: RYBSendDrawMsgGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeRYBSendDrawMsgGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeRYBSendDrawMsgGameInfoVO(message: RYBSendDrawMsgGameInfoVO, bb: ByteBuffer): void {
  // optional int32 leftOptSeconds = 1;
  let $leftOptSeconds = message.leftOptSeconds;
  if ($leftOptSeconds !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($leftOptSeconds));
  }

  // optional int32 gameNum = 2;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional int32 onlinePlayers = 3;
  let $onlinePlayers = message.onlinePlayers;
  if ($onlinePlayers !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($onlinePlayers));
  }
}

export function decodeRYBSendDrawMsgGameInfoVO(binary: Uint8Array): RYBSendDrawMsgGameInfoVO {
  return _decodeRYBSendDrawMsgGameInfoVO(wrapByteBuffer(binary));
}

function _decodeRYBSendDrawMsgGameInfoVO(bb: ByteBuffer): RYBSendDrawMsgGameInfoVO {
  let message: RYBSendDrawMsgGameInfoVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 leftOptSeconds = 1;
      case 1: {
        message.leftOptSeconds = readVarint32(bb);
        break;
      }

      // optional int32 gameNum = 2;
      case 2: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional int32 onlinePlayers = 3;
      case 3: {
        message.onlinePlayers = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RoomRecordParam {
  page?: number;
  gameType?: number;
  dateType?: number;
  winLost?: number;
  userId?: string;
  sessionId?: string;
  s_deviceid?: string;
  s_platform?: string;
  ip?: string;
  s_cid?: string;
  media_id?: string;
  utm_campaign?: string;
  s_model?: string;
  s_version?: string;
  s_access?: string;
  s_sWidth?: string;
  s_carrier?: string;
  s_osVersion?: string;
  s_brand?: string;
  s_sHeight?: string;
  vipLevel?: number;
  vipVp?: number;
  totalPayment?: number;
  userType?: number;
  firstLoginTime?: string;
}

export function encodeRoomRecordParam(message: RoomRecordParam): Uint8Array {
  let bb = popByteBuffer();
  _encodeRoomRecordParam(message, bb);
  return toUint8Array(bb);
}

function _encodeRoomRecordParam(message: RoomRecordParam, bb: ByteBuffer): void {
  // optional int32 page = 1;
  let $page = message.page;
  if ($page !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($page));
  }

  // optional int32 gameType = 2;
  let $gameType = message.gameType;
  if ($gameType !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($gameType));
  }

  // optional int32 dateType = 3;
  let $dateType = message.dateType;
  if ($dateType !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($dateType));
  }

  // optional int32 winLost = 4;
  let $winLost = message.winLost;
  if ($winLost !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($winLost));
  }

  // optional string userId = 5;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $userId);
  }

  // optional string sessionId = 6;
  let $sessionId = message.sessionId;
  if ($sessionId !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $sessionId);
  }

  // optional string s_deviceid = 7;
  let $s_deviceid = message.s_deviceid;
  if ($s_deviceid !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $s_deviceid);
  }

  // optional string s_platform = 8;
  let $s_platform = message.s_platform;
  if ($s_platform !== undefined) {
    writeVarint32(bb, 66);
    writeString(bb, $s_platform);
  }

  // optional string ip = 9;
  let $ip = message.ip;
  if ($ip !== undefined) {
    writeVarint32(bb, 74);
    writeString(bb, $ip);
  }

  // optional string s_cid = 10;
  let $s_cid = message.s_cid;
  if ($s_cid !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $s_cid);
  }

  // optional string media_id = 11;
  let $media_id = message.media_id;
  if ($media_id !== undefined) {
    writeVarint32(bb, 90);
    writeString(bb, $media_id);
  }

  // optional string utm_campaign = 12;
  let $utm_campaign = message.utm_campaign;
  if ($utm_campaign !== undefined) {
    writeVarint32(bb, 98);
    writeString(bb, $utm_campaign);
  }

  // optional string s_model = 13;
  let $s_model = message.s_model;
  if ($s_model !== undefined) {
    writeVarint32(bb, 106);
    writeString(bb, $s_model);
  }

  // optional string s_version = 14;
  let $s_version = message.s_version;
  if ($s_version !== undefined) {
    writeVarint32(bb, 114);
    writeString(bb, $s_version);
  }

  // optional string s_access = 15;
  let $s_access = message.s_access;
  if ($s_access !== undefined) {
    writeVarint32(bb, 122);
    writeString(bb, $s_access);
  }

  // optional string s_sWidth = 16;
  let $s_sWidth = message.s_sWidth;
  if ($s_sWidth !== undefined) {
    writeVarint32(bb, 130);
    writeString(bb, $s_sWidth);
  }

  // optional string s_carrier = 17;
  let $s_carrier = message.s_carrier;
  if ($s_carrier !== undefined) {
    writeVarint32(bb, 138);
    writeString(bb, $s_carrier);
  }

  // optional string s_osVersion = 18;
  let $s_osVersion = message.s_osVersion;
  if ($s_osVersion !== undefined) {
    writeVarint32(bb, 146);
    writeString(bb, $s_osVersion);
  }

  // optional string s_brand = 19;
  let $s_brand = message.s_brand;
  if ($s_brand !== undefined) {
    writeVarint32(bb, 154);
    writeString(bb, $s_brand);
  }

  // optional string s_sHeight = 20;
  let $s_sHeight = message.s_sHeight;
  if ($s_sHeight !== undefined) {
    writeVarint32(bb, 162);
    writeString(bb, $s_sHeight);
  }

  // optional int32 vipLevel = 21;
  let $vipLevel = message.vipLevel;
  if ($vipLevel !== undefined) {
    writeVarint32(bb, 168);
    writeVarint64(bb, intToLong($vipLevel));
  }

  // optional int32 vipVp = 22;
  let $vipVp = message.vipVp;
  if ($vipVp !== undefined) {
    writeVarint32(bb, 176);
    writeVarint64(bb, intToLong($vipVp));
  }

  // optional int32 totalPayment = 23;
  let $totalPayment = message.totalPayment;
  if ($totalPayment !== undefined) {
    writeVarint32(bb, 184);
    writeVarint64(bb, intToLong($totalPayment));
  }

  // optional int32 userType = 24;
  let $userType = message.userType;
  if ($userType !== undefined) {
    writeVarint32(bb, 192);
    writeVarint64(bb, intToLong($userType));
  }

  // optional string firstLoginTime = 25;
  let $firstLoginTime = message.firstLoginTime;
  if ($firstLoginTime !== undefined) {
    writeVarint32(bb, 202);
    writeString(bb, $firstLoginTime);
  }
}

export function decodeRoomRecordParam(binary: Uint8Array): RoomRecordParam {
  return _decodeRoomRecordParam(wrapByteBuffer(binary));
}

function _decodeRoomRecordParam(bb: ByteBuffer): RoomRecordParam {
  let message: RoomRecordParam = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 page = 1;
      case 1: {
        message.page = readVarint32(bb);
        break;
      }

      // optional int32 gameType = 2;
      case 2: {
        message.gameType = readVarint32(bb);
        break;
      }

      // optional int32 dateType = 3;
      case 3: {
        message.dateType = readVarint32(bb);
        break;
      }

      // optional int32 winLost = 4;
      case 4: {
        message.winLost = readVarint32(bb);
        break;
      }

      // optional string userId = 5;
      case 5: {
        message.userId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string sessionId = 6;
      case 6: {
        message.sessionId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_deviceid = 7;
      case 7: {
        message.s_deviceid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_platform = 8;
      case 8: {
        message.s_platform = readString(bb, readVarint32(bb));
        break;
      }

      // optional string ip = 9;
      case 9: {
        message.ip = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_cid = 10;
      case 10: {
        message.s_cid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string media_id = 11;
      case 11: {
        message.media_id = readString(bb, readVarint32(bb));
        break;
      }

      // optional string utm_campaign = 12;
      case 12: {
        message.utm_campaign = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_model = 13;
      case 13: {
        message.s_model = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_version = 14;
      case 14: {
        message.s_version = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_access = 15;
      case 15: {
        message.s_access = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_sWidth = 16;
      case 16: {
        message.s_sWidth = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_carrier = 17;
      case 17: {
        message.s_carrier = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_osVersion = 18;
      case 18: {
        message.s_osVersion = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_brand = 19;
      case 19: {
        message.s_brand = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_sHeight = 20;
      case 20: {
        message.s_sHeight = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 vipLevel = 21;
      case 21: {
        message.vipLevel = readVarint32(bb);
        break;
      }

      // optional int32 vipVp = 22;
      case 22: {
        message.vipVp = readVarint32(bb);
        break;
      }

      // optional int32 totalPayment = 23;
      case 23: {
        message.totalPayment = readVarint32(bb);
        break;
      }

      // optional int32 userType = 24;
      case 24: {
        message.userType = readVarint32(bb);
        break;
      }

      // optional string firstLoginTime = 25;
      case 25: {
        message.firstLoginTime = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LDSendDrawMsgVO {
  notifyType?: number;
  playerResult?: number;
  gameInfo?: LDSendDrawMsgGameInfoVO;
  userInfoList?: RoomUserVo[];
  gameResult?: LuckyDiceWinDto;
}

export function encodeLDSendDrawMsgVO(message: LDSendDrawMsgVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeLDSendDrawMsgVO(message, bb);
  return toUint8Array(bb);
}

function _encodeLDSendDrawMsgVO(message: LDSendDrawMsgVO, bb: ByteBuffer): void {
  // optional int32 notifyType = 1;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($notifyType));
  }

  // optional int32 playerResult = 2;
  let $playerResult = message.playerResult;
  if ($playerResult !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($playerResult));
  }

  // optional LDSendDrawMsgGameInfoVO gameInfo = 3;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeLDSendDrawMsgGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated RoomUserVo userInfoList = 4;
  let array$userInfoList = message.userInfoList;
  if (array$userInfoList !== undefined) {
    for (let value of array$userInfoList) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeRoomUserVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional LuckyDiceWinDto gameResult = 5;
  let $gameResult = message.gameResult;
  if ($gameResult !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeLuckyDiceWinDto($gameResult, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeLDSendDrawMsgVO(binary: Uint8Array): LDSendDrawMsgVO {
  return _decodeLDSendDrawMsgVO(wrapByteBuffer(binary));
}

function _decodeLDSendDrawMsgVO(bb: ByteBuffer): LDSendDrawMsgVO {
  let message: LDSendDrawMsgVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 notifyType = 1;
      case 1: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // optional int32 playerResult = 2;
      case 2: {
        message.playerResult = readVarint32(bb);
        break;
      }

      // optional LDSendDrawMsgGameInfoVO gameInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeLDSendDrawMsgGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated RoomUserVo userInfoList = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.userInfoList || (message.userInfoList = []);
        values.push(_decodeRoomUserVo(bb));
        bb.limit = limit;
        break;
      }

      // optional LuckyDiceWinDto gameResult = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.gameResult = _decodeLuckyDiceWinDto(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LBDoEnterRoomVO {
  lastMsgId?: string;
  currMsgId?: string;
  roomInfo?: LuckyBallRoomInfoVo;
  gameInfo?: LuckyBallGameInfoVo;
  betCoinMap?: { [key: number]: Long };
  betList?: PointBetCoinsNotifyVo[];
  betSelfCoinMap?: { [key: number]: Long };
  betCoinList?: Long[];
  onlinePlayers?: number;
}

export function encodeLBDoEnterRoomVO(message: LBDoEnterRoomVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeLBDoEnterRoomVO(message, bb);
  return toUint8Array(bb);
}

function _encodeLBDoEnterRoomVO(message: LBDoEnterRoomVO, bb: ByteBuffer): void {
  // optional string lastMsgId = 1;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 2;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $currMsgId);
  }

  // optional LuckyBallRoomInfoVo roomInfo = 3;
  let $roomInfo = message.roomInfo;
  if ($roomInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeLuckyBallRoomInfoVo($roomInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional LuckyBallGameInfoVo gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeLuckyBallGameInfoVo($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional map<int32, int64> betCoinMap = 5;
  let map$betCoinMap = message.betCoinMap;
  if (map$betCoinMap !== undefined) {
    for (let key in map$betCoinMap) {
      let nested = popByteBuffer();
      let value = map$betCoinMap[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 42);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated PointBetCoinsNotifyVo betList = 6;
  let array$betList = message.betList;
  if (array$betList !== undefined) {
    for (let value of array$betList) {
      writeVarint32(bb, 50);
      let nested = popByteBuffer();
      _encodePointBetCoinsNotifyVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<int32, int64> betSelfCoinMap = 7;
  let map$betSelfCoinMap = message.betSelfCoinMap;
  if (map$betSelfCoinMap !== undefined) {
    for (let key in map$betSelfCoinMap) {
      let nested = popByteBuffer();
      let value = map$betSelfCoinMap[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 58);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated int64 betCoinList = 8;
  let array$betCoinList = message.betCoinList;
  if (array$betCoinList !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$betCoinList) {
      writeVarint64(packed, value);
    }
    writeVarint32(bb, 66);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // optional int32 onlinePlayers = 9;
  let $onlinePlayers = message.onlinePlayers;
  if ($onlinePlayers !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($onlinePlayers));
  }
}

export function decodeLBDoEnterRoomVO(binary: Uint8Array): LBDoEnterRoomVO {
  return _decodeLBDoEnterRoomVO(wrapByteBuffer(binary));
}

function _decodeLBDoEnterRoomVO(bb: ByteBuffer): LBDoEnterRoomVO {
  let message: LBDoEnterRoomVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string lastMsgId = 1;
      case 1: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 2;
      case 2: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional LuckyBallRoomInfoVo roomInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.roomInfo = _decodeLuckyBallRoomInfoVo(bb);
        bb.limit = limit;
        break;
      }

      // optional LuckyBallGameInfoVo gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeLuckyBallGameInfoVo(bb);
        bb.limit = limit;
        break;
      }

      // optional map<int32, int64> betCoinMap = 5;
      case 5: {
        let values = message.betCoinMap || (message.betCoinMap = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: number | undefined;
        let value: Long | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              value = readVarint64(bb, /* unsigned */ false);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: betCoinMap");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // repeated PointBetCoinsNotifyVo betList = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        let values = message.betList || (message.betList = []);
        values.push(_decodePointBetCoinsNotifyVo(bb));
        bb.limit = limit;
        break;
      }

      // optional map<int32, int64> betSelfCoinMap = 7;
      case 7: {
        let values = message.betSelfCoinMap || (message.betSelfCoinMap = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: number | undefined;
        let value: Long | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              value = readVarint64(bb, /* unsigned */ false);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: betSelfCoinMap");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // repeated int64 betCoinList = 8;
      case 8: {
        let values = message.betCoinList || (message.betCoinList = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint64(bb, /* unsigned */ false));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint64(bb, /* unsigned */ false));
        }
        break;
      }

      // optional int32 onlinePlayers = 9;
      case 9: {
        message.onlinePlayers = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface JhandiMundaWinIdRateDto {
  id?: number;
  rate?: number;
  count?: number;
}

export function encodeJhandiMundaWinIdRateDto(message: JhandiMundaWinIdRateDto): Uint8Array {
  let bb = popByteBuffer();
  _encodeJhandiMundaWinIdRateDto(message, bb);
  return toUint8Array(bb);
}

function _encodeJhandiMundaWinIdRateDto(message: JhandiMundaWinIdRateDto, bb: ByteBuffer): void {
  // optional int32 id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($id));
  }

  // optional double rate = 2;
  let $rate = message.rate;
  if ($rate !== undefined) {
    writeVarint32(bb, 17);
    writeDouble(bb, $rate);
  }

  // optional int32 count = 3;
  let $count = message.count;
  if ($count !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($count));
  }
}

export function decodeJhandiMundaWinIdRateDto(binary: Uint8Array): JhandiMundaWinIdRateDto {
  return _decodeJhandiMundaWinIdRateDto(wrapByteBuffer(binary));
}

function _decodeJhandiMundaWinIdRateDto(bb: ByteBuffer): JhandiMundaWinIdRateDto {
  let message: JhandiMundaWinIdRateDto = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 id = 1;
      case 1: {
        message.id = readVarint32(bb);
        break;
      }

      // optional double rate = 2;
      case 2: {
        message.rate = readDouble(bb);
        break;
      }

      // optional int32 count = 3;
      case 3: {
        message.count = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DTBeginBetVO {
  notifyType?: number;
  lastMsgId?: string;
  currMsgId?: string;
  gameInfo?: DragonAndTigerGameInfoVo;
}

export function encodeDTBeginBetVO(message: DTBeginBetVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeDTBeginBetVO(message, bb);
  return toUint8Array(bb);
}

function _encodeDTBeginBetVO(message: DTBeginBetVO, bb: ByteBuffer): void {
  // optional int32 notifyType = 1;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($notifyType));
  }

  // optional string lastMsgId = 2;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 3;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $currMsgId);
  }

  // optional DragonAndTigerGameInfoVo gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeDragonAndTigerGameInfoVo($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeDTBeginBetVO(binary: Uint8Array): DTBeginBetVO {
  return _decodeDTBeginBetVO(wrapByteBuffer(binary));
}

function _decodeDTBeginBetVO(bb: ByteBuffer): DTBeginBetVO {
  let message: DTBeginBetVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 notifyType = 1;
      case 1: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // optional string lastMsgId = 2;
      case 2: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 3;
      case 3: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional DragonAndTigerGameInfoVo gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeDragonAndTigerGameInfoVo(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Dice3GameInfoVo {
  OddsInfoList?: OddsInfoVo[];
  gameResultList?: Dice3WinDto[];
  gameNum?: number;
  bankerId?: string;
  currOptUserId?: string;
  totalOptSeconds?: number;
  leftOptSeconds?: number;
  dealCardMilliseconds?: Long;
  leftPaiNum?: number;
  qiPai?: string;
  turnType?: number;
}

export function encodeDice3GameInfoVo(message: Dice3GameInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeDice3GameInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodeDice3GameInfoVo(message: Dice3GameInfoVo, bb: ByteBuffer): void {
  // repeated OddsInfoVo OddsInfoList = 1;
  let array$OddsInfoList = message.OddsInfoList;
  if (array$OddsInfoList !== undefined) {
    for (let value of array$OddsInfoList) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeOddsInfoVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated Dice3WinDto gameResultList = 2;
  let array$gameResultList = message.gameResultList;
  if (array$gameResultList !== undefined) {
    for (let value of array$gameResultList) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeDice3WinDto(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional int32 gameNum = 3;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional string bankerId = 4;
  let $bankerId = message.bankerId;
  if ($bankerId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $bankerId);
  }

  // optional string currOptUserId = 5;
  let $currOptUserId = message.currOptUserId;
  if ($currOptUserId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $currOptUserId);
  }

  // optional int32 totalOptSeconds = 6;
  let $totalOptSeconds = message.totalOptSeconds;
  if ($totalOptSeconds !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($totalOptSeconds));
  }

  // optional int32 leftOptSeconds = 7;
  let $leftOptSeconds = message.leftOptSeconds;
  if ($leftOptSeconds !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($leftOptSeconds));
  }

  // optional int64 dealCardMilliseconds = 8;
  let $dealCardMilliseconds = message.dealCardMilliseconds;
  if ($dealCardMilliseconds !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, $dealCardMilliseconds);
  }

  // optional int32 leftPaiNum = 9;
  let $leftPaiNum = message.leftPaiNum;
  if ($leftPaiNum !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($leftPaiNum));
  }

  // optional string qiPai = 10;
  let $qiPai = message.qiPai;
  if ($qiPai !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $qiPai);
  }

  // optional int32 turnType = 11;
  let $turnType = message.turnType;
  if ($turnType !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($turnType));
  }
}

export function decodeDice3GameInfoVo(binary: Uint8Array): Dice3GameInfoVo {
  return _decodeDice3GameInfoVo(wrapByteBuffer(binary));
}

function _decodeDice3GameInfoVo(bb: ByteBuffer): Dice3GameInfoVo {
  let message: Dice3GameInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated OddsInfoVo OddsInfoList = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.OddsInfoList || (message.OddsInfoList = []);
        values.push(_decodeOddsInfoVo(bb));
        bb.limit = limit;
        break;
      }

      // repeated Dice3WinDto gameResultList = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.gameResultList || (message.gameResultList = []);
        values.push(_decodeDice3WinDto(bb));
        bb.limit = limit;
        break;
      }

      // optional int32 gameNum = 3;
      case 3: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional string bankerId = 4;
      case 4: {
        message.bankerId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currOptUserId = 5;
      case 5: {
        message.currOptUserId = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 totalOptSeconds = 6;
      case 6: {
        message.totalOptSeconds = readVarint32(bb);
        break;
      }

      // optional int32 leftOptSeconds = 7;
      case 7: {
        message.leftOptSeconds = readVarint32(bb);
        break;
      }

      // optional int64 dealCardMilliseconds = 8;
      case 8: {
        message.dealCardMilliseconds = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 leftPaiNum = 9;
      case 9: {
        message.leftPaiNum = readVarint32(bb);
        break;
      }

      // optional string qiPai = 10;
      case 10: {
        message.qiPai = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 turnType = 11;
      case 11: {
        message.turnType = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LBSendDrawMsgVO {
  notifyType?: number;
  playerResult?: number;
  gameInfo?: LBSendDrawMsgGameInfoVO;
  userInfoList?: RoomUserVo[];
  gameResult?: LuckyBallWinDto;
}

export function encodeLBSendDrawMsgVO(message: LBSendDrawMsgVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeLBSendDrawMsgVO(message, bb);
  return toUint8Array(bb);
}

function _encodeLBSendDrawMsgVO(message: LBSendDrawMsgVO, bb: ByteBuffer): void {
  // optional int32 notifyType = 1;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($notifyType));
  }

  // optional int32 playerResult = 2;
  let $playerResult = message.playerResult;
  if ($playerResult !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($playerResult));
  }

  // optional LBSendDrawMsgGameInfoVO gameInfo = 3;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeLBSendDrawMsgGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated RoomUserVo userInfoList = 4;
  let array$userInfoList = message.userInfoList;
  if (array$userInfoList !== undefined) {
    for (let value of array$userInfoList) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeRoomUserVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional LuckyBallWinDto gameResult = 5;
  let $gameResult = message.gameResult;
  if ($gameResult !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeLuckyBallWinDto($gameResult, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeLBSendDrawMsgVO(binary: Uint8Array): LBSendDrawMsgVO {
  return _decodeLBSendDrawMsgVO(wrapByteBuffer(binary));
}

function _decodeLBSendDrawMsgVO(bb: ByteBuffer): LBSendDrawMsgVO {
  let message: LBSendDrawMsgVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 notifyType = 1;
      case 1: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // optional int32 playerResult = 2;
      case 2: {
        message.playerResult = readVarint32(bb);
        break;
      }

      // optional LBSendDrawMsgGameInfoVO gameInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeLBSendDrawMsgGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated RoomUserVo userInfoList = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.userInfoList || (message.userInfoList = []);
        values.push(_decodeRoomUserVo(bb));
        bb.limit = limit;
        break;
      }

      // optional LuckyBallWinDto gameResult = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.gameResult = _decodeLuckyBallWinDto(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface TPSendDrawMsgGameInfoVO {
  leftOptSeconds?: number;
  gameNum?: number;
  onlinePlayers?: number;
}

export function encodeTPSendDrawMsgGameInfoVO(message: TPSendDrawMsgGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeTPSendDrawMsgGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeTPSendDrawMsgGameInfoVO(message: TPSendDrawMsgGameInfoVO, bb: ByteBuffer): void {
  // optional int32 leftOptSeconds = 1;
  let $leftOptSeconds = message.leftOptSeconds;
  if ($leftOptSeconds !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($leftOptSeconds));
  }

  // optional int32 gameNum = 2;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional int32 onlinePlayers = 3;
  let $onlinePlayers = message.onlinePlayers;
  if ($onlinePlayers !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($onlinePlayers));
  }
}

export function decodeTPSendDrawMsgGameInfoVO(binary: Uint8Array): TPSendDrawMsgGameInfoVO {
  return _decodeTPSendDrawMsgGameInfoVO(wrapByteBuffer(binary));
}

function _decodeTPSendDrawMsgGameInfoVO(bb: ByteBuffer): TPSendDrawMsgGameInfoVO {
  let message: TPSendDrawMsgGameInfoVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 leftOptSeconds = 1;
      case 1: {
        message.leftOptSeconds = readVarint32(bb);
        break;
      }

      // optional int32 gameNum = 2;
      case 2: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional int32 onlinePlayers = 3;
      case 3: {
        message.onlinePlayers = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RoomUserDto {
  seatNo?: number;
  userId?: string;
  status?: number;
  nickName?: string;
  portrait?: string;
  vipLevel?: number;
  balanceCoins?: Long;
  autoPlay?: boolean;
  autoPlayTimes?: number;
  playNums?: number;
  maxPlayNums?: number;
  extra?: string;
  roundCount?: number;
  winRoundCount?: number;
  totalWinCoins?: Long;
  userType?: number;
  winBalance?: Long;
  loseBalance?: Long;
}

export function encodeRoomUserDto(message: RoomUserDto): Uint8Array {
  let bb = popByteBuffer();
  _encodeRoomUserDto(message, bb);
  return toUint8Array(bb);
}

function _encodeRoomUserDto(message: RoomUserDto, bb: ByteBuffer): void {
  // optional int32 seatNo = 1;
  let $seatNo = message.seatNo;
  if ($seatNo !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($seatNo));
  }

  // optional string userId = 2;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $userId);
  }

  // optional int32 status = 3;
  let $status = message.status;
  if ($status !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($status));
  }

  // optional string nickName = 4;
  let $nickName = message.nickName;
  if ($nickName !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $nickName);
  }

  // optional string portrait = 5;
  let $portrait = message.portrait;
  if ($portrait !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $portrait);
  }

  // optional int32 vipLevel = 6;
  let $vipLevel = message.vipLevel;
  if ($vipLevel !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($vipLevel));
  }

  // optional int64 balanceCoins = 7;
  let $balanceCoins = message.balanceCoins;
  if ($balanceCoins !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $balanceCoins);
  }

  // optional bool autoPlay = 8;
  let $autoPlay = message.autoPlay;
  if ($autoPlay !== undefined) {
    writeVarint32(bb, 64);
    writeByte(bb, $autoPlay ? 1 : 0);
  }

  // optional int32 autoPlayTimes = 9;
  let $autoPlayTimes = message.autoPlayTimes;
  if ($autoPlayTimes !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($autoPlayTimes));
  }

  // optional int32 playNums = 10;
  let $playNums = message.playNums;
  if ($playNums !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, intToLong($playNums));
  }

  // optional int32 maxPlayNums = 11;
  let $maxPlayNums = message.maxPlayNums;
  if ($maxPlayNums !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($maxPlayNums));
  }

  // optional string extra = 12;
  let $extra = message.extra;
  if ($extra !== undefined) {
    writeVarint32(bb, 98);
    writeString(bb, $extra);
  }

  // optional int32 roundCount = 13;
  let $roundCount = message.roundCount;
  if ($roundCount !== undefined) {
    writeVarint32(bb, 104);
    writeVarint64(bb, intToLong($roundCount));
  }

  // optional int32 winRoundCount = 14;
  let $winRoundCount = message.winRoundCount;
  if ($winRoundCount !== undefined) {
    writeVarint32(bb, 112);
    writeVarint64(bb, intToLong($winRoundCount));
  }

  // optional int64 totalWinCoins = 15;
  let $totalWinCoins = message.totalWinCoins;
  if ($totalWinCoins !== undefined) {
    writeVarint32(bb, 120);
    writeVarint64(bb, $totalWinCoins);
  }

  // optional int32 userType = 16;
  let $userType = message.userType;
  if ($userType !== undefined) {
    writeVarint32(bb, 128);
    writeVarint64(bb, intToLong($userType));
  }

  // optional int64 winBalance = 17;
  let $winBalance = message.winBalance;
  if ($winBalance !== undefined) {
    writeVarint32(bb, 136);
    writeVarint64(bb, $winBalance);
  }

  // optional int64 loseBalance = 18;
  let $loseBalance = message.loseBalance;
  if ($loseBalance !== undefined) {
    writeVarint32(bb, 144);
    writeVarint64(bb, $loseBalance);
  }
}

export function decodeRoomUserDto(binary: Uint8Array): RoomUserDto {
  return _decodeRoomUserDto(wrapByteBuffer(binary));
}

function _decodeRoomUserDto(bb: ByteBuffer): RoomUserDto {
  let message: RoomUserDto = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 seatNo = 1;
      case 1: {
        message.seatNo = readVarint32(bb);
        break;
      }

      // optional string userId = 2;
      case 2: {
        message.userId = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 status = 3;
      case 3: {
        message.status = readVarint32(bb);
        break;
      }

      // optional string nickName = 4;
      case 4: {
        message.nickName = readString(bb, readVarint32(bb));
        break;
      }

      // optional string portrait = 5;
      case 5: {
        message.portrait = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 vipLevel = 6;
      case 6: {
        message.vipLevel = readVarint32(bb);
        break;
      }

      // optional int64 balanceCoins = 7;
      case 7: {
        message.balanceCoins = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional bool autoPlay = 8;
      case 8: {
        message.autoPlay = !!readByte(bb);
        break;
      }

      // optional int32 autoPlayTimes = 9;
      case 9: {
        message.autoPlayTimes = readVarint32(bb);
        break;
      }

      // optional int32 playNums = 10;
      case 10: {
        message.playNums = readVarint32(bb);
        break;
      }

      // optional int32 maxPlayNums = 11;
      case 11: {
        message.maxPlayNums = readVarint32(bb);
        break;
      }

      // optional string extra = 12;
      case 12: {
        message.extra = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 roundCount = 13;
      case 13: {
        message.roundCount = readVarint32(bb);
        break;
      }

      // optional int32 winRoundCount = 14;
      case 14: {
        message.winRoundCount = readVarint32(bb);
        break;
      }

      // optional int64 totalWinCoins = 15;
      case 15: {
        message.totalWinCoins = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 userType = 16;
      case 16: {
        message.userType = readVarint32(bb);
        break;
      }

      // optional int64 winBalance = 17;
      case 17: {
        message.winBalance = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 loseBalance = 18;
      case 18: {
        message.loseBalance = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface JMDoEnterRoomVO {
  lastMsgId?: string;
  currMsgId?: string;
  roomInfo?: JhandiMundaRoomInfoVo;
  gameInfo?: JhandiMundaGameInfoVo;
  betList?: PointBetCoinsNotifyVo[];
  betCoinMap?: { [key: number]: Long };
  betSelfCoinMap?: { [key: number]: Long };
  betCoinList?: Long[];
  onlinePlayers?: number;
}

export function encodeJMDoEnterRoomVO(message: JMDoEnterRoomVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeJMDoEnterRoomVO(message, bb);
  return toUint8Array(bb);
}

function _encodeJMDoEnterRoomVO(message: JMDoEnterRoomVO, bb: ByteBuffer): void {
  // optional string lastMsgId = 1;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 2;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $currMsgId);
  }

  // optional JhandiMundaRoomInfoVo roomInfo = 3;
  let $roomInfo = message.roomInfo;
  if ($roomInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeJhandiMundaRoomInfoVo($roomInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional JhandiMundaGameInfoVo gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeJhandiMundaGameInfoVo($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated PointBetCoinsNotifyVo betList = 5;
  let array$betList = message.betList;
  if (array$betList !== undefined) {
    for (let value of array$betList) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodePointBetCoinsNotifyVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<int32, int64> betCoinMap = 6;
  let map$betCoinMap = message.betCoinMap;
  if (map$betCoinMap !== undefined) {
    for (let key in map$betCoinMap) {
      let nested = popByteBuffer();
      let value = map$betCoinMap[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 50);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<int32, int64> betSelfCoinMap = 7;
  let map$betSelfCoinMap = message.betSelfCoinMap;
  if (map$betSelfCoinMap !== undefined) {
    for (let key in map$betSelfCoinMap) {
      let nested = popByteBuffer();
      let value = map$betSelfCoinMap[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 58);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated int64 betCoinList = 8;
  let array$betCoinList = message.betCoinList;
  if (array$betCoinList !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$betCoinList) {
      writeVarint64(packed, value);
    }
    writeVarint32(bb, 66);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // optional int32 onlinePlayers = 9;
  let $onlinePlayers = message.onlinePlayers;
  if ($onlinePlayers !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($onlinePlayers));
  }
}

export function decodeJMDoEnterRoomVO(binary: Uint8Array): JMDoEnterRoomVO {
  return _decodeJMDoEnterRoomVO(wrapByteBuffer(binary));
}

function _decodeJMDoEnterRoomVO(bb: ByteBuffer): JMDoEnterRoomVO {
  let message: JMDoEnterRoomVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string lastMsgId = 1;
      case 1: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 2;
      case 2: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional JhandiMundaRoomInfoVo roomInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.roomInfo = _decodeJhandiMundaRoomInfoVo(bb);
        bb.limit = limit;
        break;
      }

      // optional JhandiMundaGameInfoVo gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeJhandiMundaGameInfoVo(bb);
        bb.limit = limit;
        break;
      }

      // repeated PointBetCoinsNotifyVo betList = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.betList || (message.betList = []);
        values.push(_decodePointBetCoinsNotifyVo(bb));
        bb.limit = limit;
        break;
      }

      // optional map<int32, int64> betCoinMap = 6;
      case 6: {
        let values = message.betCoinMap || (message.betCoinMap = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: number | undefined;
        let value: Long | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              value = readVarint64(bb, /* unsigned */ false);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: betCoinMap");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // optional map<int32, int64> betSelfCoinMap = 7;
      case 7: {
        let values = message.betSelfCoinMap || (message.betSelfCoinMap = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: number | undefined;
        let value: Long | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              value = readVarint64(bb, /* unsigned */ false);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: betSelfCoinMap");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // repeated int64 betCoinList = 8;
      case 8: {
        let values = message.betCoinList || (message.betCoinList = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint64(bb, /* unsigned */ false));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint64(bb, /* unsigned */ false));
        }
        break;
      }

      // optional int32 onlinePlayers = 9;
      case 9: {
        message.onlinePlayers = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface PokerKingGameInfoVo {
  oddsInfoList?: OddsInfoVo[];
  gameResultList?: PokerKingWinDto[];
  gameNum?: number;
  bankerId?: string;
  currOptUserId?: string;
  totalOptSeconds?: number;
  leftOptSeconds?: number;
  dealCardMilliseconds?: Long;
  leftPaiNum?: number;
  qiPai?: string;
  turnType?: number;
}

export function encodePokerKingGameInfoVo(message: PokerKingGameInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodePokerKingGameInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodePokerKingGameInfoVo(message: PokerKingGameInfoVo, bb: ByteBuffer): void {
  // repeated OddsInfoVo oddsInfoList = 1;
  let array$oddsInfoList = message.oddsInfoList;
  if (array$oddsInfoList !== undefined) {
    for (let value of array$oddsInfoList) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeOddsInfoVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated PokerKingWinDto gameResultList = 2;
  let array$gameResultList = message.gameResultList;
  if (array$gameResultList !== undefined) {
    for (let value of array$gameResultList) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodePokerKingWinDto(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional int32 gameNum = 3;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional string bankerId = 4;
  let $bankerId = message.bankerId;
  if ($bankerId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $bankerId);
  }

  // optional string currOptUserId = 5;
  let $currOptUserId = message.currOptUserId;
  if ($currOptUserId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $currOptUserId);
  }

  // optional int32 totalOptSeconds = 6;
  let $totalOptSeconds = message.totalOptSeconds;
  if ($totalOptSeconds !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($totalOptSeconds));
  }

  // optional int32 leftOptSeconds = 7;
  let $leftOptSeconds = message.leftOptSeconds;
  if ($leftOptSeconds !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($leftOptSeconds));
  }

  // optional int64 dealCardMilliseconds = 8;
  let $dealCardMilliseconds = message.dealCardMilliseconds;
  if ($dealCardMilliseconds !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, $dealCardMilliseconds);
  }

  // optional int32 leftPaiNum = 9;
  let $leftPaiNum = message.leftPaiNum;
  if ($leftPaiNum !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($leftPaiNum));
  }

  // optional string qiPai = 10;
  let $qiPai = message.qiPai;
  if ($qiPai !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $qiPai);
  }

  // optional int32 turnType = 11;
  let $turnType = message.turnType;
  if ($turnType !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($turnType));
  }
}

export function decodePokerKingGameInfoVo(binary: Uint8Array): PokerKingGameInfoVo {
  return _decodePokerKingGameInfoVo(wrapByteBuffer(binary));
}

function _decodePokerKingGameInfoVo(bb: ByteBuffer): PokerKingGameInfoVo {
  let message: PokerKingGameInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated OddsInfoVo oddsInfoList = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.oddsInfoList || (message.oddsInfoList = []);
        values.push(_decodeOddsInfoVo(bb));
        bb.limit = limit;
        break;
      }

      // repeated PokerKingWinDto gameResultList = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.gameResultList || (message.gameResultList = []);
        values.push(_decodePokerKingWinDto(bb));
        bb.limit = limit;
        break;
      }

      // optional int32 gameNum = 3;
      case 3: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional string bankerId = 4;
      case 4: {
        message.bankerId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currOptUserId = 5;
      case 5: {
        message.currOptUserId = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 totalOptSeconds = 6;
      case 6: {
        message.totalOptSeconds = readVarint32(bb);
        break;
      }

      // optional int32 leftOptSeconds = 7;
      case 7: {
        message.leftOptSeconds = readVarint32(bb);
        break;
      }

      // optional int64 dealCardMilliseconds = 8;
      case 8: {
        message.dealCardMilliseconds = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 leftPaiNum = 9;
      case 9: {
        message.leftPaiNum = readVarint32(bb);
        break;
      }

      // optional string qiPai = 10;
      case 10: {
        message.qiPai = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 turnType = 11;
      case 11: {
        message.turnType = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface OddsInfoVo {
  betId?: number;
  odds?: number;
}

export function encodeOddsInfoVo(message: OddsInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeOddsInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodeOddsInfoVo(message: OddsInfoVo, bb: ByteBuffer): void {
  // optional int32 betId = 1;
  let $betId = message.betId;
  if ($betId !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($betId));
  }

  // optional double odds = 2;
  let $odds = message.odds;
  if ($odds !== undefined) {
    writeVarint32(bb, 17);
    writeDouble(bb, $odds);
  }
}

export function decodeOddsInfoVo(binary: Uint8Array): OddsInfoVo {
  return _decodeOddsInfoVo(wrapByteBuffer(binary));
}

function _decodeOddsInfoVo(bb: ByteBuffer): OddsInfoVo {
  let message: OddsInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 betId = 1;
      case 1: {
        message.betId = readVarint32(bb);
        break;
      }

      // optional double odds = 2;
      case 2: {
        message.odds = readDouble(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface KickUserVO {
  notifyType?: number;
  gameType?: number;
  roomId?: string;
  lastMsgId?: string;
  currMsgId?: string;
}

export function encodeKickUserVO(message: KickUserVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeKickUserVO(message, bb);
  return toUint8Array(bb);
}

function _encodeKickUserVO(message: KickUserVO, bb: ByteBuffer): void {
  // optional int32 notifyType = 1;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($notifyType));
  }

  // optional int32 gameType = 2;
  let $gameType = message.gameType;
  if ($gameType !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($gameType));
  }

  // optional string roomId = 3;
  let $roomId = message.roomId;
  if ($roomId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $roomId);
  }

  // optional string lastMsgId = 4;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 5;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $currMsgId);
  }
}

export function decodeKickUserVO(binary: Uint8Array): KickUserVO {
  return _decodeKickUserVO(wrapByteBuffer(binary));
}

function _decodeKickUserVO(bb: ByteBuffer): KickUserVO {
  let message: KickUserVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 notifyType = 1;
      case 1: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // optional int32 gameType = 2;
      case 2: {
        message.gameType = readVarint32(bb);
        break;
      }

      // optional string roomId = 3;
      case 3: {
        message.roomId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string lastMsgId = 4;
      case 4: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 5;
      case 5: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface TeenPattiWarGameInfoVo {
  oddsInfoList?: TeenPattiWarOddsInfoVo[];
  gameResultList?: TeenPattiWarWinDto[];
  gameNum?: number;
  bankerId?: string;
  currOptUserId?: string;
  totalOptSeconds?: number;
  leftOptSeconds?: number;
  dealCardMilliseconds?: Long;
  leftPaiNum?: number;
  qiPai?: string;
  turnType?: number;
}

export function encodeTeenPattiWarGameInfoVo(message: TeenPattiWarGameInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeTeenPattiWarGameInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodeTeenPattiWarGameInfoVo(message: TeenPattiWarGameInfoVo, bb: ByteBuffer): void {
  // repeated TeenPattiWarOddsInfoVo oddsInfoList = 1;
  let array$oddsInfoList = message.oddsInfoList;
  if (array$oddsInfoList !== undefined) {
    for (let value of array$oddsInfoList) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeTeenPattiWarOddsInfoVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated TeenPattiWarWinDto gameResultList = 2;
  let array$gameResultList = message.gameResultList;
  if (array$gameResultList !== undefined) {
    for (let value of array$gameResultList) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeTeenPattiWarWinDto(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional int32 gameNum = 3;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional string bankerId = 4;
  let $bankerId = message.bankerId;
  if ($bankerId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $bankerId);
  }

  // optional string currOptUserId = 5;
  let $currOptUserId = message.currOptUserId;
  if ($currOptUserId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $currOptUserId);
  }

  // optional int32 totalOptSeconds = 6;
  let $totalOptSeconds = message.totalOptSeconds;
  if ($totalOptSeconds !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($totalOptSeconds));
  }

  // optional int32 leftOptSeconds = 7;
  let $leftOptSeconds = message.leftOptSeconds;
  if ($leftOptSeconds !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($leftOptSeconds));
  }

  // optional int64 dealCardMilliseconds = 8;
  let $dealCardMilliseconds = message.dealCardMilliseconds;
  if ($dealCardMilliseconds !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, $dealCardMilliseconds);
  }

  // optional int32 leftPaiNum = 9;
  let $leftPaiNum = message.leftPaiNum;
  if ($leftPaiNum !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($leftPaiNum));
  }

  // optional string qiPai = 10;
  let $qiPai = message.qiPai;
  if ($qiPai !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $qiPai);
  }

  // optional int32 turnType = 11;
  let $turnType = message.turnType;
  if ($turnType !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($turnType));
  }
}

export function decodeTeenPattiWarGameInfoVo(binary: Uint8Array): TeenPattiWarGameInfoVo {
  return _decodeTeenPattiWarGameInfoVo(wrapByteBuffer(binary));
}

function _decodeTeenPattiWarGameInfoVo(bb: ByteBuffer): TeenPattiWarGameInfoVo {
  let message: TeenPattiWarGameInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated TeenPattiWarOddsInfoVo oddsInfoList = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.oddsInfoList || (message.oddsInfoList = []);
        values.push(_decodeTeenPattiWarOddsInfoVo(bb));
        bb.limit = limit;
        break;
      }

      // repeated TeenPattiWarWinDto gameResultList = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.gameResultList || (message.gameResultList = []);
        values.push(_decodeTeenPattiWarWinDto(bb));
        bb.limit = limit;
        break;
      }

      // optional int32 gameNum = 3;
      case 3: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional string bankerId = 4;
      case 4: {
        message.bankerId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currOptUserId = 5;
      case 5: {
        message.currOptUserId = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 totalOptSeconds = 6;
      case 6: {
        message.totalOptSeconds = readVarint32(bb);
        break;
      }

      // optional int32 leftOptSeconds = 7;
      case 7: {
        message.leftOptSeconds = readVarint32(bb);
        break;
      }

      // optional int64 dealCardMilliseconds = 8;
      case 8: {
        message.dealCardMilliseconds = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 leftPaiNum = 9;
      case 9: {
        message.leftPaiNum = readVarint32(bb);
        break;
      }

      // optional string qiPai = 10;
      case 10: {
        message.qiPai = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 turnType = 11;
      case 11: {
        message.turnType = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DTSendDrawMsgGameInfoVO {
  leftOptSeconds?: number;
  pokerResultList?: DragonAndTigerPokerResultDto[];
  gameNum?: number;
  onlinePlayers?: number;
}

export function encodeDTSendDrawMsgGameInfoVO(message: DTSendDrawMsgGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeDTSendDrawMsgGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeDTSendDrawMsgGameInfoVO(message: DTSendDrawMsgGameInfoVO, bb: ByteBuffer): void {
  // optional int32 leftOptSeconds = 1;
  let $leftOptSeconds = message.leftOptSeconds;
  if ($leftOptSeconds !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($leftOptSeconds));
  }

  // repeated DragonAndTigerPokerResultDto pokerResultList = 2;
  let array$pokerResultList = message.pokerResultList;
  if (array$pokerResultList !== undefined) {
    for (let value of array$pokerResultList) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeDragonAndTigerPokerResultDto(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional int32 gameNum = 3;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional int32 onlinePlayers = 4;
  let $onlinePlayers = message.onlinePlayers;
  if ($onlinePlayers !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($onlinePlayers));
  }
}

export function decodeDTSendDrawMsgGameInfoVO(binary: Uint8Array): DTSendDrawMsgGameInfoVO {
  return _decodeDTSendDrawMsgGameInfoVO(wrapByteBuffer(binary));
}

function _decodeDTSendDrawMsgGameInfoVO(bb: ByteBuffer): DTSendDrawMsgGameInfoVO {
  let message: DTSendDrawMsgGameInfoVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 leftOptSeconds = 1;
      case 1: {
        message.leftOptSeconds = readVarint32(bb);
        break;
      }

      // repeated DragonAndTigerPokerResultDto pokerResultList = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.pokerResultList || (message.pokerResultList = []);
        values.push(_decodeDragonAndTigerPokerResultDto(bb));
        bb.limit = limit;
        break;
      }

      // optional int32 gameNum = 3;
      case 3: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional int32 onlinePlayers = 4;
      case 4: {
        message.onlinePlayers = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface TeenPattiWarOddsInfoVo {
  luckyHitRate?: { [key: number]: number };
  betId?: number;
  odds?: number;
}

export function encodeTeenPattiWarOddsInfoVo(message: TeenPattiWarOddsInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeTeenPattiWarOddsInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodeTeenPattiWarOddsInfoVo(message: TeenPattiWarOddsInfoVo, bb: ByteBuffer): void {
  // optional map<int32, int32> luckyHitRate = 1;
  let map$luckyHitRate = message.luckyHitRate;
  if (map$luckyHitRate !== undefined) {
    for (let key in map$luckyHitRate) {
      let nested = popByteBuffer();
      let value = map$luckyHitRate[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, intToLong(value));
      writeVarint32(bb, 10);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional int32 betId = 2;
  let $betId = message.betId;
  if ($betId !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($betId));
  }

  // optional double odds = 3;
  let $odds = message.odds;
  if ($odds !== undefined) {
    writeVarint32(bb, 25);
    writeDouble(bb, $odds);
  }
}

export function decodeTeenPattiWarOddsInfoVo(binary: Uint8Array): TeenPattiWarOddsInfoVo {
  return _decodeTeenPattiWarOddsInfoVo(wrapByteBuffer(binary));
}

function _decodeTeenPattiWarOddsInfoVo(bb: ByteBuffer): TeenPattiWarOddsInfoVo {
  let message: TeenPattiWarOddsInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional map<int32, int32> luckyHitRate = 1;
      case 1: {
        let values = message.luckyHitRate || (message.luckyHitRate = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: number | undefined;
        let value: number | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              value = readVarint32(bb);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: luckyHitRate");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // optional int32 betId = 2;
      case 2: {
        message.betId = readVarint32(bb);
        break;
      }

      // optional double odds = 3;
      case 3: {
        message.odds = readDouble(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Dice3SendDrawMsgVO {
  notifyType?: number;
  playerResult?: number;
  gameInfo?: Dice3SendDrawMsgGameInfoVO;
  userInfoList?: RoomUserVo[];
  gameResult?: Dice3WinDto;
}

export function encodeDice3SendDrawMsgVO(message: Dice3SendDrawMsgVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeDice3SendDrawMsgVO(message, bb);
  return toUint8Array(bb);
}

function _encodeDice3SendDrawMsgVO(message: Dice3SendDrawMsgVO, bb: ByteBuffer): void {
  // optional int32 notifyType = 1;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($notifyType));
  }

  // optional int32 playerResult = 2;
  let $playerResult = message.playerResult;
  if ($playerResult !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($playerResult));
  }

  // optional Dice3SendDrawMsgGameInfoVO gameInfo = 3;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeDice3SendDrawMsgGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated RoomUserVo userInfoList = 4;
  let array$userInfoList = message.userInfoList;
  if (array$userInfoList !== undefined) {
    for (let value of array$userInfoList) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeRoomUserVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional Dice3WinDto gameResult = 5;
  let $gameResult = message.gameResult;
  if ($gameResult !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeDice3WinDto($gameResult, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeDice3SendDrawMsgVO(binary: Uint8Array): Dice3SendDrawMsgVO {
  return _decodeDice3SendDrawMsgVO(wrapByteBuffer(binary));
}

function _decodeDice3SendDrawMsgVO(bb: ByteBuffer): Dice3SendDrawMsgVO {
  let message: Dice3SendDrawMsgVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 notifyType = 1;
      case 1: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // optional int32 playerResult = 2;
      case 2: {
        message.playerResult = readVarint32(bb);
        break;
      }

      // optional Dice3SendDrawMsgGameInfoVO gameInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeDice3SendDrawMsgGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated RoomUserVo userInfoList = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.userInfoList || (message.userInfoList = []);
        values.push(_decodeRoomUserVo(bb));
        bb.limit = limit;
        break;
      }

      // optional Dice3WinDto gameResult = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.gameResult = _decodeDice3WinDto(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NotifyBetVO {
  betCoinMap?: { [key: number]: Long };
  notifyType?: number;
  betList?: PointBetCoinsNotifyVo[];
}

export function encodeNotifyBetVO(message: NotifyBetVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyBetVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyBetVO(message: NotifyBetVO, bb: ByteBuffer): void {
  // optional map<int32, int64> betCoinMap = 1;
  let map$betCoinMap = message.betCoinMap;
  if (map$betCoinMap !== undefined) {
    for (let key in map$betCoinMap) {
      let nested = popByteBuffer();
      let value = map$betCoinMap[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 10);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional int32 notifyType = 2;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($notifyType));
  }

  // repeated PointBetCoinsNotifyVo betList = 3;
  let array$betList = message.betList;
  if (array$betList !== undefined) {
    for (let value of array$betList) {
      writeVarint32(bb, 26);
      let nested = popByteBuffer();
      _encodePointBetCoinsNotifyVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeNotifyBetVO(binary: Uint8Array): NotifyBetVO {
  return _decodeNotifyBetVO(wrapByteBuffer(binary));
}

function _decodeNotifyBetVO(bb: ByteBuffer): NotifyBetVO {
  let message: NotifyBetVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional map<int32, int64> betCoinMap = 1;
      case 1: {
        let values = message.betCoinMap || (message.betCoinMap = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: number | undefined;
        let value: Long | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              value = readVarint64(bb, /* unsigned */ false);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: betCoinMap");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // optional int32 notifyType = 2;
      case 2: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // repeated PointBetCoinsNotifyVo betList = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        let values = message.betList || (message.betList = []);
        values.push(_decodePointBetCoinsNotifyVo(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface TPSendDrawMsgVO {
  notifyType?: number;
  playerResult?: number;
  gameInfo?: TPSendDrawMsgGameInfoVO;
  userInfoList?: RoomUserVo[];
  gameResult?: TeenPattiWarWinDto;
}

export function encodeTPSendDrawMsgVO(message: TPSendDrawMsgVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeTPSendDrawMsgVO(message, bb);
  return toUint8Array(bb);
}

function _encodeTPSendDrawMsgVO(message: TPSendDrawMsgVO, bb: ByteBuffer): void {
  // optional int32 notifyType = 1;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($notifyType));
  }

  // optional int32 playerResult = 2;
  let $playerResult = message.playerResult;
  if ($playerResult !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($playerResult));
  }

  // optional TPSendDrawMsgGameInfoVO gameInfo = 3;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeTPSendDrawMsgGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated RoomUserVo userInfoList = 4;
  let array$userInfoList = message.userInfoList;
  if (array$userInfoList !== undefined) {
    for (let value of array$userInfoList) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeRoomUserVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional TeenPattiWarWinDto gameResult = 5;
  let $gameResult = message.gameResult;
  if ($gameResult !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeTeenPattiWarWinDto($gameResult, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeTPSendDrawMsgVO(binary: Uint8Array): TPSendDrawMsgVO {
  return _decodeTPSendDrawMsgVO(wrapByteBuffer(binary));
}

function _decodeTPSendDrawMsgVO(bb: ByteBuffer): TPSendDrawMsgVO {
  let message: TPSendDrawMsgVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 notifyType = 1;
      case 1: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // optional int32 playerResult = 2;
      case 2: {
        message.playerResult = readVarint32(bb);
        break;
      }

      // optional TPSendDrawMsgGameInfoVO gameInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeTPSendDrawMsgGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated RoomUserVo userInfoList = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.userInfoList || (message.userInfoList = []);
        values.push(_decodeRoomUserVo(bb));
        bb.limit = limit;
        break;
      }

      // optional TeenPattiWarWinDto gameResult = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.gameResult = _decodeTeenPattiWarWinDto(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LBSendDrawMsgGameInfoVO {
  leftOptSeconds?: number;
  gameNum?: number;
  onlinePlayers?: number;
}

export function encodeLBSendDrawMsgGameInfoVO(message: LBSendDrawMsgGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeLBSendDrawMsgGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeLBSendDrawMsgGameInfoVO(message: LBSendDrawMsgGameInfoVO, bb: ByteBuffer): void {
  // optional int32 leftOptSeconds = 1;
  let $leftOptSeconds = message.leftOptSeconds;
  if ($leftOptSeconds !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($leftOptSeconds));
  }

  // optional int32 gameNum = 2;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional int32 onlinePlayers = 3;
  let $onlinePlayers = message.onlinePlayers;
  if ($onlinePlayers !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($onlinePlayers));
  }
}

export function decodeLBSendDrawMsgGameInfoVO(binary: Uint8Array): LBSendDrawMsgGameInfoVO {
  return _decodeLBSendDrawMsgGameInfoVO(wrapByteBuffer(binary));
}

function _decodeLBSendDrawMsgGameInfoVO(bb: ByteBuffer): LBSendDrawMsgGameInfoVO {
  let message: LBSendDrawMsgGameInfoVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 leftOptSeconds = 1;
      case 1: {
        message.leftOptSeconds = readVarint32(bb);
        break;
      }

      // optional int32 gameNum = 2;
      case 2: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional int32 onlinePlayers = 3;
      case 3: {
        message.onlinePlayers = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface TPDoEnterRoomVO {
  lastMsgId?: string;
  currMsgId?: string;
  roomInfo?: TeenPattiWarRoomInfoVo;
  gameInfo?: TeenPattiWarGameInfoVo;
  betList?: PointBetCoinsNotifyVo[];
  betCoinMap?: { [key: number]: Long };
  betSelfCoinMap?: { [key: number]: Long };
  betCoinList?: Long[];
  onlinePlayers?: number;
}

export function encodeTPDoEnterRoomVO(message: TPDoEnterRoomVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeTPDoEnterRoomVO(message, bb);
  return toUint8Array(bb);
}

function _encodeTPDoEnterRoomVO(message: TPDoEnterRoomVO, bb: ByteBuffer): void {
  // optional string lastMsgId = 1;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 2;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $currMsgId);
  }

  // optional TeenPattiWarRoomInfoVo roomInfo = 3;
  let $roomInfo = message.roomInfo;
  if ($roomInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeTeenPattiWarRoomInfoVo($roomInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional TeenPattiWarGameInfoVo gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeTeenPattiWarGameInfoVo($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated PointBetCoinsNotifyVo betList = 5;
  let array$betList = message.betList;
  if (array$betList !== undefined) {
    for (let value of array$betList) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodePointBetCoinsNotifyVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<int32, int64> betCoinMap = 6;
  let map$betCoinMap = message.betCoinMap;
  if (map$betCoinMap !== undefined) {
    for (let key in map$betCoinMap) {
      let nested = popByteBuffer();
      let value = map$betCoinMap[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 50);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<int32, int64> betSelfCoinMap = 7;
  let map$betSelfCoinMap = message.betSelfCoinMap;
  if (map$betSelfCoinMap !== undefined) {
    for (let key in map$betSelfCoinMap) {
      let nested = popByteBuffer();
      let value = map$betSelfCoinMap[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 58);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated int64 betCoinList = 8;
  let array$betCoinList = message.betCoinList;
  if (array$betCoinList !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$betCoinList) {
      writeVarint64(packed, value);
    }
    writeVarint32(bb, 66);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // optional int32 onlinePlayers = 9;
  let $onlinePlayers = message.onlinePlayers;
  if ($onlinePlayers !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($onlinePlayers));
  }
}

export function decodeTPDoEnterRoomVO(binary: Uint8Array): TPDoEnterRoomVO {
  return _decodeTPDoEnterRoomVO(wrapByteBuffer(binary));
}

function _decodeTPDoEnterRoomVO(bb: ByteBuffer): TPDoEnterRoomVO {
  let message: TPDoEnterRoomVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string lastMsgId = 1;
      case 1: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 2;
      case 2: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional TeenPattiWarRoomInfoVo roomInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.roomInfo = _decodeTeenPattiWarRoomInfoVo(bb);
        bb.limit = limit;
        break;
      }

      // optional TeenPattiWarGameInfoVo gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeTeenPattiWarGameInfoVo(bb);
        bb.limit = limit;
        break;
      }

      // repeated PointBetCoinsNotifyVo betList = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.betList || (message.betList = []);
        values.push(_decodePointBetCoinsNotifyVo(bb));
        bb.limit = limit;
        break;
      }

      // optional map<int32, int64> betCoinMap = 6;
      case 6: {
        let values = message.betCoinMap || (message.betCoinMap = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: number | undefined;
        let value: Long | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              value = readVarint64(bb, /* unsigned */ false);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: betCoinMap");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // optional map<int32, int64> betSelfCoinMap = 7;
      case 7: {
        let values = message.betSelfCoinMap || (message.betSelfCoinMap = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: number | undefined;
        let value: Long | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              value = readVarint64(bb, /* unsigned */ false);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: betSelfCoinMap");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // repeated int64 betCoinList = 8;
      case 8: {
        let values = message.betCoinList || (message.betCoinList = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint64(bb, /* unsigned */ false));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint64(bb, /* unsigned */ false));
        }
        break;
      }

      // optional int32 onlinePlayers = 9;
      case 9: {
        message.onlinePlayers = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Dice3RoomInfoVo {
  roomState?: number;
  roomId?: string;
  lastMsgId?: string;
  currMsgId?: string;
  userId?: string;
  playing?: boolean;
  gameType?: number;
  roomType?: number;
  roomLevel?: number;
  baseMultiple?: number;
  maxGameNum?: number;
  currGameNum?: number;
}

export function encodeDice3RoomInfoVo(message: Dice3RoomInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeDice3RoomInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodeDice3RoomInfoVo(message: Dice3RoomInfoVo, bb: ByteBuffer): void {
  // optional int32 roomState = 1;
  let $roomState = message.roomState;
  if ($roomState !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($roomState));
  }

  // optional string roomId = 2;
  let $roomId = message.roomId;
  if ($roomId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $roomId);
  }

  // optional string lastMsgId = 3;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 4;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $currMsgId);
  }

  // optional string userId = 5;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $userId);
  }

  // optional bool playing = 6;
  let $playing = message.playing;
  if ($playing !== undefined) {
    writeVarint32(bb, 48);
    writeByte(bb, $playing ? 1 : 0);
  }

  // optional int32 gameType = 7;
  let $gameType = message.gameType;
  if ($gameType !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($gameType));
  }

  // optional int32 roomType = 8;
  let $roomType = message.roomType;
  if ($roomType !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, intToLong($roomType));
  }

  // optional int32 roomLevel = 9;
  let $roomLevel = message.roomLevel;
  if ($roomLevel !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($roomLevel));
  }

  // optional int32 baseMultiple = 10;
  let $baseMultiple = message.baseMultiple;
  if ($baseMultiple !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, intToLong($baseMultiple));
  }

  // optional int32 maxGameNum = 11;
  let $maxGameNum = message.maxGameNum;
  if ($maxGameNum !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($maxGameNum));
  }

  // optional int32 currGameNum = 12;
  let $currGameNum = message.currGameNum;
  if ($currGameNum !== undefined) {
    writeVarint32(bb, 96);
    writeVarint64(bb, intToLong($currGameNum));
  }
}

export function decodeDice3RoomInfoVo(binary: Uint8Array): Dice3RoomInfoVo {
  return _decodeDice3RoomInfoVo(wrapByteBuffer(binary));
}

function _decodeDice3RoomInfoVo(bb: ByteBuffer): Dice3RoomInfoVo {
  let message: Dice3RoomInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 roomState = 1;
      case 1: {
        message.roomState = readVarint32(bb);
        break;
      }

      // optional string roomId = 2;
      case 2: {
        message.roomId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string lastMsgId = 3;
      case 3: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 4;
      case 4: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string userId = 5;
      case 5: {
        message.userId = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool playing = 6;
      case 6: {
        message.playing = !!readByte(bb);
        break;
      }

      // optional int32 gameType = 7;
      case 7: {
        message.gameType = readVarint32(bb);
        break;
      }

      // optional int32 roomType = 8;
      case 8: {
        message.roomType = readVarint32(bb);
        break;
      }

      // optional int32 roomLevel = 9;
      case 9: {
        message.roomLevel = readVarint32(bb);
        break;
      }

      // optional int32 baseMultiple = 10;
      case 10: {
        message.baseMultiple = readVarint32(bb);
        break;
      }

      // optional int32 maxGameNum = 11;
      case 11: {
        message.maxGameNum = readVarint32(bb);
        break;
      }

      // optional int32 currGameNum = 12;
      case 12: {
        message.currGameNum = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RYBDoEnterRoomVO {
  lastMsgId?: string;
  currMsgId?: string;
  roomInfo?: RedYellowBlueRoomInfoVo;
  gameInfo?: RedYellowBlueGameInfoVo;
  betList?: PointBetCoinsNotifyVo[];
  betCoinMap?: { [key: number]: Long };
  betSelfCoinMap?: { [key: number]: Long };
  betCoinList?: Long[];
  onlinePlayers?: number;
}

export function encodeRYBDoEnterRoomVO(message: RYBDoEnterRoomVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeRYBDoEnterRoomVO(message, bb);
  return toUint8Array(bb);
}

function _encodeRYBDoEnterRoomVO(message: RYBDoEnterRoomVO, bb: ByteBuffer): void {
  // optional string lastMsgId = 1;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 2;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $currMsgId);
  }

  // optional RedYellowBlueRoomInfoVo roomInfo = 3;
  let $roomInfo = message.roomInfo;
  if ($roomInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeRedYellowBlueRoomInfoVo($roomInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional RedYellowBlueGameInfoVo gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeRedYellowBlueGameInfoVo($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated PointBetCoinsNotifyVo betList = 5;
  let array$betList = message.betList;
  if (array$betList !== undefined) {
    for (let value of array$betList) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodePointBetCoinsNotifyVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<int32, int64> betCoinMap = 6;
  let map$betCoinMap = message.betCoinMap;
  if (map$betCoinMap !== undefined) {
    for (let key in map$betCoinMap) {
      let nested = popByteBuffer();
      let value = map$betCoinMap[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 50);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<int32, int64> betSelfCoinMap = 7;
  let map$betSelfCoinMap = message.betSelfCoinMap;
  if (map$betSelfCoinMap !== undefined) {
    for (let key in map$betSelfCoinMap) {
      let nested = popByteBuffer();
      let value = map$betSelfCoinMap[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 58);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated int64 betCoinList = 8;
  let array$betCoinList = message.betCoinList;
  if (array$betCoinList !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$betCoinList) {
      writeVarint64(packed, value);
    }
    writeVarint32(bb, 66);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // optional int32 onlinePlayers = 9;
  let $onlinePlayers = message.onlinePlayers;
  if ($onlinePlayers !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($onlinePlayers));
  }
}

export function decodeRYBDoEnterRoomVO(binary: Uint8Array): RYBDoEnterRoomVO {
  return _decodeRYBDoEnterRoomVO(wrapByteBuffer(binary));
}

function _decodeRYBDoEnterRoomVO(bb: ByteBuffer): RYBDoEnterRoomVO {
  let message: RYBDoEnterRoomVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string lastMsgId = 1;
      case 1: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 2;
      case 2: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional RedYellowBlueRoomInfoVo roomInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.roomInfo = _decodeRedYellowBlueRoomInfoVo(bb);
        bb.limit = limit;
        break;
      }

      // optional RedYellowBlueGameInfoVo gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeRedYellowBlueGameInfoVo(bb);
        bb.limit = limit;
        break;
      }

      // repeated PointBetCoinsNotifyVo betList = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.betList || (message.betList = []);
        values.push(_decodePointBetCoinsNotifyVo(bb));
        bb.limit = limit;
        break;
      }

      // optional map<int32, int64> betCoinMap = 6;
      case 6: {
        let values = message.betCoinMap || (message.betCoinMap = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: number | undefined;
        let value: Long | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              value = readVarint64(bb, /* unsigned */ false);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: betCoinMap");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // optional map<int32, int64> betSelfCoinMap = 7;
      case 7: {
        let values = message.betSelfCoinMap || (message.betSelfCoinMap = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: number | undefined;
        let value: Long | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              value = readVarint64(bb, /* unsigned */ false);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: betSelfCoinMap");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // repeated int64 betCoinList = 8;
      case 8: {
        let values = message.betCoinList || (message.betCoinList = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint64(bb, /* unsigned */ false));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint64(bb, /* unsigned */ false));
        }
        break;
      }

      // optional int32 onlinePlayers = 9;
      case 9: {
        message.onlinePlayers = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface TeenPattiWarWinDto {
  gameNum?: number;
  id?: number[];
  king?: TeenPattiWarPokerResultDto;
  queen?: TeenPattiWarPokerResultDto;
  controlSingleState?: number;
}

export function encodeTeenPattiWarWinDto(message: TeenPattiWarWinDto): Uint8Array {
  let bb = popByteBuffer();
  _encodeTeenPattiWarWinDto(message, bb);
  return toUint8Array(bb);
}

function _encodeTeenPattiWarWinDto(message: TeenPattiWarWinDto, bb: ByteBuffer): void {
  // optional int32 gameNum = 1;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($gameNum));
  }

  // repeated int32 id = 2;
  let array$id = message.id;
  if (array$id !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$id) {
      writeVarint64(packed, intToLong(value));
    }
    writeVarint32(bb, 18);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // optional TeenPattiWarPokerResultDto king = 3;
  let $king = message.king;
  if ($king !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeTeenPattiWarPokerResultDto($king, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional TeenPattiWarPokerResultDto queen = 4;
  let $queen = message.queen;
  if ($queen !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeTeenPattiWarPokerResultDto($queen, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional int32 controlSingleState = 5;
  let $controlSingleState = message.controlSingleState;
  if ($controlSingleState !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($controlSingleState));
  }
}

export function decodeTeenPattiWarWinDto(binary: Uint8Array): TeenPattiWarWinDto {
  return _decodeTeenPattiWarWinDto(wrapByteBuffer(binary));
}

function _decodeTeenPattiWarWinDto(bb: ByteBuffer): TeenPattiWarWinDto {
  let message: TeenPattiWarWinDto = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 gameNum = 1;
      case 1: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // repeated int32 id = 2;
      case 2: {
        let values = message.id || (message.id = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint32(bb));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint32(bb));
        }
        break;
      }

      // optional TeenPattiWarPokerResultDto king = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.king = _decodeTeenPattiWarPokerResultDto(bb);
        bb.limit = limit;
        break;
      }

      // optional TeenPattiWarPokerResultDto queen = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.queen = _decodeTeenPattiWarPokerResultDto(bb);
        bb.limit = limit;
        break;
      }

      // optional int32 controlSingleState = 5;
      case 5: {
        message.controlSingleState = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface PointBetCoinsNotifyVo {
  betCoins?: Long;
  betId?: number;
}

export function encodePointBetCoinsNotifyVo(message: PointBetCoinsNotifyVo): Uint8Array {
  let bb = popByteBuffer();
  _encodePointBetCoinsNotifyVo(message, bb);
  return toUint8Array(bb);
}

function _encodePointBetCoinsNotifyVo(message: PointBetCoinsNotifyVo, bb: ByteBuffer): void {
  // optional int64 betCoins = 1;
  let $betCoins = message.betCoins;
  if ($betCoins !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $betCoins);
  }

  // optional int32 betId = 2;
  let $betId = message.betId;
  if ($betId !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($betId));
  }
}

export function decodePointBetCoinsNotifyVo(binary: Uint8Array): PointBetCoinsNotifyVo {
  return _decodePointBetCoinsNotifyVo(wrapByteBuffer(binary));
}

function _decodePointBetCoinsNotifyVo(bb: ByteBuffer): PointBetCoinsNotifyVo {
  let message: PointBetCoinsNotifyVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 betCoins = 1;
      case 1: {
        message.betCoins = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 betId = 2;
      case 2: {
        message.betId = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface JhandiMundaWinDto {
  gameNum?: number;
  idRates?: JhandiMundaWinIdRateDto[];
  dices?: number[];
  controlSingleState?: number;
}

export function encodeJhandiMundaWinDto(message: JhandiMundaWinDto): Uint8Array {
  let bb = popByteBuffer();
  _encodeJhandiMundaWinDto(message, bb);
  return toUint8Array(bb);
}

function _encodeJhandiMundaWinDto(message: JhandiMundaWinDto, bb: ByteBuffer): void {
  // optional int32 gameNum = 1;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($gameNum));
  }

  // repeated JhandiMundaWinIdRateDto idRates = 2;
  let array$idRates = message.idRates;
  if (array$idRates !== undefined) {
    for (let value of array$idRates) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeJhandiMundaWinIdRateDto(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated int32 dices = 3;
  let array$dices = message.dices;
  if (array$dices !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$dices) {
      writeVarint64(packed, intToLong(value));
    }
    writeVarint32(bb, 26);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // optional int32 controlSingleState = 4;
  let $controlSingleState = message.controlSingleState;
  if ($controlSingleState !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($controlSingleState));
  }
}

export function decodeJhandiMundaWinDto(binary: Uint8Array): JhandiMundaWinDto {
  return _decodeJhandiMundaWinDto(wrapByteBuffer(binary));
}

function _decodeJhandiMundaWinDto(bb: ByteBuffer): JhandiMundaWinDto {
  let message: JhandiMundaWinDto = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 gameNum = 1;
      case 1: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // repeated JhandiMundaWinIdRateDto idRates = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.idRates || (message.idRates = []);
        values.push(_decodeJhandiMundaWinIdRateDto(bb));
        bb.limit = limit;
        break;
      }

      // repeated int32 dices = 3;
      case 3: {
        let values = message.dices || (message.dices = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint32(bb));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint32(bb));
        }
        break;
      }

      // optional int32 controlSingleState = 4;
      case 4: {
        message.controlSingleState = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GameInfoVo {
  gameNum?: number;
  bankerId?: string;
  currOptUserId?: string;
  totalOptSeconds?: number;
  leftOptSeconds?: number;
  dealCardMilliseconds?: Long;
  leftPaiNum?: number;
  qiPai?: string;
  turnType?: number;
}

export function encodeGameInfoVo(message: GameInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeGameInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodeGameInfoVo(message: GameInfoVo, bb: ByteBuffer): void {
  // optional int32 gameNum = 1;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional string bankerId = 2;
  let $bankerId = message.bankerId;
  if ($bankerId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $bankerId);
  }

  // optional string currOptUserId = 3;
  let $currOptUserId = message.currOptUserId;
  if ($currOptUserId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $currOptUserId);
  }

  // optional int32 totalOptSeconds = 4;
  let $totalOptSeconds = message.totalOptSeconds;
  if ($totalOptSeconds !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($totalOptSeconds));
  }

  // optional int32 leftOptSeconds = 5;
  let $leftOptSeconds = message.leftOptSeconds;
  if ($leftOptSeconds !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($leftOptSeconds));
  }

  // optional int64 dealCardMilliseconds = 6;
  let $dealCardMilliseconds = message.dealCardMilliseconds;
  if ($dealCardMilliseconds !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $dealCardMilliseconds);
  }

  // optional int32 leftPaiNum = 7;
  let $leftPaiNum = message.leftPaiNum;
  if ($leftPaiNum !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($leftPaiNum));
  }

  // optional string qiPai = 8;
  let $qiPai = message.qiPai;
  if ($qiPai !== undefined) {
    writeVarint32(bb, 66);
    writeString(bb, $qiPai);
  }

  // optional int32 turnType = 9;
  let $turnType = message.turnType;
  if ($turnType !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($turnType));
  }
}

export function decodeGameInfoVo(binary: Uint8Array): GameInfoVo {
  return _decodeGameInfoVo(wrapByteBuffer(binary));
}

function _decodeGameInfoVo(bb: ByteBuffer): GameInfoVo {
  let message: GameInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 gameNum = 1;
      case 1: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional string bankerId = 2;
      case 2: {
        message.bankerId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currOptUserId = 3;
      case 3: {
        message.currOptUserId = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 totalOptSeconds = 4;
      case 4: {
        message.totalOptSeconds = readVarint32(bb);
        break;
      }

      // optional int32 leftOptSeconds = 5;
      case 5: {
        message.leftOptSeconds = readVarint32(bb);
        break;
      }

      // optional int64 dealCardMilliseconds = 6;
      case 6: {
        message.dealCardMilliseconds = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 leftPaiNum = 7;
      case 7: {
        message.leftPaiNum = readVarint32(bb);
        break;
      }

      // optional string qiPai = 8;
      case 8: {
        message.qiPai = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 turnType = 9;
      case 9: {
        message.turnType = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface PKSendDrawMsgVO {
  notifyType?: number;
  playerResult?: number;
  gameInfo?: PKSendDrawMsgGameInfoVO;
  userInfoList?: RoomUserVo[];
  gameResult?: PokerKingWinDto;
}

export function encodePKSendDrawMsgVO(message: PKSendDrawMsgVO): Uint8Array {
  let bb = popByteBuffer();
  _encodePKSendDrawMsgVO(message, bb);
  return toUint8Array(bb);
}

function _encodePKSendDrawMsgVO(message: PKSendDrawMsgVO, bb: ByteBuffer): void {
  // optional int32 notifyType = 1;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($notifyType));
  }

  // optional int32 playerResult = 2;
  let $playerResult = message.playerResult;
  if ($playerResult !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($playerResult));
  }

  // optional PKSendDrawMsgGameInfoVO gameInfo = 3;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodePKSendDrawMsgGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated RoomUserVo userInfoList = 4;
  let array$userInfoList = message.userInfoList;
  if (array$userInfoList !== undefined) {
    for (let value of array$userInfoList) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeRoomUserVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional PokerKingWinDto gameResult = 5;
  let $gameResult = message.gameResult;
  if ($gameResult !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodePokerKingWinDto($gameResult, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodePKSendDrawMsgVO(binary: Uint8Array): PKSendDrawMsgVO {
  return _decodePKSendDrawMsgVO(wrapByteBuffer(binary));
}

function _decodePKSendDrawMsgVO(bb: ByteBuffer): PKSendDrawMsgVO {
  let message: PKSendDrawMsgVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 notifyType = 1;
      case 1: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // optional int32 playerResult = 2;
      case 2: {
        message.playerResult = readVarint32(bb);
        break;
      }

      // optional PKSendDrawMsgGameInfoVO gameInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodePKSendDrawMsgGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated RoomUserVo userInfoList = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.userInfoList || (message.userInfoList = []);
        values.push(_decodeRoomUserVo(bb));
        bb.limit = limit;
        break;
      }

      // optional PokerKingWinDto gameResult = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.gameResult = _decodePokerKingWinDto(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface PKSendDrawMsgGameInfoVO {
  leftOptSeconds?: number;
  gameNum?: number;
  onlinePlayers?: number;
}

export function encodePKSendDrawMsgGameInfoVO(message: PKSendDrawMsgGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodePKSendDrawMsgGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodePKSendDrawMsgGameInfoVO(message: PKSendDrawMsgGameInfoVO, bb: ByteBuffer): void {
  // optional int32 leftOptSeconds = 1;
  let $leftOptSeconds = message.leftOptSeconds;
  if ($leftOptSeconds !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($leftOptSeconds));
  }

  // optional int32 gameNum = 2;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional int32 onlinePlayers = 3;
  let $onlinePlayers = message.onlinePlayers;
  if ($onlinePlayers !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($onlinePlayers));
  }
}

export function decodePKSendDrawMsgGameInfoVO(binary: Uint8Array): PKSendDrawMsgGameInfoVO {
  return _decodePKSendDrawMsgGameInfoVO(wrapByteBuffer(binary));
}

function _decodePKSendDrawMsgGameInfoVO(bb: ByteBuffer): PKSendDrawMsgGameInfoVO {
  let message: PKSendDrawMsgGameInfoVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 leftOptSeconds = 1;
      case 1: {
        message.leftOptSeconds = readVarint32(bb);
        break;
      }

      // optional int32 gameNum = 2;
      case 2: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional int32 onlinePlayers = 3;
      case 3: {
        message.onlinePlayers = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RoomInfoVo {
  roomId?: string;
  lastMsgId?: string;
  currMsgId?: string;
  userId?: string;
  playing?: boolean;
  gameType?: number;
  roomType?: number;
  roomLevel?: number;
  baseMultiple?: number;
  maxGameNum?: number;
  currGameNum?: number;
}

export function encodeRoomInfoVo(message: RoomInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeRoomInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodeRoomInfoVo(message: RoomInfoVo, bb: ByteBuffer): void {
  // optional string roomId = 1;
  let $roomId = message.roomId;
  if ($roomId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $roomId);
  }

  // optional string lastMsgId = 2;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 3;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $currMsgId);
  }

  // optional string userId = 4;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $userId);
  }

  // optional bool playing = 5;
  let $playing = message.playing;
  if ($playing !== undefined) {
    writeVarint32(bb, 40);
    writeByte(bb, $playing ? 1 : 0);
  }

  // optional int32 gameType = 6;
  let $gameType = message.gameType;
  if ($gameType !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($gameType));
  }

  // optional int32 roomType = 7;
  let $roomType = message.roomType;
  if ($roomType !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($roomType));
  }

  // optional int32 roomLevel = 8;
  let $roomLevel = message.roomLevel;
  if ($roomLevel !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, intToLong($roomLevel));
  }

  // optional int32 baseMultiple = 9;
  let $baseMultiple = message.baseMultiple;
  if ($baseMultiple !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($baseMultiple));
  }

  // optional int32 maxGameNum = 10;
  let $maxGameNum = message.maxGameNum;
  if ($maxGameNum !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, intToLong($maxGameNum));
  }

  // optional int32 currGameNum = 11;
  let $currGameNum = message.currGameNum;
  if ($currGameNum !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($currGameNum));
  }
}

export function decodeRoomInfoVo(binary: Uint8Array): RoomInfoVo {
  return _decodeRoomInfoVo(wrapByteBuffer(binary));
}

function _decodeRoomInfoVo(bb: ByteBuffer): RoomInfoVo {
  let message: RoomInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string roomId = 1;
      case 1: {
        message.roomId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string lastMsgId = 2;
      case 2: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 3;
      case 3: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string userId = 4;
      case 4: {
        message.userId = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool playing = 5;
      case 5: {
        message.playing = !!readByte(bb);
        break;
      }

      // optional int32 gameType = 6;
      case 6: {
        message.gameType = readVarint32(bb);
        break;
      }

      // optional int32 roomType = 7;
      case 7: {
        message.roomType = readVarint32(bb);
        break;
      }

      // optional int32 roomLevel = 8;
      case 8: {
        message.roomLevel = readVarint32(bb);
        break;
      }

      // optional int32 baseMultiple = 9;
      case 9: {
        message.baseMultiple = readVarint32(bb);
        break;
      }

      // optional int32 maxGameNum = 10;
      case 10: {
        message.maxGameNum = readVarint32(bb);
        break;
      }

      // optional int32 currGameNum = 11;
      case 11: {
        message.currGameNum = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NotifyEnterRoomVO {
  notifyType?: number;
  userId?: string;
  gameType?: number;
  roomId?: string;
  lastMsgId?: string;
  currMsgId?: string;
  roomInfo?: RoomInfoVo;
  roomUserList?: RoomUserDto[];
  gameInfo?: GameInfoVo;
  gameUserList?: GameUserVo[];
  roomUserVoList?: RoomUserVo[];
}

export function encodeNotifyEnterRoomVO(message: NotifyEnterRoomVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyEnterRoomVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyEnterRoomVO(message: NotifyEnterRoomVO, bb: ByteBuffer): void {
  // optional int32 notifyType = 1;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($notifyType));
  }

  // optional string userId = 2;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $userId);
  }

  // optional int32 gameType = 3;
  let $gameType = message.gameType;
  if ($gameType !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($gameType));
  }

  // optional string roomId = 4;
  let $roomId = message.roomId;
  if ($roomId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $roomId);
  }

  // optional string lastMsgId = 5;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 6;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $currMsgId);
  }

  // optional RoomInfoVo roomInfo = 7;
  let $roomInfo = message.roomInfo;
  if ($roomInfo !== undefined) {
    writeVarint32(bb, 58);
    let nested = popByteBuffer();
    _encodeRoomInfoVo($roomInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated RoomUserDto roomUserList = 8;
  let array$roomUserList = message.roomUserList;
  if (array$roomUserList !== undefined) {
    for (let value of array$roomUserList) {
      writeVarint32(bb, 66);
      let nested = popByteBuffer();
      _encodeRoomUserDto(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional GameInfoVo gameInfo = 9;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 74);
    let nested = popByteBuffer();
    _encodeGameInfoVo($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated GameUserVo gameUserList = 10;
  let array$gameUserList = message.gameUserList;
  if (array$gameUserList !== undefined) {
    for (let value of array$gameUserList) {
      writeVarint32(bb, 82);
      let nested = popByteBuffer();
      _encodeGameUserVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated RoomUserVo roomUserVoList = 11;
  let array$roomUserVoList = message.roomUserVoList;
  if (array$roomUserVoList !== undefined) {
    for (let value of array$roomUserVoList) {
      writeVarint32(bb, 90);
      let nested = popByteBuffer();
      _encodeRoomUserVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeNotifyEnterRoomVO(binary: Uint8Array): NotifyEnterRoomVO {
  return _decodeNotifyEnterRoomVO(wrapByteBuffer(binary));
}

function _decodeNotifyEnterRoomVO(bb: ByteBuffer): NotifyEnterRoomVO {
  let message: NotifyEnterRoomVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 notifyType = 1;
      case 1: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // optional string userId = 2;
      case 2: {
        message.userId = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 gameType = 3;
      case 3: {
        message.gameType = readVarint32(bb);
        break;
      }

      // optional string roomId = 4;
      case 4: {
        message.roomId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string lastMsgId = 5;
      case 5: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 6;
      case 6: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional RoomInfoVo roomInfo = 7;
      case 7: {
        let limit = pushTemporaryLength(bb);
        message.roomInfo = _decodeRoomInfoVo(bb);
        bb.limit = limit;
        break;
      }

      // repeated RoomUserDto roomUserList = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        let values = message.roomUserList || (message.roomUserList = []);
        values.push(_decodeRoomUserDto(bb));
        bb.limit = limit;
        break;
      }

      // optional GameInfoVo gameInfo = 9;
      case 9: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeGameInfoVo(bb);
        bb.limit = limit;
        break;
      }

      // repeated GameUserVo gameUserList = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        let values = message.gameUserList || (message.gameUserList = []);
        values.push(_decodeGameUserVo(bb));
        bb.limit = limit;
        break;
      }

      // repeated RoomUserVo roomUserVoList = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        let values = message.roomUserVoList || (message.roomUserVoList = []);
        values.push(_decodeRoomUserVo(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface PKBeginBetVO {
  notifyType?: number;
  lastMsgId?: string;
  currMsgId?: string;
  gameInfo?: PokerKingGameInfoVo;
}

export function encodePKBeginBetVO(message: PKBeginBetVO): Uint8Array {
  let bb = popByteBuffer();
  _encodePKBeginBetVO(message, bb);
  return toUint8Array(bb);
}

function _encodePKBeginBetVO(message: PKBeginBetVO, bb: ByteBuffer): void {
  // optional int32 notifyType = 1;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($notifyType));
  }

  // optional string lastMsgId = 2;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 3;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $currMsgId);
  }

  // optional PokerKingGameInfoVo gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodePokerKingGameInfoVo($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodePKBeginBetVO(binary: Uint8Array): PKBeginBetVO {
  return _decodePKBeginBetVO(wrapByteBuffer(binary));
}

function _decodePKBeginBetVO(bb: ByteBuffer): PKBeginBetVO {
  let message: PKBeginBetVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 notifyType = 1;
      case 1: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // optional string lastMsgId = 2;
      case 2: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 3;
      case 3: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional PokerKingGameInfoVo gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodePokerKingGameInfoVo(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LDSendDrawMsgGameInfoVO {
  leftOptSeconds?: number;
  gameNum?: number;
  onlinePlayers?: number;
}

export function encodeLDSendDrawMsgGameInfoVO(message: LDSendDrawMsgGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeLDSendDrawMsgGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeLDSendDrawMsgGameInfoVO(message: LDSendDrawMsgGameInfoVO, bb: ByteBuffer): void {
  // optional int32 leftOptSeconds = 1;
  let $leftOptSeconds = message.leftOptSeconds;
  if ($leftOptSeconds !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($leftOptSeconds));
  }

  // optional int32 gameNum = 2;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional int32 onlinePlayers = 3;
  let $onlinePlayers = message.onlinePlayers;
  if ($onlinePlayers !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($onlinePlayers));
  }
}

export function decodeLDSendDrawMsgGameInfoVO(binary: Uint8Array): LDSendDrawMsgGameInfoVO {
  return _decodeLDSendDrawMsgGameInfoVO(wrapByteBuffer(binary));
}

function _decodeLDSendDrawMsgGameInfoVO(bb: ByteBuffer): LDSendDrawMsgGameInfoVO {
  let message: LDSendDrawMsgGameInfoVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 leftOptSeconds = 1;
      case 1: {
        message.leftOptSeconds = readVarint32(bb);
        break;
      }

      // optional int32 gameNum = 2;
      case 2: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional int32 onlinePlayers = 3;
      case 3: {
        message.onlinePlayers = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RedYellowBlueRoomInfoVo {
  roomState?: number;
  roomId?: string;
  lastMsgId?: string;
  currMsgId?: string;
  userId?: string;
  playing?: boolean;
  gameType?: number;
  roomType?: number;
  roomLevel?: number;
  baseMultiple?: number;
  maxGameNum?: number;
  currGameNum?: number;
}

export function encodeRedYellowBlueRoomInfoVo(message: RedYellowBlueRoomInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeRedYellowBlueRoomInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodeRedYellowBlueRoomInfoVo(message: RedYellowBlueRoomInfoVo, bb: ByteBuffer): void {
  // optional int32 roomState = 1;
  let $roomState = message.roomState;
  if ($roomState !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($roomState));
  }

  // optional string roomId = 2;
  let $roomId = message.roomId;
  if ($roomId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $roomId);
  }

  // optional string lastMsgId = 3;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 4;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $currMsgId);
  }

  // optional string userId = 5;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $userId);
  }

  // optional bool playing = 6;
  let $playing = message.playing;
  if ($playing !== undefined) {
    writeVarint32(bb, 48);
    writeByte(bb, $playing ? 1 : 0);
  }

  // optional int32 gameType = 7;
  let $gameType = message.gameType;
  if ($gameType !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($gameType));
  }

  // optional int32 roomType = 8;
  let $roomType = message.roomType;
  if ($roomType !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, intToLong($roomType));
  }

  // optional int32 roomLevel = 9;
  let $roomLevel = message.roomLevel;
  if ($roomLevel !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($roomLevel));
  }

  // optional int32 baseMultiple = 10;
  let $baseMultiple = message.baseMultiple;
  if ($baseMultiple !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, intToLong($baseMultiple));
  }

  // optional int32 maxGameNum = 11;
  let $maxGameNum = message.maxGameNum;
  if ($maxGameNum !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($maxGameNum));
  }

  // optional int32 currGameNum = 12;
  let $currGameNum = message.currGameNum;
  if ($currGameNum !== undefined) {
    writeVarint32(bb, 96);
    writeVarint64(bb, intToLong($currGameNum));
  }
}

export function decodeRedYellowBlueRoomInfoVo(binary: Uint8Array): RedYellowBlueRoomInfoVo {
  return _decodeRedYellowBlueRoomInfoVo(wrapByteBuffer(binary));
}

function _decodeRedYellowBlueRoomInfoVo(bb: ByteBuffer): RedYellowBlueRoomInfoVo {
  let message: RedYellowBlueRoomInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 roomState = 1;
      case 1: {
        message.roomState = readVarint32(bb);
        break;
      }

      // optional string roomId = 2;
      case 2: {
        message.roomId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string lastMsgId = 3;
      case 3: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 4;
      case 4: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string userId = 5;
      case 5: {
        message.userId = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool playing = 6;
      case 6: {
        message.playing = !!readByte(bb);
        break;
      }

      // optional int32 gameType = 7;
      case 7: {
        message.gameType = readVarint32(bb);
        break;
      }

      // optional int32 roomType = 8;
      case 8: {
        message.roomType = readVarint32(bb);
        break;
      }

      // optional int32 roomLevel = 9;
      case 9: {
        message.roomLevel = readVarint32(bb);
        break;
      }

      // optional int32 baseMultiple = 10;
      case 10: {
        message.baseMultiple = readVarint32(bb);
        break;
      }

      // optional int32 maxGameNum = 11;
      case 11: {
        message.maxGameNum = readVarint32(bb);
        break;
      }

      // optional int32 currGameNum = 12;
      case 12: {
        message.currGameNum = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface PokerKingRoomInfoVo {
  roomState?: number;
  roomId?: string;
  lastMsgId?: string;
  currMsgId?: string;
  userId?: string;
  playing?: boolean;
  gameType?: number;
  roomType?: number;
  roomLevel?: number;
  baseMultiple?: number;
  maxGameNum?: number;
  currGameNum?: number;
}

export function encodePokerKingRoomInfoVo(message: PokerKingRoomInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodePokerKingRoomInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodePokerKingRoomInfoVo(message: PokerKingRoomInfoVo, bb: ByteBuffer): void {
  // optional int32 roomState = 1;
  let $roomState = message.roomState;
  if ($roomState !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($roomState));
  }

  // optional string roomId = 2;
  let $roomId = message.roomId;
  if ($roomId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $roomId);
  }

  // optional string lastMsgId = 3;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 4;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $currMsgId);
  }

  // optional string userId = 5;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $userId);
  }

  // optional bool playing = 6;
  let $playing = message.playing;
  if ($playing !== undefined) {
    writeVarint32(bb, 48);
    writeByte(bb, $playing ? 1 : 0);
  }

  // optional int32 gameType = 7;
  let $gameType = message.gameType;
  if ($gameType !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($gameType));
  }

  // optional int32 roomType = 8;
  let $roomType = message.roomType;
  if ($roomType !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, intToLong($roomType));
  }

  // optional int32 roomLevel = 9;
  let $roomLevel = message.roomLevel;
  if ($roomLevel !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($roomLevel));
  }

  // optional int32 baseMultiple = 10;
  let $baseMultiple = message.baseMultiple;
  if ($baseMultiple !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, intToLong($baseMultiple));
  }

  // optional int32 maxGameNum = 11;
  let $maxGameNum = message.maxGameNum;
  if ($maxGameNum !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($maxGameNum));
  }

  // optional int32 currGameNum = 12;
  let $currGameNum = message.currGameNum;
  if ($currGameNum !== undefined) {
    writeVarint32(bb, 96);
    writeVarint64(bb, intToLong($currGameNum));
  }
}

export function decodePokerKingRoomInfoVo(binary: Uint8Array): PokerKingRoomInfoVo {
  return _decodePokerKingRoomInfoVo(wrapByteBuffer(binary));
}

function _decodePokerKingRoomInfoVo(bb: ByteBuffer): PokerKingRoomInfoVo {
  let message: PokerKingRoomInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 roomState = 1;
      case 1: {
        message.roomState = readVarint32(bb);
        break;
      }

      // optional string roomId = 2;
      case 2: {
        message.roomId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string lastMsgId = 3;
      case 3: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 4;
      case 4: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string userId = 5;
      case 5: {
        message.userId = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool playing = 6;
      case 6: {
        message.playing = !!readByte(bb);
        break;
      }

      // optional int32 gameType = 7;
      case 7: {
        message.gameType = readVarint32(bb);
        break;
      }

      // optional int32 roomType = 8;
      case 8: {
        message.roomType = readVarint32(bb);
        break;
      }

      // optional int32 roomLevel = 9;
      case 9: {
        message.roomLevel = readVarint32(bb);
        break;
      }

      // optional int32 baseMultiple = 10;
      case 10: {
        message.baseMultiple = readVarint32(bb);
        break;
      }

      // optional int32 maxGameNum = 11;
      case 11: {
        message.maxGameNum = readVarint32(bb);
        break;
      }

      // optional int32 currGameNum = 12;
      case 12: {
        message.currGameNum = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LDBeginBetVO {
  notifyType?: number;
  lastMsgId?: string;
  currMsgId?: string;
  gameInfo?: LuckyDiceGameInfoVo;
}

export function encodeLDBeginBetVO(message: LDBeginBetVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeLDBeginBetVO(message, bb);
  return toUint8Array(bb);
}

function _encodeLDBeginBetVO(message: LDBeginBetVO, bb: ByteBuffer): void {
  // optional int32 notifyType = 1;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($notifyType));
  }

  // optional string lastMsgId = 2;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 3;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $currMsgId);
  }

  // optional LuckyDiceGameInfoVo gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeLuckyDiceGameInfoVo($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeLDBeginBetVO(binary: Uint8Array): LDBeginBetVO {
  return _decodeLDBeginBetVO(wrapByteBuffer(binary));
}

function _decodeLDBeginBetVO(bb: ByteBuffer): LDBeginBetVO {
  let message: LDBeginBetVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 notifyType = 1;
      case 1: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // optional string lastMsgId = 2;
      case 2: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 3;
      case 3: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional LuckyDiceGameInfoVo gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeLuckyDiceGameInfoVo(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface OptDto {
  optType?: number;
  useShouPai?: string;
  useQiPai?: string;
  priority?: number;
  extra?: string;
}

export function encodeOptDto(message: OptDto): Uint8Array {
  let bb = popByteBuffer();
  _encodeOptDto(message, bb);
  return toUint8Array(bb);
}

function _encodeOptDto(message: OptDto, bb: ByteBuffer): void {
  // optional int32 optType = 1;
  let $optType = message.optType;
  if ($optType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($optType));
  }

  // optional string useShouPai = 2;
  let $useShouPai = message.useShouPai;
  if ($useShouPai !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $useShouPai);
  }

  // optional string useQiPai = 3;
  let $useQiPai = message.useQiPai;
  if ($useQiPai !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $useQiPai);
  }

  // optional int32 priority = 4;
  let $priority = message.priority;
  if ($priority !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($priority));
  }

  // optional string extra = 5;
  let $extra = message.extra;
  if ($extra !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $extra);
  }
}

export function decodeOptDto(binary: Uint8Array): OptDto {
  return _decodeOptDto(wrapByteBuffer(binary));
}

function _decodeOptDto(bb: ByteBuffer): OptDto {
  let message: OptDto = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 optType = 1;
      case 1: {
        message.optType = readVarint32(bb);
        break;
      }

      // optional string useShouPai = 2;
      case 2: {
        message.useShouPai = readString(bb, readVarint32(bb));
        break;
      }

      // optional string useQiPai = 3;
      case 3: {
        message.useQiPai = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 priority = 4;
      case 4: {
        message.priority = readVarint32(bb);
        break;
      }

      // optional string extra = 5;
      case 5: {
        message.extra = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface JhandiMundaGameInfoVo {
  oddsInfoList?: OddsInfoVo[];
  gameResultList?: JhandiMundaWinDto[];
  gameNum?: number;
  bankerId?: string;
  currOptUserId?: string;
  totalOptSeconds?: number;
  leftOptSeconds?: number;
  dealCardMilliseconds?: Long;
  leftPaiNum?: number;
  qiPai?: string;
  turnType?: number;
}

export function encodeJhandiMundaGameInfoVo(message: JhandiMundaGameInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeJhandiMundaGameInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodeJhandiMundaGameInfoVo(message: JhandiMundaGameInfoVo, bb: ByteBuffer): void {
  // repeated OddsInfoVo oddsInfoList = 1;
  let array$oddsInfoList = message.oddsInfoList;
  if (array$oddsInfoList !== undefined) {
    for (let value of array$oddsInfoList) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeOddsInfoVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated JhandiMundaWinDto gameResultList = 2;
  let array$gameResultList = message.gameResultList;
  if (array$gameResultList !== undefined) {
    for (let value of array$gameResultList) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeJhandiMundaWinDto(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional int32 gameNum = 3;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional string bankerId = 4;
  let $bankerId = message.bankerId;
  if ($bankerId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $bankerId);
  }

  // optional string currOptUserId = 5;
  let $currOptUserId = message.currOptUserId;
  if ($currOptUserId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $currOptUserId);
  }

  // optional int32 totalOptSeconds = 6;
  let $totalOptSeconds = message.totalOptSeconds;
  if ($totalOptSeconds !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($totalOptSeconds));
  }

  // optional int32 leftOptSeconds = 7;
  let $leftOptSeconds = message.leftOptSeconds;
  if ($leftOptSeconds !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($leftOptSeconds));
  }

  // optional int64 dealCardMilliseconds = 8;
  let $dealCardMilliseconds = message.dealCardMilliseconds;
  if ($dealCardMilliseconds !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, $dealCardMilliseconds);
  }

  // optional int32 leftPaiNum = 9;
  let $leftPaiNum = message.leftPaiNum;
  if ($leftPaiNum !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($leftPaiNum));
  }

  // optional string qiPai = 10;
  let $qiPai = message.qiPai;
  if ($qiPai !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $qiPai);
  }

  // optional int32 turnType = 11;
  let $turnType = message.turnType;
  if ($turnType !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($turnType));
  }
}

export function decodeJhandiMundaGameInfoVo(binary: Uint8Array): JhandiMundaGameInfoVo {
  return _decodeJhandiMundaGameInfoVo(wrapByteBuffer(binary));
}

function _decodeJhandiMundaGameInfoVo(bb: ByteBuffer): JhandiMundaGameInfoVo {
  let message: JhandiMundaGameInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated OddsInfoVo oddsInfoList = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.oddsInfoList || (message.oddsInfoList = []);
        values.push(_decodeOddsInfoVo(bb));
        bb.limit = limit;
        break;
      }

      // repeated JhandiMundaWinDto gameResultList = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.gameResultList || (message.gameResultList = []);
        values.push(_decodeJhandiMundaWinDto(bb));
        bb.limit = limit;
        break;
      }

      // optional int32 gameNum = 3;
      case 3: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional string bankerId = 4;
      case 4: {
        message.bankerId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currOptUserId = 5;
      case 5: {
        message.currOptUserId = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 totalOptSeconds = 6;
      case 6: {
        message.totalOptSeconds = readVarint32(bb);
        break;
      }

      // optional int32 leftOptSeconds = 7;
      case 7: {
        message.leftOptSeconds = readVarint32(bb);
        break;
      }

      // optional int64 dealCardMilliseconds = 8;
      case 8: {
        message.dealCardMilliseconds = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 leftPaiNum = 9;
      case 9: {
        message.leftPaiNum = readVarint32(bb);
        break;
      }

      // optional string qiPai = 10;
      case 10: {
        message.qiPai = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 turnType = 11;
      case 11: {
        message.turnType = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface TPBeginBetVO {
  notifyType?: number;
  lastMsgId?: string;
  currMsgId?: string;
  gameInfo?: TeenPattiWarGameInfoVo;
}

export function encodeTPBeginBetVO(message: TPBeginBetVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeTPBeginBetVO(message, bb);
  return toUint8Array(bb);
}

function _encodeTPBeginBetVO(message: TPBeginBetVO, bb: ByteBuffer): void {
  // optional int32 notifyType = 1;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($notifyType));
  }

  // optional string lastMsgId = 2;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 3;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $currMsgId);
  }

  // optional TeenPattiWarGameInfoVo gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeTeenPattiWarGameInfoVo($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeTPBeginBetVO(binary: Uint8Array): TPBeginBetVO {
  return _decodeTPBeginBetVO(wrapByteBuffer(binary));
}

function _decodeTPBeginBetVO(bb: ByteBuffer): TPBeginBetVO {
  let message: TPBeginBetVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 notifyType = 1;
      case 1: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // optional string lastMsgId = 2;
      case 2: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 3;
      case 3: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional TeenPattiWarGameInfoVo gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeTeenPattiWarGameInfoVo(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DragonAndTigerWinUserDto {
  gameNum?: number;
  dragon?: DragonAndTigerPokerResultDto;
  tiger?: DragonAndTigerPokerResultDto;
  battleIdEnum?: number;
  controlSingleState?: number;
}

export function encodeDragonAndTigerWinUserDto(message: DragonAndTigerWinUserDto): Uint8Array {
  let bb = popByteBuffer();
  _encodeDragonAndTigerWinUserDto(message, bb);
  return toUint8Array(bb);
}

function _encodeDragonAndTigerWinUserDto(message: DragonAndTigerWinUserDto, bb: ByteBuffer): void {
  // optional int32 gameNum = 1;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional DragonAndTigerPokerResultDto dragon = 2;
  let $dragon = message.dragon;
  if ($dragon !== undefined) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeDragonAndTigerPokerResultDto($dragon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional DragonAndTigerPokerResultDto tiger = 3;
  let $tiger = message.tiger;
  if ($tiger !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeDragonAndTigerPokerResultDto($tiger, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional int32 battleIdEnum = 4;
  let $battleIdEnum = message.battleIdEnum;
  if ($battleIdEnum !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($battleIdEnum));
  }

  // optional int32 controlSingleState = 5;
  let $controlSingleState = message.controlSingleState;
  if ($controlSingleState !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($controlSingleState));
  }
}

export function decodeDragonAndTigerWinUserDto(binary: Uint8Array): DragonAndTigerWinUserDto {
  return _decodeDragonAndTigerWinUserDto(wrapByteBuffer(binary));
}

function _decodeDragonAndTigerWinUserDto(bb: ByteBuffer): DragonAndTigerWinUserDto {
  let message: DragonAndTigerWinUserDto = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 gameNum = 1;
      case 1: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional DragonAndTigerPokerResultDto dragon = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.dragon = _decodeDragonAndTigerPokerResultDto(bb);
        bb.limit = limit;
        break;
      }

      // optional DragonAndTigerPokerResultDto tiger = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.tiger = _decodeDragonAndTigerPokerResultDto(bb);
        bb.limit = limit;
        break;
      }

      // optional int32 battleIdEnum = 4;
      case 4: {
        message.battleIdEnum = readVarint32(bb);
        break;
      }

      // optional int32 controlSingleState = 5;
      case 5: {
        message.controlSingleState = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GameUserVo {
  userId?: string;
  seatNo?: number;
  shouPai?: string;
  hitoutPai?: string;
  score?: Long;
  coins?: Long;
  balanceCoins?: Long;
  optList?: OptDto[];
}

export function encodeGameUserVo(message: GameUserVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeGameUserVo(message, bb);
  return toUint8Array(bb);
}

function _encodeGameUserVo(message: GameUserVo, bb: ByteBuffer): void {
  // optional string userId = 1;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $userId);
  }

  // optional int32 seatNo = 2;
  let $seatNo = message.seatNo;
  if ($seatNo !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($seatNo));
  }

  // optional string shouPai = 3;
  let $shouPai = message.shouPai;
  if ($shouPai !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $shouPai);
  }

  // optional string hitoutPai = 4;
  let $hitoutPai = message.hitoutPai;
  if ($hitoutPai !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $hitoutPai);
  }

  // optional int64 score = 5;
  let $score = message.score;
  if ($score !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $score);
  }

  // optional int64 coins = 6;
  let $coins = message.coins;
  if ($coins !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $coins);
  }

  // optional int64 balanceCoins = 7;
  let $balanceCoins = message.balanceCoins;
  if ($balanceCoins !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $balanceCoins);
  }

  // repeated OptDto optList = 8;
  let array$optList = message.optList;
  if (array$optList !== undefined) {
    for (let value of array$optList) {
      writeVarint32(bb, 66);
      let nested = popByteBuffer();
      _encodeOptDto(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeGameUserVo(binary: Uint8Array): GameUserVo {
  return _decodeGameUserVo(wrapByteBuffer(binary));
}

function _decodeGameUserVo(bb: ByteBuffer): GameUserVo {
  let message: GameUserVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string userId = 1;
      case 1: {
        message.userId = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 seatNo = 2;
      case 2: {
        message.seatNo = readVarint32(bb);
        break;
      }

      // optional string shouPai = 3;
      case 3: {
        message.shouPai = readString(bb, readVarint32(bb));
        break;
      }

      // optional string hitoutPai = 4;
      case 4: {
        message.hitoutPai = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 score = 5;
      case 5: {
        message.score = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 coins = 6;
      case 6: {
        message.coins = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 balanceCoins = 7;
      case 7: {
        message.balanceCoins = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // repeated OptDto optList = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        let values = message.optList || (message.optList = []);
        values.push(_decodeOptDto(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface JMSendDrawMsgGameInfoVO {
  leftOptSeconds?: number;
  gameNum?: number;
  onlinePlayers?: number;
}

export function encodeJMSendDrawMsgGameInfoVO(message: JMSendDrawMsgGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeJMSendDrawMsgGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeJMSendDrawMsgGameInfoVO(message: JMSendDrawMsgGameInfoVO, bb: ByteBuffer): void {
  // optional int32 leftOptSeconds = 1;
  let $leftOptSeconds = message.leftOptSeconds;
  if ($leftOptSeconds !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($leftOptSeconds));
  }

  // optional int32 gameNum = 2;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional int32 onlinePlayers = 3;
  let $onlinePlayers = message.onlinePlayers;
  if ($onlinePlayers !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($onlinePlayers));
  }
}

export function decodeJMSendDrawMsgGameInfoVO(binary: Uint8Array): JMSendDrawMsgGameInfoVO {
  return _decodeJMSendDrawMsgGameInfoVO(wrapByteBuffer(binary));
}

function _decodeJMSendDrawMsgGameInfoVO(bb: ByteBuffer): JMSendDrawMsgGameInfoVO {
  let message: JMSendDrawMsgGameInfoVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 leftOptSeconds = 1;
      case 1: {
        message.leftOptSeconds = readVarint32(bb);
        break;
      }

      // optional int32 gameNum = 2;
      case 2: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional int32 onlinePlayers = 3;
      case 3: {
        message.onlinePlayers = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RoomRecordResponse {
}

export function encodeRoomRecordResponse(message: RoomRecordResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeRoomRecordResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeRoomRecordResponse(message: RoomRecordResponse, bb: ByteBuffer): void {
}

export function decodeRoomRecordResponse(binary: Uint8Array): RoomRecordResponse {
  return _decodeRoomRecordResponse(wrapByteBuffer(binary));
}

function _decodeRoomRecordResponse(bb: ByteBuffer): RoomRecordResponse {
  let message: RoomRecordResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RedYellowBlueGameInfoVo {
  OddsInfoList?: OddsInfoVo[];
  gameResultList?: RedYellowBlueWinDto[];
  gameNum?: number;
  bankerId?: string;
  currOptUserId?: string;
  totalOptSeconds?: number;
  leftOptSeconds?: number;
  dealCardMilliseconds?: Long;
  leftPaiNum?: number;
  qiPai?: string;
  turnType?: number;
}

export function encodeRedYellowBlueGameInfoVo(message: RedYellowBlueGameInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeRedYellowBlueGameInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodeRedYellowBlueGameInfoVo(message: RedYellowBlueGameInfoVo, bb: ByteBuffer): void {
  // repeated OddsInfoVo OddsInfoList = 1;
  let array$OddsInfoList = message.OddsInfoList;
  if (array$OddsInfoList !== undefined) {
    for (let value of array$OddsInfoList) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeOddsInfoVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated RedYellowBlueWinDto gameResultList = 2;
  let array$gameResultList = message.gameResultList;
  if (array$gameResultList !== undefined) {
    for (let value of array$gameResultList) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeRedYellowBlueWinDto(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional int32 gameNum = 3;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional string bankerId = 4;
  let $bankerId = message.bankerId;
  if ($bankerId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $bankerId);
  }

  // optional string currOptUserId = 5;
  let $currOptUserId = message.currOptUserId;
  if ($currOptUserId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $currOptUserId);
  }

  // optional int32 totalOptSeconds = 6;
  let $totalOptSeconds = message.totalOptSeconds;
  if ($totalOptSeconds !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($totalOptSeconds));
  }

  // optional int32 leftOptSeconds = 7;
  let $leftOptSeconds = message.leftOptSeconds;
  if ($leftOptSeconds !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($leftOptSeconds));
  }

  // optional int64 dealCardMilliseconds = 8;
  let $dealCardMilliseconds = message.dealCardMilliseconds;
  if ($dealCardMilliseconds !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, $dealCardMilliseconds);
  }

  // optional int32 leftPaiNum = 9;
  let $leftPaiNum = message.leftPaiNum;
  if ($leftPaiNum !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($leftPaiNum));
  }

  // optional string qiPai = 10;
  let $qiPai = message.qiPai;
  if ($qiPai !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $qiPai);
  }

  // optional int32 turnType = 11;
  let $turnType = message.turnType;
  if ($turnType !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($turnType));
  }
}

export function decodeRedYellowBlueGameInfoVo(binary: Uint8Array): RedYellowBlueGameInfoVo {
  return _decodeRedYellowBlueGameInfoVo(wrapByteBuffer(binary));
}

function _decodeRedYellowBlueGameInfoVo(bb: ByteBuffer): RedYellowBlueGameInfoVo {
  let message: RedYellowBlueGameInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated OddsInfoVo OddsInfoList = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.OddsInfoList || (message.OddsInfoList = []);
        values.push(_decodeOddsInfoVo(bb));
        bb.limit = limit;
        break;
      }

      // repeated RedYellowBlueWinDto gameResultList = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.gameResultList || (message.gameResultList = []);
        values.push(_decodeRedYellowBlueWinDto(bb));
        bb.limit = limit;
        break;
      }

      // optional int32 gameNum = 3;
      case 3: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional string bankerId = 4;
      case 4: {
        message.bankerId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currOptUserId = 5;
      case 5: {
        message.currOptUserId = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 totalOptSeconds = 6;
      case 6: {
        message.totalOptSeconds = readVarint32(bb);
        break;
      }

      // optional int32 leftOptSeconds = 7;
      case 7: {
        message.leftOptSeconds = readVarint32(bb);
        break;
      }

      // optional int64 dealCardMilliseconds = 8;
      case 8: {
        message.dealCardMilliseconds = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 leftPaiNum = 9;
      case 9: {
        message.leftPaiNum = readVarint32(bb);
        break;
      }

      // optional string qiPai = 10;
      case 10: {
        message.qiPai = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 turnType = 11;
      case 11: {
        message.turnType = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface PKDoEnterRoomVO {
  lastMsgId?: string;
  currMsgId?: string;
  roomInfo?: PokerKingRoomInfoVo;
  gameInfo?: PokerKingGameInfoVo;
  betList?: PointBetCoinsNotifyVo[];
  betCoinMap?: { [key: number]: Long };
  betSelfCoinMap?: { [key: number]: Long };
  betCoinList?: Long[];
  onlinePlayers?: number;
}

export function encodePKDoEnterRoomVO(message: PKDoEnterRoomVO): Uint8Array {
  let bb = popByteBuffer();
  _encodePKDoEnterRoomVO(message, bb);
  return toUint8Array(bb);
}

function _encodePKDoEnterRoomVO(message: PKDoEnterRoomVO, bb: ByteBuffer): void {
  // optional string lastMsgId = 1;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 2;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $currMsgId);
  }

  // optional PokerKingRoomInfoVo roomInfo = 3;
  let $roomInfo = message.roomInfo;
  if ($roomInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodePokerKingRoomInfoVo($roomInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PokerKingGameInfoVo gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodePokerKingGameInfoVo($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated PointBetCoinsNotifyVo betList = 5;
  let array$betList = message.betList;
  if (array$betList !== undefined) {
    for (let value of array$betList) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodePointBetCoinsNotifyVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<int32, int64> betCoinMap = 6;
  let map$betCoinMap = message.betCoinMap;
  if (map$betCoinMap !== undefined) {
    for (let key in map$betCoinMap) {
      let nested = popByteBuffer();
      let value = map$betCoinMap[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 50);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<int32, int64> betSelfCoinMap = 7;
  let map$betSelfCoinMap = message.betSelfCoinMap;
  if (map$betSelfCoinMap !== undefined) {
    for (let key in map$betSelfCoinMap) {
      let nested = popByteBuffer();
      let value = map$betSelfCoinMap[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 58);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated int64 betCoinList = 8;
  let array$betCoinList = message.betCoinList;
  if (array$betCoinList !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$betCoinList) {
      writeVarint64(packed, value);
    }
    writeVarint32(bb, 66);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // optional int32 onlinePlayers = 9;
  let $onlinePlayers = message.onlinePlayers;
  if ($onlinePlayers !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($onlinePlayers));
  }
}

export function decodePKDoEnterRoomVO(binary: Uint8Array): PKDoEnterRoomVO {
  return _decodePKDoEnterRoomVO(wrapByteBuffer(binary));
}

function _decodePKDoEnterRoomVO(bb: ByteBuffer): PKDoEnterRoomVO {
  let message: PKDoEnterRoomVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string lastMsgId = 1;
      case 1: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 2;
      case 2: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional PokerKingRoomInfoVo roomInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.roomInfo = _decodePokerKingRoomInfoVo(bb);
        bb.limit = limit;
        break;
      }

      // optional PokerKingGameInfoVo gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodePokerKingGameInfoVo(bb);
        bb.limit = limit;
        break;
      }

      // repeated PointBetCoinsNotifyVo betList = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.betList || (message.betList = []);
        values.push(_decodePointBetCoinsNotifyVo(bb));
        bb.limit = limit;
        break;
      }

      // optional map<int32, int64> betCoinMap = 6;
      case 6: {
        let values = message.betCoinMap || (message.betCoinMap = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: number | undefined;
        let value: Long | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              value = readVarint64(bb, /* unsigned */ false);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: betCoinMap");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // optional map<int32, int64> betSelfCoinMap = 7;
      case 7: {
        let values = message.betSelfCoinMap || (message.betSelfCoinMap = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: number | undefined;
        let value: Long | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              value = readVarint64(bb, /* unsigned */ false);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: betSelfCoinMap");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // repeated int64 betCoinList = 8;
      case 8: {
        let values = message.betCoinList || (message.betCoinList = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint64(bb, /* unsigned */ false));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint64(bb, /* unsigned */ false));
        }
        break;
      }

      // optional int32 onlinePlayers = 9;
      case 9: {
        message.onlinePlayers = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DragonAndTigerGameInfoVo {
  pokerResultList?: DragonAndTigerPokerResultDto[];
  OddsInfoList?: OddsInfoVo[];
  gameResultList?: number[];
  gameResultWinUserDtoList?: DragonAndTigerWinUserDto[];
  diPaiCount?: number;
  qiPaiCount?: number;
  gameNum?: number;
  bankerId?: string;
  currOptUserId?: string;
  totalOptSeconds?: number;
  leftOptSeconds?: number;
  dealCardMilliseconds?: Long;
  leftPaiNum?: number;
  qiPai?: string;
  turnType?: number;
}

export function encodeDragonAndTigerGameInfoVo(message: DragonAndTigerGameInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeDragonAndTigerGameInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodeDragonAndTigerGameInfoVo(message: DragonAndTigerGameInfoVo, bb: ByteBuffer): void {
  // repeated DragonAndTigerPokerResultDto pokerResultList = 1;
  let array$pokerResultList = message.pokerResultList;
  if (array$pokerResultList !== undefined) {
    for (let value of array$pokerResultList) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeDragonAndTigerPokerResultDto(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated OddsInfoVo OddsInfoList = 2;
  let array$OddsInfoList = message.OddsInfoList;
  if (array$OddsInfoList !== undefined) {
    for (let value of array$OddsInfoList) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeOddsInfoVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated int32 gameResultList = 3;
  let array$gameResultList = message.gameResultList;
  if (array$gameResultList !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$gameResultList) {
      writeVarint64(packed, intToLong(value));
    }
    writeVarint32(bb, 26);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // repeated DragonAndTigerWinUserDto gameResultWinUserDtoList = 4;
  let array$gameResultWinUserDtoList = message.gameResultWinUserDtoList;
  if (array$gameResultWinUserDtoList !== undefined) {
    for (let value of array$gameResultWinUserDtoList) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeDragonAndTigerWinUserDto(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional int32 diPaiCount = 5;
  let $diPaiCount = message.diPaiCount;
  if ($diPaiCount !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($diPaiCount));
  }

  // optional int32 qiPaiCount = 6;
  let $qiPaiCount = message.qiPaiCount;
  if ($qiPaiCount !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($qiPaiCount));
  }

  // optional int32 gameNum = 7;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional string bankerId = 8;
  let $bankerId = message.bankerId;
  if ($bankerId !== undefined) {
    writeVarint32(bb, 66);
    writeString(bb, $bankerId);
  }

  // optional string currOptUserId = 9;
  let $currOptUserId = message.currOptUserId;
  if ($currOptUserId !== undefined) {
    writeVarint32(bb, 74);
    writeString(bb, $currOptUserId);
  }

  // optional int32 totalOptSeconds = 10;
  let $totalOptSeconds = message.totalOptSeconds;
  if ($totalOptSeconds !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, intToLong($totalOptSeconds));
  }

  // optional int32 leftOptSeconds = 11;
  let $leftOptSeconds = message.leftOptSeconds;
  if ($leftOptSeconds !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($leftOptSeconds));
  }

  // optional int64 dealCardMilliseconds = 12;
  let $dealCardMilliseconds = message.dealCardMilliseconds;
  if ($dealCardMilliseconds !== undefined) {
    writeVarint32(bb, 96);
    writeVarint64(bb, $dealCardMilliseconds);
  }

  // optional int32 leftPaiNum = 13;
  let $leftPaiNum = message.leftPaiNum;
  if ($leftPaiNum !== undefined) {
    writeVarint32(bb, 104);
    writeVarint64(bb, intToLong($leftPaiNum));
  }

  // optional string qiPai = 14;
  let $qiPai = message.qiPai;
  if ($qiPai !== undefined) {
    writeVarint32(bb, 114);
    writeString(bb, $qiPai);
  }

  // optional int32 turnType = 15;
  let $turnType = message.turnType;
  if ($turnType !== undefined) {
    writeVarint32(bb, 120);
    writeVarint64(bb, intToLong($turnType));
  }
}

export function decodeDragonAndTigerGameInfoVo(binary: Uint8Array): DragonAndTigerGameInfoVo {
  return _decodeDragonAndTigerGameInfoVo(wrapByteBuffer(binary));
}

function _decodeDragonAndTigerGameInfoVo(bb: ByteBuffer): DragonAndTigerGameInfoVo {
  let message: DragonAndTigerGameInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated DragonAndTigerPokerResultDto pokerResultList = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.pokerResultList || (message.pokerResultList = []);
        values.push(_decodeDragonAndTigerPokerResultDto(bb));
        bb.limit = limit;
        break;
      }

      // repeated OddsInfoVo OddsInfoList = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.OddsInfoList || (message.OddsInfoList = []);
        values.push(_decodeOddsInfoVo(bb));
        bb.limit = limit;
        break;
      }

      // repeated int32 gameResultList = 3;
      case 3: {
        let values = message.gameResultList || (message.gameResultList = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint32(bb));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint32(bb));
        }
        break;
      }

      // repeated DragonAndTigerWinUserDto gameResultWinUserDtoList = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.gameResultWinUserDtoList || (message.gameResultWinUserDtoList = []);
        values.push(_decodeDragonAndTigerWinUserDto(bb));
        bb.limit = limit;
        break;
      }

      // optional int32 diPaiCount = 5;
      case 5: {
        message.diPaiCount = readVarint32(bb);
        break;
      }

      // optional int32 qiPaiCount = 6;
      case 6: {
        message.qiPaiCount = readVarint32(bb);
        break;
      }

      // optional int32 gameNum = 7;
      case 7: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional string bankerId = 8;
      case 8: {
        message.bankerId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currOptUserId = 9;
      case 9: {
        message.currOptUserId = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 totalOptSeconds = 10;
      case 10: {
        message.totalOptSeconds = readVarint32(bb);
        break;
      }

      // optional int32 leftOptSeconds = 11;
      case 11: {
        message.leftOptSeconds = readVarint32(bb);
        break;
      }

      // optional int64 dealCardMilliseconds = 12;
      case 12: {
        message.dealCardMilliseconds = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 leftPaiNum = 13;
      case 13: {
        message.leftPaiNum = readVarint32(bb);
        break;
      }

      // optional string qiPai = 14;
      case 14: {
        message.qiPai = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 turnType = 15;
      case 15: {
        message.turnType = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DTSendDrawMsgVO {
  notifyType?: number;
  playerResult?: number;
  headWinnerList?: DragonAndTigerWinnerVo[];
  gameInfo?: DTSendDrawMsgGameInfoVO;
  userInfoList?: RoomUserVo[];
  gameResult?: number;
}

export function encodeDTSendDrawMsgVO(message: DTSendDrawMsgVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeDTSendDrawMsgVO(message, bb);
  return toUint8Array(bb);
}

function _encodeDTSendDrawMsgVO(message: DTSendDrawMsgVO, bb: ByteBuffer): void {
  // optional int32 notifyType = 1;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($notifyType));
  }

  // optional int32 playerResult = 2;
  let $playerResult = message.playerResult;
  if ($playerResult !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($playerResult));
  }

  // repeated DragonAndTigerWinnerVo headWinnerList = 3;
  let array$headWinnerList = message.headWinnerList;
  if (array$headWinnerList !== undefined) {
    for (let value of array$headWinnerList) {
      writeVarint32(bb, 26);
      let nested = popByteBuffer();
      _encodeDragonAndTigerWinnerVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional DTSendDrawMsgGameInfoVO gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeDTSendDrawMsgGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated RoomUserVo userInfoList = 5;
  let array$userInfoList = message.userInfoList;
  if (array$userInfoList !== undefined) {
    for (let value of array$userInfoList) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodeRoomUserVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional int32 gameResult = 6;
  let $gameResult = message.gameResult;
  if ($gameResult !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($gameResult));
  }
}

export function decodeDTSendDrawMsgVO(binary: Uint8Array): DTSendDrawMsgVO {
  return _decodeDTSendDrawMsgVO(wrapByteBuffer(binary));
}

function _decodeDTSendDrawMsgVO(bb: ByteBuffer): DTSendDrawMsgVO {
  let message: DTSendDrawMsgVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 notifyType = 1;
      case 1: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // optional int32 playerResult = 2;
      case 2: {
        message.playerResult = readVarint32(bb);
        break;
      }

      // repeated DragonAndTigerWinnerVo headWinnerList = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        let values = message.headWinnerList || (message.headWinnerList = []);
        values.push(_decodeDragonAndTigerWinnerVo(bb));
        bb.limit = limit;
        break;
      }

      // optional DTSendDrawMsgGameInfoVO gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeDTSendDrawMsgGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated RoomUserVo userInfoList = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.userInfoList || (message.userInfoList = []);
        values.push(_decodeRoomUserVo(bb));
        bb.limit = limit;
        break;
      }

      // optional int32 gameResult = 6;
      case 6: {
        message.gameResult = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface JMSendDrawMsgVO {
  notifyType?: number;
  playerResult?: number;
  gameInfo?: JMSendDrawMsgGameInfoVO;
  userInfoList?: RoomUserVo[];
  gameResult?: JhandiMundaWinDto;
}

export function encodeJMSendDrawMsgVO(message: JMSendDrawMsgVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeJMSendDrawMsgVO(message, bb);
  return toUint8Array(bb);
}

function _encodeJMSendDrawMsgVO(message: JMSendDrawMsgVO, bb: ByteBuffer): void {
  // optional int32 notifyType = 1;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($notifyType));
  }

  // optional int32 playerResult = 2;
  let $playerResult = message.playerResult;
  if ($playerResult !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($playerResult));
  }

  // optional JMSendDrawMsgGameInfoVO gameInfo = 3;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeJMSendDrawMsgGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated RoomUserVo userInfoList = 4;
  let array$userInfoList = message.userInfoList;
  if (array$userInfoList !== undefined) {
    for (let value of array$userInfoList) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeRoomUserVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional JhandiMundaWinDto gameResult = 5;
  let $gameResult = message.gameResult;
  if ($gameResult !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeJhandiMundaWinDto($gameResult, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeJMSendDrawMsgVO(binary: Uint8Array): JMSendDrawMsgVO {
  return _decodeJMSendDrawMsgVO(wrapByteBuffer(binary));
}

function _decodeJMSendDrawMsgVO(bb: ByteBuffer): JMSendDrawMsgVO {
  let message: JMSendDrawMsgVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 notifyType = 1;
      case 1: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // optional int32 playerResult = 2;
      case 2: {
        message.playerResult = readVarint32(bb);
        break;
      }

      // optional JMSendDrawMsgGameInfoVO gameInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeJMSendDrawMsgGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated RoomUserVo userInfoList = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.userInfoList || (message.userInfoList = []);
        values.push(_decodeRoomUserVo(bb));
        bb.limit = limit;
        break;
      }

      // optional JhandiMundaWinDto gameResult = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.gameResult = _decodeJhandiMundaWinDto(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface PokerKingWinDto {
  gameNum?: number;
  id?: number[];
  poker?: string;
  controlSingleState?: number;
}

export function encodePokerKingWinDto(message: PokerKingWinDto): Uint8Array {
  let bb = popByteBuffer();
  _encodePokerKingWinDto(message, bb);
  return toUint8Array(bb);
}

function _encodePokerKingWinDto(message: PokerKingWinDto, bb: ByteBuffer): void {
  // optional int32 gameNum = 1;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($gameNum));
  }

  // repeated int32 id = 2;
  let array$id = message.id;
  if (array$id !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$id) {
      writeVarint64(packed, intToLong(value));
    }
    writeVarint32(bb, 18);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // optional string poker = 3;
  let $poker = message.poker;
  if ($poker !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $poker);
  }

  // optional int32 controlSingleState = 4;
  let $controlSingleState = message.controlSingleState;
  if ($controlSingleState !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($controlSingleState));
  }
}

export function decodePokerKingWinDto(binary: Uint8Array): PokerKingWinDto {
  return _decodePokerKingWinDto(wrapByteBuffer(binary));
}

function _decodePokerKingWinDto(bb: ByteBuffer): PokerKingWinDto {
  let message: PokerKingWinDto = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 gameNum = 1;
      case 1: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // repeated int32 id = 2;
      case 2: {
        let values = message.id || (message.id = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint32(bb));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint32(bb));
        }
        break;
      }

      // optional string poker = 3;
      case 3: {
        message.poker = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 controlSingleState = 4;
      case 4: {
        message.controlSingleState = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface JMBeginBetVO {
  notifyType?: number;
  lastMsgId?: string;
  currMsgId?: string;
  gameInfo?: JhandiMundaGameInfoVo;
}

export function encodeJMBeginBetVO(message: JMBeginBetVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeJMBeginBetVO(message, bb);
  return toUint8Array(bb);
}

function _encodeJMBeginBetVO(message: JMBeginBetVO, bb: ByteBuffer): void {
  // optional int32 notifyType = 1;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($notifyType));
  }

  // optional string lastMsgId = 2;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 3;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $currMsgId);
  }

  // optional JhandiMundaGameInfoVo gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeJhandiMundaGameInfoVo($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeJMBeginBetVO(binary: Uint8Array): JMBeginBetVO {
  return _decodeJMBeginBetVO(wrapByteBuffer(binary));
}

function _decodeJMBeginBetVO(bb: ByteBuffer): JMBeginBetVO {
  let message: JMBeginBetVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 notifyType = 1;
      case 1: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // optional string lastMsgId = 2;
      case 2: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 3;
      case 3: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional JhandiMundaGameInfoVo gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeJhandiMundaGameInfoVo(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DragonAndTigerWinnerVo {
  userId?: string;
  nickName?: string;
  portrait?: string;
  vipLevel?: number;
  winCoins?: Long;
}

export function encodeDragonAndTigerWinnerVo(message: DragonAndTigerWinnerVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeDragonAndTigerWinnerVo(message, bb);
  return toUint8Array(bb);
}

function _encodeDragonAndTigerWinnerVo(message: DragonAndTigerWinnerVo, bb: ByteBuffer): void {
  // optional string userId = 1;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $userId);
  }

  // optional string nickName = 2;
  let $nickName = message.nickName;
  if ($nickName !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $nickName);
  }

  // optional string portrait = 3;
  let $portrait = message.portrait;
  if ($portrait !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $portrait);
  }

  // optional int32 vipLevel = 4;
  let $vipLevel = message.vipLevel;
  if ($vipLevel !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($vipLevel));
  }

  // optional int64 winCoins = 5;
  let $winCoins = message.winCoins;
  if ($winCoins !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $winCoins);
  }
}

export function decodeDragonAndTigerWinnerVo(binary: Uint8Array): DragonAndTigerWinnerVo {
  return _decodeDragonAndTigerWinnerVo(wrapByteBuffer(binary));
}

function _decodeDragonAndTigerWinnerVo(bb: ByteBuffer): DragonAndTigerWinnerVo {
  let message: DragonAndTigerWinnerVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string userId = 1;
      case 1: {
        message.userId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string nickName = 2;
      case 2: {
        message.nickName = readString(bb, readVarint32(bb));
        break;
      }

      // optional string portrait = 3;
      case 3: {
        message.portrait = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 vipLevel = 4;
      case 4: {
        message.vipLevel = readVarint32(bb);
        break;
      }

      // optional int64 winCoins = 5;
      case 5: {
        message.winCoins = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RoomOptParam {
  optType?: number;
  gameType?: number;
  roundType?: number;
  roomId?: string;
  roomType?: number;
  roomLevel?: number;
  useShouPai?: string;
  useQiPai?: string;
  betCoins?: Long;
  clientAutoPlay?: number;
  boxLocation?: number;
  fairyTalesFreeGame?: number;
  riseOrLose?: number;
  connectIndex?: number;
  jackpotRateList?: number[];
  betId?: number;
  userCount?: number;
  gameNum?: number;
  layer?: number;
  bankerAmount?: Long;
  userId?: string;
  sessionId?: string;
  s_deviceid?: string;
  s_platform?: string;
  ip?: string;
  s_cid?: string;
  media_id?: string;
  utm_campaign?: string;
  s_model?: string;
  s_version?: string;
  s_access?: string;
  s_sWidth?: string;
  s_carrier?: string;
  s_osVersion?: string;
  s_brand?: string;
  s_sHeight?: string;
  vipLevel?: number;
  vipVp?: number;
  totalPayment?: number;
  userType?: number;
  firstLoginTime?: string;
}

export function encodeRoomOptParam(message: RoomOptParam): Uint8Array {
  let bb = popByteBuffer();
  _encodeRoomOptParam(message, bb);
  return toUint8Array(bb);
}

function _encodeRoomOptParam(message: RoomOptParam, bb: ByteBuffer): void {
  // optional int32 optType = 1;
  let $optType = message.optType;
  if ($optType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($optType));
  }

  // optional int32 gameType = 2;
  let $gameType = message.gameType;
  if ($gameType !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($gameType));
  }

  // optional int32 roundType = 3;
  let $roundType = message.roundType;
  if ($roundType !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($roundType));
  }

  // optional string roomId = 4;
  let $roomId = message.roomId;
  if ($roomId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $roomId);
  }

  // optional int32 roomType = 5;
  let $roomType = message.roomType;
  if ($roomType !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($roomType));
  }

  // optional int32 roomLevel = 6;
  let $roomLevel = message.roomLevel;
  if ($roomLevel !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($roomLevel));
  }

  // optional string useShouPai = 7;
  let $useShouPai = message.useShouPai;
  if ($useShouPai !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $useShouPai);
  }

  // optional string useQiPai = 8;
  let $useQiPai = message.useQiPai;
  if ($useQiPai !== undefined) {
    writeVarint32(bb, 66);
    writeString(bb, $useQiPai);
  }

  // optional int64 betCoins = 9;
  let $betCoins = message.betCoins;
  if ($betCoins !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, $betCoins);
  }

  // optional int32 clientAutoPlay = 10;
  let $clientAutoPlay = message.clientAutoPlay;
  if ($clientAutoPlay !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, intToLong($clientAutoPlay));
  }

  // optional int32 boxLocation = 11;
  let $boxLocation = message.boxLocation;
  if ($boxLocation !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($boxLocation));
  }

  // optional int32 fairyTalesFreeGame = 12;
  let $fairyTalesFreeGame = message.fairyTalesFreeGame;
  if ($fairyTalesFreeGame !== undefined) {
    writeVarint32(bb, 96);
    writeVarint64(bb, intToLong($fairyTalesFreeGame));
  }

  // optional int32 riseOrLose = 13;
  let $riseOrLose = message.riseOrLose;
  if ($riseOrLose !== undefined) {
    writeVarint32(bb, 104);
    writeVarint64(bb, intToLong($riseOrLose));
  }

  // optional int32 connectIndex = 14;
  let $connectIndex = message.connectIndex;
  if ($connectIndex !== undefined) {
    writeVarint32(bb, 112);
    writeVarint64(bb, intToLong($connectIndex));
  }

  // repeated int32 jackpotRateList = 15;
  let array$jackpotRateList = message.jackpotRateList;
  if (array$jackpotRateList !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$jackpotRateList) {
      writeVarint64(packed, intToLong(value));
    }
    writeVarint32(bb, 122);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // optional int32 betId = 16;
  let $betId = message.betId;
  if ($betId !== undefined) {
    writeVarint32(bb, 128);
    writeVarint64(bb, intToLong($betId));
  }

  // optional int32 userCount = 17;
  let $userCount = message.userCount;
  if ($userCount !== undefined) {
    writeVarint32(bb, 136);
    writeVarint64(bb, intToLong($userCount));
  }

  // optional int32 gameNum = 18;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 144);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional int32 layer = 19;
  let $layer = message.layer;
  if ($layer !== undefined) {
    writeVarint32(bb, 152);
    writeVarint64(bb, intToLong($layer));
  }

  // optional int64 bankerAmount = 20;
  let $bankerAmount = message.bankerAmount;
  if ($bankerAmount !== undefined) {
    writeVarint32(bb, 160);
    writeVarint64(bb, $bankerAmount);
  }

  // optional string userId = 21;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 170);
    writeString(bb, $userId);
  }

  // optional string sessionId = 22;
  let $sessionId = message.sessionId;
  if ($sessionId !== undefined) {
    writeVarint32(bb, 178);
    writeString(bb, $sessionId);
  }

  // optional string s_deviceid = 23;
  let $s_deviceid = message.s_deviceid;
  if ($s_deviceid !== undefined) {
    writeVarint32(bb, 186);
    writeString(bb, $s_deviceid);
  }

  // optional string s_platform = 24;
  let $s_platform = message.s_platform;
  if ($s_platform !== undefined) {
    writeVarint32(bb, 194);
    writeString(bb, $s_platform);
  }

  // optional string ip = 25;
  let $ip = message.ip;
  if ($ip !== undefined) {
    writeVarint32(bb, 202);
    writeString(bb, $ip);
  }

  // optional string s_cid = 26;
  let $s_cid = message.s_cid;
  if ($s_cid !== undefined) {
    writeVarint32(bb, 210);
    writeString(bb, $s_cid);
  }

  // optional string media_id = 27;
  let $media_id = message.media_id;
  if ($media_id !== undefined) {
    writeVarint32(bb, 218);
    writeString(bb, $media_id);
  }

  // optional string utm_campaign = 28;
  let $utm_campaign = message.utm_campaign;
  if ($utm_campaign !== undefined) {
    writeVarint32(bb, 226);
    writeString(bb, $utm_campaign);
  }

  // optional string s_model = 29;
  let $s_model = message.s_model;
  if ($s_model !== undefined) {
    writeVarint32(bb, 234);
    writeString(bb, $s_model);
  }

  // optional string s_version = 30;
  let $s_version = message.s_version;
  if ($s_version !== undefined) {
    writeVarint32(bb, 242);
    writeString(bb, $s_version);
  }

  // optional string s_access = 31;
  let $s_access = message.s_access;
  if ($s_access !== undefined) {
    writeVarint32(bb, 250);
    writeString(bb, $s_access);
  }

  // optional string s_sWidth = 32;
  let $s_sWidth = message.s_sWidth;
  if ($s_sWidth !== undefined) {
    writeVarint32(bb, 258);
    writeString(bb, $s_sWidth);
  }

  // optional string s_carrier = 33;
  let $s_carrier = message.s_carrier;
  if ($s_carrier !== undefined) {
    writeVarint32(bb, 266);
    writeString(bb, $s_carrier);
  }

  // optional string s_osVersion = 34;
  let $s_osVersion = message.s_osVersion;
  if ($s_osVersion !== undefined) {
    writeVarint32(bb, 274);
    writeString(bb, $s_osVersion);
  }

  // optional string s_brand = 35;
  let $s_brand = message.s_brand;
  if ($s_brand !== undefined) {
    writeVarint32(bb, 282);
    writeString(bb, $s_brand);
  }

  // optional string s_sHeight = 36;
  let $s_sHeight = message.s_sHeight;
  if ($s_sHeight !== undefined) {
    writeVarint32(bb, 290);
    writeString(bb, $s_sHeight);
  }

  // optional int32 vipLevel = 37;
  let $vipLevel = message.vipLevel;
  if ($vipLevel !== undefined) {
    writeVarint32(bb, 296);
    writeVarint64(bb, intToLong($vipLevel));
  }

  // optional int32 vipVp = 38;
  let $vipVp = message.vipVp;
  if ($vipVp !== undefined) {
    writeVarint32(bb, 304);
    writeVarint64(bb, intToLong($vipVp));
  }

  // optional int32 totalPayment = 39;
  let $totalPayment = message.totalPayment;
  if ($totalPayment !== undefined) {
    writeVarint32(bb, 312);
    writeVarint64(bb, intToLong($totalPayment));
  }

  // optional int32 userType = 40;
  let $userType = message.userType;
  if ($userType !== undefined) {
    writeVarint32(bb, 320);
    writeVarint64(bb, intToLong($userType));
  }

  // optional string firstLoginTime = 41;
  let $firstLoginTime = message.firstLoginTime;
  if ($firstLoginTime !== undefined) {
    writeVarint32(bb, 330);
    writeString(bb, $firstLoginTime);
  }
}

export function decodeRoomOptParam(binary: Uint8Array): RoomOptParam {
  return _decodeRoomOptParam(wrapByteBuffer(binary));
}

function _decodeRoomOptParam(bb: ByteBuffer): RoomOptParam {
  let message: RoomOptParam = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 optType = 1;
      case 1: {
        message.optType = readVarint32(bb);
        break;
      }

      // optional int32 gameType = 2;
      case 2: {
        message.gameType = readVarint32(bb);
        break;
      }

      // optional int32 roundType = 3;
      case 3: {
        message.roundType = readVarint32(bb);
        break;
      }

      // optional string roomId = 4;
      case 4: {
        message.roomId = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 roomType = 5;
      case 5: {
        message.roomType = readVarint32(bb);
        break;
      }

      // optional int32 roomLevel = 6;
      case 6: {
        message.roomLevel = readVarint32(bb);
        break;
      }

      // optional string useShouPai = 7;
      case 7: {
        message.useShouPai = readString(bb, readVarint32(bb));
        break;
      }

      // optional string useQiPai = 8;
      case 8: {
        message.useQiPai = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 betCoins = 9;
      case 9: {
        message.betCoins = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 clientAutoPlay = 10;
      case 10: {
        message.clientAutoPlay = readVarint32(bb);
        break;
      }

      // optional int32 boxLocation = 11;
      case 11: {
        message.boxLocation = readVarint32(bb);
        break;
      }

      // optional int32 fairyTalesFreeGame = 12;
      case 12: {
        message.fairyTalesFreeGame = readVarint32(bb);
        break;
      }

      // optional int32 riseOrLose = 13;
      case 13: {
        message.riseOrLose = readVarint32(bb);
        break;
      }

      // optional int32 connectIndex = 14;
      case 14: {
        message.connectIndex = readVarint32(bb);
        break;
      }

      // repeated int32 jackpotRateList = 15;
      case 15: {
        let values = message.jackpotRateList || (message.jackpotRateList = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint32(bb));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint32(bb));
        }
        break;
      }

      // optional int32 betId = 16;
      case 16: {
        message.betId = readVarint32(bb);
        break;
      }

      // optional int32 userCount = 17;
      case 17: {
        message.userCount = readVarint32(bb);
        break;
      }

      // optional int32 gameNum = 18;
      case 18: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional int32 layer = 19;
      case 19: {
        message.layer = readVarint32(bb);
        break;
      }

      // optional int64 bankerAmount = 20;
      case 20: {
        message.bankerAmount = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional string userId = 21;
      case 21: {
        message.userId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string sessionId = 22;
      case 22: {
        message.sessionId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_deviceid = 23;
      case 23: {
        message.s_deviceid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_platform = 24;
      case 24: {
        message.s_platform = readString(bb, readVarint32(bb));
        break;
      }

      // optional string ip = 25;
      case 25: {
        message.ip = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_cid = 26;
      case 26: {
        message.s_cid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string media_id = 27;
      case 27: {
        message.media_id = readString(bb, readVarint32(bb));
        break;
      }

      // optional string utm_campaign = 28;
      case 28: {
        message.utm_campaign = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_model = 29;
      case 29: {
        message.s_model = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_version = 30;
      case 30: {
        message.s_version = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_access = 31;
      case 31: {
        message.s_access = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_sWidth = 32;
      case 32: {
        message.s_sWidth = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_carrier = 33;
      case 33: {
        message.s_carrier = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_osVersion = 34;
      case 34: {
        message.s_osVersion = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_brand = 35;
      case 35: {
        message.s_brand = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_sHeight = 36;
      case 36: {
        message.s_sHeight = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 vipLevel = 37;
      case 37: {
        message.vipLevel = readVarint32(bb);
        break;
      }

      // optional int32 vipVp = 38;
      case 38: {
        message.vipVp = readVarint32(bb);
        break;
      }

      // optional int32 totalPayment = 39;
      case 39: {
        message.totalPayment = readVarint32(bb);
        break;
      }

      // optional int32 userType = 40;
      case 40: {
        message.userType = readVarint32(bb);
        break;
      }

      // optional string firstLoginTime = 41;
      case 41: {
        message.firstLoginTime = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Dice3NotifyBeginBetVO {
  notifyType?: number;
  lastMsgId?: string;
  currMsgId?: string;
  gameInfo?: Dice3GameInfoVo;
}

export function encodeDice3NotifyBeginBetVO(message: Dice3NotifyBeginBetVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeDice3NotifyBeginBetVO(message, bb);
  return toUint8Array(bb);
}

function _encodeDice3NotifyBeginBetVO(message: Dice3NotifyBeginBetVO, bb: ByteBuffer): void {
  // optional int32 notifyType = 1;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($notifyType));
  }

  // optional string lastMsgId = 2;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 3;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $currMsgId);
  }

  // optional Dice3GameInfoVo gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeDice3GameInfoVo($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeDice3NotifyBeginBetVO(binary: Uint8Array): Dice3NotifyBeginBetVO {
  return _decodeDice3NotifyBeginBetVO(wrapByteBuffer(binary));
}

function _decodeDice3NotifyBeginBetVO(bb: ByteBuffer): Dice3NotifyBeginBetVO {
  let message: Dice3NotifyBeginBetVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 notifyType = 1;
      case 1: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // optional string lastMsgId = 2;
      case 2: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 3;
      case 3: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional Dice3GameInfoVo gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeDice3GameInfoVo(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface BaseParam {
  userId?: string;
  sessionId?: string;
  s_deviceid?: string;
  s_platform?: string;
  ip?: string;
  s_cid?: string;
  media_id?: string;
  utm_campaign?: string;
  s_model?: string;
  s_version?: string;
  s_access?: string;
  s_sWidth?: string;
  s_carrier?: string;
  s_osVersion?: string;
  s_brand?: string;
  s_sHeight?: string;
  vipLevel?: number;
  vipVp?: number;
  totalPayment?: number;
  userType?: number;
  firstLoginTime?: string;
}

export function encodeBaseParam(message: BaseParam): Uint8Array {
  let bb = popByteBuffer();
  _encodeBaseParam(message, bb);
  return toUint8Array(bb);
}

function _encodeBaseParam(message: BaseParam, bb: ByteBuffer): void {
  // optional string userId = 1;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $userId);
  }

  // optional string sessionId = 2;
  let $sessionId = message.sessionId;
  if ($sessionId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $sessionId);
  }

  // optional string s_deviceid = 3;
  let $s_deviceid = message.s_deviceid;
  if ($s_deviceid !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $s_deviceid);
  }

  // optional string s_platform = 4;
  let $s_platform = message.s_platform;
  if ($s_platform !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $s_platform);
  }

  // optional string ip = 5;
  let $ip = message.ip;
  if ($ip !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $ip);
  }

  // optional string s_cid = 6;
  let $s_cid = message.s_cid;
  if ($s_cid !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $s_cid);
  }

  // optional string media_id = 7;
  let $media_id = message.media_id;
  if ($media_id !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $media_id);
  }

  // optional string utm_campaign = 8;
  let $utm_campaign = message.utm_campaign;
  if ($utm_campaign !== undefined) {
    writeVarint32(bb, 66);
    writeString(bb, $utm_campaign);
  }

  // optional string s_model = 9;
  let $s_model = message.s_model;
  if ($s_model !== undefined) {
    writeVarint32(bb, 74);
    writeString(bb, $s_model);
  }

  // optional string s_version = 10;
  let $s_version = message.s_version;
  if ($s_version !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $s_version);
  }

  // optional string s_access = 11;
  let $s_access = message.s_access;
  if ($s_access !== undefined) {
    writeVarint32(bb, 90);
    writeString(bb, $s_access);
  }

  // optional string s_sWidth = 12;
  let $s_sWidth = message.s_sWidth;
  if ($s_sWidth !== undefined) {
    writeVarint32(bb, 98);
    writeString(bb, $s_sWidth);
  }

  // optional string s_carrier = 13;
  let $s_carrier = message.s_carrier;
  if ($s_carrier !== undefined) {
    writeVarint32(bb, 106);
    writeString(bb, $s_carrier);
  }

  // optional string s_osVersion = 14;
  let $s_osVersion = message.s_osVersion;
  if ($s_osVersion !== undefined) {
    writeVarint32(bb, 114);
    writeString(bb, $s_osVersion);
  }

  // optional string s_brand = 15;
  let $s_brand = message.s_brand;
  if ($s_brand !== undefined) {
    writeVarint32(bb, 122);
    writeString(bb, $s_brand);
  }

  // optional string s_sHeight = 16;
  let $s_sHeight = message.s_sHeight;
  if ($s_sHeight !== undefined) {
    writeVarint32(bb, 130);
    writeString(bb, $s_sHeight);
  }

  // optional int32 vipLevel = 17;
  let $vipLevel = message.vipLevel;
  if ($vipLevel !== undefined) {
    writeVarint32(bb, 136);
    writeVarint64(bb, intToLong($vipLevel));
  }

  // optional int32 vipVp = 18;
  let $vipVp = message.vipVp;
  if ($vipVp !== undefined) {
    writeVarint32(bb, 144);
    writeVarint64(bb, intToLong($vipVp));
  }

  // optional int32 totalPayment = 19;
  let $totalPayment = message.totalPayment;
  if ($totalPayment !== undefined) {
    writeVarint32(bb, 152);
    writeVarint64(bb, intToLong($totalPayment));
  }

  // optional int32 userType = 20;
  let $userType = message.userType;
  if ($userType !== undefined) {
    writeVarint32(bb, 160);
    writeVarint64(bb, intToLong($userType));
  }

  // optional string firstLoginTime = 21;
  let $firstLoginTime = message.firstLoginTime;
  if ($firstLoginTime !== undefined) {
    writeVarint32(bb, 170);
    writeString(bb, $firstLoginTime);
  }
}

export function decodeBaseParam(binary: Uint8Array): BaseParam {
  return _decodeBaseParam(wrapByteBuffer(binary));
}

function _decodeBaseParam(bb: ByteBuffer): BaseParam {
  let message: BaseParam = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string userId = 1;
      case 1: {
        message.userId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string sessionId = 2;
      case 2: {
        message.sessionId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_deviceid = 3;
      case 3: {
        message.s_deviceid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_platform = 4;
      case 4: {
        message.s_platform = readString(bb, readVarint32(bb));
        break;
      }

      // optional string ip = 5;
      case 5: {
        message.ip = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_cid = 6;
      case 6: {
        message.s_cid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string media_id = 7;
      case 7: {
        message.media_id = readString(bb, readVarint32(bb));
        break;
      }

      // optional string utm_campaign = 8;
      case 8: {
        message.utm_campaign = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_model = 9;
      case 9: {
        message.s_model = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_version = 10;
      case 10: {
        message.s_version = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_access = 11;
      case 11: {
        message.s_access = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_sWidth = 12;
      case 12: {
        message.s_sWidth = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_carrier = 13;
      case 13: {
        message.s_carrier = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_osVersion = 14;
      case 14: {
        message.s_osVersion = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_brand = 15;
      case 15: {
        message.s_brand = readString(bb, readVarint32(bb));
        break;
      }

      // optional string s_sHeight = 16;
      case 16: {
        message.s_sHeight = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 vipLevel = 17;
      case 17: {
        message.vipLevel = readVarint32(bb);
        break;
      }

      // optional int32 vipVp = 18;
      case 18: {
        message.vipVp = readVarint32(bb);
        break;
      }

      // optional int32 totalPayment = 19;
      case 19: {
        message.totalPayment = readVarint32(bb);
        break;
      }

      // optional int32 userType = 20;
      case 20: {
        message.userType = readVarint32(bb);
        break;
      }

      // optional string firstLoginTime = 21;
      case 21: {
        message.firstLoginTime = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RYBSendDrawMsgVO {
  notifyType?: number;
  playerResult?: number;
  gameInfo?: RYBSendDrawMsgGameInfoVO;
  userInfoList?: RoomUserVo[];
  gameResult?: RedYellowBlueWinDto;
}

export function encodeRYBSendDrawMsgVO(message: RYBSendDrawMsgVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeRYBSendDrawMsgVO(message, bb);
  return toUint8Array(bb);
}

function _encodeRYBSendDrawMsgVO(message: RYBSendDrawMsgVO, bb: ByteBuffer): void {
  // optional int32 notifyType = 1;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($notifyType));
  }

  // optional int32 playerResult = 2;
  let $playerResult = message.playerResult;
  if ($playerResult !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($playerResult));
  }

  // optional RYBSendDrawMsgGameInfoVO gameInfo = 3;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeRYBSendDrawMsgGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated RoomUserVo userInfoList = 4;
  let array$userInfoList = message.userInfoList;
  if (array$userInfoList !== undefined) {
    for (let value of array$userInfoList) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeRoomUserVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional RedYellowBlueWinDto gameResult = 5;
  let $gameResult = message.gameResult;
  if ($gameResult !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeRedYellowBlueWinDto($gameResult, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeRYBSendDrawMsgVO(binary: Uint8Array): RYBSendDrawMsgVO {
  return _decodeRYBSendDrawMsgVO(wrapByteBuffer(binary));
}

function _decodeRYBSendDrawMsgVO(bb: ByteBuffer): RYBSendDrawMsgVO {
  let message: RYBSendDrawMsgVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 notifyType = 1;
      case 1: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // optional int32 playerResult = 2;
      case 2: {
        message.playerResult = readVarint32(bb);
        break;
      }

      // optional RYBSendDrawMsgGameInfoVO gameInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeRYBSendDrawMsgGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated RoomUserVo userInfoList = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.userInfoList || (message.userInfoList = []);
        values.push(_decodeRoomUserVo(bb));
        bb.limit = limit;
        break;
      }

      // optional RedYellowBlueWinDto gameResult = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.gameResult = _decodeRedYellowBlueWinDto(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LDDoEnterRoomVO {
  lastMsgId?: string;
  currMsgId?: string;
  roomInfo?: LuckyDiceRoomInfoVo;
  gameInfo?: LuckyDiceGameInfoVo;
  betList?: PointBetCoinsNotifyVo[];
  betCoinMap?: { [key: number]: Long };
  betSelfCoinMap?: { [key: number]: Long };
  betCoinList?: Long[];
  onlinePlayers?: number;
}

export function encodeLDDoEnterRoomVO(message: LDDoEnterRoomVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeLDDoEnterRoomVO(message, bb);
  return toUint8Array(bb);
}

function _encodeLDDoEnterRoomVO(message: LDDoEnterRoomVO, bb: ByteBuffer): void {
  // optional string lastMsgId = 1;
  let $lastMsgId = message.lastMsgId;
  if ($lastMsgId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $lastMsgId);
  }

  // optional string currMsgId = 2;
  let $currMsgId = message.currMsgId;
  if ($currMsgId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $currMsgId);
  }

  // optional LuckyDiceRoomInfoVo roomInfo = 3;
  let $roomInfo = message.roomInfo;
  if ($roomInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeLuckyDiceRoomInfoVo($roomInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional LuckyDiceGameInfoVo gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeLuckyDiceGameInfoVo($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated PointBetCoinsNotifyVo betList = 5;
  let array$betList = message.betList;
  if (array$betList !== undefined) {
    for (let value of array$betList) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodePointBetCoinsNotifyVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<int32, int64> betCoinMap = 6;
  let map$betCoinMap = message.betCoinMap;
  if (map$betCoinMap !== undefined) {
    for (let key in map$betCoinMap) {
      let nested = popByteBuffer();
      let value = map$betCoinMap[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 50);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<int32, int64> betSelfCoinMap = 7;
  let map$betSelfCoinMap = message.betSelfCoinMap;
  if (map$betSelfCoinMap !== undefined) {
    for (let key in map$betSelfCoinMap) {
      let nested = popByteBuffer();
      let value = map$betSelfCoinMap[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 58);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated int64 betCoinList = 8;
  let array$betCoinList = message.betCoinList;
  if (array$betCoinList !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$betCoinList) {
      writeVarint64(packed, value);
    }
    writeVarint32(bb, 66);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // optional int32 onlinePlayers = 9;
  let $onlinePlayers = message.onlinePlayers;
  if ($onlinePlayers !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($onlinePlayers));
  }
}

export function decodeLDDoEnterRoomVO(binary: Uint8Array): LDDoEnterRoomVO {
  return _decodeLDDoEnterRoomVO(wrapByteBuffer(binary));
}

function _decodeLDDoEnterRoomVO(bb: ByteBuffer): LDDoEnterRoomVO {
  let message: LDDoEnterRoomVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string lastMsgId = 1;
      case 1: {
        message.lastMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currMsgId = 2;
      case 2: {
        message.currMsgId = readString(bb, readVarint32(bb));
        break;
      }

      // optional LuckyDiceRoomInfoVo roomInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.roomInfo = _decodeLuckyDiceRoomInfoVo(bb);
        bb.limit = limit;
        break;
      }

      // optional LuckyDiceGameInfoVo gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeLuckyDiceGameInfoVo(bb);
        bb.limit = limit;
        break;
      }

      // repeated PointBetCoinsNotifyVo betList = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.betList || (message.betList = []);
        values.push(_decodePointBetCoinsNotifyVo(bb));
        bb.limit = limit;
        break;
      }

      // optional map<int32, int64> betCoinMap = 6;
      case 6: {
        let values = message.betCoinMap || (message.betCoinMap = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: number | undefined;
        let value: Long | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              value = readVarint64(bb, /* unsigned */ false);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: betCoinMap");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // optional map<int32, int64> betSelfCoinMap = 7;
      case 7: {
        let values = message.betSelfCoinMap || (message.betSelfCoinMap = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: number | undefined;
        let value: Long | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              value = readVarint64(bb, /* unsigned */ false);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: betSelfCoinMap");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // repeated int64 betCoinList = 8;
      case 8: {
        let values = message.betCoinList || (message.betCoinList = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint64(bb, /* unsigned */ false));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint64(bb, /* unsigned */ false));
        }
        break;
      }

      // optional int32 onlinePlayers = 9;
      case 9: {
        message.onlinePlayers = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Dice3WinDto {
  gameNum?: number;
  id?: number;
  dices?: number[];
  controlSingleState?: number;
}

export function encodeDice3WinDto(message: Dice3WinDto): Uint8Array {
  let bb = popByteBuffer();
  _encodeDice3WinDto(message, bb);
  return toUint8Array(bb);
}

function _encodeDice3WinDto(message: Dice3WinDto, bb: ByteBuffer): void {
  // optional int32 gameNum = 1;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional int32 id = 2;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($id));
  }

  // repeated int32 dices = 3;
  let array$dices = message.dices;
  if (array$dices !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$dices) {
      writeVarint64(packed, intToLong(value));
    }
    writeVarint32(bb, 26);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // optional int32 controlSingleState = 4;
  let $controlSingleState = message.controlSingleState;
  if ($controlSingleState !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($controlSingleState));
  }
}

export function decodeDice3WinDto(binary: Uint8Array): Dice3WinDto {
  return _decodeDice3WinDto(wrapByteBuffer(binary));
}

function _decodeDice3WinDto(bb: ByteBuffer): Dice3WinDto {
  let message: Dice3WinDto = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 gameNum = 1;
      case 1: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional int32 id = 2;
      case 2: {
        message.id = readVarint32(bb);
        break;
      }

      // repeated int32 dices = 3;
      case 3: {
        let values = message.dices || (message.dices = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint32(bb));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint32(bb));
        }
        break;
      }

      // optional int32 controlSingleState = 4;
      case 4: {
        message.controlSingleState = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LuckyBallWinDto {
  gameNum?: number;
  id?: number[];
  ball?: number;
  controlSingleState?: number;
}

export function encodeLuckyBallWinDto(message: LuckyBallWinDto): Uint8Array {
  let bb = popByteBuffer();
  _encodeLuckyBallWinDto(message, bb);
  return toUint8Array(bb);
}

function _encodeLuckyBallWinDto(message: LuckyBallWinDto, bb: ByteBuffer): void {
  // optional int32 gameNum = 1;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($gameNum));
  }

  // repeated int32 id = 2;
  let array$id = message.id;
  if (array$id !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$id) {
      writeVarint64(packed, intToLong(value));
    }
    writeVarint32(bb, 18);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // optional int32 ball = 3;
  let $ball = message.ball;
  if ($ball !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($ball));
  }

  // optional int32 controlSingleState = 4;
  let $controlSingleState = message.controlSingleState;
  if ($controlSingleState !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($controlSingleState));
  }
}

export function decodeLuckyBallWinDto(binary: Uint8Array): LuckyBallWinDto {
  return _decodeLuckyBallWinDto(wrapByteBuffer(binary));
}

function _decodeLuckyBallWinDto(bb: ByteBuffer): LuckyBallWinDto {
  let message: LuckyBallWinDto = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 gameNum = 1;
      case 1: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // repeated int32 id = 2;
      case 2: {
        let values = message.id || (message.id = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint32(bb));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint32(bb));
        }
        break;
      }

      // optional int32 ball = 3;
      case 3: {
        message.ball = readVarint32(bb);
        break;
      }

      // optional int32 controlSingleState = 4;
      case 4: {
        message.controlSingleState = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DragonAndTigerPokerResultDto {
  id?: number;
  point?: string;
}

export function encodeDragonAndTigerPokerResultDto(message: DragonAndTigerPokerResultDto): Uint8Array {
  let bb = popByteBuffer();
  _encodeDragonAndTigerPokerResultDto(message, bb);
  return toUint8Array(bb);
}

function _encodeDragonAndTigerPokerResultDto(message: DragonAndTigerPokerResultDto, bb: ByteBuffer): void {
  // optional int32 id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($id));
  }

  // optional string point = 2;
  let $point = message.point;
  if ($point !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $point);
  }
}

export function decodeDragonAndTigerPokerResultDto(binary: Uint8Array): DragonAndTigerPokerResultDto {
  return _decodeDragonAndTigerPokerResultDto(wrapByteBuffer(binary));
}

function _decodeDragonAndTigerPokerResultDto(bb: ByteBuffer): DragonAndTigerPokerResultDto {
  let message: DragonAndTigerPokerResultDto = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 id = 1;
      case 1: {
        message.id = readVarint32(bb);
        break;
      }

      // optional string point = 2;
      case 2: {
        message.point = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Dice3SendDrawMsgGameInfoVO {
  leftOptSeconds?: number;
  gameNum?: number;
  onlinePlayers?: number;
}

export function encodeDice3SendDrawMsgGameInfoVO(message: Dice3SendDrawMsgGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeDice3SendDrawMsgGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeDice3SendDrawMsgGameInfoVO(message: Dice3SendDrawMsgGameInfoVO, bb: ByteBuffer): void {
  // optional int32 leftOptSeconds = 1;
  let $leftOptSeconds = message.leftOptSeconds;
  if ($leftOptSeconds !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($leftOptSeconds));
  }

  // optional int32 gameNum = 2;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional int32 onlinePlayers = 3;
  let $onlinePlayers = message.onlinePlayers;
  if ($onlinePlayers !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($onlinePlayers));
  }
}

export function decodeDice3SendDrawMsgGameInfoVO(binary: Uint8Array): Dice3SendDrawMsgGameInfoVO {
  return _decodeDice3SendDrawMsgGameInfoVO(wrapByteBuffer(binary));
}

function _decodeDice3SendDrawMsgGameInfoVO(bb: ByteBuffer): Dice3SendDrawMsgGameInfoVO {
  let message: Dice3SendDrawMsgGameInfoVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 leftOptSeconds = 1;
      case 1: {
        message.leftOptSeconds = readVarint32(bb);
        break;
      }

      // optional int32 gameNum = 2;
      case 2: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional int32 onlinePlayers = 3;
      case 3: {
        message.onlinePlayers = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LuckyBallGameInfoVo {
  oddsInfoList?: OddsInfoVo[];
  gameResultList?: LuckyBallWinDto[];
  gameNum?: number;
  bankerId?: string;
  currOptUserId?: string;
  totalOptSeconds?: number;
  leftOptSeconds?: number;
  dealCardMilliseconds?: Long;
  leftPaiNum?: number;
  qiPai?: string;
  turnType?: number;
}

export function encodeLuckyBallGameInfoVo(message: LuckyBallGameInfoVo): Uint8Array {
  let bb = popByteBuffer();
  _encodeLuckyBallGameInfoVo(message, bb);
  return toUint8Array(bb);
}

function _encodeLuckyBallGameInfoVo(message: LuckyBallGameInfoVo, bb: ByteBuffer): void {
  // repeated OddsInfoVo oddsInfoList = 1;
  let array$oddsInfoList = message.oddsInfoList;
  if (array$oddsInfoList !== undefined) {
    for (let value of array$oddsInfoList) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeOddsInfoVo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated LuckyBallWinDto gameResultList = 2;
  let array$gameResultList = message.gameResultList;
  if (array$gameResultList !== undefined) {
    for (let value of array$gameResultList) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeLuckyBallWinDto(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional int32 gameNum = 3;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional string bankerId = 4;
  let $bankerId = message.bankerId;
  if ($bankerId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $bankerId);
  }

  // optional string currOptUserId = 5;
  let $currOptUserId = message.currOptUserId;
  if ($currOptUserId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $currOptUserId);
  }

  // optional int32 totalOptSeconds = 6;
  let $totalOptSeconds = message.totalOptSeconds;
  if ($totalOptSeconds !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($totalOptSeconds));
  }

  // optional int32 leftOptSeconds = 7;
  let $leftOptSeconds = message.leftOptSeconds;
  if ($leftOptSeconds !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($leftOptSeconds));
  }

  // optional int64 dealCardMilliseconds = 8;
  let $dealCardMilliseconds = message.dealCardMilliseconds;
  if ($dealCardMilliseconds !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, $dealCardMilliseconds);
  }

  // optional int32 leftPaiNum = 9;
  let $leftPaiNum = message.leftPaiNum;
  if ($leftPaiNum !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($leftPaiNum));
  }

  // optional string qiPai = 10;
  let $qiPai = message.qiPai;
  if ($qiPai !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $qiPai);
  }

  // optional int32 turnType = 11;
  let $turnType = message.turnType;
  if ($turnType !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($turnType));
  }
}

export function decodeLuckyBallGameInfoVo(binary: Uint8Array): LuckyBallGameInfoVo {
  return _decodeLuckyBallGameInfoVo(wrapByteBuffer(binary));
}

function _decodeLuckyBallGameInfoVo(bb: ByteBuffer): LuckyBallGameInfoVo {
  let message: LuckyBallGameInfoVo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated OddsInfoVo oddsInfoList = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.oddsInfoList || (message.oddsInfoList = []);
        values.push(_decodeOddsInfoVo(bb));
        bb.limit = limit;
        break;
      }

      // repeated LuckyBallWinDto gameResultList = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.gameResultList || (message.gameResultList = []);
        values.push(_decodeLuckyBallWinDto(bb));
        bb.limit = limit;
        break;
      }

      // optional int32 gameNum = 3;
      case 3: {
        message.gameNum = readVarint32(bb);
        break;
      }

      // optional string bankerId = 4;
      case 4: {
        message.bankerId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string currOptUserId = 5;
      case 5: {
        message.currOptUserId = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 totalOptSeconds = 6;
      case 6: {
        message.totalOptSeconds = readVarint32(bb);
        break;
      }

      // optional int32 leftOptSeconds = 7;
      case 7: {
        message.leftOptSeconds = readVarint32(bb);
        break;
      }

      // optional int64 dealCardMilliseconds = 8;
      case 8: {
        message.dealCardMilliseconds = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 leftPaiNum = 9;
      case 9: {
        message.leftPaiNum = readVarint32(bb);
        break;
      }

      // optional string qiPai = 10;
      case 10: {
        message.qiPai = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 turnType = 11;
      case 11: {
        message.turnType = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RoomPageRecordResponse {
  total?: Long;
  records?: RoomRecordResponse[];
}

export function encodeRoomPageRecordResponse(message: RoomPageRecordResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeRoomPageRecordResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeRoomPageRecordResponse(message: RoomPageRecordResponse, bb: ByteBuffer): void {
  // optional int64 total = 1;
  let $total = message.total;
  if ($total !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $total);
  }

  // repeated RoomRecordResponse records = 2;
  let array$records = message.records;
  if (array$records !== undefined) {
    for (let value of array$records) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeRoomRecordResponse(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeRoomPageRecordResponse(binary: Uint8Array): RoomPageRecordResponse {
  return _decodeRoomPageRecordResponse(wrapByteBuffer(binary));
}

function _decodeRoomPageRecordResponse(bb: ByteBuffer): RoomPageRecordResponse {
  let message: RoomPageRecordResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 total = 1;
      case 1: {
        message.total = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // repeated RoomRecordResponse records = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.records || (message.records = []);
        values.push(_decodeRoomRecordResponse(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Long {
  low: number;
  high: number;
  unsigned: boolean;
}

interface ByteBuffer {
  bytes: Uint8Array;
  offset: number;
  limit: number;
}

function pushTemporaryLength(bb: ByteBuffer): number {
  let length = readVarint32(bb);
  let limit = bb.limit;
  bb.limit = bb.offset + length;
  return limit;
}

function skipUnknownField(bb: ByteBuffer, type: number): void {
  switch (type) {
    case 0: while (readByte(bb) & 0x80) { } break;
    case 2: skip(bb, readVarint32(bb)); break;
    case 5: skip(bb, 4); break;
    case 1: skip(bb, 8); break;
    default: throw new Error("Unimplemented type: " + type);
  }
}

function stringToLong(value: string): Long {
  return {
    low: value.charCodeAt(0) | (value.charCodeAt(1) << 16),
    high: value.charCodeAt(2) | (value.charCodeAt(3) << 16),
    unsigned: false,
  };
}

function longToString(value: Long): string {
  let low = value.low;
  let high = value.high;
  return String.fromCharCode(
    low & 0xFFFF,
    low >>> 16,
    high & 0xFFFF,
    high >>> 16);
}

// The code below was modified from https://github.com/protobufjs/bytebuffer.js
// which is under the Apache License 2.0.

let f32 = new Float32Array(1);
let f32_u8 = new Uint8Array(f32.buffer);

let f64 = new Float64Array(1);
let f64_u8 = new Uint8Array(f64.buffer);

function intToLong(value: number): Long {
  value |= 0;
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0,
  };
}

let bbStack: ByteBuffer[] = [];

function popByteBuffer(): ByteBuffer {
  const bb = bbStack.pop();
  if (!bb) return { bytes: new Uint8Array(64), offset: 0, limit: 0 };
  bb.offset = bb.limit = 0;
  return bb;
}

function pushByteBuffer(bb: ByteBuffer): void {
  bbStack.push(bb);
}

function wrapByteBuffer(bytes: Uint8Array): ByteBuffer {
  return { bytes, offset: 0, limit: bytes.length };
}

function toUint8Array(bb: ByteBuffer): Uint8Array {
  let bytes = bb.bytes;
  let limit = bb.limit;
  return bytes.length === limit ? bytes : bytes.subarray(0, limit);
}

function skip(bb: ByteBuffer, offset: number): void {
  if (bb.offset + offset > bb.limit) {
    throw new Error('Skip past limit');
  }
  bb.offset += offset;
}

function isAtEnd(bb: ByteBuffer): boolean {
  return bb.offset >= bb.limit;
}

function grow(bb: ByteBuffer, count: number): number {
  let bytes = bb.bytes;
  let offset = bb.offset;
  let limit = bb.limit;
  let finalOffset = offset + count;
  if (finalOffset > bytes.length) {
    let newBytes = new Uint8Array(finalOffset * 2);
    newBytes.set(bytes);
    bb.bytes = newBytes;
  }
  bb.offset = finalOffset;
  if (finalOffset > limit) {
    bb.limit = finalOffset;
  }
  return offset;
}

function advance(bb: ByteBuffer, count: number): number {
  let offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error('Read past limit');
  }
  bb.offset += count;
  return offset;
}

function readBytes(bb: ByteBuffer, count: number): Uint8Array {
  let offset = advance(bb, count);
  return bb.bytes.subarray(offset, offset + count);
}

function writeBytes(bb: ByteBuffer, buffer: Uint8Array): void {
  let offset = grow(bb, buffer.length);
  bb.bytes.set(buffer, offset);
}

function readString(bb: ByteBuffer, count: number): string {
  // Sadly a hand-coded UTF8 decoder is much faster than subarray+TextDecoder in V8
  let offset = advance(bb, count);
  let fromCharCode = String.fromCharCode;
  let bytes = bb.bytes;
  let invalid = '\uFFFD';
  let text = '';

  for (let i = 0; i < count; i++) {
    let c1 = bytes[i + offset], c2: number, c3: number, c4: number, c: number;

    // 1 byte
    if ((c1 & 0x80) === 0) {
      text += fromCharCode(c1);
    }

    // 2 bytes
    else if ((c1 & 0xE0) === 0xC0) {
      if (i + 1 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 0xC0) !== 0x80) text += invalid;
        else {
          c = ((c1 & 0x1F) << 6) | (c2 & 0x3F);
          if (c < 0x80) text += invalid;
          else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    }

    // 3 bytes
    else if ((c1 & 0xF0) == 0xE0) {
      if (i + 2 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | (c3 << 8)) & 0xC0C0) !== 0x8080) text += invalid;
        else {
          c = ((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
          if (c < 0x0800 || (c >= 0xD800 && c <= 0xDFFF)) text += invalid;
          else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    }

    // 4 bytes
    else if ((c1 & 0xF8) == 0xF0) {
      if (i + 3 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | (c3 << 8) | (c4 << 16)) & 0xC0C0C0) !== 0x808080) text += invalid;
        else {
          c = ((c1 & 0x07) << 0x12) | ((c2 & 0x3F) << 0x0C) | ((c3 & 0x3F) << 0x06) | (c4 & 0x3F);
          if (c < 0x10000 || c > 0x10FFFF) text += invalid;
          else {
            c -= 0x10000;
            text += fromCharCode((c >> 10) + 0xD800, (c & 0x3FF) + 0xDC00);
            i += 3;
          }
        }
      }
    }

    else text += invalid;
  }

  return text;
}

function writeString(bb: ByteBuffer, text: string): void {
  // Sadly a hand-coded UTF8 encoder is much faster than TextEncoder+set in V8
  let n = text.length;
  let byteCount = 0;

  // Write the byte count first
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    byteCount += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }
  writeVarint32(bb, byteCount);

  let offset = grow(bb, byteCount);
  let bytes = bb.bytes;

  // Then write the bytes
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    if (c < 0x80) {
      bytes[offset++] = c;
    } else {
      if (c < 0x800) {
        bytes[offset++] = ((c >> 6) & 0x1F) | 0xC0;
      } else {
        if (c < 0x10000) {
          bytes[offset++] = ((c >> 12) & 0x0F) | 0xE0;
        } else {
          bytes[offset++] = ((c >> 18) & 0x07) | 0xF0;
          bytes[offset++] = ((c >> 12) & 0x3F) | 0x80;
        }
        bytes[offset++] = ((c >> 6) & 0x3F) | 0x80;
      }
      bytes[offset++] = (c & 0x3F) | 0x80;
    }
  }
}

function writeByteBuffer(bb: ByteBuffer, buffer: ByteBuffer): void {
  let offset = grow(bb, buffer.limit);
  let from = bb.bytes;
  let to = buffer.bytes;

  // This for loop is much faster than subarray+set on V8
  for (let i = 0, n = buffer.limit; i < n; i++) {
    from[i + offset] = to[i];
  }
}

function readByte(bb: ByteBuffer): number {
  return bb.bytes[advance(bb, 1)];
}

function writeByte(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 1);
  bb.bytes[offset] = value;
}

function readFloat(bb: ByteBuffer): number {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f32_u8[0] = bytes[offset++];
  f32_u8[1] = bytes[offset++];
  f32_u8[2] = bytes[offset++];
  f32_u8[3] = bytes[offset++];
  return f32[0];
}

function writeFloat(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  f32[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f32_u8[0];
  bytes[offset++] = f32_u8[1];
  bytes[offset++] = f32_u8[2];
  bytes[offset++] = f32_u8[3];
}

function readDouble(bb: ByteBuffer): number {
  let offset = advance(bb, 8);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f64_u8[0] = bytes[offset++];
  f64_u8[1] = bytes[offset++];
  f64_u8[2] = bytes[offset++];
  f64_u8[3] = bytes[offset++];
  f64_u8[4] = bytes[offset++];
  f64_u8[5] = bytes[offset++];
  f64_u8[6] = bytes[offset++];
  f64_u8[7] = bytes[offset++];
  return f64[0];
}

function writeDouble(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 8);
  let bytes = bb.bytes;
  f64[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f64_u8[0];
  bytes[offset++] = f64_u8[1];
  bytes[offset++] = f64_u8[2];
  bytes[offset++] = f64_u8[3];
  bytes[offset++] = f64_u8[4];
  bytes[offset++] = f64_u8[5];
  bytes[offset++] = f64_u8[6];
  bytes[offset++] = f64_u8[7];
}

function readInt32(bb: ByteBuffer): number {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  );
}

function writeInt32(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  bytes[offset] = value;
  bytes[offset + 1] = value >> 8;
  bytes[offset + 2] = value >> 16;
  bytes[offset + 3] = value >> 24;
}

function readInt64(bb: ByteBuffer, unsigned: boolean): Long {
  return {
    low: readInt32(bb),
    high: readInt32(bb),
    unsigned,
  };
}

function writeInt64(bb: ByteBuffer, value: Long): void {
  writeInt32(bb, value.low);
  writeInt32(bb, value.high);
}

function readVarint32(bb: ByteBuffer): number {
  let c = 0;
  let value = 0;
  let b: number;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 0x7F) << c;
    c += 7;
  } while (b & 0x80);
  return value;
}

function writeVarint32(bb: ByteBuffer, value: number): void {
  value >>>= 0;
  while (value >= 0x80) {
    writeByte(bb, (value & 0x7f) | 0x80);
    value >>>= 7;
  }
  writeByte(bb, value);
}

function readVarint64(bb: ByteBuffer, unsigned: boolean): Long {
  let part0 = 0;
  let part1 = 0;
  let part2 = 0;
  let b: number;

  b = readByte(bb); part0 = (b & 0x7F); if (b & 0x80) {
    b = readByte(bb); part0 |= (b & 0x7F) << 7; if (b & 0x80) {
      b = readByte(bb); part0 |= (b & 0x7F) << 14; if (b & 0x80) {
        b = readByte(bb); part0 |= (b & 0x7F) << 21; if (b & 0x80) {

          b = readByte(bb); part1 = (b & 0x7F); if (b & 0x80) {
            b = readByte(bb); part1 |= (b & 0x7F) << 7; if (b & 0x80) {
              b = readByte(bb); part1 |= (b & 0x7F) << 14; if (b & 0x80) {
                b = readByte(bb); part1 |= (b & 0x7F) << 21; if (b & 0x80) {

                  b = readByte(bb); part2 = (b & 0x7F); if (b & 0x80) {
                    b = readByte(bb); part2 |= (b & 0x7F) << 7;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    low: part0 | (part1 << 28),
    high: (part1 >>> 4) | (part2 << 24),
    unsigned,
  };
}

function writeVarint64(bb: ByteBuffer, value: Long): void {
  let part0 = value.low >>> 0;
  let part1 = ((value.low >>> 28) | (value.high << 4)) >>> 0;
  let part2 = value.high >>> 24;

  // ref: src/google/protobuf/io/coded_stream.cc
  let size =
    part2 === 0 ?
      part1 === 0 ?
        part0 < 1 << 14 ?
          part0 < 1 << 7 ? 1 : 2 :
          part0 < 1 << 21 ? 3 : 4 :
        part1 < 1 << 14 ?
          part1 < 1 << 7 ? 5 : 6 :
          part1 < 1 << 21 ? 7 : 8 :
      part2 < 1 << 7 ? 9 : 10;

  let offset = grow(bb, size);
  let bytes = bb.bytes;

  switch (size) {
    case 10: bytes[offset + 9] = (part2 >>> 7) & 0x01;
    case 9: bytes[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7F;
    case 8: bytes[offset + 7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
    case 7: bytes[offset + 6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
    case 6: bytes[offset + 5] = size !== 6 ? (part1 >>> 7) | 0x80 : (part1 >>> 7) & 0x7F;
    case 5: bytes[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7F;
    case 4: bytes[offset + 3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
    case 3: bytes[offset + 2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
    case 2: bytes[offset + 1] = size !== 2 ? (part0 >>> 7) | 0x80 : (part0 >>> 7) & 0x7F;
    case 1: bytes[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7F;
  }
}

function readVarint32ZigZag(bb: ByteBuffer): number {
  let value = readVarint32(bb);

  // ref: src/google/protobuf/wire_format_lite.h
  return (value >>> 1) ^ -(value & 1);
}

function writeVarint32ZigZag(bb: ByteBuffer, value: number): void {
  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint32(bb, (value << 1) ^ (value >> 31));
}

function readVarint64ZigZag(bb: ByteBuffer): Long {
  let value = readVarint64(bb, /* unsigned */ false);
  let low = value.low;
  let high = value.high;
  let flip = -(low & 1);

  // ref: src/google/protobuf/wire_format_lite.h
  return {
    low: ((low >>> 1) | (high << 31)) ^ flip,
    high: (high >>> 1) ^ flip,
    unsigned: false,
  };
}

function writeVarint64ZigZag(bb: ByteBuffer, value: Long): void {
  let low = value.low;
  let high = value.high;
  let flip = high >> 31;

  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint64(bb, {
    low: (low << 1) ^ flip,
    high: ((high << 1) | (low >>> 31)) ^ flip,
    unsigned: false,
  });
}
