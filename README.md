# search_select
select下拉搜索控件 使用时需先引入jq

使用方法：
var ss1 = new SearchSelect('#text_search_select',{placeholder:'输入搜索内容'})

第一个参数为 目标select元素的 css选择器 ，placeholder不传时默认为空
placeholder为 搜索input 的 placeholder值

可给select添加额外的项:
            ss1.addSelectOption([{
                value: 5,
                text: 'option5'
            }, {
                value: 6,
                text: 'option6'
            }, {
                value: 7,
                text: 'option7'
            }, {
                value: 8,
                text: 'option8'
            }, ])
