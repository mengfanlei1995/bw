export interface UserUpdateNicknameDTO {
  nickname?: string;
}

export function encodeUserUpdateNicknameDTO(message: UserUpdateNicknameDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeUserUpdateNicknameDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeUserUpdateNicknameDTO(message: UserUpdateNicknameDTO, bb: ByteBuffer): void {
  // optional string nickname = 1;
  let $nickname = message.nickname;
  if ($nickname !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $nickname);
  }
}

export function decodeUserUpdateNicknameDTO(binary: Uint8Array): UserUpdateNicknameDTO {
  return _decodeUserUpdateNicknameDTO(wrapByteBuffer(binary));
}

function _decodeUserUpdateNicknameDTO(bb: ByteBuffer): UserUpdateNicknameDTO {
  let message: UserUpdateNicknameDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string nickname = 1;
      case 1: {
        message.nickname = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface UserUpdateHeadPicDTO {
  headpic?: string;
}

export function encodeUserUpdateHeadPicDTO(message: UserUpdateHeadPicDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeUserUpdateHeadPicDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeUserUpdateHeadPicDTO(message: UserUpdateHeadPicDTO, bb: ByteBuffer): void {
  // optional string headpic = 1;
  let $headpic = message.headpic;
  if ($headpic !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $headpic);
  }
}

export function decodeUserUpdateHeadPicDTO(binary: Uint8Array): UserUpdateHeadPicDTO {
  return _decodeUserUpdateHeadPicDTO(wrapByteBuffer(binary));
}

function _decodeUserUpdateHeadPicDTO(bb: ByteBuffer): UserUpdateHeadPicDTO {
  let message: UserUpdateHeadPicDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string headpic = 1;
      case 1: {
        message.headpic = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface HomepageGamesResponse {
  roomId?: string;
  gameType?: string;
  gameImgUrl?: string;
  gameIconUrl?: string;
  remoteUrl?: string;
  version?: string;
  download?: boolean;
  state?: number;
  select?: number;
  minIn?: Long;
  flag?: number;
  file?: string;
  name?: string;
  cmd?: number;
}

export function encodeHomepageGamesResponse(message: HomepageGamesResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeHomepageGamesResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeHomepageGamesResponse(message: HomepageGamesResponse, bb: ByteBuffer): void {
  // optional string roomId = 1;
  let $roomId = message.roomId;
  if ($roomId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $roomId);
  }

  // optional string gameType = 2;
  let $gameType = message.gameType;
  if ($gameType !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $gameType);
  }

  // optional string gameImgUrl = 3;
  let $gameImgUrl = message.gameImgUrl;
  if ($gameImgUrl !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $gameImgUrl);
  }

  // optional string gameIconUrl = 4;
  let $gameIconUrl = message.gameIconUrl;
  if ($gameIconUrl !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $gameIconUrl);
  }

  // optional string remoteUrl = 5;
  let $remoteUrl = message.remoteUrl;
  if ($remoteUrl !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $remoteUrl);
  }

  // optional string version = 6;
  let $version = message.version;
  if ($version !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $version);
  }

  // optional bool download = 7;
  let $download = message.download;
  if ($download !== undefined) {
    writeVarint32(bb, 56);
    writeByte(bb, $download ? 1 : 0);
  }

  // optional int32 state = 8;
  let $state = message.state;
  if ($state !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, intToLong($state));
  }

  // optional int32 select = 9;
  let $select = message.select;
  if ($select !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($select));
  }

  // optional int64 minIn = 10;
  let $minIn = message.minIn;
  if ($minIn !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, $minIn);
  }

  // optional int32 flag = 11;
  let $flag = message.flag;
  if ($flag !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($flag));
  }

  // optional string file = 12;
  let $file = message.file;
  if ($file !== undefined) {
    writeVarint32(bb, 98);
    writeString(bb, $file);
  }

  // optional string name = 13;
  let $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 106);
    writeString(bb, $name);
  }

  // optional int32 cmd = 14;
  let $cmd = message.cmd;
  if ($cmd !== undefined) {
    writeVarint32(bb, 112);
    writeVarint64(bb, intToLong($cmd));
  }
}

export function decodeHomepageGamesResponse(binary: Uint8Array): HomepageGamesResponse {
  return _decodeHomepageGamesResponse(wrapByteBuffer(binary));
}

