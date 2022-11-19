import { defineConfig } from 'vitepress'

export default defineConfig({
    base: '/docs/',
    title: 'A game without a solution',
    description: 'Just taking notes',
    lastUpdated: true,
    cleanUrls: 'without-subfolders',
    markdown: {
        lineNumbers: true,
        toc: { level: [1, 2, 3] },
    },
    themeConfig: {
        nav: nav(),
        sidebar: {
            '/go/': sidebarGuide(),
            '/k8s/': sidebarK8s(),
            '/deploy/': sidebarDeploy(),
            '/rust/': sidebarRust(),
        },
        editLink: {
            pattern: 'https://gitee.com/wxvirus/docs/edit/master/docs/:path',
            text: 'Edit this page on Gitee',
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/sword-demon' }],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present Licrone',
        },
        // algolia: {
        //     appId: '8J64VVRP8K',
        //     apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
        //     indexName: 'vitepress',
        // },
    },
})

function nav() {
    return [
        { text: 'Go', link: '/go/mac-install-go', activeMatch: '/go/' },
        { text: 'K8S', link: '/k8s/introduction', activeMatch: '/k8s/' },
        { text: 'Deploy', link: '/deploy/introduction', activeMatch: '/deploy/' },
        { text: 'Rust', link: '/rust/introduction', activeMatch: '/rust/' },
    ]
}

function sidebarGuide() {
    return [
        {
            text: '基础',
            collapsible: true,
            items: [
                { text: 'Mac M1安装Go语言环境', link: '/go/mac-install-go' },
                { text: 'Go基础', link: '/go/go-some-base' },
                { text: 'proto3语法', link: '/go/proto3-syntax' },
                // { text: 'Configuration', link: '/guide/configuration' },
                // { text: 'Deploying', link: '/guide/deploying' },
            ],
        },
        {
            text: 'Go基础加强',
            collapsible: true,
            items: [
                { text: '函数执行的超时控制', link: '/go/func-timeout' },
                { text: '限制协程执行的方法', link: '/go/limit-goroutine-run' },
                { text: '反射', link: '/go/go-reflect' },
                // { text: 'Using Vue in Markdown', link: '/guide/using-vue' },
                // { text: 'API Reference', link: '/guide/api' },
            ],
        },
        {
            text: 'Go面试自虐',
            collapsible: true,
            items: [
                { text: '明明是nil!=nil的问题', link: '/go/interview/go-nil-not-equal' },
                { text: 'defer的坑', link: '/go/interview/go-defer-question' },
                { text: '协程为什么总数先输出倒数第一个', link: '/go/interview/goroutine-why-last-output' },
                { text: '写一个带过期机制的kv获取map', link: '/go/interview/go-kv-map-get' },
                { text: 'Go的结构体能比较吗', link: '/go/interview/go-struct-compare' },
                { text: 'Go简单实现集合', link: '/go/interview/go-simple-set' },
                { text: 'Go浅拷贝和深拷贝的写法和区别', link: '/go/interview/go-sq-copy' },
                { text: 'Go内存逃逸分析', link: '/go/interview/go-memory-escape' },
                { text: 'Go的单例模式', link: '/go/interview/go-singleton' },
                { text: 'Go实现简单工厂模式', link: '/go/interview/go-simple-factory' },
                { text: 'Go实现抽象工厂模式', link: '/go/interview/go-abstract-factory' },
                { text: 'Go实现装饰器模式', link: '/go/interview/go-decorator' },
                { text: '简述Go的channel底层机制', link: '/go/interview/go-chan-dialog' },
                { text: '读写关闭的channel是啥后果', link: '/go/interview/go-io-close-chan' },
                { text: '简述Go的协程调度', link: '/go/interview/go-coroutine-dispatch' },
                { text: '简述Raft协议', link: '/go/interview/go-raft' },
                { text: '前缀树字典树', link: '/go/interview/go-prefix-tree' },
                { text: 'Go统计文本行数', link: '/go/interview/go-get-file-line' },
            ],
        },
        {
            text: 'Go并发模式',
            collapsible: true,
            items: [
                {
                    text: '常见的并发模式',
                    link: '/go/concurrent/introduction',
                },
                { text: 'Go管道模式', link: '/go/concurrent/go-pipe' },
                // {
                //     text: 'Migration from VitePress 0.x',
                //     link: '/guide/migration-from-vitepress-0',
                // },
            ],
        },
        {
            text: 'gin开发实战技巧',
            collapsible: true,
            items: [
                {
                    text: 'Gin通用模型构造封装',
                    link: '/go/ginskill/model-constructor',
                },
                {
                    text: 'Gin错误中间件拦截',
                    link: '/go/ginskill/common-error',
                },
                {
                    text: 'Gin通用响应封装',
                    link: '/go/ginskill/common-response',
                },
                {
                    text: 'Gin通用错误响应以及错误处理',
                    link: '/go/ginskill/common-error-result',
                },
                {
                    text: '限流算法',
                    link: '/go/ginskill/ratelimite',
                },
            ],
        },
        {
            text: 'go-websocket实战',
            collapsible: true,
            items: [
                { text: '最基本的websocket代码', link: '/go/ws/base' },
                { text: '保存客户端对象和分发消息', link: '/go/ws/store-client-obj' },
            ],
        },
    ]
}

function sidebarK8s() {
    return [
        {
            text: '简介',
            collapsible: true,
            items: [
                { text: '介绍', link: '/k8s/introduction' },
                { text: '组件结构', link: '/k8s/k8s-components' },
            ],
        },
        {
            text: 'cue-lang',
            collapsible: true,
            items: [{ text: 'cue介绍和基本使用', link: '/k8s/cue/base' }],
        },
        {
            text: 'Docker',
            collapsible: true,
            items: [
                { text: '安装Docker', link: '/k8s/docker/install' },
                { text: 'Docker基础操作', link: '/k8s/docker/base-op' },
            ],
        },
        {
            text: 'K8S速学',
            collapsible: true,
            items: [{ text: '快速部署Rancher2和K8S集群', link: '/k8s/kubernetes/deploy-rancher2-k8s' }],
        },
    ]
}

function sidebarDeploy() {
    return [
        {
            text: '简介',
            items: [
                { text: '介绍', link: '/deploy/introduction' },
                { text: 'PHP7.4编译安装', link: '/deploy/php-compile-install' },
                { text: 'Linux安装配置nginx', link: '/deploy/linux-install-nginx' },
            ],
        },
    ]
}

function sidebarRust() {
    return [
        {
            text: '基础学习',
            items: [
                { text: 'rust在windows下的安装', link: '/rust/base/win-install' },
                { text: 'rust的第一个程序', link: '/rust/base/first-rust' },
                { text: 'Cargo和vscode配置', link: '/rust/base/cargo-vscode-config' },
                { text: 'rust基本类型和创建数字变量的基本方式', link: '/rust/base/rust-basetype-vari' },
                { text: '函数和模块', link: '/rust/base/rust-fn-module' },
                { text: '函数参数传递', link: '/rust/base/fn-pass-vari' },
                { text: '表达式和语句以及条件判断', link: '/rust/base/rust-expression' },
                { text: '字符串练习', link: '/rust/base/rust-str-exercise' },
                { text: 'struct入门', link: '/rust/base/struct-base' },
            ],
        },
    ]
}
