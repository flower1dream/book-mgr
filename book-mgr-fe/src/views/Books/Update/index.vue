<template>
    <div>
        <a-modal :visible="props.show" title="添加书籍" @ok="submit" @cancel="close">
            <!-- // 书名
                name: String,
                // 价格
                price: Number,
                // 作者
                author: String,
                // 出版日期
                publishDate: String,
                // 分类
                classify: String, -->

            <a-form :label-col="{ span: 6 }">
                <a-form-item label=" 书名">
                    <a-input v-model:value='editForm.name' />
                </a-form-item>
                <a-form-item label="价格">
                    <a-input-number v-model:value='editForm.price' :min="0" :max="9999" />
                </a-form-item>
                <a-form-item label="作者">
                    <a-input v-model:value='editForm.author' />
                </a-form-item>
                <a-form-item label="出版日期">
                    <a-date-picker v-model:value='editForm.publishDate' />
                </a-form-item>
                <a-form-item label="分类">
                    <a-input v-model:value='editForm.classify' />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script src="./index.js"></script>