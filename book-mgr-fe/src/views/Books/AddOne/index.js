import { defineComponent, reactive } from 'vue';
import { book } from '@/service';
import { result, clone } from '@/helpers/utils';
import { message } from 'ant-design-vue';

// 默认表单数据
const defaultFormData = {
    name: '',
    price: 0,
    author: '',
    publishDate: '',
    classify: '',
    count: 0, // 设置 count 的默认值为 0
};

export default defineComponent({
    props: {
        show: Boolean, // 控制弹窗显示/隐藏
    },

    setup(props, context) {
        
        // console.log(props);

        // 使用 reactive 创建响应式表单数据，并克隆默认值
        const addForm = reactive(clone(defaultFormData));

        // 提交表单
        const submit = async () => {
            const form = clone(addForm); // 克隆表单数据
            form.publishDate = addForm.publishDate.valueOf(); // 格式化出版日期
            const res = await book.add(form); // 调用接口添加书籍

            result(res)
                .success((d, { data }) => {
                    Object.assign(addForm, defaultFormData); // 重置表单
                    message.success(data.msg); // 显示成功消息
                })
                .fail((err) => {
                    console.error('提交失败:', err);
                    message.error('提交失败');
                });
        };

        // 关闭弹窗
        const close = () => {
            context.emit('update:show', false); // 触发事件，关闭弹窗
        };

        return {
            addForm,
            submit,
            props,
            close,
        };
    },
});