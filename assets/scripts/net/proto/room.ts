export interface JMWinVO {
  gameNum?: number;
  idRates?: JMWinIdRateVO[];
  dices?: number[];
}

export function encodeJMWinVO(message: JMWinVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeJMWinVO(message, bb);
  return toUint8Array(bb);
}

function _encodeJMWinVO(message: JMWinVO, bb: ByteBuffer): void {
  // optional int32 gameNum = 1;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($gameNum));
  }

  // repeated JMWinIdRateVO idRates = 2;
  let array$idRates = message.idRates;
  if (array$idRates !== undefined) {
    for (let value of array$idRates) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeJMWinIdRateVO(value, nested);
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
}

export function decodeJMWinVO(binary: Uint8Array): JMWinVO {
  return _decodeJMWinVO(wrapByteBuffer(binary));
}

function _decodeJMWinVO(bb: ByteBuffer): JMWinVO {
  let message: JMWinVO = {} as any;

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

      // repeated JMWinIdRateVO idRates = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.idRates || (message.idRates = []);
        values.push(_decodeJMWinIdRateVO(bb));
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

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface JMWinIdRateVO {
  id?: number;
  rate?: number;
  count?: number;
}

export function encodeJMWinIdRateVO(message: JMWinIdRateVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeJMWinIdRateVO(message, bb);
  return toUint8Array(bb);
}

function _encodeJMWinIdRateVO(message: JMWinIdRateVO, bb: ByteBuffer): void {
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

export function decodeJMWinIdRateVO(binary: Uint8Array): JMWinIdRateVO {
  return _decodeJMWinIdRateVO(wrapByteBuffer(binary));
}

function _decodeJMWinIdRateVO(bb: ByteBuffer): JMWinIdRateVO {
  let message: JMWinIdRateVO = {} as any;

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

export interface RoomExitDTO {
  roomId?: string;
}

export function encodeRoomExitDTO(message: RoomExitDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeRoomExitDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeRoomExitDTO(message: RoomExitDTO, bb: ByteBuffer): void {
  // optional string roomId = 1;
  let $roomId = message.roomId;
  if ($roomId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $roomId);
  }
}

export function decodeRoomExitDTO(binary: Uint8Array): RoomExitDTO {
  return _decodeRoomExitDTO(wrapByteBuffer(binary));
}

function _decodeRoomExitDTO(bb: ByteBuffer): RoomExitDTO {
  let message: RoomExitDTO = {} as any;

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

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RoomUserVO {
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
  winCoins?: Long;
  winRate?: number;
  userInTableState?: number;
}

export function encodeRoomUserVO(message: RoomUserVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeRoomUserVO(message, bb);
  return toUint8Array(bb);
}

function _encodeRoomUserVO(message: RoomUserVO, bb: ByteBuffer): void {
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

  // optional int64 winCoins = 19;
  let $winCoins = message.winCoins;
  if ($winCoins !== undefined) {
    writeVarint32(bb, 152);
    writeVarint64(bb, $winCoins);
  }

  // optional int32 winRate = 20;
  let $winRate = message.winRate;
  if ($winRate !== undefined) {
    writeVarint32(bb, 160);
    writeVarint64(bb, intToLong($winRate));
  }

  // optional int32 userInTableState = 21;
  let $userInTableState = message.userInTableState;
  if ($userInTableState !== undefined) {
    writeVarint32(bb, 168);
    writeVarint64(bb, intToLong($userInTableState));
  }
}

export function decodeRoomUserVO(binary: Uint8Array): RoomUserVO {
  return _decodeRoomUserVO(wrapByteBuffer(binary));
}

function _decodeRoomUserVO(bb: ByteBuffer): RoomUserVO {
  let message: RoomUserVO = {} as any;

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

      // optional int64 winCoins = 19;
      case 19: {
        message.winCoins = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 winRate = 20;
      case 20: {
        message.winRate = readVarint32(bb);
        break;
      }

      // optional int32 userInTableState = 21;
      case 21: {
        message.userInTableState = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NotifyDTWinnerVO {
  userId?: string;
  nickName?: string;
  portrait?: string;
  vipLevel?: number;
  winCoins?: Long;
}

export function encodeNotifyDTWinnerVO(message: NotifyDTWinnerVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyDTWinnerVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyDTWinnerVO(message: NotifyDTWinnerVO, bb: ByteBuffer): void {
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

export function decodeNotifyDTWinnerVO(binary: Uint8Array): NotifyDTWinnerVO {
  return _decodeNotifyDTWinnerVO(wrapByteBuffer(binary));
}

function _decodeNotifyDTWinnerVO(bb: ByteBuffer): NotifyDTWinnerVO {
  let message: NotifyDTWinnerVO = {} as any;

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

export interface ResponseDTEnterRoomVO {
  lastMsgId?: string;
  currMsgId?: string;
  roomInfo?: RoomInfoVO;
  gameInfo?: DTGameInfoVO;
  betList?: PointBetCoinsVO[];
  betCoinMap?: { [key: number]: Long };
  betSelfCoinMap?: { [key: number]: Long };
  betCoinList?: Long[];
  onlinePlayers?: number;
}

export function encodeResponseDTEnterRoomVO(message: ResponseDTEnterRoomVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeResponseDTEnterRoomVO(message, bb);
  return toUint8Array(bb);
}

function _encodeResponseDTEnterRoomVO(message: ResponseDTEnterRoomVO, bb: ByteBuffer): void {
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

  // optional RoomInfoVO roomInfo = 3;
  let $roomInfo = message.roomInfo;
  if ($roomInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeRoomInfoVO($roomInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional DTGameInfoVO gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeDTGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated PointBetCoinsVO betList = 5;
  let array$betList = message.betList;
  if (array$betList !== undefined) {
    for (let value of array$betList) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodePointBetCoinsVO(value, nested);
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

export function decodeResponseDTEnterRoomVO(binary: Uint8Array): ResponseDTEnterRoomVO {
  return _decodeResponseDTEnterRoomVO(wrapByteBuffer(binary));
}

function _decodeResponseDTEnterRoomVO(bb: ByteBuffer): ResponseDTEnterRoomVO {
  let message: ResponseDTEnterRoomVO = {} as any;

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

      // optional RoomInfoVO roomInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.roomInfo = _decodeRoomInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // optional DTGameInfoVO gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeDTGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated PointBetCoinsVO betList = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.betList || (message.betList = []);
        values.push(_decodePointBetCoinsVO(bb));
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

export interface NotifyTPWDrawGameInfoVO {
  leftOptSeconds?: number;
  gameNum?: number;
  onlinePlayers?: number;
}

export function encodeNotifyTPWDrawGameInfoVO(message: NotifyTPWDrawGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyTPWDrawGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyTPWDrawGameInfoVO(message: NotifyTPWDrawGameInfoVO, bb: ByteBuffer): void {
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

export function decodeNotifyTPWDrawGameInfoVO(binary: Uint8Array): NotifyTPWDrawGameInfoVO {
  return _decodeNotifyTPWDrawGameInfoVO(wrapByteBuffer(binary));
}

function _decodeNotifyTPWDrawGameInfoVO(bb: ByteBuffer): NotifyTPWDrawGameInfoVO {
  let message: NotifyTPWDrawGameInfoVO = {} as any;

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

export interface NotifyRYBDrawGameInfoVO {
  leftOptSeconds?: number;
  gameNum?: number;
  onlinePlayers?: number;
}

export function encodeNotifyRYBDrawGameInfoVO(message: NotifyRYBDrawGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyRYBDrawGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyRYBDrawGameInfoVO(message: NotifyRYBDrawGameInfoVO, bb: ByteBuffer): void {
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

export function decodeNotifyRYBDrawGameInfoVO(binary: Uint8Array): NotifyRYBDrawGameInfoVO {
  return _decodeNotifyRYBDrawGameInfoVO(wrapByteBuffer(binary));
}

function _decodeNotifyRYBDrawGameInfoVO(bb: ByteBuffer): NotifyRYBDrawGameInfoVO {
  let message: NotifyRYBDrawGameInfoVO = {} as any;

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

export interface PointBetCoinsVO {
  betCoins?: Long;
  betId?: number;
}

export function encodePointBetCoinsVO(message: PointBetCoinsVO): Uint8Array {
  let bb = popByteBuffer();
  _encodePointBetCoinsVO(message, bb);
  return toUint8Array(bb);
}

function _encodePointBetCoinsVO(message: PointBetCoinsVO, bb: ByteBuffer): void {
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

export function decodePointBetCoinsVO(binary: Uint8Array): PointBetCoinsVO {
  return _decodePointBetCoinsVO(wrapByteBuffer(binary));
}

function _decodePointBetCoinsVO(bb: ByteBuffer): PointBetCoinsVO {
  let message: PointBetCoinsVO = {} as any;

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

export interface ResponseD3EnterRoomVO {
  lastMsgId?: string;
  currMsgId?: string;
  betCoinList?: Long[];
  onlinePlayers?: number;
  betSelfCoinMap?: { [key: number]: Long };
  betCoinMap?: { [key: number]: Long };
  betList?: PointBetCoinsVO[];
  gameInfo?: D3GameInfoVO;
  roomInfo?: RoomInfoVO;
}

export function encodeResponseD3EnterRoomVO(message: ResponseD3EnterRoomVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeResponseD3EnterRoomVO(message, bb);
  return toUint8Array(bb);
}

function _encodeResponseD3EnterRoomVO(message: ResponseD3EnterRoomVO, bb: ByteBuffer): void {
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

  // repeated PointBetCoinsVO betList = 7;
  let array$betList = message.betList;
  if (array$betList !== undefined) {
    for (let value of array$betList) {
      writeVarint32(bb, 58);
      let nested = popByteBuffer();
      _encodePointBetCoinsVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional D3GameInfoVO gameInfo = 8;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 66);
    let nested = popByteBuffer();
    _encodeD3GameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional RoomInfoVO roomInfo = 9;
  let $roomInfo = message.roomInfo;
  if ($roomInfo !== undefined) {
    writeVarint32(bb, 74);
    let nested = popByteBuffer();
    _encodeRoomInfoVO($roomInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeResponseD3EnterRoomVO(binary: Uint8Array): ResponseD3EnterRoomVO {
  return _decodeResponseD3EnterRoomVO(wrapByteBuffer(binary));
}

function _decodeResponseD3EnterRoomVO(bb: ByteBuffer): ResponseD3EnterRoomVO {
  let message: ResponseD3EnterRoomVO = {} as any;

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

      // repeated PointBetCoinsVO betList = 7;
      case 7: {
        let limit = pushTemporaryLength(bb);
        let values = message.betList || (message.betList = []);
        values.push(_decodePointBetCoinsVO(bb));
        bb.limit = limit;
        break;
      }

      // optional D3GameInfoVO gameInfo = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeD3GameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // optional RoomInfoVO roomInfo = 9;
      case 9: {
        let limit = pushTemporaryLength(bb);
        message.roomInfo = _decodeRoomInfoVO(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RYBWinVO {
  gameNum?: number;
  id?: number;
  reelIndex?: number;
}

export function encodeRYBWinVO(message: RYBWinVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeRYBWinVO(message, bb);
  return toUint8Array(bb);
}

function _encodeRYBWinVO(message: RYBWinVO, bb: ByteBuffer): void {
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
}

export function decodeRYBWinVO(binary: Uint8Array): RYBWinVO {
  return _decodeRYBWinVO(wrapByteBuffer(binary));
}

function _decodeRYBWinVO(bb: ByteBuffer): RYBWinVO {
  let message: RYBWinVO = {} as any;

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

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NotifyTPWBeginBetVO {
  notifyType?: number;
  lastMsgId?: string;
  currMsgId?: string;
  gameInfo?: TPWGameInfoVO;
}

export function encodeNotifyTPWBeginBetVO(message: NotifyTPWBeginBetVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyTPWBeginBetVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyTPWBeginBetVO(message: NotifyTPWBeginBetVO, bb: ByteBuffer): void {
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

  // optional TPWGameInfoVO gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeTPWGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeNotifyTPWBeginBetVO(binary: Uint8Array): NotifyTPWBeginBetVO {
  return _decodeNotifyTPWBeginBetVO(wrapByteBuffer(binary));
}

function _decodeNotifyTPWBeginBetVO(bb: ByteBuffer): NotifyTPWBeginBetVO {
  let message: NotifyTPWBeginBetVO = {} as any;

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

      // optional TPWGameInfoVO gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeTPWGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NotifyPKDrawVO {
  notifyType?: number;
  playerResult?: number;
  gameInfo?: NotifyPKDrawGameInfoVO;
  userInfoList?: RoomUserVO[];
  gameResult?: PKWinVO;
}

export function encodeNotifyPKDrawVO(message: NotifyPKDrawVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyPKDrawVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyPKDrawVO(message: NotifyPKDrawVO, bb: ByteBuffer): void {
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

  // optional NotifyPKDrawGameInfoVO gameInfo = 3;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeNotifyPKDrawGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated RoomUserVO userInfoList = 4;
  let array$userInfoList = message.userInfoList;
  if (array$userInfoList !== undefined) {
    for (let value of array$userInfoList) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeRoomUserVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional PKWinVO gameResult = 5;
  let $gameResult = message.gameResult;
  if ($gameResult !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodePKWinVO($gameResult, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeNotifyPKDrawVO(binary: Uint8Array): NotifyPKDrawVO {
  return _decodeNotifyPKDrawVO(wrapByteBuffer(binary));
}

function _decodeNotifyPKDrawVO(bb: ByteBuffer): NotifyPKDrawVO {
  let message: NotifyPKDrawVO = {} as any;

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

      // optional NotifyPKDrawGameInfoVO gameInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeNotifyPKDrawGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated RoomUserVO userInfoList = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.userInfoList || (message.userInfoList = []);
        values.push(_decodeRoomUserVO(bb));
        bb.limit = limit;
        break;
      }

      // optional PKWinVO gameResult = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.gameResult = _decodePKWinVO(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ResponseRoomPageRecordVO {
  total?: Long;
  records?: ResponseRoomRecordVO[];
}

export function encodeResponseRoomPageRecordVO(message: ResponseRoomPageRecordVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeResponseRoomPageRecordVO(message, bb);
  return toUint8Array(bb);
}

function _encodeResponseRoomPageRecordVO(message: ResponseRoomPageRecordVO, bb: ByteBuffer): void {
  // optional int64 total = 1;
  let $total = message.total;
  if ($total !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $total);
  }

  // repeated ResponseRoomRecordVO records = 2;
  let array$records = message.records;
  if (array$records !== undefined) {
    for (let value of array$records) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeResponseRoomRecordVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeResponseRoomPageRecordVO(binary: Uint8Array): ResponseRoomPageRecordVO {
  return _decodeResponseRoomPageRecordVO(wrapByteBuffer(binary));
}

function _decodeResponseRoomPageRecordVO(bb: ByteBuffer): ResponseRoomPageRecordVO {
  let message: ResponseRoomPageRecordVO = {} as any;

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

      // repeated ResponseRoomRecordVO records = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.records || (message.records = []);
        values.push(_decodeResponseRoomRecordVO(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ResponseJMEnterRoomVO {
  lastMsgId?: string;
  currMsgId?: string;
  roomInfo?: RoomInfoVO;
  gameInfo?: JMGameInfoVO;
  betList?: PointBetCoinsVO[];
  betCoinMap?: { [key: number]: Long };
  betSelfCoinMap?: { [key: number]: Long };
  betCoinList?: Long[];
  onlinePlayers?: number;
}

export function encodeResponseJMEnterRoomVO(message: ResponseJMEnterRoomVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeResponseJMEnterRoomVO(message, bb);
  return toUint8Array(bb);
}

function _encodeResponseJMEnterRoomVO(message: ResponseJMEnterRoomVO, bb: ByteBuffer): void {
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

  // optional RoomInfoVO roomInfo = 3;
  let $roomInfo = message.roomInfo;
  if ($roomInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeRoomInfoVO($roomInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional JMGameInfoVO gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeJMGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated PointBetCoinsVO betList = 5;
  let array$betList = message.betList;
  if (array$betList !== undefined) {
    for (let value of array$betList) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodePointBetCoinsVO(value, nested);
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

export function decodeResponseJMEnterRoomVO(binary: Uint8Array): ResponseJMEnterRoomVO {
  return _decodeResponseJMEnterRoomVO(wrapByteBuffer(binary));
}

function _decodeResponseJMEnterRoomVO(bb: ByteBuffer): ResponseJMEnterRoomVO {
  let message: ResponseJMEnterRoomVO = {} as any;

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

      // optional RoomInfoVO roomInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.roomInfo = _decodeRoomInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // optional JMGameInfoVO gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeJMGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated PointBetCoinsVO betList = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.betList || (message.betList = []);
        values.push(_decodePointBetCoinsVO(bb));
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

export interface ResponseLBEnterRoomVO {
  lastMsgId?: string;
  currMsgId?: string;
  roomInfo?: RoomInfoVO;
  gameInfo?: LBGameInfoVO;
  betCoinMap?: { [key: number]: Long };
  betList?: PointBetCoinsVO[];
  betSelfCoinMap?: { [key: number]: Long };
  betCoinList?: Long[];
  onlinePlayers?: number;
}

export function encodeResponseLBEnterRoomVO(message: ResponseLBEnterRoomVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeResponseLBEnterRoomVO(message, bb);
  return toUint8Array(bb);
}

function _encodeResponseLBEnterRoomVO(message: ResponseLBEnterRoomVO, bb: ByteBuffer): void {
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

  // optional RoomInfoVO roomInfo = 3;
  let $roomInfo = message.roomInfo;
  if ($roomInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeRoomInfoVO($roomInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional LBGameInfoVO gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeLBGameInfoVO($gameInfo, nested);
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

  // repeated PointBetCoinsVO betList = 6;
  let array$betList = message.betList;
  if (array$betList !== undefined) {
    for (let value of array$betList) {
      writeVarint32(bb, 50);
      let nested = popByteBuffer();
      _encodePointBetCoinsVO(value, nested);
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

export function decodeResponseLBEnterRoomVO(binary: Uint8Array): ResponseLBEnterRoomVO {
  return _decodeResponseLBEnterRoomVO(wrapByteBuffer(binary));
}

function _decodeResponseLBEnterRoomVO(bb: ByteBuffer): ResponseLBEnterRoomVO {
  let message: ResponseLBEnterRoomVO = {} as any;

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

      // optional RoomInfoVO roomInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.roomInfo = _decodeRoomInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // optional LBGameInfoVO gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeLBGameInfoVO(bb);
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

      // repeated PointBetCoinsVO betList = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        let values = message.betList || (message.betList = []);
        values.push(_decodePointBetCoinsVO(bb));
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

export interface OddsInfoVO {
  betId?: number;
  odds?: number;
}

export function encodeOddsInfoVO(message: OddsInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeOddsInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeOddsInfoVO(message: OddsInfoVO, bb: ByteBuffer): void {
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

export function decodeOddsInfoVO(binary: Uint8Array): OddsInfoVO {
  return _decodeOddsInfoVO(wrapByteBuffer(binary));
}

function _decodeOddsInfoVO(bb: ByteBuffer): OddsInfoVO {
  let message: OddsInfoVO = {} as any;

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

export interface TPWWinVO {
  gameNum?: number;
  id?: number[];
  king?: TPWPokerResultVO;
  queen?: TPWPokerResultVO;
}

export function encodeTPWWinVO(message: TPWWinVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeTPWWinVO(message, bb);
  return toUint8Array(bb);
}

function _encodeTPWWinVO(message: TPWWinVO, bb: ByteBuffer): void {
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

  // optional TPWPokerResultVO king = 3;
  let $king = message.king;
  if ($king !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeTPWPokerResultVO($king, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional TPWPokerResultVO queen = 4;
  let $queen = message.queen;
  if ($queen !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeTPWPokerResultVO($queen, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeTPWWinVO(binary: Uint8Array): TPWWinVO {
  return _decodeTPWWinVO(wrapByteBuffer(binary));
}

function _decodeTPWWinVO(bb: ByteBuffer): TPWWinVO {
  let message: TPWWinVO = {} as any;

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

      // optional TPWPokerResultVO king = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.king = _decodeTPWPokerResultVO(bb);
        bb.limit = limit;
        break;
      }

      // optional TPWPokerResultVO queen = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.queen = _decodeTPWPokerResultVO(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NotifyRYBBeginBetVO {
  notifyType?: number;
  lastMsgId?: string;
  currMsgId?: string;
  gameInfo?: RYBGameInfoVO;
}

export function encodeNotifyRYBBeginBetVO(message: NotifyRYBBeginBetVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyRYBBeginBetVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyRYBBeginBetVO(message: NotifyRYBBeginBetVO, bb: ByteBuffer): void {
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

  // optional RYBGameInfoVO gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeRYBGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeNotifyRYBBeginBetVO(binary: Uint8Array): NotifyRYBBeginBetVO {
  return _decodeNotifyRYBBeginBetVO(wrapByteBuffer(binary));
}

function _decodeNotifyRYBBeginBetVO(bb: ByteBuffer): NotifyRYBBeginBetVO {
  let message: NotifyRYBBeginBetVO = {} as any;

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

      // optional RYBGameInfoVO gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeRYBGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NotifyJMDrawVO {
  notifyType?: number;
  playerResult?: number;
  gameInfo?: NotifyJMDrawGameInfoVO;
  userInfoList?: RoomUserVO[];
  gameResult?: JMWinVO;
}

export function encodeNotifyJMDrawVO(message: NotifyJMDrawVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyJMDrawVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyJMDrawVO(message: NotifyJMDrawVO, bb: ByteBuffer): void {
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

  // optional NotifyJMDrawGameInfoVO gameInfo = 3;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeNotifyJMDrawGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated RoomUserVO userInfoList = 4;
  let array$userInfoList = message.userInfoList;
  if (array$userInfoList !== undefined) {
    for (let value of array$userInfoList) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeRoomUserVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional JMWinVO gameResult = 5;
  let $gameResult = message.gameResult;
  if ($gameResult !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeJMWinVO($gameResult, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeNotifyJMDrawVO(binary: Uint8Array): NotifyJMDrawVO {
  return _decodeNotifyJMDrawVO(wrapByteBuffer(binary));
}

function _decodeNotifyJMDrawVO(bb: ByteBuffer): NotifyJMDrawVO {
  let message: NotifyJMDrawVO = {} as any;

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

      // optional NotifyJMDrawGameInfoVO gameInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeNotifyJMDrawGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated RoomUserVO userInfoList = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.userInfoList || (message.userInfoList = []);
        values.push(_decodeRoomUserVO(bb));
        bb.limit = limit;
        break;
      }

      // optional JMWinVO gameResult = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.gameResult = _decodeJMWinVO(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LDGameInfoVO {
  gameNum?: number;
  bankerId?: string;
  currOptUserId?: string;
  totalOptSeconds?: number;
  leftOptSeconds?: number;
  dealCardMilliseconds?: Long;
  leftPaiNum?: number;
  qiPai?: string;
  turnType?: number;
  oddsInfoList?: OddsInfoVO[];
  gameResultList?: LDWinVO[];
}

export function encodeLDGameInfoVO(message: LDGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeLDGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeLDGameInfoVO(message: LDGameInfoVO, bb: ByteBuffer): void {
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

  // repeated OddsInfoVO oddsInfoList = 10;
  let array$oddsInfoList = message.oddsInfoList;
  if (array$oddsInfoList !== undefined) {
    for (let value of array$oddsInfoList) {
      writeVarint32(bb, 82);
      let nested = popByteBuffer();
      _encodeOddsInfoVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated LDWinVO gameResultList = 11;
  let array$gameResultList = message.gameResultList;
  if (array$gameResultList !== undefined) {
    for (let value of array$gameResultList) {
      writeVarint32(bb, 90);
      let nested = popByteBuffer();
      _encodeLDWinVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeLDGameInfoVO(binary: Uint8Array): LDGameInfoVO {
  return _decodeLDGameInfoVO(wrapByteBuffer(binary));
}

function _decodeLDGameInfoVO(bb: ByteBuffer): LDGameInfoVO {
  let message: LDGameInfoVO = {} as any;

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

      // repeated OddsInfoVO oddsInfoList = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        let values = message.oddsInfoList || (message.oddsInfoList = []);
        values.push(_decodeOddsInfoVO(bb));
        bb.limit = limit;
        break;
      }

      // repeated LDWinVO gameResultList = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        let values = message.gameResultList || (message.gameResultList = []);
        values.push(_decodeLDWinVO(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NotifyLDBeginBetVO {
  notifyType?: number;
  lastMsgId?: string;
  currMsgId?: string;
  gameInfo?: LDGameInfoVO;
}

export function encodeNotifyLDBeginBetVO(message: NotifyLDBeginBetVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyLDBeginBetVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyLDBeginBetVO(message: NotifyLDBeginBetVO, bb: ByteBuffer): void {
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

  // optional LDGameInfoVO gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeLDGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeNotifyLDBeginBetVO(binary: Uint8Array): NotifyLDBeginBetVO {
  return _decodeNotifyLDBeginBetVO(wrapByteBuffer(binary));
}

function _decodeNotifyLDBeginBetVO(bb: ByteBuffer): NotifyLDBeginBetVO {
  let message: NotifyLDBeginBetVO = {} as any;

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

      // optional LDGameInfoVO gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeLDGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NotifyKickUserVO {
  notifyType?: number;
  gameType?: number;
  roomId?: string;
  lastMsgId?: string;
  currMsgId?: string;
}

export function encodeNotifyKickUserVO(message: NotifyKickUserVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyKickUserVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyKickUserVO(message: NotifyKickUserVO, bb: ByteBuffer): void {
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

export function decodeNotifyKickUserVO(binary: Uint8Array): NotifyKickUserVO {
  return _decodeNotifyKickUserVO(wrapByteBuffer(binary));
}

function _decodeNotifyKickUserVO(bb: ByteBuffer): NotifyKickUserVO {
  let message: NotifyKickUserVO = {} as any;

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

export interface NotifyLDDrawGameInfoVO {
  leftOptSeconds?: number;
  gameNum?: number;
  onlinePlayers?: number;
}

export function encodeNotifyLDDrawGameInfoVO(message: NotifyLDDrawGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyLDDrawGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyLDDrawGameInfoVO(message: NotifyLDDrawGameInfoVO, bb: ByteBuffer): void {
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

export function decodeNotifyLDDrawGameInfoVO(binary: Uint8Array): NotifyLDDrawGameInfoVO {
  return _decodeNotifyLDDrawGameInfoVO(wrapByteBuffer(binary));
}

function _decodeNotifyLDDrawGameInfoVO(bb: ByteBuffer): NotifyLDDrawGameInfoVO {
  let message: NotifyLDDrawGameInfoVO = {} as any;

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

export interface PKWinVO {
  gameNum?: number;
  id?: number[];
  poker?: string;
}

export function encodePKWinVO(message: PKWinVO): Uint8Array {
  let bb = popByteBuffer();
  _encodePKWinVO(message, bb);
  return toUint8Array(bb);
}

function _encodePKWinVO(message: PKWinVO, bb: ByteBuffer): void {
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
}

export function decodePKWinVO(binary: Uint8Array): PKWinVO {
  return _decodePKWinVO(wrapByteBuffer(binary));
}

function _decodePKWinVO(bb: ByteBuffer): PKWinVO {
  let message: PKWinVO = {} as any;

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

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface TPWPokerResultVO {
  pais?: string[];
  paisAttr?: number;
}

export function encodeTPWPokerResultVO(message: TPWPokerResultVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeTPWPokerResultVO(message, bb);
  return toUint8Array(bb);
}

function _encodeTPWPokerResultVO(message: TPWPokerResultVO, bb: ByteBuffer): void {
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

export function decodeTPWPokerResultVO(binary: Uint8Array): TPWPokerResultVO {
  return _decodeTPWPokerResultVO(wrapByteBuffer(binary));
}

function _decodeTPWPokerResultVO(bb: ByteBuffer): TPWPokerResultVO {
  let message: TPWPokerResultVO = {} as any;

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

export interface TPWOddsInfoVO {
  betId?: number;
  odds?: number;
  luckyHitRate?: { [key: number]: number };
}

export function encodeTPWOddsInfoVO(message: TPWOddsInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeTPWOddsInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeTPWOddsInfoVO(message: TPWOddsInfoVO, bb: ByteBuffer): void {
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

  // optional map<int32, int32> luckyHitRate = 3;
  let map$luckyHitRate = message.luckyHitRate;
  if (map$luckyHitRate !== undefined) {
    for (let key in map$luckyHitRate) {
      let nested = popByteBuffer();
      let value = map$luckyHitRate[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, intToLong(value));
      writeVarint32(bb, 26);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeTPWOddsInfoVO(binary: Uint8Array): TPWOddsInfoVO {
  return _decodeTPWOddsInfoVO(wrapByteBuffer(binary));
}

function _decodeTPWOddsInfoVO(bb: ByteBuffer): TPWOddsInfoVO {
  let message: TPWOddsInfoVO = {} as any;

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

      // optional map<int32, int32> luckyHitRate = 3;
      case 3: {
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

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface D3GameInfoVO {
  gameNum?: number;
  bankerId?: string;
  currOptUserId?: string;
  totalOptSeconds?: number;
  leftOptSeconds?: number;
  dealCardMilliseconds?: Long;
  leftPaiNum?: number;
  qiPai?: string;
  turnType?: number;
  oddsInfoList?: OddsInfoVO[];
  gameResultList?: D3WinVO[];
}

export function encodeD3GameInfoVO(message: D3GameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeD3GameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeD3GameInfoVO(message: D3GameInfoVO, bb: ByteBuffer): void {
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

  // repeated OddsInfoVO oddsInfoList = 10;
  let array$oddsInfoList = message.oddsInfoList;
  if (array$oddsInfoList !== undefined) {
    for (let value of array$oddsInfoList) {
      writeVarint32(bb, 82);
      let nested = popByteBuffer();
      _encodeOddsInfoVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated D3WinVO gameResultList = 11;
  let array$gameResultList = message.gameResultList;
  if (array$gameResultList !== undefined) {
    for (let value of array$gameResultList) {
      writeVarint32(bb, 90);
      let nested = popByteBuffer();
      _encodeD3WinVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeD3GameInfoVO(binary: Uint8Array): D3GameInfoVO {
  return _decodeD3GameInfoVO(wrapByteBuffer(binary));
}

function _decodeD3GameInfoVO(bb: ByteBuffer): D3GameInfoVO {
  let message: D3GameInfoVO = {} as any;

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

      // repeated OddsInfoVO oddsInfoList = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        let values = message.oddsInfoList || (message.oddsInfoList = []);
        values.push(_decodeOddsInfoVO(bb));
        bb.limit = limit;
        break;
      }

      // repeated D3WinVO gameResultList = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        let values = message.gameResultList || (message.gameResultList = []);
        values.push(_decodeD3WinVO(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ResponseTPEnterRoomVO {
  lastMsgId?: string;
  currMsgId?: string;
  roomInfo?: RoomInfoVO;
  gameInfo?: TPWGameInfoVO;
  betList?: PointBetCoinsVO[];
  betCoinMap?: { [key: number]: Long };
  betSelfCoinMap?: { [key: number]: Long };
  betCoinList?: Long[];
  onlinePlayers?: number;
}

export function encodeResponseTPEnterRoomVO(message: ResponseTPEnterRoomVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeResponseTPEnterRoomVO(message, bb);
  return toUint8Array(bb);
}

function _encodeResponseTPEnterRoomVO(message: ResponseTPEnterRoomVO, bb: ByteBuffer): void {
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

  // optional RoomInfoVO roomInfo = 3;
  let $roomInfo = message.roomInfo;
  if ($roomInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeRoomInfoVO($roomInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional TPWGameInfoVO gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeTPWGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated PointBetCoinsVO betList = 5;
  let array$betList = message.betList;
  if (array$betList !== undefined) {
    for (let value of array$betList) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodePointBetCoinsVO(value, nested);
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

export function decodeResponseTPEnterRoomVO(binary: Uint8Array): ResponseTPEnterRoomVO {
  return _decodeResponseTPEnterRoomVO(wrapByteBuffer(binary));
}

function _decodeResponseTPEnterRoomVO(bb: ByteBuffer): ResponseTPEnterRoomVO {
  let message: ResponseTPEnterRoomVO = {} as any;

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

      // optional RoomInfoVO roomInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.roomInfo = _decodeRoomInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // optional TPWGameInfoVO gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeTPWGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated PointBetCoinsVO betList = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.betList || (message.betList = []);
        values.push(_decodePointBetCoinsVO(bb));
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

export interface ResponseRoomRecordVO {
  gameTime?: Long;
  amount?: Long;
  winAmount?: Long;
  winnings?: number;
}

export function encodeResponseRoomRecordVO(message: ResponseRoomRecordVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeResponseRoomRecordVO(message, bb);
  return toUint8Array(bb);
}

function _encodeResponseRoomRecordVO(message: ResponseRoomRecordVO, bb: ByteBuffer): void {
  // optional int64 gameTime = 1;
  let $gameTime = message.gameTime;
  if ($gameTime !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $gameTime);
  }

  // optional int64 amount = 2;
  let $amount = message.amount;
  if ($amount !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $amount);
  }

  // optional int64 winAmount = 3;
  let $winAmount = message.winAmount;
  if ($winAmount !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $winAmount);
  }

  // optional int32 winnings = 4;
  let $winnings = message.winnings;
  if ($winnings !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($winnings));
  }
}

export function decodeResponseRoomRecordVO(binary: Uint8Array): ResponseRoomRecordVO {
  return _decodeResponseRoomRecordVO(wrapByteBuffer(binary));
}

function _decodeResponseRoomRecordVO(bb: ByteBuffer): ResponseRoomRecordVO {
  let message: ResponseRoomRecordVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 gameTime = 1;
      case 1: {
        message.gameTime = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 amount = 2;
      case 2: {
        message.amount = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 winAmount = 3;
      case 3: {
        message.winAmount = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 winnings = 4;
      case 4: {
        message.winnings = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RoomBetDTO {
  roomId?: string;
  betCoins?: Long;
  betId?: number;
  gameNum?: number;
}

export function encodeRoomBetDTO(message: RoomBetDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeRoomBetDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeRoomBetDTO(message: RoomBetDTO, bb: ByteBuffer): void {
  // optional string roomId = 1;
  let $roomId = message.roomId;
  if ($roomId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $roomId);
  }

  // optional int64 betCoins = 2;
  let $betCoins = message.betCoins;
  if ($betCoins !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $betCoins);
  }

  // optional int32 betId = 3;
  let $betId = message.betId;
  if ($betId !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($betId));
  }

  // optional int32 gameNum = 4;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($gameNum));
  }
}

export function decodeRoomBetDTO(binary: Uint8Array): RoomBetDTO {
  return _decodeRoomBetDTO(wrapByteBuffer(binary));
}

function _decodeRoomBetDTO(bb: ByteBuffer): RoomBetDTO {
  let message: RoomBetDTO = {} as any;

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

      // optional int64 betCoins = 2;
      case 2: {
        message.betCoins = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 betId = 3;
      case 3: {
        message.betId = readVarint32(bb);
        break;
      }

      // optional int32 gameNum = 4;
      case 4: {
        message.gameNum = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RoomRecordDTO {
  page?: number;
  dateType?: number;
  winLost?: number;
}

export function encodeRoomRecordDTO(message: RoomRecordDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeRoomRecordDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeRoomRecordDTO(message: RoomRecordDTO, bb: ByteBuffer): void {
  // optional int32 page = 1;
  let $page = message.page;
  if ($page !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($page));
  }

  // optional int32 dateType = 2;
  let $dateType = message.dateType;
  if ($dateType !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($dateType));
  }

  // optional int32 winLost = 3;
  let $winLost = message.winLost;
  if ($winLost !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($winLost));
  }
}

export function decodeRoomRecordDTO(binary: Uint8Array): RoomRecordDTO {
  return _decodeRoomRecordDTO(wrapByteBuffer(binary));
}

function _decodeRoomRecordDTO(bb: ByteBuffer): RoomRecordDTO {
  let message: RoomRecordDTO = {} as any;

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

      // optional int32 dateType = 2;
      case 2: {
        message.dateType = readVarint32(bb);
        break;
      }

      // optional int32 winLost = 3;
      case 3: {
        message.winLost = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NotifyBetVO {
  notifyType?: number;
  betCoinMap?: { [key: number]: Long };
  betList?: PointBetCoinsVO[];
}

export function encodeNotifyBetVO(message: NotifyBetVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyBetVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyBetVO(message: NotifyBetVO, bb: ByteBuffer): void {
  // optional int32 notifyType = 1;
  let $notifyType = message.notifyType;
  if ($notifyType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($notifyType));
  }

  // optional map<int32, int64> betCoinMap = 2;
  let map$betCoinMap = message.betCoinMap;
  if (map$betCoinMap !== undefined) {
    for (let key in map$betCoinMap) {
      let nested = popByteBuffer();
      let value = map$betCoinMap[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 18);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated PointBetCoinsVO betList = 3;
  let array$betList = message.betList;
  if (array$betList !== undefined) {
    for (let value of array$betList) {
      writeVarint32(bb, 26);
      let nested = popByteBuffer();
      _encodePointBetCoinsVO(value, nested);
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

      // optional int32 notifyType = 1;
      case 1: {
        message.notifyType = readVarint32(bb);
        break;
      }

      // optional map<int32, int64> betCoinMap = 2;
      case 2: {
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

      // repeated PointBetCoinsVO betList = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        let values = message.betList || (message.betList = []);
        values.push(_decodePointBetCoinsVO(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RoomInfoVO {
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
  roomState?: number;
}

export function encodeRoomInfoVO(message: RoomInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeRoomInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeRoomInfoVO(message: RoomInfoVO, bb: ByteBuffer): void {
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

  // optional int32 roomState = 12;
  let $roomState = message.roomState;
  if ($roomState !== undefined) {
    writeVarint32(bb, 96);
    writeVarint64(bb, intToLong($roomState));
  }
}

export function decodeRoomInfoVO(binary: Uint8Array): RoomInfoVO {
  return _decodeRoomInfoVO(wrapByteBuffer(binary));
}

function _decodeRoomInfoVO(bb: ByteBuffer): RoomInfoVO {
  let message: RoomInfoVO = {} as any;

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

      // optional int32 roomState = 12;
      case 12: {
        message.roomState = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NotifyD3BeginBetVO {
  notifyType?: number;
  lastMsgId?: string;
  currMsgId?: string;
  gameInfo?: D3GameInfoVO;
}

export function encodeNotifyD3BeginBetVO(message: NotifyD3BeginBetVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyD3BeginBetVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyD3BeginBetVO(message: NotifyD3BeginBetVO, bb: ByteBuffer): void {
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

  // optional D3GameInfoVO gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeD3GameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeNotifyD3BeginBetVO(binary: Uint8Array): NotifyD3BeginBetVO {
  return _decodeNotifyD3BeginBetVO(wrapByteBuffer(binary));
}

function _decodeNotifyD3BeginBetVO(bb: ByteBuffer): NotifyD3BeginBetVO {
  let message: NotifyD3BeginBetVO = {} as any;

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

      // optional D3GameInfoVO gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeD3GameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NotifyDTBeginBetVO {
  notifyType?: number;
  lastMsgId?: string;
  currMsgId?: string;
  gameInfo?: DTGameInfoVO;
}

export function encodeNotifyDTBeginBetVO(message: NotifyDTBeginBetVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyDTBeginBetVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyDTBeginBetVO(message: NotifyDTBeginBetVO, bb: ByteBuffer): void {
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

  // optional DTGameInfoVO gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeDTGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeNotifyDTBeginBetVO(binary: Uint8Array): NotifyDTBeginBetVO {
  return _decodeNotifyDTBeginBetVO(wrapByteBuffer(binary));
}

function _decodeNotifyDTBeginBetVO(bb: ByteBuffer): NotifyDTBeginBetVO {
  let message: NotifyDTBeginBetVO = {} as any;

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

      // optional DTGameInfoVO gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeDTGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RYBGameInfoVO {
  gameNum?: number;
  bankerId?: string;
  currOptUserId?: string;
  totalOptSeconds?: number;
  leftOptSeconds?: number;
  dealCardMilliseconds?: Long;
  leftPaiNum?: number;
  qiPai?: string;
  turnType?: number;
  OddsInfoList?: OddsInfoVO[];
  gameResultList?: RYBWinVO[];
}

export function encodeRYBGameInfoVO(message: RYBGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeRYBGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeRYBGameInfoVO(message: RYBGameInfoVO, bb: ByteBuffer): void {
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

  // repeated OddsInfoVO OddsInfoList = 10;
  let array$OddsInfoList = message.OddsInfoList;
  if (array$OddsInfoList !== undefined) {
    for (let value of array$OddsInfoList) {
      writeVarint32(bb, 82);
      let nested = popByteBuffer();
      _encodeOddsInfoVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated RYBWinVO gameResultList = 11;
  let array$gameResultList = message.gameResultList;
  if (array$gameResultList !== undefined) {
    for (let value of array$gameResultList) {
      writeVarint32(bb, 90);
      let nested = popByteBuffer();
      _encodeRYBWinVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeRYBGameInfoVO(binary: Uint8Array): RYBGameInfoVO {
  return _decodeRYBGameInfoVO(wrapByteBuffer(binary));
}

function _decodeRYBGameInfoVO(bb: ByteBuffer): RYBGameInfoVO {
  let message: RYBGameInfoVO = {} as any;

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

      // repeated OddsInfoVO OddsInfoList = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        let values = message.OddsInfoList || (message.OddsInfoList = []);
        values.push(_decodeOddsInfoVO(bb));
        bb.limit = limit;
        break;
      }

      // repeated RYBWinVO gameResultList = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        let values = message.gameResultList || (message.gameResultList = []);
        values.push(_decodeRYBWinVO(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LBWinVO {
  gameNum?: number;
  id?: number[];
  ball?: number;
}

export function encodeLBWinVO(message: LBWinVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeLBWinVO(message, bb);
  return toUint8Array(bb);
}

function _encodeLBWinVO(message: LBWinVO, bb: ByteBuffer): void {
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
}

export function decodeLBWinVO(binary: Uint8Array): LBWinVO {
  return _decodeLBWinVO(wrapByteBuffer(binary));
}

function _decodeLBWinVO(bb: ByteBuffer): LBWinVO {
  let message: LBWinVO = {} as any;

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

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ResponseRYBEnterRoomVO {
  lastMsgId?: string;
  currMsgId?: string;
  roomInfo?: RoomInfoVO;
  gameInfo?: RYBGameInfoVO;
  betList?: PointBetCoinsVO[];
  betCoinMap?: { [key: number]: Long };
  betSelfCoinMap?: { [key: number]: Long };
  betCoinList?: Long[];
  onlinePlayers?: number;
}

export function encodeResponseRYBEnterRoomVO(message: ResponseRYBEnterRoomVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeResponseRYBEnterRoomVO(message, bb);
  return toUint8Array(bb);
}

function _encodeResponseRYBEnterRoomVO(message: ResponseRYBEnterRoomVO, bb: ByteBuffer): void {
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

  // optional RoomInfoVO roomInfo = 3;
  let $roomInfo = message.roomInfo;
  if ($roomInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeRoomInfoVO($roomInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional RYBGameInfoVO gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeRYBGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated PointBetCoinsVO betList = 5;
  let array$betList = message.betList;
  if (array$betList !== undefined) {
    for (let value of array$betList) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodePointBetCoinsVO(value, nested);
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

export function decodeResponseRYBEnterRoomVO(binary: Uint8Array): ResponseRYBEnterRoomVO {
  return _decodeResponseRYBEnterRoomVO(wrapByteBuffer(binary));
}

function _decodeResponseRYBEnterRoomVO(bb: ByteBuffer): ResponseRYBEnterRoomVO {
  let message: ResponseRYBEnterRoomVO = {} as any;

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

      // optional RoomInfoVO roomInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.roomInfo = _decodeRoomInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // optional RYBGameInfoVO gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeRYBGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated PointBetCoinsVO betList = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.betList || (message.betList = []);
        values.push(_decodePointBetCoinsVO(bb));
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

export interface LBGameInfoVO {
  gameNum?: number;
  bankerId?: string;
  currOptUserId?: string;
  totalOptSeconds?: number;
  leftOptSeconds?: number;
  dealCardMilliseconds?: Long;
  leftPaiNum?: number;
  qiPai?: string;
  turnType?: number;
  oddsInfoList?: OddsInfoVO[];
  gameResultList?: LBWinVO[];
}

export function encodeLBGameInfoVO(message: LBGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeLBGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeLBGameInfoVO(message: LBGameInfoVO, bb: ByteBuffer): void {
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

  // repeated OddsInfoVO oddsInfoList = 10;
  let array$oddsInfoList = message.oddsInfoList;
  if (array$oddsInfoList !== undefined) {
    for (let value of array$oddsInfoList) {
      writeVarint32(bb, 82);
      let nested = popByteBuffer();
      _encodeOddsInfoVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated LBWinVO gameResultList = 11;
  let array$gameResultList = message.gameResultList;
  if (array$gameResultList !== undefined) {
    for (let value of array$gameResultList) {
      writeVarint32(bb, 90);
      let nested = popByteBuffer();
      _encodeLBWinVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeLBGameInfoVO(binary: Uint8Array): LBGameInfoVO {
  return _decodeLBGameInfoVO(wrapByteBuffer(binary));
}

function _decodeLBGameInfoVO(bb: ByteBuffer): LBGameInfoVO {
  let message: LBGameInfoVO = {} as any;

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

      // repeated OddsInfoVO oddsInfoList = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        let values = message.oddsInfoList || (message.oddsInfoList = []);
        values.push(_decodeOddsInfoVO(bb));
        bb.limit = limit;
        break;
      }

      // repeated LBWinVO gameResultList = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        let values = message.gameResultList || (message.gameResultList = []);
        values.push(_decodeLBWinVO(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface JMGameInfoVO {
  gameNum?: number;
  bankerId?: string;
  currOptUserId?: string;
  totalOptSeconds?: number;
  leftOptSeconds?: number;
  dealCardMilliseconds?: Long;
  leftPaiNum?: number;
  qiPai?: string;
  turnType?: number;
  oddsInfoList?: OddsInfoVO[];
  gameResultList?: JMWinVO[];
}

export function encodeJMGameInfoVO(message: JMGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeJMGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeJMGameInfoVO(message: JMGameInfoVO, bb: ByteBuffer): void {
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

  // repeated OddsInfoVO oddsInfoList = 10;
  let array$oddsInfoList = message.oddsInfoList;
  if (array$oddsInfoList !== undefined) {
    for (let value of array$oddsInfoList) {
      writeVarint32(bb, 82);
      let nested = popByteBuffer();
      _encodeOddsInfoVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated JMWinVO gameResultList = 11;
  let array$gameResultList = message.gameResultList;
  if (array$gameResultList !== undefined) {
    for (let value of array$gameResultList) {
      writeVarint32(bb, 90);
      let nested = popByteBuffer();
      _encodeJMWinVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeJMGameInfoVO(binary: Uint8Array): JMGameInfoVO {
  return _decodeJMGameInfoVO(wrapByteBuffer(binary));
}

function _decodeJMGameInfoVO(bb: ByteBuffer): JMGameInfoVO {
  let message: JMGameInfoVO = {} as any;

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

      // repeated OddsInfoVO oddsInfoList = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        let values = message.oddsInfoList || (message.oddsInfoList = []);
        values.push(_decodeOddsInfoVO(bb));
        bb.limit = limit;
        break;
      }

      // repeated JMWinVO gameResultList = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        let values = message.gameResultList || (message.gameResultList = []);
        values.push(_decodeJMWinVO(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DTGameInfoVO {
  gameNum?: number;
  bankerId?: string;
  currOptUserId?: string;
  totalOptSeconds?: number;
  leftOptSeconds?: number;
  dealCardMilliseconds?: Long;
  leftPaiNum?: number;
  qiPai?: string;
  turnType?: number;
  pokerResultList?: DTPokerResultVO[];
  OddsInfoList?: OddsInfoVO[];
  gameResultList?: number[];
  gameResultWinUserDtoList?: DTWinUserVO[];
  diPaiCount?: number;
  qiPaiCount?: number;
}

export function encodeDTGameInfoVO(message: DTGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeDTGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeDTGameInfoVO(message: DTGameInfoVO, bb: ByteBuffer): void {
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

  // repeated DTPokerResultVO pokerResultList = 10;
  let array$pokerResultList = message.pokerResultList;
  if (array$pokerResultList !== undefined) {
    for (let value of array$pokerResultList) {
      writeVarint32(bb, 82);
      let nested = popByteBuffer();
      _encodeDTPokerResultVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated OddsInfoVO OddsInfoList = 11;
  let array$OddsInfoList = message.OddsInfoList;
  if (array$OddsInfoList !== undefined) {
    for (let value of array$OddsInfoList) {
      writeVarint32(bb, 90);
      let nested = popByteBuffer();
      _encodeOddsInfoVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated int32 gameResultList = 12;
  let array$gameResultList = message.gameResultList;
  if (array$gameResultList !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$gameResultList) {
      writeVarint64(packed, intToLong(value));
    }
    writeVarint32(bb, 98);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // repeated DTWinUserVO gameResultWinUserDtoList = 13;
  let array$gameResultWinUserDtoList = message.gameResultWinUserDtoList;
  if (array$gameResultWinUserDtoList !== undefined) {
    for (let value of array$gameResultWinUserDtoList) {
      writeVarint32(bb, 106);
      let nested = popByteBuffer();
      _encodeDTWinUserVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional int32 diPaiCount = 14;
  let $diPaiCount = message.diPaiCount;
  if ($diPaiCount !== undefined) {
    writeVarint32(bb, 112);
    writeVarint64(bb, intToLong($diPaiCount));
  }

  // optional int32 qiPaiCount = 15;
  let $qiPaiCount = message.qiPaiCount;
  if ($qiPaiCount !== undefined) {
    writeVarint32(bb, 120);
    writeVarint64(bb, intToLong($qiPaiCount));
  }
}

export function decodeDTGameInfoVO(binary: Uint8Array): DTGameInfoVO {
  return _decodeDTGameInfoVO(wrapByteBuffer(binary));
}

function _decodeDTGameInfoVO(bb: ByteBuffer): DTGameInfoVO {
  let message: DTGameInfoVO = {} as any;

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

      // repeated DTPokerResultVO pokerResultList = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        let values = message.pokerResultList || (message.pokerResultList = []);
        values.push(_decodeDTPokerResultVO(bb));
        bb.limit = limit;
        break;
      }

      // repeated OddsInfoVO OddsInfoList = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        let values = message.OddsInfoList || (message.OddsInfoList = []);
        values.push(_decodeOddsInfoVO(bb));
        bb.limit = limit;
        break;
      }

      // repeated int32 gameResultList = 12;
      case 12: {
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

      // repeated DTWinUserVO gameResultWinUserDtoList = 13;
      case 13: {
        let limit = pushTemporaryLength(bb);
        let values = message.gameResultWinUserDtoList || (message.gameResultWinUserDtoList = []);
        values.push(_decodeDTWinUserVO(bb));
        bb.limit = limit;
        break;
      }

      // optional int32 diPaiCount = 14;
      case 14: {
        message.diPaiCount = readVarint32(bb);
        break;
      }

      // optional int32 qiPaiCount = 15;
      case 15: {
        message.qiPaiCount = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NotifyLBDrawVO {
  notifyType?: number;
  playerResult?: number;
  gameInfo?: NotifyLBDrawGameInfoVO;
  userInfoList?: RoomUserVO[];
  gameResult?: LBWinVO;
}

export function encodeNotifyLBDrawVO(message: NotifyLBDrawVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyLBDrawVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyLBDrawVO(message: NotifyLBDrawVO, bb: ByteBuffer): void {
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

  // optional NotifyLBDrawGameInfoVO gameInfo = 3;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeNotifyLBDrawGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated RoomUserVO userInfoList = 4;
  let array$userInfoList = message.userInfoList;
  if (array$userInfoList !== undefined) {
    for (let value of array$userInfoList) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeRoomUserVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional LBWinVO gameResult = 5;
  let $gameResult = message.gameResult;
  if ($gameResult !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeLBWinVO($gameResult, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeNotifyLBDrawVO(binary: Uint8Array): NotifyLBDrawVO {
  return _decodeNotifyLBDrawVO(wrapByteBuffer(binary));
}

function _decodeNotifyLBDrawVO(bb: ByteBuffer): NotifyLBDrawVO {
  let message: NotifyLBDrawVO = {} as any;

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

      // optional NotifyLBDrawGameInfoVO gameInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeNotifyLBDrawGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated RoomUserVO userInfoList = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.userInfoList || (message.userInfoList = []);
        values.push(_decodeRoomUserVO(bb));
        bb.limit = limit;
        break;
      }

      // optional LBWinVO gameResult = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.gameResult = _decodeLBWinVO(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface TPWGameInfoVO {
  gameNum?: number;
  bankerId?: string;
  currOptUserId?: string;
  totalOptSeconds?: number;
  leftOptSeconds?: number;
  dealCardMilliseconds?: Long;
  leftPaiNum?: number;
  qiPai?: string;
  turnType?: number;
  oddsInfoList?: TPWOddsInfoVO[];
  gameResultList?: TPWWinVO[];
}

export function encodeTPWGameInfoVO(message: TPWGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeTPWGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeTPWGameInfoVO(message: TPWGameInfoVO, bb: ByteBuffer): void {
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

  // repeated TPWOddsInfoVO oddsInfoList = 10;
  let array$oddsInfoList = message.oddsInfoList;
  if (array$oddsInfoList !== undefined) {
    for (let value of array$oddsInfoList) {
      writeVarint32(bb, 82);
      let nested = popByteBuffer();
      _encodeTPWOddsInfoVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated TPWWinVO gameResultList = 11;
  let array$gameResultList = message.gameResultList;
  if (array$gameResultList !== undefined) {
    for (let value of array$gameResultList) {
      writeVarint32(bb, 90);
      let nested = popByteBuffer();
      _encodeTPWWinVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeTPWGameInfoVO(binary: Uint8Array): TPWGameInfoVO {
  return _decodeTPWGameInfoVO(wrapByteBuffer(binary));
}

function _decodeTPWGameInfoVO(bb: ByteBuffer): TPWGameInfoVO {
  let message: TPWGameInfoVO = {} as any;

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

      // repeated TPWOddsInfoVO oddsInfoList = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        let values = message.oddsInfoList || (message.oddsInfoList = []);
        values.push(_decodeTPWOddsInfoVO(bb));
        bb.limit = limit;
        break;
      }

      // repeated TPWWinVO gameResultList = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        let values = message.gameResultList || (message.gameResultList = []);
        values.push(_decodeTPWWinVO(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AreaPointBetCoinsVO {
  betId?: number;
  coins?: Long;
  areaCoins?: Long;
}

export function encodeAreaPointBetCoinsVO(message: AreaPointBetCoinsVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeAreaPointBetCoinsVO(message, bb);
  return toUint8Array(bb);
}

function _encodeAreaPointBetCoinsVO(message: AreaPointBetCoinsVO, bb: ByteBuffer): void {
  // optional int32 betId = 1;
  let $betId = message.betId;
  if ($betId !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($betId));
  }

  // optional int64 coins = 2;
  let $coins = message.coins;
  if ($coins !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $coins);
  }

  // optional int64 areaCoins = 3;
  let $areaCoins = message.areaCoins;
  if ($areaCoins !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $areaCoins);
  }
}

export function decodeAreaPointBetCoinsVO(binary: Uint8Array): AreaPointBetCoinsVO {
  return _decodeAreaPointBetCoinsVO(wrapByteBuffer(binary));
}

function _decodeAreaPointBetCoinsVO(bb: ByteBuffer): AreaPointBetCoinsVO {
  let message: AreaPointBetCoinsVO = {} as any;

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

      // optional int64 coins = 2;
      case 2: {
        message.coins = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 areaCoins = 3;
      case 3: {
        message.areaCoins = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DTPokerResultVO {
  id?: number;
  point?: string;
}

export function encodeDTPokerResultVO(message: DTPokerResultVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeDTPokerResultVO(message, bb);
  return toUint8Array(bb);
}

function _encodeDTPokerResultVO(message: DTPokerResultVO, bb: ByteBuffer): void {
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

export function decodeDTPokerResultVO(binary: Uint8Array): DTPokerResultVO {
  return _decodeDTPokerResultVO(wrapByteBuffer(binary));
}

function _decodeDTPokerResultVO(bb: ByteBuffer): DTPokerResultVO {
  let message: DTPokerResultVO = {} as any;

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

export interface DTWinUserVO {
  gameNum?: number;
  dragon?: DTPokerResultVO;
  tiger?: DTPokerResultVO;
  battleIdEnum?: number;
}

export function encodeDTWinUserVO(message: DTWinUserVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeDTWinUserVO(message, bb);
  return toUint8Array(bb);
}

function _encodeDTWinUserVO(message: DTWinUserVO, bb: ByteBuffer): void {
  // optional int32 gameNum = 1;
  let $gameNum = message.gameNum;
  if ($gameNum !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($gameNum));
  }

  // optional DTPokerResultVO dragon = 2;
  let $dragon = message.dragon;
  if ($dragon !== undefined) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeDTPokerResultVO($dragon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional DTPokerResultVO tiger = 3;
  let $tiger = message.tiger;
  if ($tiger !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeDTPokerResultVO($tiger, nested);
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
}

export function decodeDTWinUserVO(binary: Uint8Array): DTWinUserVO {
  return _decodeDTWinUserVO(wrapByteBuffer(binary));
}

function _decodeDTWinUserVO(bb: ByteBuffer): DTWinUserVO {
  let message: DTWinUserVO = {} as any;

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

      // optional DTPokerResultVO dragon = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.dragon = _decodeDTPokerResultVO(bb);
        bb.limit = limit;
        break;
      }

      // optional DTPokerResultVO tiger = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.tiger = _decodeDTPokerResultVO(bb);
        bb.limit = limit;
        break;
      }

      // optional int32 battleIdEnum = 4;
      case 4: {
        message.battleIdEnum = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NotifyLDDrawVO {
  notifyType?: number;
  playerResult?: number;
  gameInfo?: NotifyLDDrawGameInfoVO;
  userInfoList?: RoomUserVO[];
  gameResult?: LDWinVO;
}

export function encodeNotifyLDDrawVO(message: NotifyLDDrawVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyLDDrawVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyLDDrawVO(message: NotifyLDDrawVO, bb: ByteBuffer): void {
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

  // optional NotifyLDDrawGameInfoVO gameInfo = 3;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeNotifyLDDrawGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated RoomUserVO userInfoList = 4;
  let array$userInfoList = message.userInfoList;
  if (array$userInfoList !== undefined) {
    for (let value of array$userInfoList) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeRoomUserVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional LDWinVO gameResult = 5;
  let $gameResult = message.gameResult;
  if ($gameResult !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeLDWinVO($gameResult, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeNotifyLDDrawVO(binary: Uint8Array): NotifyLDDrawVO {
  return _decodeNotifyLDDrawVO(wrapByteBuffer(binary));
}

function _decodeNotifyLDDrawVO(bb: ByteBuffer): NotifyLDDrawVO {
  let message: NotifyLDDrawVO = {} as any;

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

      // optional NotifyLDDrawGameInfoVO gameInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeNotifyLDDrawGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated RoomUserVO userInfoList = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.userInfoList || (message.userInfoList = []);
        values.push(_decodeRoomUserVO(bb));
        bb.limit = limit;
        break;
      }

      // optional LDWinVO gameResult = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.gameResult = _decodeLDWinVO(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NotifyD3DrawGameInfoVO {
  leftOptSeconds?: number;
  gameNum?: number;
  onlinePlayers?: number;
}

export function encodeNotifyD3DrawGameInfoVO(message: NotifyD3DrawGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyD3DrawGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyD3DrawGameInfoVO(message: NotifyD3DrawGameInfoVO, bb: ByteBuffer): void {
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

export function decodeNotifyD3DrawGameInfoVO(binary: Uint8Array): NotifyD3DrawGameInfoVO {
  return _decodeNotifyD3DrawGameInfoVO(wrapByteBuffer(binary));
}

function _decodeNotifyD3DrawGameInfoVO(bb: ByteBuffer): NotifyD3DrawGameInfoVO {
  let message: NotifyD3DrawGameInfoVO = {} as any;

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

export interface NotifyRYBDrawVO {
  notifyType?: number;
  playerResult?: number;
  gameInfo?: NotifyRYBDrawGameInfoVO;
  userInfoList?: RoomUserVO[];
  gameResult?: RYBWinVO;
}

export function encodeNotifyRYBDrawVO(message: NotifyRYBDrawVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyRYBDrawVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyRYBDrawVO(message: NotifyRYBDrawVO, bb: ByteBuffer): void {
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

  // optional NotifyRYBDrawGameInfoVO gameInfo = 3;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeNotifyRYBDrawGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated RoomUserVO userInfoList = 4;
  let array$userInfoList = message.userInfoList;
  if (array$userInfoList !== undefined) {
    for (let value of array$userInfoList) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeRoomUserVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional RYBWinVO gameResult = 5;
  let $gameResult = message.gameResult;
  if ($gameResult !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeRYBWinVO($gameResult, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeNotifyRYBDrawVO(binary: Uint8Array): NotifyRYBDrawVO {
  return _decodeNotifyRYBDrawVO(wrapByteBuffer(binary));
}

function _decodeNotifyRYBDrawVO(bb: ByteBuffer): NotifyRYBDrawVO {
  let message: NotifyRYBDrawVO = {} as any;

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

      // optional NotifyRYBDrawGameInfoVO gameInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeNotifyRYBDrawGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated RoomUserVO userInfoList = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.userInfoList || (message.userInfoList = []);
        values.push(_decodeRoomUserVO(bb));
        bb.limit = limit;
        break;
      }

      // optional RYBWinVO gameResult = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.gameResult = _decodeRYBWinVO(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LDWinVO {
  gameNum?: number;
  id?: number;
  dices?: number[];
}

export function encodeLDWinVO(message: LDWinVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeLDWinVO(message, bb);
  return toUint8Array(bb);
}

function _encodeLDWinVO(message: LDWinVO, bb: ByteBuffer): void {
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
}

export function decodeLDWinVO(binary: Uint8Array): LDWinVO {
  return _decodeLDWinVO(wrapByteBuffer(binary));
}

function _decodeLDWinVO(bb: ByteBuffer): LDWinVO {
  let message: LDWinVO = {} as any;

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

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NotifyJMDrawGameInfoVO {
  leftOptSeconds?: number;
  gameNum?: number;
  onlinePlayers?: number;
}

export function encodeNotifyJMDrawGameInfoVO(message: NotifyJMDrawGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyJMDrawGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyJMDrawGameInfoVO(message: NotifyJMDrawGameInfoVO, bb: ByteBuffer): void {
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

export function decodeNotifyJMDrawGameInfoVO(binary: Uint8Array): NotifyJMDrawGameInfoVO {
  return _decodeNotifyJMDrawGameInfoVO(wrapByteBuffer(binary));
}

function _decodeNotifyJMDrawGameInfoVO(bb: ByteBuffer): NotifyJMDrawGameInfoVO {
  let message: NotifyJMDrawGameInfoVO = {} as any;

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

export interface NotifyPKDrawGameInfoVO {
  leftOptSeconds?: number;
  gameNum?: number;
  onlinePlayers?: number;
}

export function encodeNotifyPKDrawGameInfoVO(message: NotifyPKDrawGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyPKDrawGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyPKDrawGameInfoVO(message: NotifyPKDrawGameInfoVO, bb: ByteBuffer): void {
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

export function decodeNotifyPKDrawGameInfoVO(binary: Uint8Array): NotifyPKDrawGameInfoVO {
  return _decodeNotifyPKDrawGameInfoVO(wrapByteBuffer(binary));
}

function _decodeNotifyPKDrawGameInfoVO(bb: ByteBuffer): NotifyPKDrawGameInfoVO {
  let message: NotifyPKDrawGameInfoVO = {} as any;

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

export interface NotifyTPWDrawVO {
  notifyType?: number;
  playerResult?: number;
  gameInfo?: NotifyTPWDrawGameInfoVO;
  userInfoList?: RoomUserVO[];
  gameResult?: TPWWinVO;
}

export function encodeNotifyTPWDrawVO(message: NotifyTPWDrawVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyTPWDrawVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyTPWDrawVO(message: NotifyTPWDrawVO, bb: ByteBuffer): void {
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

  // optional NotifyTPWDrawGameInfoVO gameInfo = 3;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeNotifyTPWDrawGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated RoomUserVO userInfoList = 4;
  let array$userInfoList = message.userInfoList;
  if (array$userInfoList !== undefined) {
    for (let value of array$userInfoList) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeRoomUserVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional TPWWinVO gameResult = 5;
  let $gameResult = message.gameResult;
  if ($gameResult !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeTPWWinVO($gameResult, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeNotifyTPWDrawVO(binary: Uint8Array): NotifyTPWDrawVO {
  return _decodeNotifyTPWDrawVO(wrapByteBuffer(binary));
}

function _decodeNotifyTPWDrawVO(bb: ByteBuffer): NotifyTPWDrawVO {
  let message: NotifyTPWDrawVO = {} as any;

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

      // optional NotifyTPWDrawGameInfoVO gameInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeNotifyTPWDrawGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated RoomUserVO userInfoList = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.userInfoList || (message.userInfoList = []);
        values.push(_decodeRoomUserVO(bb));
        bb.limit = limit;
        break;
      }

      // optional TPWWinVO gameResult = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.gameResult = _decodeTPWWinVO(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NotifyPKBeginBetVO {
  notifyType?: number;
  lastMsgId?: string;
  currMsgId?: string;
  gameInfo?: PKGameInfoVO;
}

export function encodeNotifyPKBeginBetVO(message: NotifyPKBeginBetVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyPKBeginBetVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyPKBeginBetVO(message: NotifyPKBeginBetVO, bb: ByteBuffer): void {
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

  // optional PKGameInfoVO gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodePKGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeNotifyPKBeginBetVO(binary: Uint8Array): NotifyPKBeginBetVO {
  return _decodeNotifyPKBeginBetVO(wrapByteBuffer(binary));
}

function _decodeNotifyPKBeginBetVO(bb: ByteBuffer): NotifyPKBeginBetVO {
  let message: NotifyPKBeginBetVO = {} as any;

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

      // optional PKGameInfoVO gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodePKGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NotifyLBDrawGameInfoVO {
  leftOptSeconds?: number;
  gameNum?: number;
  onlinePlayers?: number;
}

export function encodeNotifyLBDrawGameInfoVO(message: NotifyLBDrawGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyLBDrawGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyLBDrawGameInfoVO(message: NotifyLBDrawGameInfoVO, bb: ByteBuffer): void {
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

export function decodeNotifyLBDrawGameInfoVO(binary: Uint8Array): NotifyLBDrawGameInfoVO {
  return _decodeNotifyLBDrawGameInfoVO(wrapByteBuffer(binary));
}

function _decodeNotifyLBDrawGameInfoVO(bb: ByteBuffer): NotifyLBDrawGameInfoVO {
  let message: NotifyLBDrawGameInfoVO = {} as any;

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

export interface NotifyDTDrawGameInfoVO {
  leftOptSeconds?: number;
  pokerResultList?: DTPokerResultVO[];
  gameNum?: number;
  onlinePlayers?: number;
}

export function encodeNotifyDTDrawGameInfoVO(message: NotifyDTDrawGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyDTDrawGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyDTDrawGameInfoVO(message: NotifyDTDrawGameInfoVO, bb: ByteBuffer): void {
  // optional int32 leftOptSeconds = 1;
  let $leftOptSeconds = message.leftOptSeconds;
  if ($leftOptSeconds !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($leftOptSeconds));
  }

  // repeated DTPokerResultVO pokerResultList = 2;
  let array$pokerResultList = message.pokerResultList;
  if (array$pokerResultList !== undefined) {
    for (let value of array$pokerResultList) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeDTPokerResultVO(value, nested);
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

export function decodeNotifyDTDrawGameInfoVO(binary: Uint8Array): NotifyDTDrawGameInfoVO {
  return _decodeNotifyDTDrawGameInfoVO(wrapByteBuffer(binary));
}

function _decodeNotifyDTDrawGameInfoVO(bb: ByteBuffer): NotifyDTDrawGameInfoVO {
  let message: NotifyDTDrawGameInfoVO = {} as any;

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

      // repeated DTPokerResultVO pokerResultList = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.pokerResultList || (message.pokerResultList = []);
        values.push(_decodeDTPokerResultVO(bb));
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

export interface NotifyJMBeginBetVO {
  notifyType?: number;
  lastMsgId?: string;
  currMsgId?: string;
  gameInfo?: JMGameInfoVO;
}

export function encodeNotifyJMBeginBetVO(message: NotifyJMBeginBetVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyJMBeginBetVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyJMBeginBetVO(message: NotifyJMBeginBetVO, bb: ByteBuffer): void {
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

  // optional JMGameInfoVO gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeJMGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeNotifyJMBeginBetVO(binary: Uint8Array): NotifyJMBeginBetVO {
  return _decodeNotifyJMBeginBetVO(wrapByteBuffer(binary));
}

function _decodeNotifyJMBeginBetVO(bb: ByteBuffer): NotifyJMBeginBetVO {
  let message: NotifyJMBeginBetVO = {} as any;

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

      // optional JMGameInfoVO gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeJMGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ResponsePKEnterRoomVO {
  lastMsgId?: string;
  currMsgId?: string;
  roomInfo?: RoomInfoVO;
  gameInfo?: PKGameInfoVO;
  betList?: PointBetCoinsVO[];
  betCoinMap?: { [key: number]: Long };
  betSelfCoinMap?: { [key: number]: Long };
  betCoinList?: Long[];
  onlinePlayers?: number;
}

export function encodeResponsePKEnterRoomVO(message: ResponsePKEnterRoomVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeResponsePKEnterRoomVO(message, bb);
  return toUint8Array(bb);
}

function _encodeResponsePKEnterRoomVO(message: ResponsePKEnterRoomVO, bb: ByteBuffer): void {
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

  // optional RoomInfoVO roomInfo = 3;
  let $roomInfo = message.roomInfo;
  if ($roomInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeRoomInfoVO($roomInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PKGameInfoVO gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodePKGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated PointBetCoinsVO betList = 5;
  let array$betList = message.betList;
  if (array$betList !== undefined) {
    for (let value of array$betList) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodePointBetCoinsVO(value, nested);
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

export function decodeResponsePKEnterRoomVO(binary: Uint8Array): ResponsePKEnterRoomVO {
  return _decodeResponsePKEnterRoomVO(wrapByteBuffer(binary));
}

function _decodeResponsePKEnterRoomVO(bb: ByteBuffer): ResponsePKEnterRoomVO {
  let message: ResponsePKEnterRoomVO = {} as any;

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

      // optional RoomInfoVO roomInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.roomInfo = _decodeRoomInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // optional PKGameInfoVO gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodePKGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated PointBetCoinsVO betList = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.betList || (message.betList = []);
        values.push(_decodePointBetCoinsVO(bb));
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

export interface NotifyD3DrawVO {
  notifyType?: number;
  playerResult?: number;
  gameInfo?: NotifyD3DrawGameInfoVO;
  userInfoList?: RoomUserVO[];
  gameResult?: D3WinVO;
}

export function encodeNotifyD3DrawVO(message: NotifyD3DrawVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyD3DrawVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyD3DrawVO(message: NotifyD3DrawVO, bb: ByteBuffer): void {
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

  // optional NotifyD3DrawGameInfoVO gameInfo = 3;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeNotifyD3DrawGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated RoomUserVO userInfoList = 4;
  let array$userInfoList = message.userInfoList;
  if (array$userInfoList !== undefined) {
    for (let value of array$userInfoList) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeRoomUserVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional D3WinVO gameResult = 5;
  let $gameResult = message.gameResult;
  if ($gameResult !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeD3WinVO($gameResult, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeNotifyD3DrawVO(binary: Uint8Array): NotifyD3DrawVO {
  return _decodeNotifyD3DrawVO(wrapByteBuffer(binary));
}

function _decodeNotifyD3DrawVO(bb: ByteBuffer): NotifyD3DrawVO {
  let message: NotifyD3DrawVO = {} as any;

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

      // optional NotifyD3DrawGameInfoVO gameInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeNotifyD3DrawGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated RoomUserVO userInfoList = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.userInfoList || (message.userInfoList = []);
        values.push(_decodeRoomUserVO(bb));
        bb.limit = limit;
        break;
      }

      // optional D3WinVO gameResult = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.gameResult = _decodeD3WinVO(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ResponseLDEnterRoomVO {
  lastMsgId?: string;
  currMsgId?: string;
  roomInfo?: RoomInfoVO;
  gameInfo?: LDGameInfoVO;
  betList?: PointBetCoinsVO[];
  betCoinMap?: { [key: number]: Long };
  betSelfCoinMap?: { [key: number]: Long };
  betCoinList?: Long[];
  onlinePlayers?: number;
}

export function encodeResponseLDEnterRoomVO(message: ResponseLDEnterRoomVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeResponseLDEnterRoomVO(message, bb);
  return toUint8Array(bb);
}

function _encodeResponseLDEnterRoomVO(message: ResponseLDEnterRoomVO, bb: ByteBuffer): void {
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

  // optional RoomInfoVO roomInfo = 3;
  let $roomInfo = message.roomInfo;
  if ($roomInfo !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeRoomInfoVO($roomInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional LDGameInfoVO gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeLDGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated PointBetCoinsVO betList = 5;
  let array$betList = message.betList;
  if (array$betList !== undefined) {
    for (let value of array$betList) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodePointBetCoinsVO(value, nested);
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

export function decodeResponseLDEnterRoomVO(binary: Uint8Array): ResponseLDEnterRoomVO {
  return _decodeResponseLDEnterRoomVO(wrapByteBuffer(binary));
}

function _decodeResponseLDEnterRoomVO(bb: ByteBuffer): ResponseLDEnterRoomVO {
  let message: ResponseLDEnterRoomVO = {} as any;

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

      // optional RoomInfoVO roomInfo = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.roomInfo = _decodeRoomInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // optional LDGameInfoVO gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeLDGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated PointBetCoinsVO betList = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.betList || (message.betList = []);
        values.push(_decodePointBetCoinsVO(bb));
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

export interface NotifyDTDrawVO {
  notifyType?: number;
  playerResult?: number;
  headWinnerList?: NotifyDTWinnerVO[];
  gameInfo?: NotifyDTDrawGameInfoVO;
  userInfoList?: RoomUserVO[];
  gameResult?: number;
}

export function encodeNotifyDTDrawVO(message: NotifyDTDrawVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyDTDrawVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyDTDrawVO(message: NotifyDTDrawVO, bb: ByteBuffer): void {
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

  // repeated NotifyDTWinnerVO headWinnerList = 3;
  let array$headWinnerList = message.headWinnerList;
  if (array$headWinnerList !== undefined) {
    for (let value of array$headWinnerList) {
      writeVarint32(bb, 26);
      let nested = popByteBuffer();
      _encodeNotifyDTWinnerVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional NotifyDTDrawGameInfoVO gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeNotifyDTDrawGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated RoomUserVO userInfoList = 5;
  let array$userInfoList = message.userInfoList;
  if (array$userInfoList !== undefined) {
    for (let value of array$userInfoList) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodeRoomUserVO(value, nested);
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

export function decodeNotifyDTDrawVO(binary: Uint8Array): NotifyDTDrawVO {
  return _decodeNotifyDTDrawVO(wrapByteBuffer(binary));
}

function _decodeNotifyDTDrawVO(bb: ByteBuffer): NotifyDTDrawVO {
  let message: NotifyDTDrawVO = {} as any;

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

      // repeated NotifyDTWinnerVO headWinnerList = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        let values = message.headWinnerList || (message.headWinnerList = []);
        values.push(_decodeNotifyDTWinnerVO(bb));
        bb.limit = limit;
        break;
      }

      // optional NotifyDTDrawGameInfoVO gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeNotifyDTDrawGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      // repeated RoomUserVO userInfoList = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.userInfoList || (message.userInfoList = []);
        values.push(_decodeRoomUserVO(bb));
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

export interface D3WinVO {
  gameNum?: number;
  id?: number;
  dices?: number[];
}

export function encodeD3WinVO(message: D3WinVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeD3WinVO(message, bb);
  return toUint8Array(bb);
}

function _encodeD3WinVO(message: D3WinVO, bb: ByteBuffer): void {
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
}

export function decodeD3WinVO(binary: Uint8Array): D3WinVO {
  return _decodeD3WinVO(wrapByteBuffer(binary));
}

function _decodeD3WinVO(bb: ByteBuffer): D3WinVO {
  let message: D3WinVO = {} as any;

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

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface NotifyLBBeginBetVO {
  notifyType?: number;
  lastMsgId?: string;
  currMsgId?: string;
  gameInfo?: LBGameInfoVO;
}

export function encodeNotifyLBBeginBetVO(message: NotifyLBBeginBetVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeNotifyLBBeginBetVO(message, bb);
  return toUint8Array(bb);
}

function _encodeNotifyLBBeginBetVO(message: NotifyLBBeginBetVO, bb: ByteBuffer): void {
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

  // optional LBGameInfoVO gameInfo = 4;
  let $gameInfo = message.gameInfo;
  if ($gameInfo !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeLBGameInfoVO($gameInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeNotifyLBBeginBetVO(binary: Uint8Array): NotifyLBBeginBetVO {
  return _decodeNotifyLBBeginBetVO(wrapByteBuffer(binary));
}

function _decodeNotifyLBBeginBetVO(bb: ByteBuffer): NotifyLBBeginBetVO {
  let message: NotifyLBBeginBetVO = {} as any;

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

      // optional LBGameInfoVO gameInfo = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.gameInfo = _decodeLBGameInfoVO(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RoomEnterDTO {
  roomType?: number;
  gameType?: number;
  roomLevel?: number;
}

export function encodeRoomEnterDTO(message: RoomEnterDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeRoomEnterDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeRoomEnterDTO(message: RoomEnterDTO, bb: ByteBuffer): void {
  // optional int32 roomType = 1;
  let $roomType = message.roomType;
  if ($roomType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($roomType));
  }

  // optional int32 gameType = 2;
  let $gameType = message.gameType;
  if ($gameType !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($gameType));
  }

  // optional int32 roomLevel = 3;
  let $roomLevel = message.roomLevel;
  if ($roomLevel !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($roomLevel));
  }
}

export function decodeRoomEnterDTO(binary: Uint8Array): RoomEnterDTO {
  return _decodeRoomEnterDTO(wrapByteBuffer(binary));
}

function _decodeRoomEnterDTO(bb: ByteBuffer): RoomEnterDTO {
  let message: RoomEnterDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 roomType = 1;
      case 1: {
        message.roomType = readVarint32(bb);
        break;
      }

      // optional int32 gameType = 2;
      case 2: {
        message.gameType = readVarint32(bb);
        break;
      }

      // optional int32 roomLevel = 3;
      case 3: {
        message.roomLevel = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface PKGameInfoVO {
  gameNum?: number;
  bankerId?: string;
  currOptUserId?: string;
  totalOptSeconds?: number;
  leftOptSeconds?: number;
  dealCardMilliseconds?: Long;
  leftPaiNum?: number;
  qiPai?: string;
  turnType?: number;
  oddsInfoList?: OddsInfoVO[];
  gameResultList?: PKWinVO[];
}

export function encodePKGameInfoVO(message: PKGameInfoVO): Uint8Array {
  let bb = popByteBuffer();
  _encodePKGameInfoVO(message, bb);
  return toUint8Array(bb);
}

function _encodePKGameInfoVO(message: PKGameInfoVO, bb: ByteBuffer): void {
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

  // repeated OddsInfoVO oddsInfoList = 10;
  let array$oddsInfoList = message.oddsInfoList;
  if (array$oddsInfoList !== undefined) {
    for (let value of array$oddsInfoList) {
      writeVarint32(bb, 82);
      let nested = popByteBuffer();
      _encodeOddsInfoVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated PKWinVO gameResultList = 11;
  let array$gameResultList = message.gameResultList;
  if (array$gameResultList !== undefined) {
    for (let value of array$gameResultList) {
      writeVarint32(bb, 90);
      let nested = popByteBuffer();
      _encodePKWinVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodePKGameInfoVO(binary: Uint8Array): PKGameInfoVO {
  return _decodePKGameInfoVO(wrapByteBuffer(binary));
}

function _decodePKGameInfoVO(bb: ByteBuffer): PKGameInfoVO {
  let message: PKGameInfoVO = {} as any;

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

      // repeated OddsInfoVO oddsInfoList = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        let values = message.oddsInfoList || (message.oddsInfoList = []);
        values.push(_decodeOddsInfoVO(bb));
        bb.limit = limit;
        break;
      }

      // repeated PKWinVO gameResultList = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        let values = message.gameResultList || (message.gameResultList = []);
        values.push(_decodePKWinVO(bb));
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
