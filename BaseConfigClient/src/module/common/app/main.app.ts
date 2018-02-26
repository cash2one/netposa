/**
 * Created by dell on 2017/3/31.
 */

declare let angular: any;

import '../../../base/js/common';
import 'angular';
import 'angular.ui.router';

import 'angular-require';
import 'ui.bootstrap.0.12.0';
import "angular-translate";
import "angular-translate-loader";
import 'ng-layer';
import "ng-mylayer";
import 'ng-scrollBars'
import  'ngDraggble';
import 'angular-base64';
let _app = angular.module('portrait', ['ngRequire', 'ui.router','ng-mylayer','base64', 'ng-layer', 'ui.bootstrap', 'pascalprecht.translate','ngScrollbars','ngDraggable']);

export let app = _app;
