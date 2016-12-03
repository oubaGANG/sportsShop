angular.module('customFilters',[])
    .filter('unique',function () {
        //返回给定数组中不重复的数据（也就是去掉重复）
        return function (data,propertyName) {
            if(angular.isArray(data)&&angular.isString(propertyName)){
                var results=[]//用于存储结果值
                var keys={}//把数据的propertyName对应的值，当做属性放入对象中
                for(var i=0;i<data.length;i++){
                    var val=data[i][propertyName]//获取每个数据的propertyName对应的值
                   
                    if(angular.isUndefined(keys[val])){
                        //若没有，则保存
                        keys[val]=true//随便设置个值，保证下次在遇到同样的，不是undifined（也就进不来了）
                   results.push(val)//把val保存到数组中
                    }
                }
                return results
            }else{
                return data
            }
        }
    })
    //显示用户选中那一页的商品
    .filter('range',function ($filter) {
        return function (data,page,size) {
            if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
                var start_index=(page-1)*size
            /*    $filter(“limitTo”)(input,limit,begin);  这个地方用到了前俩（没有begin）
                input：限制的数组，字符串，数字。
            limit：限制的长度。
            begin：限制长度开始的位置（根据索引）。*/
                return $filter('limitTo')(data.splice(start_index),size)

               /* if(data.length<start_index){
                      return []
                }else{
                    return $filter('limitTo')(data.splice(start_index),size)
                }*/
            }else{
                return data;
            }
        }
    })
//得到用户选中类别的商品 的总页数
.filter('pageCount',function () {
    return function (data,size) {
        if(angular.isArray(data)){
            var result=[];
            for(var i=0;i<Math.ceil(data.length/size);i++){
                result.push(i)
            }
            return result
        }else{
            return data
        }
    }
})