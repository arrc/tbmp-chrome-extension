(function() {
  'use strict';
  var app = angular.module('tbmp',[
    'LocalStorageModule', 'ngLodash', "ui.router",
    'ui.bootstrap', 'ngAside', 'angucomplete-alt', 'ngTagsInput', 'angular-jwt']);
  /* ==========================================================
  	Config block
  ============================================================ */
  app.config(function(localStorageServiceProvider,$stateProvider, $urlRouterProvider){
    localStorageServiceProvider.setPrefix('tbmpExtension.caches.');
    $urlRouterProvider.otherwise("/");
    $stateProvider
			.state("home", {
				url: '/',
				templateUrl: 'views/home.html'
			})
      .state("login", {
				url: '/',
				templateUrl: 'views/login.html'
			})
      .state("signup", {
				url: '/',
				templateUrl: 'views/signup.html'
			})
			.state('profile',{
				url: '/profile',
				templateUrl: 'views/profile.html'
			})
			.state('tags',{
				url: '/tags',
				templateUrl: 'views/tags.html'
			})
      .state('urls',{
				url: '/urls',
				templateUrl: 'views/urls.html'
			});

  });
}());
