# primo-explore-custom-actions

<!-- ![Build Status](https://api.travis-ci.org/Alliance-PCJWG/primo-explore-clickable-logo.svg?branch=master) -->

## Features
Custom links can be added to the actions menu visible on Primo brief results and full display. Links can be dynamically formed using template variables, and can extract properties of the item's PNX record and apply them to the link URL.

### Screenshot
![screenshot](screenshot.png)

## Install
1. Make sure you've installed and configured [primo-explore-devenv](https://github.com/ExLibrisGroup/primo-explore-devenv).
2. Navigate to your template/central package root directory. For example:
    ```
    cd primo-explore/custom/MY_VIEW_ID
    ```
3. If you do not already have a `package.json` file in this directory, create one:
    ```
    npm init -y
    ```
4. Install this package:
    ```
    npm install primo-explore-custom-actions --save-dev
    ```

## Usage
Once this package is installed, add `customActions` as a dependency for your custom module definition.

```js
var app = angular.module('viewCustom', ['customActions'])
```
Note: If you're using the `--browserify` build option, you will need to first import the module with:

```javascript
import 'primo-explore-custom-actions';
```

You can configure the module by passing it an array of action objects to be added. All properties except `type` are required.

**n.b.** more than three actions will likely cause undesirable cropping effects.

| name     | type   | usage                                                                                                                                                                                                                    |
|----------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`   | string | the name of the action as it will appear on the link in the menu.                                                                                                                                                        |
| `type`   | object | if present, determines what type of action is being added (simple link, problem reporter, etc). see details below below.                                                                                                       |
| `icon`   | object | defines the icon for the link. must be chosen from <https://material.io/icons/>. you need to specify both the name of the action "set" (see link) and the icon itself, in the form "ic_icon_name_with_underscores_24px". some icons may not display. |
| `action` | string | url for the link. always opens in a new window. see below for details on using templates in this property.                                                                                                               |

#### Templates

When using a 'template' action (type: 'template'), {recordId} will be replaced with the item's record ID when the link is clicked. You can use this functionality to send the docID as an http GET parameter by formatting your "report a problem" url as in the example. Other parameters can be sent as {0}, {1}, etc. to represent their index in the templateVar array.

If the 'template' property isn't present, the link will be used as-is.

### Example

The example below will generate the configuration visible in the screenshot above. It adds a "report problem" link that will navigate to the institution's "report problem" form and append the record ID as a GET parameter, and a link that will open the given record's PNX for viewing.

```js

app.constant('customActions', [
  {
    name: "Report Bug",
    type: "template",
    icon: {
      set: "action",
      name: "ic_bug_report_24px"
    },
    action: "http://my.institution.edu/report_problem?record_id={recordId}"
  },
  {
    name: "Open PNX",
    type: 'template',
    icon: {
        set: 'action',
        name: 'ic_open_in_new_24px'
    },
    action: "/primo_library/libweb/jqp/record/{recordId}.pnx"
  }
])
```

<!-- ## Running tests
1. Clone the repo
2. Run `npm install`
3. Run `npm test` -->
