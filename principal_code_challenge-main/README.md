# Sample App for Component 2 of the 2023 Principal TC Certification

## Guidance

### Prototype Use Case

This prototype application is for a customer using HubSpot for their business selling professional service SKUs (B2B). This customer also sometimes works with freelance solution partners (individuals, identified by email). Under certain circumstances, freelance solution partners can "reserve" company domains (which gives them some exclusivity, e.g. the customer won't pitch net-new SKUs to that account, and other solution partners cannot sell to it).

This prototype provides a CRM Card on the contact record of a freelance solution partner. The card lists the SKUs (identified by line item name) we are already selling to any of the solution partner's "reserved" companies. The customer's reps use this contextual information when discussing account strategies with the solution partner.

Domain reservations happens via a complicated process outside of HubSpot, and are stored in the customer's on-premise systems. The customer has a recurring batch job that exports the reservations to a CSV file, which is the only way the customer's IT was able to make that information available on the internet. It contains the solumns "email", "domain", and "context" (the last of which is not relevant for this prototype). In this prototype, that CSV file is accessed at a hardcoded URL, with no authentication.

### Implementation notes

This prototype is derived from other React-based UI Extension sample apps published by HubSpot (https://github.com/HubSpot/ui-extensions-examples ), though heavily and zanily modified.

This prototype uses a single external dependency (https://www.npmjs.com/package/text-to-svg ), which renders the output JSON as an image on the CRM card. You don't need to understand the details of this dependency for completing the exercises. When making your own modifications to this prototype, you should not add any additional external dependencies (i.e. any other NPM packages).

### How to Approach the Exercises

Some of these exercises may be quite hard, and you may run out of time. That's OK. The purpose of these exercises is to give you a chance to demonstrate your skills, and to give us a chance to see how you approach a problem. The most important points to keep in mind:

* Show your work: if you make a code modification or try something out, show and explain it in your Zoom recording. Even if it doesn't work, sound reasoning and troubleshooting will earn partial credit. Even a perfect solution will need to be explained on the Zoom to earn full credit.
* Some exercises have an "ADVANCED" option. To really impress, you should try to complete those sections along with the rest of the exercise. But if you are out of your depth or you run out of time, prioritize answering every exercise, even if you have to skip some of the "ADVANCED" sections.
* Your Zoom is a piece of technical documentation, not a polished demo. Your language should be as precise as possible. Acknowledge limitations or uncertainties. Use appropriate technical terms, but avoid (or explain) jargon. 
* Imagine as your audience a technically proficient with good programming skills and HubSpot platform knowledge, but is no JavaScript or React expert and may not be fully up to date on HubSpot's latest developer-centric features.
* Be clear which exercise you are addressing at any given time. If you run out of time, you may skip an exercise, but please don't jump around between exercises.

You may also want to review the general description (incl. assessment criteria) in the "Portfolio Component 2: Sample App with Custom Code Challenge" section of the Principal TC Certification documentation Google Doc.

### Deliverables

Your key deliverable for this component is a Zoom recording of you walking through your solutions to the exercises below. The recording should be no longer than 30 minutes. You should share your screen and show your work.

If you modify or add to the code of this prototype, you should also submit a link to the final version of your code. For example, you could turn it into a ZIP file and upload it to Google Drive and share with me (please do not upload it to a public GitHub repo).

### Deadline and Submission

You should submit all your deliverables within 48 hours of receiving this information (not including weekends or public holidays). If you need more time, please let me know.

Importantly, your total time spend on this component should be no more than 2.5 hours (2 hours of preparation, and 30 minutes to record your Zoom). As a matter of fairness to other folks participating in this certification, and to ensure the results are meaningful and comparable, please hold yourself to this time limit. Thank you.

If you have already completed Component 1, then please just submit "Principal TC Certification -- Portfolio Submission" Google form. If you need more time for Component 1, please share your deliverables for Component 2 with me via Slack within the 48 hour deadline, and then submit the Google form once you have completed Component 1.

## Setup

### Create a suitable environment with sample data

1. Create a developer sandbox (attached to your HubSpotter portal)
2. In the sandbox, create a contact with email address "viktor.brech@gmail.com"
3. Create a company with domain "ibm.com" (note that this company need not be associated with the contact)
4. Create a deal associated with the company (but not the contact). Add some line items to that deal.

### Deploy this project

Deployment is the same as for all sample UI Extension projects HubSpot have published. Typically, the basic steps are as follows:

1. Install dependencies (npm install)
2. Upload the project via the CLI (hs project upload)
3. Add the CRM Card created by this project to the contact record.
4. Verify that when you go to the record of contact "viktor.brech@gmail.com", you should see the "Principal Challenge Card".

## Exercises

### Exercise 1

Deploy the app in your sandbox. Demonstrate how to make "live edits" to the app via local development. Are there alternative ways of deploying the app?

### Exercise 2

Study and understand the code of this prototype application (mostly the "Challenge.jsx", "fetch-data.js" and "render-text.js" files).

What happens when either of the buttons are pressed; what data flows from where to where, which computation occurs and on what computer, and how is the UI updated?

(ADVANCED) If you can, create a *third* button in the UI that implements the following functionality: when pressed, it should fetch the CSV file, match it to line items, and display the result in the UI (Note that this is *equivalent* to first pushing the "Update Source Data" button, and then pushing the "Show SKUs" button).

### Exercise 3

Critique the UI of this prototype. Can you think of a better way to present the information in the UI? Suggest specific suitable React components for this purpose.

(ADVANCED) If you can, you may critique the source code of this application: what is unclear or weird, what could be improved, what is missing, etc. You may also suggest alternative implementations. Note you are *NOT* supposed to critique the design of the UI or its external functionality, only the implementation (i.e. the code).

### Exercise 4

The "main" function of the "fetch-data.js" file is a serverless function turns a "text" parameter into a data URI (which is then used to render an image in the UI).

Prove that this function works correctly for particular input texts. Specifically, the text "HS" should result in the following data URI (which encodes an SVG image of the letters H and S):

    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTU3MC45MDkwOTA5MDkwOTAzIiBoZWlnaHQ9Ijg4LjM2MzYzNjM2MzYzNjM3Ij48cGF0aCBmaWxsPSJyZWQiIHN0cm9rZT0iYmxhY2siIGQ9Ik0xNS4xOSAxOS42NEwxNC40MCA0MS44M0w5LjAzIDQxLjgzTDguMjUgMTkuNjRMMTUuMTkgMTkuNjRaTTMxLjAzIDE5LjY0TDMwLjI0IDQxLjgzTDI0Ljg3IDQxLjgzTDI0LjA5IDE5LjY0TDMxLjAzIDE5LjY0Wk00OS4xNiA0MS43Nkw2OC42NiA0MS43Nkw2OC42NiAxOS42NEw3NC4xNiAxOS42NEw3NC4xNiA3Mkw2OC42NiA3Mkw2OC42NiA0Ni44N0w0OS4xNiA0Ni44N0w0OS4xNiA3Mkw0My42NiA3Mkw0My42NiAxOS42NEw0OS4xNiAxOS42NEw0OS4xNiA0MS43NlpNOTguMTggNzIuOTJROTMuNTMgNzIuOTIgOTAuNTIgNzIuMTNRODcuNTEgNzEuMzUgODUuNDggNjkuNTVRODMuNDUgNjcuNzUgODEuODggNjQuNTRMODEuODggNjQuNTRMODYuMDcgNjAuNjFRODcuMjUgNjMuNTYgODguNTkgNjUuMDZRODkuOTMgNjYuNTcgOTIuMTMgNjcuMjJROTQuMzIgNjcuODggOTguMTggNjcuODhMOTguMTggNjcuODhRMTAyLjI0IDY3Ljg4IDEwNC40MyA2Ni45M1ExMDYuNjMgNjUuOTggMTA3LjU0IDYzLjc1UTEwOC40NiA2MS41MyAxMDguNDYgNTcuNDBMMTA4LjQ2IDU3LjQwUTEwOC40NiA1NC40NiAxMDcuNTEgNTIuNjlRMTA2LjU2IDUwLjkyIDEwNC4zNyA0OS42NVExMDIuMTcgNDguMzcgOTcuODUgNDYuOTNMOTcuODUgNDYuOTNROTIuMTYgNDUuMTAgODkuMDggNDMuMjdRODYuMDEgNDEuNDMgODQuNjcgMzguOThRODMuMzIgMzYuNTIgODMuMzIgMzIuNzNMODMuMzIgMzIuNzNRODMuMzIgMjcuNDkgODQuNzMgMjQuNDVRODYuMTQgMjEuNDAgODkuMzUgMjAuMDZROTIuNTUgMTguNzIgOTguMTggMTguNzJMOTguMTggMTguNzJRMTA0LjQ3IDE4LjcyIDEwNy43NyAyMC4zMlExMTEuMDggMjEuOTMgMTEzLjM3IDI2LjA1TDExMy4zNyAyNi4wNUwxMDkuNTEgMzAuMjRRMTA4LjMzIDI3LjYyIDEwNy4wNSAyNi4yNVExMDUuNzcgMjQuODcgMTAzLjc1IDI0LjMyUTEwMS43MiAyMy43NiA5OC4xOCAyMy43Nkw5OC4xOCAyMy43NlE5NC40NSAyMy43NiA5Mi40NSAyNC41NVE5MC40NiAyNS4zMyA4OS42NCAyNy4yNlE4OC44MiAyOS4xOSA4OC44MiAzMi43M0w4OC44MiAzMi43M1E4OC44MiAzNS4yOCA4OS42NyAzNi43OVE5MC41MiAzOC4yOSA5Mi41MiAzOS4zN1E5NC41MiA0MC40NSA5OC41MSA0MS42OUw5OC41MSA0MS42OVExMDQuNDcgNDMuNTMgMTA3Ljc3IDQ1LjQ5UTExMS4wOCA0Ny40NSAxMTIuNTIgNTAuMjRRMTEzLjk2IDUzLjAyIDExMy45NiA1Ny40MEwxMTMuOTYgNTcuNDBRMTEzLjk2IDYzLjIzIDExMi40NSA2Ni41N1ExMTAuOTUgNjkuOTEgMTA3LjU0IDcxLjQxUTEwNC4xNCA3Mi45MiA5OC4xOCA3Mi45Mkw5OC4xOCA3Mi45MlpNMTMzLjAwIDE5LjY0TDEzMi4yMiA0MS44M0wxMjYuODUgNDEuODNMMTI2LjA3IDE5LjY0TDEzMy4wMCAxOS42NFpNMTQ4Ljg0IDE5LjY0TDE0OC4wNiA0MS44M0wxNDIuNjkgNDEuODNMMTQxLjkxIDE5LjY0TDE0OC44NCAxOS42NFoiLz48L3N2Zz4='

An easy way to accomplish this is to simply hard-code the input text "HS" at a suitable place in the application code and then check the "src" attribute of the rendered output image in the UI (via the browser's developer tools).

(ADVANCED) A better way to accomplish this is to create JS file to the application that imports the "main" function from "fetch-data.js" and calls it with suitable mock inputs, including the "text" parameter with value "HS". You can then run this file with Node.js to verify the output.

(Note: If you are good with Node you can also write a proper "unit test" instead, but please don't add any additional dependencies to the project)

### Exercise 5

Suppose that instead of a CSV file, the customer's IT department would be able to provide a JSON API, which requires a simple GET request to https://vbrech-3967897.hs-sites.com/_hcms/api/one?portalid=3967897 (no authentication necessary). The API returns a JSON object with the following response structure:

    {
        "message": {
            "viktor.brech@gmail.com": [
                "ibm.com",
                "sap.com"
            ],
            "notviktorbrech@gmail.com": [
                "att.com"
            ]
        }
    }

Amend the "fetch-data.js" file to fetch the data from this API instead of the CSV file. You may assume that the API always returns a valid response (i.e. no error handling necessary), and that it always returns all results in a single response (i.e. no paging necessary).

To solve this exercise, you may have to modify or replace a combination of the following functions inside the "fetch-data.js" file: "fetchCSV", "parseCSVAsMapArray", "processData"