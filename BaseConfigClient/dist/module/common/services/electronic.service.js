define(["require", "exports", "../app/main.app", "../factory/response.notify.factory", "angular", "./casecade.service"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ElectronicService = (function () {
        function ElectronicService($http, notifyFactory, casCadeService) {
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.casCadeService = casCadeService;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        ElectronicService.prototype.findElectronicfenceList = function (search) {
            return this.$http({
                method: "POST",
                url: "/db/area/findElectronicfenceList",
                params: { keyword: search }
            })
                .then(complete);
            function complete(res) {
                var arr = [];
                if (res && res.code === 200 && res.data) {
                    arr = res.data;
                }
                return arr;
            }
        };
        ElectronicService.prototype.updateElectronicAreaID = function (models) {
            return this.$http({
                method: 'POST',
                url: '/db/electronic/updateAreaForElectronicfence',
                data: models
            }).then(this.notifyFunc);
        };
        ElectronicService.prototype.findAll = function () {
            return this.$http({
                method: 'get',
                url: '/db/camera/findAllList'
            }).then(complete);
            function complete(res) {
                var arr = [];
                if (res && res.code === 200 && res.data) {
                    arr = res.data;
                }
                return arr;
            }
        };
        ElectronicService.prototype.updateCameraType = function (models) {
            return this.$http({
                method: 'post',
                url: '/db/camera/changeCameraType',
                data: models
            }).then(this.notifyFunc);
        };
        ElectronicService.prototype.deleteById = function (models) {
            return this.$http({
                method: 'post',
                url: '/db/electronic/delete',
                data: { id: models.ID }
            }).then(complete);
            function complete(res) {
                var arr = [];
                if (res && res.code === 200 && res.data) {
                    arr = res.data;
                }
                return arr;
            }
        };
        ElectronicService.prototype.create = function (models) {
            return this.$http({
                method: 'post',
                url: '/db/camera/create',
                data: models
            }).then(complete);
            function complete(res) {
                var arr = [];
                if (res && res.code === 200 && res.data) {
                    arr = res.data;
                }
                return arr;
            }
        };
        ElectronicService.prototype.edit = function (models) {
            return this.$http({
                method: 'post',
                url: '/db/electronicfence/edit',
                data: models
            }).then(complete);
            function complete(res) {
                var arr = [];
                if (res && res.code === 200 && res.data) {
                    arr = res.data;
                }
                return arr;
            }
        };
        ElectronicService.prototype.findLampTree = function () {
            return this.$http({
                method: 'get',
                url: '/db/area/findLampTree',
            }).then(complete);
            function complete(res) {
                console.log(res);
                var arr = [];
                if (res && res.code === 200 && res.data) {
                    arr = res.data;
                    console.log("=========================>");
                    console.log(arr);
                }
                return arr;
            }
        };
        ElectronicService.$inject = ['$http', 'notifyFactory', 'casCadeService'];
        return ElectronicService;
    }());
    main_app_1.app
        .service('electronicService', ElectronicService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL2VsZWN0cm9uaWMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUE4QkE7UUFNSSwyQkFBb0IsS0FBZSxFQUFVLGFBQXFDLEVBQVUsY0FBOEI7WUFBdEcsVUFBSyxHQUFMLEtBQUssQ0FBVTtZQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUF3QjtZQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtZQUN0SCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQztRQUVELG1EQUF1QixHQUF2QixVQUF3QixNQUFlO1lBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSxrQ0FBa0M7Z0JBQ3ZDLE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUM7YUFDM0IsQ0FBQztpQkFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDZixrQkFBa0IsR0FBNkM7Z0JBQzNELElBQUksR0FBRyxHQUFHLEVBQThCLENBQUM7Z0JBQ3pDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDdEMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNmLENBQUM7UUFDTCxDQUFDO1FBRUQsa0RBQXNCLEdBQXRCLFVBQXVCLE1BQTBDO1lBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSw2Q0FBNkM7Z0JBQ2xELElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FB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QUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNmLENBQUM7UUFDTCxDQUFDO1FBRUQsd0NBQVksR0FBWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxLQUFLO2dCQUNiLEdBQUcsRUFBRSx1QkFBdUI7YUFDL0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVsQixrQkFBa0IsR0FBMkM7Z0JBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ2hCLElBQUksR0FBRyxHQUFHLEVBQTRCLENBQUM7Z0JBQ3ZDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDdEMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO29CQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNwQixDQUFDO2dCQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDZixDQUFDO1FBQ0wsQ0FBQztRQTNITSx5QkFBTyxHQUFrQixDQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQXdJaEYsd0JBQUM7S0EzSUQsQUEySUMsSUFBQTtJQUVELGNBQUc7U0FDRSxPQUFPLENBQUMsbUJBQW1CLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL2VsZWN0cm9uaWMuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVJlc3BvbnNlTm90aWZ5RmFjdG9yeX0gZnJvbSBcIi4uL2ZhY3RvcnkvcmVzcG9uc2Uubm90aWZ5LmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5kZWNsYXJlIGxldCByZXF1aXJlOiBhbnk7XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnYW5ndWxhcic7XHJcbmltcG9ydCB7RWxlY3Ryb25pY0NoYW5nZUFyZWFJRE1vZGVsLCBFbGVjdHJvbmljQ2hhbmdlQ2FtZXJhVHlwZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL0VsZWN0cm9uaWNQYXJhbXNcIjtcclxuaW1wb3J0IHtFbGVjdHJvbmljfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvRWxlY3Ryb25pY1wiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7RWxlY3Ryb25pY0ZlbmNlRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9FbGVjdHJvbmljRmVuY2VFeFwiO1xyXG5pbXBvcnQgeyBMYW1wRXggfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9MYW1wRXgnO1xyXG5pbXBvcnQge0FyZWFFeH0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4JztcclxuaW1wb3J0ICcuL2Nhc2VjYWRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDYXNDYWRlU2VydmljZSB9IGZyb20gJy4vY2FzZWNhZGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvZXM2LXByb21pc2UvaW5kZXgnO1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRWxlY3Ryb25pY1NlcnZpY2Uge1xyXG4gICAgLy8gVE9ETyDmsqHmnInkvb/nlKjliLDnmoTmjqXlj6NcclxuICAgIC8vZmluZExpc3RCeVBhZ2UocGFyYW1zOiBDYW1lcmFMaXN0UGFyYW1zKTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuICAgIGZpbmRFbGVjdHJvbmljZmVuY2VMaXN0OihzZWFyY2g/OiBzdHJpbmcpPT4gUHJvbWlzZTxBcnJheTxFbGVjdHJvbmljRmVuY2VFeD4+O1xyXG4gICAgZmluZEFsbCgpOiBQcm9taXNlPEFycmF5PEVsZWN0cm9uaWM+PjtcclxuICAgIGRlbGV0ZUJ5SWQobW9kZWxzOiBFbGVjdHJvbmljKTpQcm9taXNlPGFueT47XHJcbiAgICBjcmVhdGUobW9kZWxzOiBBcnJheTxFbGVjdHJvbmljQ2hhbmdlQXJlYUlETW9kZWw+KTpQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGJvb2xlYW4+PjtcclxuICAgIGVkaXQobW9kZWxzOiBFbGVjdHJvbmljKTpQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGJvb2xlYW4+PjtcclxuICAgIHVwZGF0ZUVsZWN0cm9uaWNBcmVhSUQobW9kZWxzOiBBcnJheTxFbGVjdHJvbmljQ2hhbmdlQXJlYUlETW9kZWw+KTpQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGJvb2xlYW4+PjtcclxuICAgIHVwZGF0ZUNhbWVyYVR5cGUobW9kZWxzOiBBcnJheTxFbGVjdHJvbmljQ2hhbmdlQ2FtZXJhVHlwZT4pOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8Ym9vbGVhbj4+O1xyXG4gICAgZmluZExhbXBUcmVlKCk6UHJvbWlzZTxhbnk+O1xyXG59XHJcblxyXG5jbGFzcyBFbGVjdHJvbmljU2VydmljZSBpbXBsZW1lbnRzIElFbGVjdHJvbmljU2VydmljZSB7XHJcblxyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gWyckaHR0cCcsJ25vdGlmeUZhY3RvcnknLCAnY2FzQ2FkZVNlcnZpY2UnXTtcclxuICAgIHByaXZhdGUgbm90aWZ5RnVuYzoocmVzOiBSZXNwb25zZVJlc3VsdDxhbnk+KT0+UmVzcG9uc2VSZXN1bHQ8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBGdW5jdGlvbiwgcHJpdmF0ZSBub3RpZnlGYWN0b3J5OiBJUmVzcG9uc2VOb3RpZnlGYWN0b3J5LCBwcml2YXRlIGNhc0NhZGVTZXJ2aWNlOiBDYXNDYWRlU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMubm90aWZ5RnVuYyA9IHRoaXMubm90aWZ5RmFjdG9yeS5tc2coe29ubHlTdWNjZXNzOiB0cnVlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEVsZWN0cm9uaWNmZW5jZUxpc3Qoc2VhcmNoPzogc3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvYXJlYS9maW5kRWxlY3Ryb25pY2ZlbmNlTGlzdFwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtrZXl3b3JkOnNlYXJjaH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKGNvbXBsZXRlKVxyXG4gICAgICAgIGZ1bmN0aW9uIGNvbXBsZXRlKHJlczogUmVzcG9uc2VSZXN1bHQ8QXJyYXk8RWxlY3Ryb25pY0ZlbmNlRXg+Pikge1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8RWxlY3Ryb25pY0ZlbmNlRXg+O1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5jb2RlID09PSAyMDAgJiYgcmVzLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGFyciA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhcnI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/mm7TmlrDnlLXlm7TljLrln59JRFxyXG4gICAgdXBkYXRlRWxlY3Ryb25pY0FyZWFJRChtb2RlbHM6IEFycmF5PEVsZWN0cm9uaWNDaGFuZ2VBcmVhSURNb2RlbD4pOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGJvb2xlYW4+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL2VsZWN0cm9uaWMvdXBkYXRlQXJlYUZvckVsZWN0cm9uaWNmZW5jZScsXHJcbiAgICAgICAgICAgIGRhdGE6IG1vZGVsc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5ub3RpZnlGdW5jKTtcclxuICAgIH1cclxuXHJcbiAgICAgZmluZEFsbCgpOiBQcm9taXNlPEFycmF5PEVsZWN0cm9uaWM+PiB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL2NhbWVyYS9maW5kQWxsTGlzdCdcclxuICAgICAgICB9KS50aGVuKGNvbXBsZXRlKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVzOiBSZXNwb25zZVJlc3VsdDxBcnJheTxFbGVjdHJvbmljRmVuY2VFeD4+KSB7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxFbGVjdHJvbmljRmVuY2VFeD47XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmNvZGUgPT09IDIwMCAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgYXJyID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFycjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgdXBkYXRlQ2FtZXJhVHlwZShtb2RlbHM6IEFycmF5PEVsZWN0cm9uaWNDaGFuZ2VDYW1lcmFUeXBlPil7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL2NhbWVyYS9jaGFuZ2VDYW1lcmFUeXBlJyxcclxuICAgICAgICAgICAgZGF0YTogbW9kZWxzXHJcbiAgICAgICAgfSkudGhlbih0aGlzLm5vdGlmeUZ1bmMpO1xyXG4gICAgfVxyXG5cclxuICAgXHJcbiAgICBkZWxldGVCeUlkKG1vZGVsczpFbGVjdHJvbmljKTpQcm9taXNlPGFueT57IFxyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi9lbGVjdHJvbmljL2RlbGV0ZScsXHJcbiAgICAgICAgICAgIGRhdGE6e2lkOm1vZGVscy5JRH1cclxuICAgICAgICB9KS50aGVuKGNvbXBsZXRlKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVzOiBSZXNwb25zZVJlc3VsdDxBcnJheTxFbGVjdHJvbmljRmVuY2VFeD4+KSB7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxFbGVjdHJvbmljRmVuY2VFeD47XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmNvZGUgPT09IDIwMCAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgYXJyID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFycjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlKG1vZGVsczogQXJyYXk8RWxlY3Ryb25pY0NoYW5nZUFyZWFJRE1vZGVsPil7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL2NhbWVyYS9jcmVhdGUnLFxyXG4gICAgICAgICAgICBkYXRhOm1vZGVsc1xyXG4gICAgICAgIH0pLnRoZW4oY29tcGxldGUpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShyZXM6IFJlc3BvbnNlUmVzdWx0PEFycmF5PEVsZWN0cm9uaWNGZW5jZUV4Pj4pIHtcclxuICAgICAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PEVsZWN0cm9uaWNGZW5jZUV4PjtcclxuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuY29kZSA9PT0gMjAwICYmIHJlcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBlZGl0KG1vZGVsczogRWxlY3Ryb25pYyl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL2VsZWN0cm9uaWNmZW5jZS9lZGl0JyxcclxuICAgICAgICAgICAgZGF0YTptb2RlbHNcclxuICAgICAgICB9KS50aGVuKGNvbXBsZXRlKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVzOiBSZXNwb25zZVJlc3VsdDxBcnJheTxFbGVjdHJvbmljRmVuY2VFeD4+KSB7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxFbGVjdHJvbmljRmVuY2VFeD47XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmNvZGUgPT09IDIwMCAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBhcnIgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kTGFtcFRyZWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi9hcmVhL2ZpbmRMYW1wVHJlZScsXHJcbiAgICAgICAgfSkudGhlbihjb21wbGV0ZSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNvbXBsZXRlKHJlczogUmVzcG9uc2VSZXN1bHQ8QXJyYXk8TGFtcEV4IHwgQXJlYUV4Pj4pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8TGFtcEV4IHwgQXJlYUV4PjtcclxuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuY29kZSA9PT0gMjAwICYmIHJlcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT5cIilcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFycilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8vIFRPRE8g5rKh5pyJ5L2/55So5Yiw55qE5o6l5Y+jXHJcbiAgICAvLyBmaW5kTGlzdEJ5UGFnZShwYXJhbXM6IENhbWVyYUxpc3RQYXJhbXMpIHtcclxuICAgIC8vICAgICBsZXQgX3BhcmFtcyA9IHBhcmFtcztcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAvLyAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAvLyAgICAgICAgIHBhcmFtczogX3BhcmFtcyxcclxuICAgIC8vICAgICAgICAgdXJsOiAnL2RiL2NhbWVyYS9maW5kTGlzdEJ5UGFnZSdcclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gfTtcclxuXHJcbn1cclxuXHJcbmFwcFxyXG4gICAgLnNlcnZpY2UoJ2VsZWN0cm9uaWNTZXJ2aWNlJywgRWxlY3Ryb25pY1NlcnZpY2UpOyJdfQ==
