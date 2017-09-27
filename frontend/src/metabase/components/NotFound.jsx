import React, { Component } from "react";
import { Link } from "react-router";

import * as Urls from "metabase/lib/urls";

export default class NotFound extends Component {
    render() {
        return (
            <div className="layout-centered flex full">
                <div className="p4 text-bold">
                    <h1 className="text-brand text-light mb3">你要打开的页面好像去了外太空...</h1>
                    <p className="h4 mt2 mb2">程序猿和你说，你要打开的页面找不到了.</p>
                    <p className="h4 mt2 mb2">--“我觉得你可能上了一个假网站.”</p>
                    <p className="h4 mt2 mb2 my4">你可以:</p>
                    <div className="flex align-center">
                        <Link to={Urls.question()} className="Button Button--primary">
                            <div className="p1">开启一个新查询.</div>
                        </Link>
                        <span className="mx2">or</span>
                        <a className="Button Button--withIcon" target="_blank" href="http://tv.giphy.com/kitten">
                            <div className="p1 flex align-center relative">
                                <span className="h2">😸</span>
                                <span className="ml1">玩点游戏?</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
