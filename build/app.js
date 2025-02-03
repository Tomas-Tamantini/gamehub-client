(()=>{"use strict";var e;function t(e){return`${e.rank}${{d:"♦",c:"♣",h:"♥",s:"♠"}[e.suit]}`}function s(e,s){if(0===e.cards.length)return function(e){const t=document.createElement("div");return t.classList.add("pass-move"),t.classList.add(e),t.innerHTML="Pass",t}(s);const a=document.createElement("div");return a.classList.add("hand-container"),e.isHandToBeat&&a.classList.add("hand-to-beat"),e.cards.forEach((e=>{a.appendChild(function(e,s){const a=document.createElement("div");return a.classList.add("card"),a.classList.add(`card-${s}`),"d"===e.suit||"h"===e.suit?a.classList.add("red"):a.classList.add("black"),a.innerHTML=t(e),a}(e,s))})),a}function a(e){const t="dhsc".indexOf(e.suit);return 4*"3456789TJQKA2".indexOf(e.rank)+t}function n(e){var t;if(!e.myCards||0===e.myCards.length)return Object.assign(Object.assign({},e),{selectedCards:[]});let s=null===(t=e.myCards)||void 0===t?void 0:t.slice().sort(((e,t)=>a(e)-a(t)));return e.myCards.every(((e,t,s)=>0===t||a(s[t-1])<=a(e)))&&(s=s.reverse()),Object.assign(Object.assign({},e),{myCards:s,selectedCards:[]})}function i(e,s){const a=document.createElement("div");return a.classList.add("player-state"),a.appendChild(function(e){const t=document.createElement("div");return t.classList.add("player-status"),e.isTheirTurn&&t.classList.add("their-turn"),t.appendChild(function(e){const t=document.createElement("span");return e.isOffline&&t.classList.add("offline"),t.textContent=e.playerId,t}(e)),t.appendChild(function(e){const t=document.createElement("span");return t.classList.add("num-points"),t.textContent=`${e} pts`,t}(e.numPoints)),t}(e)),void 0!==e.cards?a.appendChild(function(e,s){const a=document.createElement("div");return a.appendChild(function(e,s){const a=document.createElement("div");return a.classList.add("hand-container"),a.classList.add("my-hand"),e.forEach((e=>{a.appendChild(function(e,s){const a=document.createElement("div");for(const t of function*(e){yield"card",yield"card-front","d"===e.suit||"h"===e.suit?yield"red":yield"black",e.isSelected&&(yield"selected")}(e))a.classList.add(t);return a.innerHTML=t(e),a.onclick=()=>{s.update((t=>{const s=function(e,t){return t.some((t=>t.rank===e.rank&&t.suit===e.suit))?t.filter((t=>t.rank!==e.rank||t.suit!==e.suit)):[...t,e]}(e,t.selectedCards||[]);return Object.assign(Object.assign({},t),{selectedCards:s})}))},a.ondblclick=()=>{s.update((e=>Object.assign(Object.assign({},e),{selectedCards:[]})))},a}(e,s))})),a}(e,s)),e.length>1&&a.appendChild(function(e){const t=document.createElement("button");return t.classList.add("icon-btn"),t.textContent="⇄",t.onclick=()=>{e.update(n)},t}(s)),a}(e.cards,s)):a.appendChild(function(e){const t=document.createElement("div");return t.classList.add("hand-container"),t.innerHTML=`<div class="card card-back">${e}</div>`,t}(e.numCards)),a}function r(e,t){return e.findIndex((e=>e.rank===t.rank&&e.suit===t.suit))}function d(e){return Array.isArray(e)?e.map(d):e&&"object"==typeof e?Object.fromEntries(Object.entries(e).map((([e,t])=>[e.replace(/([A-Z])/g,"_$1").toLowerCase(),d(t)]))):e}function o(e){return Array.isArray(e)?e.map(o):e&&"object"==typeof e?Object.fromEntries(Object.entries(e).map((([e,t])=>[e.replace(/_([a-z])/g,((e,t)=>t.toUpperCase())),o(t)]))):e}!function(e){e.START_GAME="START_GAME",e.START_MATCH="START_MATCH",e.DEAL_CARDS="DEAL_CARDS",e.START_ROUND="START_ROUND",e.START_TURN="START_TURN",e.AWAIT_PLAYER_ACTION="AWAIT_PLAYER_ACTION",e.END_TURN="END_TURN",e.END_ROUND="END_ROUND",e.END_MATCH="END_MATCH",e.UPDATE_POINTS="UPDATE_POINTS",e.END_GAME="END_GAME"}(e||(e={}));const l=new class{constructor(){this.state={},this.subscribers=[]}subscribe(e){this.subscribers.push(e),e.update(this.state)}update(e){this.state=e(this.state),this.subscribers.forEach((e=>e.update(this.state)))}getState(){return this.state}},c=new class{constructor(e){this.stateStore=e}handle(e){if("ERROR"===e.messageType)this.handleErrorMessage(e.payload);else if("GAME_ROOM_UPDATE"===e.messageType)this.handleRoomUpdate(e.payload);else if("GAME_STATE"===e.messageType)if(e.payload.sharedView){const t=e.payload;this.handleSharedGameState(t.sharedView)}else if(e.payload.privateView){const t=e.payload;this.handlePrivateGameState(t.privateView)}}handleRoomUpdate(e){const t=e.roomId,s=e.offlinePlayers;let a="";this.stateStore.getState().sharedGameState?s.length>0&&(a=`Offline players: ${s.join(", ")}`):a=`Players in room: ${e.playerIds.join(", ")}`,this.stateStore.update((e=>Object.assign(Object.assign({},e),{alertMsg:a,offlinePlayers:s,roomId:t})))}handleErrorMessage(e){this.stateStore.update((t=>Object.assign(Object.assign({},t),{alertMsg:`Error: ${e.error}`,selectedCards:[]})))}handleSharedGameState(e){var t;let s;e.result&&(s=`Game over. Results: ${null===(t=e.result)||void 0===t?void 0:t.players.map((e=>`${e.playerId}: ${e.distToAvg}`)).join(" / ")}`);const a="UPDATE_POINTS"==e.status?[]:this.stateStore.getState().myCards;this.stateStore.update((t=>Object.assign(Object.assign({},t),{sharedGameState:e,alertMsg:s,myCards:a})))}handlePrivateGameState(e){const t=e.cards,s=this.stateStore.getState().myCards||[],a=t.sort(((e,t)=>r(s,e)-r(s,t)));this.stateStore.update((e=>Object.assign(Object.assign({},e),{myCards:a,alertMsg:void 0,selectedCards:[]})))}}(l),u=new class{onMessage(e){this.callbackOnMessage=e}onError(e){this.callbackOnError=e}send(e){var t;null===(t=this.ws)||void 0===t||t.send(JSON.stringify(d(e)))}connect(e){var t;try{this.ws=new WebSocket(e),this.ws.onopen=()=>{console.log("Socket connected")},this.ws.onmessage=e=>{var t;null===(t=this.callbackOnMessage)||void 0===t||t.call(this,o(JSON.parse(e.data)))},this.ws.onclose=()=>{console.log("Socket closed")},this.ws.onerror=e=>{var t;null===(t=this.callbackOnError)||void 0===t||t.call(this,e)}}catch(e){null===(t=this.callbackOnError)||void 0===t||t.call(this,e)}}},h=prompt("Enter server URL","ws://localhost:8765");u.connect(h),u.onMessage((e=>{c.handle(e)})),u.onError((()=>{l.update((e=>Object.assign(Object.assign({},e),{alertMsg:"Error: Could not connect to server"})))}));const p=new class{constructor(e,t){this.socketService=e,this.stateStore=t}joinGameByType(){this.socketService.send({playerId:this.stateStore.getState().playerId,requestType:"JOIN_GAME_BY_TYPE",payload:{gameType:"chinese_poker"}})}makeMove(e){const{playerId:t,roomId:s}=this.stateStore.getState();this.socketService.send({playerId:t,requestType:"MAKE_MOVE",payload:{roomId:s,move:{cards:e}}})}}(u,l),m=new class{constructor(e){var t;this.stateStore=e,this.authBtn=document.getElementById("auth-btn"),this.playerIdSpan=document.getElementById("player-id"),null===(t=this.authBtn)||void 0===t||t.addEventListener("click",this.onAuthBtnClick.bind(this))}update(e){this.playerIdSpan&&(this.playerIdSpan.innerText=e.playerId?e.playerId:""),this.authBtn&&(this.authBtn.style.display=e.playerId?"none":"block")}onAuthBtnClick(){if(!this.stateStore.getState().playerId){const e=prompt("Enter your player ID");e&&this.stateStore.update((t=>Object.assign(Object.assign({},t),{playerId:e})))}}}(l);l.subscribe(m);const v=new class{constructor(e){var t;this.gameService=e,this.joinBtn=document.getElementById("join-btn"),null===(t=this.joinBtn)||void 0===t||t.addEventListener("click",this.onJoinBtnClick.bind(this))}onJoinBtnClick(){this.gameService.joinGameByType()}update(e){var t,s,a;e.playerId&&!e.roomId||"END_GAME"===(null===(t=e.sharedGameState)||void 0===t?void 0:t.status)?null===(s=this.joinBtn)||void 0===s||s.classList.remove("hidden"):null===(a=this.joinBtn)||void 0===a||a.classList.add("hidden")}}(p);l.subscribe(v);const y=new class{constructor(){this.alertMsgSpan=document.getElementById("alert-msg")}update(e){this.alertMsgSpan&&(this.alertMsgSpan.textContent=e.alertMsg?e.alertMsg:"")}};l.subscribe(y);const g=new class{constructor(e){this.stateStore=e,this.table=document.getElementById("table")}reset(){for(var e;null===(e=this.table)||void 0===e?void 0:e.firstChild;)this.table.removeChild(this.table.firstChild)}cardsUI(e,t){if(0===e&&void 0!==t.myCards)return void 0===t.selectedCards?t.myCards.map((e=>Object.assign(Object.assign({},e),{isSelected:!1}))):t.myCards.map((e=>Object.assign(Object.assign({},e),{isSelected:t.selectedCards.some((t=>t.rank===e.rank&&t.suit===e.suit))})))}isHandToBeat(e,t){return e===(null==t?void 0:t.slice().reverse().find((e=>e.cards.length>0)))}playerDiv(e,t,a){var n,r,d,o;const l=this.cardsUI(t,a),c=(null===(n=a.sharedGameState)||void 0===n?void 0:n.currentPlayerId)===e.playerId,u=((null===(r=a.sharedGameState)||void 0===r?void 0:r.moveHistory.filter((t=>t.playerId===e.playerId)))||[]).map((e=>{var t;return{cards:e.cards,isHandToBeat:this.isHandToBeat(e,null===(t=a.sharedGameState)||void 0===t?void 0:t.moveHistory)}})),h=null!==(o=null===(d=a.offlinePlayers)||void 0===d?void 0:d.includes(e.playerId))&&void 0!==o&&o;return function(e,t){var a;const n=document.createElement("div"),r=function(e){if(0===e)return"bottom";if(1===e)return"left";if(2===e)return"top";if(3===e)return"right";throw new Error(`Invalid offset: ${e}`)}(e.offset);if(n.classList.add("player"),n.classList.add(r),n.appendChild(i(e,t)),e.handHistory.length>0){const i=null!==(a=t.getState().isMobile)&&void 0!==a&&a;n.appendChild(function(e,t){const a=document.createElement("div");if(a.classList.add("move-history"),!t&&e.length>1){const t=e[e.length-2];a.appendChild(s(t,"micro"))}if(e.length>0){const t=e[e.length-1];a.appendChild(s(t,"mini"))}return a}(e.handHistory,i))}return n}(Object.assign(Object.assign({},e),{offset:t,cards:l,isTheirTurn:c,handHistory:u,isOffline:h}),this.stateStore)}update(e){var t;this.reset();const s=null===(t=e.sharedGameState)||void 0===t?void 0:t.players;if(s){const t=s.findIndex((t=>t.playerId===e.playerId));s.forEach(((a,n)=>{var i;const r=(n-t+s.length)%s.length;null===(i=this.table)||void 0===i||i.appendChild(this.playerDiv(a,r,e))}))}}}(l);l.subscribe(g);const b=new class{constructor(e,t){var s,a;this.gameService=t,this.makeMoveBtn=document.getElementById("make-move-btn"),this.passBtn=document.getElementById("pass-btn"),null===(s=this.makeMoveBtn)||void 0===s||s.addEventListener("click",(()=>this.gameService.makeMove(e.getState().selectedCards||[]))),null===(a=this.passBtn)||void 0===a||a.addEventListener("click",(()=>this.gameService.makeMove([])))}isMidGame(t){return t.playerId&&t.roomId&&t.sharedGameState&&t.sharedGameState.status!==e.END_GAME}isMyTurn(t){var s,a;return(null===(s=t.sharedGameState)||void 0===s?void 0:s.status)===e.AWAIT_PLAYER_ACTION&&(null===(a=t.sharedGameState)||void 0===a?void 0:a.currentPlayerId)===t.playerId}updatePassBtn(e){var t,s,a,n;this.isMidGame(e)?(null===(s=this.passBtn)||void 0===s||s.classList.remove("hidden"),this.isMyTurn(e)?null===(a=this.passBtn)||void 0===a||a.removeAttribute("disabled"):null===(n=this.passBtn)||void 0===n||n.setAttribute("disabled","true")):null===(t=this.passBtn)||void 0===t||t.classList.add("hidden")}updateMakeMoveBtn(e){var t,s,a,n,i,r;if(this.isMidGame(e)){null===(s=this.makeMoveBtn)||void 0===s||s.classList.remove("hidden");const t=null!==(n=null===(a=e.selectedCards)||void 0===a?void 0:a.length)&&void 0!==n?n:0;this.isMyTurn(e)&&t>0?null===(i=this.makeMoveBtn)||void 0===i||i.removeAttribute("disabled"):null===(r=this.makeMoveBtn)||void 0===r||r.setAttribute("disabled","true")}else null===(t=this.makeMoveBtn)||void 0===t||t.classList.add("hidden")}update(e){this.updatePassBtn(e),this.updateMakeMoveBtn(e)}}(l,p);function f(e){l.update((t=>Object.assign(Object.assign({},t),{isMobile:e.matches})))}l.subscribe(b);const S=window.matchMedia("(max-width: 600px), (max-height: 620px)");S.addEventListener("change",(()=>f(S))),f(S)})();