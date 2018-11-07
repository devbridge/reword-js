import valdiateTranslations from '../validateTranslations';
import dictionary, { SPANISH_LOCALE, spanshiDictionary } from './dictionary.fixture';

describe('validateTranslations()', () => {
  it('should return an empty array if no errors are found', () => {
    expect(valdiateTranslations(dictionary)).toEqual([]);
  });

  it('should return error for all of the keys missing in empty dictionary', () => {
    const result = valdiateTranslations({
      ...dictionary,
      [SPANISH_LOCALE]: {
        nested: {},
      },
    });

    expect(result.length).toEqual(5);
  });

  it('should return only missing values from the provided dictionary', () => {
    const result = valdiateTranslations({
      ...dictionary,
      [SPANISH_LOCALE]: {
        title: spanshiDictionary.title,
        titleWithDoubleParams: spanshiDictionary.titleWithDoubleParams,
      },
    });

    expect(result.length).toEqual(3);
  });

  it('should return parameters missing error', () => {
    const result = valdiateTranslations({
      ...dictionary,
      [SPANISH_LOCALE]: {
        ...spanshiDictionary,
        titleWithParams: 'Only {firstName}',
      },
    });

    expect(result[0].missingParams).toEqual('{lastName}');
  });

  it('should return exess parameter error', () => {
    const result = valdiateTranslations({
      ...dictionary,
      [SPANISH_LOCALE]: {
        ...spanshiDictionary,
        titleWithParams: `${spanshiDictionary.titleWithParams} {middleName}`,
      },
    });

    expect(result[0].exessParams).toEqual('{middleName}');
  });
});
