DBSCAN
===  
example1             |  example2
:-------------------------:|:-------------------------:
![](https://github.com/yja938882/DBSCAN/blob/master/example/example1.png)  |  ![](https://github.com/yja938882/DBSCAN/blob/master/example/example2.png)



Load
=== 
> ```javascript
> <script type="text/javascript" src="/* path */dbscan.js"></script>
  
DataFormat
=== 
> ```javascript
> var Data = [
>  [0.5, 0.7],
>  [3.6, 0.11],
>  ...
> ];
>```

 
Docs
===
#### &nbsp;&nbsp;Constructor  

</br>

* **DBSCAN(args)**   

> ```javascript
> var dbscan = DBSCAN( { eps : 3, minpts : 5, data : [[0.5], [0.6], ... ] });
> ```
> * ```args``` Object 
>    *  ```eps``` Number : Epsilon.
>    *  ```minpts``` Number : Minimum number of points required to form a dense region.
>    *  ```data``` Array : Array of data points.  

</br></br>

#### &nbsp;&nbsp; Methods 

</br>

* **clustering(dist, callback)**

> ```javascript
> /* Clustring. */
> dbscan.clustering(dbscan.euclidean, render);
> ```
> * ```dist``` Function : Distance function.
> * ```callback``` Function : Function that is called after Clustering.

</br></br>

* **euclidean(pointA, pointB)** 

> ```javascript
> /* Euclidean distance function. */
> var dist = dbscan.euclidean(pointA, pointB);
> ```
> * ```pointA``` Array\<Number\> : point.
> * ```pointB``` Array\<Number\> : point.

</br></br>

* **manhattan(pointA, pointB)** 

> ```javascript
> /* Manhattan distance function. */
> var dist = dbscan.manhattan( pointA, pointB);
> ```
> * ```pointA``` Array\<Number\> : point.
> * ```pointB``` Array\<Number\> : point.
