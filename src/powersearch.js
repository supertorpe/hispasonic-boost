
/*************************
 * de:usuario1,usuario2,usuario3 => busca posts de los usuarios
 * dir:+ => busca en orden (desde la primera página hasta la última). Este es el valor por defecto
 * dir:- => busca en orden inverso (desde la última página hasta la primera)
 * tam:20 => busca de 20 en 20 páginas (<= 0 para buscar en todas; valor por defecto: 10)
 * txt: texto => busca post que contengan el texto
 * gal:si => oculta el texto y muestra una galería con imágenes/vídeos
 * sim:3 => busca hilos similares por el árbol con profundidad 3 (el máximo es 5)
 * cache:clean => limpia la caché
*************************/
(function () {
    'use strict';

    ////////////////////////////////////////////////////////////////////////
    // https://github.com/idurar/vanilla-js-modal
    function outsideClick(e) { if (e.target.closest(".modal-inner")) { return } const modalVisible = document.querySelector(".modal-visible"); if (modalVisible) { closeModal() } } function escKey(e) { if (e.keyCode == 27) { closeModal() } } function closeClick(e) { if (e.target.classList.contains("closeModal")) { closeModal() } } function trapTabKey(e) { const vanillaModal = document.querySelector(".vanilla-modal"); const FOCUSABLE_ELEMENTS = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])']; const nodes = vanillaModal.querySelectorAll(FOCUSABLE_ELEMENTS); let focusableNodes = Array(...nodes); if (focusableNodes.length === 0) { return } focusableNodes = focusableNodes.filter((node) => { return node.offsetParent !== null }); if (!vanillaModal.contains(document.activeElement)) { focusableNodes[0].focus() } else { const focusedItemIndex = focusableNodes.indexOf(document.activeElement); if (e.shiftKey && focusedItemIndex === 0) { focusableNodes[focusableNodes.length - 1].focus(); e.preventDefault() } if (!e.shiftKey && focusableNodes.length > 0 && focusedItemIndex === focusableNodes.length - 1) { focusableNodes[0].focus(); e.preventDefault() } } } function closeModal() { const vanillaModal = document.querySelector(".vanilla-modal"); if (vanillaModal) { vanillaModal.classList.remove("modal-visible"); document.getElementById("modal-content").innerHTML = ""; document.getElementById("modal-content").style = "" } document.removeEventListener("keydown", escKey); document.removeEventListener("click", outsideClick, true); document.removeEventListener("click", closeClick); document.removeEventListener("keydown", trapTabKey) } const modal = { init: function () { const prerendredModal = document.createElement("div"); prerendredModal.classList.add("vanilla-modal"); const htmlModal = `<div class="modal"><div class="modal-inner"><div id="modal-content"></div></div></div>`; prerendredModal.innerHTML = htmlModal; document.body.appendChild(prerendredModal) }, open: function (idContent, option = { default: null }) { let vanillaModal = document.querySelector(".vanilla-modal"); if (!vanillaModal) { console.log("there is no vanilla modal class"); modal.init(); vanillaModal = document.querySelector(".vanilla-modal") } const content = document.getElementById(idContent); let currentModalContent = content.cloneNode(true); currentModalContent.classList.add("current-modal"); currentModalContent.style = ""; document.getElementById("modal-content").appendChild(currentModalContent); if (!option.default) { if (option.width && option.height) { document.getElementById("modal-content").style.width = option.width; document.getElementById("modal-content").style.height = option.height } } vanillaModal.classList.add("modal-visible"); document.addEventListener("click", outsideClick, true); document.addEventListener("keydown", escKey); document.addEventListener("keydown", trapTabKey); document.getElementById("modal-content").addEventListener("click", closeClick) }, close: function () { closeModal() } };
    // https://github.com/pieroxy/lz-string
    const LZString = function () { function o(o, r) { if (!t[o]) { t[o] = {}; for (var n = 0; n < o.length; n++)t[o][o.charAt(n)] = n } return t[o][r] } var r = String.fromCharCode, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", t = {}, i = { compressToBase64: function (o) { if (null == o) return ""; var r = i._compress(o, 6, function (o) { return n.charAt(o) }); switch (r.length % 4) { default: case 0: return r; case 1: return r + "==="; case 2: return r + "=="; case 3: return r + "=" } }, decompressFromBase64: function (r) { return null == r ? "" : "" == r ? null : i._decompress(r.length, 32, function (e) { return o(n, r.charAt(e)) }) }, compressToUTF16: function (o) { return null == o ? "" : i._compress(o, 15, function (o) { return r(o + 32) }) + " " }, decompressFromUTF16: function (o) { return null == o ? "" : "" == o ? null : i._decompress(o.length, 16384, function (r) { return o.charCodeAt(r) - 32 }) }, compressToUint8Array: function (o) { for (var r = i.compress(o), n = new Uint8Array(2 * r.length), e = 0, t = r.length; t > e; e++) { var s = r.charCodeAt(e); n[2 * e] = s >>> 8, n[2 * e + 1] = s % 256 } return n }, decompressFromUint8Array: function (o) { if (null === o || void 0 === o) return i.decompress(o); for (var n = new Array(o.length / 2), e = 0, t = n.length; t > e; e++)n[e] = 256 * o[2 * e] + o[2 * e + 1]; var s = []; return n.forEach(function (o) { s.push(r(o)) }), i.decompress(s.join("")) }, compressToEncodedURIComponent: function (o) { return null == o ? "" : i._compress(o, 6, function (o) { return e.charAt(o) }) }, decompressFromEncodedURIComponent: function (r) { return null == r ? "" : "" == r ? null : (r = r.replace(/ /g, "+"), i._decompress(r.length, 32, function (n) { return o(e, r.charAt(n)) })) }, compress: function (o) { return i._compress(o, 16, function (o) { return r(o) }) }, _compress: function (o, r, n) { if (null == o) return ""; var e, t, i, s = {}, p = {}, u = "", c = "", a = "", l = 2, f = 3, h = 2, d = [], m = 0, v = 0; for (i = 0; i < o.length; i += 1)if (u = o.charAt(i), Object.prototype.hasOwnProperty.call(s, u) || (s[u] = f++, p[u] = !0), c = a + u, Object.prototype.hasOwnProperty.call(s, c)) a = c; else { if (Object.prototype.hasOwnProperty.call(p, a)) { if (a.charCodeAt(0) < 256) { for (e = 0; h > e; e++)m <<= 1, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++; for (t = a.charCodeAt(0), e = 0; 8 > e; e++)m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1 } else { for (t = 1, e = 0; h > e; e++)m = m << 1 | t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t = 0; for (t = a.charCodeAt(0), e = 0; 16 > e; e++)m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1 } l--, 0 == l && (l = Math.pow(2, h), h++), delete p[a] } else for (t = s[a], e = 0; h > e; e++)m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1; l--, 0 == l && (l = Math.pow(2, h), h++), s[c] = f++, a = String(u) } if ("" !== a) { if (Object.prototype.hasOwnProperty.call(p, a)) { if (a.charCodeAt(0) < 256) { for (e = 0; h > e; e++)m <<= 1, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++; for (t = a.charCodeAt(0), e = 0; 8 > e; e++)m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1 } else { for (t = 1, e = 0; h > e; e++)m = m << 1 | t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t = 0; for (t = a.charCodeAt(0), e = 0; 16 > e; e++)m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1 } l--, 0 == l && (l = Math.pow(2, h), h++), delete p[a] } else for (t = s[a], e = 0; h > e; e++)m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1; l--, 0 == l && (l = Math.pow(2, h), h++) } for (t = 2, e = 0; h > e; e++)m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1; for (; ;) { if (m <<= 1, v == r - 1) { d.push(n(m)); break } v++ } return d.join("") }, decompress: function (o) { return null == o ? "" : "" == o ? null : i._decompress(o.length, 32768, function (r) { return o.charCodeAt(r) }) }, _decompress: function (o, n, e) { var t, i, s, p, u, c, a, l, f = [], h = 4, d = 4, m = 3, v = "", w = [], A = { val: e(0), position: n, index: 1 }; for (i = 0; 3 > i; i += 1)f[i] = i; for (p = 0, c = Math.pow(2, 2), a = 1; a != c;)u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1; switch (t = p) { case 0: for (p = 0, c = Math.pow(2, 8), a = 1; a != c;)u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1; l = r(p); break; case 1: for (p = 0, c = Math.pow(2, 16), a = 1; a != c;)u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1; l = r(p); break; case 2: return "" }for (f[3] = l, s = l, w.push(l); ;) { if (A.index > o) return ""; for (p = 0, c = Math.pow(2, m), a = 1; a != c;)u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1; switch (l = p) { case 0: for (p = 0, c = Math.pow(2, 8), a = 1; a != c;)u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1; f[d++] = r(p), l = d - 1, h--; break; case 1: for (p = 0, c = Math.pow(2, 16), a = 1; a != c;)u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1; f[d++] = r(p), l = d - 1, h--; break; case 2: return w.join("") }if (0 == h && (h = Math.pow(2, m), m++), f[l]) v = f[l]; else { if (l !== d) return null; v = s + s.charAt(0) } w.push(v), f[d++] = s + v.charAt(0), h--, s = v, 0 == h && (h = Math.pow(2, m), m++) } } }; return i }(); "function" == typeof define && define.amd ? define(function () { return LZString }) : "undefined" != typeof module && null != module && (module.exports = LZString);
    // https://fslightbox.com/
    !function (e, t) { if ("object" == typeof exports && "object" == typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else { var n = t(); for (var o in n) ("object" == typeof exports ? exports : e)[o] = n[o] } }(window, (function () { return function (e) { var t = {}; function n(o) { if (t[o]) return t[o].exports; var i = t[o] = { i: o, l: !1, exports: {} }; return e[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports } return n.m = e, n.c = t, n.d = function (e, t, o) { n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o }) }, n.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, n.t = function (e, t) { if (1 & t && (e = n(e)), 8 & t) return e; if (4 & t && "object" == typeof e && e && e.__esModule) return e; var o = Object.create(null); if (n.r(o), Object.defineProperty(o, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var i in e) n.d(o, i, function (t) { return e[t] }.bind(null, i)); return o }, n.n = function (e) { var t = e && e.__esModule ? function () { return e.default } : function () { return e }; return n.d(t, "a", t), t }, n.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, n.p = "", n(n.s = 0) }([function (e, t, n) { "use strict"; n.r(t); var o, i = "fslightbox-", r = "".concat(i, "styles"), s = "".concat(i, "cursor-grabbing"), a = "".concat(i, "full-dimension"), c = "".concat(i, "flex-centered"), l = "".concat(i, "open"), u = "".concat(i, "transform-transition"), d = "".concat(i, "absoluted"), p = "".concat(i, "slide-btn"), f = "".concat(p, "-container"), h = "".concat(i, "fade-in"), m = "".concat(i, "fade-out"), g = h + "-strong", v = m + "-strong", b = "".concat(i, "opacity-"), x = "".concat(b, "1"), y = "".concat(i, "source"); function S(e) { return (S = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e })(e) } "object" === ("undefined" == typeof document ? "undefined" : S(document)) && ((o = document.createElement("style")).className = r, o.appendChild(document.createTextNode(".fslightbox-absoluted{position:absolute;top:0;left:0}.fslightbox-fade-in{animation:fslightbox-fade-in .25s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out{animation:fslightbox-fade-out .25s ease}.fslightbox-fade-in-strong{animation:fslightbox-fade-in-strong .25s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out-strong{animation:fslightbox-fade-out-strong .25s ease}@keyframes fslightbox-fade-in{from{opacity:.65}to{opacity:1}}@keyframes fslightbox-fade-out{from{opacity:.35}to{opacity:0}}@keyframes fslightbox-fade-in-strong{from{opacity:.3}to{opacity:1}}@keyframes fslightbox-fade-out-strong{from{opacity:1}to{opacity:0}}.fslightbox-cursor-grabbing{cursor:grabbing}.fslightbox-full-dimension{width:100%;height:100%}.fslightbox-open{overflow:hidden;height:100%}.fslightbox-flex-centered{display:flex;justify-content:center;align-items:center}.fslightbox-opacity-0{opacity:0!important}.fslightbox-opacity-1{opacity:1!important}.fslightbox-scrollbarfix{padding-right:17px}.fslightbox-transform-transition{transition:transform .3s}.fslightbox-container{font-family:Arial,sans-serif;position:fixed;top:0;left:0;background:linear-gradient(rgba(30,30,30,.9),#000 1810%);z-index:1000000000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.fslightbox-container *{box-sizing:border-box}.fslightbox-svg-path{transition:fill .15s ease;fill:#ddd}.fslightbox-nav{height:45px;width:100%;position:absolute;top:0;left:0}.fslightbox-slide-number-container{display:flex;justify-content:center;align-items:center;position:relative;height:100%;font-size:15px;color:#d7d7d7;z-index:0;max-width:55px;text-align:left}.fslightbox-slide-number-container .fslightbox-flex-centered{height:100%}.fslightbox-slash{display:block;margin:0 5px;width:1px;height:12px;transform:rotate(15deg);background:#fff}.fslightbox-toolbar{position:absolute;z-index:3;right:0;top:0;height:100%;display:flex;background:rgba(35,35,35,.65)}.fslightbox-toolbar-button{height:100%;width:45px;cursor:pointer}.fslightbox-toolbar-button:hover .fslightbox-svg-path{fill:#fff}.fslightbox-slide-btn-container{display:flex;align-items:center;padding:12px 12px 12px 6px;position:absolute;top:50%;cursor:pointer;z-index:3;transform:translateY(-50%)}@media (min-width:476px){.fslightbox-slide-btn-container{padding:22px 22px 22px 6px}}@media (min-width:768px){.fslightbox-slide-btn-container{padding:30px 30px 30px 6px}}.fslightbox-slide-btn-container:hover .fslightbox-svg-path{fill:#f1f1f1}.fslightbox-slide-btn{padding:9px;font-size:26px;background:rgba(35,35,35,.65)}@media (min-width:768px){.fslightbox-slide-btn{padding:10px}}@media (min-width:1600px){.fslightbox-slide-btn{padding:11px}}.fslightbox-slide-btn-container-previous{left:0}@media (max-width:475.99px){.fslightbox-slide-btn-container-previous{padding-left:3px}}.fslightbox-slide-btn-container-next{right:0;padding-left:12px;padding-right:3px}@media (min-width:476px){.fslightbox-slide-btn-container-next{padding-left:22px}}@media (min-width:768px){.fslightbox-slide-btn-container-next{padding-left:30px}}@media (min-width:476px){.fslightbox-slide-btn-container-next{padding-right:6px}}.fslightbox-down-event-detector{position:absolute;z-index:1}.fslightbox-slide-swiping-hoverer{z-index:4}.fslightbox-invalid-file-wrapper{font-size:22px;color:#eaebeb;margin:auto}.fslightbox-video{object-fit:cover}.fslightbox-youtube-iframe{border:0}.fslightbox-loader{display:block;margin:auto;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:67px;height:67px}.fslightbox-loader div{box-sizing:border-box;display:block;position:absolute;width:54px;height:54px;margin:6px;border:5px solid;border-color:#999 transparent transparent transparent;border-radius:50%;animation:fslightbox-loader 1.2s cubic-bezier(.5,0,.5,1) infinite}.fslightbox-loader div:nth-child(1){animation-delay:-.45s}.fslightbox-loader div:nth-child(2){animation-delay:-.3s}.fslightbox-loader div:nth-child(3){animation-delay:-.15s}@keyframes fslightbox-loader{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.fslightbox-source{position:relative;z-index:2;opacity:0}")), document.head.appendChild(o)); function w(e) { var t, n = e.props, o = 0, i = {}; this.getSourceTypeFromLocalStorageByUrl = function (e) { return t[e] ? t[e] : r(e) }, this.handleReceivedSourceTypeForUrl = function (e, n) { !1 === i[n] && (o--, "invalid" !== e ? i[n] = e : delete i[n], 0 === o && (!function (e, t) { for (var n in t) e[n] = t[n] }(t, i), localStorage.setItem("fslightbox-types", JSON.stringify(t)))) }; var r = function (e) { o++, i[e] = !1 }; n.disableLocalStorage ? (this.getSourceTypeFromLocalStorageByUrl = function () { }, this.handleReceivedSourceTypeForUrl = function () { }) : (t = JSON.parse(localStorage.getItem("fslightbox-types"))) || (t = {}, this.getSourceTypeFromLocalStorageByUrl = r) } function L(e, t, n, o) { var i = e.data, r = e.elements.sources, s = n / o, a = 0; this.adjustSize = function () { if ((a = i.maxSourceWidth / s) < i.maxSourceHeight) return n < i.maxSourceWidth && (a = o), c(); a = o > i.maxSourceHeight ? i.maxSourceHeight : o, c() }; var c = function () { r[t].style.width = a * s + "px", r[t].style.height = a + "px" } } function C(e, t) { var n = this, o = e.collections.sourceSizers, i = e.elements, r = i.sourceAnimationWrappers, s = i.sourceMainWrappers, a = i.sources, c = e.resolve; function l(e, n) { o[t] = c(L, [t, e, n]), o[t].adjustSize() } this.runActions = function (e, o) { a[t].classList.add(x), r[t].classList.add(g), s[t].removeChild(s[t].firstChild), l(e, o), n.runActions = l } } function F(e, t) { var n, o = this, i = e.elements.sources, r = e.props, s = (0, e.resolve)(C, [t]); this.handleImageLoad = function (e) { var t = e.target, n = t.naturalWidth, o = t.naturalHeight; s.runActions(n, o) }, this.handleVideoLoad = function (e) { var t = e.target, o = t.videoWidth, i = t.videoHeight; n = !0, s.runActions(o, i) }, this.handleNotMetaDatedVideoLoad = function () { n || o.handleYoutubeLoad() }, this.handleYoutubeLoad = function () { var e = 1920, t = 1080; r.maxYoutubeDimensions && (e = r.maxYoutubeDimensions.width, t = r.maxYoutubeDimensions.height), s.runActions(e, t) }, this.handleCustomLoad = function () { setTimeout((function () { var e = i[t]; s.runActions(e.offsetWidth, e.offsetHeight) })) } } function A(e, t, n) { var o = e.elements.sources, i = e.props.customClasses, r = i[t] ? i[t] : ""; o[t].className = n + " " + r } function E(e, t) { var n = e.elements.sources, o = e.props.customAttributes; for (var i in o[t]) n[t].setAttribute(i, o[t][i]) } function I(e, t) { var n = e.collections.sourceLoadHandlers, o = e.elements, i = o.sources, r = o.sourceAnimationWrappers, s = e.props.sources; i[t] = document.createElement("img"), A(e, t, y), i[t].src = s[t], i[t].onload = n[t].handleImageLoad, E(e, t), r[t].appendChild(i[t]) } function T(e, t) { var n = e.collections.sourceLoadHandlers, o = e.elements, i = o.sources, r = o.sourceAnimationWrappers, s = e.props, a = s.sources, c = s.videosPosters; i[t] = document.createElement("video"), A(e, t, y), i[t].src = a[t], i[t].onloadedmetadata = function (e) { n[t].handleVideoLoad(e) }, i[t].controls = !0, E(e, t), c[t] && (i[t].poster = c[t]); var l = document.createElement("source"); l.src = a[t], i[t].appendChild(l), setTimeout(n[t].handleNotMetaDatedVideoLoad, 3e3), r[t].appendChild(i[t]) } function W(e, t) { var n = e.collections.sourceLoadHandlers, o = e.elements, r = o.sources, s = o.sourceAnimationWrappers, a = e.props.sources; r[t] = document.createElement("iframe"), A(e, t, "".concat(y, " ").concat(i, "youtube-iframe")), r[t].src = "https://www.youtube.com/embed/".concat(a[t].match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2]), r[t].allowFullscreen = !0, E(e, t), s[t].appendChild(r[t]), n[t].handleYoutubeLoad() } function N(e, t) { var n = e.collections.sourceLoadHandlers, o = e.elements, i = o.sources, r = o.sourceAnimationWrappers, s = e.props.sources; i[t] = s[t], A(e, t, "".concat(i[t].className, " ").concat(y)), r[t].appendChild(i[t]), n[t].handleCustomLoad() } function z(e, t) { var n = e.elements, o = n.sources, r = n.sourceAnimationWrappers, s = n.sourceMainWrappers; e.props.sources; o[t] = document.createElement("div"), o[t].className = "".concat(i, "invalid-file-wrapper ").concat(c), o[t].innerHTML = "Invalid source", r[t].classList.add(g), r[t].appendChild(o[t]), s[t].removeChild(s[t].firstChild) } function M(e) { var t = e.collections, n = t.sourceLoadHandlers, o = t.sourcesRenderFunctions, i = e.core.sourceDisplayFacade, r = e.resolve; this.runActionsForSourceTypeAndIndex = function (t, s) { var a; switch ("invalid" !== t && (n[s] = r(F, [s])), t) { case "image": a = I; break; case "video": a = T; break; case "youtube": a = W; break; case "custom": a = N; break; default: a = z }o[s] = function () { return a(e, s) }, i.displaySourcesWhichShouldBeDisplayed() } } function H() { var e, t, n, o = { isUrlYoutubeOne: function (e) { var t = document.createElement("a"); return t.href = e, "www.youtube.com" === t.hostname }, getTypeFromResponseContentType: function (e) { return e.slice(0, e.indexOf("/")) } }; function i() { if (4 !== n.readyState) { if (2 === n.readyState) { var e; switch (o.getTypeFromResponseContentType(n.getResponseHeader("content-type"))) { case "image": e = "image"; break; case "video": e = "video"; break; default: e = "invalid" }n.onreadystatechange = null, n.abort(), t(e) } } else t("invalid") } this.setUrlToCheck = function (t) { e = t }, this.getSourceType = function (r) { if (o.isUrlYoutubeOne(e)) return r("youtube"); t = r, (n = new XMLHttpRequest).onreadystatechange = i, n.open("GET", e, !0), n.send() } } function k(e, t, n) { var o = e.props, i = o.types, r = o.type, s = o.sources, a = e.resolve; this.getTypeSetByClientForIndex = function (e) { var t; return i && i[e] ? t = i[e] : r && (t = r), t }, this.retrieveTypeWithXhrForIndex = function (e) { var o = a(H); o.setUrlToCheck(s[e]), o.getSourceType((function (o) { t.handleReceivedSourceTypeForUrl(o, s[e]), n.runActionsForSourceTypeAndIndex(o, e) })) } } function O(e, t) { var n = e.componentsServices.hideSourceLoaderIfNotYetCollection, o = e.elements, i = o.sourceWrappersContainer, r = o.sourceMainWrappers; r[t] = document.createElement("div"), r[t].className = "".concat(d, " ").concat(a, " ").concat(c), r[t].innerHTML = '<div class="fslightbox-loader"><div></div><div></div><div></div><div></div></div>'; var s = r[t].firstChild; n[t] = function () { r[t].contains(s) && r[t].removeChild(s) }, i.appendChild(r[t]), function (e, t) { var n = e.elements, o = n.sourceMainWrappers, i = n.sourceAnimationWrappers; i[t] = document.createElement("div"), o[t].appendChild(i[t]) }(e, t) } function R(e, t, n, o) { var r = document.createElementNS("http://www.w3.org/2000/svg", "svg"); r.setAttributeNS(null, "width", t), r.setAttributeNS(null, "height", t), r.setAttributeNS(null, "viewBox", n); var s = document.createElementNS("http://www.w3.org/2000/svg", "path"); return s.setAttributeNS(null, "class", "".concat(i, "svg-path")), s.setAttributeNS(null, "d", o), r.appendChild(s), e.appendChild(r), r } function D(e, t) { var n = document.createElement("div"); return n.className = "".concat(i, "toolbar-button ").concat(c), n.title = t, e.appendChild(n), n } function j(e, t) { var n = document.createElement("div"); n.className = "".concat(i, "toolbar"), t.appendChild(n), function (e, t) { var n = e.componentsServices, o = e.core.fullscreenToggler, i = e.data, r = "M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z", s = D(t); s.title = "Enter fullscreen"; var a = R(s, "20px", "0 0 18 18", r); n.enterFullscreen = function () { i.isFullscreenOpen = !0, s.title = "Exit fullscreen", a.setAttributeNS(null, "width", "24px"), a.setAttributeNS(null, "height", "24px"), a.setAttributeNS(null, "viewBox", "0 0 950 1024"), a.firstChild.setAttributeNS(null, "d", "M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z") }, n.exitFullscreen = function () { i.isFullscreenOpen = !1, s.title = "Enter fullscreen", a.setAttributeNS(null, "width", "20px"), a.setAttributeNS(null, "height", "20px"), a.setAttributeNS(null, "viewBox", "0 0 18 18"), a.firstChild.setAttributeNS(null, "d", r) }, s.onclick = function () { i.isFullscreenOpen ? o.exitFullscreen() : o.enterFullscreen() } }(e, n), function (e, t) { var n = D(t, "Close"); n.onclick = e.core.lightboxCloser.closeLightbox, R(n, "20px", "0 0 24 24", "M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z") }(e, n) } function P(e) { var t = e.props.sources, n = e.elements.container, o = document.createElement("div"); o.className = "".concat(i, "nav"), n.appendChild(o), j(e, o), t.length > 1 && function (e, t) { var n = e.componentsServices, o = e.props.sources, r = (e.stageIndexes, document.createElement("div")); r.className = "".concat(i, "slide-number-container"); var s = document.createElement("div"); s.className = c; var a = document.createElement("span"); n.setSlideNumber = function (e) { return a.innerHTML = e }; var l = document.createElement("span"); l.className = "".concat(i, "slash"); var u = document.createElement("div"); u.innerHTML = o.length, r.appendChild(s), s.appendChild(a), s.appendChild(l), s.appendChild(u), t.appendChild(r), setTimeout((function () { s.offsetWidth > 55 && (r.style.justifyContent = "flex-start") })) }(e, o) } function X(e, t) { var n = this, o = e.elements.sourceMainWrappers, i = e.props, r = 0; this.byValue = function (e) { return r = e, n }, this.negative = function () { s(-a()) }, this.zero = function () { s(0) }, this.positive = function () { s(a()) }; var s = function (e) { o[t].style.transform = "translateX(".concat(e + r, "px)"), r = 0 }, a = function () { return (1 + i.slideDistance) * innerWidth } } function B(e, t, n, o) { var i = e.elements.container, r = n.charAt(0).toUpperCase() + n.slice(1), s = document.createElement("div"); s.className = "".concat(f, " ").concat(f, "-").concat(n), s.title = "".concat(r, " slide"), s.onclick = t, function (e, t) { var n = document.createElement("div"); n.className = "".concat(p, " ").concat(c), R(n, "20px", "0 0 20 20", t), e.appendChild(n) }(s, o), i.appendChild(s) } function U(e, t) { var n = e.classList; n.contains(t) && n.remove(t) } function V(e) { var t = this, n = e.core, o = n.eventsDispatcher, i = n.fullscreenToggler, r = n.globalEventsController, s = n.scrollbarRecompensor, a = e.data, c = e.elements, u = e.props, d = e.slideSwipingProps; this.isLightboxFadingOut = !1, this.runActions = function () { t.isLightboxFadingOut = !0, c.container.classList.add(v), r.removeListeners(), u.exitFullscreenOnClose && a.isFullscreenOpen && i.exitFullscreen(), setTimeout((function () { t.isLightboxFadingOut = !1, d.isSwiping = !1, c.container.classList.remove(v), document.documentElement.classList.remove(l), s.removeRecompense(), document.body.removeChild(c.container), o.dispatch("onClose") }), 220) } } function Y(e) { var t, n, o, i = e.collections.sourceMainWrappersTransformers, r = e.componentsServices, s = e.core, a = s.classFacade, c = s.slideIndexChanger, l = s.sourceDisplayFacade, d = s.stageManager, p = e.elements.sourceAnimationWrappers, f = e.stageIndexes, v = (t = function () { a.removeFromEachElementClassIfContains("sourceAnimationWrappers", m) }, n = 250, o = [], function () { o.push(!0), setTimeout((function () { o.pop(), o.length || t() }), n) }); c.changeTo = function (e) { f.current = e, d.updateStageIndexes(), r.setSlideNumber(e + 1), l.displaySourcesWhichShouldBeDisplayed() }, c.jumpTo = function (e) { var t = f.current; c.changeTo(e), a.removeFromEachElementClassIfContains("sourceMainWrappers", u), U(p[t], g), U(p[t], h), p[t].classList.add(m), U(p[e], g), U(p[e], m), p[e].classList.add(h), v(), i[e].zero(), setTimeout((function () { t !== f.current && i[t].negative() }), 220) } } function q(e) { return e.touches ? e.touches[0].clientX : e.clientX } function _(e) { var t = e.core, n = t.lightboxCloser, o = t.fullscreenToggler, i = t.slideChangeFacade; this.listener = function (e) { switch (e.key) { case "Escape": n.closeLightbox(); break; case "ArrowLeft": i.changeToPrevious(); break; case "ArrowRight": i.changeToNext(); break; case "F11": e.preventDefault(), o.enterFullscreen() } } } function J(e) { var t = e.collections.sourceMainWrappersTransformers, n = e.elements, o = e.slideSwipingProps, i = e.stageIndexes; this.runActionsForEvent = function (e) { var t, a, c; n.container.contains(n.slideSwipingHoverer) || n.container.appendChild(n.slideSwipingHoverer), t = n.container, a = s, (c = t.classList).contains(a) || c.add(a), o.swipedX = q(e) - o.downClientX, r(i.current, "zero"), void 0 !== i.previous && o.swipedX > 0 ? r(i.previous, "negative") : void 0 !== i.next && o.swipedX < 0 && r(i.next, "positive") }; var r = function (e, n) { t[e].byValue(o.swipedX)[n]() } } function G(e) { var t, n = e.props.sources, o = e.resolve, i = e.slideSwipingProps, r = o(J), s = (t = !1, function () { return !t && (t = !0, requestAnimationFrame((function () { t = !1 })), !0) }); 1 === n.length ? this.listener = function () { i.swipedX = 1 } : this.listener = function (e) { i.isSwiping && s() && r.runActionsForEvent(e) } } function $(e) { var t = e.collections.sourceMainWrappersTransformers, n = e.core.slideIndexChanger, o = e.elements.sourceMainWrappers, i = e.stageIndexes; this.runPositiveSwipedXActions = function () { void 0 === i.previous || (r("positive"), n.changeTo(i.previous)), r("zero") }, this.runNegativeSwipedXActions = function () { void 0 === i.next || (r("negative"), n.changeTo(i.next)), r("zero") }; var r = function (e) { o[i.current].classList.add(u), t[i.current][e]() } } function K(e, t) { e.contains(t) && e.removeChild(t) } function Q(e) { var t = e.core.lightboxCloser, n = e.elements, o = e.resolve, i = e.slideSwipingProps, r = o($); this.runNoSwipeActions = function () { K(n.container, n.slideSwipingHoverer), i.isSourceDownEventTarget || t.closeLightbox(), i.isSwiping = !1 }, this.runActions = function () { i.swipedX > 0 ? r.runPositiveSwipedXActions() : r.runNegativeSwipedXActions(), K(n.container, n.slideSwipingHoverer), n.container.classList.remove(s), i.isSwiping = !1 } } function Z(e) { var t = e.resolve, n = e.slideSwipingProps, o = t(Q); this.listener = function () { n.isSwiping && (n.swipedX ? o.runActions() : o.runNoSwipeActions()) } } function ee(e) { var t, n, o; n = (t = e).core.classFacade, o = t.elements, n.removeFromEachElementClassIfContains = function (e, t) { for (var n = 0; n < o[e].length; n++)U(o[e][n], t) }, function (e) { var t = e.core.eventsDispatcher, n = e.props; t.dispatch = function (e) { n[e] && n[e]() } }(e), function (e) { var t = e.componentsServices, n = e.core.fullscreenToggler; n.enterFullscreen = function () { t.enterFullscreen(); var e = document.documentElement; e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen && e.msRequestFullscreen() }, n.exitFullscreen = function () { t.exitFullscreen(), document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen() } }(e), function (e) { var t = e.core, n = t.globalEventsController, o = t.windowResizeActioner, i = e.resolve, r = i(_), s = i(G), a = i(Z); n.attachListeners = function () { document.addEventListener("mousemove", s.listener), document.addEventListener("touchmove", s.listener, { passive: !0 }), document.addEventListener("mouseup", a.listener), document.addEventListener("touchend", a.listener, { passive: !0 }), addEventListener("resize", o.runActions), document.addEventListener("keydown", r.listener) }, n.removeListeners = function () { document.removeEventListener("mousemove", s.listener), document.removeEventListener("touchmove", s.listener), document.removeEventListener("mouseup", a.listener), document.removeEventListener("touchend", a.listener), removeEventListener("resize", o.runActions), document.removeEventListener("keydown", r.listener) } }(e), function (e) { var t = e.core.lightboxCloser, n = (0, e.resolve)(V); t.closeLightbox = function () { n.isLightboxFadingOut || n.runActions() } }(e), ne(e), function (e) { var t = e.data, n = e.core.scrollbarRecompensor; n.addRecompense = function () { "complete" === document.readyState ? o() : addEventListener("load", (function () { o(), n.addRecompense = o })) }; var o = function () { document.body.offsetHeight > innerHeight && (document.body.style.marginRight = t.scrollbarWidth + "px") }; n.removeRecompense = function () { document.body.style.removeProperty("margin-right") } }(e), function (e) { var t = e.core, n = t.slideChangeFacade, o = t.slideIndexChanger, i = t.stageManager; e.props.sources.length > 1 ? (n.changeToPrevious = function () { o.jumpTo(i.getPreviousSlideIndex()) }, n.changeToNext = function () { o.jumpTo(i.getNextSlideIndex()) }) : (n.changeToPrevious = function () { }, n.changeToNext = function () { }) }(e), Y(e), function (e) { var t = e.core, n = t.classFacade, o = t.slideSwipingDown, i = e.elements.sources, r = e.slideSwipingProps, s = e.stageIndexes; o.listener = function (e) { r.isSwiping = !0, r.downClientX = q(e), r.swipedX = 0, "VIDEO" === e.target.tagName || e.touches || e.preventDefault(); var t = i[s.current]; t && t.contains(e.target) ? r.isSourceDownEventTarget = !0 : r.isSourceDownEventTarget = !1, n.removeFromEachElementClassIfContains("sourceMainWrappers", u) } }(e), function (e) { var t = e.collections.sourcesRenderFunctions, n = e.core.sourceDisplayFacade, o = e.props, i = e.stageIndexes; function r(e) { t[e] && (t[e](), delete t[e]) } n.displaySourcesWhichShouldBeDisplayed = function () { if (o.loadOnlyCurrentSource) r(i.current); else for (var e in i) r(i[e]) } }(e), function (e) { var t = e.stageIndexes, n = e.core.stageManager, o = e.props.sources.length - 1; n.getPreviousSlideIndex = function () { return 0 === t.current ? o : t.current - 1 }, n.getNextSlideIndex = function () { return t.current === o ? 0 : t.current + 1 }, n.updateStageIndexes = 0 === o ? function () { } : 1 === o ? function () { 0 === t.current ? (t.next = 1, delete t.previous) : (t.previous = 0, delete t.next) } : function () { t.previous = n.getPreviousSlideIndex(), t.next = n.getNextSlideIndex() }, n.isSourceInStage = o <= 2 ? function () { return !0 } : function (e) { var n = t.current; if (0 === n && e === o || n === o && 0 === e) return !0; var i = n - e; return -1 === i || 0 === i || 1 === i } }(e), function (e) { var t = e.collections, n = t.sourceMainWrappersTransformers, o = t.sourceSizers, i = e.core.windowResizeActioner, r = e.data, s = e.elements.sourceMainWrappers, a = e.props, c = e.stageIndexes; i.runActions = function () { innerWidth < 992 ? r.maxSourceWidth = innerWidth : r.maxSourceWidth = .9 * innerWidth, r.maxSourceHeight = .9 * innerHeight; for (var e = 0; e < a.sources.length; e++)U(s[e], u), e !== c.current && n[e].negative(), o[e] && o[e].adjustSize() } }(e) } function te(e) { var t = e.core.eventsDispatcher, n = e.data, o = e.elements, r = e.props.sources; n.isInitialized = !0, function (e) { for (var t = e.collections.sourceMainWrappersTransformers, n = e.props.sources, o = e.resolve, i = 0; i < n.length; i++)t[i] = o(X, [i]) }(e), ee(e), o.container = document.createElement("div"), o.container.className = "".concat(i, "container ").concat(a, " ").concat(g), function (e) { var t = e.elements; t.slideSwipingHoverer = document.createElement("div"), t.slideSwipingHoverer.className = "".concat(i, "slide-swiping-hoverer ").concat(a, " ").concat(d) }(e), P(e), function (e) { var t = e.core.slideSwipingDown, n = e.elements, o = e.props.sources; n.sourceWrappersContainer = document.createElement("div"), n.sourceWrappersContainer.className = "".concat(d, " ").concat(a), n.container.appendChild(n.sourceWrappersContainer), n.sourceWrappersContainer.addEventListener("mousedown", t.listener), n.sourceWrappersContainer.addEventListener("touchstart", t.listener, { passive: !0 }); for (var i = 0; i < o.length; i++)O(e, i) }(e), r.length > 1 && function (e) { var t = e.core.slideChangeFacade; B(e, t.changeToPrevious, "previous", "M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z"), B(e, t.changeToNext, "next", "M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z") }(e), function (e) { for (var t = e.props.sources, n = e.resolve, o = n(w), i = n(M), r = n(k, [o, i]), s = 0; s < t.length; s++)if ("string" == typeof t[s]) { var a = r.getTypeSetByClientForIndex(s); if (a) i.runActionsForSourceTypeAndIndex(a, s); else { var c = o.getSourceTypeFromLocalStorageByUrl(t[s]); c ? i.runActionsForSourceTypeAndIndex(c, s) : r.retrieveTypeWithXhrForIndex(s) } } else i.runActionsForSourceTypeAndIndex("custom", s) }(e), t.dispatch("onInit") } function ne(e) { var t = e.collections.sourceMainWrappersTransformers, n = e.componentsServices, o = e.core, i = o.eventsDispatcher, r = o.lightboxOpener, s = o.globalEventsController, a = o.scrollbarRecompensor, c = o.sourceDisplayFacade, u = o.stageManager, d = o.windowResizeActioner, p = e.data, f = e.elements, h = e.stageIndexes; r.open = function () { var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0; h.current = o, p.isInitialized ? i.dispatch("onShow") : te(e), u.updateStageIndexes(), c.displaySourcesWhichShouldBeDisplayed(), n.setSlideNumber(o + 1), document.body.appendChild(f.container), document.documentElement.classList.add(l), a.addRecompense(), s.attachListeners(), d.runActions(), t[h.current].zero(), i.dispatch("onOpen") } } function oe() { var e = localStorage.getItem("fslightbox-scrollbar-width"); if (e) return e; var t = function () { var e = document.createElement("div"), t = e.style; return t.visibility = "hidden", t.width = "100px", t.msOverflowStyle = "scrollbar", t.overflow = "scroll", e }(), n = function () { var e = document.createElement("div"); return e.style.width = "100%", e }(); document.body.appendChild(t); var o = t.offsetWidth; t.appendChild(n); var i = n.offsetWidth; document.body.removeChild(t); var r = o - i; return localStorage.setItem("fslightbox-scrollbar-width", r.toString()), r } function ie(e, t, n) { return (ie = re() ? Reflect.construct : function (e, t, n) { var o = [null]; o.push.apply(o, t); var i = new (Function.bind.apply(e, o)); return n && se(i, n.prototype), i }).apply(null, arguments) } function re() { if ("undefined" == typeof Reflect || !Reflect.construct) return !1; if (Reflect.construct.sham) return !1; if ("function" == typeof Proxy) return !0; try { return Date.prototype.toString.call(Reflect.construct(Date, [], (function () { }))), !0 } catch (e) { return !1 } } function se(e, t) { return (se = Object.setPrototypeOf || function (e, t) { return e.__proto__ = t, e })(e, t) } function ae(e) { return function (e) { if (Array.isArray(e)) return ce(e) }(e) || function (e) { if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e) }(e) || function (e, t) { if (!e) return; if ("string" == typeof e) return ce(e, t); var n = Object.prototype.toString.call(e).slice(8, -1); "Object" === n && e.constructor && (n = e.constructor.name); if ("Map" === n || "Set" === n) return Array.from(e); if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ce(e, t) }(e) || function () { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }() } function ce(e, t) { (null == t || t > e.length) && (t = e.length); for (var n = 0, o = new Array(t); n < t; n++)o[n] = e[n]; return o } function le() { for (var e = document.getElementsByTagName("a"), t = function (t) { if (!e[t].hasAttribute("data-fslightbox")) return "continue"; var n = e[t].getAttribute("data-fslightbox"), o = e[t].getAttribute("href"); fsLightboxInstances[n] || (fsLightboxInstances[n] = new FsLightbox); var i = null; i = "#" === o.charAt(0) ? document.getElementById(o.substring(1)) : o, fsLightboxInstances[n].props.sources.push(i), fsLightboxInstances[n].elements.a.push(e[t]); var r = fsLightboxInstances[n].props.sources.length - 1; e[t].onclick = function (e) { e.preventDefault(), fsLightboxInstances[n].open(r) }, d("types", "data-type"), d("videosPosters", "data-video-poster"), d("customClasses", "data-class"), d("customClasses", "data-custom-class"); for (var s = ["href", "data-fslightbox", "data-type", "data-video-poster", "data-class", "data-custom-class"], a = e[t].attributes, c = fsLightboxInstances[n].props.customAttributes, l = 0; l < a.length; l++)if (-1 === s.indexOf(a[l].name) && "data-" === a[l].name.substr(0, 5)) { c[r] || (c[r] = {}); var u = a[l].name.substr(5); c[r][u] = a[l].value } function d(o, i) { e[t].hasAttribute(i) && (fsLightboxInstances[n].props[o][r] = e[t].getAttribute(i)) } }, n = 0; n < e.length; n++)t(n); var o = Object.keys(fsLightboxInstances); window.fsLightbox = fsLightboxInstances[o[o.length - 1]] } window.FsLightbox = function () { var e = this; this.props = { sources: [], customAttributes: [], customClasses: [], types: [], videosPosters: [], slideDistance: .3 }, this.data = { isInitialized: !1, maxSourceWidth: 0, maxSourceHeight: 0, scrollbarWidth: oe(), isFullscreenOpen: !1 }, this.slideSwipingProps = { isSwiping: !1, downClientX: null, isSourceDownEventTarget: !1, swipedX: 0 }, this.stageIndexes = {}, this.elements = { a: [], container: null, slideSwipingHoverer: null, sourceWrappersContainer: null, sources: [], sourceMainWrappers: [], sourceAnimationWrappers: [] }, this.componentsServices = { enterFullscreen: null, exitFullscreen: null, hideSourceLoaderIfNotYetCollection: [], setSlideNumber: function () { } }, this.resolve = function (t) { var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []; return n.unshift(e), ie(t, ae(n)) }, this.collections = { sourceMainWrappersTransformers: [], sourceLoadHandlers: [], sourcesRenderFunctions: [], sourceSizers: [] }, this.core = { classFacade: {}, eventsDispatcher: {}, fullscreenToggler: {}, globalEventsController: {}, lightboxCloser: {}, lightboxOpener: {}, lightboxUpdater: {}, scrollbarRecompensor: {}, slideChangeFacade: {}, slideIndexChanger: {}, slideSwipingDown: {}, sourceDisplayFacade: {}, stageManager: {}, windowResizeActioner: {} }, ne(this), this.open = function (t) { return e.core.lightboxOpener.open(t) }, this.close = function () { return e.core.lightboxCloser.closeLightbox() } }, window.fsLightboxInstances = {}, le(), window.refreshFsLightbox = function () { for (var e in fsLightboxInstances) { var t = fsLightboxInstances[e].props; fsLightboxInstances[e] = new FsLightbox, fsLightboxInstances[e].props = t, fsLightboxInstances[e].props.sources = [], fsLightboxInstances[e].elements.a = [] } le() } }]) }));
    ////////////////////////////////////////////////////////////////////////

    const addCss = (css) => {
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        head.appendChild(style);
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    };
    const particles = ['de:', 'dir:', 'tam:', 'txt:', 'sim:', 'gal:'];

    const txtsearch = document.querySelector('.input-topicsearch');
    const btnsearch = document.querySelector('.btn-topicsearch');
    let topicPosts, topicsGroup;

    const init = () => {

        topicPosts = document.querySelector('.topic-posts');
        topicsGroup = document.querySelector('.topics');

        txtsearch.onkeypress = (evt) => {
            if (evt.keyCode == 13) {
                return search();
            }
        };

        btnsearch.onclick = () => {
            return search();
        };

        initUI();

    };

    const initUI = () => {
        // PowerSearch button
        btnsearch.insertAdjacentHTML('afterend', '<button id="btn-power-search" type="button" class="btn btn-primary">Power Search</button>');
        // PowerSearch modal
        addCss('.modal{display:block;position:fixed;content:"";top:0;left:0;right:0;bottom:0;background:rgba(0, 0, 0, 0.6);z-index:-1;opacity:0;transition:opacity 0.2s, z-index 0s 0.2s;text-align:center;white-space:nowrap;-webkit-overflow-scrolling:touch}.modal > *{display:inline-block;white-space:normal;vertical-align:middle;text-align:left}.modal:before{display:inline-block;overflow:hidden;width:0;height:100%;vertical-align:middle;content:""}.modal-visible .modal{z-index:9999;opacity:1;transition:opacity 0.2s}.modal-inner{position:relative;overflow:hidden;max-width:90%;max-height:90%;background:#fff;z-index:-1;opacity:0;transform:scale(0);transition:opacity 0.2s, transform 0.2s, z-index 0s 0.2s;min-width:500px;border-radius:6px}.modal-visible .modal-inner{z-index:100;opacity:1;transform:scale(1);transition:opacity 0.2s, transform 0.2s}#modal-content{padding:50px 70px}');
        const modalHtml = `<div id="hispasonic-power-modal" class="block" style="display: none">
        <div class="header">
            <h2>Búsqueda</h2>
        </div>
        <div class="body">
            <ul class="form">
                <li><label for="hps_de">Usuarios</label>
                    <div><input type="text" class="hps_de" size="30" value="">
                        <div class="desc">Sólo mostrará mensajes de los ousuarios indicados -separados por coma (,)-. Ejemplo: soyuz,carmelo</div>
                    </div>
                </li>
                <li><label for="hps_txt">Con el texto</label>
                    <div><input type="text" class="hps_txt" size="30" value="">
                        <div class="desc">Sólo mostrará mensajes que incluyan el texto indicado</div>
                    </div>
                    <label for="hps_gal">Mostrar galería</label><input type="checkbox" class="hps_gal" value="1">
                </li>
                <li><label for="hps_dir">Mostrar primero</label>
                    <div><select class="hps_dir">
                            <option value="+">Los más antiguos</option>
                            <option value="-">Los más recientes</option>
                        </select>
                    </div>
                </li>
                <li><label for="hps_tam">Tamaño de bloque</label>
                    <div><select class="hps_tam">
                            <option value="5">5 páginas</option>
                            <option value="10">10 páginas</option>
                            <option value="20">20 páginas</option>
                        </select>
                        <div class="desc">Se lanza la búsqueda de 'n en n' páginas</div>
                    </div>
                </li>
                <li><label for="hps_sim">Similares</label>
                    <div><select class="hps_sim">
                            <option value="">No</option>
                            <option value="1">Profundidad 1</option>
                            <option value="3">Profundidad 3</option>
                            <option value="5">Profundidad 5</option>
                        </select>
                        <div class="desc">Rastrea por el árbol de hilos similares</div>
                    </div>
                </li>
                <li>
                    <div style="display: flex;justify-content: center;align-items: center;">
                        <button type="button" class="btn btn-primary" onclick="window.postMessage('hispasonic-power-search', '*');">Buscar</button>
                        <div class="missing-desc power-search-error" style="display: none;">Debes indicar algún usuario o galería o bien búsqueda de hilos similares</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        document.getElementById('btn-power-search').addEventListener('click', () => {
            document.querySelectorAll('.power-search-error').forEach(item => item.style.display = 'none');
            modal.open('hispasonic-power-modal');
        });
        window.addEventListener("message", function (msg) {
            doModalSearch();
        });
    };

    const doModalSearch = () => {
        const de = document.querySelector('.modal-visible .hps_de').value;
        const sim = Number(document.querySelector('.modal-visible .hps_sim').value);
        const gal = document.querySelector('.modal-visible .hps_gal').checked;
        if (!de && !gal && !sim) {
            document.querySelector('.modal-visible .power-search-error').style.display = 'block';
        } else {
            const txt = document.querySelector('.modal-visible .hps_txt').value;
            txtsearch.value = `dir:${document.querySelector('.modal-visible .hps_dir').value} `;
            txtsearch.value += `tam:${document.querySelector('.modal-visible .hps_tam').value} `;
            if (de) txtsearch.value += `de:${de} `;
            if (txt) txtsearch.value += `txt:${txt} `;
            if (sim) txtsearch.value += `sim:${sim} `;
            if (gal) txtsearch.value += 'gal:si';
            modal.close('hispasonic-power-modal');
            search();
        }
    };

    const search = () => {
        const searchValue = txtsearch.value;
        if (searchValue === 'cache:clean') {
            for (let key in localStorage) {
                if (key.startsWith('hispasonic_cache_')) {
                    localStorage.removeItem(key);
                }
            }
            txtsearch.value = '';
            return false;
        }
        if (particles.some((particle) => {
            return searchValue.startsWith(particle);
        })) {
            doSearch(parseSearchValue(searchValue));
            return false;
        }
        return true;
    };

    const parseSearchValue = (searchValue) => {
        const result = {};
        let idxBlank, part;
        while (searchValue.length) {
            switch (true) {
                case searchValue.startsWith('de:'):
                    idxBlank = searchValue.indexOf(' ');
                    part = (idxBlank > 0) ? searchValue.substring(3, idxBlank) : searchValue.substring(3);
                    searchValue = searchValue.substring(4 + part.length);
                    result.de = part.toUpperCase().split(',');
                    break;
                case searchValue.startsWith('dir:'):
                    idxBlank = searchValue.indexOf(' ');
                    part = (idxBlank > 0) ? searchValue.substring(4, idxBlank) : searchValue.substring(4);
                    searchValue = searchValue.substring(5 + part.length);
                    result.dir = part == '+';
                    break;
                case searchValue.startsWith('tam:'):
                    idxBlank = searchValue.indexOf(' ');
                    part = (idxBlank > 0) ? searchValue.substring(4, idxBlank) : searchValue.substring(4);
                    searchValue = searchValue.substring(5 + part.length);
                    part = Number(part);
                    if (Object.is(part, NaN))
                        part = 10;
                    result.tam = part;
                    break;
                case searchValue.startsWith('txt:'):
                    idxBlank = searchValue.indexOf(' ');
                    part = (idxBlank > 0) ? searchValue.substring(4, idxBlank) : searchValue.substring(4);
                    searchValue = searchValue.substring(5 + part.length);
                    result.txt = part.toUpperCase();
                    break;
                case searchValue.startsWith('sim:'):
                    idxBlank = searchValue.indexOf(' ');
                    part = (idxBlank > 0) ? searchValue.substring(4, idxBlank) : searchValue.substring(4);
                    searchValue = searchValue.substring(5 + part.length);
                    part = Number(part);
                    if (Object.is(part, NaN) || part > 5)
                        part = 5;
                    result.sim = part;
                    result.similarPostsUrls = [];
                    break;
                case searchValue.startsWith('gal:si'):
                    idxBlank = searchValue.indexOf(' ');
                    searchValue = searchValue.substring(idxBlank > 0 ? idxBlank + 1 : 6);
                    result.gal = true;
                    break;
            }
        }
        if ((result.de || result.gal) && !result.hasOwnProperty('tam')) {
            result.tam = 10;
        }
        if (!result.hasOwnProperty('dir')) {
            result.dir = true;
        }
        return result;
    };

    const doSearch = (searchInfo) => {
        searchInfo.pageUrl = document.head.querySelector('meta[property="og:url"]').content;
        // calc last page
        if (!document.querySelector('.pagination')) {
            searchInfo.lastPage = 1;
        } else {
            let lastPageElem = document.querySelector('.pagination>li:last-child>a');
            if (lastPageElem) {
                searchInfo.lastPage = Number(lastPageElem.href.substring(lastPageElem.href.lastIndexOf('/pagina') + 7));
            } else {
                searchInfo.lastPage = Number(document.querySelector('.pagination>li:last-child>span').textContent);
            }
        }
        // run search
        if (searchInfo.de || searchInfo.gal) {
            searchUserPosts(searchInfo);
        }
        if (searchInfo.sim) {
            searchSimilarPosts(searchInfo);
        }
    };

    const searchUserPosts = (searchInfo) => {
        // transform paginator
        document.querySelectorAll('.pagination').forEach(pagination => {
            const paginationChildren = pagination.children;
            for (let paginationLi of paginationChildren) {
                paginationLi.style.display = 'none';
            }
            pagination.insertAdjacentHTML('afterbegin', '<li><a class="buscar-mas" style="display:none">buscar m&aacute;s</a></li>');
        });
        document.querySelectorAll('.buscar-mas').forEach(button => {
            button.onclick = () => {
                document.querySelectorAll('.buscar-mas').forEach(btn => {
                    btn.style.display = "none";
                });
                searchInfo.pageNum += searchInfo.dir ? searchInfo.tam : -searchInfo.tam;
                searchInfo.limitPageNumber = searchInfo.pageNum + (searchInfo.dir ? searchInfo.tam - 1 : -searchInfo.tam + 1);
                if (searchInfo.limitPageNumber < 1) searchInfo.limitPageNumber = 1;
                else if (searchInfo.limitPageNumber > searchInfo.lastPage) searchInfo.limitPageNumber = searchInfo.lastPage;
                searchUserPostsInPages(searchInfo);
            };
        });
        if (searchInfo.gal) {
            // build gallery structure
            document.querySelector('.topic-posts').innerHTML = '<div class="topic-post"><div id="topic-gallery" style="overflow: hidden;"></div></div>';
        } else {
            // clean posts
            document.querySelectorAll('.topic-post').forEach(topicPost => {
                topicPost.remove();
            });
        }
        // search user posts
        searchInfo.pageNum = searchInfo.dir ? 1 : searchInfo.lastPage;
        searchInfo.limitPageNumber = searchInfo.pageNum + (searchInfo.dir ? searchInfo.tam - 1 : -searchInfo.tam + 1);
        if (searchInfo.limitPageNumber < 1) searchInfo.limitPageNumber = 1;
        else if (searchInfo.limitPageNumber > searchInfo.lastPage) searchInfo.limitPageNumber = searchInfo.lastPage;
        searchUserPostsInPages(searchInfo);
    };

    const searchUserPostsInPages = (searchInfo) => {
        const url = (searchInfo.pageNum == 1 ? searchInfo.pageUrl : `${searchInfo.pageUrl}/pagina${searchInfo.pageNum}`);
        let pageContent = localStorage[`hispasonic_cache_${url}`];
        if (pageContent) {
            pageContent = LZString.decompress(pageContent);
            processPage(searchInfo, pageContent);
        } else {
            const request = new XMLHttpRequest();
            request.open("GET", url);
            request.onreadystatechange = function () {
                if (request.readyState === 4 && request.status === 200) {
                    let pageContent = request.responseText;
                    if (searchInfo.pageNum != searchInfo.lastPage) {
                        try { localStorage[`hispasonic_cache_${url}`] = LZString.compress(pageContent); } catch (error) { console.log(error); }
                    }
                    processPage(searchInfo, pageContent);
                }
            };
            request.send(null);
        }
    };

    const processPage = (searchInfo, pageContent) => {
        const topicPosts = document.querySelector('.topic-posts');
        const htmlDoc = new DOMParser().parseFromString(pageContent, 'text/html');
        let posts = Array.from(htmlDoc.querySelectorAll('.topic-post'));
        if (!searchInfo.dir) {
            posts = posts.reverse();
        }
        posts.forEach(topicPost => {
            const link = topicPost.querySelector('.content>.header>a[href*="/usuarios/"]');
            const postUrl = topicPost.querySelector('.content>.header>a[href*="/foros/"]').href;
            if (link) {
                const authorUrl = link.href;
                const postAuthor = authorUrl.substring(authorUrl.lastIndexOf('/') + 1);
                if (!searchInfo.de || searchInfo.de.some((user) => {
                    return authorUrl.toUpperCase().indexOf(user) >= 0 || link.innerText.toUpperCase().indexOf(user) >= 0;
                })) {
                    if (!searchInfo.txt || topicPost.textContent.toUpperCase().indexOf(searchInfo.txt) >= 0) {
                        if (searchInfo.gal) {
                            // add images
                            topicPost.querySelectorAll('.content>.richtext img').forEach(image => {
                                if (image.dataset && image.dataset.src && image.dataset.src.indexOf('/smilies/') == -1)
                                    topicPosts.insertAdjacentHTML('beforeend', `<div style="float: left; width: 106px; margin-bottom: 10px; margin-right: 10px;">
                                        <div><a data-fslightbox="gallery" data-type="image" href="${image.dataset.src}"><img src="${image.dataset.src}" class="" width="90" height="90"></a></div>
                                        <div style="text-align: center;"><a href="${postUrl}" class="user-link">${postAuthor}</a></div>
                                        </div>`);
                            });
                            // add youtube
                            topicPost.querySelectorAll(".youtube").forEach(youtube => {
                                topicPosts.insertAdjacentHTML('beforeend', `<div style="float: left; width: 106px; margin-bottom: 10px; margin-right: 10px;">
                                    <div><a data-fslightbox="gallery" data-type="youtube" href="https://www.youtube.com/embed/${youtube.dataset.embed}"><img src="https://img.youtube.com/vi/${youtube.dataset.embed}/hqdefault.jpg" class="" width="90" height="90"></a></div>
                                    <div style="text-align: center;"><a href="${postUrl}" class="user-link">${postAuthor}</a></div>
                                    </div>`);
                            });
                        } else {
                            // fix images
                            topicPost.querySelectorAll('img').forEach(image => {
                                if (image.dataset && image.dataset.src) image.src = image.dataset.src;
                            });
                            // fix youtube
                            topicPost.querySelectorAll(".youtube").forEach(youtube => {
                                const image = new Image();
                                image.src = "https://img.youtube.com/vi/" + youtube.dataset.embed + "/hqdefault.jpg";
                                image.addEventListener("load", function () { youtube.appendChild(image); });
                                youtube.addEventListener("click", function () {
                                    const iframe = document.createElement("iframe");
                                    iframe.setAttribute("frameborder", "0");
                                    iframe.setAttribute("allowfullscreen", "");
                                    iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.dataset.embed + "?rel=0&showinfo=0&autoplay=1");
                                    this.innerHTML = "";
                                    this.appendChild(iframe);
                                });
                            });
                            topicPosts.appendChild(topicPost);
                        }
                    }
                }
            }
        });
        if (searchInfo.gal) {
            refreshFsLightbox();
        }
        searchInfo.pageNum += (searchInfo.dir ? 1 : -1);
        if (searchInfo.pageNum >= 1 && searchInfo.pageNum <= searchInfo.lastPage) {
            if (searchInfo.dir && searchInfo.pageNum <= searchInfo.limitPageNumber ||
                !searchInfo.dir && searchInfo.pageNum >= searchInfo.limitPageNumber) {
                searchUserPostsInPages(searchInfo);
            } else {
                document.querySelectorAll('.buscar-mas').forEach(button => {
                    button.style.display = "block";
                });
            }
        }
    };

    const searchSimilarPosts = (searchInfo) => {
        if (!topicsGroup) return;
        if (!searchInfo.de) {
            topicPosts.style.display = 'none';
        }
        topicsGroup.querySelectorAll('li>.topic>.data>h2>.title>a').forEach(link => {
            searchInfo.similarPostsUrls.push(link.href);
        });
        searchSimilar(searchInfo, searchInfo.similarPostsUrls, 1, searchInfo.sim);

    };

    const searchSimilar = (searchInfo, searchUrls, currentDepth, maxDepth) => {
        if (currentDepth > maxDepth) {
            return;
        }
        searchUrls.forEach(url => {
            let pageContent = localStorage[`hispasonic_cache_${url}`];
            if (pageContent) {
                pageContent = LZString.decompress(pageContent);
                processPageSimilarPosts(url, searchInfo, currentDepth, maxDepth, pageContent);
            } else {
                const request = new XMLHttpRequest();
                request.open("GET", url);
                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        let pageContent = request.responseText;
                        try { localStorage[`hispasonic_cache_${url}`] = LZString.compress(pageContent); } catch (error) { console.log(error); }
                        processPageSimilarPosts(url, searchInfo, currentDepth, maxDepth, pageContent);
                    }
                };
                request.send(null);
            }
        });
    };

    const processPageSimilarPosts = (url, searchInfo, currentDepth, maxDepth, pageContent) => {
        const parentLi = document.querySelector(`li>.topic>.data>h2>.title>a[href="${url.replace('https://www.hispasonic.com', '')}"`).parentNode.parentNode.parentNode.parentNode.parentNode;
        const htmlDoc = new DOMParser().parseFromString(pageContent, 'text/html');

        const simPosts = htmlDoc.querySelectorAll('.topics>li');
        const simPostsUrls = [];

        simPosts.forEach(simPost => {
            simPost.style.marginLeft = `${currentDepth * 20}px`;
            const link = simPost.querySelector('.topic>.data>h2>.title>a');
            const simPostUrl = link.href;
            if (searchInfo.similarPostsUrls.indexOf(simPostUrl) == -1) {
                if (!searchInfo.txt || simPost.textContent.toUpperCase().indexOf(searchInfo.txt) >= 0) {
                    simPost.querySelectorAll('img').forEach(image => {
                        if (image.dataset && image.dataset.src) image.src = image.dataset.src;
                    });
                    //topicsGroup.appendChild(simPost);
                    parentLi.parentNode.insertBefore(simPost, parentLi.nextSibling);
                    simPostsUrls.push(simPostUrl);
                    searchInfo.similarPostsUrls.push(simPostUrl);
                }
            }
        });
        searchSimilar(searchInfo, simPostsUrls, currentDepth + 1, maxDepth);
    };

    if (txtsearch && btnsearch) {
        init();
    }

})();
