const fs = require('fs');

const saveFileToDisk = (ctx, filename) => {
    return new Promise((resolve, reject) => {
        const file = ctx.request.files?.file;
        if (!file || !file.filepath) {
            return reject(new Error('未找到上传的文件'));
        }
        const reader = fs.createReadStream(file.filepath);
        const writeStream = fs.createWriteStream(filename);
        reader.pipe(writeStream);
        reader.on('end', () => resolve(filename));
        reader.on('error', reject);
    });
};

const getUploadFileExt = (ctx) => {
    // 使用 originalFilename，而非 name
    const { originalFilename = '' } = ctx.request.files.file;
    const parts = originalFilename.split('.');
    // 如果文件名里包含点并且有扩展名则返回扩展名，否则返回空字符串
    return parts.length > 1 ? parts.pop() : '';
};

module.exports = {
    saveFileToDisk,
    getUploadFileExt,
};
