var app = angular.module('flapperNews', ['ui.router']);
app.controller('MainCtrl',[ 
    '$scope',
    'posts', 
    
    function($scope,posts){
        
        $scope.posts = posts.posts;
        $scope.addPost = function(){
                if (!$scope.title || $scope.title === '') {return;}
                $scope.posts.push({title:$scope.title,
                                    link:$scope.link,
                                    upvotes:0,
                                    comments:[
                                        {author: 'Joe' , body: 'Cool Post!' , upvotes: 0},
                                        {author: 'Bob' , body: 'Good Idea but everything is wrong' , upvotes: 0 }
                                    ]
                                });
                
                $scope.title='';
                $scope.link='';
            };
        $scope.incrementUpvotes = function(post){
            post.upvotes += 1;
        }
    }

    
]);

app.controller('PostsCtrl', [
    '$scope',
    '$stateParams',
    'posts',

    function($scope, $stateParams, posts){
        $scope.post = posts.posts[$stateParams.id];
        $scope.addComment = function(){
            if($scope.body === '') { return; }
            $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0
            });
        $scope.body = '';
        };
        $scope.incrementUpvotes = function(post){
            post.upvotes += 1;
        };

    }

]);

app.factory('posts',[function(){
    var o = {
        posts:[
            {title:'post 0', upvotes: 5, link:"", comments:[]},
            {title:'post 1', upvotes:12, link:"", comments:[]},
            {title:'post 2', upvotes:8, link:"", comments:[]},
            
            ]
    };
    return o;
}])

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider,$urlRouterProvider){
    
    $stateProvider
        
        .state('home', {
            url:'/home',
            templateUrl:'/home.html',
            controller:'MainCtrl'    
        });

    $stateProvider    
        .state('posts', {
            url:'/posts/{id}',
            templateUrl:'/posts.html',
            controller:'PostsCtrl'
        });


    $urlRouterProvider.otherwise('home');
}
])

