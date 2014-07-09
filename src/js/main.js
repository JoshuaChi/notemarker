var notemarker = (
  function(){
    var text = "";
    var pos = {};
    var selected = false;
    return {
      stopEvent: function(e) {
        if(!e) var e = window.event;
        
        //e.cancelBubble is supported by IE - this will kill the bubbling process.
        e.cancelBubble = true;
        e.returnValue = false;

        //e.stopPropagation works only in Firefox.
        if (e.stopPropagation) {
          e.stopPropagation();
          e.preventDefault();
        }
        return false;
      },
      position: function(e){
          var posX = 0;
          var posY = 0;
          if (!e) var e = window.event;
          if (e.pageX || e.pageY)   {
            posX = e.pageX;
            posY = e.pageY;
          }
          else if (e.clientX || e.clientY)  {
            posX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
          }
          this.pos = {"x":posX, "y":posY};
      },
      clearSelection: function(){
        if (window.getSelection) {
          if (window.getSelection().empty) {  // Chrome
            window.getSelection().empty();
          } else if (window.getSelection().removeAllRanges) {  // Firefox
            window.getSelection().removeAllRanges();
          }
        } else if (document.selection) {  // IE?
          document.selection.empty();
        }
      },
      mouseUpListener: function(e) {
        console.log("mouseUpListener");
        var self = notemarker;
        var range = (document.all) ? document.selection.createRange(): document.getSelection();
        // self.selectionListener(range);
        self.text =  (document.all) ? range.text : range.toString();
        self.position(e);
        if(false == self.selected && '' != self.text && undefined != self.text) {
          self.selected = true;
          self.showLightBox();
        }
        else {
          self.selected = false;
          self.clearSelection();
          self.hideLightBox();
        }
        return self.stopEvent(e);
      },
      init: function(){
        this.createLightBox();
        document.onmouseup = this.mouseUpListener;
        if (!document.all) {
          document.captureEvents(Event.MOUSEUP);
        }
      },
      createLightBox: function(){
        if(!document.getElementById("_nmlb_")) {
          var self = this;
          document.body.innerHTML += '<div id="_nmlb_" class="_hlm_"><div class="_hlmi_"><ul><li id="_hlmib1_"><button><span>+</span></button></li><li id="_hlmib2_"><button><span>T</span></button></li></ul></div></div>';
          
          document.getElementById("_hlmib1_").addEventListener('mouseup', function(e) {
            console.log('_hlmib1_');
            return self.stopEvent(e);
          });
          document.getElementById("_hlmib2_").addEventListener('mouseup', function(e) {
            console.log('_hlmib2_');
            return self.stopEvent(e);
          });
        }
      },
      showLightBox: function(){
        var lightbox = document.getElementById("_nmlb_");
        lightbox.style.visibility = 'visible';
        lightbox.style.display = 'block';
        lightbox.style.top = this.pos.y;
        lightbox.style.left = this.pos.x;
      },
      hideLightBox: function(){
        var lightbox = document.getElementById("_nmlb_");
        lightbox.style.visibility = 'invisible';
        lightbox.style.display = 'none';
        lightbox.style.top = "0px";
        lightbox.style.left = "0px";
      },
      selectionListener: function(ele){
        ele.addEventListener('click', function() {
          self.hideLightBox();
          return self.stopEvent(e);
        });
      }
    }
  }
)();

notemarker.init();
