import Dictionary from '../Dictionary';
import dictionary, {
  SPANISH_LOCALE,
  englishDictionary,
  spanshiDictionary,
} from './dictionary.fixture';
import { TEXT } from '../constants';

let translations;

describe('Translation module', () => {
  beforeEach(() => {
    translations = new Dictionary(dictionary);
  });

  describe('when trannslating by text', () => {
    it('should show provided text if translation is not found', () => {
      expect(translations.translate`Test text`).toBe('Test text');
    });

    it('should show differen text when language is changed', () => {
      translations.changeLocale(SPANISH_LOCALE);

      expect(translations.translate(englishDictionary.title)).toBe(spanshiDictionary.title);
    });

    it('should insert parameters to placeholders for both languages', () => {
      const lastName = 'Wells';
      const firstName = 'Greg';

      expect(translations.translate`Title with ${lastName} ${firstName} English`).toBe(
        `Title with ${lastName} ${firstName} English`,
      );

      translations.changeLocale(SPANISH_LOCALE);

      expect(translations.translate`Title with ${lastName} ${firstName} English`).toBe(
        `Title with ${lastName} ${firstName} Spanish`,
      );
    });

    it('should insert parameters in different order based on the language setting', () => {
      const lastName = 'Wells';
      const firstName = 'Greg';

      expect(
        translations.translate`Title with mixed parameters ${lastName} ${firstName} English`,
      ).toBe(`Title with mixed parameters ${lastName} ${firstName} English`);

      translations.changeLocale(SPANISH_LOCALE);

      expect(
        translations.translate`Title with mixed parameters ${lastName} ${firstName} English`,
      ).toBe(`Title with mixed parameters ${firstName} ${lastName} Spanish`);
    });

    it('should replace parameters provided as functiion parameters', () => {
      const lastName = 'Wells';
      const firstName = 'Greg';

      expect(translations.translate(englishDictionary.titleWithParams, lastName, firstName)).toBe(
        `Title with ${lastName} ${firstName} English`,
      );
    });

    it('should insert lastName twice if required by translation', () => {
      const lastName = 'Wells';
      const firstName = 'Greg';

      translations.changeLocale(SPANISH_LOCALE);

      expect(
        translations.translate`Title with double params ${lastName} ${firstName} English`,
      ).toBe(`Title with double params ${lastName} ${firstName} ${lastName} Spanish`);
    });

    it('should return translation form a deeply nested object', () => {
      translations.changeLocale(SPANISH_LOCALE);

      expect(translations.translate`Nested translation English`).toEqual(
        'Nested translation Spanish',
      );
    });
  });

  describe('when translating by key', () => {
    it(`should show ${TEXT.TRANSLATION_NOT_FOUND} if no key was found`, () => {
      expect(translations.translateKey('nonexistentKey')).toBe(TEXT.TRANSLATION_NOT_FOUND);
    });

    it('should show default text based on locale', () => {
      expect(translations.translateKey('title')).toBe(englishDictionary.title);
    });

    it('should show selected locale text', () => {
      translations.changeLocale(SPANISH_LOCALE);

      expect(translations.translateKey('title')).toBe(spanshiDictionary.title);
    });

    it('should insert parameters to placeholders for both languages', () => {
      const lastName = 'Wells';
      const firstName = 'Greg';

      expect(translations.translateKey('titleWithParams', lastName, firstName)).toBe(
        `Title with ${lastName} ${firstName} English`,
      );

      translations.changeLocale(SPANISH_LOCALE);

      expect(translations.translateKey('titleWithParams', lastName, firstName)).toBe(
        `Title with ${lastName} ${firstName} Spanish`,
      );
    });

    it('should insert parameters in different order based on the language setting', () => {
      const lastName = 'Wells';
      const firstName = 'Greg';

      expect(translations.translateKey('titleWithMixedParams', lastName, firstName)).toBe(
        `Title with mixed parameters ${lastName} ${firstName} English`,
      );

      translations.changeLocale(SPANISH_LOCALE);

      expect(translations.translateKey('titleWithMixedParams', lastName, firstName)).toBe(
        `Title with mixed parameters ${firstName} ${lastName} Spanish`,
      );
    });

    it('should insert lastName twice if required by translation', () => {
      const lastName = 'Wells';
      const firstName = 'Greg';

      translations.changeLocale(SPANISH_LOCALE);

      expect(translations.translateKey('titleWithDoubleParams', lastName, firstName)).toBe(
        `Title with double params ${lastName} ${firstName} ${lastName} Spanish`,
      );
    });

    it('should return translation form a deeply nested object', () => {
      translations.changeLocale(SPANISH_LOCALE);

      expect(translations.translateKey('nested.translation')).toEqual('Nested translation Spanish');
    });
  });
});
