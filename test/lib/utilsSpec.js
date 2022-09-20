import { expect } from 'chai';
import { v4 as uuidv4 } from 'uuid';
import { addHyphensToUUID, isValidDatabaseName } from '../../lib/utils.js';

describe('utils', function () {
  describe('addHyphensToUUID', function () {
    it('should be valid', () => {
      const UUID = uuidv4();
      const hex = UUID.split('-').join('');
      expect(addHyphensToUUID(hex)).to.equal(UUID);
    });
  });
  describe('isValidDatabaseName', function () {
    it('should be valid', () => {
      const validNames = [
        'somedb_123123',
        'somedb-123123',
        'SOME_DB-1231',
        'SOMEDB&1231',
      ];
      validNames.forEach((n) => {
        expect(isValidDatabaseName(n)).to.equal(true, `Expected "${n}" to be a valid name`);
      });
    });

    it('should be invalid', () => {
      const invalidNames = [
        '',
        'somedb 123123',
        'SOME$DB1231',
        'SOMEDB<1231',
        'SOMEDB>1231',
        '1234567890123456789012345678901234567890123456789012345678901234',
        'SOMEDB"123',
      ];
      invalidNames.forEach((n) => {
        expect(isValidDatabaseName(n)).to.equal(false, `Expected "${n}" to be an invalid name`);
      });
    });
  });
});
