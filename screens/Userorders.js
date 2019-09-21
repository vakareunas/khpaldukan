import React, { Component } from 'react'

import { Container, Content, Card, CardItem, Text, Body, Thumbnail, Left } from "native-base"
import { View, Modal, ActivityIndicator } from 'react-native'

import colors from './assets/Colors'
import axios from 'axios';
import base from './base'

export default class Userorders extends Component {
    constructor(props){
        super(props)
        this.state = {
            order: [],
            loading: false
        }
    }
    static navigationOptions = ({ navigation }) => ({
        title: 'Order details',
         headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
            headerStyle:{
                backgroundColor: colors.third,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontSize: 13
          },
      })
      loadApi (){
          this.setState({loading: true})
          axios.get(`${base}get-user-orders-products/${this.props.navigation.getParam('user')}/${this.props.navigation.getParam('order')}`).then(response => {
                this.setState({order: response.data})
                this.setState({loading: false})
          })
      }
      componentWillMount() {
          this.loadApi()
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
                    {
                        this.state.order.map(v => {
                            return <Card>
                                    <CardItem button>
                                        <Left style={{flex: 2}}>
                                            <Thumbnail source={{uri: `https://www.khpaldukan.com/${v.image}`}} />
                                            <Body>
                                                <Text>{v.product}</Text>
                                                <Text note>Weight: {v.weight}</Text>
                                            </Body>
                                        </Left>
                                        <Body >
                                            <Text style={{color: colors.secondary, fontWeight: 'bold'}}>Price: {v.price}</Text>
                                            <Text note>Qty: {v.quantity}</Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                        })
                    }
                </Content>
            </Container>
        )
    }
}
