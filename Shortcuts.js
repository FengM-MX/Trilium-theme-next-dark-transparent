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


// ========================================
//  单击笔记链接在新标签页打开，Ctrl+单击覆盖当前标签页
// ========================================

function openNoteInNewTab(e) {
    // 查找被点击的笔记标题元素
    const noteTitle = e.target.closest('.fancytree-title');
    if (!noteTitle) return;

    // 向上查找包含笔记 ID 的 li 元素
    // const treeItem = noteTitle.closest('li[role="treeitem"]');
    // if (!treeItem) return;
    
    // Ctrl+点击：覆盖当前标签页（默认行为）
    if (e.ctrlKey) {
        return;
    }else if (e.button === 1) {
         // 中键点击：由浏览器原生处理
        return;
    }else{
        // 普通单击：阻止默认行为，在新标签页打开并跳转
        e.preventDefault();
        e.stopPropagation();
    
        const newEvent = new MouseEvent('click', {
            ctrlKey: true,
            shiftKey: true,
            bubbles: true,
            cancelable: true,
            view: window
        });
        noteTitle.dispatchEvent(newEvent);
    }
}

// 等待 Trilium 完全加载后添加监听器
setTimeout(() => {
    // 获取所有笔记标题元素
    const noteTitles = document.querySelectorAll('span.fancytree-title');

    noteTitles.forEach(title => {
        // 避免重复添加监听器
        if (title.hasAttribute('data-click-handler')) return;
        title.setAttribute('data-click-handler', 'true');

        // 添加点击监听
        title.addEventListener('click', openNoteInNewTab);

        console.log(`✅ 已为 ${noteTitles.length} 个笔记标题添加点击监听`);
    });
}, 500);
