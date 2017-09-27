/* eslint-disable react/display-name */

import React, { Component } from "react";

import Tutorial, { qs, qsWithContent } from "./Tutorial.jsx";

import RetinaImage from "react-retina-image";

const QUERY_BUILDER_STEPS = [
    {
        getPortalTarget: () => qs(".GuiBuilder"),
        getModal: (props) =>
            <div className="text-centered">
                <RetinaImage className="mb2" forceOriginalDimensions={false} src="app/assets/img/qb_tutorial/question_builder.png" width={186} />
                <h3>欢迎来到我们为您精心准备的超简单教程!</h3>
                <p>这个教程将向您演示如何使用查询功能来查询您想要的数据.我们开始吧！</p>
                <a className="Button Button--primary" onClick={props.onNext}>朕准了,开始吧</a>
            </div>
    },
    {
        getPortalTarget: () => qs(".GuiBuilder-data"),
        getModalTarget: () => qs(".GuiBuilder-data"),
        getModal: (props) =>
            <div className="text-centered">
                <RetinaImage id="QB-TutorialTableImg" className="mb2" forceOriginalDimensions={false} src="app/assets/img/qb_tutorial/table.png" width={157} />
                <h3>第一步: 选择您要查询的数据仓库和数据表</h3>
                <p>请点击上方的"数据源"区域, 并在弹出的下拉框中选中<strong>"Sample Dataset"</strong>中的<strong>"Orders"</strong>表.</p>
            </div>,
        shouldAllowEvent: (e) => qs(".GuiBuilder-data a").contains(e.target)
    },
    {
        getPortalTarget: () => qs(".GuiBuilder-data"),
        getPageFlagTarget: () => qsWithContent(".List-section-header", "Sample Dataset"),
        shouldAllowEvent: (e) => qsWithContent(".List-section-header", "Sample Dataset").contains(e.target),
        optional: true
    },
    {
        getPortalTarget: () => qs(".GuiBuilder-data"),
        getPageFlagTarget: () => qsWithContent(".List-item", "Orders"),
        shouldAllowEvent: (e) => qsWithContent(".List-item > a", "Orders").contains(e.target)
    },
    {
        getPortalTarget: () => qs(".GuiBuilder-filtered-by"),
        getModalTarget: () => qs(".GuiBuilder-filtered-by"),
        getModal: (props) =>
            <div className="text-centered">
                <RetinaImage
                    className="mb2"
                    forceOriginalDimensions={false}
                    id="QB-TutorialFunnelImg"
                    src="app/assets/img/qb_tutorial/funnel.png"
                    width={135}
                />
                <h3>第二步: 增加一个筛选条件.</h3>
                <p>请点击上方"设置筛选条件"区域, 并在弹出的下拉框中选择<strong>"Created At"</strong>字段作为筛选条件.</p>
            </div>,
        shouldAllowEvent: (e) => qs(".GuiBuilder-filtered-by a").contains(e.target)
    },
    {
        getPortalTarget: () => qs(".GuiBuilder-filtered-by"),
        getPageFlagTarget: () => qsWithContent(".List-item", "Created At"),
        shouldAllowEvent: (e) => qsWithContent(".List-item > a", "Created At").contains(e.target)
    },
    {
        getPortalTarget: () => qs(".GuiBuilder-filtered-by"),
        getPageFlagText: () => "这里可以设置我们要看前x天的数据,试试改成180天",
        getPageFlagTarget: () => qs('[data-ui-tag="relative-date-input"]'),
        shouldAllowEvent: (e) => qs('[data-ui-tag="relative-date-input"]').contains(e.target)
    },
    {
        getPortalTarget: () => qs(".GuiBuilder-filtered-by"),
        getPageFlagText: () => "再点一下这里",
        getPageFlagTarget: () => qs('[data-ui-tag="add-filter"]'),
        shouldAllowEvent: (e) => qs('[data-ui-tag="add-filter"]').contains(e.target)
    },
    {
        getPortalTarget: () => qs(".Query-section-aggregation"),
        getModalTarget: () => qs(".Query-section-aggregation"),
        getModal: (props) =>
            <div className="text-centered">
                <RetinaImage
                    className="mb2"
                    forceOriginalDimensions={false}
                    id="QB-TutorialCalculatorImg"
                    src="app/assets/img/qb_tutorial/calculator.png"
                    width={115}
                />
                <h3>第三步: 这里可以选择你要查询的数据的类型.求和/平均数/最大最小值? 没问题!</h3>
                <p>试一试: 点击上方的<strong>"Raw Data"</strong>, 在弹出框中选中<strong>"计数"</strong>, 来计算Orders表中所有订单的个数.</p>
            </div>,
        shouldAllowEvent: (e) => qs('.View-section-aggregation').contains(e.target)
    },
    {
        getPortalTarget: () => qs(".Query-section-aggregation"),
        getPageFlagTarget: () => qsWithContent(".List-item", "计数"),
        shouldAllowEvent: (e) => qsWithContent(".List-item > a", "计数").contains(e.target)
    },
    {
        getPortalTarget: () => qs(".Query-section-breakout"),
        getModalTarget: () => qs(".Query-section-breakout"),
        getModal: (props) =>
            <div className="text-centered">
                <RetinaImage
                    className="mb2"
                    forceOriginalDimensions={false}
                    id="QB-TutorialBananaImg"
                    src="app/assets/img/qb_tutorial/banana.png"
                    width={232}
                />
                <h3>第四步： 使用一个分组来归类你的数据，比如按分类汇总，按时间(日/星期/月)等...</h3>
                <p>试一试： 点击<strong>Add a grouping</strong>, 并在弹出框内选择<strong>Created At: by Week</strong>.</p>
            </div>,
        shouldAllowEvent: (e) => qs('.Query-section-breakout').contains(e.target)
    },
    {
        getPortalTarget: () => qs(".Query-section-breakout"),
        getPageFlagTarget: () => qs(".FieldList-grouping-trigger"),
        getPageFlagText: () => "点击 \"by day\" 并更换成 \"Week.\"",
        shouldAllowEvent: (e) => qs(".FieldList-grouping-trigger").contains(e.target)
    },
    {
        getPortalTarget: () => qs(".Query-section-breakout"),
        getPageFlagTarget: () => qsWithContent(".List-item", "Week"),
        shouldAllowEvent: (e) => qsWithContent(".List-item > a", "Week").contains(e.target)
    },
    {
        getPortalTarget: () => qs(".RunButton"),
        getModalTarget: () => qs(".RunButton"),
        getModal: (props) =>
            <div className="text-centered">
                <RetinaImage
                    className="mb2"
                    forceOriginalDimensions={false}
                    id="QB-TutorialRocketImg"
                    src="app/assets/img/qb_tutorial/rocket.png"
                    width={217}
                />
                <h3>开始查询: "我感觉我能上天..."</h3>
                <p>你好棒棒的呢! 查询条件都设好了, 点击按钮 <strong>Get Answer</strong>开始你的查询吧!</p>
            </div>,
        shouldAllowEvent: (e) => qs(".RunButton").contains(e.target)
    },
    {
        getPortalTarget: () => qs(".VisualizationSettings"),
        getModalTarget: () => qs(".VisualizationSettings"),
        getModal: (props) =>
            <div className="text-centered">
                <RetinaImage
                    className="mb2"
                    forceOriginalDimensions={false}
                    id="QB-TutorialChartImg"
                    src="app/assets/img/qb_tutorial/chart.png"
                    width={160}
                />
                <h3>还可以点击这里更换不同的展示方式来解读你的数据噢!</h3>
                <p>数据可视化！点击<strong>Visualization</strong>按钮并在下拉框中选择<strong>Line</strong>方式展现数据.</p>
            </div>,
        shouldAllowEvent: (e) => qs(".VisualizationSettings a").contains(e.target)
    },
    {
        getPortalTarget: () => qs(".VisualizationSettings"),
        getPageFlagText: () => "选择Line, 就是\"折线图\"啦",
        getPageFlagTarget: () => qsWithContent(".ChartType-popover li", "Line"),
        shouldAllowEvent: (e) => qsWithContent(".ChartType-popover li", "Line").contains(e.target)
    },
    {
        getPortalTarget: () => true,
        getModal: (props) =>
            <div className="text-centered">
                <RetinaImage
                    className="mb2"
                    forceOriginalDimensions={false}
                    id="QB-TutorialBoatImg"
                    src="app/assets/img/qb_tutorial/boat.png" width={190}
                />
                <h3>棒棒哒!</h3>
                <p>你已经完成了我们为您精心准备的超简单教程! 现在就开始使用吧!</p>
                <a className="Button Button--primary" onClick={props.onNext}>谢谢!</a>
            </div>
    },
    {
        getModalTarget: () => qsWithContent(".Header-buttonSection a", "Save"),
        getModal: (props) =>
            <div className="text-centered">
                <h3>九朵麻袋! 记得保存您的问题!</h3>
                <p>如果你刚查了一个超复杂的问题, 记得保存下来, 然后下次就可以很快的在仪表盘找到它了，就不用再次输入筛选条件/聚合/分组参数了...</p>
                <a className="Button Button--primary" onClick={props.onClose}>朕知道了,退下吧</a>
            </div>
    }
]

export default class QueryBuilderTutorial extends Component {
    render() {
        return <Tutorial steps={QUERY_BUILDER_STEPS} {...this.props} />;
    }
}
