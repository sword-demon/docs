import{_ as s,c as n,o as a,d as l}from"./app.15e8eba7.js";const i=JSON.parse('{"title":"\u9650\u5236\u534F\u7A0B\u6267\u884C\u7684\u57FA\u672C\u65B9\u6CD5","description":"","frontmatter":{},"headers":[{"level":2,"title":"demo","slug":"demo"}],"relativePath":"go/limit-goroutine-run.md","lastUpdated":null}'),p={name:"go/limit-goroutine-run.md"},o=l(`<h1 id="\u9650\u5236\u534F\u7A0B\u6267\u884C\u7684\u57FA\u672C\u65B9\u6CD5" tabindex="-1">\u9650\u5236\u534F\u7A0B\u6267\u884C\u7684\u57FA\u672C\u65B9\u6CD5 <a class="header-anchor" href="#\u9650\u5236\u534F\u7A0B\u6267\u884C\u7684\u57FA\u672C\u65B9\u6CD5" aria-hidden="true">#</a></h1><h2 id="demo" tabindex="-1">demo <a class="header-anchor" href="#demo" aria-hidden="true">#</a></h2><div class="language-go line-numbers-mode"><button class="copy"></button><span class="lang">go</span><pre><code><span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">job</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">index </span><span style="color:#C792EA;">int</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;">// \u6A21\u62DF\u5EF6\u8FDF</span></span>
<span class="line"><span style="color:#A6ACCD;">	time</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Sleep</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">time</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Millisecond </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">500</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	fmt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Printf</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\u6267\u884C\u5B8C\u6BD5\uFF0C\u5E8F\u53F7: %d</span><span style="color:#A6ACCD;">\\n</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> index</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">var</span><span style="color:#A6ACCD;"> pool </span><span style="color:#89DDFF;">chan</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">struct{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;">// \u9650\u523610\u4E2A</span></span>
<span class="line"><span style="color:#A6ACCD;">	maxNum </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span></span>
<span class="line"><span style="color:#A6ACCD;">	pool </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">make</span><span style="color:#89DDFF;">(chan</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">struct{},</span><span style="color:#A6ACCD;"> maxNum</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	wg </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> sync</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">WaitGroup</span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">for</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> i</span><span style="color:#89DDFF;">++</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		pool </span><span style="color:#89DDFF;">&lt;-</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">struct{}{}</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u5230\u8FBE\u6700\u5927\u957F\u5EA6\u662F\u963B\u585E</span></span>
<span class="line"><span style="color:#A6ACCD;">		wg</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Add</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">go</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">func(</span><span style="color:#A6ACCD;">index </span><span style="color:#C792EA;">int</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">defer</span><span style="color:#A6ACCD;"> wg</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Done</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">defer</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">func()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">&lt;-</span><span style="color:#A6ACCD;">pool</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">}()</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#82AAFF;">job</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">index</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">}(</span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	wg</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Wait</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div>`,3),e=[o];function r(t,c,D,F,y,A){return a(),n("div",null,e)}const b=s(p,[["render",r]]);export{i as __pageData,b as default};