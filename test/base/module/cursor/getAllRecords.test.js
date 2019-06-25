/**
 * kintone api - nodejs client
 * test record cursor module
 */

const common = require('../../../utils/common');
const {RecordCursor, Connection, Auth} = require('../../../../src/base/main');

const auth = new Auth();
auth.setPasswordAuth(common.USERNAME, common.PASSWORD);

const conn = new Connection(common.DOMAIN, auth);

describe('getAllRecords function', ()=>{
  describe('Successful case', () => {
    it('All records are get successfully', ()=>{
      const appID = 1;
      const fields = [];
      const query = '';
      const size = 2;

      let totalCount;

      const rc = new RecordCursor(conn);
      return rc.createCursor(appID, fields, query, size)
        .then((response)=>{
          expect(response).toHaveProperty('id');
          expect(response).toHaveProperty('totalCount');
          totalCount = parseInt(response.totalCount, 10);
          return rc.getAllRecords(response.id);
        })
        .then((recordsResponse)=>{
          expect(recordsResponse).toHaveProperty('records');
          expect(Array.isArray(recordsResponse.records)).toBe(true);
          expect(recordsResponse.records.length).toEqual(totalCount);
          expect(recordsResponse).toHaveProperty('totalCount');
          expect(recordsResponse.totalCount).toEqual(totalCount);
        });
    });
  });
});