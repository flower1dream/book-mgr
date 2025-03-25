import { defineComponent, ref, onMounted } from "vue";
import { book } from "@/service";
import { useRouter } from 'vue-router';
import { result, formatTimestamp } from "@/helpers/utils";
import { message, Modal, Input } from 'ant-design-vue';
import AddOne from './AddOne/index.vue';
import Update from './Update/index.vue';

export default defineComponent({
    components: {
        AddOne,
        Update,
    },

    setup() {
        const router = useRouter();

        const columns = [
            {
                title: '书名',
                dataIndex: 'name',
            },
            {
                title: '作者',
                dataIndex: 'author',
            },
            {
                title: '价格',
                dataIndex: 'price',
            },
            {
                title: '库存',
                slots: {
                    customRender: 'count',
                },
            },
            {
                title: '出版日期',
                dataIndex: 'publishDate',
                slots: {
                    customRender: 'publishDate',
                },
            },
            {
                title: '分类',
                dataIndex: 'classify',
            },
            {
                title: '操作',
                slots: {
                    customRender: 'actions',
                },
            },
        ];

        const show = ref(false);
        const showUpdateModal = ref(false);
        const list = ref([]); // ✅ 初始化为空数组
        const total = ref(0);
        const curPage = ref(1);
        const keyword = ref('');
        const isSearch = ref(false);
        const curEditBook = ref({});

        // 获取书籍列表
        const getList = async () => {
            const res = await book.list({
                page: curPage.value,
                size: 10,
                keyword: keyword.value,
            });

            result(res)
                .success(({ data }) => {
                    const { list: l, total: t } = data;
                    list.value = l;
                    total.value = t;
                });
        };

        onMounted(async () => {
            getList();
        });


        // 设置页码
        const setPage = (page) => {
            curPage.value = page;

            getList();
        };


        //触发搜索
        const onSearch = () => {
            getList();
            //如果字符串为空则不用改变isSearch的值
            isSearch.value = Boolean(keyword.value);
        };


        //返回全部列表
        const backAll = () => {
            keyword.value = '';
            isSearch.value = false;
            getList();
        };

        // 删除一本书籍
        const remove = async ({ text: record }) => {
            const { _id } = record;

            const res = await book.remove(_id);

            result(res)
                .success(({ msg }) => {
                    message.success(msg);


                    // 下面是为了刷新页面中的书籍，避免重复删除，第一次删除的时候已经把书籍从数据库中移除了
                    const idx = list.value.findIndex((item) => {
                        return item._id === _id;
                    });

                    list.value.splice(idx, 1);

                    // 与直接getlist是相同的效果
                    // getList();
                });
        };

        const updateCount = (type, record) => {
            let word = '增加';

            if (type === 'OUT_COUNT') {
                word = '减少';
            }

            Modal.confirm({
                title: `要${word}多少库存`,
                content: (
                    <div>
                        <Input class="__book_input_count" />
                    </div>
                ),
                onOk: async () => {
                    const el = document.querySelector('.__book_input_count');
                    let num = el.value;

                    // 根据 type 决定是增加还是减少库存
                    if (type === 'IN_COUNT') {
                        num = Math.abs(num); // 入库操作
                    } else if (type === 'OUT_COUNT') {
                        num = -Math.abs(num); // 出库操作
                    }

                    const res = await book.updateCount({
                        id: record._id,
                        num,
                        type,
                    });

                    result(res)
                        .success((data) => {
                            const one = list.value.find((item) => {
                                return item._id === record._id;
                            });

                            if (one) {
                                one.count = one.count + num; // 更新库存
                                message.success(`成功${word} ${Math.abs(num)} 本书`);
                            }
                        });
                },
            });
        };

        // 显示更新弹框
        const update = ({ record }) => {
            showUpdateModal.value = true;
            curEditBook.value = record;
        };
        // 更新某一本书籍的数据
        const updateCurBook = (newData) => {
            Object.assign(curEditBook.value, newData);
        };
        // 进入书籍详情页面
        const toDetail = ({ record }) => {
            router.push(`/books/${record._id}`);
        };


        return {
            columns,
            show,
            list,
            formatTimestamp,
            curPage,
            total,
            setPage,
            keyword,
            onSearch,
            backAll,
            isSearch,
            remove,
            updateCount,
            showUpdateModal,
            curEditBook,
            update,
            updateCurBook,
            toDetail,
        };
    },
});