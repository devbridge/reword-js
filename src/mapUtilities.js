import { PLACEHOLDER } from './constants';

export function getLocaleDictionary(dictionary, locale) {
  return dictionary[locale] || {};
}

export function getTextWithPlaceholders(text, options) {
  return text.replace(options.variableMatcher, PLACEHOLDER);
}

function getParameterPositions(defaultText, text, options) {
  const defaultPositions = defaultText.match(options.variableMatcher) || [];
  const translationPositions = text.match(options.variableMatcher) || [];

  return translationPositions.map(val => defaultPositions.indexOf(val));
}

function traverseDictionary(defaultDictionary, localeDictionary, result = {}, options) {
  return Object.keys(defaultDictionary).reduce((agg, key) => {
    const defaultText = defaultDictionary[key];
    const text = localeDictionary[key];

    if (typeof text === 'object') {
      return traverseDictionary(defaultDictionary[key], localeDictionary[key], agg, options);
    }

    return {
      ...agg,
      [getTextWithPlaceholders(defaultText, options)]: {
        text: getTextWithPlaceholders(text, options),
        positions: getParameterPositions(defaultText, text, options),
      },
    };
  }, result);
}

export function generateTranslationMap(dictionary, options) {
  const defaultDictionary = getLocaleDictionary(dictionary, options.defaultLocale);
  const localeDictionary = getLocaleDictionary(dictionary, options.locale);

  if (!localeDictionary) {
    return {};
  }

  return traverseDictionary(defaultDictionary, localeDictionary, {}, options);
}
