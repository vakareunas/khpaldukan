
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Modal,
  ActivityIndicator } from 'react-native'
import { Container, Header, Left, Body, Right,
Button, Icon, Badge, Item, Input,
DeckSwiper, Card, CardItem, Content, Thumbnail , Accordion, Title} from 'native-base';

import axios from 'axios'

import base from './base'

import Swiper from 'react-native-swiper';

import colors from './assets/Colors'

import { connect } from 'react-redux'

import NumericInput from 'react-native-numeric-input'

import Slideshow from 'react-native-image-slider-show'


class HomeScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        bundle: [],
        categories: [],
        slider: [],
        cards: [],
        position: 1,
        logo: '',
        interval: null,
        cartBundle: {},
        search: '',
        cartQty: 1,
        loading: false,
        cartModal: false
      }
       navigate = props.navigation.navigate;
    }
    componentDidMount() {
      this.setState({ loading: true })
      axios.get(`${base}get-bundle-products`).then(response => {
          const bundle = response.data
          this.setState({bundle})
          axios.get(`${base}get-categories`).then(response => {
            const categories = response.data
            this.setState( {categories} )
            axios.get(`${base}get-slider`).then(response => {
              const cards = response.data
              this.setState({ cards })
              this.setState({ loading : false })
              this.setState({
                interval: setInterval(() => {
                  this.setState({
                    position: this.state.position === this.state.cards.length ? 0 : this.state.position + 1
                  });
                }, 2000)
              });
            })
          })
      }).catch(err => {
        console.log('An err in bundle ' + err)
      })
      
    }

    componentWillUnmount() {
      clearInterval(this.state.interval);
    }
    
    static navigationOptions = {
      header: null,
    };
    _renderHeader(item, expanded) {
      return (       
        <Card>
          <CardItem>
            <Left>
                <Thumbnail source={{uri: `https://www.khpaldukan.com/${item.icon}`}} />
                
              </Left>
              <Body style={{flex: 3}}>
              <Text style={{fontWeight: 'bold', color: colors.primary}}>
                {item.category}
                </Text>
              </Body>
            <Right>
              {expanded
            ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
            : <Icon style={{ fontSize: 18 }} name="add-circle" />}
            </Right>
          </CardItem>
        </Card>
      );
  }
  _renderContent(item) {
    return (
      <View style={{padding: 5, flex: 1, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: colors.gray}}>
        {item.subcategory.map(v => {
          return <TouchableOpacity style={{width: 150 , height: 50, padding: 4}} key={v.subcatid}
          onPress={() => navigate('Products', {
            subcatid: v.subcatid,
            product: v.subcategory
          })}
                  >
                    <Text style={{fontWeight: 'bold'}}>
                      {v.subcategory}
                    </Text>
                  </TouchableOpacity>
        })}
      </View>
    );
  }
  addtoCart(bund) {
    this.setState({ cartModal: true })
    this.setState({ cartBundle: {
        id: bund.pid,
        product: bund.title,
        img: bund.mediumimage,
        price: bund.price,
        weight: bund.weight ? bund.weight : null,
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
   handleSearch () {
        this.props.navigation.navigate('Search', {
          search: this.state.search
        })
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

          <View style={{backgroundColor: colors.primary, borderBottomColor: colors.secondary, borderBottomWidth: 2}}>
            <Text style={{textAlign: 'center', color: colors.white, padding: 2, fontSize: 11}}>Delivery only in Hayatabad</Text>
          </View>
          <Header style={{backgroundColor: colors.third, height: 40}} iosBarStyle="dark-content" androidStatusBarColor="#232f3e" noShadow>
            <Left style={{flex: 1}}>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body style={{flex: 2}}>
                <Image style={{ width: 160, height: 80 }}
                  resizeMode="contain" source={{uri: 'https://www.khpaldukan.com/public/img/khpaldukan-mob.png'}} />
            </Body>
            <Right style={{flex: 1}}>
              <Button transparent
                onPress={() => this.props.navigation.navigate('Cart')}
              >
                <View style={{
                  position: 'absolute',
                  backgroundColor: 'rgba(211, 84, 0, 0.8)',
                  top: 5,
                  zIndex: 100,
                  width: 25, height: 25, borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: colors.white, fontWeight: 'bold'}}>{this.props.cartItem}</Text>
                </View>
                <Icon name='cart' />
              </Button>
            </Right>
          </Header>
          <Header style={{backgroundColor: colors.third, height: 45}} searchBar rounded>
          <Body style={{felx: 1, backgroundColor: colors.white}}>
            <Item>
              <Input 
              onChangeText={(search) => this.setState({search})}
              style={{backgroundColor: colors.white, height: 40}} placeholder="Search" />
              <Icon name="search" style={{paddingLeft: 4}} onPress={() => this.handleSearch()} />
            </Item>
          </Body>
        </Header>

        <Content>
          <View style={{ height: 200}}>
            <Slideshow 
                dataSource={this.state.cards}
                position={this.state.position}
                onPositionChanged={position => this.setState({ position })}/>
          </View>
          <View style={{ height: 340}}>
            <View style={{height: 50, backgroundColor: colors.gray, marginTop: 5}}>
                <Text style={{color: colors.primary, fontSize: 16, fontWeight: 'bold', padding: 12}}>Bunddle Offers</Text>
            </View>
            <Swiper showsButtons={true} autoplay={true} showsPagination={false} autoplayTimeout={4}>
              
              { this.state.bundle.map( bund => {
                  return  <Card key={bund.pid}>
                              <CardItem>
                                <Left style={{flex: 1}}>
                                  <Body>
                                    <Text style={{color: colors.primary, fontWeight: 'bold'}}> {bund.title } </Text>
                                  </Body>
                                </Left>
                              </CardItem>
                              <CardItem cardBody>
                                <Left></Left>
                                <Body style={{flex: 2}}>
                                  <Image source={{uri: `https://www.khpaldukan.com/${bund.mediumimage}`}} style={{height: 120, width: 200}}/>
                                </Body>
                                <Right style={{flex: 2}}></Right>
                              </CardItem>
                              <CardItem style={{marginTop: 10}}>
                                <Left style={{flex: 1}}>
                                  <Text style={{color: colors.secondary, fontWeight: 'bold'}}>Rs. {bund.price}</Text>
                                </Left>
                                <Body style={{flex: 2}}>
                                  <Button small style={{backgroundColor: colors.secondary}} block
                                  onPress={() => this.addtoCart(bund)}>
                                    <Icon style={{color: colors.primary}} name="cart" />
                                    <Text>Add to cart</Text>
                                  </Button>
                                </Body>
                                <Right />
                              </CardItem>
                          </Card>
                })
              }
            </Swiper>
        </View>
        <View style={{height: 50, backgroundColor: colors.gray, marginTop: 5}}>
            <Text style={{color: colors.primary, fontSize: 16, fontWeight: 'bold', padding: 12}}>Categories</Text>
        </View>
        <View style={{ flex: 1, marginTop: 8}}>
        <Accordion
            dataArray={this.state.categories}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </View>
      </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
      cartItem: state.length,
      cartItemQty: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      addItemToCart: (product) => dispatch ({
        type: 'ADD_TO_CART', payload: product
      })
    }
}
  export default connect (mapStateToProps, mapDispatchToProps) (HomeScreen)