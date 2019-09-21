import React, { Component } from 'react';
import { Text, Modal, View, Image,
  ActivityIndicator } from 'react-native'
import { Container, Header, Tab, Tabs, ScrollableTab, Card, CardItem, Content,
  Thumbnail, Icon, Left, Body, Right, Button, Badge } from 'native-base';
import colors from './assets/Colors'

import base from './base'
import axios from 'axios';

import { connect } from 'react-redux'

import NumericInput from 'react-native-numeric-input'
class SearchScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          products: [],
          cart: [],
          loading: false,
          cartBundle: {},
          cartQty: 1,
          loading: false,
          cartModal: false
        }
      }
      static navigationOptions = ({ navigation }) => ({
        title: `Search result for ${navigation.state.params.search}`,
         headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
            headerStyle:{
                backgroundColor: colors.third,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontSize: 13
          },
      })

      componentWillMount() {
        this.setState({ loading: true })
        axios.get(`${base}mobile-search?product=${this.props.navigation.getParam('search')}`)
              .then(response => {
                //console.warn(response.data)
                const products = response.data
                this.setState({products})
                this.setState({ loading: false })
              }).catch(err => {
                console.log(err)
        })
      }
      addtoCart(bund) {
        this.setState({ cartModal: true })
        this.setState({ cartBundle: {
            id: bund.pid,
            product: bund.product,
            img: bund.image,
            price: bund.offer !== null ? bund.price : bund.price - bund.offervalue,
            weight: bund.weight,
            qty: this.state.cartQty}
          })
      }
      continueShopping () {
        this.setState({ cartModal: false })
        this.setState( {cartQty: 1} )
        this.props.addItemToCart({
          id: this.state.cartBundle.id,
          product: this.state.cartBundle.product,
          img: this.state.cartBundle.img,
          price: this.state.cartBundle.price,
          weight: this.state.cartBundle.weight,
          qty: this.state.cartQty
          })
      }
      proceed () {
        this.props.addItemToCart({
          id: this.state.cartBundle.id,
          product: this.state.cartBundle.product,
          img: this.state.cartBundle.img,
          price: this.state.cartBundle.price,
          weight: this.state.cartBundle.weight,
          qty: this.state.cartQty
        })
        this.setState({ cartModal: false })
        this.props.navigation.navigate('Login')
      }
      findQty(id) {
        let qty
         this.props.cartItemQty.find(v => {
             if ( v.id == id ) {
               qty =  v.qty
             }
         })
         return qty
       }

       render() {
        return (
          <Container>
    
                <Modal
                        transparent={true}
                        animationType={'slide'}
                        visible={this.state.cartModal}
                        >
                        <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                            <View style={{
                                    width: '100%',
                                    height: 300,
                                    position: 'absolute',
                                    bottom: 0,
                                    backgroundColor: colors.gray}}>
                            <Header style={{backgroundColor: colors.third, height: 40}}>
                                <Body style={{flex: 1}}>
                                    <Text style={{color: colors.white, fontSize: 12, textAlign: 'center'}}>{this.state.cartBundle.product}</Text>
                                </Body>
                            </Header>
                            <Content>
                                <Text style={{textAlign: 'center', padding: 5, marginTop: 5, color: colors.primary}}>You have added <Text style={{color: colors.secondary}}>{this.state.cartBundle.product}</Text> to your cart <Icon style={{fontSize: 14}} name='cart' /></Text>
                                <View style={{justifyContent: 'center',
                                        alignItems: 'center',}}>
                                <Image source={{uri: `https://www.khpaldukan.com/${this.state.cartBundle.img}`}} style={{height: 100, width: 120, padding: 8, marginBottom: 5}}/>
                                <NumericInput
                                    inputStyle={{backgroundColor: colors.white}}
                                    minValue={1}
                                    value={ this.findQty(this.state.cartBundle.id) ? this.findQty(this.state.cartBundle.id) : this.state.cartQty }
                                    borderColor="#ff9900"
                                    iconStyle={{ color: colors.white }} 
                                    rightButtonBackgroundColor='#ff9900' 
                                    leftButtonBackgroundColor='#ff9900'
                                    onChange={value => this.setState({cartQty: value})} />
                                </View>
                                <View style={{flexDirection: 'row', flex: 1, marginTop: 10, padding: 5}}>
                                    <Left style={{flex: 1, padding: 8}}>
                                        <Button block small style={{backgroundColor: colors.third}}
                                        onPress={() => this.continueShopping() }
                                        >
                                        <Text style={{color: colors.white}}><Icon name="cart" style={{fontSize: 14}} /> Continue shopping</Text>
                                        </Button>
                                    </Left>
                                    <Right style={{flex: 1, padding: 8}}>
                                        <Button block small style={{backgroundColor: colors.third}}
                                        onPress={() => this.proceed()}
                                        >
                                        <Text style={{color: colors.white}}><Icon name="md-checkmark" style={{fontSize: 14}} /> Proceed to checkout</Text>
                                        </Button>
                                    </Right>
                                </View>
                            </Content>
                            </View>
                        </View>
                        </Modal>
                
                
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
                                <Text style={{textAlign: 'center'}}>Loading...</Text>
                            </View>
                        </View>
                        </Modal>

                        <Content>
                        {
                              this.state.products.map(v => {
                                return <Card key={v.pid}>
                                          <CardItem button onPress={() => this.props.navigation.navigate('Detail', {
                                            productId: v.pid,
                                            productName: v.product
                                          })}>
                                            <Left>
                                              <Thumbnail source={{uri: `https://www.khpaldukan.com/${v.image}`}} />
                                              <Body>
                                                <Text style={{color: colors.primary, fontWeight: 'bold'}}>{v.product}</Text>
                                                <Text note style={{fontSize: 11}}>{v.weight}</Text>
                                                {
                                                  v.offer !== null ?
                                                  <Badge style={{backgroundColor: colors.secondary, color: colors.white, marginTop: 2}}>
                                                  <Text>{v.offername}</Text>
                                                  </Badge> : <Text></Text>
                                                }
                                              </Body>
                                            </Left>
                                          </CardItem>
                                          <CardItem>
                                            <Left style={{flex: 1}}>
                                              {
                                                v.offer !== null ?
                                                <Text style={{color: colors.secondary, fontWeight: 'bold',textDecorationLine: 'line-through'}}>Rs. {v.price}</Text>
                                                : <Text></Text>
                                              }
                                              {
                                                v.offer == null ?
                                                <Text style={{color: colors.secondary, fontWeight: 'bold'}}>Rs. {v.price}</Text> 
                                                :
                                                <Text style={{color: colors.third, fontWeight: 'bold', marginLeft: 4}}>Rs. {v.price - v.offervalue}</Text>
                                                
                                              }
                                            </Left>
                                            <Body style={{flex: 1}}>
                                                
                                            </Body>
                                            <Right style={{flex: 2}}>
                                              <Button small style={{backgroundColor: colors.secondary}}
                                              onPress={() => this.addtoCart(v)}
                                              block>
                                                <Icon style={{color: colors.primary, fontSize: 12}} name="cart" />
                                                <Text style={{fontSize: 11, fontWeight: 'bold'}}>Add to cart</Text>
                                              </Button>
                                            </Right>
                                          </CardItem>
                                        </Card>
                            
                              })
                            } 
                        </Content>
                    </Container>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      addItemToCart: (product) => dispatch ({
        type: 'ADD_TO_CART', payload: product
      })
    }
  }
  
  const mapStateToProps = (state)=>{
    return {
        cartItemQty: state
      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)