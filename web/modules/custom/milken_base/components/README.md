# Entry Components Directory

**CHECKING IN UNLINTED TYPESCRIPT COULD CAUSE THE BUILD TO FAIL.**

[React](https://reactjs.org/) entry components are capitalized with no hyphenation.

```jsx
<MediaDetail
  blah={blah}
  json-blah="{'item':'blah'}" />

```

[WebComponents](https://webcomponents.org) take the form of the tag they support, e.g. node-landing-page supports

```html
<node-landing-page
  data-blah="blah"
  data-json-blah="{'item':'blah'}" />
```

and can be used in the admin wherever a node landing page appears.

ALL OF THE ESLINT SETTINGS ARE THE PACKAGE.JSON.

**CHECKING IN UNLINTED TYPESCRIPT COULD CAUSE THE BUILD TO FAIL.**


When including components, a "PathAliases" file tells the webpack configs where things are stored:

```typescript
export const PathAliases = {
  Components: pathUtility.resolve("./src/Components"),
  DataTypes: pathUtility.resolve("./src/DataTypes"),
  Fields: pathUtility.resolve("./src/Fields"),
  Utility: pathUtility.resolve("./src/Utility"),
  Libraries: pathUtility.resolve("./web/libraries"),
  FrontEndTheme: pathUtility.resolve("./web/themes/custom/milken"),
  AdminTheme: pathUtility.resolve("./web/themes/custom/milken_admin"),
  GinTheme: pathUtility.resolve("./web/themes/contrib/gin"),
  Modules: pathUtility.resolve("./web/modules"),
  Themes: pathUtility.resolve("./web/themes"),
  Core: pathUtility.resolve("./web/core"),
};
```

THIS FILE IS HERE: ./config/node/PathAliases.ts. This file is used by both the CSS compiler and the JS compiler.
