/* @import写法存在css缓存的原因, 故在这里通过requirejs来异步加载, 每次都重新获取css实例, 解决缓存问题*/
import "css!./common/button.css";
import "css!./common/icon.css";
import "css!./common/input.css";
import "css!./common/nav.css";
import "css!./common/right-menu.css";
import "css!./common/select.css";
import "css!./common/tree.css";
import "css!./common/layer.css";
import "css!./common/form.css";
