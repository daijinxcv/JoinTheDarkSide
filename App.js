import React, { Component } from 'react';
import { Switch, ToastAndroid, StyleSheet, Text, FlatList, ListView, View, AppRegistry, Image, TextInput, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      arri: titleArray = [],
      value: false,
    };
  }

  addToList(passedTitle, passedDescription, passedArray) {

    if (passedTitle != '' && passedDescription != '') {
      var len = passedArray.length + 1;
      passedArray.push({ key: len, title: passedTitle, description: passedDescription, check: false, che: 'none' });
      passedArray.concat([{
        key: len,
        title: passedTitle,
        description: passedDescription,
        check: false
      }]);
      passedArray = passedArray.concat();
      this.setState({
        arri: passedArray,
        title: '',
        description: '',
        value: false,
        che: 'none',
      });
    } else {
      ToastAndroid.show("Aww. You need to type something. :(", ToastAndroid.SHORT);
    }
  }

  render() {

    var bgImg = {
      uri: 'https://ih0.redbubble.net/image.265187439.2542/flat,800x800,070,f.u2.jpg'
    };

    //var che = this.state.value ? 'line-through' : 'none';

    return (
      <View style={styles.mainStyle}>
        <Image source={bgImg} style={{ width: 400, height: 120, alignSelf: 'center' }} />
        <Text style={styles.centered}>Todo-list app using React Native!</Text>
        <View>
          <Text style={{ marginTop: 20 }}>Current Todo-list(s):</Text>

          <FlatList
            data={this.state.arri}
            renderItem={
              ({ item }) => <View>
                <Switch
                  onValueChange={(val) => {
                    this.setState({
                      arri: this.state.arri.concat(),
                    });
                    item.check = val;
                    item.che = val ? 'line-through' : 'none';
                  }}
                  value={item.check}
                />
                <Text style={{ textDecorationLine: item.che }}>{item.key}: {item.title} - {item.description}</Text>
              </View>
            }
          />

        </View>
        <View style={{ marginTop: 10, borderTopWidth: 1 }}>
          <Text style={{ alignSelf: 'center' }} >Add a new task</Text>
          <Text>Title:</Text>
          <TextInput value={this.state.title} style={styles.inputField} placeholder="Type the title for your to-do here." onChangeText={(title) => this.setState({ title })} />
          <Text>Description:</Text>
          <TextInput value={this.state.description} style={styles.inputField} placeholder="Type the description for your to-do here." onChangeText={(description) => this.setState({ description })} />
          <Button onPress={(e) => this.addToList(this.state.title, this.state.description, this.state.arri)} title="Add" color="#841584" accessibilityLabel="This button will add the title and description from the input fields above to the list above." />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  mainStyle: {
    //backgroundColor: '#ffc76a',
  },
  listDesign: {
    //flex: 1,
    marginTop: 20,
  },

  centered: {
    alignSelf: 'center',
  },

  inputField: {
    height: 50,
  },
}
);