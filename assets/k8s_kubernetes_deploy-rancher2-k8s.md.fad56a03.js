import{_ as s,c as e,o as a,d as n}from"./app.15e8eba7.js";const m=JSON.parse('{"title":"\u5FEB\u901F\u90E8\u7F72 Rancher2 \u548C K8S \u96C6\u7FA4","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u51C6\u5907\u5DE5\u4F5C","slug":"\u51C6\u5907\u5DE5\u4F5C"},{"level":2,"title":"\u4E3B\u8282\u70B9\u542F\u52A8 rancher","slug":"\u4E3B\u8282\u70B9\u542F\u52A8-rancher"}],"relativePath":"k8s/kubernetes/deploy-rancher2-k8s.md","lastUpdated":null}'),l={name:"k8s/kubernetes/deploy-rancher2-k8s.md"},p=n(`<h1 id="\u5FEB\u901F\u90E8\u7F72-rancher2-\u548C-k8s-\u96C6\u7FA4" tabindex="-1">\u5FEB\u901F\u90E8\u7F72 Rancher2 \u548C K8S \u96C6\u7FA4 <a class="header-anchor" href="#\u5FEB\u901F\u90E8\u7F72-rancher2-\u548C-k8s-\u96C6\u7FA4" aria-hidden="true">#</a></h1><h2 id="\u51C6\u5907\u5DE5\u4F5C" tabindex="-1">\u51C6\u5907\u5DE5\u4F5C <a class="header-anchor" href="#\u51C6\u5907\u5DE5\u4F5C" aria-hidden="true">#</a></h2><ol><li><p>\u975E\u5FC5\u987B</p><ol><li><p>\u505C\u6B62\u6240\u6709\u5BB9\u5668</p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">docker stop </span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">docker ps -a -q</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div></li><li><p>\u5220\u9664\u6240\u6709\u5BB9\u5668</p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">docker rm </span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">docker ps -a -q</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div></li></ol></li><li><p>\u5FC5\u987B</p><ol><li><p>\u5173\u95ED\u9632\u706B\u5899\uFF0C\u5982\u679C\u6709<code>iptables</code>\u4E5F\u5168\u90E8\u5E72\u6389</p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">systemctl stop firewalld </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> systemctl disable firewalld</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div></li><li><p>\u5173\u95ED<code>selinux</code></p><ol><li><code>setenforce 0</code></li><li><code>set -i&#39;s/SELINUX=enforcing/SELINUX=disabled/g&#39; /etc/selinux/config</code></li></ol></li><li><p>\u5173\u95ED<code>swap</code></p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">swapoff -a</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div></li></ol></li><li><p>\u91CD\u542F<code>docker</code></p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">sudo systemctl daemon-reload</span></span>
<span class="line"><span style="color:#A6ACCD;">sudo systemctl restart docker</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ol><h2 id="\u4E3B\u8282\u70B9\u542F\u52A8-rancher" tabindex="-1">\u4E3B\u8282\u70B9\u542F\u52A8 rancher <a class="header-anchor" href="#\u4E3B\u8282\u70B9\u542F\u52A8-rancher" aria-hidden="true">#</a></h2><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">sudo docker run -d --restart=unless-stopped -p 8080:80 -p 8443:443 -v /home/username/rancher:/var/lib/rancher/ rancher/rancher:stable</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>\u5BB9\u5668\u7AEF\u53E3 80 \u548C 443 \u662F\u56FA\u5B9A\u7684\uFF0C\u540C\u65F6\u9700\u8981\u5728\u963F\u91CC\u4E91\u6216\u8005 XX \u4E91\u6216\u8005\u522B\u7684\u4EC0\u4E48\u5F00\u542F\u8BBF\u95EE\u7AEF\u53E3\u3002</p><p><code>/home/username/rancher</code>\uFF0C\u81EA\u5DF1\u7528\u6237\u76EE\u5F55\u4E0B\u4E00\u5B9A\u8981\u521B\u5EFA\u4E00\u4E2A\u7A7A\u7684\u6587\u4EF6\u5939\u3002</p><p>\u542F\u52A8\u5B8C\u6BD5\u4E4B\u540E\uFF0C\u7B2C\u4E00\u6B21\u5B89\u88C5\u53EF\u80FD\u9700\u8981\u4E45\u4E00\u70B9\uFF0C\u7136\u540E\u4F7F\u7528\u5BF9\u5E94\u7684\u673A\u5668\u7684\u516C\u7F51 IP \u52A0\u4E0A 8080 \u7AEF\u53E3\u8FDB\u884C\u8BBF\u95EE\uFF0C\u6709\u70B9\u8010\u5FC3\u7B49\u4E00\u4F1A\uFF0C\u5982\u679C\u51FA\u73B0\u4EC0\u4E48\u79C1\u5BC6\u94FE\u63A5\uFF0C\u70B9\u51FB\u9AD8\u7EA7\uFF0C\u7136\u540E\u70B9\u51FB\u7EE7\u7EED\u524D\u5F80\u5373\u53EF\u3002</p><p>\u7B2C\u4E00\u6B21\u542F\u52A8\u7684\u65F6\u5019\uFF0C\u4F1A\u8BA9\u4F60\u8BBE\u7F6E\u65B0\u5BC6\u7801\uFF0C\u7136\u540E\u540C\u610F\u7EE7\u7EED\u5373\u53EF\u3002</p><p>\u5230\u4E86\u8BBE\u7F6E<code>Rancher Server URL</code>\u7684\u9875\u9762\u7684\u65F6\u5019\uFF0C\u9700\u8981\u586B\u5199\u4F60\u5BF9\u5E94\u7684\u5185\u7F51 IP \u52A0 8443 \u7AEF\u53E3</p><p>\u8FDB\u5165\u4E3B\u754C\u9762\u4E4B\u540E\uFF0C\u6211\u4EEC\u70B9\u51FB\u96C6\u7FA4\uFF0C\u70B9\u51FB\u81EA\u5B9A\u4E49\uFF0C\u8F93\u5165\u96C6\u7FA4\u540D\u79F0\uFF0C\u5176\u4ED6\u4EC0\u4E48\u90FD\u4E0D\u7528\u5E72\uFF0C\u5168\u90E8\u4F7F\u7528\u9ED8\u8BA4\u914D\u7F6E\uFF0C\u70B9\u51FB\u4E0B\u4E00\u6B65\uFF0C\u9488\u5BF9\u4E3B\u673A\uFF0C<code>master</code>\u8282\u70B9\uFF0C<code>etcd\u3001Control\u3001Worker</code>\u4E09\u4E2A\u89D2\u8272\u90FD\u8981\u52FE\u9009\u4E0A\u3002\u7136\u540E\u590D\u5236\u5B83\u7ED9\u7684\u547D\u4EE4\u5728\u4E3B\u673A\u4E0A\u6267\u884C\u5373\u53EF\u3002</p><p>\u7136\u540E\u5728\u81EA\u5DF1\u7684<code>worker</code>\u8282\u70B9\u673A\u5668\u4E0A\uFF0C\u6211\u4EEC\u628A<code>Etcd\u548CControl</code>\u52FE\u9009\u53BB\u6389\uFF0C\u5C31\u7559\u4E0B<code>Worker</code>\u4E4B\u540E\uFF0C\u590D\u5236\u5BF9\u5E94\u7684\u547D\u4EE4\u5230<code>worker</code>\u8282\u70B9\u673A\u5668\u4E0A\u8FD0\u884C\u3002</p><p>\u6700\u540E\u70B9\u51FB\u5B8C\u6210\u5373\u53EF\uFF0C\u9700\u8981\u7A0D\u5FAE\u7B49\u4E00\u4F1A\uFF0C\u9700\u8981\u4E0B\u8F7D\u5F88\u591A\u955C\u50CF\u3002</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>\u5982\u679C\u51FA\u73B0\u4EC0\u4E48 etcd \u7684\u9519\u8BEF\uFF0C\u6211\u4EEC\u5230\u5217\u8868\u9875\uFF0C\u628A\u4E0A\u9762\u65B0\u52A0\u7684\u5220\u9664\uFF0C\u7B49\u5230\u5B83\u9875\u9762\u5185\u5BB9\u5B8C\u5168\u6D88\u5931\uFF0C\u7136\u540E\u518D\u91CD\u590D\u4E00\u904D\u4E0A\u9762\u7684\u64CD\u4F5C\uFF0C\u7B49\u5230\u4E0B\u9762\u6709\u4E00\u4E2A\u63D0\u793A\uFF1A\u201C2 \u53F0\u65B0\u4E3B\u673A\u6CE8\u518C\u6210\u529F\u201D\u7684\u65F6\u5019\u518D\u70B9\u51FB\u5B8C\u6210\uFF0C\u518D\u7EE7\u7EED\u7B49\u5F85</p></div><p>\u5982\u679C\u96C6\u7FA4\u5217\u8868\u7684\u72B6\u6001\u680F\u51FA\u73B0<code>active</code>\uFF0C\u8BF4\u660E\u6210\u529F\u4E86\uFF0C\u5982\u679C\u6709\u611F\u53F9\u53F7\u63D0\u793A\u8282\u70B9 XX \u6CA1\u6FC0\u6D3B\uFF0C\u7EE7\u7EED\u7B49\u5F85\u5373\u53EF\uFF0C\u5B83\u8FD8\u5728\u6CE8\u518C\u5F53\u4E2D\uFF0C\u7B2C\u4E00\u6B21\u6574\uFF0C\u53EF\u4EE5\u53BB\u73A9\u4E00\u4F1A\u4E86\u3002</p>`,15),c=[p];function r(o,d,i,t,b,u){return a(),e("div",null,c)}const v=s(l,[["render",r]]);export{m as __pageData,v as default};
