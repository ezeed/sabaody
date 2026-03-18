import { createHash } from 'crypto';

function hashStringNode(message) {
  const hash = createHash('sha256');
  hash.update(message);
  const hashedValue = hash.digest('hex');
  return hashedValue;
}

console.log(hashStringNode('my-str'));
