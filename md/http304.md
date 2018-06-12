# 网络---HTTP304状态码

> Http304中有两个比较重要的请求头字段: If-Modefied-Since和If-None-Match,这两个字端表示发送一个请求字端

- The HTTP 304 Not Modified client redirection response code indicates that there is no need to retransmit the requested resources. It is an implicit redirection to a cached resource. This happens when the request method is safe, like a GET or a HEAD request, or when the request is conditional and uses a If-None-Match or a If-Modified-Since header.

- The equivalent 200 OK response would have included the headers Cache-Control, Content-Location, Date, ETag, Expires, and Vary.


1. 当客户端缓存了目标资源但是不确定该资源是否是最新版本的时候，就会发送一个请求，这样就可以辨别出一个请求是否是条件请求，在进行请求的时候，客户端会提供给服务器一个If-Modified-Since的请求头，其值为服务器上次返回的Last-Modified响应头中的Date日期值，还会提供一个If-None-Match请求头，其值为服务器上次返回的Etag响应头的值。

2. 服务器会读取到这两个请求头中的值，判断出客户端缓存的资源是否为最新的，如果是最新的话，服务器就会返回HTTP/304 Not Modified响应头，但没有响应体。客户端收到304响应后，就会从本地缓存中读取对应的资源。

3. 另外一个情况，如果服务器认为客户端混存的资源已经过期了，那么服务器就会返回HTTP/200 OK的响应，响应体就是该资源当前最新的内容。客户端收到200响应后，就会用新的响应体覆盖掉旧的缓存资源。

4. 只有在客户端缓存了对应资源且该资源的响应头中包含了Last-Modified或Etag的情况下，才可能发送条件请求。如果这两个头都不存在，则为无条件请求该资源，服务器必须返回完整的数据。(可以在浏览器调试里面设置Disable cache设置取消缓存)