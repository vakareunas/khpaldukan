import React, { Component } from 'react'
import { View, Modal,
    ActivityIndicator, AsyncStorage } from 'react-native'
import { Container, Title, Content, Button, Text, Icon, Card, CardItem, Body, Form, Item, Input, Textarea, Left, Right } from 'native-base'

import colors from './assets/Colors'

import { connect } from 'react-redux'

import base from './base'
import axios from 'axios';

class LoginScreen extends Component {
    
    static navigationOptions =  ({ navigation, screenProps }) => ({
        title: 'Login',
        headerStyle:{
            backgroundColor: colors.third,
      },
      headerTintColor: colors.white,
      headerLeft: <Icon name='arrow-back' style={{ color: colors.white, paddingLeft: 4}} onPress={() => navigation.goBack(null)} />
    });
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            fullname: '',
            mobile: '',
            address: '',
            loading: false
        }
    }
    _guestCheckout() {
        if (this.state.fullname == '' || this.state.mobile == '' || this.state.address == '') {
            alert('Please fill the required fields')
        }
        this.setState({ loading: true })
        axios.post(`${base}guest-checkout`, {orders: this.props.cartItems, fullname: this.state.fullname,
        mobile: this.state.mobile, address: this.state.address}).then(response => {
            this.setState({ loading: false })
            alert(response.data)
            console.log(response.data)
            this.props.emptyCart()
            this.props.navigation.navigate('Home')
            }).catch(err => {
                console.log(err)
            })
    }
    async storeToken(token, user) {
        try {
           await AsyncStorage.setItem('user', user);
        } catch (error) {
          console.log("Something went wrong", error);
        }
    }
    _login() {
        if (this.state.username == '' || this.state.password == '') {
            alert('Please fill the required fields')
        }
        this.setState({ loading: true })
        axios.post(`${base}mobile-user-login`, {
            username: this.state.username,
            password: this.state.password,
            orders: this.props.cartItems
        }).then( response => {
            if (response.data.token) {
                this.storeToken(response.data.token, response.data.usid)
                this.setState({ loading: false })
                this.props.emptyCart()
                this.props.navigation.navigate('Dashboard')
            } else {
                this.setState({ loading: false })
                alert('Username or password may be wrong.')
            }
        }).catch(err => {
            this.setState({ loading: false })
            alert(err)
            console.log(err)
        })
    }
    componentWillMount() {
        // if (AsyncStorage.getItem('user')) {
        //     this.props.navigation.navigate('Dashboard')
        // }
        //AsyncStorage.clear()
    }
    render() {
        return (
          <Container>
            
            <Modal
            transparent={true}
            animationType={'none'}
            visible={this.state.loading}>
            <View style={{ flex: 1,
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        backgroundColor: '#00000040'}}>
                <View style={{ backgroundColor: '#FFFFFF',
                        height: 100,
                        width: 100,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around'}}>
                <ActivityIndicator
                    animating={this.state.loading} />
                    <Text style={{textAlign: 'center'}}>Processing...</Text>
                </View>
            </View>
            </Modal>

            <Content>
                <Card transparent>
                    <CardItem>
                        <Body>
                            <Title style={{color: colors.third}}>Sign in to account </Title>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text style={{color: colors.secondary}}>Total (<Text onPress={() => this.props.navigation.navigate('Cart')} style={{color: colors.primary, fontWeight: 'bold'}}>{this.props.cartItems.length}</Text>) items in cart <Text onPress={() => this.props.navigation.navigate('Cart')} style={{color: colors.primary}}>View your cart</Text></Text>
                        </Body>
                    </CardItem>
                </Card>

                {
                    this.props.cartItems.length > 0 ? 
                    <View>
                        <Form style={{marginTop: 60, backgroundColor: colors.gray}}>
                            <Item regular>
                                <Input placeholder="Enter your name"
                                onChangeText={(fullname) =>this.setState({fullname})}
                                value={this.state.fullname}
                                 />
                            </Item >
                            <Item regular>
                                <Input placeholder="Enter your mobile" keyboardType='numeric'
                                onChangeText={mobile => this.setState({mobile})}
                                value={this.state.mobile}
                                />
                            </Item>
                            <Item regular>
                                <Textarea style={{width: '100%'}} rowSpan={5} bordered placeholder="Delivery Address"
                                onChangeText={address => this.setState({address})} 
                                value={this.state.address} />
                            </Item>
                            <View style={{padding: 10}}>
                                <Button small style={{backgroundColor: colors.third, height: 30}}
                                onPress={() => this._guestCheckout()} >
                                    <Text style={{fontSize: 11, fontWeight: 'bold', color: colors.white}}>Proceed to checkout</Text>
                                </Button>
                            </View>
                        </Form>
                        <Card>
                            <CardItem>
                                <Left />
                                <Body>
                                    <Title style={{color: colors.third}}>OR </Title>
                                </Body>
                                <Right />
                        </CardItem>
                        </Card>
                    </View>
                    : 
                    null
                }


                <Form style={{marginTop: 10, backgroundColor: colors.gray}}>
                    <Item regular>
                        <Input placeholder="Username"
                        onChangeText={username => this.setState({username})}
                        value={this.state.username} />
                    </Item >
                    <Item regular>
                        <Input placeholder="Password"
                        onChangeText={password => this.setState({password})}
                        value={this.state.password}
                        secureTextEntry={true} />
                    </Item>
                    <View style={{padding: 10}}>
                        <Button small style={{backgroundColor: colors.third, height: 30}}
                        onPress={() => this._login()}>
                            <Text style={{fontSize: 11, fontWeight: 'bold', color: colors.white}}>Sign in</Text>
                        </Button>
                    </View>
                </Form>
                <View style={{marginTop: 20, justifyContent: 'center', alignItems: 'center', flex: 1}}>
                         <Button transparent onPress={() => this.props.navigation.navigate('Registration')}>
                             <Text style={{color: colors.primary, fontSize: 12}}>Not Registered? <Text style={{color: colors.secondary}}>Click here</Text></Text>
                         </Button>
                </View>
            </Content>
          </Container>
        );
      }
}

const mapStateToProps = (state)=>{
    return {
        cartItems: state
      }
}

const mapDispatchToProps = (dispatch) => {
    return {
      emptyCart: () => dispatch ({
        type: 'EMPTY_CART', payload: ''
      })
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (LoginScreen)