function _decodeHomepageGamesResponse(bb: ByteBuffer): HomepageGamesResponse {
  let message: HomepageGamesResponse = {} as any;

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

      // optional string gameType = 2;
      case 2: {
        message.gameType = readString(bb, readVarint32(bb));
        break;
      }

      // optional string gameImgUrl = 3;
      case 3: {
        message.gameImgUrl = readString(bb, readVarint32(bb));
        break;
      }

      // optional string gameIconUrl = 4;
      case 4: {
        message.gameIconUrl = readString(bb, readVarint32(bb));
        break;
      }

      // optional string remoteUrl = 5;
      case 5: {
        message.remoteUrl = readString(bb, readVarint32(bb));
        break;
      }

      // optional string version = 6;
      case 6: {
        message.version = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool download = 7;
      case 7: {
        message.download = !!readByte(bb);
        break;
      }

      // optional int32 state = 8;
      case 8: {
        message.state = readVarint32(bb);
        break;
      }

      // optional int32 select = 9;
      case 9: {
        message.select = readVarint32(bb);
        break;
      }

      // optional int64 minIn = 10;
      case 10: {
        message.minIn = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 flag = 11;
      case 11: {
        message.flag = readVarint32(bb);
        break;
      }

      // optional string file = 12;
      case 12: {
        message.file = readString(bb, readVarint32(bb));
        break;
      }

      // optional string name = 13;
      case 13: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 cmd = 14;
      case 14: {
        message.cmd = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LoginWalletVO {
  depositBalance?: Long;
  withdrawBalance?: Long;
  totalCashBalance?: Long;
  freeBalance?: Long;
}

export function encodeLoginWalletVO(message: LoginWalletVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeLoginWalletVO(message, bb);
  return toUint8Array(bb);
}

function _encodeLoginWalletVO(message: LoginWalletVO, bb: ByteBuffer): void {
  // optional int64 depositBalance = 1;
  let $depositBalance = message.depositBalance;
  if ($depositBalance !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $depositBalance);
  }

  // optional int64 withdrawBalance = 2;
  let $withdrawBalance = message.withdrawBalance;
  if ($withdrawBalance !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $withdrawBalance);
  }

  // optional int64 totalCashBalance = 3;
  let $totalCashBalance = message.totalCashBalance;
  if ($totalCashBalance !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $totalCashBalance);
  }

  // optional int64 freeBalance = 4;
  let $freeBalance = message.freeBalance;
  if ($freeBalance !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $freeBalance);
  }
}

export function decodeLoginWalletVO(binary: Uint8Array): LoginWalletVO {
  return _decodeLoginWalletVO(wrapByteBuffer(binary));
}

function _decodeLoginWalletVO(bb: ByteBuffer): LoginWalletVO {
  let message: LoginWalletVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 depositBalance = 1;
      case 1: {
        message.depositBalance = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 withdrawBalance = 2;
      case 2: {
        message.withdrawBalance = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 totalCashBalance = 3;
      case 3: {
        message.totalCashBalance = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 freeBalance = 4;
      case 4: {
        message.freeBalance = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface PictureResponse {
  id?: number;
  pictureUrl?: string;
  skipPage?: string;
  skipType?: number;
  activityId?: string;
  skipData?: string;
  skipParams?: string;
  redDot?: boolean;
}

export function encodePictureResponse(message: PictureResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodePictureResponse(message, bb);
  return toUint8Array(bb);
}

function _encodePictureResponse(message: PictureResponse, bb: ByteBuffer): void {
  // optional int32 id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($id));
  }

  // optional string pictureUrl = 2;
  let $pictureUrl = message.pictureUrl;
  if ($pictureUrl !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $pictureUrl);
  }

  // optional string skipPage = 3;
  let $skipPage = message.skipPage;
  if ($skipPage !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $skipPage);
  }

  // optional int32 skipType = 4;
  let $skipType = message.skipType;
  if ($skipType !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($skipType));
  }

  // optional string activityId = 5;
  let $activityId = message.activityId;
  if ($activityId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $activityId);
  }

  // optional string skipData = 6;
  let $skipData = message.skipData;
  if ($skipData !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $skipData);
  }

  // optional string skipParams = 7;
  let $skipParams = message.skipParams;
  if ($skipParams !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $skipParams);
  }

  // optional bool redDot = 8;
  let $redDot = message.redDot;
  if ($redDot !== undefined) {
    writeVarint32(bb, 64);
    writeByte(bb, $redDot ? 1 : 0);
  }
}

export function decodePictureResponse(binary: Uint8Array): PictureResponse {
  return _decodePictureResponse(wrapByteBuffer(binary));
}

