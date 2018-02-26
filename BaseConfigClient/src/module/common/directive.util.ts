/**
 * Created by dell on 2017/3/20.
 // */

import './directive/tree/tree.directive';
import './directive/page/page.directive';
import './directive/nav/nav.directive';
import './directive/valid-input/valid.directive';
import './directive/unit-table/table.directive';
import './directive/unit-toggle/toggle.directive';
import './directive/unit-table-tree/table-tree.directive';
import './directive/unit-role-tree/role-tree.directive';
import './directive/uniquebutton/uniquebutton.directive';
import './directive/layout/layout.button.directive';
import './directive/ocx/video.ocx.directive';
import './directive/unit-sec-nav/secondaryNav.directive';
import './directive/datepicker/datepicker.directive';
import './directive/util-maptop-tool/map-top-tool.directive';
import "./directive/util-select/util-select.directive";
import "./directive/util-selects/util-selects.directive";
import "./directive/unit-upload/upload-image.directive";
import "./directive/unit/mouse-over-leave.directive";
import "./directive/progress/progress.drective"
import "./directive/upload-change/uploadChange.directive"
import "./directive/util-img-ctrl/util-img-ctrl.directive";
import "./directive/unit/switch-button.directive";
import "./directive/loading-animation/loading-animation.directive"
// 这个js是加载所有指令文件的结合, 所有需要使用的公共的或者各模块的指令都从这里进行加载.
// 之所以在这里加载所有指令, 是因为原本是想在路由的配置中动态加载指令的，
// 但是试验后发现指令放在各模块controller.js中加载已经晚于html的渲染,即html中的指令标签无效,
// 故将所有指令都提前与router配置来加载
import "./factory/i18n.factory";