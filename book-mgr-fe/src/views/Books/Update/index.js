import { defineComponent, reactive, watch } from 'vue';
import { book } from '@/service';
import { result, clone } from '@/helpers/utils';
import { message } from 'ant-design-vue';
import moment from 'moment';


export default defineComponent({
    props: {
        show: Boolean, // 控制弹窗显示/隐藏
        book: Object,
    },

    setup(props, context) {
        const editForm = reactive({
            name: '',
            price: 0,
            author: '',
            publishDate: 0,
            classify: '',
        });

        // 关闭弹窗
        const close = () => {
            context.emit('update:show', false); // 触发事件，关闭弹窗
        };

        watch(() => props.book, (current) => {
            Object.assign(editForm, current);
            editForm.publishDate = moment(Number(editForm.publishDate));
        });
        const submit = async () => {
            const res = await book.update({
                id: props.book._id,
                name: editForm.name,
                price: editForm.price,
                author: editForm.author,
                publishDate: editForm.publishDate.valueOf(),
                classify: editForm.classify,
            });

            result(res)
                .success(({ data,msg }) => {
                    context.emit('update', data);
                    message.success(msg);
                    close();
                });
        };

        return {
            submit,
            props,
            close,
            editForm,
        };
    },
});