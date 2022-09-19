#!/usr/bin/env sh

set -e

npm run docs:build

cd docs/.vitepress/dist

git init
git add -A
git commit -m "doc git push"
# git push -f https://gitee.com/wxvirus/docs.git master:gh-pages
git push -f https://github.com/sword-demon/docs.git master:gh-pages

cd -
rm -rf docs/.vitepress/dist

git init
git add -A
git commit -m "开始推送主分支内容"
# git push -f https://gitee.com/wxvirus/docs.git master
git push -f https://github.com/sword-demon/docs.git master
