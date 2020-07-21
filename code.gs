const C_FORM_ID = '1nGvvEzQHN1n3CmKxVZ0rcjO65jOI4HjqV8FzemoiYQA';
const C_FORM_RESPONSES_SHEET = 'Form Responses 1';
const C_COLUMN_4_RESPONSEID = 1; // the column for masting of form responses URLs

// sample https://docs.google.com/spreadsheets/d/1le6FmDl3UBDsrZQH_-Db0DrrSU4bvRcF4150zarsgbQ

///////////////////////////////////////////////// The code to launch the form
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('My Form')
      .addItem('Show', 'launchTheForm_')
      .addToUi();
}

// to launch the form
function launchTheForm_() {
  // create a form-template object
  let html = HtmlService.createTemplateFromFile('form').evaluate().setWidth(650).setHeight(1331);  
  // show the form to user
  SpreadsheetApp.getUi().showModelessDialog(html, 'Move the form ☩');    
}


///////////////////////////////////////////////// Form iteration with HTML-form
function getSelectedFormResponse() {
  var file =SpreadsheetApp.getActive();
  var activeRange = file.getActiveRange();
  var range = file.getActiveSheet().getRange(activeRange.getRow(), C_COLUMN_4_RESPONSEID); // change column to your if needed
  var value = range.getValue();
  return { value: value, url: getFormPrefilledUrl_(C_FORM_ID, value) };
}
function getFormPrefilledUrl_(formId, responseId)
{
  try {
  var form = FormApp.openById(formId);
  var response = form.getResponse(responseId);
  return response.toPrefilledUrl() + '&edit2=' + responseId + '&embedded=true';
  }
  catch(err) {
    return false; 
  }
}


//////////////////////////////////////////////// The code to get form edit URL
// Create a new trigger to run this funciton onFormSubmit
function addResponseUrl_(e) {
  var formResponses = {};        
  formResponses[C_FORM_RESPONSES_SHEET] =
    //          ^ sheet name where form responses are pasted
    {
      column: C_COLUMN_4_RESPONSEID,  // the column for masting of form responses URLs
      formId: C_FORM_ID
    };
  // add more forms if multiple forms are linked to the sheet.


  // use try...catch to see script errors
  try
  {    
    // The range of form response event
    // https://developers.google.com/apps-script/guides/triggers/events#form-submit
    var range = e.range;
    // event row
    var row = range.getRow();
    // sheet of the event
    var sheet = range.getSheet();  
    // sets
    var info = formResponses[sheet.getName()];
    // the form
    var form = FormApp.openById(info.formId);
    // the response
    var responseId = form.getResponses()[form.getResponses().length - 1].getId();
    // range to write results
    var rTo = sheet.getRange(row, info.column);
    // write reults
    rTo.setValue(responseId);
  }
  catch(e)
  {
    // Log the error
    Logger.log(e);
    // throw error to see it in email
    throw e;
  }
  // success
  return 0;
}
