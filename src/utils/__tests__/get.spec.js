import get from '../get';

const testObject = {
  value1: 'value1',
  value2: {
    value3: 'value3',
    value4: {
      value5: 'value5',
    },
    arrayValue: ['arrayValue1'],
  },
};

describe('get()', () => {
  it('should return objects property value', () => {
    expect(get(testObject, 'value1')).toEqual('value1');
  });

  it('should return second nested object value', () => {
    expect(get(testObject, 'value2.value3')).toEqual('value3');
  });

  it('should return third nested object value', () => {
    expect(get(testObject, 'value2.value4.value5')).toEqual('value5');
  });

  it('should return a nested array value', () => {
    expect(get(testObject, 'value2.arrayValue.0')).toEqual('arrayValue1');
  });
});
