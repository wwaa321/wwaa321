// 获取DOM元素
const templateSelect = document.getElementById('template');
const pagesInput = document.getElementById('pages');
const generateButton = document.getElementById('generate');
const templatePreview = document.getElementById('templatePreview');

// A4纸张尺寸（毫米转换为点）
const A4_WIDTH = 210 * 2.83465; // 210mm
const A4_HEIGHT = 297 * 2.83465; // 297mm

// 更新预览
function updatePreview() {
    templatePreview.className = 'template-preview';
    templatePreview.classList.add(`preview-${templateSelect.value}`);
}

// 生成横线模板
function drawLines(doc, pageWidth, pageHeight) {
    const lineHeight = 30; // 行高（点）
    const margin = 50; // 页边距（点）
    
    doc.setDrawColor(200, 200, 200); // 设置线条颜色为浅灰色
    doc.setLineWidth(0.1);

    for (let y = margin; y < pageHeight - margin; y += lineHeight) {
        doc.line(margin, y, pageWidth - margin, y);
    }
}

// 生成点阵模板
function drawDots(doc, pageWidth, pageHeight) {
    const dotSpacing = 20; // 点间距（点）
    const margin = 50; // 页边距（点）
    
    doc.setFillColor(200, 200, 200); // 设置点的颜色为浅灰色

    for (let x = margin; x < pageWidth - margin; x += dotSpacing) {
        for (let y = margin; y < pageHeight - margin; y += dotSpacing) {
            doc.circle(x, y, 0.5, 'F');
        }
    }
}

// 生成康奈尔笔记模板
function drawCornell(doc, pageWidth, pageHeight) {
    const margin = 50; // 页边距
    const cueColumnWidth = (pageWidth - 2 * margin) * 0.3; // 左侧提示列宽度
    const summaryHeight = (pageHeight - 2 * margin) * 0.15; // 底部总结区域高度
    
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);

    // 绘制左侧提示列
    doc.line(margin + cueColumnWidth, margin, margin + cueColumnWidth, pageHeight - margin - summaryHeight);
    
    // 绘制底部总结区域
    doc.line(margin, pageHeight - margin - summaryHeight, pageWidth - margin, pageHeight - margin - summaryHeight);
    
    // 添加标题文字
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);

    // 使用内置的等宽字体
    doc.setFont('courier', 'normal');
    
    // 添加文字
    doc.text('Tips', margin + 10, margin + 20);
    doc.text('Notes', margin + cueColumnWidth + 10, margin + 20);
    doc.text('Summary', margin + 10, pageHeight - margin - summaryHeight + 20);
}

// 生成方格网格模板
function drawGrid(doc, pageWidth, pageHeight) {
    const gridSize = 20; // 网格大小
    const margin = 50; // 页边距
    
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.1);

    // 绘制垂直线
    for (let x = margin; x <= pageWidth - margin; x += gridSize) {
        doc.line(x, margin, x, pageHeight - margin);
    }

    // 绘制水平线
    for (let y = margin; y <= pageHeight - margin; y += gridSize) {
        doc.line(margin, y, pageWidth - margin, y);
    }
}

// 生成子弹笔记模板
function drawBullet(doc, pageWidth, pageHeight) {
    const lineHeight = 30; // 行高
    const margin = 50; // 页边距
    const bulletMargin = 30; // 子弹点缩进
    
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.1);

    // 绘制横线
    for (let y = margin; y < pageHeight - margin; y += lineHeight) {
        doc.line(margin, y, pageWidth - margin, y);
    }

    // 绘制子弹点
    doc.setFillColor(200, 200, 200);
    for (let y = margin - 5; y < pageHeight - margin; y += lineHeight) {
        doc.circle(margin + bulletMargin/2, y, 1, 'F');
    }
}

// 生成日程计划模板
function drawSchedule(doc, pageWidth, pageHeight) {
    const margin = 50; // 页边距
    const headerHeight = 40; // 标题区域高度
    const timeSlotHeight = 60; // 时间槽高度
    const columnWidth = (pageWidth - 2 * margin) / 3; // 分成三列
    
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.1);

    // 绘制标题区域
    doc.setFillColor(245, 245, 245);
    doc.rect(margin, margin, pageWidth - 2 * margin, headerHeight, 'F');
    
    // 绘制时间格线
    for (let y = margin + headerHeight; y < pageHeight - margin; y += timeSlotHeight) {
        doc.line(margin, y, pageWidth - margin, y);
    }

    // 绘制垂直分隔线
    for (let x = margin; x <= pageWidth - margin; x += columnWidth) {
        doc.line(x, margin, x, pageHeight - margin);
    }

    // 添加标题文字
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    
    // 使用内置的等宽字体
    doc.setFont('courier', 'normal');
    
    // 添加文字
    doc.text('Task', margin + 10, margin + 25);
    doc.text('Time', margin + columnWidth + 10, margin + 25);
    doc.text('Notes', margin + 2 * columnWidth + 10, margin + 25);
}

