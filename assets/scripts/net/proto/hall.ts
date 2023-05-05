export interface ReferRankVO {
  prizePool?: Long;
  yourScore?: Long;
  rule?: ReferRuleVO[];
  top20?: ReferTop20VO[];
}

export function encodeReferRankVO(message: ReferRankVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeReferRankVO(message, bb);
  return toUint8Array(bb);
}

function _encodeReferRankVO(message: ReferRankVO, bb: ByteBuffer): void {
  // optional int64 prizePool = 1;
  let $prizePool = message.prizePool;
  if ($prizePool !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $prizePool);
  }

  // optional int64 yourScore = 2;
  let $yourScore = message.yourScore;
  if ($yourScore !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $yourScore);
  }

  // repeated ReferRuleVO rule = 3;
  let array$rule = message.rule;
  if (array$rule !== undefined) {
    for (let value of array$rule) {
      writeVarint32(bb, 26);
      let nested = popByteBuffer();
      _encodeReferRuleVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated ReferTop20VO top20 = 4;
  let array$top20 = message.top20;
  if (array$top20 !== undefined) {
    for (let value of array$top20) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeReferTop20VO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeReferRankVO(binary: Uint8Array): ReferRankVO {
  return _decodeReferRankVO(wrapByteBuffer(binary));
}

function _decodeReferRankVO(bb: ByteBuffer): ReferRankVO {
  let message: ReferRankVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 prizePool = 1;
      case 1: {
        message.prizePool = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 yourScore = 2;
      case 2: {
        message.yourScore = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // repeated ReferRuleVO rule = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        let values = message.rule || (message.rule = []);
        values.push(_decodeReferRuleVO(bb));
        bb.limit = limit;
        break;
      }

      // repeated ReferTop20VO top20 = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.top20 || (message.top20 = []);
        values.push(_decodeReferTop20VO(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RedDotVO {
  redDot?: boolean;
}

export function encodeRedDotVO(message: RedDotVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeRedDotVO(message, bb);
  return toUint8Array(bb);
}

function _encodeRedDotVO(message: RedDotVO, bb: ByteBuffer): void {
  // optional bool redDot = 1;
  let $redDot = message.redDot;
  if ($redDot !== undefined) {
    writeVarint32(bb, 8);
    writeByte(bb, $redDot ? 1 : 0);
  }
}

export function decodeRedDotVO(binary: Uint8Array): RedDotVO {
  return _decodeRedDotVO(wrapByteBuffer(binary));
}

function _decodeRedDotVO(bb: ByteBuffer): RedDotVO {
  let message: RedDotVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bool redDot = 1;
      case 1: {
        message.redDot = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LoginMobileSmsVO {
  smsCode?: string;
}

export function encodeLoginMobileSmsVO(message: LoginMobileSmsVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeLoginMobileSmsVO(message, bb);
  return toUint8Array(bb);
}

function _encodeLoginMobileSmsVO(message: LoginMobileSmsVO, bb: ByteBuffer): void {
  // optional string smsCode = 1;
  let $smsCode = message.smsCode;
  if ($smsCode !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $smsCode);
  }
}

export function decodeLoginMobileSmsVO(binary: Uint8Array): LoginMobileSmsVO {
  return _decodeLoginMobileSmsVO(wrapByteBuffer(binary));
}

function _decodeLoginMobileSmsVO(bb: ByteBuffer): LoginMobileSmsVO {
  let message: LoginMobileSmsVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string smsCode = 1;
      case 1: {
        message.smsCode = readString(bb, readVarint32(bb));
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
  green?: boolean;
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

  // optional bool green = 9;
  let $green = message.green;
  if ($green !== undefined) {
    writeVarint32(bb, 72);
    writeByte(bb, $green ? 1 : 0);
  }

  // optional LoginWalletVO walletVO = 10;
  let $walletVO = message.walletVO;
  if ($walletVO !== undefined) {
    writeVarint32(bb, 82);
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

      // optional bool green = 9;
      case 9: {
        message.green = !!readByte(bb);
        break;
      }

      // optional LoginWalletVO walletVO = 10;
      case 10: {
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

export interface MailPageDTO {
  pageNo?: number;
  pageCount?: number;
}

export function encodeMailPageDTO(message: MailPageDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeMailPageDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeMailPageDTO(message: MailPageDTO, bb: ByteBuffer): void {
  // optional int32 pageNo = 1;
  let $pageNo = message.pageNo;
  if ($pageNo !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($pageNo));
  }

  // optional int32 pageCount = 2;
  let $pageCount = message.pageCount;
  if ($pageCount !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($pageCount));
  }
}

export function decodeMailPageDTO(binary: Uint8Array): MailPageDTO {
  return _decodeMailPageDTO(wrapByteBuffer(binary));
}

function _decodeMailPageDTO(bb: ByteBuffer): MailPageDTO {
  let message: MailPageDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 pageNo = 1;
      case 1: {
        message.pageNo = readVarint32(bb);
        break;
      }

      // optional int32 pageCount = 2;
      case 2: {
        message.pageCount = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

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

export interface ReferRewardPageDTO {
  pageNum?: number;
}

export function encodeReferRewardPageDTO(message: ReferRewardPageDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeReferRewardPageDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeReferRewardPageDTO(message: ReferRewardPageDTO, bb: ByteBuffer): void {
  // optional int32 pageNum = 1;
  let $pageNum = message.pageNum;
  if ($pageNum !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($pageNum));
  }
}

export function decodeReferRewardPageDTO(binary: Uint8Array): ReferRewardPageDTO {
  return _decodeReferRewardPageDTO(wrapByteBuffer(binary));
}

function _decodeReferRewardPageDTO(bb: ByteBuffer): ReferRewardPageDTO {
  let message: ReferRewardPageDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 pageNum = 1;
      case 1: {
        message.pageNum = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface VipUpgradeNotifyVO {
  userId?: string;
  time?: Long;
  beforeLevel?: number;
  currentLevel?: number;
}

export function encodeVipUpgradeNotifyVO(message: VipUpgradeNotifyVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeVipUpgradeNotifyVO(message, bb);
  return toUint8Array(bb);
}

function _encodeVipUpgradeNotifyVO(message: VipUpgradeNotifyVO, bb: ByteBuffer): void {
  // optional string userId = 1;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $userId);
  }

  // optional int64 time = 2;
  let $time = message.time;
  if ($time !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $time);
  }

  // optional int32 beforeLevel = 3;
  let $beforeLevel = message.beforeLevel;
  if ($beforeLevel !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($beforeLevel));
  }

  // optional int32 currentLevel = 4;
  let $currentLevel = message.currentLevel;
  if ($currentLevel !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($currentLevel));
  }
}

export function decodeVipUpgradeNotifyVO(binary: Uint8Array): VipUpgradeNotifyVO {
  return _decodeVipUpgradeNotifyVO(wrapByteBuffer(binary));
}

function _decodeVipUpgradeNotifyVO(bb: ByteBuffer): VipUpgradeNotifyVO {
  let message: VipUpgradeNotifyVO = {} as any;

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

      // optional int64 time = 2;
      case 2: {
        message.time = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 beforeLevel = 3;
      case 3: {
        message.beforeLevel = readVarint32(bb);
        break;
      }

      // optional int32 currentLevel = 4;
      case 4: {
        message.currentLevel = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ReferInvitationTotalChildVO {
  uid?: string;
  name?: string;
  todayBonus?: Long;
  totalBonus?: Long;
}

export function encodeReferInvitationTotalChildVO(message: ReferInvitationTotalChildVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeReferInvitationTotalChildVO(message, bb);
  return toUint8Array(bb);
}

function _encodeReferInvitationTotalChildVO(message: ReferInvitationTotalChildVO, bb: ByteBuffer): void {
  // optional string uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $uid);
  }

  // optional string name = 2;
  let $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $name);
  }

  // optional int64 todayBonus = 3;
  let $todayBonus = message.todayBonus;
  if ($todayBonus !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $todayBonus);
  }

  // optional int64 totalBonus = 4;
  let $totalBonus = message.totalBonus;
  if ($totalBonus !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $totalBonus);
  }
}

export function decodeReferInvitationTotalChildVO(binary: Uint8Array): ReferInvitationTotalChildVO {
  return _decodeReferInvitationTotalChildVO(wrapByteBuffer(binary));
}

function _decodeReferInvitationTotalChildVO(bb: ByteBuffer): ReferInvitationTotalChildVO {
  let message: ReferInvitationTotalChildVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string uid = 1;
      case 1: {
        message.uid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string name = 2;
      case 2: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 todayBonus = 3;
      case 3: {
        message.todayBonus = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 totalBonus = 4;
      case 4: {
        message.totalBonus = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface TransactionVO {
  id?: string;
  time?: Long;
  title?: string;
  amount?: Long;
  withdrawAmount?: Long;
}

export function encodeTransactionVO(message: TransactionVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeTransactionVO(message, bb);
  return toUint8Array(bb);
}

function _encodeTransactionVO(message: TransactionVO, bb: ByteBuffer): void {
  // optional string id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $id);
  }

  // optional int64 time = 2;
  let $time = message.time;
  if ($time !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $time);
  }

  // optional string title = 3;
  let $title = message.title;
  if ($title !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $title);
  }

  // optional int64 amount = 4;
  let $amount = message.amount;
  if ($amount !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $amount);
  }

  // optional int64 withdrawAmount = 5;
  let $withdrawAmount = message.withdrawAmount;
  if ($withdrawAmount !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $withdrawAmount);
  }
}

export function decodeTransactionVO(binary: Uint8Array): TransactionVO {
  return _decodeTransactionVO(wrapByteBuffer(binary));
}

function _decodeTransactionVO(bb: ByteBuffer): TransactionVO {
  let message: TransactionVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string id = 1;
      case 1: {
        message.id = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 time = 2;
      case 2: {
        message.time = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional string title = 3;
      case 3: {
        message.title = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 amount = 4;
      case 4: {
        message.amount = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 withdrawAmount = 5;
      case 5: {
        message.withdrawAmount = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ReferTop20VO {
  headPic?: string;
  nickName?: string;
  reward?: Long;
  rate?: number;
}

export function encodeReferTop20VO(message: ReferTop20VO): Uint8Array {
  let bb = popByteBuffer();
  _encodeReferTop20VO(message, bb);
  return toUint8Array(bb);
}

function _encodeReferTop20VO(message: ReferTop20VO, bb: ByteBuffer): void {
  // optional string headPic = 1;
  let $headPic = message.headPic;
  if ($headPic !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $headPic);
  }

  // optional string nickName = 2;
  let $nickName = message.nickName;
  if ($nickName !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $nickName);
  }

  // optional int64 reward = 3;
  let $reward = message.reward;
  if ($reward !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $reward);
  }

  // optional double rate = 4;
  let $rate = message.rate;
  if ($rate !== undefined) {
    writeVarint32(bb, 33);
    writeDouble(bb, $rate);
  }
}

export function decodeReferTop20VO(binary: Uint8Array): ReferTop20VO {
  return _decodeReferTop20VO(wrapByteBuffer(binary));
}

function _decodeReferTop20VO(bb: ByteBuffer): ReferTop20VO {
  let message: ReferTop20VO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string headPic = 1;
      case 1: {
        message.headPic = readString(bb, readVarint32(bb));
        break;
      }

      // optional string nickName = 2;
      case 2: {
        message.nickName = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 reward = 3;
      case 3: {
        message.reward = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional double rate = 4;
      case 4: {
        message.rate = readDouble(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GullakMainInfoV2VO {
  total?: Long;
  cash?: Long;
  ratio?: number;
}

export function encodeGullakMainInfoV2VO(message: GullakMainInfoV2VO): Uint8Array {
  let bb = popByteBuffer();
  _encodeGullakMainInfoV2VO(message, bb);
  return toUint8Array(bb);
}

function _encodeGullakMainInfoV2VO(message: GullakMainInfoV2VO, bb: ByteBuffer): void {
  // optional int64 total = 1;
  let $total = message.total;
  if ($total !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $total);
  }

  // optional int64 cash = 2;
  let $cash = message.cash;
  if ($cash !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $cash);
  }

  // optional int32 ratio = 3;
  let $ratio = message.ratio;
  if ($ratio !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($ratio));
  }
}

export function decodeGullakMainInfoV2VO(binary: Uint8Array): GullakMainInfoV2VO {
  return _decodeGullakMainInfoV2VO(wrapByteBuffer(binary));
}

function _decodeGullakMainInfoV2VO(bb: ByteBuffer): GullakMainInfoV2VO {
  let message: GullakMainInfoV2VO = {} as any;

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

      // optional int64 cash = 2;
      case 2: {
        message.cash = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 ratio = 3;
      case 3: {
        message.ratio = readVarint32(bb);
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

export interface MailOptDTO {
  id?: Long;
}

export function encodeMailOptDTO(message: MailOptDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeMailOptDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeMailOptDTO(message: MailOptDTO, bb: ByteBuffer): void {
  // optional int64 id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $id);
  }
}

export function decodeMailOptDTO(binary: Uint8Array): MailOptDTO {
  return _decodeMailOptDTO(wrapByteBuffer(binary));
}

function _decodeMailOptDTO(bb: ByteBuffer): MailOptDTO {
  let message: MailOptDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 id = 1;
      case 1: {
        message.id = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DailyBonusEventVO {
  id?: Long;
  title?: string;
  processMin?: number;
  processMax?: number;
  awardAmount?: Long;
  state?: number;
}

export function encodeDailyBonusEventVO(message: DailyBonusEventVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeDailyBonusEventVO(message, bb);
  return toUint8Array(bb);
}

function _encodeDailyBonusEventVO(message: DailyBonusEventVO, bb: ByteBuffer): void {
  // optional int64 id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $id);
  }

  // optional string title = 2;
  let $title = message.title;
  if ($title !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $title);
  }

  // optional int32 processMin = 3;
  let $processMin = message.processMin;
  if ($processMin !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($processMin));
  }

  // optional int32 processMax = 4;
  let $processMax = message.processMax;
  if ($processMax !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($processMax));
  }

  // optional int64 awardAmount = 5;
  let $awardAmount = message.awardAmount;
  if ($awardAmount !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $awardAmount);
  }

  // optional int32 state = 6;
  let $state = message.state;
  if ($state !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($state));
  }
}

export function decodeDailyBonusEventVO(binary: Uint8Array): DailyBonusEventVO {
  return _decodeDailyBonusEventVO(wrapByteBuffer(binary));
}

function _decodeDailyBonusEventVO(bb: ByteBuffer): DailyBonusEventVO {
  let message: DailyBonusEventVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 id = 1;
      case 1: {
        message.id = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional string title = 2;
      case 2: {
        message.title = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 processMin = 3;
      case 3: {
        message.processMin = readVarint32(bb);
        break;
      }

      // optional int32 processMax = 4;
      case 4: {
        message.processMax = readVarint32(bb);
        break;
      }

      // optional int64 awardAmount = 5;
      case 5: {
        message.awardAmount = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 state = 6;
      case 6: {
        message.state = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DailyBonusSignInVipAwardVO {
  normalAmount?: Long;
  vipAmount?: Long;
  vipRatio?: number;
}

export function encodeDailyBonusSignInVipAwardVO(message: DailyBonusSignInVipAwardVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeDailyBonusSignInVipAwardVO(message, bb);
  return toUint8Array(bb);
}

function _encodeDailyBonusSignInVipAwardVO(message: DailyBonusSignInVipAwardVO, bb: ByteBuffer): void {
  // optional int64 normalAmount = 1;
  let $normalAmount = message.normalAmount;
  if ($normalAmount !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $normalAmount);
  }

  // optional int64 vipAmount = 2;
  let $vipAmount = message.vipAmount;
  if ($vipAmount !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $vipAmount);
  }

  // optional int32 vipRatio = 3;
  let $vipRatio = message.vipRatio;
  if ($vipRatio !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($vipRatio));
  }
}

export function decodeDailyBonusSignInVipAwardVO(binary: Uint8Array): DailyBonusSignInVipAwardVO {
  return _decodeDailyBonusSignInVipAwardVO(wrapByteBuffer(binary));
}

function _decodeDailyBonusSignInVipAwardVO(bb: ByteBuffer): DailyBonusSignInVipAwardVO {
  let message: DailyBonusSignInVipAwardVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 normalAmount = 1;
      case 1: {
        message.normalAmount = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 vipAmount = 2;
      case 2: {
        message.vipAmount = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 vipRatio = 3;
      case 3: {
        message.vipRatio = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ReferRewardDateVO {
  time?: Long;
  totalBonus?: Long;
  totalInviteBonus?: Long;
  totalDepositBonus?: Long;
}

export function encodeReferRewardDateVO(message: ReferRewardDateVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeReferRewardDateVO(message, bb);
  return toUint8Array(bb);
}

function _encodeReferRewardDateVO(message: ReferRewardDateVO, bb: ByteBuffer): void {
  // optional int64 time = 1;
  let $time = message.time;
  if ($time !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $time);
  }

  // optional int64 totalBonus = 2;
  let $totalBonus = message.totalBonus;
  if ($totalBonus !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $totalBonus);
  }

  // optional int64 totalInviteBonus = 3;
  let $totalInviteBonus = message.totalInviteBonus;
  if ($totalInviteBonus !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $totalInviteBonus);
  }

  // optional int64 totalDepositBonus = 4;
  let $totalDepositBonus = message.totalDepositBonus;
  if ($totalDepositBonus !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $totalDepositBonus);
  }
}

export function decodeReferRewardDateVO(binary: Uint8Array): ReferRewardDateVO {
  return _decodeReferRewardDateVO(wrapByteBuffer(binary));
}

function _decodeReferRewardDateVO(bb: ByteBuffer): ReferRewardDateVO {
  let message: ReferRewardDateVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 time = 1;
      case 1: {
        message.time = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 totalBonus = 2;
      case 2: {
        message.totalBonus = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 totalInviteBonus = 3;
      case 3: {
        message.totalInviteBonus = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 totalDepositBonus = 4;
      case 4: {
        message.totalDepositBonus = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ReferInvitationUrlVO {
  title?: string;
  url?: string;
}

export function encodeReferInvitationUrlVO(message: ReferInvitationUrlVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeReferInvitationUrlVO(message, bb);
  return toUint8Array(bb);
}

function _encodeReferInvitationUrlVO(message: ReferInvitationUrlVO, bb: ByteBuffer): void {
  // optional string title = 1;
  let $title = message.title;
  if ($title !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $title);
  }

  // optional string url = 2;
  let $url = message.url;
  if ($url !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $url);
  }
}

export function decodeReferInvitationUrlVO(binary: Uint8Array): ReferInvitationUrlVO {
  return _decodeReferInvitationUrlVO(wrapByteBuffer(binary));
}

function _decodeReferInvitationUrlVO(bb: ByteBuffer): ReferInvitationUrlVO {
  let message: ReferInvitationUrlVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string title = 1;
      case 1: {
        message.title = readString(bb, readVarint32(bb));
        break;
      }

      // optional string url = 2;
      case 2: {
        message.url = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface MailPageVO {
  totalPageCount?: Long;
  officialWebSite?: string;
  facebook?: string;
  mails?: MailVO[];
}

export function encodeMailPageVO(message: MailPageVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeMailPageVO(message, bb);
  return toUint8Array(bb);
}

function _encodeMailPageVO(message: MailPageVO, bb: ByteBuffer): void {
  // optional int64 totalPageCount = 1;
  let $totalPageCount = message.totalPageCount;
  if ($totalPageCount !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $totalPageCount);
  }

  // optional string officialWebSite = 2;
  let $officialWebSite = message.officialWebSite;
  if ($officialWebSite !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $officialWebSite);
  }

  // optional string facebook = 3;
  let $facebook = message.facebook;
  if ($facebook !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $facebook);
  }

  // repeated MailVO mails = 4;
  let array$mails = message.mails;
  if (array$mails !== undefined) {
    for (let value of array$mails) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeMailVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeMailPageVO(binary: Uint8Array): MailPageVO {
  return _decodeMailPageVO(wrapByteBuffer(binary));
}

function _decodeMailPageVO(bb: ByteBuffer): MailPageVO {
  let message: MailPageVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 totalPageCount = 1;
      case 1: {
        message.totalPageCount = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional string officialWebSite = 2;
      case 2: {
        message.officialWebSite = readString(bb, readVarint32(bb));
        break;
      }

      // optional string facebook = 3;
      case 3: {
        message.facebook = readString(bb, readVarint32(bb));
        break;
      }

      // repeated MailVO mails = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.mails || (message.mails = []);
        values.push(_decodeMailVO(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface MailVO {
  id?: Long;
  title?: string;
  content?: string;
  sendTime?: string;
  read?: boolean;
  attachments?: MailAttachmentVO[];
  attachmentState?: number;
}

export function encodeMailVO(message: MailVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeMailVO(message, bb);
  return toUint8Array(bb);
}

function _encodeMailVO(message: MailVO, bb: ByteBuffer): void {
  // optional int64 id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $id);
  }

  // optional string title = 2;
  let $title = message.title;
  if ($title !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $title);
  }

  // optional string content = 3;
  let $content = message.content;
  if ($content !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $content);
  }

  // optional string sendTime = 4;
  let $sendTime = message.sendTime;
  if ($sendTime !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $sendTime);
  }

  // optional bool read = 5;
  let $read = message.read;
  if ($read !== undefined) {
    writeVarint32(bb, 40);
    writeByte(bb, $read ? 1 : 0);
  }

  // repeated MailAttachmentVO attachments = 6;
  let array$attachments = message.attachments;
  if (array$attachments !== undefined) {
    for (let value of array$attachments) {
      writeVarint32(bb, 50);
      let nested = popByteBuffer();
      _encodeMailAttachmentVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional int32 attachmentState = 7;
  let $attachmentState = message.attachmentState;
  if ($attachmentState !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($attachmentState));
  }
}

export function decodeMailVO(binary: Uint8Array): MailVO {
  return _decodeMailVO(wrapByteBuffer(binary));
}

function _decodeMailVO(bb: ByteBuffer): MailVO {
  let message: MailVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 id = 1;
      case 1: {
        message.id = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional string title = 2;
      case 2: {
        message.title = readString(bb, readVarint32(bb));
        break;
      }

      // optional string content = 3;
      case 3: {
        message.content = readString(bb, readVarint32(bb));
        break;
      }

      // optional string sendTime = 4;
      case 4: {
        message.sendTime = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool read = 5;
      case 5: {
        message.read = !!readByte(bb);
        break;
      }

      // repeated MailAttachmentVO attachments = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        let values = message.attachments || (message.attachments = []);
        values.push(_decodeMailAttachmentVO(bb));
        bb.limit = limit;
        break;
      }

      // optional int32 attachmentState = 7;
      case 7: {
        message.attachmentState = readVarint32(bb);
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

export interface TimezoneTransactionVO {
  offset?: number;
  total?: Long;
}

export function encodeTimezoneTransactionVO(message: TimezoneTransactionVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeTimezoneTransactionVO(message, bb);
  return toUint8Array(bb);
}

function _encodeTimezoneTransactionVO(message: TimezoneTransactionVO, bb: ByteBuffer): void {
  // optional int32 offset = 1;
  let $offset = message.offset;
  if ($offset !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($offset));
  }

  // optional int64 total = 2;
  let $total = message.total;
  if ($total !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $total);
  }
}

export function decodeTimezoneTransactionVO(binary: Uint8Array): TimezoneTransactionVO {
  return _decodeTimezoneTransactionVO(wrapByteBuffer(binary));
}

function _decodeTimezoneTransactionVO(bb: ByteBuffer): TimezoneTransactionVO {
  let message: TimezoneTransactionVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 offset = 1;
      case 1: {
        message.offset = readVarint32(bb);
        break;
      }

      // optional int64 total = 2;
      case 2: {
        message.total = readVarint64(bb, /* unsigned */ false);
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

export interface VipInfoV2VO {
  currentLevel?: number;
  levels?: VipLevelV2VO[];
}

export function encodeVipInfoV2VO(message: VipInfoV2VO): Uint8Array {
  let bb = popByteBuffer();
  _encodeVipInfoV2VO(message, bb);
  return toUint8Array(bb);
}

function _encodeVipInfoV2VO(message: VipInfoV2VO, bb: ByteBuffer): void {
  // optional int32 currentLevel = 1;
  let $currentLevel = message.currentLevel;
  if ($currentLevel !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($currentLevel));
  }

  // repeated VipLevelV2VO levels = 2;
  let array$levels = message.levels;
  if (array$levels !== undefined) {
    for (let value of array$levels) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeVipLevelV2VO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeVipInfoV2VO(binary: Uint8Array): VipInfoV2VO {
  return _decodeVipInfoV2VO(wrapByteBuffer(binary));
}

function _decodeVipInfoV2VO(bb: ByteBuffer): VipInfoV2VO {
  let message: VipInfoV2VO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 currentLevel = 1;
      case 1: {
        message.currentLevel = readVarint32(bb);
        break;
      }

      // repeated VipLevelV2VO levels = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.levels || (message.levels = []);
        values.push(_decodeVipLevelV2VO(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface TimezoneReferRewardVO {
  offset?: number;
  totalBonus?: Long;
  totalInviteBonus?: Long;
  totalDepositBonus?: Long;
  rewardList?: ReferRewardDateVO[];
  total?: Long;
}

export function encodeTimezoneReferRewardVO(message: TimezoneReferRewardVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeTimezoneReferRewardVO(message, bb);
  return toUint8Array(bb);
}

function _encodeTimezoneReferRewardVO(message: TimezoneReferRewardVO, bb: ByteBuffer): void {
  // optional int32 offset = 1;
  let $offset = message.offset;
  if ($offset !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($offset));
  }

  // optional int64 totalBonus = 2;
  let $totalBonus = message.totalBonus;
  if ($totalBonus !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $totalBonus);
  }

  // optional int64 totalInviteBonus = 3;
  let $totalInviteBonus = message.totalInviteBonus;
  if ($totalInviteBonus !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $totalInviteBonus);
  }

  // optional int64 totalDepositBonus = 4;
  let $totalDepositBonus = message.totalDepositBonus;
  if ($totalDepositBonus !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $totalDepositBonus);
  }

  // repeated ReferRewardDateVO rewardList = 5;
  let array$rewardList = message.rewardList;
  if (array$rewardList !== undefined) {
    for (let value of array$rewardList) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodeReferRewardDateVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional int64 total = 6;
  let $total = message.total;
  if ($total !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $total);
  }
}

export function decodeTimezoneReferRewardVO(binary: Uint8Array): TimezoneReferRewardVO {
  return _decodeTimezoneReferRewardVO(wrapByteBuffer(binary));
}

function _decodeTimezoneReferRewardVO(bb: ByteBuffer): TimezoneReferRewardVO {
  let message: TimezoneReferRewardVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 offset = 1;
      case 1: {
        message.offset = readVarint32(bb);
        break;
      }

      // optional int64 totalBonus = 2;
      case 2: {
        message.totalBonus = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 totalInviteBonus = 3;
      case 3: {
        message.totalInviteBonus = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 totalDepositBonus = 4;
      case 4: {
        message.totalDepositBonus = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // repeated ReferRewardDateVO rewardList = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.rewardList || (message.rewardList = []);
        values.push(_decodeReferRewardDateVO(bb));
        bb.limit = limit;
        break;
      }

      // optional int64 total = 6;
      case 6: {
        message.total = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface VipLevelV2VO {
  levelId?: Long;
  processMin?: Long;
  processMax?: Long;
  privilegeList?: VipPrivilegeV2VO[];
  giftBag?: VipGiftV2VO;
}

export function encodeVipLevelV2VO(message: VipLevelV2VO): Uint8Array {
  let bb = popByteBuffer();
  _encodeVipLevelV2VO(message, bb);
  return toUint8Array(bb);
}

function _encodeVipLevelV2VO(message: VipLevelV2VO, bb: ByteBuffer): void {
  // optional int64 levelId = 1;
  let $levelId = message.levelId;
  if ($levelId !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $levelId);
  }

  // optional int64 processMin = 2;
  let $processMin = message.processMin;
  if ($processMin !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $processMin);
  }

  // optional int64 processMax = 3;
  let $processMax = message.processMax;
  if ($processMax !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $processMax);
  }

  // repeated VipPrivilegeV2VO privilegeList = 4;
  let array$privilegeList = message.privilegeList;
  if (array$privilegeList !== undefined) {
    for (let value of array$privilegeList) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeVipPrivilegeV2VO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional VipGiftV2VO giftBag = 5;
  let $giftBag = message.giftBag;
  if ($giftBag !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeVipGiftV2VO($giftBag, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeVipLevelV2VO(binary: Uint8Array): VipLevelV2VO {
  return _decodeVipLevelV2VO(wrapByteBuffer(binary));
}

function _decodeVipLevelV2VO(bb: ByteBuffer): VipLevelV2VO {
  let message: VipLevelV2VO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 levelId = 1;
      case 1: {
        message.levelId = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 processMin = 2;
      case 2: {
        message.processMin = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 processMax = 3;
      case 3: {
        message.processMax = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // repeated VipPrivilegeV2VO privilegeList = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.privilegeList || (message.privilegeList = []);
        values.push(_decodeVipPrivilegeV2VO(bb));
        bb.limit = limit;
        break;
      }

      // optional VipGiftV2VO giftBag = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.giftBag = _decodeVipGiftV2VO(bb);
        bb.limit = limit;
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

export interface ReferInvitationMapUrlVO {
  urlMap?: { [key: string]: ReferInvitationUrlVO };
}

export function encodeReferInvitationMapUrlVO(message: ReferInvitationMapUrlVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeReferInvitationMapUrlVO(message, bb);
  return toUint8Array(bb);
}

function _encodeReferInvitationMapUrlVO(message: ReferInvitationMapUrlVO, bb: ByteBuffer): void {
  // optional map<string, ReferInvitationUrlVO> urlMap = 1;
  let map$urlMap = message.urlMap;
  if (map$urlMap !== undefined) {
    for (let key in map$urlMap) {
      let nested = popByteBuffer();
      let value = map$urlMap[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 18);
      let nestedValue = popByteBuffer();
      _encodeReferInvitationUrlVO(value, nestedValue);
      writeVarint32(nested, nestedValue.limit);
      writeByteBuffer(nested, nestedValue);
      pushByteBuffer(nestedValue);
      writeVarint32(bb, 10);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeReferInvitationMapUrlVO(binary: Uint8Array): ReferInvitationMapUrlVO {
  return _decodeReferInvitationMapUrlVO(wrapByteBuffer(binary));
}

function _decodeReferInvitationMapUrlVO(bb: ByteBuffer): ReferInvitationMapUrlVO {
  let message: ReferInvitationMapUrlVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional map<string, ReferInvitationUrlVO> urlMap = 1;
      case 1: {
        let values = message.urlMap || (message.urlMap = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: string | undefined;
        let value: ReferInvitationUrlVO | undefined;
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
              let valueLimit = pushTemporaryLength(bb);
              value = _decodeReferInvitationUrlVO(bb);
              bb.limit = valueLimit;
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: urlMap");
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

export interface MailRedDotVO {
  redDot?: boolean;
}

export function encodeMailRedDotVO(message: MailRedDotVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeMailRedDotVO(message, bb);
  return toUint8Array(bb);
}

function _encodeMailRedDotVO(message: MailRedDotVO, bb: ByteBuffer): void {
  // optional bool redDot = 1;
  let $redDot = message.redDot;
  if ($redDot !== undefined) {
    writeVarint32(bb, 8);
    writeByte(bb, $redDot ? 1 : 0);
  }
}

export function decodeMailRedDotVO(binary: Uint8Array): MailRedDotVO {
  return _decodeMailRedDotVO(wrapByteBuffer(binary));
}

function _decodeMailRedDotVO(bb: ByteBuffer): MailRedDotVO {
  let message: MailRedDotVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bool redDot = 1;
      case 1: {
        message.redDot = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ReferTotalPageDTO {
  relation?: number;
  pageNum?: number;
}

export function encodeReferTotalPageDTO(message: ReferTotalPageDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeReferTotalPageDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeReferTotalPageDTO(message: ReferTotalPageDTO, bb: ByteBuffer): void {
  // optional int32 relation = 1;
  let $relation = message.relation;
  if ($relation !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($relation));
  }

  // optional int32 pageNum = 2;
  let $pageNum = message.pageNum;
  if ($pageNum !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($pageNum));
  }
}

export function decodeReferTotalPageDTO(binary: Uint8Array): ReferTotalPageDTO {
  return _decodeReferTotalPageDTO(wrapByteBuffer(binary));
}

function _decodeReferTotalPageDTO(bb: ByteBuffer): ReferTotalPageDTO {
  let message: ReferTotalPageDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 relation = 1;
      case 1: {
        message.relation = readVarint32(bb);
        break;
      }

      // optional int32 pageNum = 2;
      case 2: {
        message.pageNum = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DailyBonusLongVO {
  award?: Long;
}

export function encodeDailyBonusLongVO(message: DailyBonusLongVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeDailyBonusLongVO(message, bb);
  return toUint8Array(bb);
}

function _encodeDailyBonusLongVO(message: DailyBonusLongVO, bb: ByteBuffer): void {
  // optional int64 award = 1;
  let $award = message.award;
  if ($award !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $award);
  }
}

export function decodeDailyBonusLongVO(binary: Uint8Array): DailyBonusLongVO {
  return _decodeDailyBonusLongVO(wrapByteBuffer(binary));
}

function _decodeDailyBonusLongVO(bb: ByteBuffer): DailyBonusLongVO {
  let message: DailyBonusLongVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 award = 1;
      case 1: {
        message.award = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface VipGiftV2VO {
  activityId?: string;
  pay?: number;
  bonus?: number;
  deposit?: number;
  canPay?: boolean;
}

export function encodeVipGiftV2VO(message: VipGiftV2VO): Uint8Array {
  let bb = popByteBuffer();
  _encodeVipGiftV2VO(message, bb);
  return toUint8Array(bb);
}

function _encodeVipGiftV2VO(message: VipGiftV2VO, bb: ByteBuffer): void {
  // optional string activityId = 1;
  let $activityId = message.activityId;
  if ($activityId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $activityId);
  }

  // optional int32 pay = 2;
  let $pay = message.pay;
  if ($pay !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($pay));
  }

  // optional int32 bonus = 3;
  let $bonus = message.bonus;
  if ($bonus !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($bonus));
  }

  // optional int32 deposit = 4;
  let $deposit = message.deposit;
  if ($deposit !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($deposit));
  }

  // optional bool canPay = 5;
  let $canPay = message.canPay;
  if ($canPay !== undefined) {
    writeVarint32(bb, 40);
    writeByte(bb, $canPay ? 1 : 0);
  }
}

export function decodeVipGiftV2VO(binary: Uint8Array): VipGiftV2VO {
  return _decodeVipGiftV2VO(wrapByteBuffer(binary));
}

function _decodeVipGiftV2VO(bb: ByteBuffer): VipGiftV2VO {
  let message: VipGiftV2VO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string activityId = 1;
      case 1: {
        message.activityId = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 pay = 2;
      case 2: {
        message.pay = readVarint32(bb);
        break;
      }

      // optional int32 bonus = 3;
      case 3: {
        message.bonus = readVarint32(bb);
        break;
      }

      // optional int32 deposit = 4;
      case 4: {
        message.deposit = readVarint32(bb);
        break;
      }

      // optional bool canPay = 5;
      case 5: {
        message.canPay = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface VipPrivilegeV2VO {
  id?: string;
  title?: string;
  content?: string;
  tableContent?: string;
  show?: boolean;
}

export function encodeVipPrivilegeV2VO(message: VipPrivilegeV2VO): Uint8Array {
  let bb = popByteBuffer();
  _encodeVipPrivilegeV2VO(message, bb);
  return toUint8Array(bb);
}

function _encodeVipPrivilegeV2VO(message: VipPrivilegeV2VO, bb: ByteBuffer): void {
  // optional string id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $id);
  }

  // optional string title = 2;
  let $title = message.title;
  if ($title !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $title);
  }

  // optional string content = 3;
  let $content = message.content;
  if ($content !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $content);
  }

  // optional string tableContent = 4;
  let $tableContent = message.tableContent;
  if ($tableContent !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $tableContent);
  }

  // optional bool show = 5;
  let $show = message.show;
  if ($show !== undefined) {
    writeVarint32(bb, 40);
    writeByte(bb, $show ? 1 : 0);
  }
}

export function decodeVipPrivilegeV2VO(binary: Uint8Array): VipPrivilegeV2VO {
  return _decodeVipPrivilegeV2VO(wrapByteBuffer(binary));
}

function _decodeVipPrivilegeV2VO(bb: ByteBuffer): VipPrivilegeV2VO {
  let message: VipPrivilegeV2VO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string id = 1;
      case 1: {
        message.id = readString(bb, readVarint32(bb));
        break;
      }

      // optional string title = 2;
      case 2: {
        message.title = readString(bb, readVarint32(bb));
        break;
      }

      // optional string content = 3;
      case 3: {
        message.content = readString(bb, readVarint32(bb));
        break;
      }

      // optional string tableContent = 4;
      case 4: {
        message.tableContent = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool show = 5;
      case 5: {
        message.show = !!readByte(bb);
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
  appVersion?: string;
  bundleId?: string;
  appName?: string;
  platform?: string;
  devId?: string;
  userId?: string;
  sessionId?: string;
  mobile?: string;
  mobilePassword?: string;
  code?: string;
  invitationCode?: string;
  invitationType?: string;
  imei?: string;
  afId?: string;
  gaId?: string;
  fbId?: string;
  uuid?: string;
  simulator?: boolean;
  root?: boolean;
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

  // optional string appVersion = 2;
  let $appVersion = message.appVersion;
  if ($appVersion !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $appVersion);
  }

  // optional string bundleId = 3;
  let $bundleId = message.bundleId;
  if ($bundleId !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $bundleId);
  }

  // optional string appName = 4;
  let $appName = message.appName;
  if ($appName !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $appName);
  }

  // optional string platform = 5;
  let $platform = message.platform;
  if ($platform !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $platform);
  }

  // optional string devId = 6;
  let $devId = message.devId;
  if ($devId !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $devId);
  }

  // optional string userId = 7;
  let $userId = message.userId;
  if ($userId !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $userId);
  }

  // optional string sessionId = 8;
  let $sessionId = message.sessionId;
  if ($sessionId !== undefined) {
    writeVarint32(bb, 66);
    writeString(bb, $sessionId);
  }

  // optional string mobile = 9;
  let $mobile = message.mobile;
  if ($mobile !== undefined) {
    writeVarint32(bb, 74);
    writeString(bb, $mobile);
  }

  // optional string mobilePassword = 10;
  let $mobilePassword = message.mobilePassword;
  if ($mobilePassword !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $mobilePassword);
  }

  // optional string code = 11;
  let $code = message.code;
  if ($code !== undefined) {
    writeVarint32(bb, 90);
    writeString(bb, $code);
  }

  // optional string invitationCode = 12;
  let $invitationCode = message.invitationCode;
  if ($invitationCode !== undefined) {
    writeVarint32(bb, 98);
    writeString(bb, $invitationCode);
  }

  // optional string invitationType = 13;
  let $invitationType = message.invitationType;
  if ($invitationType !== undefined) {
    writeVarint32(bb, 106);
    writeString(bb, $invitationType);
  }

  // optional string imei = 14;
  let $imei = message.imei;
  if ($imei !== undefined) {
    writeVarint32(bb, 114);
    writeString(bb, $imei);
  }

  // optional string afId = 15;
  let $afId = message.afId;
  if ($afId !== undefined) {
    writeVarint32(bb, 122);
    writeString(bb, $afId);
  }

  // optional string gaId = 16;
  let $gaId = message.gaId;
  if ($gaId !== undefined) {
    writeVarint32(bb, 130);
    writeString(bb, $gaId);
  }

  // optional string fbId = 17;
  let $fbId = message.fbId;
  if ($fbId !== undefined) {
    writeVarint32(bb, 138);
    writeString(bb, $fbId);
  }

  // optional string uuid = 18;
  let $uuid = message.uuid;
  if ($uuid !== undefined) {
    writeVarint32(bb, 146);
    writeString(bb, $uuid);
  }

  // optional bool simulator = 19;
  let $simulator = message.simulator;
  if ($simulator !== undefined) {
    writeVarint32(bb, 152);
    writeByte(bb, $simulator ? 1 : 0);
  }

  // optional bool root = 20;
  let $root = message.root;
  if ($root !== undefined) {
    writeVarint32(bb, 160);
    writeByte(bb, $root ? 1 : 0);
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

      // optional string appVersion = 2;
      case 2: {
        message.appVersion = readString(bb, readVarint32(bb));
        break;
      }

      // optional string bundleId = 3;
      case 3: {
        message.bundleId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string appName = 4;
      case 4: {
        message.appName = readString(bb, readVarint32(bb));
        break;
      }

      // optional string platform = 5;
      case 5: {
        message.platform = readString(bb, readVarint32(bb));
        break;
      }

      // optional string devId = 6;
      case 6: {
        message.devId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string userId = 7;
      case 7: {
        message.userId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string sessionId = 8;
      case 8: {
        message.sessionId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string mobile = 9;
      case 9: {
        message.mobile = readString(bb, readVarint32(bb));
        break;
      }

      // optional string mobilePassword = 10;
      case 10: {
        message.mobilePassword = readString(bb, readVarint32(bb));
        break;
      }

      // optional string code = 11;
      case 11: {
        message.code = readString(bb, readVarint32(bb));
        break;
      }

      // optional string invitationCode = 12;
      case 12: {
        message.invitationCode = readString(bb, readVarint32(bb));
        break;
      }

      // optional string invitationType = 13;
      case 13: {
        message.invitationType = readString(bb, readVarint32(bb));
        break;
      }

      // optional string imei = 14;
      case 14: {
        message.imei = readString(bb, readVarint32(bb));
        break;
      }

      // optional string afId = 15;
      case 15: {
        message.afId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string gaId = 16;
      case 16: {
        message.gaId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string fbId = 17;
      case 17: {
        message.fbId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string uuid = 18;
      case 18: {
        message.uuid = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool simulator = 19;
      case 19: {
        message.simulator = !!readByte(bb);
        break;
      }

      // optional bool root = 20;
      case 20: {
        message.root = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface MailAttachmentVO {
  id?: Long;
  type?: string;
  amount?: Long;
}

export function encodeMailAttachmentVO(message: MailAttachmentVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeMailAttachmentVO(message, bb);
  return toUint8Array(bb);
}

function _encodeMailAttachmentVO(message: MailAttachmentVO, bb: ByteBuffer): void {
  // optional int64 id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $id);
  }

  // optional string type = 2;
  let $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $type);
  }

  // optional int64 amount = 3;
  let $amount = message.amount;
  if ($amount !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $amount);
  }
}

export function decodeMailAttachmentVO(binary: Uint8Array): MailAttachmentVO {
  return _decodeMailAttachmentVO(wrapByteBuffer(binary));
}

function _decodeMailAttachmentVO(bb: ByteBuffer): MailAttachmentVO {
  let message: MailAttachmentVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 id = 1;
      case 1: {
        message.id = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional string type = 2;
      case 2: {
        message.type = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 amount = 3;
      case 3: {
        message.amount = readVarint64(bb, /* unsigned */ false);
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

export interface ReferRankTop20DTO {
  type?: number;
}

export function encodeReferRankTop20DTO(message: ReferRankTop20DTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeReferRankTop20DTO(message, bb);
  return toUint8Array(bb);
}

function _encodeReferRankTop20DTO(message: ReferRankTop20DTO, bb: ByteBuffer): void {
  // optional int32 type = 1;
  let $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($type));
  }
}

export function decodeReferRankTop20DTO(binary: Uint8Array): ReferRankTop20DTO {
  return _decodeReferRankTop20DTO(wrapByteBuffer(binary));
}

function _decodeReferRankTop20DTO(bb: ByteBuffer): ReferRankTop20DTO {
  let message: ReferRankTop20DTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 type = 1;
      case 1: {
        message.type = readVarint32(bb);
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

export interface ReferInvitationRechargeRateVO {
  min?: Long;
  max?: Long;
  rate?: number;
}

export function encodeReferInvitationRechargeRateVO(message: ReferInvitationRechargeRateVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeReferInvitationRechargeRateVO(message, bb);
  return toUint8Array(bb);
}

function _encodeReferInvitationRechargeRateVO(message: ReferInvitationRechargeRateVO, bb: ByteBuffer): void {
  // optional int64 min = 1;
  let $min = message.min;
  if ($min !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $min);
  }

  // optional int64 max = 2;
  let $max = message.max;
  if ($max !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $max);
  }

  // optional double rate = 3;
  let $rate = message.rate;
  if ($rate !== undefined) {
    writeVarint32(bb, 25);
    writeDouble(bb, $rate);
  }
}

export function decodeReferInvitationRechargeRateVO(binary: Uint8Array): ReferInvitationRechargeRateVO {
  return _decodeReferInvitationRechargeRateVO(wrapByteBuffer(binary));
}

function _decodeReferInvitationRechargeRateVO(bb: ByteBuffer): ReferInvitationRechargeRateVO {
  let message: ReferInvitationRechargeRateVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 min = 1;
      case 1: {
        message.min = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 max = 2;
      case 2: {
        message.max = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional double rate = 3;
      case 3: {
        message.rate = readDouble(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface TransactionDTO {
  startDate?: string;
  endDate?: string;
  type?: number;
  pageNum?: number;
}

export function encodeTransactionDTO(message: TransactionDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeTransactionDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeTransactionDTO(message: TransactionDTO, bb: ByteBuffer): void {
  // optional string startDate = 1;
  let $startDate = message.startDate;
  if ($startDate !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $startDate);
  }

  // optional string endDate = 2;
  let $endDate = message.endDate;
  if ($endDate !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $endDate);
  }

  // optional int32 type = 3;
  let $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($type));
  }

  // optional int32 pageNum = 4;
  let $pageNum = message.pageNum;
  if ($pageNum !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($pageNum));
  }
}

export function decodeTransactionDTO(binary: Uint8Array): TransactionDTO {
  return _decodeTransactionDTO(wrapByteBuffer(binary));
}

function _decodeTransactionDTO(bb: ByteBuffer): TransactionDTO {
  let message: TransactionDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string startDate = 1;
      case 1: {
        message.startDate = readString(bb, readVarint32(bb));
        break;
      }

      // optional string endDate = 2;
      case 2: {
        message.endDate = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 type = 3;
      case 3: {
        message.type = readVarint32(bb);
        break;
      }

      // optional int32 pageNum = 4;
      case 4: {
        message.pageNum = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ReferInvitationTotalVO {
  todayInvited?: number;
  totalInvited?: number;
  childList?: ReferInvitationTotalChildVO[];
  total?: Long;
}

export function encodeReferInvitationTotalVO(message: ReferInvitationTotalVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeReferInvitationTotalVO(message, bb);
  return toUint8Array(bb);
}

function _encodeReferInvitationTotalVO(message: ReferInvitationTotalVO, bb: ByteBuffer): void {
  // optional int32 todayInvited = 1;
  let $todayInvited = message.todayInvited;
  if ($todayInvited !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($todayInvited));
  }

  // optional int32 totalInvited = 2;
  let $totalInvited = message.totalInvited;
  if ($totalInvited !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($totalInvited));
  }

  // repeated ReferInvitationTotalChildVO childList = 3;
  let array$childList = message.childList;
  if (array$childList !== undefined) {
    for (let value of array$childList) {
      writeVarint32(bb, 26);
      let nested = popByteBuffer();
      _encodeReferInvitationTotalChildVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional int64 total = 4;
  let $total = message.total;
  if ($total !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $total);
  }
}

export function decodeReferInvitationTotalVO(binary: Uint8Array): ReferInvitationTotalVO {
  return _decodeReferInvitationTotalVO(wrapByteBuffer(binary));
}

function _decodeReferInvitationTotalVO(bb: ByteBuffer): ReferInvitationTotalVO {
  let message: ReferInvitationTotalVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 todayInvited = 1;
      case 1: {
        message.todayInvited = readVarint32(bb);
        break;
      }

      // optional int32 totalInvited = 2;
      case 2: {
        message.totalInvited = readVarint32(bb);
        break;
      }

      // repeated ReferInvitationTotalChildVO childList = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        let values = message.childList || (message.childList = []);
        values.push(_decodeReferInvitationTotalChildVO(bb));
        bb.limit = limit;
        break;
      }

      // optional int64 total = 4;
      case 4: {
        message.total = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DailyBonusVO {
  timeStamp?: Long;
  weekSignInDay?: Long;
  todaySignIn?: boolean;
  signInTitles?: string[];
  events?: DailyBonusEventVO[];
}

export function encodeDailyBonusVO(message: DailyBonusVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeDailyBonusVO(message, bb);
  return toUint8Array(bb);
}

function _encodeDailyBonusVO(message: DailyBonusVO, bb: ByteBuffer): void {
  // optional int64 timeStamp = 1;
  let $timeStamp = message.timeStamp;
  if ($timeStamp !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $timeStamp);
  }

  // optional int64 weekSignInDay = 2;
  let $weekSignInDay = message.weekSignInDay;
  if ($weekSignInDay !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $weekSignInDay);
  }

  // optional bool todaySignIn = 3;
  let $todaySignIn = message.todaySignIn;
  if ($todaySignIn !== undefined) {
    writeVarint32(bb, 24);
    writeByte(bb, $todaySignIn ? 1 : 0);
  }

  // repeated string signInTitles = 4;
  let array$signInTitles = message.signInTitles;
  if (array$signInTitles !== undefined) {
    for (let value of array$signInTitles) {
      writeVarint32(bb, 34);
      writeString(bb, value);
    }
  }

  // repeated DailyBonusEventVO events = 5;
  let array$events = message.events;
  if (array$events !== undefined) {
    for (let value of array$events) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodeDailyBonusEventVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeDailyBonusVO(binary: Uint8Array): DailyBonusVO {
  return _decodeDailyBonusVO(wrapByteBuffer(binary));
}

function _decodeDailyBonusVO(bb: ByteBuffer): DailyBonusVO {
  let message: DailyBonusVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 timeStamp = 1;
      case 1: {
        message.timeStamp = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 weekSignInDay = 2;
      case 2: {
        message.weekSignInDay = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional bool todaySignIn = 3;
      case 3: {
        message.todaySignIn = !!readByte(bb);
        break;
      }

      // repeated string signInTitles = 4;
      case 4: {
        let values = message.signInTitles || (message.signInTitles = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }

      // repeated DailyBonusEventVO events = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.events || (message.events = []);
        values.push(_decodeDailyBonusEventVO(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ReferRuleVO {
  rank?: string;
  rate?: number;
}

export function encodeReferRuleVO(message: ReferRuleVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeReferRuleVO(message, bb);
  return toUint8Array(bb);
}

function _encodeReferRuleVO(message: ReferRuleVO, bb: ByteBuffer): void {
  // optional string rank = 1;
  let $rank = message.rank;
  if ($rank !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $rank);
  }

  // optional double rate = 2;
  let $rate = message.rate;
  if ($rate !== undefined) {
    writeVarint32(bb, 17);
    writeDouble(bb, $rate);
  }
}

export function decodeReferRuleVO(binary: Uint8Array): ReferRuleVO {
  return _decodeReferRuleVO(wrapByteBuffer(binary));
}

function _decodeReferRuleVO(bb: ByteBuffer): ReferRuleVO {
  let message: ReferRuleVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string rank = 1;
      case 1: {
        message.rank = readString(bb, readVarint32(bb));
        break;
      }

      // optional double rate = 2;
      case 2: {
        message.rate = readDouble(bb);
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

export interface ReferInvitationNowVO {
  friendDeposit?: number;
  friendReg?: number;
  mutualFriendDeposit?: number;
  mutualFriendReg?: number;
  rechargeRateResponseList?: ReferInvitationRechargeRateVO[];
  top?: string;
  bottom?: string;
}

export function encodeReferInvitationNowVO(message: ReferInvitationNowVO): Uint8Array {
  let bb = popByteBuffer();
  _encodeReferInvitationNowVO(message, bb);
  return toUint8Array(bb);
}

function _encodeReferInvitationNowVO(message: ReferInvitationNowVO, bb: ByteBuffer): void {
  // optional double friendDeposit = 1;
  let $friendDeposit = message.friendDeposit;
  if ($friendDeposit !== undefined) {
    writeVarint32(bb, 9);
    writeDouble(bb, $friendDeposit);
  }

  // optional int32 friendReg = 2;
  let $friendReg = message.friendReg;
  if ($friendReg !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($friendReg));
  }

  // optional double mutualFriendDeposit = 3;
  let $mutualFriendDeposit = message.mutualFriendDeposit;
  if ($mutualFriendDeposit !== undefined) {
    writeVarint32(bb, 25);
    writeDouble(bb, $mutualFriendDeposit);
  }

  // optional int32 mutualFriendReg = 4;
  let $mutualFriendReg = message.mutualFriendReg;
  if ($mutualFriendReg !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($mutualFriendReg));
  }

  // repeated ReferInvitationRechargeRateVO rechargeRateResponseList = 5;
  let array$rechargeRateResponseList = message.rechargeRateResponseList;
  if (array$rechargeRateResponseList !== undefined) {
    for (let value of array$rechargeRateResponseList) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodeReferInvitationRechargeRateVO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional string top = 6;
  let $top = message.top;
  if ($top !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $top);
  }

  // optional string bottom = 7;
  let $bottom = message.bottom;
  if ($bottom !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $bottom);
  }
}

export function decodeReferInvitationNowVO(binary: Uint8Array): ReferInvitationNowVO {
  return _decodeReferInvitationNowVO(wrapByteBuffer(binary));
}

function _decodeReferInvitationNowVO(bb: ByteBuffer): ReferInvitationNowVO {
  let message: ReferInvitationNowVO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional double friendDeposit = 1;
      case 1: {
        message.friendDeposit = readDouble(bb);
        break;
      }

      // optional int32 friendReg = 2;
      case 2: {
        message.friendReg = readVarint32(bb);
        break;
      }

      // optional double mutualFriendDeposit = 3;
      case 3: {
        message.mutualFriendDeposit = readDouble(bb);
        break;
      }

      // optional int32 mutualFriendReg = 4;
      case 4: {
        message.mutualFriendReg = readVarint32(bb);
        break;
      }

      // repeated ReferInvitationRechargeRateVO rechargeRateResponseList = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.rechargeRateResponseList || (message.rechargeRateResponseList = []);
        values.push(_decodeReferInvitationRechargeRateVO(bb));
        bb.limit = limit;
        break;
      }

      // optional string top = 6;
      case 6: {
        message.top = readString(bb, readVarint32(bb));
        break;
      }

      // optional string bottom = 7;
      case 7: {
        message.bottom = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DailyBonusAwardDTO {
  eventId?: Long;
}

export function encodeDailyBonusAwardDTO(message: DailyBonusAwardDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeDailyBonusAwardDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeDailyBonusAwardDTO(message: DailyBonusAwardDTO, bb: ByteBuffer): void {
  // optional int64 eventId = 1;
  let $eventId = message.eventId;
  if ($eventId !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $eventId);
  }
}

export function decodeDailyBonusAwardDTO(binary: Uint8Array): DailyBonusAwardDTO {
  return _decodeDailyBonusAwardDTO(wrapByteBuffer(binary));
}

function _decodeDailyBonusAwardDTO(bb: ByteBuffer): DailyBonusAwardDTO {
  let message: DailyBonusAwardDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 eventId = 1;
      case 1: {
        message.eventId = readVarint64(bb, /* unsigned */ false);
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
