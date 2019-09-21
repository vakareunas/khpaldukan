import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem,
 Text, Left, Body, Right, Button, Card, CardItem,
 Tab, Tabs, Form, Item, Input, Textarea } from 'native-base';
 import { View, Modal, ActivityIndicator, AsyncStorage } from 'react-native'

import colors from './assets/Colors'
import axios from 'axios'
import base from './base'

export default class Dashboard extends Component {
    static navigationOptions = {
        header: null
    }
   constructor(props) {
        super(props)
        this.state = {
            loading: false,
            orders: [],
            userId: '',
            fullname: '',
            username: '',
            mobile: '',
            address: '',
            password: ''
        }
   }
   getUserId (){
     AsyncStorage.getItem('user').then(response => {
        this.setState({userId: response})
     }).catch( err => {
         alert('async prob')
         console.log(err)
     })
   }
   loadOrders () {
     this.setState({ loading: true })
     AsyncStorage.getItem('user').then(response => {
        this.setState({userId: response})
        axios.get(`${base}get-user-orders/${response}`).then(response => {
            this.setState({orders: response.data})
            this.setState({ loading: false })
            axios.get(`${base}user-account-setting/${this.state.userId}`).then(response => {
              this.setState({fullname: response.data[0].fullname})
              this.setState({username: response.data[0].username})
              this.setState({mobile: response.data[0].mobile})
              this.setState({address: response.data[0].address})
            })
         })
     }).catch( err => {
         alert('async prob')
         console.log(err)
     })

   }
   logout() {
    AsyncStorage.clear()
    this.props.navigation.navigate('Home')
   }
   editProfile() {
    this.setState({ loading: true })
     axios.put(`${base}update-account-setting/${this.state.userId}`, {
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
   componentWillMount () {
       this.loadOrders()
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

        <Header hasTabs style={{height: 40, backgroundColor: colors.third}} >
          <Right>
            <Button transparent onPress={() => this.logout()}>
                <Text>Logout</Text>
            </Button>
          </Right>
        </Header>
        <Tabs style={{backgroundColor: colors.gray}}
        tabStyle={{backgroundColor: colors.gray}}
        >
          <Tab heading="Orders">
            <Content>
                {
                    this.state.orders.map(v => {
                        return <List key={v.orderid}>
                                <ListItem  button={true} onPress={() => this.props.navigation.navigate('Userorders', {
                                    order: v.orderid,
                                    user: this.state.userId
                                })}>
                                <Left>
                                    <Text style={{fontSize: 11, color: colors.secondary}}>Order Date: </Text>
                                    <Text style={{fontSize: 11, color: colors.secondary}}>{v.orderdate}</Text>
                                </Left>
                                <Body>
                                    <Text style={{color: colors.primary}}>Amount: <Text style={{color: colors.third, fontWeight: 'bold'}}></Text>Rs.{v.orderamount}</Text>
                                    <Text note numberOfLines={1}>Status: {v.status}</Text>
                                </Body>
                                </ListItem>
                            </List>
                    })
                }
            </Content>
          </Tab>
          <Tab heading="Account">
            <Content padder>
                <Card>
                  <CardItem>
                    <Body>
                      <Text>
                        Edit your account
                      </Text>
                      <Text style={{color: colors.primary, fontSize: 12}}>Leave password blank if change is not required</Text>
                    </Body>
                  </CardItem>
                </Card>
                <Form style={{marginTop: 20, backgroundColor: colors.gray}}>
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
                        <Button
                        onPress={()=> this.editProfile()}
                        small style={{backgroundColor: colors.secondary, height: 30}} block>
                            <Text style={{fontSize: 11, fontWeight: 'bold', color: colors.primary}}>Edit Account</Text>
                        </Button>
                    </View>
                </Form>
            </Content>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}