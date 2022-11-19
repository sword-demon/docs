import{_ as s,c as n,o as a,d as p}from"./app.dbf731ef.js";const i=JSON.parse('{"title":"\u57FA\u672C\u7684 websocket \u4EE3\u7801","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u7B2C\u4E09\u65B9\u5E93","slug":"\u7B2C\u4E09\u65B9\u5E93"}],"relativePath":"go/ws/base.md","lastUpdated":1663602250000}'),l={name:"go/ws/base.md"},e=p(`<h1 id="\u57FA\u672C\u7684-websocket-\u4EE3\u7801" tabindex="-1">\u57FA\u672C\u7684 websocket \u4EE3\u7801 <a class="header-anchor" href="#\u57FA\u672C\u7684-websocket-\u4EE3\u7801" aria-hidden="true">#</a></h1><blockquote><p>\u662F HTML5 \u63D0\u4F9B\u7684\u4E00\u4E2A\u6D4F\u89C8\u5668\u4E0E\u670D\u52A1\u5668\u4E4B\u95F4\u8FDB\u884C\u5168\u53CC\u5DE5\u901A\u8BAF\u7684\u7F51\u7EDC\u6280\u672F\u3002</p></blockquote><p>\u5168\u53CC\u5DE5\uFF1A\u5728\u540C\u4E00\u65F6\u523B\u4FE1\u606F\u53EF\u4EE5\u8FDB\u884C\u53CC\u5411\u4F20\u8F93\uFF0C\u548C\u6253\u7535\u8BDD\u4E00\u6837\uFF0C\u8BF4\u7684\u540C\u65F6\u4E5F\u80FD\u542C\uFF0C\u8FB9\u8BF4\u8FB9\u542C\u3002</p><p>\u662F\u57FA\u4E8E HTTP \u534F\u8BAE\u7684</p><div class="language-text line-numbers-mode"><button class="copy"></button><span class="lang">text</span><pre><code><span class="line"><span style="color:#A6ACCD;">GET /HTTP/1.1</span></span>
<span class="line"><span style="color:#A6ACCD;">Upgrade: websocket</span></span>
<span class="line"><span style="color:#A6ACCD;">Connection: Upgrade</span></span>
<span class="line"><span style="color:#A6ACCD;">Sec-WebSocket-Key: xxxxxxxx== # \u662F\u4E00\u4E2Abase64\u52A0\u5BC6\u7684\u79D8\u94A5</span></span>
<span class="line"><span style="color:#A6ACCD;">Sec-WebSocket-Version: 13 # \u544A\u8BC9\u670D\u52A1\u5668ws\u7684\u7248\u672C</span></span>
<span class="line"><span style="color:#A6ACCD;">Origin: http://xxx.com # \u6765\u6E90</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>\u5176\u4E2D\uFF1A<code>upgrade websocket</code>\u7528\u4E8E\u544A\u8BC9\u670D\u52A1\u5668\u6B64\u8FDE\u63A5\u9700\u8981\u5347\u7EA7\u5230<code>websocket</code>\uFF0C\u610F\u5473\u7740\u4F60\u7684\u670D\u52A1\u7AEF\u9700\u8981\u652F\u6301<code>websocket</code>\u534F\u8BAE\u3002</p><p><strong>\u670D\u52A1\u7AEF\u54CD\u5E94</strong></p><div class="language-text line-numbers-mode"><button class="copy"></button><span class="lang">text</span><pre><code><span class="line"><span style="color:#A6ACCD;">HTTP/1.1 101 Switching Protocols</span></span>
<span class="line"><span style="color:#A6ACCD;">Content-Length: 0</span></span>
<span class="line"><span style="color:#A6ACCD;">Upgrade: websocket</span></span>
<span class="line"><span style="color:#A6ACCD;">Sec-WebSocket-Accept: ZEs+c+VBdqwdqwdwqdqwdqw=dqwd</span></span>
<span class="line"><span style="color:#A6ACCD;">Connection: Upgrade</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul><li>101\uFF1A\u4EE3\u8868\u7684\u662F\u534F\u8BAE\u5207\u6362</li><li><code>Sec-WebSocket-Accept</code>\uFF1A\u8868\u793A\u670D\u52A1\u5668\u540C\u610F\u63E1\u624B\u5EFA\u7ACB\u8FDE\u63A5</li></ul><p>\u4E0B\u9762\u5F00\u59CB\u5C31\u548C<code>http</code>\u6CA1\u5565\u5173\u7CFB\u4E86\u3002</p><h2 id="\u7B2C\u4E09\u65B9\u5E93" tabindex="-1">\u7B2C\u4E09\u65B9\u5E93 <a class="header-anchor" href="#\u7B2C\u4E09\u65B9\u5E93" aria-hidden="true">#</a></h2><p>\u5730\u5740\uFF1A<a href="https://github.com/gorilla/websocket" target="_blank" rel="noreferrer">https://github.com/gorilla/websocket</a></p><p>\u5B89\u88C5\uFF1A</p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">go get github.com/gorilla/websocket</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>\u521B\u5EFA\u4E00\u4E2A<code>upgrader</code>\u5BF9\u8C61</p><div class="language-go line-numbers-mode"><button class="copy"></button><span class="lang">go</span><pre><code><span class="line"><span style="color:#89DDFF;">var</span><span style="color:#A6ACCD;"> upgrader </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> websocket</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Upgrader </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    CheckOrigin</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">func(</span><span style="color:#A6ACCD;">r </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">http</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Request</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">bool</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>\u8DE8\u57DF\u5904\u7406\uFF0C\u73B0\u5728\u662F\u6240\u6709\u6765\u6E90\u90FD\u53EF\u4EE5\u8BBF\u95EE\uFF1A<code>return true</code></p><div class="language-go line-numbers-mode"><button class="copy"></button><span class="lang">go</span><pre><code><span class="line"><span style="color:#89DDFF;">package</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">fmt</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">github.com/gorilla/websocket</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">log</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">net/http</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">time</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">var</span><span style="color:#A6ACCD;"> upgrader </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> websocket</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Upgrader</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	CheckOrigin</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">func(</span><span style="color:#A6ACCD;">r </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">http</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Request</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">bool</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	http</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">HandleFunc</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/echo</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">func(</span><span style="color:#A6ACCD;">w http</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">ResponseWriter</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> r </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">http</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Request</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#676E95;">// \u5BA2\u6237\u7AEF\u8FDE\u63A5\u5BF9\u8C61</span></span>
<span class="line"><span style="color:#A6ACCD;">		client</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> err </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> upgrader</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Upgrade</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">w</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> r</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil)</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u5347\u7EA7</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> err </span><span style="color:#89DDFF;">!=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">			fmt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Println</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">err</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">for</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">			err </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> client</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">WriteMessage</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">websocket</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">TextMessage</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[]</span><span style="color:#82AAFF;">byte</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">hello</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">))</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> err </span><span style="color:#89DDFF;">!=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">				log</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Println</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">err</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">			time</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Sleep</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">time</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Second </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">})</span></span>
<span class="line"><span style="color:#A6ACCD;">	err </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> http</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ListenAndServe</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">:8080</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil)</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> err </span><span style="color:#89DDFF;">!=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		log</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Fatalln</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">err</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><p>\u670D\u52A1\u542F\u52A8\u540E\uFF0C\u53EF\u4EE5\u627E\u4E00\u4E2A\u5728\u7EBF\u7684<code>websocket</code>\u6D4B\u8BD5\u7F51\u7AD9\u8FDB\u884C\u6D4B\u8BD5\u3002</p>`,19),o=[e];function r(c,t,D,F,y,A){return a(),n("div",null,o)}const b=s(l,[["render",r]]);export{i as __pageData,b as default};