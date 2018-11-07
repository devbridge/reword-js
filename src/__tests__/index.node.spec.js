const reword = require('../index');
const Dictionary = require('../Dictionary').default;

describe('library', () => {
  it('should have all the methods as a require import', () => {
    expect(typeof reword.translate).toEqual('function');
    expect(typeof reword.updateDictionary).toEqual('function');
    expect(typeof reword.changeLocale).toEqual('function');
    expect(typeof reword.config).toEqual('function');
    expect(typeof reword.translateKey).toEqual('function');
    expect(reword.Dictionary).toEqual(Dictionary);
  });
});
