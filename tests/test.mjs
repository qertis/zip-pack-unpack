import test from 'node:test';
import assert from 'node:assert/strict';
import { unpack, pack } from '../src/index.mjs';

test('zip-tests', async (t) => {
  const testPack = await pack([
    {
      buffer: Buffer.from('test', 'utf8'),
      filename: 'test.txt',
    },
  ]);

  test('pack', async (t) => {
    const maptestUnpackBuffer = await unpack(testPack);
    assert.strictEqual(maptestUnpackBuffer.size, 1);
    maptestUnpackBuffer.forEach((value) => {
      assert.ok(Buffer.isBuffer(value));
      assert.strictEqual(value.toString('utf8'), 'test');
    });
  });

  test('unpack', async (t) => {
    const testPackBase64 = testPack.toString('base64');
    const testUnpackFromBase64 = Buffer.from(testPackBase64, 'base64');
    const maptestUnpackBufferFromBase64 = await unpack(testUnpackFromBase64);
    assert.strictEqual(maptestUnpackBufferFromBase64.size, 1);
  });
});
