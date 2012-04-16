var wc_build = {

  // object reference to the form holding the build fields
  theForm : document.getElementById('counter'),

  // labels collection
  theLabels : null,

  // object references related to textarea 
  theCounter : null,
  theTextArea : null,
  
  // object reference to recipient text box
  theRecipient : null,

  // object reference to sender text box
  theSender : null,

  // object reference to save button
  saveBtn : null,
  
  // properties/object references for border images
  borderImgs : null,
  allBorderImgs : null,
  chosenBorderImg : null,
  
  // properties/object references for font settings
  theFonts : null,
  allFonts : null,
  
  //preset demo card
  theDemoCard : null,
  
  init : function() {

     // locating element nodes and building collections
     wc_build.theForm = wc_global.getObj('buildForm');
     wc_build.theLabels = document.getElementsByTagName('label');
     wc_build.theCounter = wc_global.getObj('counter');
     wc_build.theTextArea = wc_global.getObj('msg');
     wc_build.theRecipient = wc_global.getObj('recip');
     wc_build.theSender = wc_global.getObj('sender');
     wc_build.saveBtn = wc_global.getObj('save');
     wc_build.borderImgs = document.getElementsByTagName('img');
     wc_build.allBorderImgs = wc_build.borderImgs.length;
     wc_build.theFonts = document.getElementsByName('txtstyle');
     wc_build.allFonts = wc_build.theFonts.length;
     wc_build.theDemoCard = wc_global.getObj('democard');
     
     //set the default border image
     wc_build.chosenBorderImg = 'Dentist Appt. A Border Image';

     // launching configuration functions
     wc_build.configCounter();
     wc_build.configImgs();
     wc_build.configSaveBtn();
     wc_build.configTextInputs();
     wc_build.configRadioBtns();
  },

  // assign event handler to textarea
  configCounter : function() {
     wc_global.addEvent(this.theTextArea, 'keyup', wc_build.updateCounter);
  },
  
  configTextInputs : function(){
      wc_global.addEvent(this.theRecipient, 'keyup', wc_build.setDemoCard);
      wc_global.addEvent(this.theSender, 'keyup', wc_build.setDemoCard);
  },
  
  configRadioBtns : function(){
      
    for (var i=0; i<wc_build.allFonts; i++) {
        wc_global.addEvent(wc_build.theFonts[i], 'click', wc_build.setDemoCard);
    }
      
      
  },

  // update character count based on textarea data 
  updateCounter : function() {
     var totalCharacters = 300 - this.value.length;
     if (totalCharacters < 0) {
        totalCharacters = 'over';
        wc_build.theCounter.className = 'overLimit';
	wc_build.saveBtn.disabled = true;
     }
     else {
        wc_build.theCounter.className = '';
	wc_build.saveBtn.disabled = false;
     }
     wc_build.theCounter.value = totalCharacters;
     wc_build.setDemoCard();
  },
  
  // assign event handlers to links surrounding border images
  configImgs : function() {
     for (var i=0; i<this.allBorderImgs; i++) {
         wc_global.addEvent(this.borderImgs[i].parentNode, 'click', this.addImgBorder);
     }
  },
  
  // toggle off all image outset borders and then toggle on the border for the clicked image 
  addImgBorder : function(e) {
     for (var i=0; i<wc_build.allBorderImgs; i++) {
         wc_build.borderImgs[i].className = '';
     }  
     this.firstChild.className = 'imgBorder';
     wc_build.chosenBorderImg = this.firstChild.getAttribute('alt');
     wc_build.stopDefault(e);
     wc_build.setDemoCard();
  },
  
  setDemoCard : function(){
      
     var democard = wc_global.getObj('democard')
     var borderToSet = null;
     var fontToSet = null;
     var completeClassName = null;
     
     var demoRecip = wc_global.getObj('demo_recip');
     var demoMsg = wc_global.getObj('demo_msg');
     var demoSender = wc_global.getObj('demo_sender');
      
     switch (wc_build.chosenBorderImg) {
        case "Dentist Appt. A Border Image" :borderToSet = 'dentistA';break;
        case "Dentist Appt. B Border Image" :borderToSet = 'dentistB';break;
        case "Open House A Border Image" :borderToSet = 'houseA';break;
        case "Open House B Border Image" :borderToSet = 'houseB';break;
        case "Vet Appt. A Border Image" :borderToSet = 'vetA';break;
        case "Vet Appt. B Border Image" :borderToSet = 'vetB';break;
        case "Valentine's Day A Border Image" :borderToSet = 'vdA';break;
        case "Valentine's Day B Border Image" :borderToSet = 'vdB';break;
     }
     
     for (var i=0; i<wc_build.allFonts; i++) {
         if (wc_build.theFonts[i].checked == true) {
            fontToSet = wc_build.theFonts[i].value;
            wc_build.theLabels[0].className = '';
         }
     }
     
     completeClassName = fontToSet + " " + borderToSet;
     
     democard.className = completeClassName;
     
     demoRecip.firstChild.data = wc_build.theRecipient.value;
     
     demoMsg.firstChild.data = wc_build.theTextArea.value;

     demoSender.firstChild.data = wc_build.theSender.value;
     
  },

  configSaveBtn : function() { 
    wc_global.addEvent(this.saveBtn, 'click', this.validateSelections);
  },
  
  // checking for proper data existence
  validateSelections : function() {
     
     // font choice validation
     if (!wc_build.fontIsSelected) {wc_build.theLabels[0].className = 'error';}
     for (var i=0; i<wc_build.allFonts; i++) {
         if (wc_build.theFonts[i].checked == true) {
            var chosenFont = wc_build.theFonts[i].value;
            wc_build.theLabels[0].className = '';
         }
     }
     
     // border image validation
     if (!wc_build.chosenBorderImg) {wc_build.theLabels[1].className = 'error';}
     else {wc_build.theLabels[1].className = '';}

     // recipient validation     
     if (wc_build.theRecipient.value != '') { 
         var validRecipient = true; 
         wc_build.theLabels[2].className = '';
     }
     else {wc_build.theLabels[2].className = 'error';}     
     
     // message validation
     if (wc_build.theTextArea.value != '') { 
        var validTextArea = true;
        wc_build.theLabels[3].className = '';
     }
     else {wc_build.theLabels[3].className = 'error';}
     
     // sender validation     
     if (wc_build.theSender.value != '') { 
         var validSender = true; 
         wc_build.theLabels[4].className = '';
     }
     else {wc_build.theLabels[4].className = 'error';}         
     
     // final check
     if (chosenFont && wc_build.chosenBorderImg && validRecipient && validTextArea && validSender) {
        if (document.getElementById('errorMessage')) {
           wc_build.theForm.removeChild(document.getElementById('errorMessage'));
        }
        wc_build.createCookie('font', chosenFont);
        wc_build.createCookie('border', wc_build.chosenBorderImg);
        wc_build.createCookie('recipient', wc_build.theRecipient.value);
        wc_build.createCookie('message', wc_build.theTextArea.value);
        wc_build.createCookie('sender', wc_build.theSender.value);
        wc_build.createCookie('save', true);
	
	window.location.reload();
		
     }
     else {
        if (!document.getElementById('errorMessage')) {
          var errorMsg = document.createElement('p');
          errorMsg.id = 'errorMessage';
          errorMsg.appendChild(document.createTextNode('Missing information is boldface and red.'));
          wc_build.theForm.insertBefore(errorMsg,wc_build.theForm.firstChild)
        }
     }  
  },
  
  // utility function for setting cookies
  createCookie : function(name,value) {
    var data = name + "=" + escape(value);
    document.cookie = data;
  },  
  
  // utility function for stopping structural markup default behavior; disables link hrefs in this case
  stopDefault : function(e) {
     if (!e) {e = window.event;}
     if (!e.preventDefault) {
         e.preventDefault = function() {this.returnValue = false;}
     }
     e.preventDefault();
     return false;
  }

}

// object detection and initializing functionality
if (wc_global.W3CDOM) {
   wc_global.addEvent(window, 'load', wc_build.init);
}