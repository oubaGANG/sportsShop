angular.module('sportsStore')
    //ajax访问的数据地址
    .constant('dataUrl','http://localhost:5500/products')
    //向订货详情发送请求
    .constant('orderUrl','http://localhost:5500/orders')
    .controller('sportsStoreCtrl',function ($scope,$http,$location,dataUrl,orderUrl,cart) {
        $scope.data = {
           /* products: [
            { name: "Product #1", description: "A product",
                category: "Category #1", price: 100 },
            { name: "Product #2", description: "A product",
                category: "Category #1", price: 110 },
            { name: "Product #3", description: "A product",
                category: "Category #2", price: 210 },
            { name: "Product #4", description: "A product",
                category: "Category #3", price: 202 }]*/
    };
        //从服务器得到商品数据
        $http.get(dataUrl)
            .success(function (data) {
                $scope.data.products= data
            })
            .error(function (error) {
                $scope.data.error
            })
        //向服务器发送数据,添加订单
        $scope.sendOrder=function (shippingDetails) {
            var order=angular.copy(shippingDetails)
            order.products=cart.getProducts()
            $http.post(orderUrl,order)
                .success(function (data) {

                    $scope.data.orderId=data.id
                    //成功进入服务器，把购物车清空
                    cart.getProducts().length=0

                })
                .error(function (error) {

                    $scope.data.orderError=error

                }).finally(function () {
                $location.path('/complete')
            })
        }
    })
