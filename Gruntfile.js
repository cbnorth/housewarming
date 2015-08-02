module.exports = function(grunt) {

    var fs = require("fs");

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-wintersmith');

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    livereload: true,
                    port: 8080,
                    base: {
                        path: "../",
                        options: {
                            extensions: ['html']
                        }
                    }
                }
            }
        },
        wintersmith: {
            build: {}
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    noCache: true
                  },
                files: {
                    'contents/css/styles.css' : 'contents/sass/styles.scss'
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'contents/scripts/script.min.js': ['contents/scripts/script.js']
                },
                sourceMap: true
            }
        },
        sync: {
            copy_resources: {
                files: [
                    { cwd: 'contents', src: 'css/**', dest: '../' },
                    { cwd: 'contents', src: 'scripts/script.min.js', dest: '../' }
                ]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            jade: {
                files: '**/*.jade',
                tasks: ['wintersmith']
            },
            markdown: {
                files: '**/*.md',
                tasks: ['wintersmith']
            },
            scss: {
                files: '**/*.scss',
                tasks: ['sass']
            },
            css: {
                files: '**/*.css',
                tasks: ['sync']
            },
            dev: {
                files: ['contents/scripts/*.js', '!contents/scripts/script.min.js'],
                tasks: ["browserify"]
            },
            js: {
                files: 'contents/scripts/script.js',
                tasks: ['uglify']
            },
            min: {
                files: 'contents/scripts/script.min.js',
                tasks: ['sync']
            }
        }
    });

    grunt.registerTask("browserify", function() {

        var done = this.async();

        var browserify = require("browserify");

        var b = browserify();

        var output = fs.createWriteStream("contents/scripts/script.js");
        b.add("./contents/scripts/main.js");
        var assembly = b.bundle();
        assembly.pipe(output).on("finish", function() {
            done();
        });

    });

    grunt.registerTask("default", ["connect", "wintersmith", "browserify", "sass", "uglify", "sync", "watch"]);

}