(function($){
    /* プラグイン名（tooltip）を指定 */
    /* 関数にオプション変数を渡す */
    const style = '\
@keyframes bound{\
    0% {transform: translateY(0px);} \
    100% {transform: translateY(-10px);} \
}\
@keyframes strong-bound {\
    0% {\
        transform: scale(1.0, 1.0) translate(0%, 0%);\
    }\
    15% {\
        transform: scale(0.9, 0.9) translate(0%, 5%);\
    }\
    30% {\
        transform: scale(1.3, 0.8) translate(0%, 10%);\
    }\
    50% {\
        transform: scale(0.8, 1.3) translate(0%, -10%);\
    }\
    70% {\
        transform: scale(1.1, 0.9) translate(0%, 5%);\
    }\
    100% {\
        transform: scale(1.0, 1.0) translate(0%, 0%);\
    }\
}\
@keyframes up-rotate{\
  0% {\
      transform: scaleY(2.0) rotateY(90deg);\
  }\
  25% {\
      transform: scaleY(1.0) rotateY(85deg);\
  }\
  50% {\
      transform: scaleY(0.6) rotateY(80deg);\
  }\
  75% {\
      transform: scaleY(2.0) rotateY(75deg);\
  }\
  90% {\
      transform: scaleY(1) rotateY(60deg);\
  }\
  100% {\
      transform: rotateY(0deg);\
  }\
}\
@keyframes reveal-right {\
  0% {\
    width: 0;\
    right: 0;\
  }\
  65% {\
    width: 100%;\
    right: 0;\
  }\
  100% {\
    width: 0;\
    right: 100%;\
  }\
}\
@keyframes reveal-left {\
  0% {\
    width: 0;\
    left: 0;\
  }\
  65% {\
    width: 100%;\
    left: 0;\
  }\
  100% {\
    width: 0;\
    left: 100%;\
  }\
}';
    $("head").append('<style>' + style + '</style>');
    const defaults={
        mode:"in",
        transition: 1,
        primaryColor: "#222",
        secondColor: "#aaa"
    }
    $.fn.easyAnimation=function(options){
        /* 引数の初期値を設定（カンマ区切り） */
        const settings=$.extend({}, defaults, options);
        if (settings.mode == 'reveal-left') {
          $('head').append('<style>.' + this[0].className + '.easy-animation-in > div::before, .' + this[0].className + '.easy-animation-in > div::after { content: ""; position: absolute; top: 0; right: 0;height: 100%; z-index: 10; } </style>');
          $('head').append('<style>.' + this[0].className + '.easy-animation-in > div::before { background-color: ' + settings.primaryColor + '; animation: reveal-left ' + settings.transition + 's ease; } </style>');
          $('head').append('<style>.' + this[0].className + '.easy-animation-in > div::after { background-color: ' + settings.secondColor + '; animation: reveal-left ' + settings.transition * 0.55 + 's ' + settings.transition * 0.33 + 's ease; } </style>'); 
        } else if (settings.mode == 'reveal-right') {
          $('head').append('<style>.' + this[0].className + '.easy-animation-in > div::before, .' + this[0].className + '.easy-animation-in > div::after { content: ""; position: absolute; top: 0; right: 0;height: 100%; z-index: 10; } </style>');
          $('head').append('<style>.' + this[0].className + '.easy-animation-in > div::before { background-color: ' + settings.primaryColor + '; animation: reveal-right ' + settings.transition + 's ease; } </style>');
          $('head').append('<style>.' + this[0].className + '.easy-animation-in > div::after { background-color: ' + settings.secondColor + '; animation: reveal-right ' + settings.transition * 0.55 + 's ' + settings.transition * 0.33 + 's ease; } </style>'); 
        }
        /* 一致した要素上で繰り返す */
        this.each(function(){
            /* 現在の要素を$thisに格納。この場合はtooltipクラスを持つa要素 */
            const $this=$(this);
            const base_opacity = $this.css('opacity');
            const base_transform = $this.css('transform');
            /* 現在の要素のtitle属性の値を格納 */
            switch (settings.mode) {
                case "in":
                    $this.css({'opacity': 0, 'transition': settings.transition + 's'});
                    break;
                case 'up':
                    $this.css({'opacity': 0, 'transition': settings.transition + 's', 'transform': 'translate(0, 50%)'});
                    break;
                case 'left':
                    $this.css({'opacity': 0, 'transition': settings.transition + 's', 'transform': 'translate(-50%, 0)'});
                    break;
                case 'right':
                    $this.css({'opacity': 0, 'transition': settings.transition + 's', 'transform': 'translate(50%, 0)'});
                    break;
                case 'up-stairs':
                    $this.wrapInner('<div>');
                    var $inner=$this.children('div');
                    var h = $inner.height();
                    $inner.css({'overflow':'hidden','display':'flex','align-items':'center'});
                    $inner.children().addBack().contents().each(function() {
                      const text=$(this).text();
                      $(this).replaceWith(text.replace(/(\S)/g, '<span>$1</span>'));
                    });
                    $inner.children('span').css({'display':'inline-block','transition':'.7s','position':'relative','top':`${h}px`});
                    break;
                case 'up-rotate':
                    $this.wrapInner('<div>');
                    var $inner=$this.children('div');
                    $inner.css({'overflow':'hidden','display':'flex','align-items':'center'});
                    $inner.children().addBack().contents().each(function() {
                      const text=$(this).text();
                      $(this).replaceWith(text.replace(/(\S)/g, '<span>$1</span>'));
                    });
                    $inner.children('span').css({'opacity': 0});
                    break;
                case 'reveal-left':
                  $this.wrapInner('<div>');
                  $inner = $this.children('div');
                  $inner.wrapInner('<div>');
                  $inner.css({'position': 'relative', 'display': 'inline-block'});
                  $inner.children('div').css({'opacity': 0, 'transition': '.1s ' + settings.transition * 0.55 + 's'});
                  break;
                case 'reveal-right':
                  $this.wrapInner('<div>');
                  $inner = $this.children('div');
                  $inner.wrapInner('<div>');
                  $inner.css({'position': 'relative', 'display': 'inline-block'});
                  $inner.children('div').css({'opacity': 0, 'transition': '.1s ' + settings.transition * 0.55 + 's'});
                  break;


            }
            $this.on("inview", function (event, isInView) {
                if (isInView) {
                    switch (settings.mode) {
                        case 'bound':
                            $this.css({'animation': 'bound .3s ease infinite alternate'});
                            break;
                        case 'strong-bound':
                            $this.css({'animation': 'strong-bound 0.8s linear 0s'});
                            break;
                        case 'up-stairs':
                            var $inner=$this.children('div');
                            for (var i = 0; i <= $inner.text().replace(/\s+/g,'').length; i++) {
                              $inner.children(`span:nth-of-type(${i+1})`).delay(i*80).queue(function(){
                                $(this).css('top', '0');
                              })
                            };
                            break;
                        case 'up-rotate':
                            var $inner=$this.children('div');
                            for (var i = 0; i <= $inner.text().replace(/\s+/g,'').length; i++) {
                              $inner.children(`span:nth-of-type(${i+1})`).delay(i*30).queue(function(){
                                $(this).css({'animation': 'up-rotate .15s ease alternate', 'opacity': base_opacity,});
                              })
                            };
                            break;
                        case 'reveal-left':
                          $inner = $this.children('div');
                          $inner.children('div').css({'opacity': base_opacity});
                          $this.addClass('easy-animation-in');
                          break;
                        case 'reveal-right':
                          $inner = $this.children('div');
                          $inner.children('div').css({'opacity': base_opacity});
                          $this.addClass('easy-animation-in');
                          break;
                        default:
                            $(this).stop().css({'opacity': base_opacity, 'transform': base_transform });
                            break;
                    }
                }
              });
        });
        /* jQueryオブジェクトを返す */
        return this;
    }

})(jQuery);

