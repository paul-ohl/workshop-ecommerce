class ConfigElement {
  private _id?: string;
  private _title: string;
  private _description: string;
  private _refs: RefElement[];
  private _isMultiSelection: boolean;
  private _isBase: boolean;

  private constructor(
    title: string,
    description: string,
    refs: RefElement[],
    isMultiSelection: boolean,
    isBase: boolean,
    id?: string,
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._refs = refs;
    this._isMultiSelection = isMultiSelection;
    this._isBase = isBase;
  }

  /// Create a new ConfigElement without any validation.
  /// This obviously should not be used when creating a new ConfigElement from user input.
  /// Use the create method instead.
  public static fromDatabase(
    id: string,
    title: string,
    description: string,
    refs: RefElement[],
    isMultiSelection: boolean,
    isBase: boolean,
  ) {
    return new ConfigElement(
      title,
      description,
      refs,
      isMultiSelection,
      isBase,
      id,
    );
  }

  public static create(
    title: string,
    description: string,
    refs: UnvalidatedRefElement[],
    isMultiSelection: boolean,
    isBase: boolean = false,
  ) {
    if (!title || title.trim() === '') {
      throw new Error('title is required');
    }
    if (isMultiSelection === undefined) {
      throw new Error('isMultiSelection is required');
    }
    let validRefs: RefElement[];
    try {
      validRefs = refs.map(r =>
        RefElement.create(r.label, r.color, r.pathToImg, r.value, r.isDefault),
      );
    } catch (error: any) {
      throw new Error(`Invalid refs: ${error.message}`);
    }
    return new ConfigElement(
      title,
      description,
      validRefs,
      isMultiSelection,
      isBase,
    );
  }

  public toModel() {
    if (this._id) {
      return {
        _id: this._id,
        title: this._title,
        description: this._description,
        refs: this._refs.map(r => r.toModel()),
        isMultiSelection: this._isMultiSelection,
        isBase: this._isBase,
      };
    } else {
      return {
        title: this._title,
        description: this._description,
        refs: this._refs.map(r => r.toModel()),
        isMultiSelection: this._isMultiSelection,
        isBase: this._isBase,
      };
    }
  }
}

class RefElement {
  private _id?: string;
  private _label: string;
  private _color: string;
  private _pathToImg: string;
  private _value: number;
  private _isDefault: boolean;

  private constructor(
    label: string,
    color: string,
    pathToImg: string,
    value: number,
    isDefault: boolean,
    id?: string,
  ) {
    this._id = id;
    this._label = label;
    this._color = color;
    this._pathToImg = pathToImg;
    this._value = value;
    this._isDefault = isDefault;
  }

  /// Create a new RefElement without any validation.
  /// This obviously should not be used when creating a new RefElement from user input.
  /// Use the create method instead.
  public static fromDatabase(
    id: string,
    label: string,
    color: string,
    pathToImg: string,
    value: number,
    isDefault: boolean,
  ) {
    return new RefElement(label, color, pathToImg, value, isDefault, id);
  }

  public static create(
    label: string,
    color: string,
    pathToImg: string,
    value: number,
    isDefault: boolean = false,
  ) {
    if (label.trim() === '') {
      throw new Error('Label is required');
    }
    if (/^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/gm.test(color.trim()) === false) {
      throw new Error('Invalid color');
    }
    if (value === undefined) {
      throw new Error('Value is required');
    }
    if (value < 0) {
      throw new Error('Value must be greater than or equal to 0');
    }
    return new RefElement(label, color, pathToImg, value, isDefault);
  }

  public toModel() {
    if (this._id) {
      return {
        _id: this._id,
        label: this._label,
        color: this._color,
        pathToImg: this._pathToImg,
        value: this._value,
        isDefault: this._isDefault,
      };
    } else {
      return {
        label: this._label,
        color: this._color,
        pathToImg: this._pathToImg,
        value: this._value,
        isDefault: this._isDefault,
      };
    }
  }
}

interface UnvalidatedRefElement {
  label: string;
  color: string;
  pathToImg: string;
  value: number;
  isDefault: boolean;
}

export default ConfigElement;
