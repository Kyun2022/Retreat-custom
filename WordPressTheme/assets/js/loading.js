"use strict";

/* --------------------------------------------
  /* ローディングアニメーション
  /* -------------------------------------------- */

var defaultQueryList = {
  mobile: matchMedia('(max-width: 768px'),
  pc: matchMedia('(min-width: 769px)')
};
function routingByBreakpoint(sourceList) {
  for (var i = 0, l = sourceList.length; i < l; i++) {
    var source = sourceList[i];
    if (!(source.dataset.query && defaultQueryList[source.dataset.query] && source.dataset.src)) continue;
    if (!defaultQueryList[source.dataset.query].matches) continue;
    var newSource = document.createElement('source');
    newSource.src = source.dataset.src;
    source.parentElement.appendChild(newSource);
  }
}

//txt分割
function txtSplit(el) {
  //https://sinciate.co.jp/media/2999/
  var content = el.textContent;
  var text = content.trim();
  var newHtml = '';
  text.split('').forEach(function (v) {
    newHtml += '' + v + '';
  });
  el.innerHTML = newHtml;
}
window.addEventListener('load', function (e) {
  Splittargets = document.querySelectorAll('.split');
  for (var i = 0; i < Splittargets.length; i++) {
    txtSplit(Splittargets[i]);
  }
  var tl = gsap.timeline();
  tl.to('.reveal-1', {
    y: '-100%'
  }).from('.loading-wrap .split span', {
    y: '100%',
    duration: 0.5,
    stagger: 0.04
  }, '<').to('.loading-wrap .split span', {
    y: '-100%',
    duration: 0.5,
    stagger: 0.04
  }, '+=1');
});