function _decodePictureResponse(bb: ByteBuffer): PictureResponse {
  let message: PictureResponse = {} as any;

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

      // optional string pictureUrl = 2;
      case 2: {
        message.pictureUrl = readString(bb, readVarint32(bb));
        break;
      }

      // optional string skipPage = 3;
      case 3: {
        message.skipPage = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 skipType = 4;
      case 4: {
        message.skipType = readVarint32(bb);
        break;
      }

      // optional string activityId = 5;
      case 5: {
        message.activityId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string skipData = 6;
      case 6: {
        message.skipData = readString(bb, readVarint32(bb));
        break;
      }

      // optional string skipParams = 7;
      case 7: {
        message.skipParams = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool redDot = 8;
      case 8: {
        message.redDot = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LoginDTO {
  appChannel?: string;
  appName?: string;
  appVersion?: string;
  appResVersion?: number;
  bundleId?: string;
  code?: string;
  devId?: string;
  invitationCode?: string;
  invitationType?: string;
  mobile?: string;
  platform?: string;
  productId?: number;
  userId?: string;
  sessionId?: string;
  appsflyerId?: string;
}

export function encodeLoginDTO(message: LoginDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeLoginDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeLoginDTO(message: LoginDTO, bb: ByteBuffer): void {
  // optional string appChannel = 1;
  let $appChannel = message.appChannel;
  if ($appChannel !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $appChannel);
  }

  // optional string appName = 2;
  let $appName = message.appName;
  if ($appName !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $appName);
  }

  // optional string appVersion = 3;
  let $appVersion = message.appVersion;
  if ($appVersion !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $appVersion);
  }

  // optional int32 appResVersion = 4;
  let $appResVersion = message.appResVersion;
  if ($appResVersion !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($appResVersion));
  }

  // optional string bundleId = 5;
  let $bundleId = message.bundleId;
  if ($bundleId !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $bundleId);
  }

  // optional string code = 6;
  let $code = message.code;
  if ($code !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $code);
  }

  // optional string devId = 7;
  let $devId = message.devId;
  if ($devId !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $devId);
  }

  // optional string invitationCode = 8;
  let $invitationCode = message.invitationCode;
  if ($invitationCode !== undefined) {
    writeVarint32(bb, 66);
    writeString(bb, $invitationCode);
  }

  // optional string invitationType = 9;
  let $invitationType = message.invitationType;
  if ($invitationType !== undefined) {
    writeVarint32(bb, 74);
    writeString(bb, $invitationType);
  }

  // optional string mobile = 10;
  let $mobile = message.mobile;
  if ($mobile !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $mobile);
  }

  // optional string platform = 11;
  let $platform = message.platform;
  if ($platform !== undefined) {
    writeVarint32(bb, 90);
    writeString(bb, $platform);
  }

  // optional int32 productId = 12;
  let $productId = message.productId;
  if ($productId !== undefined) {
    writeVarint32(bb, 96);
    writeVarint64(bb, intToLong($productId));
  }

  // optional string userId = 13;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 106);
    writeString(bb, $userId);
  }

  // optional string sessionId = 14;
  let $sessionId = message.sessionId;
  if ($sessionId !== undefined) {
    writeVarint32(bb, 114);
    writeString(bb, $sessionId);
  }

  // optional string appsflyerId = 15;
  let $appsflyerId = message.appsflyerId;
  if ($appsflyerId !== undefined) {
    writeVarint32(bb, 122);
    writeString(bb, $appsflyerId);
  }
}

export function decodeLoginDTO(binary: Uint8Array): LoginDTO {
  return _decodeLoginDTO(wrapByteBuffer(binary));
}