// 生成会议记录模板
function drawMeeting(doc, pageWidth, pageHeight) {
    const margin = 50; // 页边距
    const contentWidth = pageWidth - 2 * margin;
    
    // 设置字体和颜色
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(44, 62, 80);
    
    // 标题
    doc.text('Meeting Minutes', pageWidth/2, margin + 15, { align: 'center' });
    
    // 添加装饰线
    doc.setDrawColor(52, 152, 219);
    doc.setLineWidth(0.5);
    doc.line(margin + 50, margin + 20, pageWidth - margin - 50, margin + 20);
    
    // 设置表格样式
    doc.setDrawColor(189, 195, 199);
    doc.setLineWidth(0.1);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(52, 73, 94);
    
    const startY = margin + 35;
    const lineHeight = 15;
    const colWidth = (contentWidth) / 4;
    
    // 辅助函数：绘制带底色的单元格
    function drawCell(x, y, width, height, text, fillColor = [245, 247, 250]) {
        doc.setFillColor(...fillColor);
        doc.rect(x, y, width, height, 'F');
        doc.setDrawColor(189, 195, 199);
        doc.rect(x, y, width, height, 'S');
        doc.text(text, x + 5, y + height/2 + 3);
    }
    
    // 第一行
    drawCell(margin, startY, colWidth * 2, lineHeight, 'Meeting Title:');
    drawCell(margin + colWidth * 2, startY, colWidth * 2, lineHeight, 'Date & Time:');
    
    // 第二行
    drawCell(margin, startY + lineHeight, colWidth * 2, lineHeight, 'Location:');
    drawCell(margin + colWidth * 2, startY + lineHeight, colWidth * 2, lineHeight, 'Recorder:');
    
    // 参会人员
    drawCell(margin, startY + lineHeight * 2, contentWidth, lineHeight, 'Attendees:', [235, 245, 255]);
    
    // 会议议题
    drawCell(margin, startY + lineHeight * 3, contentWidth, lineHeight * 2, 'Agenda Items:', [235, 245, 255]);
    
    // 会议内容标题
    const contentTitleY = startY + lineHeight * 5 + 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(44, 62, 80);
    doc.text('Meeting Notes:', margin, contentTitleY);
    
    // 添加装饰线
    doc.setDrawColor(52, 152, 219);
    doc.setLineWidth(0.3);
    doc.line(margin, contentTitleY + 2, margin + 80, contentTitleY + 2);
    
    // 绘制内容区域的横线
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.1);
    const contentStartY = contentTitleY + 30;  // 增加标题与第一条线的距离
    const lineSpacing = 20;  // 增加行间距
    
    for (let y = contentStartY; y < pageHeight - margin; y += lineSpacing) {
        doc.line(margin, y, pageWidth - margin, y);
    }
}

// 生成PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
    });

    const pages = parseInt(pagesInput.value) || 1;
    const template = templateSelect.value;

    // 生成每一页
    for (let i = 0; i < pages; i++) {
        if (i > 0) {
            doc.addPage();
        }

        switch (template) {
            case 'lines':
                drawLines(doc, A4_WIDTH, A4_HEIGHT);
                break;
            case 'dots':
                drawDots(doc, A4_WIDTH, A4_HEIGHT);
                break;
            case 'cornell':
                drawCornell(doc, A4_WIDTH, A4_HEIGHT);
                break;
            case 'grid':
                drawGrid(doc, A4_WIDTH, A4_HEIGHT);
                break;
            case 'bullet':
                drawBullet(doc, A4_WIDTH, A4_HEIGHT);
                break;
            case 'schedule':
                drawSchedule(doc, A4_WIDTH, A4_HEIGHT);
                break;
            case 'meeting':
                drawMeeting(doc, A4_WIDTH, A4_HEIGHT);
                break;
        }
    }

    // 下载PDF
    const templateTypes = {
        'lines': '横线',
        'dots': '点阵',
        'cornell': '康奈尔',
        'grid': '方格',
        'bullet': '子弹',
        'schedule': '日程',
        'meeting': '会议记录'
    };
    doc.save(`${templateTypes[template]}笔记本_${pages}页.pdf`);
}

// 语言切换功能
let currentLanguage = localStorage.getItem('language') || 'zh_CN';

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    updateContent();
    updateLanguageSelector();
}

function updateLanguageSelector() {
    document.querySelectorAll('.language-selector a').forEach(link => {
        if (link.getAttribute('data-lang') === currentLanguage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        let translation = translations[currentLanguage];
        
        // 处理嵌套的翻译键
        const keys = key.split('.');
        for (const k of keys) {
            translation = translation[k];
        }
        
        if (element.tagName === 'OPTION') {
            element.text = translation;
        } else {
            element.textContent = translation;
        }
    });

    // 更新页面标题
    document.title = translations[currentLanguage].title;
}

// 初始化语言
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLanguage);
});

// 事件监听
templateSelect.addEventListener('change', updatePreview);
generateButton.addEventListener('click', generatePDF);

// 初始化预览
updatePreview();
