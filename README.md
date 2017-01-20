# primo-explore-custom-actions

## installation

### setting up the dev environment

if you don't have a `package.json` as part of your view code, go to your package directory (e.g. `/primo-explore/custom/LCC_NEWUI`) and run:

```sh
npm init
```

follow the prompts and fill out basic information for your package.

### installing the package

from inside your package directory (e.g. `/primo-explore/custom/LCC_NEWUI`), run:

```sh
npm install primo-explore-custom-actions
```

to add custom actions, edit your `2_options.js` (or another file in the package's `js` directory) and add the following lines:

```javascript
insertActions([{
    name: "Report Problem",
    type: "template",
    icon: {
        set: 'action',
        name: 'ic_report_problem_24px'
    },
    action: "http://my.institution.edu/report_problem?record_id={recordId}"
},
{
    name: "My Link",
    icon: {
        set: 'action',
        name: 'ic_open_in_new_24px'
    },
    action: "http://google.com/"
},
{
    name: "Open PNX",
    type: 'template',        
    icon: {
        set: 'action',
        name: 'ic_stars_24px'
    },
    action: "/primo_library/libweb/jqp/record/{recordId}.pnx"
},
{
    name: "My other link",
    type: 'template',        
    templateVar: ['test', 'me'],
    icon: {
        set: 'action',
        name: 'ic_stars_24px'
    },
    action: "http://www.example.com/{0}/{1}"
}
]);
```

### configuring custom actions

this code works by supplying a list of action objects you wish to be included. each action object can have up to four properties:

- `name`:

  - **required**
  - _string_
  - defines the name of the action as you will see it in the actions menu.

- `type`:

  - **optional**
  - _string_
  - tells the function what type of action is being added - e.g. a simple link, a problem reporter, etc.
  - if not specified, the function will assume the action is a simple link.
  - currently supported types:

    - 'template' - action is a template in the form of '<http://www.example.com/{0}/{1}/{recordId}>' where 0,1,... is an index on the **templateVar** property. {recordId} can be used without the **templateVar** property.

- `icon`:

  - **required**.
  - _object_
  - defines the icon you wish to represent your action

    - must be chosen from the sets available to primo at <https://material.io/icons/>
    - you need to specify the name of the icon "set" (e.g. "content"), which are the groupings of icons, in addition to the icon name itself
    - "set" must be one of the following: action, alert, av, communications, content, editor, file, hardware, image, maps, navigation, notification, social
    - you need to prefix the icon name with "ic", add "24px" to the end, and separate the words in it with underscores

- `action`:

  - **required**
  - _string_
  - a url for a page that the action will open and/or send data to

    - links will always open in a new window
    - if it's a "template" action (type: 'template'), {recordId} will be replaced with the item's record ID when the link is clicked
    - you can use this functionality to send the docID as an http GET parameter by formatting your "report a problem" url as above
    - other parameters can be sent as {0}, {1}, etc. to represent their index in the `templateVar` array, as seen above

you can edit the code in your `2_options.js` to change these values.

adding the above example code would add four actions (not recommended, as space is limited on the actions menu):

- a button to report a problem, which will go to a given page and append the recordId to the URL
- a link to google
- a button which will view the record's PNX, by appending the recordId to the url
- a link that will visit example.com/test/me, because 'test' and 'me' are provided as `templateVar`

### uninstalling the button

from inside your package directory (e.g. `/primo-explore/custom/LCC_NEWUI`), run:

```sh
npm uninstall primo-explore-custom-actions
```
