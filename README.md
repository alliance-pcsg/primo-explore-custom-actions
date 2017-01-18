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

to enable the button, edit your `2_options.js` (or another file in the package's `js` directory) and add the following lines:

```javascript
insertActions([{
    name: "Report Problem",
    type: "rap",
    icon: {
        set: 'action',
        name: 'ic_report_problem_24px'
    },
    action: "http://my.institution.edu/report_problem?record_id="
},
{
    name: "My Link",
    icon: {
        set: 'action',
        name: 'ic_open_in_new_24px'
    },
    action: "http://google.com/"
}]);
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

    - 'rap' - indicates the action is a "report a problem" action, so information about the current primo record should be sent along with the link

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
    - if it's a "report a problem" action (type: 'rap'), the docID of the record will be appended to this url when the button is clicked
    - you can use this functionality to send the docID as an http GET parameter by formatting your "report a problem" url as above, where it would be sent as record_id

you can edit the code in your `2_options.js` to change these values.

adding the above example code would add two actions:

- a link to google, using the icon "open in new window" from the icon set "action"
- a report problem button using the icon "report problem" from the icon set "action"

### uninstalling the button

from inside your package directory (e.g. `/primo-explore/custom/LCC_NEWUI`), run:

```sh
npm uninstall primo-explore-custom-actions
```
