# 📌 Job Application Tracker Setup Guide

This guide explains how to set up the **Google Sheets Job Application Tracker** along with the Google Apps Scripts that automate follow-up reminders.

---

## ⚙️ Setup Steps

1. **Prepare the Google Sheet**
   - Create a new Google Sheet.
   - Add the following headers in **Row 1**:

     ```
     Application ID | Company | Position / Role | Location | Date Applied | Application Link | Job Type | HR Contact Name | HR Contact Email / Linkedin ID | Status | Detailed Status | Follow-Up / Interview Date | No Reply | My Mobile number provided | My Mail ID provided | Version of Resume Provided | Notes | Salary Allocated
     ```

2. **Open Script Editor**
   - In Google Sheets, click **Extensions > Apps Script**.
   - Create two script files:
     - `followUpReminder.gs` → Popup reminder script.
     - `tagFollowUpRows.gs` → Auto-tag rows for follow-up.

3. **Add the Scripts codes of mine**

4. **Authorize Scripts**
   - The first time you run the script, Google will ask for authorization.
   - Accept and allow it to run.

5. **Test**
   - Enter a row with a `Follow-Up / Interview Date` at least **7 days old** and a status other than `"0 - To Applied"` or `"Rejected"`.
   - Reload the sheet → you should see a popup reminder.

---

## 📊 Column Reference Table

| Column | Index (for code) | Header Name                       | Expected Type        |
|--------|------------------|-----------------------------------|----------------------|
| A      | 0                | Application ID                    | String / Number      |
| B      | 1                | Company                           | String               |
| C      | 2                | Position / Role                   | String               |
| D      | 3                | Location                          | String               |
| E      | 4                | Date Applied                      | Date                 |
| F      | 5                | Application Link                  | URL / String         |
| G      | 6                | Job Type                          | String               |
| H      | 7                | HR Contact Name                   | String               |
| I      | 8                | HR Contact Email / Linkedin ID    | String / Email / URL |
| J      | 9                | Status                            | String (enum)        |
| K      | 10               | Detailed Status                   | String               |
| L      | 11               | Follow-Up / Interview Date        | Date                 |
| M      | 12               | No Reply                          | Auto-filled String   |
| N      | 13               | My Mobile number provided         | Boolean (Y/N)        |
| O      | 14               | My Mail ID provided               | Boolean (Y/N)        |
| P      | 15               | Version of Resume Provided        | String               |
| Q      | 16               | Notes                             | String (multi-line)  |
| R      | 17               | Salary Allocated                  | Number / String      |

---

✅ Done! Your sheet will now automatically remind you of jobs that need follow-up and mark them in the **No Reply** column or whenever you open the sheet.
