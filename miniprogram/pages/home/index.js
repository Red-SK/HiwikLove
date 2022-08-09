// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid: "",
        booledit: true,
        checked: "",
        allsTasks: [],
        tasks: [],
        can: [],
        cant: [],
        headTab: 0,
        hailTab: 0,
        profile: "",
        editvalue0: "",
        editvalue1: "",
        editid: "",
        editindex: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.setData({
            headTab: 0,
        })
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
                res.data.forEach(item => {
                    if (item.can === false) {
                        item.iconPath = "../../images/icon/Mission/禁止.svg";
                    } else
                        item.iconPath = "../../images/icon/Mission/" + item.category + ".svg";
                })
                this.setData({
                    // data 为查询到的所有待办事项列表
                    allTasks: data,
                    tasks: data.filter(tasks => tasks.can === true),
                    // 通过 filter 函数，将待办事项分为can与cant两部分
                    can: data.filter(tasks => tasks.can === true),
                    cant: data.filter(tasks => tasks.can === false)
                })

            })
        })

    },
    getData() {
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
                res.data.forEach(item => {
                    if (item.can === false) {
                        item.iconPath = "../../images/icon/Mission/禁止.svg";
                    } else
                        item.iconPath = "../../images/icon/Mission/" + item.category + ".svg";
                })


                this.setData({
                    // data 为查询到的所有待办事项列表
                    allTasks: data,
                    tasks: data.filter(tasks => tasks.can === true),
                    // 通过 filter 函数，将待办事项分为can与cant两部分
                    can: data.filter(tasks => tasks.can === true),
                    cant: data.filter(tasks => tasks.can === false)
                })

            })
        })
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
    headChange(event) {
        this.setData({
            headTab: event.detail
        });

        if (this.data.headTab.index === 1) {
            this.setData({
                tasks: this.data.cant
            })
        } else {
            this.setData({
                tasks: this.data.can
            })
        }
    },
    hailChange(event) {
        this.setData({
            hailTab: event.detail
        });
    },
    add() {
        wx.navigateTo({
            url: '../addTask/index',
        })
    },
    edit(event) {
        let index = event.currentTarget.id
        let id = this.data.tasks[index]._id
        let tmp0 = this.data.tasks[index].task
        let tmp1 = this.data.tasks[index].point;
        this.setData({
            show: true,
            editvalue0: tmp0,
            editvalue1: tmp1,
            editid: id,
            editindex: index,
        })
        this.openEdit();

    },
    async delete(event) {

        let index = event.currentTarget.id
        let id = this.data.tasks[index]._id
        const db = await getApp().database()
        db.collection('task').doc(id).remove({
            success: function (res) {
                wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 500
                })
            }
        })
        this.onShow();
    },
    async submitEdit() {
        let id = this.data.editid;
        const db = await getApp().database()
        db.collection('task').doc(id).update({
            data: {
                task: this.data.editvalue0,
                point: this.data.editvalue1
            },
            success: function (res) {
                wx.showToast({
                    title: '编辑成功',
                    icon: 'success',
                    duration: 1000
                })
            }
        })
        this.closeEdit();
        this.onShow();
    },
    closeEdit() {
        this.setData({
            booledit: true,
        })
    },
    openEdit() {
        this.setData({
            booledit: false
        })
    },
    async redeem(event) {
        let index = event.currentTarget.id
        let id = this.data.tasks[index]._id;
        const db = await getApp().database()
        let judLong = this.data.tasks[index].long
        let tmptask = this.data.tasks[index].task
        let tmppoint = this.data.tasks[index].point
        let tmpcategory = this.data.tasks[index].category
        var that = this;
        //获取当前系统时间
        var date = new Date();
        var creat_date_time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
        wx.showModal({
            title: '完成情况',
            content: '是否确认完成此任务',
            confirmColor: "rgba(240, 161, 176, 1)",
            success(res) {
                if (res.confirm) {
                     //添加完成情况记录
                     db.collection('finishTask').add({
                        data:{
                            task:tmptask,
                            point:tmppoint,
                            time: creat_date_time,
                            category:tmpcategory,
                        }
                    })
                    // 为非长期任务，删除任务并重新加载页面
                    if (judLong === false) {
                        db.collection('task').doc(id).remove({
                            success: function (res) {
                                wx.showToast({
                                    title: '任务完成',
                                    icon: 'success',
                                    duration: 300
                                })
                                that.onShow();
                            }
                        })
                      
                    }else{
                        wx.showToast({
                            title: '任务完成',
                            icon: 'success',
                            duration: 500
                        })
                    }
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
      
    }
})