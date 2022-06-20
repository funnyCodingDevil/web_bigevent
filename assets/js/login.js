$(function () {
    // 登录注册页面切换
    $('#goReg,#goLogin').on('click', function () {
        // 隐藏当前form并显示相邻的form
        $(this).parents('form').hide().siblings('form').show()
    })
    // 登录注册表单验证
    var form = layui.form
    // 定义验证规则
    form.verify({
        // 验证用户名输入框内容
        username: [/^[A-Za-z0-9]{3-8}$/, '用户名需由3-8位数字或英文大小写字母组成'],
        // 自定义了一个叫做 pwd 校验规则
        // 验证密码
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.regForm [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    var layer = layui.layer
    // 注册
    $('.regForm').on('submit', function (e) {
        e.preventDefault()
        // console.log($(this).serialize())
        let data = {
            username: $('.regForm [name=username]').val(),
            password: $('.regForm [name=password]').val(),
        }
        console.log(data)
        // 发起请求
        $.post('/api/reguser', data, function (res) {
            console.log(res)
            // 注册失败
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // 注册成功
            layer.msg('注册成功，请登录！')
            // 切换到登录表单页面
            $('#goLogin').click()
        })
    })
    // 登录
    $('.loginForm').on('submit', function (e) {
        e.preventDefault()
        // 发请求
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})