import Dictionary from './Dictionary';

const translations = new Dictionary();
const {
  translate, updateDictionary, changeLocale, config, translateKey,
} = translations;

export {
  translate, translateKey, updateDictionary, changeLocale, config, Dictionary,
};
