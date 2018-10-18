module.exports = function(grunt)
{
    var pkg = grunt.file.readJSON('package.json');

    var pngquantPlugin = require('imagemin-pngquant'),
        mozjpeg = require('imagemin-mozjpeg');

    grunt.initConfig
    ({
        pkg: pkg,
        jshint: {
            options: pkg.jshintConfig,
            all: [
                'Gruntfile.js',
                'app/scripts/**/*.js',
                'test/**/*.js'
            ]
        },
        useminPrepare: {

            app: {
                src: 'app/index.html',
                options:
                {
                    dest: 'dist/app/'
                }
            },
            enterance:{
                src: 'enterance/index.html',
                options:
                {
                    dest: 'dist/enterance/'
                }
            }
        },
        clean: {
            app: [
                'dist/app/**/*', '!dist/app/images/**'
            ],
            enterance: [
                'dist/enterance/**/*', '!dist/enterance/images/**'
            ],
            tmp: [".tmp/"]
        },
        copy: {
            app: {
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: [
                            "templates/**",
                            'index.html',
                            'test/**',
                            'js/lib/**'
                        ],
                        dest: 'dist/app'
                    }
                ]
            },
            enterance: {
                files: [
                    {
                        expand: true,
                        cwd: 'enterance',
                        src: [
                            "misc/**",
                            'index.html',
                            'js/lib/**'
                        ],
                        dest: 'dist/enterance'
                    }
                ]
            }
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            app: {
                files: [{
                    src: [
                        'dist/app/js/*.js',
                        'dist/app/styles/*.css'
                    ]
                }]
            },

            enterance: {
                files: [{
                    src: [
                        'dist/enterance/js/*.js',
                        'dist/enterance/styles/*.css'
                    ]
                }]
            }
        },
        usemin: {

            html: ['dist/app/*.html', 'dist/enterance/*.html'],
            css: ['dist/app/styles/*.css', 'dist/enterance/styles/*.css'],
            options: {
                assetsDirs: ['dist/app', 'dist/app/styles', 'dist/enterance', 'dist/enterance/styles']
            }
        },
        less: {
            dev_app: {
                src: 'app/styles/main.less',
                dest: 'app/styles/main.css'
            },
            dev_enterance: {
                src: 'enterance/styles/main.less',
                dest: 'enterance/styles/main.css'
            },
            release_app: {
                src: 'app/styles/main.less',
                dest: 'dist/app/styles/main.css',
                options: {
                    compress: true
                }
            },
            release_enterance: {
                src: 'app_oh/styles/main.less',
                dest: 'dist/app_oh/styles/main.css',
                options: {
                    compress: true
                }
            }
        },
        watch: {
            app: {
                files: ['app/styles/*.less'],
                tasks: ['less:dev_app'],
                options:
                {
                    atBegin:true
                }
            },
            enterance: {
                files: ['enterance/styles/*.less'],
                tasks: ['less:dev_enterance'],
                options:
                {
                    atBegin:true
                }
            }
        },
        imagemin: {
            options:{
                use: [pngquantPlugin(), mozjpeg()]
            },
            app: {
                files: [{
                    expand: true,
                    cwd: 'app/',
                    src: ['images/**/*.{png,jpg,gif}', '!images/layouts/**'],
                    dest: 'dist/app/'
                }]
            },

            enterance: {
                files: [{
                    expand: true,
                    cwd: 'enterance/',
                    src: ['images/**/*.{png,jpg,gif}', '!images/layouts/**'],
                    dest: 'dist/enterance/'
                }]
            }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


    grunt.registerTask('images', ['newer:imagemin:app']);
    grunt.registerTask('images_enterance', ['newer:imagemin:enterance']);

    grunt.registerTask("default",
        [
            'clean:app',
            'jshint',
            'less:release_app',
            'useminPrepare:app',
            'concat',
            'uglify',
            'copy:app',
            'images',
            'filerev:app',
            'usemin',
            'clean:tmp'
        ]);

    grunt.registerTask("enterance",
        [
            'clean:enterance',
            'jshint',
            'less:release_enterance',
            'useminPrepare:enterance',
            'concat',
            'uglify',
            'copy:enterance',
            'images_enterance',
            'filerev:enterance',
            'usemin',
            'clean:tmp'
        ]);
};