/**
 * author Christopher Blum
 *    - based on the idea of Remy Sharp, http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 *    - forked from http://github.com/zuk/jquery.inview/
 */
 (function (factory) {
    if (typeof define == 'function' && define.amd) {
      // AMD
      define(['jquery'], factory);
    } else if (typeof exports === 'object') {
      // Node, CommonJS
      module.exports = factory(require('jquery'));
    } else {
        // Browser globals
      factory(jQuery);
    }
  }(function ($) {

    var inviewObjects = [], viewportSize, viewportOffset,
        d = document, w = window, documentElement = d.documentElement, timer;

    $.event.special.inview = {
      add: function(data) {
        inviewObjects.push({ data: data, $element: $(this), element: this });
        // Use setInterval in order to also make sure this captures elements within
        // "overflow:scroll" elements or elements that appeared in the dom tree due to
        // dom manipulation and reflow
        // old: $(window).scroll(checkInView);
        //
        // By the way, iOS (iPad, iPhone, ...) seems to not execute, or at least delays
        // intervals while the user scrolls. Therefore the inview event might fire a bit late there
        //
        // Don't waste cycles with an interval until we get at least one element that
        // has bound to the inview event.
        if (!timer && inviewObjects.length) {
           timer = setInterval(checkInView, 250);
        }
      },

      remove: function(data) {
        for (var i=0; i<inviewObjects.length; i++) {
          var inviewObject = inviewObjects[i];
          if (inviewObject.element === this && inviewObject.data.guid === data.guid) {
            inviewObjects.splice(i, 1);
            break;
          }
        }

        // Clear interval when we no longer have any elements listening
        if (!inviewObjects.length) {
           clearInterval(timer);
           timer = null;
        }
      }
    };

    function getViewportSize() {
      var mode, domObject, size = { height: w.innerHeight, width: w.innerWidth };

      // if this is correct then return it. iPad has compat Mode, so will
      // go into check clientHeight/clientWidth (which has the wrong value).
      if (!size.height) {
        mode = d.compatMode;
        if (mode || !$.support.boxModel) { // IE, Gecko
          domObject = mode === 'CSS1Compat' ?
            documentElement : // Standards
            d.body; // Quirks
          size = {
            height: domObject.clientHeight,
            width:  domObject.clientWidth
          };
        }
      }

      return size;
    }

    function getViewportOffset() {
      return {
        top:  w.pageYOffset || documentElement.scrollTop   || d.body.scrollTop,
        left: w.pageXOffset || documentElement.scrollLeft  || d.body.scrollLeft
      };
    }

    function checkInView() {
      if (!inviewObjects.length) {
        return;
      }

      var i = 0, $elements = $.map(inviewObjects, function(inviewObject) {
        var selector  = inviewObject.data.selector,
            $element  = inviewObject.$element;
        return selector ? $element.find(selector) : $element;
      });

      viewportSize   = viewportSize   || getViewportSize();
      viewportOffset = viewportOffset || getViewportOffset();

      for (; i<inviewObjects.length; i++) {
        // Ignore elements that are not in the DOM tree
        if (!$.contains(documentElement, $elements[i][0])) {
          continue;
        }

        var $element      = $($elements[i]),
            elementSize   = { height: $element[0].offsetHeight, width: $element[0].offsetWidth },
            elementOffset = $element.offset(),
            inView        = $element.data('inview');

        // Don't ask me why because I haven't figured out yet:
        // viewportOffset and viewportSize are sometimes suddenly null in Firefox 5.
        // Even though it sounds weird:
        // It seems that the execution of this function is interferred by the onresize/onscroll event
        // where viewportOffset and viewportSize are unset
        if (!viewportOffset || !viewportSize) {
          return;
        }

        if (elementOffset.top + elementSize.height > viewportOffset.top &&
            elementOffset.top < viewportOffset.top + viewportSize.height &&
            elementOffset.left + elementSize.width > viewportOffset.left &&
            elementOffset.left < viewportOffset.left + viewportSize.width) {
          if (!inView) {
            $element.data('inview', true).trigger('inview', [true]);
          }
        } else if (inView) {
          $element.data('inview', false).trigger('inview', [false]);
        }
      }
    }

    $(w).on("scroll resize scrollstop", function() {
      viewportSize = viewportOffset = null;
    });

    // IE < 9 scrolls to focused elements without firing the "scroll" event
    if (!documentElement.addEventListener && documentElement.attachEvent) {
      documentElement.attachEvent("onfocusin", function() {
        viewportOffset = null;
      });
    }
  }));
