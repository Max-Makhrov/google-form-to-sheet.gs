# google-form-to-sheet.gs

How to embed Google Form to the sheet and use it as an interface for a custom HTML-form.

![](https://user-images.githubusercontent.com/19220852/88045462-3c26f200-cb57-11ea-9a88-7a3253ad0d63.gif)

Installation:

1.  Create a new Google Sheet
2.  Create a new Google Form within the Sheet
3.  Create a new script project
4.  Create 2 files: `code.gs` and `form.html` and copy the code from this repo.
5.  Edit first lines od the code: enter your form id and your sheet name with form responses
6.  Add a new column before column A in your sheet with form responses. This is the column for form ids.
7.  Create a new installable trigger on form submit with a function `addResponseUrl_`
