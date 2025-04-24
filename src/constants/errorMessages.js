module.exports = {
    // 通用錯誤
    MISSING_REQUIRED_FIELDS: '缺少必填欄位',
    INTERNAL_SERVER_ERROR: '伺服器錯誤，請稍後重試',
    UNAUTHORIZED: '無權執行此操作',
    INVALID_TOKEN: '無效的身份驗證令牌',

    // 用戶相關
    USER_NOT_FOUND: '用戶未找到',
    DUPLICATE_EMAIL: '郵箱已存在',
    DUPLICATE_USERNAME: '用戶名已存在',
    INVALID_CREDENTIALS: '無效的郵箱或密碼',

    // 貼文相關
    POST_NOT_FOUND: '貼文不存在',
    CATEGORY_NOT_FOUND: '分類不存在',

    // 評論相關
    COMMENT_NOT_FOUND: '評論不存在',
    INVALID_PARENT_COMMENT: '無效的父評論',

    // 分類相關
    CATEGORY_ALREADY_EXISTS: '分類名稱已存在',

    // 點讚相關
    ALREADY_LIKED: '您已點讚此內容',
    INVALID_LIKE_TARGET: '必須提供貼文或評論 ID',

    // 標籤相關
    HASHTAG_NOT_FOUND: '標籤不存在',
    HASHTAG_ALREADY_EXISTS: '標籤已存在',
    POST_HASHTAG_ALREADY_EXISTS: '此貼文已關聯該標籤',
};