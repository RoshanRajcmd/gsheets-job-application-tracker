📌 Job Application Tracker – Scripts Setup

This project contains two Google Apps Script files that add automation to your job application tracker Google Sheet.

🚀 Features

Follow-Up Tagger

Marks rows with "Follow up!" when the last follow-up date is 7+ days ago.

Popup Reminder

When you open the sheet, shows a popup listing jobs that need follow-up.

Only once per day (per user).

📝 Prerequisites

A Google account with access to Google Sheets.

A job application tracker sheet with these headers in order:

Application ID | Company | Position / Role | Location | Date Applied | Application Link | Job Type | HR Contact Name | HR Contact Email / Linkedin ID | Status | Detailed Status | Follow-Up / Interview Date | No Reply | My Mobile number provided | My Mail ID provided | Version of Resume Provided | Notes | Salary Allocated

⚙️ Setup Instructions
1. Open Script Editor

Open your job tracker Google Sheet.

Go to Extensions → Apps Script.

2. Add the Scripts
📌 File 1: Create and paste the code in file Code.gs
📌 File 2: Create and paste the code in Popup_for_no_update_jobs.gs

3. Save & Authorize

Click Save in Apps Script.

Run each function once (tagFollowUpRows and onOpen) → authorize permissions.

4. Testing

Add a test row with:

Status = "1 - Applied" (or any non-ignored status)

Follow-Up / Interview Date = at least 7 days before today

Run tagFollowUpRows → Column M should show "Follow up!".

Reload the sheet → popup should appear.

5. Daily Usage

tagFollowUpRows can be run manually or on a daily trigger.

onOpen runs automatically whenever the sheet is opened.

📊 Job Application Tracker – Column Reference
Column	Index (for code)	Header Name	Expected Type
A	0	Application ID	String / Number
B	1	Company	String
C	2	Position / Role	String
D	3	Location	String
E	4	Date Applied	Date
F	5	Application Link	URL / String
G	6	Job Type	String
H	7	HR Contact Name	String
I	8	HR Contact Email / Linkedin ID	String / Email / URL
J	9	Status	String (enum)
K	10	Detailed Status	String
L	11	Follow-Up / Interview Date	Date
M	12	No Reply	Auto-filled String
N	13	My Mobile number provided	Boolean (Y/N)
O	14	My Mail ID provided	Boolean (Y/N)
P	15	Version of Resume Provided	String
Q	16	Notes	String (multi-line)
R	17	Salary Allocated	Number / String

🔑 Key Notes:

Index is what you use inside your .getValues() destructuring.

Dates (E, L) should always be actual Date objects in Google Sheets (not plain text).

Columns like Status should be consistent (e.g., "0 - To Applied", "Rejected", etc.).

Column M (No Reply) is where your tagFollowUpRows script writes "Follow up!".