import{_ as s,c as n,o as a,d as l}from"./app.15e8eba7.js";const C=JSON.parse('{"title":"\u5199\u4E00\u4E2A\u5E26\u8FC7\u671F\u673A\u5236\u7684 kv \u83B7\u53D6 map","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u5206\u6790\u70B9","slug":"\u5206\u6790\u70B9"},{"level":2,"title":"\u7B80\u5355\u7F16\u5199","slug":"\u7B80\u5355\u7F16\u5199"}],"relativePath":"go/interview/go-kv-map-get.md","lastUpdated":null}'),p={name:"go/interview/go-kv-map-get.md"},e=l(`<h1 id="\u5199\u4E00\u4E2A\u5E26\u8FC7\u671F\u673A\u5236\u7684-kv-\u83B7\u53D6-map" tabindex="-1">\u5199\u4E00\u4E2A\u5E26\u8FC7\u671F\u673A\u5236\u7684 kv \u83B7\u53D6 map <a class="header-anchor" href="#\u5199\u4E00\u4E2A\u5E26\u8FC7\u671F\u673A\u5236\u7684-kv-\u83B7\u53D6-map" aria-hidden="true">#</a></h1><h2 id="\u5206\u6790\u70B9" tabindex="-1">\u5206\u6790\u70B9 <a class="header-anchor" href="#\u5206\u6790\u70B9" aria-hidden="true">#</a></h2><ol><li>\u539F\u59CB\u7684<code>map</code>\u4E0D\u662F\u7EBF\u7A0B\u5B89\u5168\u7684\uFF0C\u6240\u4EE5\u4F7F\u7528<code>sync.Map</code></li><li>\u6216\u8005\u53EF\u4EE5\u81EA\u5DF1\u52A0\u9501</li><li>\u8FC7\u671F\uFF1A\u53EF\u4EE5\u4F7F\u7528<code>time.AfterFunc</code>\u51FD\u6570</li></ol><h2 id="\u7B80\u5355\u7F16\u5199" tabindex="-1">\u7B80\u5355\u7F16\u5199 <a class="header-anchor" href="#\u7B80\u5355\u7F16\u5199" aria-hidden="true">#</a></h2><div class="language-go line-numbers-mode"><button class="copy"></button><span class="lang">go</span><pre><code><span class="line"><span style="color:#89DDFF;">var</span><span style="color:#A6ACCD;"> kv sync</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Map</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Set</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">key </span><span style="color:#C792EA;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> value </span><span style="color:#89DDFF;">interface{},</span><span style="color:#A6ACCD;"> expire time</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Duration</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	kv</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Store</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> value</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	time</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AfterFunc</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">expire</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">func()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#676E95;">// \u8FC7\u671F\u540E\u5E72\u6389\u5B83</span></span>
<span class="line"><span style="color:#A6ACCD;">		kv</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Delete</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">})</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">test21</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#82AAFF;">Set</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ID</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">101</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> time</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Second</span><span style="color:#89DDFF;">*</span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#82AAFF;">Set</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\u5F20\u4E09</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> time</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Second</span><span style="color:#89DDFF;">*</span><span style="color:#F78C6C;">8</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">for</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		fmt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Println</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">kv</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Load</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ID</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">))</span></span>
<span class="line"><span style="color:#A6ACCD;">		fmt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Println</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">kv</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Load</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">))</span></span>
<span class="line"><span style="color:#A6ACCD;">		time</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Sleep</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">time</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Second</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">\u279C ./run</span></span>
<span class="line"><span style="color:#A6ACCD;">101 </span><span style="color:#82AAFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">\u5F20\u4E09 </span><span style="color:#82AAFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">101 </span><span style="color:#82AAFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">\u5F20\u4E09 </span><span style="color:#82AAFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">101 </span><span style="color:#82AAFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">\u5F20\u4E09 </span><span style="color:#82AAFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">101 </span><span style="color:#82AAFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">\u5F20\u4E09 </span><span style="color:#82AAFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">101 </span><span style="color:#82AAFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">\u5F20\u4E09 </span><span style="color:#82AAFF;">true</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">nil</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">false</span></span>
<span class="line"><span style="color:#A6ACCD;">\u5F20\u4E09 </span><span style="color:#82AAFF;">true</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">nil</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">false</span></span>
<span class="line"><span style="color:#A6ACCD;">\u5F20\u4E09 </span><span style="color:#82AAFF;">true</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">nil</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">false</span></span>
<span class="line"><span style="color:#A6ACCD;">\u5F20\u4E09 </span><span style="color:#82AAFF;">true</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">nil</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">false</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">nil</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">false</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div>`,6),o=[e];function r(c,t,D,F,A,y){return a(),n("div",null,o)}const b=s(p,[["render",r]]);export{C as __pageData,b as default};
