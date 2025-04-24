# blog-forum-website

嘗試弄一個博客論壇。

```bash
blog-forum-website/
├── src/
│   ├── config/
│   │   ├── database.js          # MongoDB 連線配置
│   │   └── env.js              # 環境變數配置
│   ├── controllers/
│   │   ├── userController.js    # 用戶相關控制器
│   │   ├── postController.js    # 貼文相關控制器
│   │   ├── commentController.js # 評論相關控制器
│   │   ├── categoryController.js # 分類相關控制器
│   │   ├── likeController.js    # 點讚相關控制器
│   │   ├── hashtagController.js # 標籤相關控制器
│   │   └── postHashtagController.js # 貼文標籤關聯控制器
│   ├── models/
│   │   ├── user.js             # 用戶模型
│   │   ├── post.js             # 貼文模型
│   │   ├── comment.js          # 評論模型
│   │   ├── category.js         # 分類模型
│   │   ├── like.js             # 點讚模型
│   │   ├── hashtag.js          # 標籤模型
│   │   └── postHashtag.js      # 貼文標籤關聯模型
│   ├── repositories/
│   │   ├── userRepository.js    # 用戶資料庫操作
│   │   ├── postRepository.js    # 貼文資料庫操作
│   │   ├── commentRepository.js # 評論資料庫操作
│   │   ├── categoryRepository.js # 分類資料庫操作
│   │   ├── likeRepository.js    # 點讚資料庫操作
│   │   ├── hashtagRepository.js # 標籤資料庫操作
│   │   └── postHashtagRepository.js # 貼文標籤關聯資料庫操作
│   ├── services/
│   │   ├── userService.js       # 用戶業務邏輯
│   │   ├── postService.js       # 貼文業務邏輯
│   │   ├── commentService.js    # 評論業務邏輯
│   │   ├── categoryService.js   # 分類業務邏輯
│   │   ├── likeService.js       # 點讚業務邏輯
│   │   ├── hashtagService.js    # 標籤業務邏輯
│   │   └── postHashtagService.js # 貼文標籤關聯業務邏輯
│   ├── routes/
│   │   ├── user.js             # 用戶路由
│   │   ├── post.js             # 貼文路由
│   │   ├── comment.js          # 評論路由
│   │   ├── category.js         # 分類路由
│   │   ├── hashtag.js          # 標籤路由
│   │   ├── postHashtag.js      # 貼文標籤關聯路由
│   │   ├── like.js             # 點讚路由
│   │   └── index.js            # 路由入口
│   ├── middleware/
│   │   ├── auth.js             # JWT 認證中間件
│   │   └── errorHandler.js     # 錯誤處理中間件
│   ├── constants/
│   │   └── errorMessages.js    # 錯誤訊息常數
│   ├── utils/
│   │   ├── logger.js           # 日誌工具（可選）
│   │   └── validator.js        # 輸入驗證工具（可選）
│   └── server.js               # 應用程式入口
├── public/
│   ├── default-avatar.jpg      # 預設頭像
│   ├── css/
│   │   └── styles.css          # 前端樣式
│   ├── js/
│   │   ├── api.js              # 前端 API 請求
│   │   └── main.js             # 前端主邏輯
├── views/
│   ├── index.html              # 首頁
│   ├── create-user.html        # 註冊頁面
│   ├── create-post.html        # 創建貼文頁面
│   ├── create-tag.html         # 創建標籤頁面
│   ├── create-category.html    # 創建分類頁面
├── .env                        # 環境變數檔案
├── .gitignore                  # Git 忽略檔案
├── package.json                # 專案依賴和腳本
├── package-lock.json           # 依賴鎖定檔案
└── README.md                   # 專案說明
```
