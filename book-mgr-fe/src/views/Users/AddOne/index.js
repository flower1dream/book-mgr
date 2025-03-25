import { defineComponent, reactive } from 'vue';
import { user } from '@/service';
import { result, clone } from '@/helpers/utils';
import { message } from 'ant-design-vue';

// 默认表单数据
const defaultFormData = {
    account: '',
    password: '',
};

export default defineComponent({
    props: {
        show: Boolean, // 控制弹窗显示/隐藏
    },

    setup(props, context) {
        console.log(props);

        // 使用 reactive 创建响应式表单数据，并克隆默认值
        const addForm = reactive(clone(defaultFormData));

        // 关闭弹窗
        const close = () => {
            context.emit('update:show', false); // 触发事件，关闭弹窗
        };

        // 提交表单
        const submit = async () => {
            const form = clone(addForm); // 克隆表单数据
            const res = await user.add(form.account, form.password); // 调用接口添加用户

            result(res)
                .success((d, { data }) => {
                    Object.assign(addForm, defaultFormData); // 重置表单
                    message.success(data.msg); // 显示成功消息
                    close();
                    context.emit('getList');
                })
                .fail((err) => {
                    console.error('提交失败:', err);
                    message.error('提交失败');
                });
        };



        return {
            addForm,
            submit,
            props,
            close,
        };
    },
});