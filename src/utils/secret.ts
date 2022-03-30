const cryptoA = import('crypto');

const newCrypto = async (): Promise<Buffer[]> => {
  const { randomBytes } = await cryptoA;
  const key = randomBytes(192 / 8);
  const iv = randomBytes(128 / 8);
  return [key, iv];
};

const algorithm = 'aes192';
const encoding = 'hex';

// 加密
async function aesEncrypt(data) {
  const [key, iv] = await newCrypto();
  const cipher = (await cryptoA).createCipheriv(algorithm, key, iv);
  let crypted = cipher.update(data, 'utf8', encoding);
  crypted += cipher.final(encoding);
  return crypted;
}

// 解密
async function aesDecrypt(encrypted) {
  const [key, iv] = await newCrypto();
  const decipher = (await cryptoA).createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, encoding, 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export { aesEncrypt, aesDecrypt };
