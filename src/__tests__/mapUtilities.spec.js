import { generateTranslationMap, getTextWithPlaceholders } from '../mapUtilities';
import dictionary, {
  SPANISH_LOCALE,
  englishDictionary,
  spanshiDictionary,
} from './dictionary.fixture';
import { DEFAULT_LOCALE, VAR_REGEX } from '../constants';

const options = {
  defaultLocale: DEFAULT_LOCALE,
  locale: SPANISH_LOCALE,
  variableMatcher: VAR_REGEX,
};

describe('mapUtilities', () => {
  describe('when current locale is different', () => {
    it('should create a mapping english -> spanish', () => {
      const result = generateTranslationMap(dictionary, options);

      expect(result[englishDictionary.title].text).toEqual(spanshiDictionary.title);
    });

    it('should calculate parameter positions for english -> spanish', () => {
      const result = generateTranslationMap(dictionary, options);

      expect(
        result[getTextWithPlaceholders(englishDictionary.titleWithMixedParams, options)].positions,
      ).toEqual([1, 0]);
    });
  });

  describe('when current locale is the same as default', () => {
    it('should create a mapping english -> english', () => {
      const result = generateTranslationMap(dictionary, { ...options, locale: DEFAULT_LOCALE });

      expect(result[englishDictionary.title].text).toEqual(englishDictionary.title);
    });

    it('should return correct parameter positions as they are in original', () => {
      const result = generateTranslationMap(dictionary, { ...options, locale: DEFAULT_LOCALE });

      expect(
        result[getTextWithPlaceholders(englishDictionary.titleWithMixedParams, options)].positions,
      ).toEqual([0, 1]);
    });
  });
});
