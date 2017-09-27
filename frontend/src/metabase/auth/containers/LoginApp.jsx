import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { Link } from "react-router";
import { connect } from "react-redux";

import cx from "classnames";

import AuthScene from "../components/AuthScene.jsx";
import SSOLoginButton from "../components/SSOLoginButton.jsx";
import FormField from "metabase/components/form/FormField.jsx";
import FormLabel from "metabase/components/form/FormLabel.jsx";
import FormMessage from "metabase/components/form/FormMessage.jsx";
import LogoIcon from "metabase/components/LogoIcon.jsx";
import Settings from "metabase/lib/settings";
import Utils from "metabase/lib/utils";


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
export default class LoginApp extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            credentials: {},
            valid: false
        }
    }

    validateForm() {
        let { credentials } = this.state;

        let valid = true;

        if (!credentials.username || !credentials.password) {
            valid = false;
        }

        if (this.state.valid !== valid) {
            this.setState({ valid });
        }
    }

    componentDidMount() {

        this.validateForm();

        const { loginGoogle, location } = this.props;

        let ssoLoginButton = findDOMNode(this.refs.ssoLoginButton);

        function attachGoogleAuth() {
            // if gapi isn't loaded yet then wait 100ms and check again. Keep doing this until we're ready
            if (!window.gapi) {
                window.setTimeout(attachGoogleAuth, 100);
                return;
            }
            try {
                window.gapi.load('auth2', () => {
                  let auth2 = window.gapi.auth2.init({
                      client_id: Settings.get('google_auth_client_id'),
                      cookiepolicy: 'single_host_origin',
                  });
                  auth2.attachClickHandler(ssoLoginButton, {},
                      (googleUser) => loginGoogle(googleUser, location.query.redirect),
                      (error) => console.error('There was an error logging in', error)
                  );
                })
            } catch (error) {
                console.error('Error attaching Google Auth handler: ', error);
            }
        }
        attachGoogleAuth();
    }

    componentDidUpdate() {
        this.validateForm();
    }

    onChange(fieldName, fieldValue) {
        this.setState({ credentials: { ...this.state.credentials, [fieldName]: fieldValue }});
    }

    formSubmitted(e) {
        e.preventDefault();

        let { login, location } = this.props;
        let { credentials } = this.state;

        //取消登录功能，强制使用ucenter登录，modifiedBy fangyukun 20170905
        //login(credentials, location.query.redirect);
    }

    render() {

        const { loginError } = this.props;

        return (
            <div className="full-height full bg-white flex flex-column flex-full md-layout-centered">
                <div className="Login-wrapper wrapper Grid Grid--full md-Grid--1of2 relative z2">
                    <div className="Grid-cell flex layout-centered text-brand">
                        <LogoIcon className="Logo my4 sm-my0" width={66} height={85} />
                    </div>
                    <div className="Login-content Grid-cell">
                        <form className="Form-new bg-white bordered rounded shadowed" name="form" onSubmit={(e) => this.formSubmitted(e)} noValidate>
                            <h3 className="Login-header Form-offset">Sign in to Metabase</h3>
                            <p className="Form-offset">此登录功能已被取消,请使用Ucenter登录,谢谢.</p>

                            {/* modifiedBy fangyukun 20170905， 取消登录功能，强制使用ucenter登录
                            { Settings.ssoEnabled() &&
                                <div className="mx4 mb4 py3 border-bottom relative">
                                    <SSOLoginButton provider='google' ref="ssoLoginButton"/>
                                    {//<div className="g-signin2 ml1 relative z2" id="g-signin2"></div>}
                                    <div className="mx1 absolute text-centered left right" style={{ bottom: -8 }}>
                                        <span className="text-bold px3 py2 text-grey-3 bg-white">OR</span>
                                    </div>
                                </div>
                            }

                            <FormMessage formError={loginError && loginError.data.message ? loginError : null} ></FormMessage>

                            <FormField key="username" fieldName="username" formError={loginError}>
                                <FormLabel title="用户名" fieldName={"username"} formError={loginError} />
                                <input className="Form-input Form-offset full py1" name="username" placeholder="请输入UCenter用户名" type="text" onChange={(e) => this.onChange("username", e.target.value + "@ux168.cn")} autoFocus />
                                <span className="Form-charm"></span>
                            </FormField>

                            <FormField key="password" fieldName="password" formError={loginError}>
                                <FormLabel title={"密码"}  fieldName={"password"} formError={loginError} />
                                <input className="Form-input Form-offset full py1" name="password" placeholder="默认初始密码:123456" type="password" onChange={(e) => this.onChange("password", e.target.value)} />
                                <span className="Form-charm"></span>
                            </FormField>

                            <div className="Form-field">
                                <ul className="Form-offset">
                                    <input name="remember" type="checkbox" defaultChecked /> <label className="inline-block">Remember Me:</label>
                                </ul>
                            </div>

                            <div className="Form-actions p2 Grid Grid--full md-Grid--1of2">
                                <button className={cx("Button Grid-cell", {'Button--primary': this.state.valid})} disabled={!this.state.valid}>
                                    登 录
                                </button>
                                <Link to={"/auth/forgot_password"+(Utils.validEmail(this.state.credentials.username) ? "?email="+this.state.credentials.username : "")} className="Grid-cell py2 sm-py0 text-grey-3 md-text-right text-centered flex-full link" onClick={(e) => { window.OSX ? window.OSX.resetPassword() : null }}>I seem to have forgotten my password</Link>
                            </div>
                            */}
                        </form>
                    </div>
                </div>
                <AuthScene />
            </div>
        );
    }
}
