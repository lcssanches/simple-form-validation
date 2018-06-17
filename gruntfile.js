module.exports = function(grunt) {
  grunt.initConfig({
    // define source files and their destinations
    uglify: {
      options: {
        mangle: false
      },

      my_task: {
        files: [{
          expand: true,
          src: ['*.js', '!gruntfile.js'],
          dest: 'dist/'
        }]
      }
    },
    watch: {
      js: { files: './*.js', tasks: ['uglify'] }
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');

  // register at least this one task
  grunt.registerTask('default', ['uglify']);
};
