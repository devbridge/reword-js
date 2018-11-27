# reword-js &middot; ![GitHub release](https://img.shields.io/github/release/devbridge/reword-js.svg) ![CircleCI branch](https://img.shields.io/circleci/project/github/devbridge/reword-js/master.svg) ![David](https://img.shields.io/david/dev/devbridge/reword-js.svg) ![GitHub issues](https://img.shields.io/github/issues-raw/devbridge/reword-js.svg) ![GitHub](https://img.shields.io/github/license/devbridge/reword-js.svg) ![GitHub stars](https://img.shields.io/github/stars/devbridge/reword-js.svg?style=social&label=Stars)

**reword-js** is a zero dependency, minimal translation library written in JavaScript. Working in the browser and nodejs applications, **reword-js** provides an easy way to translate texts either by key or text content, with possibility to add dynamic parameters.

# Installation

via [npm](https://www.npmjs.com/)

`$ npm install reword-js`

via [yarn](https://yarnpkg.com/lang/en/)

`$ yarn add reword-js`

# Usage

As a node module

```js
const reword = require('reword-js');

reword.config(
  {
    /* ...dictionary */
  },
  {
    /* ...options */
  }
);

reword.translate`Default language text`; // translated language text
reword.translateKey('someKey'); // translated language text
```

As an ecmascript module

```js
import { config, translate, translateKey } from 'reword-js';

config(
  {
    /* ...dictionary */
  },
  {
    /* ...options */
  }
);

translate`Default language text`; // translated language text
translateKey('someKey'); // translated language text
```

As a script tag

```html
<!DOCTYPE html>

<html lang="en">
  <head> </head>

  <body>
    <script src="<path-to-the-module>/reword.umd.js"></script>
    <script type="text/javascript">
      reword.config(
        {
          /* ...dictionary */
        },
        {
          /* ...options */
        }
      );

      reword.translate`Default language text`; // translated language text
      reword.translateKey('someKey'); // translated language text
    </script>
  </body>
</html>
```

# Initialization

Reword can be used as a global instance, or separate instances created manually.

Example:

```js
import { Dictionary, config } from 'reword-js';

//initialize as a standalone instance
const reword = new Dictionary(dictionary, options);

//initialize as a global instance
config(dictionary, options);
```

# Translation

Translating text can be acomplished in two ways. Either by key or by actual text. Reasoning behind text translation is that we have a natural fallback if translation key does not exist, interpolation also works just like a plain string which is more easier to read. Key translation is implemented for convenience as it is commonly used throughout other packages/languages.

Example:

```js
import { translate, translateKey } from 'reword-js';

const dictionary = {
  'en-US': {
    example: 'Translated language text'
  },
  'xx-XX': {
    example: 'Translated other language text'
  }
};

config(dictionary, { locale: 'xx-XX' });

// Translate by text.
reword.translate`Translated language text`; // Translated language text

// Translate by key.
reword.translateKey('example'); // Translated other language text
```

# Interpolation

Adding dynamic values to translations is as easy as adding them to a hard coded string. Reword will also change variable order if the destination language has them ordered differently.

Example:

```js
import { translate, translateKey, config } from 'reword-js';

const dictionary = {
  'en-US': {
    example: 'Text with param {one} and param {two}'
  },
  'xx-XX': {
    example: 'Text replaced with param {two} and param {one}'
  }
};

config(dictionary, { locale: 'xx-XX' });

const one = 'Foo';
const two = 'Bar';

// Text based translation
translate`Text with param ${one} and param ${two}`; // Text replaced with param Bar and param Foo

// Key based translation
translateKey('example', one, two); // Text replaced with param Bar and param Foo
```

# Dictionary object

Dictionary is the primary object that holds all of the languages and translations. Must include a default language (see options object) and at least one of the translations. dictionary object can be nested as well.

Example:

```js
const dictionary = {
  // Default language which is specified in options
  'en-US': {
    example: 'Translated language text',
    nested: {
      example: 'Translated nested language text'
    }
  },
  // One or more languages with coresponding keys.
  'xx-XX': {
    example: 'Translated other language text',
    nested: {
      example: 'Translated nested other language text'
    }
  }
};
```

# Options object

`config` or `Dictionary` instance accepts an `options` object, which is shallow merged with the default options:

- `defaultLocale`: Sets base locale for reword all of the translations are based on the default language (defaults to `en-US`)
- `locale`: Sets initial locale so reword know which is the destination language (defaults to `en-US`)
- `variableMatcher`: Regular expression pattern which identifies variables for interpolation (defaults to `/\{(.*?)\}/g`)
- `translationNotFoundMessage`: Content display when a translation is not found. Only applies when translating by key. (defaults to `TRANSLATION_NOT_FOUND`)
- `debug`: Debugging option which provides information on missing translations/parameters see [Debugging](#debugging). (defaults to `production` when used as a `umd` module and respects `process.env.NODE_ENV` while using `cjs` or `es` modules)

Example:

```js
import { Dictionary, config } from 'reword-js';

const dictionary = {};
const options = {
  defaultLocale: 'en-US', // defaults to en-US
  locale: 'es-ES'
  variableMatcher: /\{(.*?)\}/g,
  translationNotFoundMessage: 'Could not find any key to translate'
  debug: true // or false
};

// Using with global instance
config(dictionary, options)

// Using with dedicated instance
const translations = new Dictionary(dictionary, options);
```

# API Reference

Reword public instance is initialized on module import thus contains all of the methods described in the api refrence.

### `Dictionary.prototype.config(dictionary, options)`

Works like a constructor method, used to re-initialize the dictionary.

### `Dictionary.prototype.changeLocale(localeString)`

Changes destination language to a desired one.

### `Dictionary.prototype.updateDictionary(dictionary)`

Overwrites dictionary with a new one. Does not update any options.

### `Dictionary.prototype.translate(string, [...parameters])`

Can be called as template string or as a regular function.

```js
const translateString = `String with {numberOfParams}`;

translate`String with ${numberOfParams}`;

translate(translateString, numberOfParams);
```

### `Dictionary.prototype.translateKey(key, [...parameters])`

A dictionary key can be provided to translate via key instead of text. If no key was found it will show text defined in the options object see [Options object](#options-object)

```js
translateKey('example'); // Translated text is returned;

translateKey('example', param1, param2); // Translated text with parameters returned;
```

# Debugging

**reword-js** provides some debugging capabilities if `debug` option is enabled. see [Options object](#options-object).

## Console warning

If translation is not found **reword-js** will throw a `console.warn` message.

Example:

![some](https://github.com/devbridge/reword-js/raw/master/gifs/warnings.gif)

## Console table

When loading up dictionary it's being validated and outputs information on what's missing.

Example:

![some](https://github.com/devbridge/reword-js/raw/master/gifs/table.gif)

# Integration

## React application

Since **reword-js** is not tied to the state or store in react applications, thus it does not trigger a re-render. The easiest way is to trigger a re-render when language changes is by setting a `key` prop on the top most component in your React application. Once the key changes, React will re-render the DOM tree underneath.

Example:

```js
import React, { PureComponent } from 'react';
import { config, translate, changeLocale } from 'reword-js';

class App extends PureComponent {
  constructor() {
    super();
    config({}, { locale: this.state.locale });
  }

  state = {
    locale: 'en-US'
  };

  changeLanguage = ({ target }) => {
    changeLocale(target.value);
    this.setState({
      locale: target.value
    });
  };

  render() {
    return (
      <div key={this.state.locale}>
        <button onClick={this.changeLanguage} value="en-US">
          English
        </button>
        <button onClick={this.changeLanguage} value="es-ES">
          Spanish
        </button>
        {translate`Translated text`}
      </div>
    );
  }
}
```
