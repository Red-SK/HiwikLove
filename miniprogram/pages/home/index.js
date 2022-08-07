// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid: "",
        active: 0,
        checked: "",
        tasks: [],
        can: [],
        cant:[],
        tabvalue:0,
        profile:"",
       
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
      
        // 通过云函数调用获取用户 _openId
        getApp().getOpenId().then(async openid => {
            // 根据 _openId 数据，查询任务列表
            const db = await getApp().database()
            console.log(openid)
            db.collection('task').where({
                _openid: openid
            }).get().then(res => {
                const {
                    data
                } = res
                // 存储查询到的数据
                console.log(res)
                res.data.forEach(item=>{
                    item.iconPath =  "../../images/icon/Mission/"+item.category+".svg";
                })
                console.log(res)
               
                this.setData({
                    // data 为查询到的所有待办事项列表
                    tasks: data,
                    // 通过 filter 函数，将待办事项分为can与cant两部分
                    can: data.filter(tasks => tasks.can === true),
                    cant: data.filter(tasks => tasks.can === false)
                })
              
                console.log(this.data.tasks)
                console.log(this.data.can)
                console.log(this.data.cant)
            })
        })

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
            tabvalue: event.detail
        });
    },
    tabChange(event) {
        // event.detail 的值为当前选中项的索引
        this.setData({
            tabvalue: event.detail
        });
    },

    add() {
        wx.navigateTo({
            url: '../addTask/index',
        })
    },
    edit() {
        console.log("edit")
    }

})