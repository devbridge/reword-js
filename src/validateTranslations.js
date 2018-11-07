/* eslint-disable no-console */

import { DEFAULT_LOCALE, VAR_REGEX } from './constants';

function validateParams(defaultText, text) {
  const defaultParams = defaultText.match(VAR_REGEX) || [];
  const params = text.match(VAR_REGEX) || [];

  const exessParams = params.filter(param => defaultParams.every(p => p !== param));
  const missingParams = defaultParams.filter(param => params.every(p => p !== param));

  if (exessParams.length || missingParams.length) {
    return {
      exessParams,
      missingParams,
    };
  }

  return null;
}

function buildError({
  locale,
  key,
  error = 'Unknow error',
  missingParams = [],
  exessParams = [],
} = {}) {
  return {
    locale,
    key,
    error,
    missingParams: missingParams.join(','),
    exessParams: exessParams.join(','),
  };
}

function validateKeys(defaultDictionary, dictionary, locale, previousKey = '', result = []) {
  return Object.keys(defaultDictionary).reduce((agg, key) => {
    const translateText = dictionary[key];

    if (!translateText) {
      return [
        ...agg,
        buildError({
          locale,
          key: `${previousKey}${key}`,
          error: 'Translation does not exist',
        }),
      ];
    }

    if (typeof translateText === 'object') {
      return validateKeys(defaultDictionary[key], dictionary[key], locale, `${key}.`, agg);
    }

    const paramErrors = validateParams(defaultDictionary[key], translateText);

    if (paramErrors) {
      return [
        ...agg,
        buildError({
          locale,
          key: `${previousKey}${key}`,
          error: 'Params missing',
          ...paramErrors,
        }),
      ];
    }

    return agg;
  }, result);
}

function validateDictionary(translations, locale) {
  const defaultDictionary = translations[DEFAULT_LOCALE];
  const dictionary = translations[locale];

  return validateKeys(defaultDictionary, dictionary, locale);
}

export default function validateTranslations(translations) {
  const errors = Object.keys(translations)
    .filter(key => key !== DEFAULT_LOCALE)
    .map(key => ({
      locale: key,
      errors: validateDictionary(translations, key),
    }));

  return errors.reduce((agg, err) => {
    if (err.errors.length) {
      return [...agg, ...err.errors];
    }

    return agg;
  }, []);
}
