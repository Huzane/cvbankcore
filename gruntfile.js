module.exports = function(grunt) {
  // Do grunt-related things in here
    var pkg = require("./package.json");
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-aws');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['*.js', 'models/**/*.js', 'controllers/**/*.js', 'lib/**/*.js', 'test/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        shell: {
            jasmine_node: {
                command: 'jasmine-node test/development/',
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                }
            },
            git_checkout_master: {
                command: 'git checkout master',
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                }
            },
            git_pull_origin: {
                command: 'git pull origin',
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                }
            },
            git_add: {
                command: 'git add .',
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                }
            },
            git_commit_heroku: {
                command: 'git commit -m "Grunt: Committing all outstanding changes"',
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                }
            },
            git_push_origin: {
                command: 'git push origin master',
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                }
            },
            git_push_heroku: {
                command: 'git push cvbank master',
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                }
            }
        },
        
        aws: {
            options: {
                config:{
                    accessKeyId: 'AKIAJQ3YZWWUOWR7KB6A',
                    secretAccessKey: '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'
                },
                s3: { }
            },
            clean: {
                options: {
                    root: '/',
                    bucket: 'eschoolweb-bucket',
                    access: 'public-read',
                    endpoint: 's3.amazonaws.com'
                },
                service: 's3',
                del: ['docs']
            },
            docs: {
                options: {
                    root: '/',
                    bucket: 'eschoolweb-bucket',
                    access: 'public-read',
                    endpoint: 's3.amazonaws.com'
                },
                service: 's3',
                put: ['docs/**/*.*']
            }
        },
        clean: {
            docs: ["docs/**/*"]
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: ['models/', 'controllers/', 'lib/', 'etc/'],
                    outdir: 'docs/'
                }
            }
        }

        
    });
         
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('checkout_master', 'shell:git_checkout_master');
    grunt.registerTask('commit_all_heroku', ['shell:git_add', 'shell:git_commit_heroku']);
    grunt.registerTask('heroku_push', ['commit_all_heroku', 'checkout_master', 'shell:git_pull_origin', 'shell:git_push_origin', 'shell:git_push_heroku']);
    grunt.registerTask('run_tests', 'shell:jasmine_node');
    grunt.registerTask('update_docs', ['jshint', 'yuidoc']);


};