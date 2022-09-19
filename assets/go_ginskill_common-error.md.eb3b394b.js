import{_ as s,c as n,o as a,d as l}from"./app.15e8eba7.js";const C=JSON.parse('{"title":"\u5C01\u88C5\u4E2D\u95F4\u4EF6\u6765\u54CD\u5E94\u9519\u8BEF\u6D88\u606F","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u9519\u8BEF\u6355\u6349\u4E2D\u95F4\u4EF6\u7684\u5B9E\u73B0","slug":"\u9519\u8BEF\u6355\u6349\u4E2D\u95F4\u4EF6\u7684\u5B9E\u73B0"},{"level":2,"title":"gin \u4E2D\u8FDB\u884C\u6CE8\u518C","slug":"gin-\u4E2D\u8FDB\u884C\u6CE8\u518C"}],"relativePath":"go/ginskill/common-error.md","lastUpdated":null}'),p={name:"go/ginskill/common-error.md"},o=l(`<h1 id="\u5C01\u88C5\u4E2D\u95F4\u4EF6\u6765\u54CD\u5E94\u9519\u8BEF\u6D88\u606F" tabindex="-1">\u5C01\u88C5\u4E2D\u95F4\u4EF6\u6765\u54CD\u5E94\u9519\u8BEF\u6D88\u606F <a class="header-anchor" href="#\u5C01\u88C5\u4E2D\u95F4\u4EF6\u6765\u54CD\u5E94\u9519\u8BEF\u6D88\u606F" aria-hidden="true">#</a></h1><h2 id="\u9519\u8BEF\u6355\u6349\u4E2D\u95F4\u4EF6\u7684\u5B9E\u73B0" tabindex="-1">\u9519\u8BEF\u6355\u6349\u4E2D\u95F4\u4EF6\u7684\u5B9E\u73B0 <a class="header-anchor" href="#\u9519\u8BEF\u6355\u6349\u4E2D\u95F4\u4EF6\u7684\u5B9E\u73B0" aria-hidden="true">#</a></h2><div class="language-go line-numbers-mode"><button class="copy"></button><span class="lang">go</span><pre><code><span class="line"><span style="color:#89DDFF;">package</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">common</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">github.com/gin-gonic/gin</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ErrorHandler</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> gin</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">HandlerFunc </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">func(</span><span style="color:#A6ACCD;">c </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">gin</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Context</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">defer</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">func()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> e </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">recover</span><span style="color:#89DDFF;">();</span><span style="color:#A6ACCD;"> e </span><span style="color:#89DDFF;">!=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">				c</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">JSON</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">400</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> gin</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">H</span><span style="color:#89DDFF;">{</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">message</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> e</span><span style="color:#89DDFF;">})</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">}()</span></span>
<span class="line"><span style="color:#A6ACCD;">		c</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Next</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="gin-\u4E2D\u8FDB\u884C\u6CE8\u518C" tabindex="-1">gin \u4E2D\u8FDB\u884C\u6CE8\u518C <a class="header-anchor" href="#gin-\u4E2D\u8FDB\u884C\u6CE8\u518C" aria-hidden="true">#</a></h2><div class="language-go line-numbers-mode"><button class="copy"></button><span class="lang">go</span><pre><code><span class="line"><span style="color:#A6ACCD;">r </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> gin</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">New</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Use</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">common</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ErrorHandler</span><span style="color:#89DDFF;">())</span></span>
<span class="line"><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Run</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">:8080</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>`,5),e=[o];function r(c,t,D,F,y,i){return a(),n("div",null,e)}const u=s(p,[["render",r]]);export{C as __pageData,u as default};
