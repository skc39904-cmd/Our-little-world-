let current=0;
const pages=[...document.querySelectorAll(".page")];
const counter=document.getElementById("counter");
const back=document.getElementById("back");
const next=document.getElementById("next");

function showPage(n){
  current=Math.max(0,Math.min(pages.length-1,n));
  pages.forEach((p,i)=>p.classList.toggle("active",i===current));
  counter.textContent=`${current+1} / ${pages.length}`;
  back.style.opacity=current===0?".35":"1";
  next.style.opacity=current===pages.length-1?".35":"1";
}
function nextPage(){ if(current<pages.length-1) showPage(current+1); }
function prevPage(){ if(current>0) showPage(current-1); }

document.addEventListener("keydown",e=>{
  if(e.key==="ArrowRight"||e.key===" ") nextPage();
  if(e.key==="ArrowLeft") prevPage();
});

let startX=null;
document.addEventListener("touchstart",e=>{startX=e.changedTouches[0].clientX},{passive:true});
document.addEventListener("touchend",e=>{
  if(startX===null)return;
  const dx=e.changedTouches[0].clientX-startX;
  if(Math.abs(dx)>55) dx<0?nextPage():prevPage();
  startX=null;
},{passive:true});

showPage(0);
