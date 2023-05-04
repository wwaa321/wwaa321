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
        self.table = QTableWidget(0, 4) # add a column for notion
        self.table.setHorizontalHeaderLabels(['时间', '剪贴板内容', '操作', 'notion']) # add a header for notion
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
            notion_button = QPushButton('同步到notion') # add a button for notion
            notion_button.clicked.connect(lambda _, row=row_count: self.on_notion_button_click(row)) # connect the button to a function
            self.table.setItem(row_count, 0, time_item)
            self.table.setItem(row_count, 1, text_item)
            self.table.setCellWidget(row_count, 2, delete_button)
            self.table.setCellWidget(row_count, 3, notion_button) # add the notion button to the table

    def on_delete_button_click(self, row):
        self.table.removeRow(row)

    def on_notion_button_click(self, row):
# add code to sync to notion here
        # 实现这部分同步到notion网站页面的功能
        # 首先需要安装notion-client库，使用pip install notion-client进行安装
        from notion_client import Client
        # 在notion官网中找到自己的token_v2，用于验证身份
        notion = Client(auth="c898753f9c3e12b06e52b77f0bb5766e7620d1dcd4926a21e53ddf2637a9230095a699942af12bc9db85760f1215ef61860f5f6efe235477640378379f198f33ebc304109da0dbc57dfe1245c084")
        # 在notion官网中找到自己的database_id，用于指定同步到哪个数据库
        database_id = "38c830391fa5433bb75d2e9362bb1d8e"
        new_page = {
            "剪贴板内容": {
                "title": [
                    {
                        "text": {
                            "content": text_item.text()
                        }
                    }
                ]
            },
            "时间": {
                "date": {
                    "start": time_item.text()
                }
            }
        }
        notion.pages.create(parent={"database_id": database_id}, properties=new_page)


if __name__ == '__main__':
    app = QApplication(sys.argv)
    clipboard_manager = ClipboardManager()
    clipboard_manager.show()
    apply_stylesheet(app, theme='dark_pink.xml', invert_secondary=True)
    sys.exit(app.exec_())

