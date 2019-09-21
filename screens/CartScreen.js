import React, { Component } from 'react'
import { View, Text, Alert  } from 'react-native'
import { Container, Thumbnail, Content, Card, Icon, Button, CardItem, Body, Left, Right } from 'native-base'

import colors from './assets/Colors'

import { connect } from 'react-redux'
import NumericInput from 'react-native-numeric-input'

class CartScreen extends Component {
    static navigationOptions = {
        title: 'My Cart',
        headerStyle:{
            backgroundColor: colors.third,
      },
      headerTintColor: colors.white
    }
    constructor (props) {
        super(props)
        this.state = {
            carts: []
        }
    }
    deleteCart(id, name) {
        //this.props.removeCartItem(id)
        Alert.alert(
            'Do you really want to remove?',
            name,
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'OK', onPress: () =>this.props.removeCartItem(id)},
            ],
            {cancelable: false},
          );
    }
    updateQuantity(val, id) {
        let obj = {
            id: id,
            val: val
        }
        this.props.updateQty(obj)
    }
    findQty(id) {
        let qty
         this.props.cartItems.find(v => {
             if ( v.id == id ) {
               qty =  v.qty
             }
         })
         return qty
    }
    
    render() {
        return (
          <Container style={{flex: 1}}>
                <Card transparent>
                    <CardItem>
                        <Left>
                            <Text style={{color: colors.primary}}>Total</Text>
                        </Left>
                        <Body>
                            
                        </Body>
                        <Right>
                            <Text style={{color: colors.third, fontWeight: 'bold'}}>Rs. {this.props.cartItems.reduce((a, b) => +a + (b.price * b.qty), 0)}</Text>
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>Delivery</Text>
                        </Left>
                        <Body>

                        </Body>
                        <Right>
                            <Text style={{color: '#27ae60'}}>Free</Text>
                        </Right>
                    </CardItem>
                </Card>
                <Content style={{flex: .8}}>
                    {
                        this.props.cartItems.map(v => {
                            return <Card key={v.id}>
                            <CardItem>
                            <Left>
                                <Thumbnail source={{uri: `https://www.khpaldukan.com/${v.img}`}} />
                                <Body>
                                <Text style={{color: colors.primary, fontSize: 12}}>{v.product}</Text>
                                <Text note style={{fontSize: 11}}>Qty: {v.qty}</Text>
                                </Body>
                            </Left>
                            </CardItem>
                            <CardItem>
                            <Left style={{flex: 2}}>
                                
                                <Text style={{color: colors.secondary, fontWeight: 'bold'}}>Rs. {v.price * v.qty}</Text> 
                                
                            </Left>
                            <Body style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                                <NumericInput
                                    inputStyle={{backgroundColor: colors.white}}
                                    minValue={1}
                                    value={ this.findQty(v.id) ? this.findQty(v.id) : v.qty }
                                    borderColor="#ff9900"
                                    totalHeight={30}
                                    iconStyle={{ color: colors.white }} 
                                    rightButtonBackgroundColor='#ff9900' 
                                    leftButtonBackgroundColor='#ff9900'
                                    onChange={value => this.updateQuantity(value, v.id)} />
                            </Body>
                            <Right style={{flex: 1}}>
                                <Button small style={{backgroundColor: colors.primary}}
                                onPress={() => this.deleteCart(v.id, v.product) }>
                                    <Text style={{color: colors.white, padding: 4, fontSize: 11}}>Remove</Text>
                                </Button>
                            </Right>
                            </CardItem>
                        </Card>
                        })
                    }
                </Content>

                <View style={{flex: .1, padding: 20}}>
                    <Button block style={{backgroundColor: colors.primary, padding: 5}} onPress={()=> this.props.navigation.navigate('Login')}>
                    <Text style={{flex: 3, color: colors.white, marginLeft: 4}}>Procced to Checkout</Text>
                    <Text style={{flex: 1, color: colors.white}}>Rs. {this.props.cartItems.reduce((a, b) => +a + (b.price * b.qty), 0)} <Icon style={{color: colors.white, fontSize: 14}} name="md-checkmark" /></Text>
                    </Button>
                </View>
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
      removeCartItem: (product) => dispatch ({
        type: 'REMOVE_FROM_CART', payload: product
      }),
      updateQty: (product) => dispatch ({
          type: 'UPDATE_QTY', payload: product
      })
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (CartScreen)