module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      src: ['*.js','public/js/*']
    },
    watch: {
        jade: {
            files: ['views/**'],
            options: {
                livereload: true,
            },
        },
        js: {
            files: ['public/js/**'],
            tasks: ['jshint'],
            options: {
                livereload: true,
            },
        },
        css: {
            files: ['public/css/**'],
            options: {
                livereload: true
            }
        }
    },
    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          args: [],
          ignoredFiles: ['node_modules/**', '.DS_Store'],
          watchedExtensions: ['js'],
          watchedFolders: ['.'],
          debug: true,
          delayTime: 1,
          cwd: __dirname
          }
        }
    },
    concurrent: {
        tasks: ['nodemon', 'watch'],
        options: {
            logConcurrentOutput: true
        }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.registerTask('default', ['jshint', 'concurrent']);
};