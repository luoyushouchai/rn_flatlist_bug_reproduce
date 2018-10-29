/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            listDataSource: [{name: 0}, {name: 1}],
        };
        this.params = {
            index: 2,
        }
    }


    _renderItem(data) {
        return <View style={styles.item}>
            <Text>{data.item.name}</Text>
        </View>

    }

    _handleOnPressAddBtn = () => {
        const {listDataSource} = this.state;
        this.setState({
            listDataSource: [...listDataSource, {name: this.params.index}]
        }, ()=> {
            this.params.index = this.params.index + 1;
        });

    };

    _handleOnPressSubBtn= () => {
        const {listDataSource} = this.state;
        if (listDataSource.length < 1) {
            return;
        }
        this.setState({
            listDataSource: listDataSource.slice(0, listDataSource.length - 1),
        }, ()=> {
            this.params.index = this.params.index - 1;
        });
    };

    _handleOnContentSizeChange= ()=> {
        this.flatList.scrollToEnd();
    };


    render() {
        const {listDataSource} = this.state;
        return (
            <View style={styles.container}>
                <FlatList
                    ref={ref => this.flatList = ref}
                    data={listDataSource}
                    renderItem={this._renderItem}
                    horizontal={true}
                    onContentSizeChange={this._handleOnContentSizeChange}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={this._handleOnPressAddBtn}>
                        <Text>add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this._handleOnPressSubBtn}>
                        <Text>sub</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    item: {
        width: 50,
        height: 50,
        backgroundColor: '#FF0000',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        width: 88,
        height: 36,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FF0000',
        backgroundColor: '#FF0000',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
