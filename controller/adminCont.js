angular.module('sportsStoreAdmin')
.constant('authUrl','http://localhost:5500/users')
    .constant('ordersUrl','http://localhost:5500/orders')
    //登录控制器
.controller('authCtrl',function ($scope,$http,$location,authUrl) {
    $scope.authenticate=function (user,pass) {
        $http.post(authUrl,{
            username:user,
            password:pass
        },{
            withCredentials:true//启动跨域请求，允许ajax请求使用cookie验证处理
        }).success(function (data) {
            $location.path('/main')
        }).error(function (error) {
            $scope.authenticationError=error
        })
    }
})
    
//选择视图控制器,管理员管理商品he定单
    .controller('mainCtrl',function ($scope) {
        $scope.screens=['商品','订单']//视图数组
        $scope.current=$scope.screens[0]//当前视图
        
        //动态改变当前视图
        $scope.setScreen=function (index) {
            $scope.current=$scope.screens[index]
        }
        //得到当前视图
        $scope.getScreen=function () {
            return $scope.current=='商品'?
                'views/adminProducts.html':'views/adminOrders.html'
        }
    })
//订单控制器
    .controller('ordersCtrl',function ($scope,$http,ordersUrl) {
        //从服务器得到订单数据
        $http.get(ordersUrl)
            .success(function (data) {
                $scope.orders=data
            })
            .error(function (error) {
                $scope.error=error
            })
        $scope.selectedOrder;
        //管理员选择的订单
        $scope.selectOrder=function (order) {
            $scope.selectedOrder=order
        }
        //某个订单总价
        $scope.calcTotal=function (order) {
            var total=0;
            for(var i=0;i<order.products.length;i++){
                total+=order.products[i].count*order.products[i].price
            }
            return total
        }
    })











