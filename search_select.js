class SearchSelect {
    constructor(selectQueryStr,options={}){
        const id = new Date().getTime()
        this.selectID = id
        this.inputPlaceholder = options.placeholder || ''
        this.useSearchSelect(selectQueryStr)
    }
    testArr = []
    currentVaule = ''
    currentText = ''
    useSearchSelect(selectQueryStr) {
        var that = this
        var replaceEle = $(selectQueryStr)
        var selectName = replaceEle.prop('name')
        var selectOptions = replaceEle.find('option')
        selectOptions.each((i, item) => {
            that.testArr.push({
                value: item.value || '',
                text: item.innerText || ''
            })
            if (item.selected) {
                that.currentVaule = item.value || ''
                that.currentText = item.innerText || ''
            }
        })
        var html =
            `<div id="search_select_${that.selectID}" class="search_select">
                        <div class="currentValue">${that.currentText}<i class="slideIcon"></i></div>
                        <div class="optionBox">
                            <div class="searchInputBox">
                                <input class="searchInput" type="search" value="" placeholder="${that.inputPlaceholder}" />
                                <div class="searchBtn"> 搜索 </div>
                            </div>
                            <div class="list">
                                `
        that.testArr.forEach((item, i) => {
            html +=
                `<div class="option ${that.currentVaule==item.value?'active':''}" data-value="${item.value}">${item.text}</div>`
        })
        html +=
            `
            </div>
                    </div>
                    <input class="realValue" type="hidden" name="${selectName}" value="${that.currentVaule}" />
            </div>`
        replaceEle.after(html)
        replaceEle.remove()
        $(document).on('click', function(event) {
            var el = event.target;
            if (!$('#search_select_'+that.selectID).get(0).contains(el)) {
                $('.optionBox').slideUp()
                $('.slideIcon').removeClass('slideed')
            }
        })
        $('.currentValue').on('click', function() {
            $('.optionBox').slideToggle()
            $('.slideIcon').toggleClass('slideed')
            if ($('.option.active').get(0)) {
                var offsetTop = $('.option.active').get(0).offsetTop
                $('.list').scrollTop(offsetTop)
            }
        })
        $('#search_select_'+that.selectID+' .list').on('click', '.option', function() {
            var value = this.dataset.value || ''
            if (that.currentVaule == value) return
            that.currentVaule = value
            that.currentText = this.innerText || ''
            $(this).addClass('active').siblings().removeClass('active')
            $('.currentValue').html(this.textContent + '<i class="slideIcon"></i>')
            $('.realValue').val(value)
            $('.optionBox').slideUp()
            $('.slideIcon').removeClass('slideed')
        })
        $('.searchBtn').on('click', that.searchValue.bind(that))
        $('.searchInput').on('change', that.searchValue.bind(that))
    }
    searchValue() {
        var that = this
        var value = $('.searchInput').val()
        var rex = new RegExp(value)
        var optionHtml = ''
        that.testArr.forEach(function(item) {
            if (rex.test(item.text)) {
                optionHtml +=
                    `<div class="option ${item.value==that.currentVaule?'active':''}" data-value="${item.value}">${item.text}</div>`;
            }
        });
        $('#search_select_'+that.selectID+' .list').html(optionHtml)
    }
    addSelectOption(arr){
        this.testArr= this.testArr.concat(arr)
        this.searchValue()
    }
}