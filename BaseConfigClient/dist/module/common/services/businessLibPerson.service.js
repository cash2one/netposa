define(["require", "exports", "../app/main.app", "../../../core/server/enum/DataOperType", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "angular", "../factory/response.notify.factory", "../factory/SystemLog.factory"], function (require, exports, main_app_1, DataOperType_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BusinessLibPersonUpdateModel = (function () {
        function BusinessLibPersonUpdateModel(businessPerson) {
            if (businessPerson) {
                if (businessPerson.ID) {
                    this.id = businessPerson.ID;
                    this.operType = DataOperType_1.DataOperType.Update.value;
                }
                else {
                    this.operType = DataOperType_1.DataOperType.Add.value;
                }
                this.libID = businessPerson.LibId;
                this.name = businessPerson.Name;
                this.deletePicPath = businessPerson.DeletePicPath;
                this.addFacePicPath = businessPerson.AddFacePicPath;
                this.birth = businessPerson.Birth;
                this.nation = businessPerson.Nation;
                this.certifyingAuthority = businessPerson.CertifyingAuthority;
                this.gender = businessPerson.Gender;
                this.idCardNumber = businessPerson.IDCardNumber;
                this.homeAddress = businessPerson.HomeAddress;
                this.beginDate = businessPerson.BeginDate;
                this.endDate = businessPerson.EndDate;
            }
        }
        return BusinessLibPersonUpdateModel;
    }());
    exports.BusinessLibPersonUpdateModel = BusinessLibPersonUpdateModel;
    var BusinessLibPersonService = (function () {
        function BusinessLibPersonService($http, notifyFactory, systemLogFactory) {
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.systemLogFactory = systemLogFactory;
            this.checkFaceUrl = "/db/resourceSearch/checkFace";
            this.$http = $http;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        BusinessLibPersonService.prototype.findListByParams = function (params) {
            var _params = params;
            return this.$http({
                method: 'post',
                data: _params,
                url: '/pdp/businesslib/person/list'
            });
        };
        ;
        BusinessLibPersonService.prototype.findPersonAssistById = function (id) {
            var _params = {
                id: id
            };
            return this.$http({
                method: 'post',
                params: _params,
                url: '/pdp/businesslib/person/assist'
            }).then(function (resp) {
                var newResult = angular.copy(resp);
                if (resp && resp.code === 200 && resp.data.length > 0) {
                    newResult.data = resp.data[0];
                }
                return newResult;
            });
        };
        ;
        BusinessLibPersonService.prototype.addPerson = function (params) {
            angular.forEach(params, function (val) {
                val.OperType = DataOperType_1.DataOperType.Add.value;
            });
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                url: '/pdp/businesslib/person/update',
                showLoad: true,
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Resource.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Resource_FaceLib.code,
                ActionType: OperActionType_1.OperActionType.Add.code
            }));
        };
        ;
        BusinessLibPersonService.prototype.updatePerson = function (params) {
            angular.forEach(params, function (val) {
                val.OperType = DataOperType_1.DataOperType.Update.value;
            });
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                url: '/pdp/businesslib/person/update',
                showLoad: true,
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Resource.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Resource_FaceLib.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        BusinessLibPersonService.prototype.deleteById = function (id) {
            var params = new Array();
            var model = new BusinessLibPersonUpdateModel();
            model.id = id;
            model.operType = DataOperType_1.DataOperType.Delete.value;
            params.push(model);
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                url: '/pdp/businesslib/person/update',
                showLoad: true,
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Resource.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Resource_FaceLib.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        BusinessLibPersonService.prototype.deleteByIds = function (ids) {
            var params = new Array();
            ids.forEach(function (id, index) {
                if (id) {
                    params.push({ id: id, operType: DataOperType_1.DataOperType.Delete.value });
                }
            });
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                url: '/pdp/businesslib/person/update',
                showLoad: true,
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Resource.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Resource_FaceLib.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        BusinessLibPersonService.prototype.getCheckFaceUrl = function () {
            return this.checkFaceUrl;
        };
        BusinessLibPersonService.prototype.getDetectFace = function (imgUrl) {
            var params = {
                imageurl: imgUrl
            };
            return this.$http({
                method: 'post',
                url: '/pdp/search/detectFace',
                showLoad: true,
                params: params
            });
        };
        BusinessLibPersonService.$inject = ['$http', 'notifyFactory', 'systemLogFactory'];
        return BusinessLibPersonService;
    }());
    main_app_1.app
        .service('businessLibPersonService', BusinessLibPersonService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL2J1c2luZXNzTGliUGVyc29uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBb0RBO1FBbUJJLHNDQUFZLGNBQWlDO1lBQ3pDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsRUFBRSxHQUFHLGNBQWMsQ0FBQyxFQUFFLENBQUM7b0JBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsMkJBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUU5QyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsMkJBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUMzQyxDQUFDO2dCQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztnQkFFbEMsSUFBSSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDO2dCQUVoQyxJQUFJLENBQUMsYUFBYSxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQztnQkFFcEQsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUM7Z0JBRXBDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxjQUFjLENBQUMsbUJBQW1CLENBQUM7Z0JBQzlELElBQUksQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztnQkFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDO2dCQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxXQUFX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QUFFLGlDQUFlLENBQUMsVUFBVSxDQUFDLElBQUk7Z0JBQ2hELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLG1CQUFtQixDQUFDLElBQUk7Z0JBQzNELGVBQWUsRUFBRSxpQ0FBZSxDQUFDLDJCQUEyQixDQUFDLElBQUk7Z0JBQ2pFLFVBQVUsRUFBRSwrQkFBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJO2FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQztRQUFBLENBQUM7UUFFRixrREFBZSxHQUFmO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQztRQUVELGdEQUFhLEdBQWIsVUFBYyxNQUFjO1lBQ3hCLElBQUksTUFBTSxHQUFHO2dCQUNULFFBQVEsRUFBRSxNQUFNO2FBQ25CLENBQUM7WUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxHQUFHLEVBQUUsd0JBQXdCO2dCQUM3QixRQUFRLEVBQUUsSUFBSTtnQkFDZCxNQUFNLEVBQUUsTUFBTTthQUNqQixDQUFDLENBQUE7UUFDTixDQUFDO1FBM0lNLGdDQUFPLEdBQWtCLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBNEluRiwrQkFBQztLQTlJRCxBQThJQyxJQUFBO0lBRUQsY0FBRztTQUNFLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vc2VydmljZXMvYnVzaW5lc3NMaWJQZXJzb24uc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1c2luZXNzTGliTGlzdFBhcmFtcywgQnVzaW5lc3NMaWJQZXJzb25MaXN0UGFyYW1zIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL0J1c2luZXNzTGliUGFyYW1zXCI7XHJcbmRlY2xhcmUgdmFyIHJlcXVpcmU6IGFueTtcclxuaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5cclxuaW1wb3J0ICdhbmd1bGFyJztcclxuaW1wb3J0IHsgQnVzaW5lc3NQZXJzb25FeCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9CdXNpbmVzc1BlcnNvbk1vZGVsXCI7XHJcbmltcG9ydCB7IERhdGFPcGVyVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0RhdGFPcGVyVHlwZVwiO1xyXG5pbXBvcnQgeyBCdXNpbmVzc0xpYiB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9CdXNpbmVzc0xpYlwiO1xyXG5pbXBvcnQgeyBSZXNwb25zZVJlc3VsdCwgUGFnZVJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHsgSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSB9IGZyb20gXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uL2ZhY3RvcnkvcmVzcG9uc2Uubm90aWZ5LmZhY3RvcnlcIjtcclxuaW1wb3J0IHsgSUJ1c2luZXNzUGVyc29uIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0J1c2luZXNzUGVyc29uXCI7XHJcbmltcG9ydCB7IElQZXJzb25Bc3Npc3QgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvUGVyc29uQXNzaXN0TW9kZWxcIjtcclxuaW1wb3J0IHsgT3BlckZpdHN0TW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlckZpcnN0TW9kdWxlJztcclxuaW1wb3J0IHsgT3BlclNlY29uZE1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJTZWNvbmRNb2R1bGUnO1xyXG5pbXBvcnQgeyBPcGVyVGhpcmRNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyVGhpcmRNb2R1bGUnO1xyXG5pbXBvcnQgeyBPcGVyQWN0aW9uVHlwZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJBY3Rpb25UeXBlJztcclxuaW1wb3J0IHsgSVN5c3RlbUxvZ0ZhY3RvcnkgfSBmcm9tIFwiLi4vZmFjdG9yeS9TeXN0ZW1Mb2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5XCI7XHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCdXNpbmVzc0xpYlBlcnNvblNlcnZpY2Uge1xyXG4gICAgZmluZExpc3RCeVBhcmFtczogKHBhcmFtczogQnVzaW5lc3NMaWJQZXJzb25MaXN0UGFyYW1zKSA9PiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PFBhZ2VSZXN1bHQ8SUJ1c2luZXNzUGVyc29uPj4+O1xyXG4gICAgLyoqIGNyZWF0ZSBieSB6eHFcclxuICAgICAqIOagueaNrmlkIOafpeivoiDkurrlkZgg6L6F5Yqp5L+h5oGvXHJcbiAgICAgKiBAdGltZTogMjAxNy0wNy0xNyAxNTozNzowNVxyXG4gICAgICogQHBhcmFtczpcclxuICAgICAqIEByZXR1cm46XHJcbiAgICAgKi9cclxuICAgIGZpbmRQZXJzb25Bc3Npc3RCeUlkOiAoaWQ6IHN0cmluZykgPT4gUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxJUGVyc29uQXNzaXN0Pj47XHJcblxyXG4gICAgZGVsZXRlQnlJZDogKGlkOiBzdHJpbmcpID0+IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8Ym9vbGVhbj4+O1xyXG4gICAgZGVsZXRlQnlJZHM6IChpZHM6IEFycmF5PHN0cmluZz4pID0+IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8Ym9vbGVhbj4+O1xyXG4gICAgYWRkUGVyc29uOiAocGFyYW1zOiBBcnJheTxCdXNpbmVzc1BlcnNvbkV4PikgPT4gUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuICAgIHVwZGF0ZVBlcnNvbjogKHBhcmFtczogQXJyYXk8QnVzaW5lc3NQZXJzb25FeD4pID0+IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbiAgICAvKiogY3JlYXRlIGJ5IHp4cVxyXG4gICAgICogIOWbvueJh+S6uuiEuOajgOafpeaYr+WQpuacieS6uuiEuCDmjqXlj6Pot6/lvoRcclxuICAgICAqIEB0aW1lOiAyMDE3LTA3LTE1IDE1OjAyOjE4XHJcbiAgICAgKiBAcGFyYW1zOlxyXG4gICAgICogQHJldHVybjpcclxuICAgICAqL1xyXG4gICAgZ2V0Q2hlY2tGYWNlVXJsOiAoKSA9PiBzdHJpbmc7XHJcbiAgICAvKiogY3JlYXRlIGJ5IHp4cVxyXG4gICAgICogIOacieS6uuiEuOWbvueJhyDotoXmnJ8g54m55b6B5YC8IOmHjeaWsOiOt+WPluWKn+iDvVxyXG4gICAgICogQHRpbWU6IDIwMTctMDctMTUgMTU6MDI6MThcclxuICAgICAqIEBwYXJhbXM6IGltZ1VybCDmo4Dmn6Ug5pyJ5Lq66IS4IOi/lOWbnueahOWbvueJh+i3r+W+hFxyXG4gICAgICogQHJldHVybjog54m55b6B5YC85pWw5o2uXHJcbiAgICAgKi9cclxuICAgIGdldERldGVjdEZhY2U6IChpbWdVcmw6IHN0cmluZykgPT4gYW55O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQnVzaW5lc3NMaWJQZXJzb25VcGRhdGVNb2RlbCB7XHJcbiAgICBhZGRGYWNlUGljUGF0aDogQXJyYXk8c3RyaW5nPjtcclxuICAgIGJlZ2luRGF0ZTogc3RyaW5nO1xyXG4gICAgYmlydGg6IHN0cmluZztcclxuICAgIGNlcnRpZnlpbmdBdXRob3JpdHk6IHN0cmluZztcclxuICAgIGNyZWF0ZVRpbWU6IHN0cmluZztcclxuICAgIGRlbGV0ZVBpY1BhdGg6IEFycmF5PHN0cmluZz47XHJcbiAgICBlbmREYXRlOiBzdHJpbmc7XHJcbiAgICBnZW5kZXI6IHN0cmluZztcclxuICAgIGhvbWVBZGRyZXNzOiBzdHJpbmc7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgaWRDYXJkTnVtYmVyOiBzdHJpbmc7XHJcbiAgICBsaWJJRDogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbmF0aW9uOiBzdHJpbmc7XHJcbiAgICBvcGVyVHlwZTogc3RyaW5nO1xyXG4gICAgcFlDb2RlOiBzdHJpbmc7XHJcbiAgICB1cGRhdGVUaW1lOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYnVzaW5lc3NQZXJzb24/OiBCdXNpbmVzc1BlcnNvbkV4KSB7XHJcbiAgICAgICAgaWYgKGJ1c2luZXNzUGVyc29uKSB7XHJcbiAgICAgICAgICAgIGlmIChidXNpbmVzc1BlcnNvbi5JRCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pZCA9IGJ1c2luZXNzUGVyc29uLklEO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVyVHlwZSA9IERhdGFPcGVyVHlwZS5VcGRhdGUudmFsdWU7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVyVHlwZSA9IERhdGFPcGVyVHlwZS5BZGQudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubGliSUQgPSBidXNpbmVzc1BlcnNvbi5MaWJJZDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IGJ1c2luZXNzUGVyc29uLk5hbWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZVBpY1BhdGggPSBidXNpbmVzc1BlcnNvbi5EZWxldGVQaWNQYXRoO1xyXG4gICAgICAgICAgICB0aGlzLmFkZEZhY2VQaWNQYXRoID0gYnVzaW5lc3NQZXJzb24uQWRkRmFjZVBpY1BhdGg7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJpcnRoID0gYnVzaW5lc3NQZXJzb24uQmlydGg7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aW9uID0gYnVzaW5lc3NQZXJzb24uTmF0aW9uO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jZXJ0aWZ5aW5nQXV0aG9yaXR5ID0gYnVzaW5lc3NQZXJzb24uQ2VydGlmeWluZ0F1dGhvcml0eTtcclxuICAgICAgICAgICAgdGhpcy5nZW5kZXIgPSBidXNpbmVzc1BlcnNvbi5HZW5kZXI7XHJcbiAgICAgICAgICAgIHRoaXMuaWRDYXJkTnVtYmVyID0gYnVzaW5lc3NQZXJzb24uSURDYXJkTnVtYmVyO1xyXG4gICAgICAgICAgICB0aGlzLmhvbWVBZGRyZXNzID0gYnVzaW5lc3NQZXJzb24uSG9tZUFkZHJlc3M7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJlZ2luRGF0ZSA9IGJ1c2luZXNzUGVyc29uLkJlZ2luRGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gYnVzaW5lc3NQZXJzb24uRW5kRGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBCdXNpbmVzc0xpYlBlcnNvblNlcnZpY2UgaW1wbGVtZW50cyBJQnVzaW5lc3NMaWJQZXJzb25TZXJ2aWNlIHtcclxuXHJcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJGh0dHAnLCAnbm90aWZ5RmFjdG9yeScsICdzeXN0ZW1Mb2dGYWN0b3J5J107XHJcbiAgICBwcml2YXRlIG5vdGlmeUZ1bmM6IChyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pID0+IFJlc3BvbnNlUmVzdWx0PGFueT47XHJcbiAgICBwcml2YXRlIGNoZWNrRmFjZVVybDogc3RyaW5nID0gXCIvZGIvcmVzb3VyY2VTZWFyY2gvY2hlY2tGYWNlXCI7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbnksIHByaXZhdGUgbm90aWZ5RmFjdG9yeTogSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSwgcHJpdmF0ZSBzeXN0ZW1Mb2dGYWN0b3J5OiBJU3lzdGVtTG9nRmFjdG9yeSkge1xyXG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcclxuICAgICAgICB0aGlzLm5vdGlmeUZ1bmMgPSB0aGlzLm5vdGlmeUZhY3RvcnkubXNnKHsgb25seVN1Y2Nlc3M6IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZExpc3RCeVBhcmFtcyhwYXJhbXM6IEJ1c2luZXNzTGliUGVyc29uTGlzdFBhcmFtcykge1xyXG4gICAgICAgIGxldCBfcGFyYW1zID0gcGFyYW1zO1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGRhdGE6IF9wYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDogJy9wZHAvYnVzaW5lc3NsaWIvcGVyc29uL2xpc3QnXHJcbiAgICAgICAgfSkvKi50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PEFycmF5PHtMaWJOYW1lOnN0cmluZztQZXJzb25JbmZvOklCdXNpbmVzc1BlcnNvbn0+fEFycmF5PElCdXNpbmVzc1BlcnNvbj4+KT0+e1xyXG4gICAgICAgICAgICBpZihyZXNwLmNvZGUgPT0gMjAwICYmIHJlc3AuZGF0YSApe1xyXG4gICAgICAgICAgICAgICAgbGV0IHBlcnNvbkxpc3Q6QXJyYXk8SUJ1c2luZXNzUGVyc29uPiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYocmVzcC5jb3VudD4wKXtcclxuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2gocmVzcC5kYXRhLCh2YWw6e0xpYk5hbWU6c3RyaW5nO1BlcnNvbkluZm86SUJ1c2luZXNzUGVyc29ufSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uTGlzdC5wdXNoKHZhbC5QZXJzb25JbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXNwLmRhdGEgPSBwZXJzb25MaXN0IDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3A7XHJcbiAgICAgICAgfSk7Ki9cclxuICAgIH07XHJcblxyXG4gICAgZmluZFBlcnNvbkFzc2lzdEJ5SWQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBfcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBpZDogaWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIHBhcmFtczogX3BhcmFtcyxcclxuICAgICAgICAgICAgdXJsOiAnL3BkcC9idXNpbmVzc2xpYi9wZXJzb24vYXNzaXN0J1xyXG4gICAgICAgIH0pLnRoZW4oKHJlc3A6IFJlc3BvbnNlUmVzdWx0PEFycmF5PElQZXJzb25Bc3Npc3Q+PikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbmV3UmVzdWx0ID0gYW5ndWxhci5jb3B5KHJlc3ApIGFzIFJlc3BvbnNlUmVzdWx0PElQZXJzb25Bc3Npc3Q+O1xyXG4gICAgICAgICAgICBpZiAocmVzcCAmJiByZXNwLmNvZGUgPT09IDIwMCAmJiByZXNwLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbmV3UmVzdWx0LmRhdGEgPSByZXNwLmRhdGFbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ld1Jlc3VsdDtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgYWRkUGVyc29uKHBhcmFtczogQXJyYXk8QnVzaW5lc3NQZXJzb25FeD4pIHtcclxuICAgICAgICBhbmd1bGFyLmZvckVhY2gocGFyYW1zLCAodmFsOiBCdXNpbmVzc1BlcnNvbkV4KSA9PiB7XHJcbiAgICAgICAgICAgIHZhbC5PcGVyVHlwZSA9IERhdGFPcGVyVHlwZS5BZGQudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24gO2NoYXJzZXQ9dXRmLTgnIH0sXHJcbiAgICAgICAgICAgIHVybDogJy9wZHAvYnVzaW5lc3NsaWIvcGVyc29uL3VwZGF0ZScsXHJcbiAgICAgICAgICAgIHNob3dMb2FkOiB0cnVlLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXNcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19SZXNvdXJjZS5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX1Jlc291cmNlX0ZhY2VMaWIuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuQWRkLmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG4gICAgdXBkYXRlUGVyc29uKHBhcmFtczogQXJyYXk8QnVzaW5lc3NQZXJzb25FeD4pIHtcclxuICAgICAgICBhbmd1bGFyLmZvckVhY2gocGFyYW1zLCAodmFsOiBCdXNpbmVzc1BlcnNvbkV4KSA9PiB7XHJcbiAgICAgICAgICAgIHZhbC5PcGVyVHlwZSA9IERhdGFPcGVyVHlwZS5VcGRhdGUudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24gO2NoYXJzZXQ9dXRmLTgnIH0sXHJcbiAgICAgICAgICAgIHVybDogJy9wZHAvYnVzaW5lc3NsaWIvcGVyc29uL3VwZGF0ZScsXHJcbiAgICAgICAgICAgIHNob3dMb2FkOiB0cnVlLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXNcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19SZXNvdXJjZS5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX1Jlc291cmNlX0ZhY2VMaWIuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuTW9kaWZ5LmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBkZWxldGVCeUlkKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IEFycmF5PEJ1c2luZXNzTGliUGVyc29uVXBkYXRlTW9kZWw+KCk7XHJcbiAgICAgICAgbGV0IG1vZGVsID0gbmV3IEJ1c2luZXNzTGliUGVyc29uVXBkYXRlTW9kZWwoKTtcclxuICAgICAgICBtb2RlbC5pZCA9IGlkO1xyXG4gICAgICAgIG1vZGVsLm9wZXJUeXBlID0gRGF0YU9wZXJUeXBlLkRlbGV0ZS52YWx1ZTtcclxuICAgICAgICBwYXJhbXMucHVzaChtb2RlbCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXHJcbiAgICAgICAgICAgIHVybDogJy9wZHAvYnVzaW5lc3NsaWIvcGVyc29uL3VwZGF0ZScsXHJcbiAgICAgICAgICAgIHNob3dMb2FkOiB0cnVlLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXNcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19SZXNvdXJjZS5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX1Jlc291cmNlX0ZhY2VMaWIuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuRGVsLmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRlbGV0ZUJ5SWRzKGlkczogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSBuZXcgQXJyYXk8QnVzaW5lc3NMaWJQZXJzb25VcGRhdGVNb2RlbD4oKTtcclxuICAgICAgICBpZHMuZm9yRWFjaCgoaWQ6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaWQpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtcy5wdXNoKHsgaWQ6IGlkLCBvcGVyVHlwZTogRGF0YU9wZXJUeXBlLkRlbGV0ZS52YWx1ZSB9IGFzIEJ1c2luZXNzTGliUGVyc29uVXBkYXRlTW9kZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXHJcbiAgICAgICAgICAgIHVybDogJy9wZHAvYnVzaW5lc3NsaWIvcGVyc29uL3VwZGF0ZScsXHJcbiAgICAgICAgICAgIHNob3dMb2FkOiB0cnVlLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXNcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19SZXNvdXJjZS5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX1Jlc291cmNlX0ZhY2VMaWIuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuRGVsLmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldENoZWNrRmFjZVVybCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrRmFjZVVybDtcclxuICAgIH1cclxuXHJcbiAgICBnZXREZXRlY3RGYWNlKGltZ1VybDogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBpbWFnZXVybDogaW1nVXJsXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvcGRwL3NlYXJjaC9kZXRlY3RGYWNlJyxcclxuICAgICAgICAgICAgc2hvd0xvYWQ6IHRydWUsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuYXBwXHJcbiAgICAuc2VydmljZSgnYnVzaW5lc3NMaWJQZXJzb25TZXJ2aWNlJywgQnVzaW5lc3NMaWJQZXJzb25TZXJ2aWNlKTsiXX0=
