import { defineComponent, ref, onMounted, reactive } from 'vue';
import { user } from '@/service';
import { message } from 'ant-design-vue';
import { EditOutlined } from '@ant-design/icons-vue';
import { result, formatTimestamp } from '@/helpers/utils';
import AddOne from './AddOne/index.vue';
import store from '@/store';
import { getCharacterInfoById } from '@/helpers/character';

const columns = [
    {
        title: '账户',
        dataIndex: 'account',
    },
    {
        title: '创建日期',
        slots: {
            customRender: 'createdAt',
        },
    },
    {
        title: '角色',
        slots: {
            customRender: 'character',
        },
    },
    {
        title: '操作',
        slots: {
            customRender: 'actions',
        },
    },
];

export default defineComponent({
    components: {
        AddOne,
        EditOutlined,
    },
    setup() {
        const list = ref([]);
        const total = ref(0);
        const curPage = ref(1);
        const showAddModal = ref(false);
        const keyword = ref('');
        const isSearch = ref(false);
        const showEditCharacterModal = ref(false);

        const editForm = reactive({
            character: '',
            current: {},
        });

        const getUser = async () => {
            const res = await user.list(curPage.value, 10, keyword.value);

            result(res)
                .success(({ data: { list: refList, total: resTotal } }) => {
                    list.value = refList;
                    total.value = resTotal;
                });
        };

        onMounted(() => {
            getUser();
        });

        const remove = async ({ _id }) => {
            const res = await user.remove(_id);

            result(res)
                .success(({ msg }) => {
                    message.success(msg);
                    getUser();
                });
        };

        const setPage = (page) => {
            curPage.value = page;
            getUser();
        };

        const resetPassword = async ({ _id }) => {
            const res = await user.resetPassword(_id);

            result(res)
                .success(({ msg }) => {
                    message.success(msg);
                });
        };

        const onSearch = () => {
            getUser();
            isSearch.value = !!keyword.value;
        };

        const backAll = () => {
            isSearch.value = false;
            keyword.value = '';
            getUser();
        };

        const onEdit = (record) => {
            editForm.current = record;
            editForm.character = record.character;

            showEditCharacterModal.value = true;
        };

        const updateCharacter = async () => {
            const res = await user.editCharacter(editForm.character, editForm.current._id);

            result(res)
                .success(({ msg }) => {
                    message.success(msg);
                    showEditCharacterModal.value = false;
                    editForm.current.character = editForm.character;
                });
        };

        const onUploadChange = ({ file }) => {
            if (file.response) {
                // 提取上传文件的文件名
                const key = file.response.data;
                // console.log('key的内容：', key);

                // 发送正确格式的请求
                user.addMany(key)
                    .then(res => {
                        // console.log('添加用户响应：', res);

                        // 解构响应数据
                        const { code, msg, data } = res.data;

                        if (code === 1) {
                            message.success(`成功添加 ${data.addCount} 位用户`);
                            getUser(); // 刷新用户列表
                        } else {
                            message.error(msg || '用户添加失败');
                        }
                    })
                    .catch(err => {
                        console.error('调用 addMany 接口出错：', err);
                        message.error('请求失败，请检查网络或服务器状态');
                    });
            }
        };



        return {
            list,
            total,
            curPage,
            columns,
            formatTimestamp,
            remove,
            showAddModal,
            getUser,
            setPage,
            resetPassword,
            onSearch,
            backAll,
            keyword,
            isSearch,
            onEdit,
            updateCharacter,
            getCharacterInfoById,
            showEditCharacterModal,
            editForm,
            characterInfo: store.state.characterInfo,
            onUploadChange,
        };
    },
});