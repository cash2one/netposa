// 因为layer传值会把值加入到scope中, 所以在这里定义一个scope基类，可以用于基本的scope类型，
// 和用于建立 继承此interface 来附加其他参数的interface(只能是interface)
// 因为只是用于ts检错, 所以此文件定义为.d.ts。
export interface AngularScope{
    $on: Function;
    $scope: Function;
    $destroy: Function;
    $emit: Function;
    $new: Function;
}