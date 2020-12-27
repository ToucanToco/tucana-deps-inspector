#!/bin/sh

cd $1
for file in $(echo src/**/*.{vue,js,ts} | fmt -w 1 | grep -E -v '(test|specs|storybook).(js|ts)' | grep -v __mocks__)
do
  requires=$(cat $file | grep -o "require('[^']*')" | colrm 1 9 | rev | colrm 1 2 | rev)
  imports=$(cat $file | grep '^import ' | grep -o "'[^']*';$" | colrm 1 1 | rev | colrm 1 2 | rev)
  async_oneline_imports=$(cat $file | grep "[^{]import(.*'\S*')" | grep -o "'[^']*'" | colrm 1 1 | rev | colrm 1 1 | rev)
  async_multiline_imports=$(cat $file | grep -A 1 "import($" | grep -o "'\S*'" | colrm 1 1 | rev | colrm 1 1 | rev)
  deps=$(echo $imports $requires $async_oneline_imports $async_multiline_imports | fmt -w 1 | grep -v '^[a-z]' | grep -v '@[a-z]' | grep -E -v '(json|png|pug|scss|svg)$')
  for dep in $deps
  do
    # resolves the @/ prefix, cf tsconfig and jsconfig
    dep=$(echo $dep | sed 's/^@/src/')

    # resolve the relative dependencies
    if [[ $dep ==  .* ]]
    then
      dep=$(realpath --relative-to=$PWD $(dirname $file)/$dep)
    fi

    # resolves the extension or index
    for ext in .js .ts .vue /index.js /index.ts
    do
      if [ -f $dep$ext ]; then dep=$dep$ext; break; fi
    done
    
    echo $file,$dep
  done
done
cd - > /dev/null
