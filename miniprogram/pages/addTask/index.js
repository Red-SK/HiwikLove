// pages/addTask/index.js
import Toast from '@vant/weapp/toast/toast';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        categorys: ['学习', '运动', '生活', '情侣'],
        show: false,
        category: "选择任务类型",
        task: "",
        value: "",
        checked: false,
        point: "10",
        long:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    showPopup() {
        this.setData({
            show: true
        });
    },
    stepper(event) {
        this.setData({
            point: event.detail
        })
    },
    onClose() {
        this.setData({
            show: false
        });
    },
    pickCategory(event) {
        console.log(event)
        this.setData({
            category: event.detail.value
        })
    },
    pickCancel() {
        this.setData({
            category: "选择任务类型",
            show: false
        })

    },
    pickConfirm(event) {
        this.setData({
            category: event.detail.value,
            show: false
        })
    },
    longChange({ detail}) {
        this.setData({
            long: detail
        });
    },
    switchChange({ detail}) {
        this.setData({
            checked: detail
        });
    },
    resetTask() {
        this.setData({
            task: "",
            point: 10,
            category: "选择任务类型",
            checked: false,
            long:false,
        })
        wx.navigateTo({
            url: '../home/index',
        })
    },
    async submitTask() {
        // 对task进行校验
        if (this.data.task === '') {
            wx.showToast({
                title: '任务名称未填写',
                icon: 'error',
                duration: 2000
            })
            return
        }
        if (this.data.category === "选择任务类型") {
            wx.showToast({
                title: '任务类型未选择',
                icon: 'error',
                duration: 2000
            })
            return
        }
        if (this.data.task.length > 20) {
            wx.showToast({
                title: '任务标题过长',
                icon: 'error',
                duration: 2000
            })
            return
        }
        //判断Cant并设置负积分
        if (this.data.checked) {
            this.setData({
                point: -1 * this.data.point
            })
        }
        const db = await getApp().database()
        // 在数据库中新建待办事项，并填入已编辑对信息
        db.collection('task').add({
            data: {
                task: this.data.task,
                category: this.data.category,
                point: this.data.point,
                can: !this.data.checked,
                long: this.data.long,
            }
        }).then((res) => {
            wx.showToast({
                title:"任务添加成功",
                duration:200,
            })
            setTimeout(
                function () { //注意function这里不能缺少
                    wx.navigateTo({
                        url: '../home/index',
                    })
                }, 200)

        })
    },
})