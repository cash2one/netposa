export interface ITreeParams {
    keyword: string;
}

/**
 * 树结构 基本的参数相关
 * @time: 2017-04-20 15:19:47
 * @params:
 * @return:
 */
export interface ITreeDataParams<T> {
    //获取数据后无数据
    finishedNoData: boolean;
    //获取树数据参数
    reqParams: ITreeParams;
    //数据列表  tree-datas
    treeDatas: Array<T>;
    // 是否显示树
    isShow: boolean
    //当前树Id tree-id
    treeId: string;
    // 是否能被选中
    checkEnable: boolean;
    //是否单选
    //single-select boolean
    isSingleSelect: boolean;
    //is-simple-data boolean
    isSimpleData: boolean;
    //线条显示
    //show-line boolean
    isShowLine: boolean;
    //图标显示
    //show-icon boolean
    isShowIcon: boolean;
    //列表无数据默认显示 default-no-data-msg
    defaultNoDataMsg: string;
    //搜索无数据默认显示 search-no-data-msg
    searchNoDataMsg: string;
    //树节点 model name 属性名
    // tree-key-name  child_key:string
    treeKeyName: string
    //树节点 model id 属性名
    // tree-id-key  child_key:string
    treeIdKey: string
    //树节点 父id 属性名
    // tree-pid-key  ParentID_key :string
    treePidKey: string
    // 是否初始化默认选择 is-default-selected boolean
    isDefaultSelected: boolean;
    // 打开默认选择状态下（isDefaultSelected == true ）时选择的节点
    defaultSelectTreeId: string;
    /**
     *  点击树节点后执行
     * @time: 2017-04-20 15:28:03
     * @params: treeId ：当前操作树ID  treeNode 被操作数据节点 model
     */
    onClick: (event: Event, treeId: string, treeNode: T, clickFlag: number) => void;
    /**
     *  after 树init end
     * @time: 2017-04-20 15:28:03
     * @params: treeId ：当前操作树ID  treeNode 被操作数据节点 model
     * @return: (tree-init-complete)
     */
    treeInitComplete: Function;
    /**
     *  树节点打钩后选择
     * @time: 2017-04-20 15:28:03
     * @params: treeId ：当前操作树ID  treeNode 被操作数据节点 model
     */
    onCheck: (event: Event, treeId: string, treeNode: T, clickFlag: number) => void;

    /*---------------拖拽相关---------------*/
    beforeDrop: (treeId: string, treeNodes: Array<T>, targetNode: T, moveType: string, isCopy: boolean) => boolean;
    onDrop: (event: MouseEvent, treeId: string, treeNodes: Array<T>, targetNode: T, moveType: string, isCopy: boolean) => any;
    beforeDrag: (treeId: string, treeNodes: Array<T>) => boolean;
    onDrag: (event: Event, treeId: string, treeNodes: Array<T>) => any;

    editEnable: boolean;
    showRenameBtn: boolean;
    showRemoveBtn: boolean;

    isCopy: boolean;
    isMove: boolean;
    isPrev: boolean;
    isNext: boolean;
    isInner: boolean;

    isPrevByFunc: (treeId: string, treeNodes: Array<any>, targetNode: any) => boolean;
    isNextByFunc: (treeId: string, treeNodes: Array<any>, targetNode: any) => boolean;
    isInnerByFunc: (treeId: string, treeNodes: Array<any>, targetNode: any) => boolean;
}

export class TreeDataParams<T> implements ITreeDataParams<T> {
    beforeDrag: (treeId: string, treeNodes: Array<T>) => boolean;
    onDrag: (event: Event, treeId: string, treeNodes: Array<T>) => any;
    isCopy: boolean;
    isMove: boolean;
    isPrev: boolean;
    isNext: boolean;
    isInner: boolean;
    isPrevByFunc: (treeId: string, treeNodes: Array<T>, targetNode: T) => boolean;
    isNextByFunc: (treeId: string, treeNodes: Array<T>, targetNode: T) => boolean;
    isInnerByFunc: (treeId: string, treeNodes: Array<T>, targetNode: T) => boolean;
    editEnable: boolean;
    showRenameBtn: boolean;
    showRemoveBtn: boolean;
    onClick: (event: Event, treeId: string, treeNode: T, clickFlag: number) => void;
    onCheck: (event: Event, treeId: string, treeNode: T) => void;
    onDblClick: (event: Event, treeId: string, treeNode: T) => void;
    addDiyDom: (treeId: string, treeNode: T) => void;
    checkEnable: boolean;
    beforeDrop: (treeId: string, treeNodes: Array<T>, targetNode: T, moveType: string, isCopy: boolean) => boolean;
    onDrop: (event: MouseEvent, treeId: string, treeNodes: Array<T>, targetNode: T, moveType: string, isCopy: boolean) => any;
    finishedNoData: boolean = false;
    isShow: boolean;
    treeIdKey: string;
    reqParams: ITreeParams;
    treeDatas: Array<T>;
    treeId: string;
    isSingleSelect: boolean;
    isSimpleData: boolean;
    isShowLine: boolean;
    isShowIcon: boolean;
    defaultNoDataMsg: string;
    searchNoDataMsg: string;
    treeKeyName: string;
    treePidKey: string;
    isDefaultSelected: boolean;
    defaultSelectTreeId: string;
    treeInitComplete: Function;

    defaultExpandId: string;
    defaultExpandLevel: number;
    beforeMouseDown: (treeId: string, treeNode: any) => void;
    onMouseDown: (event: MouseEvent, treeId: string, treeNode: any) => void;

    constructor(isDefault?: boolean) {
        if (isDefault) return;
        this.isShow = false;
        this.reqParams = {keyword: ''};
        this.treeDatas = [];
        this.isSingleSelect = true;
        this.isSimpleData = true;
        this.isShowLine = false;
        this.isShowIcon = false;
        this.defaultNoDataMsg = '暂无数据';
        this.searchNoDataMsg = '查无数据';
        this.treeIdKey = 'ID';
        this.treeKeyName = 'Name';
        this.treePidKey = 'ParentID';
        this.isDefaultSelected = false;
        this.defaultSelectTreeId = '';

        this.finishedNoData = false;

    }
}