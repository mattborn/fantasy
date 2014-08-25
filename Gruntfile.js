
module.exports = function (grunt) {

	grunt.initConfig({
		assemble: {
			options: {
				plugins: 'assemble-contrib-permalinks'
			},
			build: {
				options: {
					layout: 'layout.hbs',
					permalinks: {
						preset: 'pretty'
					}
				},
				files: [{
					expand: true,
					cwd: 'source',
					src: '**/*.hbs',
					dest: 'public'
				}]
			}
		},
		sass: {
			options: {
				includePaths: require('node-bourbon').includePaths,
				outputStyle: 'compressed',
				sourceMap: true
			},
			build: {
				expand: true,
				cwd: 'source',
				src: '**/*.scss',
				dest: 'public',
				ext: '.css'
			}
		},
		watch: {
			markup: {
				files: 'source/**/*.hbs',
				tasks: 'assemble'
			},
			styles: {
				files: 'source/**/*.scss',
				tasks: 'sass'
			},
			livereload: {
				files: ['public/**/*.html', 'public/**/*.css'],
				options: { livereload: true }
			}
		},
		nodemon: {
			target: {
				script: 'app.js',
				options: { nodeArgs: '--debug' }
			}
		},
		concurrent: {
			target: {
				tasks: ['nodemon', 'watch'],
				options: { logConcurrentOutput: true }
			}
		}
	});

	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('build', [
		'assemble',
		'sass'
	]);

	grunt.registerTask('default', ['build', 'concurrent']);

};
