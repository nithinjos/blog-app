
angular.module('flapperNews')
.factory('posts',
         ['$http', 
          function($http){
                var o = {
                posts:[]
                };
                
                o.getAll = function(){
                    return $http.get('/posts.json').then(function(response){
                        angular.copy(response.data, o.posts);
                    });
                };

                o.create = function(post){
                    return $http.post('/posts.json', post).then(function(response){
                        o.posts.push(response.data);
                    });
                };

                o.upvote = function(post){
                    return $http.put('/posts/' + post.id + '/upvote.json').then(function(data){
                        post.upvotes += 1;
                    });
                };

                o.get = function(id){
                    return $http.get('/posts/' + id + '.json').then(function(res){
                        return res.data ;
                    });
                };

                o.addComment = function(post, comment){
                    return $http.post('/posts/' + post.id + '/comments.json', comment)
                    .then(function(response){
                        post.comments.push(response.data);
                    });
                };

                o.upvoteComment = function(post, comment) {
                    return $http.put('/posts/' + post.id + '/comments/'+ comment.id + '/upvote.json')
                        .then(function(data){
                            comment.upvotes += 1;
                        });
                };
    return o;
}])