var C=Object.defineProperty;var S=(t,e,r)=>e in t?C(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var l=(t,e,r)=>(S(t,typeof e!="symbol"?e+"":e,r),r);class E extends Error{constructor(r,s,o){super(o);l(this,"url");l(this,"status");l(this,"statusText");l(this,"body");l(this,"request");this.name="ApiError",this.url=s.url,this.status=s.status,this.statusText=s.statusText,this.body=s.body,this.request=r}}class j extends Error{constructor(e){super(e),this.name="CancelError"}get isCancelled(){return!0}}var x;class A{constructor(e){l(this,x);l(this,"_isResolved");l(this,"_isRejected");l(this,"_isCancelled");l(this,"_cancelHandlers");l(this,"_promise");l(this,"_resolve");l(this,"_reject");this._isResolved=!1,this._isRejected=!1,this._isCancelled=!1,this._cancelHandlers=[],this._promise=new Promise((r,s)=>{this._resolve=r,this._reject=s;const o=n=>{var u;this._isResolved||this._isRejected||this._isCancelled||(this._isResolved=!0,(u=this._resolve)==null||u.call(this,n))},a=n=>{var u;this._isResolved||this._isRejected||this._isCancelled||(this._isRejected=!0,(u=this._reject)==null||u.call(this,n))},i=n=>{this._isResolved||this._isRejected||this._isCancelled||this._cancelHandlers.push(n)};return Object.defineProperty(i,"isResolved",{get:()=>this._isResolved}),Object.defineProperty(i,"isRejected",{get:()=>this._isRejected}),Object.defineProperty(i,"isCancelled",{get:()=>this._isCancelled}),e(o,a,i)})}then(e,r){return this._promise.then(e,r)}catch(e){return this._promise.catch(e)}finally(e){return this._promise.finally(e)}cancel(){var e;if(!(this._isResolved||this._isRejected||this._isCancelled)){if(this._isCancelled=!0,this._cancelHandlers.length)try{for(const r of this._cancelHandlers)r()}catch(r){console.warn("Cancellation threw an error",r);return}this._cancelHandlers.length=0,(e=this._reject)==null||e.call(this,new j("Request aborted"))}}get isCancelled(){return this._isCancelled}}x=Symbol.toStringTag;const d={BASE:"",VERSION:"0.1.0",WITH_CREDENTIALS:!1,CREDENTIALS:"include",TOKEN:void 0,USERNAME:void 0,PASSWORD:void 0,HEADERS:void 0,ENCODE_PATH:void 0},f=t=>t!=null,_=t=>typeof t=="string",p=t=>_(t)&&t!=="",m=t=>typeof t=="object"&&typeof t.type=="string"&&typeof t.stream=="function"&&typeof t.arrayBuffer=="function"&&typeof t.constructor=="function"&&typeof t.constructor.name=="string"&&/^(Blob|File)$/.test(t.constructor.name)&&/^(Blob|File)$/.test(t[Symbol.toStringTag]),R=t=>t instanceof FormData,g=t=>{try{return btoa(t)}catch{return Buffer.from(t).toString("base64")}},P=t=>{const e=[],r=(o,a)=>{e.push(`${encodeURIComponent(o)}=${encodeURIComponent(String(a))}`)},s=(o,a)=>{f(a)&&(Array.isArray(a)?a.forEach(i=>{s(o,i)}):typeof a=="object"?Object.entries(a).forEach(([i,n])=>{s(`${o}[${i}]`,n)}):r(o,a))};return Object.entries(t).forEach(([o,a])=>{s(o,a)}),e.length>0?`?${e.join("&")}`:""},O=(t,e)=>{const r=t.ENCODE_PATH||encodeURI,s=e.url.replace("{api-version}",t.VERSION).replace(/{(.*?)}/g,(a,i)=>{var n;return(n=e.path)!=null&&n.hasOwnProperty(i)?r(String(e.path[i])):a}),o=`${t.BASE}${s}`;return e.query?`${o}${P(e.query)}`:o},q=t=>{if(t.formData){const e=new FormData,r=(s,o)=>{_(o)||m(o)?e.append(s,o):e.append(s,JSON.stringify(o))};return Object.entries(t.formData).filter(([s,o])=>f(o)).forEach(([s,o])=>{Array.isArray(o)?o.forEach(a=>r(s,a)):r(s,o)}),e}},w=async(t,e)=>typeof e=="function"?e(t):e,N=async(t,e)=>{const r=await w(e,t.TOKEN),s=await w(e,t.USERNAME),o=await w(e,t.PASSWORD),a=await w(e,t.HEADERS),i=Object.entries({Accept:"application/json",...a,...e.headers}).filter(([n,u])=>f(u)).reduce((n,[u,h])=>({...n,[u]:String(h)}),{});if(p(r)&&(i.Authorization=`Bearer ${r}`),p(s)&&p(o)){const n=g(`${s}:${o}`);i.Authorization=`Basic ${n}`}return e.body&&(e.mediaType?i["Content-Type"]=e.mediaType:m(e.body)?i["Content-Type"]=e.body.type||"application/octet-stream":_(e.body)?i["Content-Type"]="text/plain":R(e.body)||(i["Content-Type"]="application/json")),new Headers(i)},V=t=>{var e;if(t.body)return(e=t.mediaType)!=null&&e.includes("/json")?JSON.stringify(t.body):_(t.body)||m(t.body)||R(t.body)?t.body:JSON.stringify(t.body)},D=async(t,e,r,s,o,a,i)=>{const n=new AbortController,u={headers:a,body:s!=null?s:o,method:e.method,signal:n.signal};return t.WITH_CREDENTIALS&&(u.credentials=t.CREDENTIALS),i(()=>n.abort()),await fetch(r,u)},v=(t,e)=>{if(e){const r=t.headers.get(e);if(_(r))return r}},G=async t=>{if(t.status!==204)try{const e=t.headers.get("Content-Type");if(e)return e.toLowerCase().startsWith("application/json")?await t.json():await t.text()}catch(e){console.error(e)}},H=(t,e)=>{const s={400:"Bad Request",401:"Unauthorized",403:"Forbidden",404:"Not Found",500:"Internal Server Error",502:"Bad Gateway",503:"Service Unavailable",...t.errors}[e.status];if(s)throw new E(t,e,s);if(!e.ok)throw new E(t,e,"Generic Error")},c=(t,e)=>new A(async(r,s,o)=>{try{const a=O(t,e),i=q(e),n=V(e),u=await N(t,e);if(!o.isCancelled){const h=await D(t,e,a,n,i,u,o),b=await G(h),y=v(h,e.responseHeader),T={url:a,ok:h.ok,status:h.status,statusText:h.statusText,body:y!=null?y:b};H(e,T),r(T.body)}}catch(a){s(a)}});class ${static authGetUsersMe(){return c(d,{method:"GET",url:"/auth/me",errors:{401:"Authentication Error"}})}static authLogin(e){return c(d,{method:"POST",url:"/auth/login",formData:e,mediaType:"application/x-www-form-urlencoded",errors:{400:"Incorrect Username or Password",422:"Validation Error"}})}static authRegister(e){return c(d,{method:"POST",url:"/auth/register",body:e,mediaType:"application/json",errors:{400:"The Username Already Exists",422:"Validation Error"}})}static authUpdate(e){return c(d,{method:"PATCH",url:"/auth/update",body:e,mediaType:"application/json",errors:{400:"No Valid Data to Update",401:"Authentication Error",422:"Validation Error"}})}}class B{static pseudoTweetsGetPseudoOverview(e=!1,r,s){return c(d,{method:"GET",url:"/pseudo_tweets/overview",query:{all:e,start_date:r,end_date:s},errors:{422:"Validation Error"}})}static pseudoTweetsGetCount(e=!1,r,s){return c(d,{method:"GET",url:"/pseudo_tweets/count",query:{all:e,start_date:r,end_date:s},errors:{422:"Validation Error"}})}static pseudoTweetsReadPseudoTweets(e,r=10,s,o){return c(d,{method:"GET",url:"/pseudo_tweets/",query:{offset:e,limit:r,start_date:s,end_date:o},errors:{422:"Validation Error"}})}static pseudoTweetsReadPseudoTweet(e){return c(d,{method:"GET",url:"/pseudo_tweets/{pseudo_tweet_id}",path:{pseudo_tweet_id:e},errors:{404:"PseudoTweet Not found",422:"Validation Error"}})}static pseudoTweetsDeletePseudoTweet(e){return c(d,{method:"DELETE",url:"/pseudo_tweets/{pseudo_tweet_id}",path:{pseudo_tweet_id:e},errors:{404:"PseudoTweet Not found",422:"Validation Error"}})}static pseudoTweetsVerifyPseudoTweet(e,r){return c(d,{method:"PATCH",url:"/pseudo_tweets/{pseudo_tweet_id}",path:{pseudo_tweet_id:e},body:r,mediaType:"application/json",errors:{404:"PseudoTweet Not found",422:"Validation Error"}})}static pseudoTweetsRequestPseudoTweetEdit(e,r){return c(d,{method:"POST",url:"/pseudo_tweets/edit_request/{pseudo_tweet_id}",path:{pseudo_tweet_id:e},body:r,mediaType:"application/json",errors:{422:"Validation Error"}})}}class I{static tweetsGetTweetOverview(e,r){return c(d,{method:"GET",url:"/tweets/overview",query:{start_date:e,end_date:r},errors:{422:"Validation Error"}})}static tweetsGetCount(e,r){return c(d,{method:"GET",url:"/tweets/count",query:{start_date:e,end_date:r},errors:{422:"Validation Error"}})}static tweetsReadTweets(e,r=10,s,o){return c(d,{method:"GET",url:"/tweets/",query:{offset:e,limit:r,start_date:s,end_date:o},errors:{422:"Validation Error"}})}static tweetsReadTweet(e){return c(d,{method:"GET",url:"/tweets/{tweet_id}",path:{tweet_id:e},errors:{404:"Tweet Not found",422:"Validation Error"}})}static tweetsUpdateTweet(e,r){return c(d,{method:"PATCH",url:"/tweets/{tweet_id}",path:{tweet_id:e},body:r,mediaType:"application/json",errors:{400:"No Valid Data to Update",404:"Tweet Not found",422:"Validation Error"}})}static tweetsRequestTweetEdit(e,r){return c(d,{method:"POST",url:"/tweets/edit_request/{tweet_id}",path:{tweet_id:e},body:r,mediaType:"application/json",errors:{422:"Validation Error"}})}}class F{static tweetsCommonsGetWordCloud(e,r){return c(d,{method:"GET",url:"/tweets_commons/",query:{start_date:e,end_date:r},errors:{422:"Validation Error"}})}static tweetsCommonsGetPrediction(e){return c(d,{method:"GET",url:"/tweets_commons/predict",query:{text:e},errors:{422:"Validation Error",503:"Could not connect to model."}})}static tweetsCommonsScrapeYoutube(e,r=2,s=2){return c(d,{method:"GET",url:"/tweets_commons/scrape_youtube",query:{video_query:e,max_video_results:r,max_comment_results:s},errors:{422:"Validation Error"}})}}export{$ as A,j as C,d as O,B as P,F as T,I as a};