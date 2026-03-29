// Trilium Next 快捷键扩展
// 功能1: Ctrl+[ 减少缩进，Ctrl+] 增加缩进
// 功能2: Alt+1~6 设置标题，Alt+0 设置正文

document.addEventListener('keydown', function(e) {
    // 获取编辑器实例
    const editorElement = document.querySelector('.ck-editor__editable');
    if (!editorElement || !editorElement.ckeditorInstance) return;
    
    const editor = editorElement.ckeditorInstance;
    
    // ========================================
    // Ctrl+[ 和 Ctrl+] 缩进控制
    // ========================================
    if (e.ctrlKey && !e.altKey && !e.shiftKey) {
        if (e.key === '[') {
            e.preventDefault();
            editor.execute('outdent');
            return;
        }
        else if (e.key === ']') {
            e.preventDefault();
            editor.execute('indent');
            return;
        }
    }
    
    // ========================================
    // Alt + 数字键 设置标题/正文
    // ========================================
    if (e.altKey && !e.ctrlKey && !e.shiftKey) {
        const key = e.key;
        const validKeys = ['0', '1', '2', '3', '4', '5', '6'];
        if (!validKeys.includes(key)) return;
        
        e.preventDefault();
        
        const commandMap = {
            '1': 'heading2',
            '2': 'heading3',
            '3': 'heading4',
            '4': 'heading5',
            '5': 'heading6',
            '0': 'paragraph'
        };
        
        editor.execute( 'heading', { value: commandMap[key] });
        return;
    }
});
