/**
 * 頁面導航控制
 * 簡化的前端導航邏輯
 */

// 檢查用戶是否已登入
function isLoggedIn() {
    return localStorage.getItem('token') !== null;
}

// 登出函數
function logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
}

// 頁面載入時檢查登入狀態
document.addEventListener('DOMContentLoaded', function() {
    // 如果用戶已登入且在登入/註冊頁面，重定向到首頁
    if (isLoggedIn() && (window.location.pathname === '/' || 
                         window.location.pathname === '/register')) {
        window.location.href = '/index';
    }
    
    // 如果用戶未登入且在主頁面，重定向到登入頁面
    if (!isLoggedIn() && window.location.pathname === '/index') {
        window.location.href = '/';
    }
}); 