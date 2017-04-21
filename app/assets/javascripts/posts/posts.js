
angular.module('flapperNews')
.factory('posts',[function(){
    var o = {
        posts:[
            {title:'post 0', upvotes: 5, link:"", comments:[]},
            {title:'post 1', upvotes:12, link:"", comments:[]},
            {title:'post 2', upvotes:8, link:"", comments:[]},
            
            ]
    };
    return o;
}])