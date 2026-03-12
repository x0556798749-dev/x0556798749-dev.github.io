

function exportToJSON(contacts) {
    // המרת המערך למחרוזת JSON עם רווחים לקריאות (נוח לבדיקה)
    const jsonData = JSON.stringify(contacts, null, 2);

    // יצירת Blob והורדה (בדומה ל-CSV)
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "crm_data_backup.json");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function loadFromJSON(jsonString) {
    try {
        const importedData = JSON.parse(jsonString);

        // בדיקה בסיסית שהנתונים הם אכן מערך
        if (Array.isArray(importedData)) {
            contacts = importedData; // עדכון המערך הגלובלי
            donors = importedData;
            renderTable();           // ריענון הטבלה במסך
            if (typeof updateCharts === 'function') updateCharts(); // ריענון גרפים אם קיימים
            alert("הנתונים נטענו בהצלחה!");
            alert(contacts.importedData)
        }
    } catch (e) {
        console.error("שגיאה בטעינת הנתונים:", e);
        alert("קובץ לא תקין.");
    }
}

function openJSONFilePicker() {
    // יצירת אלמנט קלט של קובץ באופן דינמי
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json, application/json'; // הגבלה לבחירת קובצי JSON בלבד

    // האזנה לאירוע בחירת הקובץ
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];

        // אם המשתמש סגר את החלון בלי לבחור קובץ
        if (!file) {
            return;
        }

        // יצירת קורא קבצים
        const reader = new FileReader();

        // מה קורה כשהקריאה מסתיימת בהצלחה
        reader.onload = function (e) {
            const jsonString = e.target.result;
            // קריאה לפונקציה שלך עם המחרוזת שנקראה מהקובץ
            loadFromJSON(jsonString);
        };

        // מה קורה במקרה של שגיאה בקריאת הקובץ (למשל קובץ פגום)
        reader.onerror = function () {
            console.error("שגיאה בקריאת הקובץ");
            alert("אירעה שגיאה בקריאת הקובץ מהמחשב.");
        };

        // התחלת קריאת הקובץ כטקסט
        reader.readAsText(file);
    });

    // פתיחת חלון בחירת הקבצים
    fileInput.click();
}

function userSave() {
    const myTableData = { info: "some data from table" };

    window.saveData(getTableDataAsJSON(), "testFiles", "test");
}