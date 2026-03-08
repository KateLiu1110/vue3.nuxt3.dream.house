import{E as w}from"./CmP1zgAg.js";import{E as P}from"./DZq6zFLt.js";import{d as k,o as u,c as f,e as n,h as e,u as t,a as i,w as l,q as C,t as c,aY as _,F as y,z as E,n as z,k as g}from"./DJzykoU-.js";import{u as B,b as S}from"./0t_NvJNy.js";import"./BRpsqvk_.js";import"./BB_Ol6Sd.js";const $={class:"animate-fade-in space-y-8 max-w-4xl mx-auto"},j={class:"mb-8"},F={class:"text-3xl font-black text-slate-800 flex items-center gap-3"},N={class:"bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm"},V={class:"bg-slate-50 border border-slate-200 p-8 md:p-10 rounded-2xl min-h-[350px] flex flex-col shadow-inner"},I={class:"flex justify-between items-center border-b border-slate-200 pb-6 mb-8"},M={class:"font-black text-2xl text-slate-800 flex items-center gap-3"},T={class:"font-bold text-slate-400 bg-white px-3 py-1 rounded-lg border border-slate-200"},q={class:"text-slate-700 leading-loose whitespace-pre-line text-lg flex-1 font-medium"},D={class:"flex justify-center items-center gap-8 mt-10"},L={class:"flex gap-3"},Y={class:"flex justify-between items-center pt-8 border-t border-slate-200"},R=k({__name:"StepContract",emits:["next","prev"],setup(A,{emit:b}){const x=b,s=B(),o=[{title:"壹、買賣標的與面積",content:`已經為您確認房屋標的。
請仔細核對：
- 權狀總坪數與主建物坪數是否相符
- 車位是屬於法定停車位還是增設停車位

小提醒：若為日本物件，面積計算方式不含陽台，請以『專有面積』為準喔！`},{title:"貳、付款條件與履約保證",content:`為了您的資金安全，建議一律採用「價金履約保證」。
付款分為四期：
1. 簽約款 (通常為10%)
2. 備證用印款 (通常為10%)
3. 完稅款 (通常為10%)
4. 交屋尾款 (貸款70%)

安心建議：合約務必加註『若貸款成數不足8成，買方得無條件解約』。`},{title:"參、現況說明與瑕疵擔保",content:`屋主需對房屋現況負責（契約不適合責任）。
應確認項目：
- 是否有漏水、壁癌紀錄
- 是否為輻射屋或海砂屋

贴心提醒：中古屋若約定『現況交屋』，交屋前務必詳細驗屋，保障自身權益！`}],h=()=>{s.acceptContract(),x("next")};return(v,a)=>{const r=w,d=P;return u(),f("div",$,[n("div",j,[a[4]||(a[4]=n("div",{class:"text-amber-600 font-bold text-sm mb-2 uppercase tracking-wider"},"Step 4",-1)),n("h2",F,[e(t(S),{class:"w-8 h-8 text-amber-500"}),a[3]||(a[3]=i(" 合約重點畫線 ",-1))])]),n("div",N,[n("div",V,[n("div",I,[n("span",M,[e(r,{class:"text-emerald-500"},{default:l(()=>[e(t(C))]),_:1}),i(" "+c(o[t(s).contractPage].title),1)]),n("span",T," 頁數 "+c(t(s).contractPage+1)+" / "+c(o.length),1)]),n("p",q,c(o[t(s).contractPage].content),1),n("div",D,[e(d,{circle:"",size:"large",onClick:a[0]||(a[0]=m=>t(s).contractPage=Math.max(0,t(s).contractPage-1)),disabled:t(s).contractPage===0},{default:l(()=>[e(r,null,{default:l(()=>[e(t(_))]),_:1})]),_:1},8,["disabled"]),n("div",L,[(u(),f(y,null,E(o,(m,p)=>n("div",{key:p,class:z([p===t(s).contractPage?"bg-amber-400 scale-125":"bg-slate-300","w-3 h-3 rounded-full transition-all"])},null,2)),64))]),e(d,{circle:"",size:"large",onClick:a[1]||(a[1]=m=>t(s).contractPage=Math.min(o.length-1,t(s).contractPage+1)),disabled:t(s).contractPage===o.length-1},{default:l(()=>[e(r,null,{default:l(()=>[e(t(g))]),_:1})]),_:1},8,["disabled"])])])]),n("div",Y,[e(d,{size:"large",onClick:a[2]||(a[2]=m=>v.$emit("prev"))},{default:l(()=>[e(r,null,{default:l(()=>[e(t(_))]),_:1}),a[5]||(a[5]=i(" 返回修改預算 ",-1))]),_:1}),e(d,{type:"success",size:"large",onClick:h,disabled:t(s).contractPage<o.length-1},{default:l(()=>[i(c(t(s).contractPage===o.length-1?"我已了解合約，觀看最終評估報告":"請先看完所有合約教學喔")+" ",1),e(r,{class:"ml-2"},{default:l(()=>[e(t(g))]),_:1})]),_:1},8,["disabled"])])])}}});export{R as default};
//# sourceMappingURL=BUNvgK1F.js.map
