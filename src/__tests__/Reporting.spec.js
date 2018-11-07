/* eslint-disable no-console */
import Reporting from '../Reporting';

let reporting;

jest.spyOn(console, 'warn');
jest.spyOn(console, 'table');

describe('Reporting', () => {
  beforeEach(() => {
    console.warn.mockImplementation(() => null);
    console.table.mockImplementation(() => null);
  });

  describe('when in debug mode', () => {
    beforeEach(() => {
      reporting = new Reporting({ debug: true });
    });

    it('should call console.warn with specified parameters', () => {
      const parameters = ['param1', 'param2'];

      reporting.warn(...parameters);

      expect(console.warn).toHaveBeenCalledWith(...parameters);
    });

    it('should call console.table with specified parameters', () => {
      const parameters = ['param1', 'param2'];

      reporting.table(...parameters);

      expect(console.table).toHaveBeenCalledWith(...parameters);
    });

    it('should not call console.table if no parameters are supplied', () => {
      reporting.table();

      expect(console.table).not.toHaveBeenCalled();
    });

    it('should not call console.warn if no parameters are supplied', () => {
      reporting.warn();

      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  describe('when in debug mode', () => {
    beforeEach(() => {
      reporting = new Reporting({ debug: false });
    });

    it('should not call console.table if no parameters are supplied', () => {
      reporting.table();

      expect(console.table).not.toHaveBeenCalled();
    });

    it('should not call console.warn if no parameters are supplied', () => {
      reporting.warn();

      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should not call console.table if parameters are supplied', () => {
      reporting.table('some', 'param');

      expect(console.table).not.toHaveBeenCalled();
    });

    it('should not call console.warn if parameters are supplied', () => {
      reporting.warn('some', 'param');

      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
