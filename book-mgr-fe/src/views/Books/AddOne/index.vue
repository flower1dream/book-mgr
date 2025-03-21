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
                    <a-input v-model:value='addForm.name' />
                </a-form-item>
                <a-form-item label="价格">
                    <a-input-number v-model:value='addForm.price' :min="0" :max="9999" />
                </a-form-item>
                <a-form-item label="作者">
                    <a-input v-model:value='addForm.author' />
                </a-form-item>
                <a-form-item label="出版日期">
                    <a-date-picker v-model:value='addForm.publishDate' />
                </a-form-item>
                <a-form-item label="分类">
                    <a-input v-model:value='addForm.classify' />
                </a-form-item>
                <a-form-item label="库存">
                    <a-input-number v-model:value='addForm.count' :min="0" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script src="./index.js"></script>