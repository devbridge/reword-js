import { DEFAULT_LOCALE, VAR_REGEX } from '../constants';

export const SPANISH_LOCALE = 'es-Es';

export const englishDictionary = {
  title: 'Some Title English',
  titleWithParams: 'Title with {lastName} {firstName} English',
  titleWithMixedParams: 'Title with mixed parameters {lastName} {firstName} English',
  titleWithDoubleParams: 'Title with double params {lastName} {firstName} English',
  nested: {
    translation: 'Nested translation English',
  },
};

export const spanshiDictionary = {
  title: 'Some Title Spanish',
  titleWithParams: 'Title with {lastName} {firstName} Spanish',
  titleWithMixedParams: 'Title with mixed parameters {firstName} {lastName} Spanish',
  titleWithDoubleParams: 'Title with double params {lastName} {firstName} {lastName} Spanish',
  nested: {
    translation: 'Nested translation Spanish',
  },
};

export const options = {
  defaultLocale: DEFAULT_LOCALE,
  locale: SPANISH_LOCALE,
  variableMatcher: VAR_REGEX,
};

export default {
  [DEFAULT_LOCALE]: englishDictionary,
  [SPANISH_LOCALE]: spanshiDictionary,
};
