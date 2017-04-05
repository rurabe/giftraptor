'use strict';

const LinkHelpers = require('../../src/js/helpers/link_helpers');

describe('LinkHelpers#referify',() => {

  describe('undefined links',() => {
    test('returns falsey for undefined input',() => {
      let submitted = undefined;
      expect(LinkHelpers.referify(submitted)).toBeFalsy();
    });
  });

  describe('Amazon',() => {
    test('adds param to link without param',() => {
      let submitted = 'https://www.amazon.com/Ball-40014-plain-drinking-16/dp/B00067LAFG/ref=sr_1_3?rps=1&ie=UTF8&qid=1453839260&sr=8-3';
      expect(LinkHelpers.referify(submitted)).toMatch(/\?.*tag=giftraptor-20/i);
    });

    test('replaces a param already in the link',() => {
      let submitted = 'https://www.amazon.com/Ball-40014-plain-drinking-16/dp/B00067LAFG/ref=sr_1_3?rps=1&ie=UTF8&tag=someoneelse&qid=1453839260&sr=8-3';
      expect(LinkHelpers.referify(submitted)).toMatch(/\?.*tag=giftraptor-20/i);
      expect(LinkHelpers.referify(submitted)).not.toMatch(/\?.*tag=someoneelse/i)
    });
  });


});
