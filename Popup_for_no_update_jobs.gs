function onOpen() {
    const userProps = PropertiesService.getUserProperties();
    const today = new Date().toDateString();
    if (userProps.getProperty("lastFollowUpReminder") === today) return; // already shown today

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return; // no data rows

    // Pull A:L (12 columns) so indexes match exactly
    const data = sheet.getRange(2, 1, lastRow - 1, 12).getValues();

    const ignoredStatuses = new Set(["", "0 - To Applied", "Rejected"]);
    const now = new Date();
    const dayMs = 1000 * 60 * 60 * 24;

    const followUpJobs = [];

    data.forEach(([id, company, jobTitle, , , , , , , status, , followUpDate]) => {
        if (
            !ignoredStatuses.has(status) &&
            followUpDate instanceof Date &&
            Math.floor((now - followUpDate) / dayMs) >= 7
        ) {
            followUpJobs.push(`• ${id} - ${company} — ${jobTitle}`);
        }
    });

    if (followUpJobs.length) {
        SpreadsheetApp.getUi().alert(
            "Hey! 👋 Just a heads up — It's been a week since your last follow-up for the following jobs. Consider reaching out again:\n\n" +
            followUpJobs.join("\n")
        );
        userProps.setProperty("lastFollowUpReminder", today);
    }
}
