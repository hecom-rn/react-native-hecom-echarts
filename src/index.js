import React from 'react';
import { Platform, View, WebView } from 'react-native';
import PropTypes from 'prop-types';

export default class Echart extends React.Component {
    static propTypes = {
        option: PropTypes.object.isRequired,
        onPress: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            height: props.height || 200,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.option !== this.props.option) {
            this.chart.reload();
        }
    }

    setOption = (option) => {
        this.chart.postMessage(JSON.stringify({setOption: option}));
    };

    render() {
        return (
            <View
                style={[{flex: 1, backgroundColor: 'transparent'}, this.props.style]}
                onLayout={event => {
                    const height = event.nativeEvent.layout.height;
                    if (this.state.height !== height) {
                        this.setState({height});
                    }
                }}
            >
                <WebView
                    bounces={false}
                    ref={ref => this.chart = ref}
                    originWhitelist={['*']}
                    injectedJavaScript={Echart.renderChart(this.props.option, this.state.height)}
                    scalesPageToFit={Platform.OS === 'android'}
                    source={Platform.OS === 'ios' ? require('./tpl.html') : {uri: 'file:///android_asset/echarts/tpl.html'}}
                    onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
                />
            </View>
        );
    }

    static toString(obj) {
        return JSON.stringify(obj, function (val) {
            if (typeof val === 'function') {
                return `~--demo--~${val}~--demo--~`;
            }
            return val;
        }).replace('\"~--demo--~', '').replace('~--demo--~\"', '').replace(/\\n/g, '').replace(/\\\"/g,"\"");
    } 

    static renderChart(option, height) {
        return `
            document.getElementById('main').style.width = 'auto';
            document.getElementById('main').style.height = '${height}px';
            var myChart = echarts.init(document.getElementById('main'));
            var optionStr = ${Echart.toString(option)};
            myChart.setOption(optionStr);
            myChart.on('click', function(param) {
                var seen = [];
                var paramsString = JSON.stringify(params, function(key, val) {
                    if (val != null && typeof val == 'object') {
                        if (seen.indexOf(val) >= 0) {
                            return;
                        }
                        seen.push(val);
                    }
                    return val;
                });
                window.postMessage(paramsString);
            });
        `;
    }
}