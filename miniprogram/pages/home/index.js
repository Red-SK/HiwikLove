// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        test: "",
        active: 0,
        checked: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        getApp().getOpenId().then(async openid => {
            this.setData({
                test: openid,
            })
        })

        // 通过云函数调用获取用户 _openId
        // getApp().getOpenId().then(async openid => {
        //     // 根据 _openId 数据，查询并展示待办列表
        //     const db = await getApp().database()
        //     db.collection(getApp().globalData.collection).where({
        //         _openid: openid
        //     }).get().then(res => {
        //         const {
        //             data
        //         } = res
        //         // 存储查询到的数据
        //         this.setData({
        //             // data 为查询到的所有待办事项列表
        //             todos: data,
        //             // 通过 filter 函数，将待办事项分为未完成和已完成两部分
        //             pending: data.filter(todo => todo.freq === 0),
        //             finished: data.filter(todo => todo.freq === 1)
        //         })
        //     })
        // })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    //切换至CP的页面
    switchToCP({
        detail
    }) {
        console.log("ToCP")
        this.setData({
            checked: detail
        });
    },
    onChange(event) {
        // event.detail 的值为当前选中项的索引
        this.setData({
            active: event.detail
        });
    },

    addMission() {
        console.log("add")
    },

    edit(){
        console.log("edit")
    }
})