// components/clearInput/clearInput.js
Component({
     externalClasses: ['input-class', 'icon-class'],

     /**
      * 组件的属性列表
      */
     properties: {
          inputHint: {
               type: String,
               value: '搜索关键字'
          },
          inputIcon: {
            type: String,
            value: 'https://aishangnet.club/static/mina_pic/ic_search_2.png'
          },
          inputType: {
               type: String,
               value: 'text'
          },
          isPassword: {
               type: Boolean,
               value: false
          },
          confirmType: {
               type: String,
               value: "done"
          },
          initValue: {
            type: "String",
            value: "",
            observer: function (new_val, old_val, path) {
              if (new_val) {
              this.setData({ inputValue: new_val, isClearShow: true})
              }
            }
          }
     },

     /**
      * 组件的初始数据
      */
     data: {
          isClearShow: false,
          inputValue: ''
     },

     /**
      * 组件的方法列表
      */
     methods: {
          inputListener: function (e) {
               var value = e.detail.value;
               var cursor = e.detail.cursor;
               if (value === null || value === undefined || value.length === 0) {
                    this.setData({
                         isClearShow: false
                    });
               } else {
                    this.setData({
                         isClearShow: true
                    });
               }
               var detail = {
                    value: value,
                    cursor: cursor
               };
               this.triggerEvent('inputListener', detail);
          },

          inputConfirm: function (e) {
               var value = e.detail.value;
               var detail = {
                    value: value
               }
               this.triggerEvent('inputConfirm', detail);
          },

          clearTap: function () {
               this.setData({
                    isClearShow: false,
                    inputValue: ''
               });
           
            this.triggerEvent('inputClear');
          }
     }
})
