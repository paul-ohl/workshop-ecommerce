const ALLOWED_SECTION_NAMES = ['colors', 'tech'];

class ConfigSection {
  private _sectionName: string;

  private constructor(sectionName: string) {
    this._sectionName = sectionName;
  }

  public static create(sectionName: string): ConfigSection {
    if (sectionName == undefined) {
      throw new Error('Section name is required');
    }
    let s = sectionName.trim().toLowerCase();
    if (s === '') {
      throw new Error('Section name is required');
    }
    if (!ALLOWED_SECTION_NAMES.includes(s)) {
      throw new Error('Invalid section name');
    }
    return new ConfigSection(s);
  }

  public static fromDatabase(sectionName: string): ConfigSection {
    return new ConfigSection(sectionName.trim().toLowerCase());
  }

  public get isColors() {
    return this._sectionName === 'colors';
  }
  public get isTech() {
    return this._sectionName === 'tech';
  }
}

export default ConfigSection;
