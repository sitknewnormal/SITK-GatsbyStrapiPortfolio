# Sharing Is The Key Strapi Application

This is an Strapi application that serves a Personal Portfolio Gatsby frontend.

## Import Plugin
There is plugin that imports content this Strapi application.

Using this plugin, you can import external data's right into your "content types". You can make an import by uploading a file, providing an external url, or writing your data manually. The type of data supported by this plugin is "CSV" & "RSS" at the moment. Also you can see the history of all your imports and perform some actions on them including "undo" & "delete".

All credits go to the gentlemen and ladies that made that happen [here](https://strapi.io/blog/how-to-create-an-import-content-plugin-part-1-4)

## Strapi plugin content-export-import
![](https://github.com/lazurey/strapi-plugin-content-export-import/workflows/Run-Tests/badge.svg)

## First Setup
```bash
cd /<path-to-your-strapi-project

# create plugins folder if not exists
# mkdir plugins

# go to plugins folder
cd plugins

# clone the plugin code into a folder and skip the prefix
git clone git@github.com:lazurey/strapi-plugin-content-export-import.git content-export-import
# install dependencies
cd content-export-import && yarn install
# build the plugin
cd ../..
yarn build

# start
yarn develop
```

Note:
> it's important to clone the repo into a target folder named `content-export-import`, the prefix has to be omitted.

## Plugin development
```bash
yarn develop --watch-admin
```
Running at http://localhost:8000/

## Features

- Support JSON export & import
- Delete all content of a type

**Not supported**

- Media fields, e.g. image, video, etc.
- Any other file type, e.g. csv, etc.

## References

- [Component List - Strapi Helper Plugin](https://github.com/strapi/strapi/tree/master/packages/strapi-helper-plugin/lib/src/components)
- [Strapi Content Import Plugin](https://github.com/strapi/community-content/tree/master/tutorials/code/import-content-plugin-tutorial/plugins/import-content)
- [Guide to Strapi Content Import Plugin](https://strapi.io/blog/how-to-create-an-import-content-plugin-part-1-4?redirectPage=3)
- [Strapi Styled Component](https://buffetjs.io/storybook/?path=/story/components--button)

## Quick notes
- Import of model that contains component fields are not working.