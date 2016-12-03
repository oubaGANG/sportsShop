/*购物车组件*/
angular.module('cart',[])
    //创建工厂函数，从一个服务对象并用于整个应用开始，工厂函数只需调用一次
    //适用于创建对象方法
    .factory('cart',function () {
        var cartData=[];//用于存放购物车里面的商品

        return {
            //增加商品到购物车，如果已经有了，则只增加当前商品数量
            addProduct:function (id,name,price) {
                var hsaProduct=false//用于判断是否购物车已有相同商品
                for(var i=0;i<cartData.length;i++){
                    if(cartData[i].id==id){//存在
                        cartData[i].count++;
                        hsaProduct=true;
                        break
                    }
                }
                if(!hsaProduct){//不存在
                    cartData.push({
                        count:1,id:id,price:price,name:name
                    });
                }
            },
            //删除商品
            removeProduct:function (id) {
                for(var i=0;i<cartData.length;i++){
                    if(cartData[i].id==id){
                        //splice第一个参数是起始位置，第二个是删除个数，第3个以后：新追加的元素，加入到
                        //splice(i,1)从第i个位置，删除一个。返回操作过的数组
                        cartData.splice(i,1)
                        break
                    }
                }
            },
            //外界得到购物车对象
            getProducts:function () {
                return cartData
            }
        }
    })

//创建指令,同时绑定了上面创建的工厂服务
    .directive('cartSummary',function (cart) {
        return{
            restrict:'E',//该指令只作用于元素
            templateUrl:'components/cart/cartSummary.html',//指定被插入指令元素的局部视图
            controller:function ($scope) {//指定向局部视图提供元素和行为的控制器
                var cartData=cart.getProducts();
                //得到购物车购买的数量
                $scope.itemCount=function () {
                    var total=0
                    for(var i=0;i<cartData.length;i++){
                        total+=cartData[i].count
                    }
                    return total
                }
                //得到总价
                $scope.total=function () {
                    var total=0
                    for(var i=0;i<cartData.length;i++){
                        total+=(cartData[i].count*cartData[i].price)
                    }
                    return total
                }
            }
        }
    })
















































