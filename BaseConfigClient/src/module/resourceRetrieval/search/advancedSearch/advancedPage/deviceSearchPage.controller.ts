import {app} from '../../../../common/app/main.app';
import PageParams from '../../../../common/directive/page/page-params';
import {CarSearchParams, multipleChoice} from '../adVanceSearchEnum';

declare let angular: any;

class DeviceSearchPageController {
    $inject: Array<string> = ['$scope', '$timeout', 'layer'];

    maxSacle: number = 100; //  相似度最大值
    selectTimeAcitve: number = 0;//时间段参数
    showMore: boolean = true;//是否显示更多

    pageParams: PageParams = new PageParams();
    searchParams: CarSearchParams;
    crossTrainTimeList: Array<multipleChoice>;

    constructor(private $scope: any,
                private $timeout: any,
                private layer: any) {
        let self = this;

        this.initParams();

        // 延时处理page信息
        $timeout(() => {
            let positionPageParams = new PageParams();
            positionPageParams.pageSize = 10;
            positionPageParams.currentPage = 1;
            positionPageParams.totalCount = 34;
            positionPageParams.pageCount = 36;
            self.pageParams = positionPageParams;
        }, 1000);

    }

    /**
     * @description 初始化参数
     */
    public initParams() {
        let self = this;
        self.searchParams = {
            searchKeyWords: '',
            featureSimilarity: 50,
            carSimilarity: 50
        };

        self.crossTrainTimeList = [
            {
                status: false,
                name: '全部',
                val: 0
            }, {
                status: false,
                name: '近一天',
                val: 1
            }, {
                status: false,
                name: '近一周',
                val: 2
            }, {
                status: false,
                name: '近一月',
                val: 3
            }, {
                status: false,
                name: '自定义',
                val: 4
            }];
    };

    /**
     *
     * @description 选择时间段
     * @param {multipleChoice} item
     */
    public selectTime(item: multipleChoice) {
        let self = this;
        self.crossTrainTimeList.forEach(function (value, index, array) {
            if (value.val === item.val) {
                value.status = true;
                self.selectTimeAcitve = value.val;
            } else {
                value.status = false;
            }
        });
    };

    /**
     *
     * @description 切换页数
     * @param {number} num
     * @returns {PageParams}
     */
    public changePage(num: number) {
        this.pageParams.currentPage = num;
        return this.pageParams;
    };
}

app.controller('DeviceSearchPageController', DeviceSearchPageController);