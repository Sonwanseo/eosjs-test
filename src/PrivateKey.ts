// import { Buffer } from 'buffer';

import { ec as EC } from 'elliptic';

export enum KeyType {
  k1 = 0,
  r1 = 1,
  wa = 2,
}

export interface Key {
  type: KeyType;
  data: Uint8Array;
}

export const constructElliptic = (type: KeyType): EC => {
  if (type === KeyType.k1) {
    return new EC('secp256k1');
  }
  return new EC('p256');
};

/** Represents/stores a private key and provides easy conversion for use with `elliptic` lib */
export class PrivateKey {
  constructor(private key: Key, private ec: EC) {}

  /** Instantiate private key from an `elliptic`-format private key */
  public static fromElliptic(
    privKey: EC.KeyPair,
    keyType: KeyType,
    ec?: EC,
  ): PrivateKey {
    if (!ec) {
      ec = constructElliptic(keyType);
    }
    return new PrivateKey(
      {
        type: keyType,
        data: privKey.getPrivate().toArrayLike(Buffer, 'be', 32),
      },
      ec,
    );
  }
}
