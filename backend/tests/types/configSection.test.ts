import ConfigSection from '../../src/types/configSection';

describe('configSection domain type', () => {
  test('happy path', () => {
    let configSection = ConfigSection.create('colors');
    expect(configSection.isTech).toBe(false);
    expect(configSection.isColors).toBe(true);

    configSection = ConfigSection.create('tech');
    expect(configSection.isTech).toBe(true);
    expect(configSection.isColors).toBe(false);

    configSection = ConfigSection.create('   TECH     ');
    expect(configSection.isTech).toBe(true);

    configSection = ConfigSection.fromDatabase('TECH     ');
    expect(configSection.isTech).toBe(true);
  });

  test('invalid section name', () => {
    expect(() => ConfigSection.create('invalid')).toThrow(
      'Invalid section name',
    );
    expect(() => ConfigSection.create('')).toThrow('Section name is required');
    let name: any;
    expect(() => ConfigSection.create(name)).toThrow(
      'Section name is required',
    );
  });
});
