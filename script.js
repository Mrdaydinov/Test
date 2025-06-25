// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Функция форматирования даты
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    // Функция получения текущей даты
    function getCurrentDate() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        return `${day}.${month}.${year}`;
    }

    // Функция заполнения тестовыми данными
    function fillSampleData() {
        const sampleData = {
            'lastName': 'Иванов',
            'firstName': 'Иван',
            'middleName': 'Иванович',
            'birthDate': '1985-03-15',
            'position': 'Менеджер по продажам',
            'phone': '+7 (495) 123-45-67',
            'email': 'ivanov@company.com',
            'address': 'г. Москва, ул. Примерная, д. 123, кв. 45',
            'documentNumber': '001/2025',
            'notes': 'Примечание: сотрудник принят на испытательный срок'
        };

        Object.keys(sampleData).forEach((key, index) => {
            setTimeout(() => {
                const element = document.getElementById(key);
                if (element) {
                    element.value = sampleData[key];
                    element.classList.add('filled-input', 'fill-animation');
                    setTimeout(() => {
                        element.classList.remove('fill-animation');
                    }, 300);
                }
            }, index * 100);
        });
    }

    // Функция очистки данных
    function clearData() {
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.value = '';
            input.classList.remove('filled-input');
        });
    }

    // Функция показа предварительного просмотра
    function showPreview() {
        const data = {
            lastName: document.getElementById('lastName').value,
            firstName: document.getElementById('firstName').value,
            middleName: document.getElementById('middleName').value,
            birthDate: formatDate(document.getElementById('birthDate').value),
            position: document.getElementById('position').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            documentNumber: document.getElementById('documentNumber').value,
            notes: document.getElementById('notes').value
        };

        // Заполняем предварительный просмотр
        document.getElementById('preview-docNumber').textContent = data.documentNumber || '001';
        document.getElementById('preview-date').textContent = getCurrentDate();
        document.getElementById('preview-lastName').textContent = data.lastName;
        document.getElementById('preview-firstName').textContent = data.firstName;
        document.getElementById('preview-middleName').textContent = data.middleName;
        document.getElementById('preview-birthDate').textContent = data.birthDate;
        document.getElementById('preview-position').textContent = data.position;
        document.getElementById('preview-phone').textContent = data.phone;
        document.getElementById('preview-email').textContent = data.email;
        document.getElementById('preview-address').textContent = data.address;
        document.getElementById('preview-notes').textContent = data.notes;
        document.getElementById('preview-currentDate').textContent = getCurrentDate();

        // Показываем/скрываем секцию примечаний
        const notesSection = document.getElementById('notesSection');
        if (data.notes.trim()) {
            notesSection.style.display = 'block';
        } else {
            notesSection.style.display = 'none';
        }

        // Показываем окно предварительного просмотра
        document.getElementById('overlay').classList.add('visible');
        document.getElementById('previewWindow').classList.add('preview-visible');
    }

    // Функция скрытия предварительного просмотра
    function hidePreview() {
        document.getElementById('overlay').classList.remove('visible');
        document.getElementById('previewWindow').classList.remove('preview-visible');
    }

    // Функция показа сообщения об успехе
    function showSuccessMessage(message) {
        const successMessage = document.getElementById('successMessage');
        successMessage.textContent = message;
        successMessage.classList.add('visible');
        setTimeout(() => {
            successMessage.classList.remove('visible');
        }, 2000);
    }

    // Функция печати
    function printDocument() {
        const printWindow = window.open('', '_blank');
        const documentContent = document.querySelector('.document-preview').innerHTML;
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Печать документа</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .doc-title { text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 30px; text-transform: uppercase; }
                    .doc-header { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 12px; }
                    .doc-section { margin-bottom: 25px; }
                    .section-title { font-weight: bold; font-size: 14px; margin-bottom: 10px; text-transform: uppercase; }
                    .doc-field { display: flex; margin-bottom: 8px; font-size: 12px; }
                    .field-label { width: 120px; font-weight: 500; }
                    .field-value { flex: 1; border-bottom: 1px solid #999; padding-bottom: 2px; min-height: 16px; }
                    .doc-signature { margin-top: 50px; display: flex; justify-content: space-between; font-size: 12px; }
                    hr { margin: 20px 0; border: 1px solid #000; }
                </style>
            </head>
            <body>
                ${documentContent}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
        
        showSuccessMessage('Документ отправлен на печать');
    }

    // Добавляем обработчики событий для демо кнопок
    document.getElementById('fillBtn').addEventListener('click', fillSampleData);
    document.getElementById('clearBtn').addEventListener('click', clearData);
    document.getElementById('previewBtn').addEventListener('click', showPreview);

    // Добавляем обработчики событий для основных кнопок
    document.getElementById('mainPreviewBtn').addEventListener('click', showPreview);
    document.getElementById('printBtn').addEventListener('click', () => {
        showSuccessMessage('Документ отправлен на печать');
    });
    document.getElementById('mainClearBtn').addEventListener('click', clearData);

    // Добавляем обработчики событий для кнопок предварительного просмотра
    document.getElementById('previewPrintBtn').addEventListener('click', printDocument);
    document.getElementById('closePreviewBtn').addEventListener('click', hidePreview);

    // Закрытие предварительного просмотра при клике на оверлей
    document.getElementById('overlay').addEventListener('click', hidePreview);

    // Предотвращаем закрытие при клике на само окно просмотра
    document.getElementById('previewWindow').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Закрытие предварительного просмотра при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hidePreview();
        }
    });

    // Устанавливаем текущую дату при загрузке
    document.getElementById('preview-date').textContent = getCurrentDate();
    document.getElementById('preview-currentDate').textContent = getCurrentDate();
});
