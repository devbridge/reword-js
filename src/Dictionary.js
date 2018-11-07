import {
  DEFAULT_LOCALE, VAR_REGEX, PLACEHOLDER, PLACEHOLDER_REGEX, TEXT,
} from './constants';
import { isDevelopment } from './env';
import { getTextWithPlaceholders, generateTranslationMap } from './mapUtilities';
import Reporting from './Reporting';
import validateTranslations from './validateTranslations';
import get from './utils/get';

function fillWithValues(text, interpolations = [], positions = []) {
  let index = 0;

  return text.replace(PLACEHOLDER_REGEX, () => {
    const position = typeof positions[index] === 'undefined' ? index : positions[index];
    const interpolation = typeof interpolations[position] === 'undefined' ? '' : interpolations[position];
    index += 1;

    return interpolation;
  });
}

const defaultOptions = {
  defaultLocale: DEFAULT_LOCALE,
  locale: DEFAULT_LOCALE,
  variableMatcher: VAR_REGEX,
  placeholderMatcher: PLACEHOLDER_REGEX,
  placeholder: PLACEHOLDER,
  debug: isDevelopment(),
  translationNotFoundMessage: TEXT.TRANSLATION_NOT_FOUND,
};

export default class Dictionary {
  constructor(dictionary = {}, options = {}) {
    this.config(dictionary, options);
    this.initialised = true;
  }

  config = (dictionary = {}, options = {}) => {
    this.options = { ...defaultOptions, ...options };
    this.reporting = new Reporting({ debug: this.options.debug });
    this.updateDictionary(dictionary);
    this.translationMap = generateTranslationMap(this.dictionary, this.options);
  };

  changeLocale = (locale) => {
    this.options.locale = locale;
    this.translationMap = generateTranslationMap(this.dictionary, this.options);
  };

  updateDictionary = (dictionary) => {
    this.dictionary = dictionary;

    const errors = validateTranslations(dictionary);

    if (errors.length) {
      this.reporting.table(errors);
    }

    this.translationMap = generateTranslationMap(this.dictionary, this.options);
  };

  translate = (strings, ...interpolations) => {
    const fragments = Array.isArray(strings)
      ? strings
      : [getTextWithPlaceholders(strings, this.options)];
    const template = fragments.join(PLACEHOLDER).trim();
    const translation = this.translationMap[template];

    if (!translation && this.initialised) {
      this.reporting.warn(
        `Translation not found for template "${template}" current locale "${this.options.locale}"`,
      );
    }

    if (!translation) {
      return fillWithValues(fragments.join(PLACEHOLDER), interpolations);
    }

    const { text, positions } = translation;

    return fillWithValues(text, interpolations, positions);
  };

  translateKey = (key, ...interpolations) => {
    const defaultTranslation = get(this.dictionary[this.options.defaultLocale], key, '');
    const translation = this.translationMap[
      getTextWithPlaceholders(defaultTranslation, this.options)
    ];

    if (!translation) {
      return this.options.translationNotFoundMessage;
    }

    const { text, positions } = translation;

    return fillWithValues(text, interpolations, positions);
  };
}
