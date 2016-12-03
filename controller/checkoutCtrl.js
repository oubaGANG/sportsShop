angular.module('sportsStore')
    .controller('cartSummaryController',function ($scope,cart) {
        $scope.cartData=cart.getProducts();
        //订单总价
        $scope.total=function () {
            var total=0
            for(var i=0;i<$scope.cartData.length;i++){
                total+=($scope.cartData[i].count*$scope.cartData[i].price)
            }
            return total
        }
        //从订单中删除商品
        $scope.remove=function (id) {
            cart.removeProduct(id)
        }
    })
