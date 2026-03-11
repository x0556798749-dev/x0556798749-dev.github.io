function addRow() {
    const table = document.getElementById("data-table").getElementsByTagName('tbody')[0];

    // 1. מציאת השורה האחרונה הקיימת
    const lastRow = table.rows[table.rows.length - 1];

    // 2. שיכפול השורה (true אומר לשכפל גם את כל מה שבתוכה)
    const newRow = lastRow.cloneNode(true);

    // 3. ניקוי הערכים בשורה החדשה כדי שלא תהיה כפילות של מידע
    const inputs = newRow.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false; // איפוס תיבת סימון
        } else {
            input.value = ""; // איפוס תאריך או טקסט
        }
    });

    const cells = newRow.querySelectorAll('td[contenteditable="true"]');
    cells.forEach(cell => {
        cell.innerText = "-"; // איפוס תאי טקסט עריצים
    });

    // 4. הוספת השורה המשוכפלת לסוף הטבלה
    table.appendChild(newRow);

    // 5. אם יש לך פונקציית שמירה, נקרא לה כאן
    if (typeof saveTable === "function") {
        saveTable();
    }
}