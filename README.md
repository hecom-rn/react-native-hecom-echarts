# react-native-hecom-echarts

[![Build Status](https://travis-ci.org/RNCommon/react-native-hecom-echarts.svg?branch=master)](https://travis-ci.org/RNCommon/react-native-hecom-echarts)

Echarts报表的封装库。

### 设置iOS

在打包过程中拷贝资源的时候，需要添加如下的脚本命令：

```
echartsSrcPath='node_modules/react-native-hecom-echarts/src/echarts.js'
echartsHtmlPath='node_modules/react-native-hecom-echarts/src/tpl.html'
# jsbundle打包过程...
cp $echartsSrcPath "[ResourcePath]/assets/${echartsSrcPath}"
cp $echartsHtmlPath "[ResourcePath]/assets/${echartsHtmlPath}"
```

### 设置Android

TODO