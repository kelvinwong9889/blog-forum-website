const ERROR_MESSAGES = {
    // 通用錯誤
    MISSING_REQUIRED_FIELDS: '缺少必要欄位',
    SERVER_ERROR: '伺服器錯誤',
    
    // 認證相關錯誤
    INVALID_CREDENTIALS: '電子郵件或密碼錯誤',
    TOKEN_REQUIRED: '請提供認證 token',
    TOKEN_EXPIRED: '登入已過期，請重新登入',
    TOKEN_INVALID: '無效的 token',
    USER_NOT_FOUND: '用戶不存在',
    
    // 用戶相關錯誤
    DUPLICATE_EMAIL: '此電子郵件已被註冊',
    DUPLICATE_USERNAME: '此用戶名已被使用',
    USER_NOT_FOUND: '找不到用戶',
    
    // 文章相關錯誤
    POST_NOT_FOUND: '找不到文章',
    UNAUTHORIZED_ACTION: '您沒有權限執行此操作',
    
    // 評論相關錯誤
    COMMENT_NOT_FOUND: '找不到評論',
    
    // 文件相關錯誤
    FILE_UPLOAD_ERROR: '文件上傳失敗',
    INVALID_FILE_TYPE: '無效的文件類型',
    FILE_TOO_LARGE: '文件太大'
};

module.exports = { ERROR_MESSAGES };