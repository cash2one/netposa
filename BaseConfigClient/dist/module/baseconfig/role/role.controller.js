define(["require", "exports", "../../common/app/main.app", "css!../style/baseconfig.role.css", "../../common/services/role.service"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseConfigRoleController = (function () {
        function BaseConfigRoleController($scope, $timeout, roleService, layer, i18nFactory, $state) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.roleService = roleService;
            this.layer = layer;
            this.i18nFactory = i18nFactory;
            this.$state = $state;
            this.getRoleList(this.findRoleListParams);
        }
        BaseConfigRoleController.prototype.getRoleList = function (params) {
            var _this = this;
            this.roleService.findListByParams(params).then(function (resp) {
                if (resp && resp.code == 200) {
                    _this.roleList = resp.data;
                }
            });
        };
        ;
        BaseConfigRoleController.prototype.addRole = function () {
            this.$state.go('baseconfig.role.newRole');
        };
        ;
        BaseConfigRoleController.prototype.updateRole = function (roleId) {
            this.$state.go('baseconfig.role.newRole', { roleId: roleId });
        };
        ;
        BaseConfigRoleController.prototype.deleteById = function (data) {
            var _this = this;
            var tipStr = this.i18nFactory('FDS_01_04_19', { value: data.Name });
            this.layer.confirm(tipStr, {
                icon: 0,
                title: this.i18nFactory("FDS_00_05_04"),
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.submitDelete(data.ID);
            });
        };
        ;
        BaseConfigRoleController.prototype.submitDelete = function (id) {
            var _this = this;
            this.roleService.deleteById(id).then(function (resp) {
                if (resp.code == 200) {
                    _this.getRoleList(_this.findRoleListParams);
                }
            });
        };
        ;
        BaseConfigRoleController.$inject = ["$scope", "$timeout", "roleService", "layer", 'i18nFactory', '$state'];
        return BaseConfigRoleController;
    }());
    main_app_1.app.controller("baseConfigRoleController", BaseConfigRoleController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9yb2xlL3JvbGUuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFtQkE7UUFJSSxrQ0FBb0IsTUFBVyxFQUFTLFFBQVksRUFDaEMsV0FBeUIsRUFDekIsS0FBVSxFQUFTLFdBQWUsRUFDbEMsTUFBVTtZQUhWLFdBQU0sR0FBTixNQUFNLENBQUs7WUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFJO1lBQ2hDLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1lBQ3pCLFVBQUssR0FBTCxLQUFLLENBQUs7WUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBSTtZQUNsQyxXQUFNLEdBQU4sTUFBTSxDQUFJO1lBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDOUMsQ0FBQztRQU1ELDhDQUFXLEdBQVgsVUFBWSxNQUFrQjtZQUE5QixpQkFPQztZQU5HLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBaUM7Z0JBQzdFLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFFOUIsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUFBLENBQUM7UUFHRiwwQ0FBTyxHQUFQO1lBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMseUJBQXlCLENBQUMsQ0FBQTtRQUM3QyxDQUFDO1FBQUEsQ0FBQztRQUVGLDZDQUFVLEdBQVYsVUFBVyxNQUFjO1lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLHlCQUF5QixFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxDQUFDLENBQUE7UUFDN0QsQ0FBQztRQUFBLENBQUM7UUFFRiw2Q0FBVSxHQUFWLFVBQVcsSUFBVTtZQUFyQixpQkFVQztZQVRHLElBQUksTUFBTSxHQUFZLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDO2dCQUN2QyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2FBQzNCLEVBQUUsVUFBQyxLQUFhO2dCQUNiLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN4QixLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFBQSxDQUFDO1FBRUYsK0NBQVksR0FBWixVQUFhLEVBQVU7WUFBdkIsaUJBTUM7WUFMRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUE0QjtnQkFDOUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNuQixLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUM5QyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQUEsQ0FBQztRQWhESyxnQ0FBTyxHQUFHLENBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxhQUFhLEVBQUUsT0FBTyxFQUFDLGFBQWEsRUFBQyxRQUFRLENBQUMsQ0FBQztRQWlEekYsK0JBQUM7S0FwREQsQUFvREMsSUFBQTtJQUNELGNBQUcsQ0FBQyxVQUFVLENBQUMsMEJBQTBCLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvYmFzZWNvbmZpZy9yb2xlL3JvbGUuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDop5LoibLnrqHnkIZcclxuICogQHRpbWU6IDIwMTctMDUtMTMgMTM6NDc6MDFcclxuICogQHBhcmFtczpcclxuICogQHJldHVybjpcclxuICovXHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgXCJjc3MhLi4vc3R5bGUvYmFzZWNvbmZpZy5yb2xlLmNzc1wiXHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yb2xlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJUm9sZVNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvcm9sZS5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQge1JvbGVQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9Sb2xlUGFyYW1zXCI7XHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IFJvbGUgZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1JvbGVcIjtcclxuaW1wb3J0IHtNb2R1bGVJdGVtRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9Nb2R1bGVJdGVtRXhcIjtcclxuXHJcblxyXG5kZWNsYXJlIGxldCBhbmd1bGFyOmFueTtcclxuXHJcbmNsYXNzIEJhc2VDb25maWdSb2xlQ29udHJvbGxlciB7XHJcbiAgICByb2xlTGlzdDogQXJyYXk8Um9sZT47XHJcbiAgICBmaW5kUm9sZUxpc3RQYXJhbXM6IFJvbGVQYXJhbXM7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFtcIiRzY29wZVwiLFwiJHRpbWVvdXRcIixcInJvbGVTZXJ2aWNlXCIsIFwibGF5ZXJcIiwnaTE4bkZhY3RvcnknLCckc3RhdGUnXTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnkscHJpdmF0ZSAkdGltZW91dDphbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvbGVTZXJ2aWNlOiBJUm9sZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnkscHJpdmF0ZSBpMThuRmFjdG9yeTphbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICRzdGF0ZTphbnkpIHtcclxuICAgICAgICB0aGlzLmdldFJvbGVMaXN0KHRoaXMuZmluZFJvbGVMaXN0UGFyYW1zKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT3op5LoibLliJfooajmk43kvZznm7jlhbMgIHN0YXJ0XHJcbiAgICAvL+inkuiJsuWIl+ihqOiOt+WPllxyXG4gICAgZ2V0Um9sZUxpc3QocGFyYW1zOiBSb2xlUGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5yb2xlU2VydmljZS5maW5kTGlzdEJ5UGFyYW1zKHBhcmFtcykudGhlbigocmVzcDogUmVzcG9uc2VSZXN1bHQ8QXJyYXk8Um9sZT4+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwICYmIHJlc3AuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9sZUxpc3QgPSByZXNwLmRhdGE7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBhZGRSb2xlKCkge1xyXG4gICAgICAgIHRoaXMuJHN0YXRlLmdvKCdiYXNlY29uZmlnLnJvbGUubmV3Um9sZScpXHJcbiAgICB9O1xyXG5cclxuICAgIHVwZGF0ZVJvbGUocm9sZUlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLiRzdGF0ZS5nbygnYmFzZWNvbmZpZy5yb2xlLm5ld1JvbGUnLHtyb2xlSWQ6cm9sZUlkfSlcclxuICAgIH07XHJcblxyXG4gICAgZGVsZXRlQnlJZChkYXRhOiBSb2xlKSB7XHJcbiAgICAgICAgbGV0IHRpcFN0cjogc3RyaW5nID0gIHRoaXMuaTE4bkZhY3RvcnkoJ0ZEU18wMV8wNF8xOScse3ZhbHVlOiBkYXRhLk5hbWV9KTtcclxuICAgICAgICB0aGlzLmxheWVyLmNvbmZpcm0odGlwU3RyLCB7XHJcbiAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KFwiRkRTXzAwXzA1XzA0XCIpLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCI1MDBweFwiLCBcIjIwMHB4XCJdXHJcbiAgICAgICAgfSwgKGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3VibWl0RGVsZXRlKGRhdGEuSUQpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIHN1Ym1pdERlbGV0ZShpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yb2xlU2VydmljZS5kZWxldGVCeUlkKGlkKS50aGVuKChyZXNwOiBSZXNwb25zZVJlc3VsdDxzdHJpbmc+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJvbGVMaXN0KHRoaXMuZmluZFJvbGVMaXN0UGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxufVxyXG5hcHAuY29udHJvbGxlcihcImJhc2VDb25maWdSb2xlQ29udHJvbGxlclwiLCBCYXNlQ29uZmlnUm9sZUNvbnRyb2xsZXIpO1xyXG4iXX0=
