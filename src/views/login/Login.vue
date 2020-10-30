<template>
  <div class="login">

    <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;" default-active-key="1"
            @change="callback">
      <a-tab-pane tab="账户密码登录" key="1">
        <a-form @submit="onNameSubmit" :form="nameForm">
          <a-alert type="error" :closable="true" v-show="key == 1 && error" :message="error" showIcon
                   style="margin-bottom: 24px;"/>
          <a-form-item>
            <a-input
              autocomplete="autocomplete"
              size="large"
              placeholder="请输入账户名"
              v-decorator="['name', {rules: [{ required: true, message: '请输入账户名', whitespace: true}]}]"
            >
              <a-icon slot="prefix" type="user"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input-password size="large" placeholder="请输入密码" autocomplete="autocomplete" type="password"
                              v-decorator="['password', {rules: [{ required: true, message: '请输入密码', whitespace: true}]}]">
              <a-icon slot="prefix" type="lock"/>
            </a-input-password>

          </a-form-item>
          <div>
            <a-checkbox style="float: left" :checked="true">自动登录</a-checkbox>
            <a style="float: right">忘记密码</a>
          </div>
          <a-form-item>
            <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit"
                      type="primary">登录
            </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane tab="手机号登录" key="2">
        <a-form @submit="onPhoneSubmit" :form="phoneForm">
          <a-alert type="error" :closable="true" v-show="key == 2 && error" :message="error" showIcon
                   style="margin-bottom: 24px;"/>
          <a-form-item>
            <a-input size="large" placeholder="请输入手机号"
                     v-decorator="['phone', {rules: [{ required: true, message: '请输入手机号', whitespace: true}]}]">
              <a-icon slot="prefix" type="mobile"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-row :gutter="8" style="margin: 0 -4px">
              <a-col :span="16">
                <a-input size="large" placeholder="验证码"
                         v-decorator="['code', {rules: [{ required: true, message: '请输入验证码', whitespace: true}]}]">
                  <a-icon slot="prefix" type="safety-certificate"/>
                </a-input>
              </a-col>
              <a-col :span="8" style="padding-left: 4px">
<!--                <a-send-captcha-button v-model="start" @click="send" :second="120" class="getCaptcha"-->
<!--                                       storageKey="SendCaptchaStorageRegisterKey" size="large"/>-->
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item>
            <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit"
                      type="primary">登录
            </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>


    <div>
      其他登录方式
      <a-icon class="icon" type="alipay-circle"/>
      <a-icon class="icon" type="taobao-circle"/>
      <a-icon class="icon" type="weibo-circle"/>
      <router-link style="float: right" to="/register">注册账户</router-link>
    </div>

  </div>
</template>

<script>
  import {login, phoneLogin, getRoutesConfig, phoneCode} from '@/services/user'
  import {setAuthorization} from '@/utils/request'
  import {loadRoutes} from '@/utils/routerUtil'
  import {mapMutations} from 'vuex'
  //import SendCaptchaButton from "@/components/SendCaptchaButton";

  export default {
    name: 'Login',
    data() {
      return {
        start: false,
        logging: false,
        error: '',
        key: 1,
        nameForm: this.$form.createForm(this),
        phoneForm: this.$form.createForm(this)
      }
    },
    components: {
      //ASendCaptchaButton: SendCaptchaButton,
    },
    computed: {
      systemName() {
        return this.$store.state.setting.systemName
      }
    },
    methods: {
      ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
      callback(key) {
        this.key = key
        this.error = ''
      },
      onNameSubmit(e) {
        e.preventDefault()
        this.nameForm.validateFields((err) => {
          if (!err) {
            this.logging = true
            const name = this.nameForm.getFieldValue('name')
            const password = this.nameForm.getFieldValue('password')
            login(name, password).then(this.afterLogin)
          }
        })
      },
      onPhoneSubmit(e) {
        e.preventDefault()
        this.phoneForm.validateFields((err) => {
          if (!err) {
            this.logging = true
            const phone = this.phoneForm.getFieldValue('phone')
            const code = this.phoneForm.getFieldValue('code')
            phoneLogin(phone, code).then(this.afterLogin)
          }
        })
      },
      afterLogin(res) {
        console.log(res)
        this.logging = false
        const loginRes = res.data
        if (loginRes.code >= 0) {
          console.log(loginRes)
          const {user, permissions, roles} = loginRes.data
          this.setUser(user)
          this.setPermissions(permissions)
          this.setRoles(roles)
          setAuthorization({token: loginRes.data.token, expireAt: new Date(loginRes.data.expireAt)})
          // 获取路由配置
          getRoutesConfig().then(result => {
            const routesConfig = result.data.data
            //loadRoutes({router: this.$router, store: this.$store, i18n: this.$i18n}, routesConfig)
            loadRoutes(routesConfig)
            this.$router.push('/dashboard/workplace')
            this.$message.success(loginRes.message, 3)

          })
        } else {
          this.error = loginRes.message

        }
      },
      send() {
        new Promise((resolve, reject) => {
          this.phoneForm.validateFields(["phone"], {}, (err) => {
            if (err) {
              reject(err);
            } else {
              const phone = this.phoneForm.getFieldValue('phone')
              const phoneReg = /^(?:(?:\+|00)86)?1\d{10}$/
              if(!phoneReg.test(phone)){
                this.error = '手机号码错误，无法发送验证码,请重新输入'

              }else{
                this.$message.loading("Action in progress..", 0);
                setTimeout(() => {
                  this.start = true;
                  phoneCode(phone).then((res)=>{
                    this.$message.destroy();
                    if(res.data.code !== -1){
                      this.$message.success(`${res.data.message}`, 2);
                    }else{
                      this.$message.error(`${res.data.message}`, 2);
                    }

                  })
                }, 1000);
              }

            }
          });
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .common-layout {
    .login {
      width: 368px;
      margin: 0 auto;
      @media screen and (max-width: @screen-sm) {
        width: 95%;
      }
      @media screen and (max-width: 320px) {
        .captcha-button {
          font-size: 14px;
        }
      }

      .icon {
        font-size: 24px;
        color: @text-color-second;
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: @primary-color;
        }
      }
    }
  }
</style>
