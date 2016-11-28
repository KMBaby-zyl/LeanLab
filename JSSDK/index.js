/*
 * RIDER  let u coding fly
 * */

;(function(){

let API_URL = 'http://127.0.0.1:3000/api';
let APPID = '';
let APPKEY = ''; 

let RIDER = {
    init: function(options){
        APPID = options.appId;
        APPKEY = options.appKey;
    },

    Object: {
        extend: _Object
    },

    Query: _Query
}

function _Query(collection){
    this.collection = collection;

    this.find = function(options){
        return query(this.collection, options);
    }
}

function _Object(name){
    let collection = name;

    return function(){
        let self = this;
        this.content = {}; 

        this.save = function(options){
            this.content = Object.assign({}, this.content, options);

            if(this.content._id){
                update(collection, self.content);
            }else{
                insert(collection, self.content);
            }
        };
    }
}


function insert(collection, content){
    return $.ajax({
        url: API_URL + '/insert',
        type: "post", 
        data: {
            appId: APPID,
            appKey: APPKEY,
            collection: collection,
            document: content 
        },
        success: function(json){
        }
    });
}

function update(collection, content){
    return $.ajax({
        url: API_URL + '/update',
        type: "post",
        data: {
            appId: APPID,
            appKey: APPKEY,
            collection: collection,
            document: content 
        },
        success: function(json){
        }
    });
}

function query(collection, options){
    return $.ajax({
        url: API_URL + '/query',
        type: "get",
        data: {
            appId: APPID,
            appKey: APPKEY,
            collection: collection,
            options: options 
        }
    });
}

window.Rider = RIDER;

})();
