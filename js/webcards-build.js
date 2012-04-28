var wc_build = {

  // object reference to the form holding the build fields
  theForm : null,

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
  chosenFont : null,
  
  //preset demo card
  theDemoCard : null,
  
  //flags to determine if an input is valid
  validRecipient : true,
  validTextArea: true,
  validSender : true,
  
  init : function() {

     // locating element nodes and building collections
     wc_build.theForm = wc_global.getObj('buildForm');
     wc_build.theLabels = document.getElementsByTagName('label');
     wc_build.theCounter = wc_global.getObj('counter');
     wc_build.theTextArea = wc_global.getObj('demo_msg');
     wc_build.theRecipient = wc_global.getObj('demo_recip');
     wc_build.theSender = wc_global.getObj('demo_sender');
     wc_build.saveBtn = wc_global.getObj('save');
     wc_build.borderImgs = document.getElementsByTagName('img');
     wc_build.allBorderImgs = wc_build.borderImgs.length;
     wc_build.theFonts = document.getElementsByName('txtstyle');
     wc_build.allFonts = wc_build.theFonts.length;
     wc_build.theDemoCard = wc_global.getObj('democard');
     wc_build.editBtn = wc_global.getObj('editCard');
     
     //set the default border image
     //wc_build.chosenBorderImg = 'Dentist Appt. A Border Image';
     
     //set default font
     //wc_build.chosenFont = 'fun';
     
     wc_build.setDefaults();

     // launching configuration functions
     wc_build.configImgs();
     wc_build.configSaveBtn();
     wc_build.configRadioBtns();
     wc_build.configDemoInputs();
  },
  
  setDefaults : function(){
  
    for (var i=0; i<wc_build.allBorderImgs; i++) {
         if (wc_build.borderImgs[i].className === 'imgBorder'){
            wc_build.chosenBorderImg = wc_build.borderImgs[i].getAttribute('alt');
         }
    }
    
    for (var i=0; i<wc_build.allFonts; i++) {
         if (wc_build.theFonts[i].checked == true) {
            wc_build.chosenFont = wc_build.theFonts[i].value;
         }
     }
     
    wc_build.setBorderAndFont();
  
  },
  
  configRadioBtns : function(){
      
    for (var i=0; i<wc_build.allFonts; i++) {
        wc_global.addEvent(wc_build.theFonts[i], 'click', wc_build.setBorderAndFont);
    }
      
      
  },
  
  // assign event handlers to links surrounding border images
  configImgs : function() {
     for (var i=0; i<this.allBorderImgs; i++) {
         wc_global.addEvent(this.borderImgs[i].parentNode, 'click', this.addImgBorder);
     }
  },
  
  configDemoInputs : function(){
    
    wc_global.addEvent(this.editBtn, 'click', this.startOrStopEdit);
  
  },
  
  startOrStopEdit : function(){
    
    //shortcut to the card
    var theCard = wc_build.theDemoCard;
    
    if (this.value === "Edit Card"){
        
        //grab the text from the paragraphs and put it into variables
        var recipientText = wc_build.theRecipient.firstChild.data;
        var messageText = wc_build.theTextArea.firstChild.data;
        var senderText = wc_build.theSender.firstChild.data;
        
        //create the inputs, and set attributes/styles
        var recipientInput = document.createElement('input');
            recipientInput.type = 'text';
            recipientInput.id = 'recipientInput';
            recipientInput.style.display = 'block';
            recipientInput.value = recipientText;
            recipientInput.size = '30';
            recipientInput.style.margin = '0 0 0 1em';
            
        var messageInput = document.createElement('textarea');
            messageInput.appendChild(document.createTextNode(messageText));
            messageInput.id = 'messageInput';
            messageInput.rows = '7';
            messageInput.style.margin = '10px 0 10px 1em';
            
        var senderInput = document.createElement('input');
            senderInput.type = 'text';
            senderInput.id = 'senderInput';
            senderInput.style.display = 'block';
            senderInput.value = senderText;
            senderInput.size = '30';
            senderInput.style.margin = '0 0 0 1em';

        //hide the paragraphs
        wc_build.theRecipient.hidden = true;
        wc_build.theTextArea.hidden = true;
        wc_build.theSender.hidden = true;
        
        //append the inputs to the card
        theCard.appendChild(recipientInput);
        theCard.appendChild(messageInput);
        theCard.appendChild(senderInput);
        
        //alter the text of the edit card button
        this.value = "Save Changes";
        
        //disable the save button, so they cant save the card mid change
        wc_build.saveBtn.disabled = true;
    }
    
    else {
        //change the value on the edit card button back to the original text
        this.value = "Edit Card";
        
        //grab the inputs, and set their values to variables
        var recipientInput = document.getElementById('recipientInput');
        var recipientInputText = recipientInput.value;
        
        var messageInput = document.getElementById('messageInput');
        var messageInputText = messageInput.value;
        
        var senderInput = document.getElementById('senderInput');
        var senderInputText = senderInput.value;
        
        var hiddenRecip = document.getElementById('recip');
        var hiddenMsg = document.getElementById('msg');
        var hiddenSender = document.getElementById('sender');
        
        //remove the inputs from the card
        theCard.removeChild(recipientInput);
        theCard.removeChild(messageInput);
        theCard.removeChild(senderInput);
        
        //set the new text to the paragraphs
        wc_build.theRecipient.firstChild.data = recipientInputText;
        wc_build.theTextArea.firstChild.data = messageInputText;
        wc_build.theSender.firstChild.data = senderInputText;
        
        //determine if the data is valid, setting flags and classes if not
        if (wc_build.theRecipient.firstChild.data === '' || wc_build.theRecipient.firstChild.data === 'Enter a recipient'){
            wc_build.validRecipient = false;
            wc_build.theRecipient.firstChild.data = 'Enter a recipient';
            wc_build.theRecipient.className = 'error';
        }
        else {
            wc_build.validRecipient = true;
            wc_build.theRecipient.className = '';
            hiddenRecip.value = wc_build.theRecipient.firstChild.data;
        }
        
        if (wc_build.theTextArea.firstChild.data === '' || wc_build.theTextArea.firstChild.data === 'Enter a message'){
            wc_build.validTextArea = false;
            wc_build.theTextArea.firstChild.data = 'Enter a message';
            wc_build.theTextArea.className = 'error';
        }
        else {
            wc_build.validTextArea = true;
            wc_build.theTextArea.className = '';
            hiddenMsg.value = wc_build.theTextArea.firstChild.data;
        }
        
        if (wc_build.theSender.firstChild.data === '' || wc_build.theSender.firstChild.data === 'Enter your name'){
            wc_build.validSender = false;
            wc_build.theSender.firstChild.data = 'Enter your name';
            wc_build.theSender.className = 'error';
        }
        else{
            wc_build.validSender = true;
            wc_build.theSender.className = '';
            hiddenSender.value = wc_build.theSender.firstChild.data;
        }
        
        //display the paragraphs again
        wc_build.theRecipient.hidden = false;
        wc_build.theTextArea.hidden = false;
        wc_build.theSender.hidden = false;
        
        //re-enable the save button
        if (wc_build.validRecipient === true && wc_build.validTextArea === true && wc_build.validSender === true){
            wc_build.saveBtn.disabled = false;
        }
        
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
     wc_build.setBorderAndFont();
  },
  
  setBorderAndFont : function(){
      
     var democard = wc_global.getObj('democard')
     var borderToSet = null;
     var completeClassName = null;
     var borderField = document.getElementById('bordr');
      
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
            wc_build.chosenFont = wc_build.theFonts[i].value;
            wc_build.theLabels[0].className = '';
         }
     }
     
     completeClassName = wc_build.chosenFont + " " + borderToSet;
     
     democard.className = completeClassName;
     
     borderField.value = wc_build.chosenBorderImg;
     
  },

  configSaveBtn : function() { 
    wc_global.addEvent(this.saveBtn, 'click', this.validateSelections);
  },
  
  // checking for proper data existence
  validateSelections : function() {   
     
     // final check
     if (wc_build.validRecipient && wc_build.validTextArea && wc_build.validSender) {
        if (document.getElementById('errorMessage')) {
           wc_build.theForm.removeChild(document.getElementById('errorMessage'));
        }
	
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