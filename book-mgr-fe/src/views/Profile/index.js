import { defineComponent, reactive } from 'vue';
import { profile } from '@/service';
import { result } from '@/helpers/utils';
import { message } from 'ant-design-vue';


export default defineComponent({
    setup() {
        const resetPasswordForm = reactive({
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        });



        const resetPassword = async () => {
            const {
                confirmNewPassword,
                newPassword,
                oldPassword,
            } = resetPasswordForm;

            if (confirmNewPassword !== newPassword) {
                message.error('两次输入密码不同');
                return;
            }
            const res = await profile.resetPassword(
                newPassword,
                oldPassword,
            );

            result(res)
                .success(({ msg }) => {
                    message.success(msg);

                    resetPasswordForm.newPassword = '';
                    resetPasswordForm.oldPassword = '';
                    resetPasswordForm.confirmNewPassword = '';
                });
        };
        return {
            resetPasswordForm,
            resetPassword,
        };
    },
});