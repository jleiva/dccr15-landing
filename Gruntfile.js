'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Watch for changes and trigger compass
        watch: {
            sass: {
                files: ['sass/**/*.{scss,sass}','sass/partials/**/*.{scss,sass}'],
                tasks: ['sass:dist']
            },
            livereload: {
                files: ['*.html', 'js/**/*.{js,json}', 'css/*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
                options: {
                    livereload: 1337
                }
            }
        },

        scsslint: { 
            allFiles: [ 
              'sass/**/*.scss', 
            ], 
            options: { 
              config: '.scss-lint.yml', 
              reporterOutput: 'scss-lint-report.xml', 
              colorizeOutput: true 
            }, 
        },

        postcss: {
            options: {
              map: true,
              processors: [
                require('autoprefixer-core')({browsers: 'last 2 versions'}).postcss,
                require('csswring').postcss
              ]
            },
            dist: {
              src: 'css/*.css'
            }
        },

        // Compass and scss
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'expanded'
            },
            dist: {
                files: {
                    'css/styles.css': 'sass/styles.scss'
                }
            }
        }
    });

    grunt.registerTask('default', ['sass:dist', 'watch']);
};