import{aB as o,g as r,aC as i,ad as s}from"./DJzykoU-.js";const h=o(async(u,n)=>{let t,e;const a=r();if(a.isAuthenticated||([t,e]=i(()=>a.restoreAuth()),await t,e()),!a.isAuthenticated)return s("/auth/login");if(!([t,e]=i(()=>a.checkSession()),t=await t,e(),t))return s("/auth/login")});export{h as default};
//# sourceMappingURL=DUrW9zbv.js.map
