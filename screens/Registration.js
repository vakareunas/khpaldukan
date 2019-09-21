import React, { Component } from 'react'
import { Container, Title, Content, Button, Textarea, Text, Card, CardItem, Body, Form, Item, Input } from 'native-base'
import { View, Modal, ActivityIndicator } from 'react-native'
import colors from './assets/Colors'
import axios from 'axios'
import base from './base'

export default class Registration extends Component {
    static navigationOptions = {
        title: 'Registration',
        headerStyle:{
            backgroundColor: colors.third,
      },
      headerTintColor: colors.white
    }
    constructor(props) {
        super(props)
        this.state = {
            fullname: '',
            username: '',
            mobile: '',
            address: '',
            password: '',
            loading: false
        }
    }
    registration() {
        this.setState({ loading: true })
        axios.post(`${base}create-mobile-useraccount`, {
        fullname: this.state.fullname,
        email: this.state.username,
        password: this.state.password,
        mobile: this.state.mobile,
        address: this.state.address
        }).then( response => {
        this.setState({ loading: false })
        alert(response.data)
        })
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
                <Card>
                    <CardItem>
                        <Body>
                            <Title style={{color: colors.third}}>Create Account </Title>
                        </Body>
                    </CardItem>
                </Card>
                <Content padder>
                <Form style={{marginTop: 60, backgroundColor: colors.gray}}>
                    <Item regular>
                        <Input onChangeText={fullname => this.setState({fullname})} value={this.state.fullname} placeholder="Full Name" />
                    </Item>
                    <Item regular>
                        <Input
                        onChangeText={username => this.setState({username})}
                        value={this.state.username} placeholder="Email" keyboardType="email-address" />
                    </Item>
                    <Item regular>
                        <Input
                        onChangeText={password => this.setState({password})}
                        value={this.state.password} placeholder="Password" />
                    </Item>
                    <Item regular>
                        <Input
                        onChangeText={mobile => this.setState({mobile})}
                        value={this.state.mobile} placeholder="Mobile" keyboardType="numeric" />
                    </Item>
                    <Item regular>
                        <Textarea
                        onChangeText={address => this.setState({address})}
                        value={this.state.address} style={{width: '100%'}} rowSpan={3} bordered placeholder="Delivery Address" />
                    </Item>
                    <View>
                        <Button small style={{backgroundColor: colors.secondary, height: 30}} block
                        onPress={()=> this.registration()}>
                            <Text style={{fontSize: 11, fontWeight: 'bold', color: colors.primary}}>Create Account</Text>
                        </Button>
                    </View>
                </Form>
                
                </Content>
                <View style={{marginTop: 20}}>
                        <Text style={{textAlign: 'center'}} onPress={() => this.props.navigation.navigate('Login')}>Already have account?   <Text style={{color: colors.secondary}}>Sign here</Text>
                       
                        </Text>
                </View>
            </Content>
          </Container>
        );
      }
}