/*global module:false*/
module.exports = function (grunt) {
	'use strict';
	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= pkg.license %> */\n',
		// Task configuration.
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			js: {
				src: ['src/**/intro.js', 'src/**/legendDirectives.js', 'src/**/nvD3LegendConfiguration.js', 'src/**/nvD3Events.js', 'src/**/nvD3AxisConfiguration.js', 'src/**/nvd3Directives.js', 'src/**/outro.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		clean: ['dist/'],
		jshint: {
			options: {
				jshintrc: true
			},
			afterconcat: ['dist/angularjs-nvd3-directives.js'],
			gruntfile: {
				src: 'Gruntfile.js'
			}
		},
		jsbeautifier : {
			files : ['dist/angularjs-nvd3-directives.js'],
			options : {
				js: {
					evalCode: true,
					indentSize: 2,
					indentChar: ' ',
					spaceInParen: true,
					jslintHappy: true,
					indentLevel: 0
				}
			}
		},
		copy: {
			main: {
				files: [
					{src: ['build/components/angular/angular.js'], dest: 'examples/js/angular.js', filter: 'isFile'},
					{src: ['build/components/d3/d3.js'], dest: 'examples/js/d3.js', filter: 'isFile'},
					{src: ['build/components/nvd3/nv.d3.js'], dest: 'examples/js/nv.d3.js', filter: 'isFile'},
					{src: ['build/components/nvd3/nv.d3.css'], dest: 'examples/stylesheets/nv.d3.css', filter: 'isFile'},
					{src: ['build/components/moment/moment.js'], dest: 'examples/js/moment.js', filter: 'isFile'}
				]
			}
		},
		bower: {
			install: {
				options: {
					targetDir: './build/components',
					layout: 'byComponent',
					cleanTargetDir: true,
					cleanBowerDir: false,
					verbose: true
				}
			}
		},
		changelog: {
			options: {
				version: 'v0.0.5-beta'
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-karma-coveralls');
	grunt.loadNpmTasks('grunt-conventional-changelog');
	grunt.loadNpmTasks('grunt-jsbeautifier');

	grunt.registerTask('bower', ['bower:install']);

	// Default task.
	grunt.registerTask('default', ['clean', 'concat', 'jsbeautifier', 'jshint']);

};
