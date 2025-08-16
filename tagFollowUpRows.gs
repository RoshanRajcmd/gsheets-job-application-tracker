function onEdit(e) {
  addInterviewPrepReminder();
  tagFollowUpRows(); 
}

//If the last updated/ Interview date is 2 days or within markit in reminder
function addInterviewPrepReminder() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();

  const statusCol = 10; // J - Status
  const interviewDateCol = 12; // L - Follow-Up Date (used as interview date here)
  const notesCol = 17; // P - Notes

  const statuses = sheet.getRange(2, statusCol, lastRow - 1).getValues();
  const dates = sheet.getRange(2, interviewDateCol, lastRow - 1).getValues();
  const notes = sheet.getRange(2, notesCol, lastRow - 1).getValues();

  const today = new Date();
  const prepPrefix = "🧠 Reminder:";

  for (let i = 0; i < statuses.length; i++) {
    const status = statuses[i][0];
    const interviewDate = dates[i][0];
    const currentNote = notes[i][0] || "";
    const noteCell = sheet.getRange(i + 2, notesCol); // row index adjusted

    const hasPrepNote = currentNote.includes(prepPrefix);

    // Match any of these statuses for interview prep
    const interviewStages = [
      "2 - Online Assessment",
      "3 - Coding Round 1",
      "4 - Coding Round 2",
      "5 - Technical Round",
      "6 - HR Round"
    ];

    if (interviewStages.includes(status) && interviewDate instanceof Date) {
      const daysLeft = Math.ceil((interviewDate - today) / (1000 * 60 * 60 * 24));

      if (daysLeft <= 2 && daysLeft >= 0) {
        const prepMessage = `${prepPrefix} Interview in ${daysLeft} day(s)! Time to prep!`;

        if (!hasPrepNote) {
          // Append reminder to existing notes
          const updatedNote = currentNote
            ? currentNote + '\n' + prepMessage
            : prepMessage;
          noteCell.setValue(updatedNote);
        } else {
          // Replace only the reminder line, keep other notes
          const updatedNote = currentNote
            .split('\n')
            .map(line => line.startsWith(prepPrefix) ? prepMessage : line)
            .join('\n');
          noteCell.setValue(updatedNote);
        }
        continue;
      }
    }

    // If interview no longer applies or is too far, remove only the reminder line
    if (hasPrepNote) {
      const cleanedNote = currentNote
        .split('\n')
        .filter(line => !line.startsWith(prepPrefix))
        .join('\n')
        .trim();
      noteCell.setValue(cleanedNote);
    }
  }
}

//If the last updated date is 7 days or great then mark for follow up 
function tagFollowUpRows() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();

  const lastFollowedUpDates = sheet.getRange(2, 12, lastRow - 1).getValues(); // Column Ls
  const noReplyRange = sheet.getRange(2, 13, lastRow - 1); // Column M

  const today = new Date();

  const tags = lastFollowedUpDates.map(([date]) => 
    (date instanceof Date && Math.floor((today - date) / (1000 * 60 * 60 * 24)) >= 7) 
      ? ["Follow up!"] 
      : [""]
  );

  noReplyRange.setValues(tags);
}