import{_ as ce,r as I,c as ve,a as pe,o as ye,b as f,d as c,e as k,f as x,g as j,w as fe,h as m,t as E,F as N,i as A,n as R,j as B,k as i,l as b,m as $,p as ge,E as T,q as J,s as H}from"./index-BDCyeb62.js";const y=[];for(let r=0;r<256;++r)y.push((r+256).toString(16).slice(1));function me(r,l=0){return(y[r[l+0]]+y[r[l+1]]+y[r[l+2]]+y[r[l+3]]+"-"+y[r[l+4]]+y[r[l+5]]+"-"+y[r[l+6]]+y[r[l+7]]+"-"+y[r[l+8]]+y[r[l+9]]+"-"+y[r[l+10]]+y[r[l+11]]+y[r[l+12]]+y[r[l+13]]+y[r[l+14]]+y[r[l+15]]).toLowerCase()}let D;const he=new Uint8Array(16);function we(){if(!D){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");D=crypto.getRandomValues.bind(crypto)}return D(he)}const _e=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),Q={randomUUID:_e};function F(r,l,n){var t;if(Q.randomUUID&&!r)return Q.randomUUID();r=r||{};const u=r.random??((t=r.rng)==null?void 0:t.call(r))??we();if(u.length<16)throw new Error("Random bytes length must be >= 16");return u[6]=u[6]&15|64,u[8]=u[8]&63|128,me(u)}function V(r){let l=0;for(let n of r)if(["K","Q","J","10"].includes(n))l+=0;else if(n==="A")l+=1;else{const u=parseInt(n);if(isNaN(u)||u<1||u>9)throw new Error(`无效的牌面: ${n}. 牌面必须是 A, K, Q, J, 10-2 或数字 1-9。`);l+=u}return l%10}function M(r,l){const n=V(r),u=V(l);return n===u?"和局":n>u?"庄家":"闲家"}function ke(r){let l=[],n=[],u=0;const t=()=>{if(u>=r.length)throw new Error("牌数不足以完成本局游戏。");return r[u++]};try{l.push(t()),n.push(t()),l.push(t()),n.push(t())}catch{throw new Error("牌数不足，无法开始游戏。每局至少需要4张牌。")}const g=V(l),h=V(n);if(g>=8||h>=8)return{playerHand:l,bankerHand:n,winner:M(n,l),cardsUsed:u};let v=!1;if(g<=5)try{l.push(t()),v=!0}catch{throw new Error("牌数不足，闲家无法补牌。")}const U=v?V([l[2]]):-1,p=V(n);if(v){if(p<=2)try{n.push(t())}catch{throw new Error("牌数不足，庄家无法补牌。")}else if(p===3&&U!==8)try{n.push(t())}catch{throw new Error("牌数不足，庄家无法补牌。")}else if(p===4&&[2,3,4,5,6,7].includes(U))try{n.push(t())}catch{throw new Error("牌数不足，庄家无法补牌。")}else if(p===5&&[4,5,6,7].includes(U))try{n.push(t())}catch{throw new Error("牌数不足，庄家无法补牌。")}else if(p===6&&[6,7].includes(U))try{n.push(t())}catch{throw new Error("牌数不足，庄家无法补牌。")}}else if(p<=5)try{n.push(t())}catch{throw new Error("牌数不足，庄家无法补牌。")}return{playerHand:l,bankerHand:n,winner:M(n,l),cardsUsed:u}}const xe={class:"poker-game"},be={key:0,class:"login-overlay"},Ce={class:"login-container"},Ie={class:"login-box"},Ue={class:"login-form"},Ve={key:0,class:"login-error"},Se={key:1},Ee={class:"top-nav"},Be={class:"nav-user"},Te={class:"username"},je={class:"card-container"},Re=["onClick"],$e={class:"card-value"},He={key:0,class:"empty-state"},ze={class:"options-grid"},De=["onClick"],Ke={key:0},Le={key:1,class:"card-option"},Ne={key:2,class:"option-label"},Ae={class:"result-content"},Je={__name:"index",setup(r){const l=I(!1),n=I(null),u=I(null),t=I([]),g=I([]),h=I(300),v=I(null),U=I(!1),p=I({username:"",password:""}),C=I(!1),S=I(""),q=ve(()=>localStorage.getItem("bjlc_username")||"admin"),O=pe([{value:"empty",display:"清空"},{value:"K",display:"K"},{value:"back",display:"删除"},{value:"1",display:"1"},{value:"2",display:"2"},{value:"3",display:"3"},{value:"4",display:"4"},{value:"5",display:"5"},{value:"6",display:"6"},{value:"7",display:"7"},{value:"8",display:"8"},{value:"9",display:"9"},{value:"10",display:"10"},{value:"J",display:"J"},{value:"Q",display:"Q"}]),W=a=>{switch(u.value=a.value,a.value){case"empty":P();break;case"back":X();break;default:G()}},G=()=>{if(n.value&&u.value){const a={id:F(),value:u.value,display:u.value},e=t.value.findIndex(d=>d.id===n.value);t.value.splice(e+1,0,a),u.value=null,n.value=null,J(()=>{const d=document.querySelector(".card-container");d.scrollTop=d.scrollHeight})}if(u.value){const a={id:F(),value:u.value,display:u.value};t.value.push(a),u.value=null,J(()=>{const e=document.querySelector(".card-container");e.scrollTop=e.scrollHeight})}},P=()=>{t.value.length!==0&&H.confirm("确定要清空所有卡片吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{t.value=[],u.value=null}).catch(()=>{})},X=()=>{console.log("回退功能触发"),t.value.length>0&&t.value.pop()},K=a=>{if(["1","2","3"].includes(a))return"w-20%!";if(["4","5","6"].includes(a))return"w-40%!";if(["7","8","9"].includes(a))return"w-60%!";if(["J","Q","K"].includes(a))return"w-20%!"},Y=a=>{if(n.value===a.id){n.value=null,v.value=null;return}if(n.value=a.id,l.value){let e=t.value.findIndex(s=>s.id===a.id),d=0;for(let s=0;s<g.value.length;s++)if(d+=g.value[s].cardsUsed||0,e<d){v.value=s;break}}},Z=(a,e,d)=>{if(!l.value)return;let s=g.value.findIndex(_=>_===a);v.value=s;let w=0;for(let _=0;_<s;_++)w+=g.value[_].cardsUsed||0;w+(a.cardsUsed||0),t.value[w]&&(n.value=t.value[w].id)},ee=()=>{t.value.length!==0&&n.value&&(t.value=t.value.filter(a=>a.id!==n.value),n.value=null)},le=()=>{if(t.value.length!==0&&n.value){const a=t.value.findIndex(e=>e.id===n.value);a!==-1&&a<t.value.length-1&&H.confirm("确定要删除选中牌之后的所有牌吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{t.value=t.value.slice(0,a+1),n.value=null}).catch(()=>{})}},te=()=>{g.value=[];const a=t.value.map(s=>s.value);let e=0,d=0;for(;e<a.length;){d++;let s={};s.jushu=d;try{const w=a.slice(e),_=ke(w);e+=_.cardsUsed,s.zhuang=V(_.bankerHand),s.xian=V(_.playerHand),s.result=_.winner,s.cardsUsed=_.cardsUsed,g.value.push(s)}catch{T.error(`错误: 从第 ${e+1} 张牌开始`),t.value[e]&&(n.value=t.value[e].id),e=a.length;break}}if(d===0){T.error("无法识别任何有效的百家乐局。请检查输入格式。");return}h.value=400,l.value=!0,v.value=null},ae=()=>{l.value=!1,h.value=300,v.value=null};function ne(a){if(v.value==null||!l.value)return!1;let e=0;for(let s=0;s<v.value;s++)e+=g.value[s].cardsUsed||0;let d=e+(g.value[v.value].cardsUsed||0);return a>=e&&a<d}function se({row:a,rowIndex:e}){let d=[];return e===v.value&&d.push("result-active-row"),d.join(" ")}const re=()=>{if(t.value.length!==0&&n.value){const a=t.value.findIndex(e=>e.id===n.value);a>0?H.confirm("确定要删除选中牌之前的所有牌吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{t.value=t.value.slice(a),n.value=null}).catch(()=>{}):a===0&&T.info("已经是第一张牌，无法删除此前的牌")}},ue=a=>{let e=0;for(let s=0;s<a;s++)e+=g.value[s].cardsUsed||0;const d=g.value[a].cardsUsed||0;t.value.splice(e,d),g.value.splice(a,1),v.value===a?(v.value=null,n.value=null):v.value>a&&v.value--},oe=()=>{localStorage.getItem("bjlc_login_status")==="true"&&(U.value=!0)},L=()=>{if(!p.value.username||!p.value.password){S.value="请输入用户名和密码";return}C.value=!0,S.value="",setTimeout(()=>{p.value.username==="admin"&&p.value.password==="kun@123"?(U.value=!0,localStorage.setItem("bjlc_login_status","true"),localStorage.setItem("bjlc_username",p.value.username),S.value="",T.success("登录成功！")):(S.value="用户名或密码错误",T.error("登录失败，请检查用户名和密码")),C.value=!1},500)},ie=()=>{H.confirm("确定要退出登录吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{U.value=!1,localStorage.removeItem("bjlc_login_status"),localStorage.removeItem("bjlc_username"),p.value={username:"",password:""},S.value="",T.success("已退出登录")}).catch(()=>{})};return ye(()=>{oe()}),(a,e)=>{const d=j("el-input"),s=j("el-button"),w=j("el-table-column"),_=j("el-tag"),de=j("el-table");return i(),f("div",xe,[U.value?(i(),f("div",Se,[c("div",Ee,[e[8]||(e[8]=c("div",{class:"nav-title"},"百家乐计算器",-1)),c("div",Be,[c("span",Te,"欢迎，"+E(q.value),1),k(s,{type:"danger",size:"small",onClick:ie},{default:m(()=>e[7]||(e[7]=[b(" 退出登录 ")])),_:1,__:[7]})])]),c("div",{class:"card-display-area",style:R({height:`calc(100vh - ${h.value}px - 60px)`})},[c("div",je,[(i(!0),f(N,null,A(t.value,(o,z)=>(i(),f("div",{key:o.id,onClick:Qe=>Y(o),class:$(["playing-card",[{active:n.value===o.id},l.value&&ne(z)?"result-active-card":""]])},[c("div",$e,E(o.display),1)],10,Re))),128)),t.value.length===0?(i(),f("div",He," 请选择扑克牌 ")):x("",!0)]),e[9]||(e[9]=c("div",{class:"h-46px w-100%"},null,-1))],4),t.value.length>0?(i(),f("div",{key:0,class:"shuffle-button",style:R({bottom:`${h.value+8}px`})},[l.value?x("",!0):(i(),B(s,{key:0,type:"primary",round:"",class:"w-100px",onClick:te},{default:m(()=>e[10]||(e[10]=[b("计算")])),_:1,__:[10]})),l.value?(i(),B(s,{key:1,round:"",class:"w-100px",onClick:ae},{default:m(()=>e[11]||(e[11]=[b("修改")])),_:1,__:[11]})):x("",!0),l.value&&h.value<500?(i(),B(s,{key:2,type:"warning",round:"",class:"w-100px ml-10px",onClick:e[2]||(e[2]=o=>h.value=500)},{default:m(()=>e[12]||(e[12]=[b("更高展示")])),_:1,__:[12]})):x("",!0),l.value&&h.value>400?(i(),B(s,{key:3,type:"warning",round:"",class:"w-100px ml-10px",onClick:e[3]||(e[3]=o=>h.value=400)},{default:m(()=>e[13]||(e[13]=[b("恢复高度")])),_:1,__:[13]})):x("",!0),l.value?x("",!0):(i(),B(s,{key:4,type:"danger",round:"",class:"w-100px",onClick:ee},{default:m(()=>e[14]||(e[14]=[b("删除选中")])),_:1,__:[14]})),l.value?x("",!0):(i(),B(s,{key:5,type:"info",round:"",class:"w-100px",onClick:re},{default:m(()=>e[15]||(e[15]=[b("删除此前")])),_:1,__:[15]})),l.value?x("",!0):(i(),B(s,{key:6,type:"warning",round:"",class:"w-100px ml-10px",onClick:le},{default:m(()=>e[16]||(e[16]=[b("删除此后")])),_:1,__:[16]}))],4)):x("",!0),l.value?(i(),f("div",{key:2,class:"input-result",style:R({height:`${h.value}px`})},[e[18]||(e[18]=c("div",{class:"result-title mb-10px"},"计算结果",-1)),c("div",Ae,[k(de,{class:"text-12px w-100%",data:g.value,style:{width:"100%"},height:h.value-50,"row-class-name":se,onRowClick:Z},{default:m(()=>[k(w,{property:"zhuang",align:"center",label:"庄"}),k(w,{property:"xian",align:"center",label:"闲"}),k(w,{property:"result",align:"center",label:"结果"},{default:m(o=>[k(_,{type:o.row.result==="和局"?"success":o.row.result==="庄家"?"danger":"primary",effect:"dark"},{default:m(()=>[b(E(o.row.result),1)]),_:2},1032,["type"])]),_:1}),k(w,{property:"jushu",align:"center",label:"局数"},{default:m(o=>[b(" 第"+E(o.row.jushu)+"局 ",1)]),_:1}),k(w,{label:"操作",align:"center"},{default:m(o=>[k(s,{type:"danger",size:"small",onClick:ge(z=>ue(o.$index),["stop"])},{default:m(()=>e[17]||(e[17]=[b("删除")])),_:2,__:[17]},1032,["onClick"])]),_:1})]),_:1},8,["data","height"])])],4)):(i(),f("div",{key:1,class:"input-options",style:R({height:`${h.value}px`})},[c("div",ze,[(i(!0),f(N,null,A(O,o=>(i(),f("div",{key:o.value,class:$(["option-button",{selected:u.value===o.value}]),onClick:z=>W(o)},[o.display==="清空"||o.display==="删除"?(i(),f("div",Ke,E(o.display),1)):(i(),f("div",Le,[c("span",{class:$(K(o.display))},null,2),["J","Q","K"].includes(o.display)?(i(),f("span",{key:0,class:$(["ml-20px",K(o.display)])},null,2)):x("",!0)])),["清空","删除"].includes(o.display)?x("",!0):(i(),f("label",Ne,E(o.display),1))],10,De))),128))])],4))])):(i(),f("div",be,[c("div",Ce,[c("div",Ie,[e[6]||(e[6]=c("h2",null,"百家乐计算器",-1)),c("div",Ue,[k(d,{modelValue:p.value.username,"onUpdate:modelValue":e[0]||(e[0]=o=>p.value.username=o),placeholder:"请输入用户名","prefix-icon":"User",size:"large",class:"login-input"},null,8,["modelValue"]),k(d,{modelValue:p.value.password,"onUpdate:modelValue":e[1]||(e[1]=o=>p.value.password=o),type:"password",placeholder:"请输入密码","prefix-icon":"Lock",size:"large",class:"login-input",onKeyup:fe(L,["enter"])},null,8,["modelValue"]),k(s,{type:"primary",size:"large",class:"login-button",onClick:L,loading:C.value},{default:m(()=>e[4]||(e[4]=[b(" 登录 ")])),_:1,__:[4]},8,["loading"]),S.value?(i(),f("div",Ve,E(S.value),1)):x("",!0),e[5]||(e[5]=c("div",{class:"login-tips"},[c("p",null,"测试账号：admin"),c("p",null,"测试密码：kun@123")],-1))])])])]))])}}},Me=ce(Je,[["__scopeId","data-v-feb940a7"]]);export{Me as default};
