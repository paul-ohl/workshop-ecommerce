import { assert } from 'console';
import ConfigElement from '../../src/types/configElement';

describe('ConfigElement domain type', () => {
  test('happy path', () => {
    let refs = [
      {
        label: "Ref01",
        color: "#000000",
        pathToImg: "./",
        value: 0,
        isDefault: true
      }, {
        label: "Ref02",
        color: "#0000FF1A",
        pathToImg: "./",
        value: 2,
        isDefault: false
      }
    ];

    let configElement = ConfigElement.create('Element01', 'description 01', refs, false);
    expect(configElement.toModel()).toStrictEqual({
      title: "Element01",
      description: "description 01",
      isBase: false,
      isMultiSelection: false,
      refs: [
        {
          color: "#000000",
          isDefault: true,
          label: "Ref01",
          pathToImg: "./",
          value: 0,
        },
        {
          color: "#0000FF1A",
          isDefault: false,
          label: "Ref02",
          pathToImg: "./",
          value: 2,
        },
      ],
    })

    configElement = ConfigElement.create('Element01', '', refs, false, true);
    expect(configElement.toModel()).toStrictEqual({
      title: "Element01",
      description: "",
      isBase: true,
      isMultiSelection: false,
      refs: [
        {
          color: "#000000",
          isDefault: true,
          label: "Ref01",
          pathToImg: "./",
          value: 0,
        },
        {
          color: "#0000FF1A",
          isDefault: false,
          label: "Ref02",
          pathToImg: "./",
          value: 2,
        },
      ],
    })

    configElement = ConfigElement.create('Element01', '', [], false, true);
    expect(configElement.toModel()).toStrictEqual({
      title: "Element01",
      description: "",
      isBase: true,
      isMultiSelection: false,
      refs: [],
    })
  });

  test('failures', () => {
    let refs = [
      {
        label: "Ref01",
        color: "#000000",
        pathToImg: "./",
        value: 0,
        isDefault: true
      }, {
        label: "Ref02",
        color: "#0000FF",
        pathToImg: "./",
        value: 2,
        isDefault: false
      }
    ];

    try {
      ConfigElement.create('', 'description 01', refs, false);
      assert(false, "It should not have reached this point");
    } catch (err: unknown) {
      if (err instanceof Error) {
        expect(err.message).toEqual("title is required");
      }
    }

    try {
      const wrongRefs = [
        {
          label: "",
          color: "#000000",
          pathToImg: "./",
          value: 0,
          isDefault: true
        }, {
          label: "Ref02",
          color: "#0000FF",
          pathToImg: "./",
          value: 2,
          isDefault: false
        }
      ]
      ConfigElement.create('Title 01', 'description 01', wrongRefs, false);
      assert(false, "It should not have reached this point");
    } catch (err: unknown) {
      if (err instanceof Error) {
        expect(err.message).toEqual("Invalid refs: Label is required");
      }
    }

    try {
      const wrongRefs = [
        {
          label: "Ref01",
          color: "#000000000",
          pathToImg: "./",
          value: 0,
          isDefault: true
        }, {
          label: "Ref02",
          color: "#0000FF",
          pathToImg: "./",
          value: 2,
          isDefault: false
        }
      ]
      ConfigElement.create('Title 01', 'description 01', wrongRefs, false);
      assert(false, "It should not have reached this point");
    } catch (err: unknown) {
      if (err instanceof Error) {
        expect(err.message).toEqual("Invalid refs: Invalid color");
      }
    }

    try {
      const wrongRefs = [
        {
          label: "Ref01",
          color: "#000X00",
          pathToImg: "./",
          value: 0,
          isDefault: true
        }, {
          label: "Ref02",
          color: "#0000FF",
          pathToImg: "./",
          value: 2,
          isDefault: false
        }
      ]
      ConfigElement.create('Title 01', 'description 01', wrongRefs, false);
      assert(false, "It should not have reached this point");
    } catch (err: unknown) {
      if (err instanceof Error) {
        expect(err.message).toEqual("Invalid refs: Invalid color");
      }
    }

    try {
      const wrongRefs = [
        {
          label: "Ref01",
          color: "#000000",
          pathToImg: "./",
          value: -1,
          isDefault: true
        }, {
          label: "Ref02",
          color: "#0000FF",
          pathToImg: "./",
          value: 2,
          isDefault: false
        }
      ]
      ConfigElement.create('Title 01', 'description 01', wrongRefs, false);
      assert(false, "It should not have reached this point");
    } catch (err: unknown) {
      if (err instanceof Error) {
        expect(err.message).toEqual("Invalid refs: Value must be greater than or equal to 0");
      }
    }

  });
});
