# inline-source-loader

A webpack loader that uses [inline-source](https://github.com/popeindustries/inline-source)
to inline any asset found in an HTML file or template. The source of the
content comes either from require or the raw file processed by inline-source.

For example if this 
```html
<style inline src="./component.scss"></style>`
```
is found in content passed to the loader, `component.scss` will be required as
a Webpack module, added as a dependency, and inlined like:
```html
<style>
  /* Fully processed SCSS here */
</style>
```

This loader needs to be passed raw HTML content, so add it as early on as
possible.

# Installation

```
npm install --save-dev inline-source-loader
```
