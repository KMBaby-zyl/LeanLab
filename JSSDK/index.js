/*
 * RIDER  let u coding fly
 * */

;(function(){

let API_URL = 'http://127.0.0.1:3000/api';
let APPID = '';
let APPKEY = ''; 

let RIDER = {
    init: function(options){
        let self = this;
        APPID = options.appId;
        APPKEY = options.appKey;

        //let res = login();
        //res.done(function(){
            //getCollections.call(self)
        //});

        $.ajaxSetup({
            headers: {
                "RIDER-APPID": APPID,
                "RIDER-APPKEY": APPKEY
            }
        });

    },

    Object: {
        extend: _Object
    },

    Query: _Query
}

//function login(){
   //return $.ajax({
        //url: API_URL + '/checkApp',
        //type: "post", 
        //data: {
            //appId: APPID,
            //appKey: APPKEY,
        //},
        //success: function(json){
        //}
   //});
//}

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

//function getCollections(){
   //$.ajax({
        //url: API_URL + '/collections',
        //type: "get", 
        //data: {
            //appId: APPID,
            //appKey: APPKEY,
            //collection: collection,
            //document: content 
        //},
        //success: function(json){
        //}
   //});
//}


function insert(collection, content){
    return $.ajax({
        url: API_URL + '/document',
        type: "post", 
        data: {
            collection: collection,
            body: content 
        },
        success: function(json){
        }
    });
}

function update(collection, content){
    return $.ajax({
        url: API_URL + '/document',
        type: "put",
        data: {
            collection: collection,
            body: content 
        },
        success: function(json){
        }
    });
}

function query(collection, options){
    return $.ajax({
        url: API_URL + '/document',
        type: "get",
        data: {
            collection: collection,
            options: options 
        }
    });
}

window.Rider = RIDER;

})();
