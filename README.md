# DM Base Theme

This is the base WordPress theme we use at [Delicious Media](https://www.deliciousmedia.co.uk/) for most of our projects. It is based on [_s](http://underscores.me/) by Automattic.

Designed to be used in conjunction with [our provisioning script](https://github.com/DeliciousMedia/DM-VVV2-Provision-Basic).

## Development Notes

This theme uses Gulp to automate compilation of SASS into CSS, minification of JS/CSS and optimisation of images. It requires NPM & Gulp CLI.

- Source SASS files are in `/content/themes/THEMENAME/src/sass/` and are compiled into `/content/THEMENAME/cocoon/assets/css/`
- Source JavaScript are in `/content/themes/THEMENAME/src/js/` and are placed in `/content/themes/THEMENAME/assets/js/`
- Source images are in `/content/themes/THEMENAME/src/img/` and are placed in `/content/THEMENAME/cocoon/assets/img/`

The gulp tasks will create minified and unminified versions of CSS and JavaScript; by default the minified versions are only used in live, this is controlled by the `WP_DEBUG` constant which you should set to true in local-config.php (this is done automatically set on `DEV` and `STAGE`).

To get started, install the required node modules.

```
cd content/themes/THEMENAME
npm install
```

To build the theme (e.g. upon deployment):

`gulp build`

To build & watch (e.g. for development):

`gulp`