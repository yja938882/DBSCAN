'use strict';

(function(root){

    function nSet(){
        this.bucket = {};
        this.cnt = 0;
    }
    nSet.prototype.add = function(key) {
        if(this.bucket.hasOwnProperty(key)) return;

        this.cnt++;
        this.bucket[key] = 1;
    }
    nSet.prototype.has = function(key) {
        return this.bucket.hasOwnProperty(key);
    }
    nSet.prototype.size = function() {
        return this.cnt;
    }

    var eps,
        minpts,
        data,
        cluster_cnt = 0;

    function DBSCAN(args) {
        eps = args.eps;
        minpts = args.minpts;
        data = args.data;
        init();
    }

    function init() {
        data.sort( function(a, b) {
            return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0; 
        });
        for(var i = 0, len = data.length; i < len; i++){
            data[i].cluster = -2;
        }
    }

    function getNeighbors(id, distfunc) {
        var ret = [];
        for(var i = 0, len = data.length; i < len; i++){
            if(i === id) continue;
            if(distfunc( data[i], data[id]) <= eps){
                ret.push(i);
            }
        }
        return ret;
    }

    DBSCAN.prototype.clustering = function(distfunc, callback) {
        for(var i = 0, len = data.length; i < len; i++){
            if(data[i].cluster != -2 ) continue;

            var neigbors = getNeighbors(i, distfunc);

            if(neigbors.length < minpts){
                data[i].cluster = -1;
                continue;
            }

            data[i].cluster = (cluster_cnt);

            var nS = new nSet();
       
            for(var i = 0, _len = neigbors.length; i < _len; i++){
                nS.add(neigbors[i]);
            }

            for(var i = 0; i < neigbors.length; i++){
                if(data[neigbors[i]].cluster == -1){
                    data[neigbors[i]].cluster = cluster_cnt;
                }

                if(data[neigbors[i]].cluster != -2) continue;

                data[neigbors[i]].cluster = cluster_cnt;

                var _neighbors = getNeighbors(neigbors[i], distfunc);
                if(_neighbors.length >= minpts){
                    for(var j = 0, _len = _neighbors.length; j < _len; j++){
                        if(nS.has(_neighbors[j])) continue;
                        nS.add(_neighbors[j]);
                        neigbors.push(_neighbors[j]);
                    }
                }
            }
            cluster_cnt++;
        }
        if(typeof callback == "function")
            callback(data);
    }

        /**
     * Euclidean distance
     * @param {Array<number>} a
     * @param {Array<number>} b 
     * @returns 포인트 a, b 간의 Euclidean distance.
     */
    DBSCAN.prototype.euclidean = function(a, b) {
        var d = [],
            ret = 0;
        for(var i = 0, len = a.length; i < len; i++){
            d[i] = (a[i] - b[i]);
        }
        for(var i = 0, len = a.length; i < len; i++){
            ret += (d[i] * d[i]);
        }
        return Math.sqrt(ret);
    }

    /**
     * Manhattan distance
     * @param {Array<number>} a
     * @param {Array<number>} b
     * @returns 포인트 a, b 간의 Manhattan distance.
     */
    DBSCAN.prototype.manhattan = function(a, b) {
        var d = [],
            ret = 0;
        for(var i = 0, len = a.length; i < len; i++){
            d[i] = (a[i] - b[i]);
        }
        for(var i = 0, len = a.length; i < len; i++){
            ret += (d[i]);
        }
        return ret;
    }

    if (typeof exports !== 'undefined') {
    	if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = DBSCAN;
        }
        exports.DBSCAN = DBSCAN;
    } else if (typeof define === 'function' && define.amd) {
    	define([], function() {
            return DBSCAN;
        });
    } else {
        root.DBSCAN = DBSCAN;
    }

 })(this);
	