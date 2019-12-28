find * -type l -not -exec grep -q "^{}$" .gitignore \; -print >> .gitignore
find * -type d -name node_modules >> .gitignore
git add .
git commit -m '$1' -a
git push origin master

