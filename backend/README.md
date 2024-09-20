# RetroMetroid Backend

We use Express for the backend, and MongoDB for the database.

## The routes

### **GET** `/config`

Returns all the configs (meaning only one at the moment) in a `config` array.

example return:
```json
{
  "config": [
    {
      "_id": "66ec3a1791e78e572efb9639",
      "colorsConfigs": [
        {
          "title": "Coque",
          "description": "Comprend avant et arrière",
          "refs": [
            {
              "label": "Clear black",
              "color": "#000000",
              "value": 0,
              "isDefault": true,
              "_id": "66ec3a1791e78e572efb963a"
            },
            {
              "label": "Blue",
              "color": "#0000FF",
              "value": 0,
              "isDefault": false,
              "_id": "66ec3a1791e78e572efb963b"
            }
          ],
          "isMultiSelection": false,
          "isBase": true,
          "_id": "66ec3a1791e78e572efb963c"
        },
      ],
      "techConfigs": [
        {
          "description": "",
          "isBase": false,
          "title": "Accessoires",
          "refs": [
            {
              "label": "Sacoche Metroid (+12,90$)",
              "value": 12.9,
              "isDefault": true,
              "_id": "66ec3a1791e78e572efb9645"
            },
            {
              "label": "Verre Trempé (+4,90$)",
              "value": 4.9,
              "isDefault": true,
              "_id": "66ec3a1791e78e572efb9646"
            },
            {
              "label": "Coque Silicone (+6,90$)",
              "value": 6.9,
              "isDefault": false,
              "_id": "66ec3a1791e78e572efb9647"
            }
          ],
          "isMultiSelection": true,
          "_id": "66ec3a1791e78e572efb9648"
        }
      ],
      "__v": 0
    }
  ]
}
```

### **POST** `/config/:configSection`

Add a customization option.
The configuration section must be present in the uri.

The only two options are "colors" and "tech".

This is the schema of the data that must be sent in the body of the `POST` request:

```typescript
ConfigElement {
	title!: string;
	description?: string;
	refs!: RefType[];
	isMultiSelection!: boolean;
	isBase?: boolean;
}

class RefType {
	label!: string;
	color?: string; // the color must be in hexadecimal form and can contain transparency information.
	path?: string;
	value!: number; // The price of the customization, must be >= 0
	isDefault?: boolean;
}
```

## **PATCH** `/config/:id`

Modify a customization option.
The URL parameter is the id of the configuration element that should be modified.


This is the schema of the data that must be sent in the body of the `PATCH` request:

```typescript
ConfigElement {
	title!: string;
	description?: string;
	refs!: RefType[];
	isMultiSelection!: boolean;
	isBase?: boolean;
}

class RefType {
	label!: string;
	color?: string; // the color must be in hexadecimal form and can contain transparency information.
	path?: string;
	value!: number; // The price of the customization, must be >= 0
	isDefault?: boolean;
}
```