function _decodeLoginDTO(bb: ByteBuffer): LoginDTO {
  let message: LoginDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string appChannel = 1;
      case 1: {
        message.appChannel = readString(bb, readVarint32(bb));
        break;
      }

      // optional string appName = 2;
      case 2: {
        message.appName = readString(bb, readVarint32(bb));
        break;
      }

      // optional string appVersion = 3;
      case 3: {
        message.appVersion = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 appResVersion = 4;
      case 4: {
        message.appResVersion = readVarint32(bb);
        break;
      }

      // optional string bundleId = 5;
      case 5: {
        message.bundleId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string code = 6;
      case 6: {
        message.code = readString(bb, readVarint32(bb));
        break;
      }

      // optional string devId = 7;
      case 7: {
        message.devId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string invitationCode = 8;
      case 8: {
        message.invitationCode = readString(bb, readVarint32(bb));
        break;
      }

      // optional string invitationType = 9;
      case 9: {
        message.invitationType = readString(bb, readVarint32(bb));
        break;
      }

      // optional string mobile = 10;
      case 10: {
        message.mobile = readString(bb, readVarint32(bb));
        break;
      }

      // optional string platform = 11;
      case 11: {
        message.platform = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 productId = 12;
      case 12: {
        message.productId = readVarint32(bb);
        break;
      }

      // optional string userId = 13;
      case 13: {
        message.userId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string sessionId = 14;
      case 14: {
        message.sessionId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string appsflyerId = 15;
      case 15: {
        message.appsflyerId = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface HomepageUserInfoResponse {
  bonus?: number;
  vipLevel?: number;
  club?: number;
  recharge?: boolean;
  brokeCoupon?: boolean;
  invitationCode?: string;
}

export function encodeHomepageUserInfoResponse(message: HomepageUserInfoResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeHomepageUserInfoResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeHomepageUserInfoResponse(message: HomepageUserInfoResponse, bb: ByteBuffer): void {
  // optional double bonus = 1;
  let $bonus = message.bonus;
  if ($bonus !== undefined) {
    writeVarint32(bb, 9);
    writeDouble(bb, $bonus);
  }

  // optional int32 vipLevel = 2;
  let $vipLevel = message.vipLevel;
  if ($vipLevel !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($vipLevel));
  }

  // optional int32 club = 3;
  let $club = message.club;
  if ($club !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($club));
  }

  // optional bool recharge = 4;
  let $recharge = message.recharge;
  if ($recharge !== undefined) {
    writeVarint32(bb, 32);
    writeByte(bb, $recharge ? 1 : 0);
  }

  // optional bool brokeCoupon = 5;
  let $brokeCoupon = message.brokeCoupon;
  if ($brokeCoupon !== undefined) {
    writeVarint32(bb, 40);
    writeByte(bb, $brokeCoupon ? 1 : 0);
  }

  // optional string invitationCode = 6;
  let $invitationCode = message.invitationCode;
  if ($invitationCode !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $invitationCode);
  }
}

export function decodeHomepageUserInfoResponse(binary: Uint8Array): HomepageUserInfoResponse {
  return _decodeHomepageUserInfoResponse(wrapByteBuffer(binary));
}

function _decodeHomepageUserInfoResponse(bb: ByteBuffer): HomepageUserInfoResponse {
  let message: HomepageUserInfoResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional double bonus = 1;
      case 1: {
        message.bonus = readDouble(bb);
        break;
      }

      // optional int32 vipLevel = 2;
      case 2: {
        message.vipLevel = readVarint32(bb);
        break;
      }

      // optional int32 club = 3;
      case 3: {
        message.club = readVarint32(bb);
        break;
      }

      // optional bool recharge = 4;
      case 4: {
        message.recharge = !!readByte(bb);
        break;
      }

      // optional bool brokeCoupon = 5;
      case 5: {
        message.brokeCoupon = !!readByte(bb);
        break;
      }

      // optional string invitationCode = 6;
      case 6: {
        message.invitationCode = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface HomepageGameDTO {
  productId?: number;
  appVersion?: string;
  appResVersion?: number;
}

export function encodeHomepageGameDTO(message: HomepageGameDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeHomepageGameDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeHomepageGameDTO(message: HomepageGameDTO, bb: ByteBuffer): void {
  // optional int32 productId = 1;
  let $productId = message.productId;
  if ($productId !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($productId));
  }

  // optional string appVersion = 2;
  let $appVersion = message.appVersion;
  if ($appVersion !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $appVersion);
  }

  // optional int32 appResVersion = 3;
  let $appResVersion = message.appResVersion;
  if ($appResVersion !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($appResVersion));
  }
}

export function decodeHomepageGameDTO(binary: Uint8Array): HomepageGameDTO {
  return _decodeHomepageGameDTO(wrapByteBuffer(binary));
}

function _decodeHomepageGameDTO(bb: ByteBuffer): HomepageGameDTO {
  let message: HomepageGameDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 productId = 1;
      case 1: {
        message.productId = readVarint32(bb);
        break;
      }

      // optional string appVersion = 2;
      case 2: {
        message.appVersion = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 appResVersion = 3;
      case 3: {
        message.appResVersion = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LoginVO {
  userId?: string;
  nickName?: string;
  headPic?: string;
  sessionId?: string;
  phone?: string;
  accountType?: number;
  firstDay?: Long;
  first?: boolean;
  walletVO?: LoginWalletVO;
}

export function encodeLoginVO(message: LoginVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeLoginVO(message, bb);
  return toUint8Array(bb);
}

function _encodeLoginVO(message: LoginVO, bb: ByteBuffer): void {
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

  // optional string headPic = 3;
  let $headPic = message.headPic;
  if ($headPic !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $headPic);
  }

  // optional string sessionId = 4;
  let $sessionId = message.sessionId;
  if ($sessionId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $sessionId);
  }

  // optional string phone = 5;
  let $phone = message.phone;
  if ($phone !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $phone);
  }

  // optional int32 accountType = 6;
  let $accountType = message.accountType;
  if ($accountType !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($accountType));
  }

  // optional int64 firstDay = 7;
  let $firstDay = message.firstDay;
  if ($firstDay !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $firstDay);
  }

  // optional bool first = 8;
  let $first = message.first;
  if ($first !== undefined) {
    writeVarint32(bb, 64);
    writeByte(bb, $first ? 1 : 0);
  }

  // optional LoginWalletVO walletVO = 9;
  let $walletVO = message.walletVO;
  if ($walletVO !== undefined) {
    writeVarint32(bb, 74);
    let nested = popByteBuffer();
    _encodeLoginWalletVO($walletVO, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeLoginVO(binary: Uint8Array): LoginVO {
  return _decodeLoginVO(wrapByteBuffer(binary));
}

function _decodeLoginVO(bb: ByteBuffer): LoginVO {
  let message: LoginVO = {} as any;

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

      // optional string headPic = 3;
      case 3: {
        message.headPic = readString(bb, readVarint32(bb));
        break;
      }

      // optional string sessionId = 4;
      case 4: {
        message.sessionId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string phone = 5;
      case 5: {
        message.phone = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 accountType = 6;
      case 6: {
        message.accountType = readVarint32(bb);
        break;
      }

      // optional int64 firstDay = 7;
      case 7: {
        message.firstDay = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional bool first = 8;
      case 8: {
        message.first = !!readByte(bb);
        break;
      }

      // optional LoginWalletVO walletVO = 9;
      case 9: {
        let limit = pushTemporaryLength(bb);
        message.walletVO = _decodeLoginWalletVO(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface HomepageGameVO {
  games?: HomepageGamesResponse[];
}

export function encodeHomepageGameVO(message: HomepageGameVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeHomepageGameVO(message, bb);
  return toUint8Array(bb);
}

function _encodeHomepageGameVO(message: HomepageGameVO, bb: ByteBuffer): void {
  // repeated HomepageGamesResponse games = 1;
  let array$games = message.games;
  if (array$games !== undefined) {
    for (let value of array$games) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeHomepageGamesResponse(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeHomepageGameVO(binary: Uint8Array): HomepageGameVO {
  return _decodeHomepageGameVO(wrapByteBuffer(binary));
}

function _decodeHomepageGameVO(bb: ByteBuffer): HomepageGameVO {
  let message: HomepageGameVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated HomepageGamesResponse games = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.games || (message.games = []);
        values.push(_decodeHomepageGamesResponse(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface HomepageResponse {
  userInfo?: HomepageUserInfoResponse;
  rotationPictures?: PictureResponse[];
  redDot?: { [key: string]: boolean };
}

export function encodeHomepageResponse(message: HomepageResponse): Uint8Array {
  let bb = popByteBuffer();
  _encodeHomepageResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeHomepageResponse(message: HomepageResponse, bb: ByteBuffer): void {
  // optional HomepageUserInfoResponse userInfo = 1;
  let $userInfo = message.userInfo;
  if ($userInfo !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeHomepageUserInfoResponse($userInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated PictureResponse rotationPictures = 2;
  let array$rotationPictures = message.rotationPictures;
  if (array$rotationPictures !== undefined) {
    for (let value of array$rotationPictures) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodePictureResponse(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<string, bool> redDot = 3;
  let map$redDot = message.redDot;
  if (map$redDot !== undefined) {
    for (let key in map$redDot) {
      let nested = popByteBuffer();
      let value = map$redDot[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 16);
      writeByte(nested, value ? 1 : 0);
      writeVarint32(bb, 26);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeHomepageResponse(binary: Uint8Array): HomepageResponse {
  return _decodeHomepageResponse(wrapByteBuffer(binary));
}

function _decodeHomepageResponse(bb: ByteBuffer): HomepageResponse {
  let message: HomepageResponse = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional HomepageUserInfoResponse userInfo = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.userInfo = _decodeHomepageUserInfoResponse(bb);
        bb.limit = limit;
        break;
      }

      // repeated PictureResponse rotationPictures = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.rotationPictures || (message.rotationPictures = []);
        values.push(_decodePictureResponse(bb));
        bb.limit = limit;
        break;
      }

      // optional map<string, bool> redDot = 3;
      case 3: {
        let values = message.redDot || (message.redDot = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: string | undefined;
        let value: boolean | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readString(bb, readVarint32(bb));
              break;
            }
            case 2: {
              value = !!readByte(bb);
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: redDot");
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
