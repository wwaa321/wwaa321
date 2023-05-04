import sys
from PyQt5.QtWidgets import QApplication, QWidget, QTableWidget, QTableWidgetItem, QPushButton, QVBoxLayout
from PyQt5.QtCore import Qt, QDateTime, QMimeData
from PyQt5.QtGui import QClipboard
from qt_material import apply_stylesheet

class ClipboardManager(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('系统剪贴板管理工具')
        self.setGeometry(100, 100, 450, 500)
        self.clipboard = QApplication.clipboard()
        self.clipboard.dataChanged.connect(self.on_clipboard_change)
        self.table = QTableWidget(0, 3)
        self.table.setHorizontalHeaderLabels(['时间', '剪贴板内容', '操作'])
        self.layout = QVBoxLayout()
        self.layout.addWidget(self.table)
        self.setLayout(self.layout)
        
       

    def on_clipboard_change(self):
        mime_data = self.clipboard.mimeData()
        if mime_data.hasText():
            row_count = self.table.rowCount()
            self.table.insertRow(row_count)
            time_item = QTableWidgetItem(QDateTime.currentDateTime().toString(Qt.DefaultLocaleLongDate))
            text_item = QTableWidgetItem(mime_data.text())
            delete_button = QPushButton('删除')
            delete_button.clicked.connect(lambda _, row=row_count: self.on_delete_button_click(row))
            self.table.setItem(row_count, 0, time_item)
            self.table.setItem(row_count, 1, text_item)
            self.table.setCellWidget(row_count, 2, delete_button)

    def on_delete_button_click(self, row):
        self.table.removeRow(row)

if __name__ == '__main__':
    app = QApplication(sys.argv)
    clipboard_manager = ClipboardManager()
    clipboard_manager.show()
    apply_stylesheet(app, theme='dark_pink.xml', invert_secondary=True)
    sys.exit(app.exec_())
