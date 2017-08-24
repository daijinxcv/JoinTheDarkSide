import React from 'react';
import { FlatList, Modal, StyleSheet, ToastAndroid, View, Image } from 'react-native';
import {
  Button,
  FormInput,
  FormLabel,
  Header,
  Icon,
  List,
  ListItem,
  Text
} from 'react-native-elements';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props, ctx) {
    super(props, ctx);

    this.editTodo = this.editTodo.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.handlePressAdd = this.handlePressAdd.bind(this);
    this.handlePressEdit = this.handlePressEdit.bind(this);
    this.handlePressDelete = this.handlePressDelete.bind(this);
    this.closeModalView = this.closeModalView.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.toggleSwitch = this.toggleSwitch.bind(this);

    this.state = {
      descriptionInput: '',
      modalVisible: false,
      loginVisible: true,
      modeVisible: false,
      username: '',
      password: '',
      email: '',
      refreshing: false,
      titleInput: '',
      editId: null,
      mode: 'add',
      todoItems: []
    };
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos() {
    this.setState({ refreshing: true });

    return axios.get('http://192.168.1.4:3009/api/todos/')
      .then(response => {
        const todos = response.data;

        this.setState({
          refreshing: false,
          todoItems: todos.map(function (todo) {
            return {
              id: todo.id,
              title: todo.title,
              description: todo.description,
              switched: !!todo.done
            };
          })
        });
      })
      .catch(err => {
        this.setState({ refreshing: false });
        ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
      });
  }

  handlePressEdit() {
    const { todoItems } = this.state;
    const todoItem = todoItems[this.state.index];

    ToastAndroid.show(todoItem.title + " " + todoItem.description + " " + todoItem.id + " " + todoItem.done, ToastAndroid.SHORT);

    axios.put(`http://192.168.1.4:3009/api/todos/${todoItem.id}`, {
      title: this.state.titleInput,
      //title: todoItem.title,
      description: this.state.descriptionInput,
      //description: todoItem.description,
      done: !!todoItems.switched
    })
      .then(response => {
        ToastAndroid.show(response.data.message + ": " + this.state.titleInput + " - " + this.state.editId + " - " + this.state.descriptionInput + " - " + this.state.editId + " - " + !todoItem.switched, ToastAndroid.SHORT);

        this.setState({
          descriptionInput: '',
          modalVisible: false,
          titleInput: '',
          editId: null,
          mode: 'add'
        }, () => {
          this.getTodos();
        });
      });
  }

  handlePressDelete() {
    const { todoItems } = this.state;
    const todoItem = todoItems[this.state.editId];

    axios.post(`http://192.168.1.4:3009/api/todos/${this.state.editId}`, {
      id: this.state.editId
    })
      .then(response => {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);

        this.setState({
          descriptionInput: '',
          modalVisible: false,
          titleInput: '',
          editId: null,
          mode: 'add'
        }, () => {
          this.getTodos();
        });
      });
  }

  handlePressAdd() {
    const todoItems = this.state.todoItems.concat();
    const payload = {
      title: this.state.titleInput,
      description: this.state.descriptionInput,
      done: this.state.switched
    };

    axios.post('http://192.168.1.4:3009/api/todos/', payload)
      .then(response => {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);

        this.setState({
          descriptionInput: '',
          modalVisible: false,
          titleInput: ''
        })
      })
      .catch(err => ToastAndroid.show(err.response.data.error, ToastAndroid.LONG))
      .then(this.getTodos);
  }

  toggleSwitch(index) {
    const { todoItems } = this.state;
    const todoItem = todoItems[index];


    axios.put(`http://192.168.1.4:3009/api/todos/${todoItem.id}`, {
      title: todoItem.title,
      description: todoItem.description,
      done: !todoItem.switched
    })
      .then(response => {
        ToastAndroid.show(response.data.message + ": " + todoItem.title + " - " + todoItem.description + " - " + todoItem.id + " - " + !todoItem.switched, ToastAndroid.SHORT);

        this.setState({
          descriptionInput: '',
          modalVisible: false,
          titleInput: '',
          editId: null,
          mode: 'add'
        }, () => {
          this.getTodos();
        });
      });

    this.setState({
      todoItems: [
        ...todoItems.slice(0, index),
        {
          ...todoItem,
          switched: !todoItem.switched
        },
        ...todoItems.slice(index + 1)
      ]
    });
  }

  editTodo(index) {
    const todo = this.state.todoItems[index];
    ToastAndroid.show(index.toString(), ToastAndroid.SHORT);
    this.setState({
      modalVisible: true,
      titleInput: todo.title,
      descriptionInput: todo.description,
      mode: 'edit',
      editId: todo.id,
      index: index
    });
    ToastAndroid.show(todo.id.toString(), ToastAndroid.SHORT);
  }

  renderRow({ item, index }) {
    return (
      <ListItem
        style={{ backgroundColor: item.switched ? '#009C6B' : 'white' }}
        hideChevron={true}
        onPress={this.editTodo.bind(null, index)}
        onSwitch={this.toggleSwitch.bind(null, index)}
        subtitle={item.description}
        subtitleStyle={{ color: item.switched ? 'white' : '#a3a3a3' }}
        switched={item.switched}
        switchButton={true}
        title={item.title}
        titleStyle={{ color: item.switched ? 'white' : '#000000' }}
      />
    );
  }

  closeModalView() {
    this.setState({ modalVisible: false, mode: 'add', descriptionInput: '', titleInput: '', editId: '' });
  }

  render() {

    var bgImg = {
      uri: 'https://ih0.redbubble.net/image.265187439.2542/flat,800x800,070,f.u2.jpg'
    };

    return (
      <View>
        <Image source={bgImg} style={{ width: 400, height: 120, alignSelf: 'center' }} />

        <Modal
          animationType="slide"
          onRequestClose={() => this.setState({ modalVisible: false, mode: 'add' })}
          transparent={false}
          visible={this.state.modalVisible}>
          <View>
            <Image source={bgImg} style={{ width: 100, height: 60, alignSelf: 'center' }} />
            <Text h4 style={{ textAlign: 'center' }}>{this.state.mode === 'add' ? 'Magdagdag ng Gagawin' : 'I-edit ang Gagawin'}</Text>
            <FormLabel>Pamagat</FormLabel>
            <FormInput onChangeText={text => this.setState({ titleInput: text })} value={this.state.titleInput} />
            <FormLabel>Paglalarawan</FormLabel>
            <FormInput onChangeText={text => this.setState({ descriptionInput: text })} value={this.state.descriptionInput} />
            <Button onPress={this.state.mode === 'add' ? this.handlePressAdd : this.handlePressEdit} title={this.state.mode === 'add' ? 'Idagdag' : 'I-save ang binago'} buttonStyle={{ marginBottom: 5 }} backgroundColor="#009C6B" />
            <Button onPress={this.state.mode === 'add' ? this.closeModalView : this.handlePressDelete} title={this.state.mode === 'add' ? 'Isara' : 'I-delete'} buttonStyle={{ marginBottom: 5 }} backgroundColor={this.state.mode === 'add' ? 'gray' : 'red'} />
          </View>
        </Modal>

        <Modal
          animationType="slide"
          onRequestClose={() => this.setState({ loginVisible: false })}
          transparent={false}
          visible={this.state.loginVisible}>
          <View>
            <Image source={bgImg} style={{ width: 100, height: 60, alignSelf: 'center' }} />
            <Text h4 style={{ textAlign: 'center' }}>{'Welcome to Junkie To-do List App!'}</Text>
            <FormLabel>Email Address:</FormLabel>
            <FormInput onChangeText={text => this.setState({ email: text })} value={this.state.email} />
            <FormLabel>Password</FormLabel>
            <FormInput onChangeText={text => this.setState({ password: text })} value={this.state.password} />
            <Button onPress={() => this.setState({ loginVisible: false })} title="Login" buttonStyle={{ marginBottom: 5 }} backgroundColor="#009C6B" />
            <Button onPress={() => this.setState({ loginVisible: false })} title="Register" buttonStyle={{ marginBottom: 5 }} backgroundColor="#009C6B" />
          </View>
        </Modal>

        <Modal
          animationType="fade"
          onRequestClose={() => this.setState({ modeVisible: false })}
          transparent={false}
          visible={this.state.modeVisible}>
          <View>
            <Image source={bgImg} style={{ width: 100, height: 60, alignSelf: 'center' }} />
            <Text style={{ textAlign: 'center' }}>{'Magpalit ng nakikitang mga Gawain'}</Text>
            <FormLabel>Pamagat</FormLabel>
            <FormInput onChangeText={text => this.setState({ titleInput: text })} value={this.state.titleInput} />
            <FormLabel>Paglalarawan</FormLabel>
            <FormInput onChangeText={text => this.setState({ descriptionInput: text })} value={this.state.descriptionInput} />
            <Button onPress={} buttonStyle={{ marginBottom: 5 }} backgroundColor="#009C6B" />
            <Button onPress={() => this.setState({ modeVisible: false })} title='Isara' buttonStyle={{ marginBottom: 5 }} backgroundColor='blue' />
          </View>
        </Modal>

        <Header
          leftComponent={{ icon: 'menu', onPress: () => this.setState({ modeVisible: true }) }}
          centerComponent={{ text: 'Listahan ng Gagawin' }}
          rightComponent={{ icon: 'add', onPress: () => this.setState({ modalVisible: true }) }}
        />
        <List containerStyle={{ marginTop: 50 }}>
          <FlatList
            data={this.state.todoItems}
            keyExtractor={item => item.id}
            onRefresh={this.getTodos}
            refreshing={this.state.refreshing}
            renderItem={this.renderRow}
          />
        </List>
      </View>
    );
  }
}
