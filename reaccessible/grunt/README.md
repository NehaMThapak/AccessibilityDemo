# About the `grunt` folder

The `grunt` directory is a suite of Grunt tasks and their configurations, bundled for your convenience. The Grunt integration is mainly useful for bundling front-end assets, (like stylesheets, scripts, & markup templates) but it can also be used to run all kinds of development tasks, from browserify compilation to database migrations.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, read on!


### What tasks run automatically?

Some of these tasks (the ones in the `grunt/tasks` folder) automatically when you run certain commands.

###### `grunt dev`

Runs the `default` task (`grunt/tasks/default.js`).
