/**
 * ucenter登录功能
 * @version 2017-09-04
 * @author fangyukun
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import AuthScene from "../components/AuthScene.jsx";
import LogoIcon from "metabase/components/LogoIcon.jsx";
import * as authActions from "../auth";

const mapStateToProps = (state, props) => {
    return {
        loginError:       state.auth && state.auth.loginError,
        user:             state.currentUser
    }
}

const mapDispatchToProps = {
    ...authActions
}

@connect(mapStateToProps, mapDispatchToProps)
export default class UcenterLoginApp extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            credentials: {},
            valid: false
        }
    }


    /**
     * 输入url的search部分，返回所有参数组成的数组
     */
    analysisUrlSearchVars(urlSearch){
        let loginVarList = {};
        let loginVars = urlSearch.split("&");
        for(let i = 0; i < loginVars.length; i++){
            let num = loginVars[i].indexOf("=");
            if(num > 0){
                let name = loginVars[i].substring(0, num);
                let value=loginVars[i].substr(num + 1);
                loginVarList[name] = value;
            }
        }
        return loginVarList;
    }


    /**
     * 检查登录参数有效性,TODO
     * @param loginInfoObject
     */
    validateLoginInfoObject(loginInfoObject){
        return loginInfoObject.hasOwnProperty("u") && loginInfoObject.hasOwnProperty("p");
    }

    //字符串进行解密
    uncompileStr(str){
        let code = decodeURI(str);
        let c = String.fromCharCode(code.charCodeAt(0) - code.length);
        for(let i = 1; i < code.length; i++){
            c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
        }
        return c;
    }

    //部件加载完毕后：开始执行登录过程
    componentDidMount() {

        //1. 获取参数
        if(this.props.params.loginInfo !== undefined ){
            let loginInfoFromUrl = this.props.params.loginInfo;
            let loginInfoObject = this.analysisUrlSearchVars(this.uncompileStr(loginInfoFromUrl));

            console.log(loginInfoObject);

            //1.1 判断参数有效性
            if(this.validateLoginInfoObject(loginInfoObject)){
                //1.2 有效则执行登录
                let { login, location } = this.props;
                let credentials = {};
                credentials.username = loginInfoObject.u + "@ux168.cn";
                credentials.password = loginInfoObject.p;

                login(credentials, "/"); //登录成功后，不再继续跳转查询，转回首页
            }else{
                //1.3 无效则提示用户并跳转回ucenter
                alert("对不起，登录失败. 请重新登录，如有问题，请联系系统管理员");
                let { logout } = this.props;
                logout();
            }
        }else{
            alert("对不起,登录无效。如有问题，请联系系统管理员")
        }

    }


    render() {

        let ucenterLoaderStyle = {
            paddingLeft: "1.2em",
            marginTop: "1.2em"
        };

        return (
            <div className="full-height full bg-white flex flex-column flex-full md-layout-centered">
                <div className="Login-wrapper wrapper Grid Grid--full md-Grid--1of2 relative z2">
                    <div className="Grid-cell flex layout-centered text-brand">
                        <LogoIcon className="Logo my4 sm-my0" width={66} height={85} />
                    </div>
                    <div className="Login-content Grid-cell">
                        <h3 className="Login-header Form-offset">欢迎使用 基础数据查询系统(MBS)</h3>
                        <p style={ucenterLoaderStyle}>正在登录,请稍候...</p>
                    </div>
                </div>
                <AuthScene />
            </div>
        );
    }
}
