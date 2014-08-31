
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
		concat: {
			build: {
				src: [
					'node_modules/jquery/dist/jquery.min.js',
					'node_modules/lodash/dist/lodash.underscore.min.js',
					'node_modules/backbone/backbone-min.js',
					'node_modules/moment/min/moment.min.js'
				],
				dest: 'public/vendor.js'
			}
		},
		uglify: {
			build: {
				expand: true,
				cwd: 'source',
				src: '**/*.js',
				dest: 'public',
				rename: function (dest, src) {
					var dir = src.replace('.js', '');
					if (dir !== 'index') {
						return dest +'/'+ dir +'/'+ src;
					} else {
						return dest +'/'+ src;
					}
				}
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
			scripts: {
				files: 'source/**/*.js',
				tasks: 'uglify'
			},
			livereload: {
				files: ['public/**/*.html', 'public/**/*.css', 'public/**/*.js'],
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
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('build', [
		'assemble',
		'sass',
		'uglify'
	]);

	grunt.registerTask('default', ['build', 'concurrent']);

};
