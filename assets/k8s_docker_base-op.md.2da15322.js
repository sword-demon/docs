import{_ as s,c as n,o as a,d as e}from"./app.f37b2480.js";const g=JSON.parse('{"title":"Docker \u6838\u5FC3\u8981\u7D20\u548C\u5E38\u7528\u64CD\u4F5C","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u547D\u4EE4","slug":"\u547D\u4EE4"}],"relativePath":"k8s/docker/base-op.md","lastUpdated":1663602250000}'),l={name:"k8s/docker/base-op.md"},p=e(`<h1 id="docker-\u6838\u5FC3\u8981\u7D20\u548C\u5E38\u7528\u64CD\u4F5C" tabindex="-1">Docker \u6838\u5FC3\u8981\u7D20\u548C\u5E38\u7528\u64CD\u4F5C <a class="header-anchor" href="#docker-\u6838\u5FC3\u8981\u7D20\u548C\u5E38\u7528\u64CD\u4F5C" aria-hidden="true">#</a></h1><p>\u4E09\u5927\u6838\u5FC3\u8981\u7D20\uFF1A\u955C\u50CF(Image)\u3001\u5BB9\u5668(Container)\u3001\u4ED3\u5E93(Registry)</p><p><strong>\u955C\u50CF</strong></p><blockquote><p>\u6253\u5305\u4E86\u4E1A\u52A1\u4EE3\u7801\u4EE5\u53CA\u8FD0\u884C\u73AF\u5883\u7684\u5305\uFF0C\u662F\u9759\u6001\u7684\u6587\u4EF6\uFF0C\u4E0D\u80FD\u76F4\u63A5\u5BF9\u5916\u63D0\u4F9B\u670D\u52A1\u3002</p></blockquote><p>\u672C\u5730\u786E\u5B9A\u552F\u4E00\u7684\u955C\u50CF</p><ol><li><code>REPOSITORY</code> + <code>TAG</code></li><li><code>IMAGE ID</code></li></ol><p><strong>\u5BB9\u5668</strong></p><blockquote><p>\u955C\u50CF\u8FD0\u884C\u65F6\uFF0C\u53EF\u4EE5\u5BF9\u5916\u63D0\u4F9B\u670D\u52A1\u3002</p></blockquote><p><strong>\u4ED3\u5E93</strong></p><blockquote><p>\u5B58\u653E\u955C\u50CF\u7684\u5730\u65B9</p></blockquote><ul><li>\u516C\u6709\u4ED3\u5E93\uFF1ADocker Hub\u3001\u963F\u91CC\u3001\u7F51\u6613\u3002\u3002\u3002</li><li>\u79C1\u6709\u4ED3\u5E93\uFF0C\u4F01\u4E1A\u5185\u90E8\u642D\u5EFA <ul><li>Docker Registry\uFF0CDocker \u5B98\u65B9\u63D0\u4F9B\u7684\u955C\u50CF\u4ED3\u5E93\u5B58\u50A8\u670D\u52A1</li><li>Harbor\uFF0C\u662F Docker Registry \u7684\u66F4\u9AD8\u7EA7\u5C01\u88C5\uFF0C\u5B83\u9664\u4E86\u63D0\u4F9B\u53CB\u597D\u7684<code>Web UI</code>\u754C\u9762\uFF0C\u89D2\u8272\u548C\u7528\u6237\u6743\u9650\uFF0C\u7528\u6237\u64CD\u4F5C\u5BA1\u8BA1\u7B49\u529F\u80FD</li></ul></li><li>\u955C\u50CF\u8BBF\u95EE\u5F62\u5F0F\u5730\u5740<code>registry.devops.com/demo/hello:latest</code>\uFF0C\u82E5\u6CA1\u6709\u524D\u9762\u7684<code>url</code>\u5730\u5740\uFF0C\u5219\u9ED8\u8BA4\u4ECE<code>Docker Hub</code>\u4E2D\u7684\u955C\u50CF\uFF0C\u82E5\u6CA1\u6709<code>tag</code>\u6807\u7B7E\uFF0C\u5219\u4F7F\u7528<code>latest</code>\u4F5C\u4E3A\u6807\u7B7E\u3002\u6BD4\u5982\uFF1A<code>docker pull nginx</code>\uFF0C\u4F1A\u88AB\u89E3\u6790\u6210\uFF1A<code>docker.io/library/nginx:latest</code></li><li>\u516C\u6709\u4ED3\u5E93\u4E2D\uFF0C\u4E00\u822C\u5B58\u6709\u8FD9\u4E48\u51E0\u7C7B\u955C\u50CF <ul><li>\u64CD\u4F5C\u7CFB\u7EDF\u57FA\u7840\u955C\u50CF(centos\u3001ubuntu\u3001suse\u3001alpine)</li><li>\u4E2D\u95F4\u4EF6(nginx\u3001redis\u3001mysql\u3001tomcat)</li><li>\u8BED\u8A00\u7F16\u8BD1\u73AF\u5883(python\u3001java\u3001go)</li><li>\u4E1A\u52A1\u955C\u50CF(django-demo\u3002\u3002\u3002)</li></ul></li></ul><div class="tip custom-block"><p class="custom-block-title">\u6CE8\u610F</p><p>\u5BB9\u5668\u548C\u4ED3\u5E93\u4E0D\u4F1A\u76F4\u63A5\u4EA4\u4E92\uFF0C\u90FD\u662F\u4EE5\u955C\u50CF\u4E3A\u8F7D\u4F53\u6765\u64CD\u4F5C</p></div><h2 id="\u547D\u4EE4" tabindex="-1">\u547D\u4EE4 <a class="header-anchor" href="#\u547D\u4EE4" aria-hidden="true">#</a></h2><ol><li><p>\u67E5\u770B\u955C\u50CF\u5217\u8868</p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">docker images</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div></li><li><p>\u5982\u679C\u83B7\u53D6\u955C\u50CF</p><ol><li><p>\u4ECE\u8FDC\u7A0B\u4ED3\u5E93\u62C9\u53D6</p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">docker pull nginx:alpine</span></span>
<span class="line"><span style="color:#A6ACCD;">docker images</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li><li><p>\u4F7F\u7528<code>tag</code>\u547D\u4EE4</p><p>\u57FA\u4E8E\u4F60\u672C\u5730\u7684\u955C\u50CF\u5EFA\u7ACB\u4E00\u4E2A\uFF0C\u540E\u9762\u7684\u662F\u4E00\u4E2A\u522B\u540D<code>172.21.51.143:5000/nginx:alpine</code></p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">docker tag ningx:alpine 172.21.51.143:5000/nginx:alpine</span></span>
<span class="line"><span style="color:#A6ACCD;">docker images</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u4F60\u4F1A\u53D1\u73B0\u751F\u6210\u7684 2 \u4E2A\u955C\u50CF\u7684<code>IMAGE ID</code>\u90FD\u662F\u4E00\u6837\u7684</p><p>\u4F7F\u7528<code>docker info</code>\u67E5\u770B<code>Docker Root Dir</code>\u76EE\u5F55\u8DEF\u5F84\uFF0C\u7136\u540E\u53EF\u4EE5\u53BB\u67E5\u770B\u5BF9\u5E94\u7684\u6240\u6709\u6587\u4EF6:</p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">ll /var/lib/docker</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div></li><li><p>\u672C\u5730\u6784\u5EFA</p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">docker build </span><span style="color:#82AAFF;">.</span><span style="color:#A6ACCD;"> -t my-nginx:ubuntu -f Dockerfile</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div></li></ol></li><li><p>\u901A\u8FC7\u955C\u50CF\u542F\u52A8\u5BB9\u5668</p><p><code>-d</code>\u4EE5\u5B88\u62A4\u8FDB\u7A0B\u8FD0\u884C</p><p><code>--name</code>\u7ED9\u5BB9\u5668\u8D77\u4E00\u4E2A\u540D\u79F0</p><p>\u6700\u540E\u52A0\u4E0A\u6307\u5B9A\u54EA\u4E2A\u955C\u50CF</p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">docker run --name my-nginx-alpine -d nginx:alpine</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>\u53EF\u4EE5\u4F7F\u7528<code>docker ps</code>\u6765\u67E5\u770B\u8FD0\u884C\u7684\u5BB9\u5668</p></li><li><p>\u5220\u9664\u5BB9\u5668</p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">docker rm \u5BB9\u5668ID</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">\u53EF\u4EE5\u5199ID\u7684\u524D3\u4F4D</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>\u6211\u4EEC\u4E0D\u80FD\u5220\u8FD0\u884C\u4E2D\u7684\u5BB9\u5668\uFF0C\u6211\u4EEC\u5F97\u5148\u5C06\u5B83\u505C\u6B62</p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">docker stop \u5BB9\u5668id</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div></div><p><strong>\u5F3A\u5236\u5220\u9664</strong></p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">docker rm -f \u5BB9\u5668id</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div></li><li><p>\u5220\u9664\u955C\u50CF</p><p><code>rm</code> + <code>i(image)</code>\u5220\u9664\u955C\u50CF</p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">docker rmi IMAGEID/\u522B\u540D</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div></li><li><p>\u5982\u4F55\u77E5\u9053\u5BB9\u5668\u5185\u90E8\u8FD0\u884C\u4E86\u4EC0\u4E48\u7A0B\u5E8F</p><p><code>-ti</code>\u8FDB\u5165\u5BB9\u5668\u5F00\u542F\u4E00\u4E2A<code>tty</code>\u7684\u7EC8\u7AEF</p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#676E95;"># \u8FDB\u5165\u5BB9\u5668\u5185\u90E8\uFF0C\u5206\u914D\u4E00\u4E2A tty \u7EC8\u7AEF</span></span>
<span class="line"><span style="color:#A6ACCD;">docker </span><span style="color:#82AAFF;">exec</span><span style="color:#A6ACCD;"> -ti my-nginx-alpine /bin/sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># ps aux \u67E5\u770B\u542F\u52A8\u4E86\u4EC0\u4E48\u8FDB\u7A0B</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u67E5\u770B\u672C\u5730\u76D1\u542C\u7684\u7AEF\u53E3</span></span>
<span class="line"><span style="color:#A6ACCD;">netstat -nltp</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u8BBF\u95EE\u672C\u5730\u5730\u5740</span></span>
<span class="line"><span style="color:#A6ACCD;">curl localhost:80</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u53EF\u4EE5\u5F97\u5230\u4E00\u4E2Anginx\u7684\u521D\u59CB\u9875\u9762</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u8FDB\u5165\u5BB9\u5668\u91CC\u53EF\u4EE5\u67E5\u770B\u5BF9\u5E94\u7684\u53D1\u884C\u7248</span></span>
<span class="line"><span style="color:#A6ACCD;">cat /etc/</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">-release</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div></li><li><p><code>docker</code>\u600E\u4E48\u77E5\u9053\u5BB9\u5668\u542F\u52A8\u540E\u8BE5\u6267\u884C\u4EC0\u4E48\u547D\u4EE4</p><p>\u901A\u8FC7<code>docker build</code>\u6765\u6A21\u62DF\u6784\u5EFA\u4E00\u4E2A<code>nginx</code>\u7684\u955C\u50CF</p><ul><li><p>\u521B\u5EFA<code>Dockerfile</code></p><div class="language- line-numbers-mode"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;"># \u544A\u8BC9docker\u4F7F\u7528\u54EA\u4E2A\u57FA\u7840\u955C\u50CF\u4F5C\u4E3A\u6A21\u677F</span></span>
<span class="line"><span style="color:#A6ACCD;">FROM ubuntu</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># RUN \u547D\u4EE4\u4F1A\u5728\u4E0A\u9762\u6307\u5B9A\u7684\u955C\u50CF\u91CC\u6267\u884C\u547D\u4EE4</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN apt-get update &amp;&amp; apt install -y nginx</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u544A\u8BC9docker\uFF0C\u542F\u52A8\u5BB9\u5668\u65F6\u6267\u884C\u5982\u4E0B\u547D\u4EE4</span></span>
<span class="line"><span style="color:#A6ACCD;">CMD [&quot;/usr/sbin/nginx&quot;, &quot;-g&quot;, &quot;daemon off;&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></li><li><p>\u6784\u5EFA\u672C\u5730\u955C\u50CF</p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">docker build </span><span style="color:#82AAFF;">.</span><span style="color:#A6ACCD;"> -t my-nginx:ubuntu -f Dockerfile</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div></li><li><p>\u4F7F\u7528\u65B0\u955C\u50CF\u542F\u52A8\u5BB9\u5668</p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">docker run --name my-new-nginx -d my-nginx:ubuntu</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div></li><li><p>\u8FDB\u5165\u5BB9\u5668\u67E5\u770B\u8FDB\u7A0B</p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">docker </span><span style="color:#82AAFF;">exec</span><span style="color:#A6ACCD;"> -ti my-new-nginx /bin/sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># ps aux</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li></ul></li></ol>`,14),c=[p];function o(i,r,d,t,b,u){return a(),n("div",null,c)}const A=s(l,[["render",o]]);export{g as __pageData,A as default};