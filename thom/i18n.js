import {italian} from './translations.js';
export let language='de';try{language=localStorage.getItem('familie-thom-language')==='it'?'it':'de';}catch{}
const unit=s=>italian[s]||s;
export function t(value){if(language!=='it')return String(value);const s=String(value),trim=s.trim();let out=italian[trim];if(out===undefined){let m;
if((m=trim.match(/^(\d+) von (\d+) Punkten erledigt$/)))out=`${m[1]} di ${m[2]} voci completate`;
else if((m=trim.match(/^(\d+) Punkte$/)))out=`${m[1]} voci`;
else if((m=trim.match(/^(\d+) offen$/)))out=`${m[1]} da completare`;
else if((m=trim.match(/^(\d+) Einträge$/)))out=`${m[1]} voci`;
else if((m=trim.match(/^Aktiv: (\d+) Erwachsene · (\d+) Kinder · 30 Tage$/)))out=`Attivo: ${m[1]} adulti · ${m[2]} bambini · 30 giorni`;
else if((m=trim.match(/^Noch (.+) (Stück|Liter|kg|Packungen|Sets|Tage|Portionen|Aufgabe)$/)))out=`Mancano ${m[1]} ${unit(m[2])}`;
else if((m=trim.match(/^(.+?) (Stück|Liter|kg|Packungen|Sets|Tage|Portionen|Aufgabe) (pro .+)$/)))out=`${m[1]} ${unit(m[2])} ${unit(m[3])}`;
else if(trim.startsWith('Ist-Menge '))out='Quantità disponibile: '+t(trim.slice(10));
else if(trim.endsWith(' bearbeiten'))out=t(trim.slice(0,-11))+' · modifica';
else if(trim.endsWith(' erledigt'))out=t(trim.slice(0,-9))+' · completato';
else if(trim.startsWith('Gespeichert · '))out=trim.replace('Gespeichert','Salvato');
else if(trim==='Zur Checkliste ↓')out='Vai alla lista ↓';
else if(trim==='Familie Thom · 30-Tage-Planer')out='La famiglia Thom · Piano di 30 giorni';
else if((m=trim.match(/^„(.+)“ wirklich entfernen\?$/)))out=`Eliminare davvero «${t(m[1])}»?`;
else if((m=trim.match(/^(\d+) Einträge importieren und den aktuellen Bestand ersetzen\?$/)))out=`Importare ${m[1]} voci e sostituire le scorte attuali?`;
else out=trim;
}return s.replace(trim,out);}
const originals=new WeakMap();
function translateNode(node){let record=originals.get(node);const current=node.nodeValue;if(!record||current!==record.last)record={source:current,last:current};const next=t(record.source);if(current!==next)node.nodeValue=next;record.last=next;originals.set(node,record);}
const attributes=new WeakMap();
export function translateDOM(){document.documentElement.lang=language==='it'?'it':'de-CH';const walker=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode()){if(n.parentElement?.closest('script,style,textarea,[data-no-translate]'))continue;translateNode(n);}document.querySelectorAll('[aria-label],[placeholder],[title]').forEach(el=>{let rec=attributes.get(el)||{};for(const attr of ['aria-label','placeholder','title']){if(!el.hasAttribute(attr))continue;const current=el.getAttribute(attr);let r=rec[attr];if(!r||current!==r.last)r={source:current,last:current};const next=t(r.source);if(current!==next)el.setAttribute(attr,next);r.last=next;rec[attr]=r;}attributes.set(el,rec);});document.querySelectorAll('[data-language]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===language)));}
export function setLanguage(next){language=next==='it'?'it':'de';try{localStorage.setItem('familie-thom-language',language);}catch{}translateDOM();document.dispatchEvent(new Event('languagechange'));}
export function initLanguage(){document.querySelectorAll('[data-language]').forEach(b=>b.onclick=()=>setLanguage(b.dataset.language));translateDOM();let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;translateDOM();});}).observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','placeholder','title']});}
