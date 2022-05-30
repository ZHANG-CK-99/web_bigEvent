$.ajaxPrefilter((options) => {
    options.url = `http://www.liulongbin.top:3007` + options.url;
    // 为my相关接口 注入 token
    if(options.url.includes('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem("token"),
        };
    }

    // 每次请求token是否存在， 或者是否过期
    options.complete = (res) => {
        if(res.responseJSON.status === 1 &&
            res.responseJSON.message === '身份认证失败！'
        ) {
            // 强制清空
            localStorage.removeItem('token');
            // 2.跳转页面
            location.href = '/login.html';
        }
    }
})