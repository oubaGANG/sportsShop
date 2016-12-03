angular.module("sportsStore")
    //声明一个常量，用于高亮用户选择的类别
    //用常量改变这个类，无论用于哪里都可以生效
    .constant('proListActive','btn-primary')
    //每页显示个数
    .constant('proListCount',3)
    .controller('productListCtrl',function ($scope,$filter,proListActive,proListCount,cart) {
        
        var selectedCategory=null;
        $scope.selectedPage=1//当前选中页
        $scope.pageSize=proListCount//每页显示个数
        //得到用户选择的类别
        $scope.selectCategory=function (newCategory) {
            selectedCategory=newCategory
            $scope.selectedPage=1
        }
        //返回用户选择类别对应的商品列表
        $scope.categoryFilterFn=function (product) {
            return selectedCategory==null||
                product.category==selectedCategory
        }
        //高亮用户选择的类别
        $scope.getCategoryClass=function (category) {
            return selectedCategory==category ? proListActive:''
        }
        //得到当前选中的页码
        $scope.selectPage=function (newPage) {
            $scope.selectedPage=newPage
        }
        //高亮用户选择的页码
        $scope.getPageClass=function (page) {
            return $scope.selectedPage==page ? proListActive:''
        }
        //增加商品到购物车
        $scope.addProduct=function (product) {
            cart.addProduct(product.id,product.name,product.price);
        }
    })
