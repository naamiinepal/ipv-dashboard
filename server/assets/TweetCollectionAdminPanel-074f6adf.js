import{o as f,j as a,O as S,t as _,M as k,$ as M,a0 as H,S as j,U as q,a1 as R,a2 as T,V as F,a3 as G,v as U,a4 as B,a5 as L,a6 as W}from"./mui_material-d6a2ca06.js";import{r as u}from"./react-fc2298a4.js";import{r as x,O as b,C as z,A as K,t as D,l as $,n as J,P as E,u as Q,a as A,b as X,c as Y,s as Z}from"./index-22143701.js";import"./react_router-b929a5cd.js";import"./chart_js-00feeec8.js";import"./chart_js_extras-61871ffc.js";import"./moment-fbc5633a.js";import"./mui_extras-3914081e.js";import"./word_cloud-3e26f9b7.js";class I{static tweetsGetTweetOverview(s,e){return x(b,{method:"GET",url:"/tweets/overview",query:{start_date:s,end_date:e},errors:{422:"Validation Error"}})}static tweetsGetCount(s,e,r=!1){return x(b,{method:"GET",url:"/tweets/count",query:{start_date:s,end_date:e,get_phrase_count:r},errors:{422:"Validation Error"}})}static tweetsReadTweets(s,e,r,n,o=10,l,h){return x(b,{method:"GET",url:"/tweets/",query:{is_abuse:s,sources:e,aspects:r,offset:n,limit:o,start_date:l,end_date:h},errors:{422:"Validation Error"}})}static tweetsReadTweet(s){return x(b,{method:"GET",url:"/tweets/{tweet_id}",path:{tweet_id:s},errors:{404:"Tweet Not found",422:"Validation Error"}})}static tweetsUpdateTweet(s,e){return x(b,{method:"PATCH",url:"/tweets/{tweet_id}",path:{tweet_id:s},body:e,mediaType:"application/json",errors:{400:"No Valid Data to Update",404:"Tweet Not found",422:"Validation Error"}})}static tweetsRequestTweetEdit(s,e){return x(b,{method:"POST",url:"/tweets/edit_request/{tweet_id}",path:{tweet_id:s},body:e,mediaType:"application/json",errors:{422:"Validation Error"}})}}const ee=({offset:t,setOffset:s,toggleReload:e,combinedProps:r})=>{const[n,o]=u.useState(t);return f("div",{className:"flex justify-between",children:[a(z,{...r,isAdmin:!0}),a(S,{label:"Offset",value:n,type:"number",onChange:({target:{value:l}})=>o(parseInt(l)),onKeyDown:({key:l})=>{l==="Enter"&&s(n)}}),a(_,{onClick:e,children:"Refuel"})]})};var y=(t=>(t[t.NewPhrase=0]="NewPhrase",t[t.ChangeStart=1]="ChangeStart",t[t.ChangeEnd=2]="ChangeEnd",t[t.ChangeAspect=3]="ChangeAspect",t[t.DeletePhrase=4]="DeletePhrase",t[t.Verify=5]="Verify",t[t.ChangeSentenceAnnotaion=6]="ChangeSentenceAnnotaion",t))(y||{});const P={start:0,startHelperText:"Start Offset (inclusive)",end:0,endHelperText:"End Offset (exclusive)",hasErrorOccurred:!1,aspect:0},N=(t,s,e)=>{const r=s>=e;let{startHelperText:n,endHelperText:o}=P;return r&&(n=o="start must be less than end"),{...t,start:s,end:e,hasErrorOccurred:r,startHelperText:n,endHelperText:o}},te=(t,s)=>{switch(s.type){case 0:return{...t,aspects_anno:[...t.aspects_anno,P]};case 1:{const{index:e,start:r}=s.payload,n=[...t.aspects_anno],o=n[e],l=N(o,r,o.end);return n[e]=l,{...t,aspects_anno:n}}case 2:{const{index:e,end:r}=s.payload,n=[...t.aspects_anno],o=n[e],l=N(o,o.start,r);return n[e]=l,{...t,aspects_anno:n}}case 3:{const{index:e,aspect:r}=s.payload,n=[...t.aspects_anno],o=n[e];return n[e]={...o,aspect:r},{...t,aspects_anno:n}}case 4:{const{index:e}=s.payload,r=[...t.aspects_anno];return r.splice(e,1),{...t,aspects_anno:r}}case 5:return{...t,isVerified:!0};case 6:return{...t,[s.payload.column]:s.payload.value};default:return t}},se=({tweetId:t,getChangedColumns:s,disabled:e})=>{const[r,n]=u.useState({display:!1,message:"",intent:"success"}),o=()=>n(h=>({...h,display:!1})),l=async()=>{try{return await I.tweetsUpdateTweet(t,s()),n({display:!0,message:"Successfully Modified",intent:"success"})}catch{return n({display:!1,message:"Modification Failed",intent:"error"})}};return f(k,{children:[a(M,{open:r.display,autoHideDuration:3e3,onClose:o,children:a(H,{onClose:o,severity:r.intent,sx:{width:"100%"},children:r.message})}),a(_,{variant:"contained",onClick:l,disabled:e,children:"Modify"})]})},ae=({index:t,end:s,start:e,hasErrorOccurred:r,dispatch:n,startHelperText:o,textLength:l,endHelperText:h,aspect:d,isDisabled:m})=>f("div",{className:"flex items-start justify-between",children:[a(S,{inputProps:{min:0,max:s-1<0?0:s-1},type:"number",value:e,error:r,onChange:({target:{value:i}})=>n({type:y.ChangeStart,payload:{index:t,start:parseInt(i)||0}}),helperText:o}),a(S,{inputProps:{min:e+1,max:l},type:"number",value:s,error:r,onChange:({target:{value:i}})=>n({type:y.ChangeEnd,payload:{index:t,end:parseInt(i)||0}}),helperText:h}),a(j,{value:d,label:"Aspect",onChange:({target:{value:i}})=>n({type:y.ChangeAspect,payload:{index:t,aspect:i}}),children:K.map(D).map((i,p)=>a(q,{value:p,children:i},p))}),a(_,{variant:"contained",color:"warning",onClick:()=>n({type:y.DeletePhrase,payload:{index:t}}),disabled:m,sx:{marginTop:"0.5rem"},children:"Delete Annotation"})]}),ne=t=>{const{aspects_anno:s,...e}=t,{dispatch:r,isDisabled:n}=e;return f("div",{className:"items-start mt-0.5",children:[a("div",{className:"flex flex-col",children:s.map((o,l)=>u.createElement(ae,{...e,...o,index:l,key:l}))}),a(_,{variant:"contained",color:"secondary",onClick:()=>r({type:y.NewPhrase}),disabled:n,children:"Add New Phrase Annotation"})]})},O=([t,s,e],[r,n,o])=>t-r||s-n||e-o,re=({row:t,action:s})=>{var m;const[e,r]=u.useReducer(te,{...t,isVerified:!1,aspects_anno:((m=t.aspects_anno)==null?void 0:m.map(([i,p,c])=>({...P,start:i,end:p,aspect:c})))||[]}),n=(i,p)=>r({type:y.ChangeSentenceAnnotaion,payload:{value:i,column:p}}),o=()=>{const i={};t.is_abuse!==e.is_abuse&&(i.is_abuse=e.is_abuse),t.sexual_score!==e.sexual_score&&(i.sexual_score=e.sexual_score);const p=e.aspects_anno.map(({start:g,end:v,aspect:V})=>[g,v,V]).sort(O),c=[...t.aspects_anno||[]].sort(O);return J(p,c)||(i.aspects_anno=p),i},l=u.useMemo(()=>e.aspects_anno.every(({hasErrorOccurred:i})=>!i),[e.aspects_anno]),h=u.useMemo(()=>e.aspects_anno.map(({start:i,end:p})=>({startIndex:i,numChars:p-i})),[e.aspects_anno]),d=()=>{l?E.pseudoTweetsVerifyPseudoTweet(e.id,o()).then(()=>r({type:y.Verify})):console.error("Error in phrase annotaion")};return f(R,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[a(T,{sx:{fontSize:"1rem",paddingTop:"0px"},align:"left",children:f("div",{className:"flex flex-col",children:[a($.InteractiveHighlighter,{text:e.text,highlights:h,customClass:"highlighted"}),a(ne,{aspects_anno:e.aspects_anno,dispatch:r,isDisabled:s==="verify"&&e.isVerified,textLength:e.text.length})]})}),a(T,{align:"center",children:a(F,{checked:e.is_abuse,onChange:({target:{checked:i}})=>n(i,"is_abuse")})}),a(T,{align:"center",children:a(S,{inputProps:{min:1,max:10},type:"number",value:e.sexual_score,onChange:({target:{value:i}})=>n(parseInt(i)||1,"sexual_score"),helperText:"1-10"})}),a(T,{align:"right",children:s==="modify"?a(se,{tweetId:e.id,getChangedColumns:o,disabled:!l}):a(k,{children:e.isVerified?a(_,{color:"success",disabled:s==="verify"||!l,onClick:d,children:"Verified"}):a(_,{variant:"contained",onClick:d,disabled:!l,children:"Verify"})})})]})},me=({action:t})=>{const[s,e]=u.useState([]),[r,n]=u.useState(0),[o,l]=u.useState(!1),h=Q(),{topics:d,sources:m}=h,i=t==="verify";return u.useEffect(()=>{let c,g;if(d.length===A.length+1||d.length===0)c=void 0,g=[];else{const w=d.indexOf(-1);w<0?(c=void 0,g=d.length===A.length?[]:d):(c=!0,g=[...d.slice(0,w),...d.slice(w+1,d.length)])}const v=m.length===X.length?[]:m,C=(i?E.pseudoTweetsReadPseudoTweets:I.tweetsReadTweets)(c,v,g,r,10);return e([]),C.then(w=>e(w)).catch(w=>{w instanceof Y&&console.log("TweetCollectionAdminPanel umounted")}),()=>{C==null||C.cancel()}},[i,r,o,d,m]),f("div",{className:"w-11/12 mx-auto",children:[a("h1",{className:"my-5 text-xl font-bold text-cyan-700 text-center",children:i?"Verify Model's Predictions":"Modify Verifications"}),a(ee,{offset:r,setOffset:n,toggleReload:()=>l(!o),combinedProps:h}),s.length>0?a(G,{component:U,sx:{height:500},children:f(B,{stickyHeader:!0,sx:{minWidth:650,borderSpacing:"0 20px"},"aria-label":"simple table",children:[f("colgroup",{children:[a("col",{width:"70%"}),a("col",{width:"10%"}),a("col",{width:"10%"}),a("col",{width:"10%"})]}),a(L,{children:a(R,{children:["Text",...Z.map(({field:c})=>c)].map(D).map((c,g)=>a(T,{align:"center",sx:{width:50,fontWeight:"bold"},children:c},g))})}),a(W,{children:s.map(c=>a(re,{row:c,action:t},c.id))})]})}):a("p",{className:"flex justify-center h-96 items-center",children:a("b",{children:"No texts to show"})})]})};export{me as default};