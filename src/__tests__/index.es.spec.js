import {
  translate,
  updateDictionary,
  changeLocale,
  Dictionary,
  config,
  translateKey,
} from '../index';
import DictionaryOriginal from '../Dictionary';

describe('library', () => {
  it('should have all the methods as a require import', () => {
    expect(typeof translate).toEqual('function');
    expect(typeof updateDictionary).toEqual('function');
    expect(typeof changeLocale).toEqual('function');
    expect(typeof config).toEqual('function');
    expect(typeof translateKey).toEqual('function');
    expect(Dictionary).toEqual(DictionaryOriginal);
  });
});
