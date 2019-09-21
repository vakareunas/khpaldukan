import React, { Component } from 'react';
import { Image,Modal, View,
  ActivityIndicator } from 'react-native';
import { Container, Content, Card, CardItem, Text, Button, Icon, Left, Body, Right, Badge } from 'native-base';
import HTML from 'react-native-render-html';
import colors from './assets/Colors'
import axios from 'axios'
import base from './base'

export default class LastScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: [],
      loading: false
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.productName}`,
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
    axios.get(`${base}get-product-details/${this.props.navigation.getParam('productId')}`)
          .then(response => {
            const product = response.data
            this.setState({product})
            this.setState({ loading: false })
          }).catch(err => {
            console.log(err)
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
                <Text style={{textAlign: 'center'}}>Loading...</Text>
            </View>
          </View>
        </Modal>

        <Content>
          <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>{this.state.product[0]}</Text>
                  <Text note>{this.state.product[4]}</Text>
                  {
                    this.state.product[5] !== null ?
                    <Badge style={{backgroundColor: colors.secondary, color: colors.white, marginTop: 2}}>
                    <Text>{this.state.product[5]}</Text>
                    </Badge> : <Text></Text>
                  }
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: `https://www.khpaldukan.com/${this.state.product[3]}`}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left style={{flex: 2}}>
              {
                this.state.product[5] !== null ?
                <Text style={{color: colors.secondary, fontWeight: 'bold',textDecorationLine: 'line-through'}}>Rs. {this.state.product[2]}</Text>
                : <Text></Text>
              }
              {
                this.state.product[5] == null ?
                <Text style={{color: colors.secondary, fontWeight: 'bold'}}>Rs. {this.state.product[2]}</Text> 
                :
                <Text style={{color: colors.third, fontWeight: 'bold', marginLeft: 4}}>Rs. {this.state.product[2] - this.state.product[6]}</Text>
                
              }
              </Left>
              <Body style={{flex: 1}}>
              
              </Body>
              <Right style={{flex: 2}}>
                  <Button small style={{backgroundColor: colors.secondary}} block>
                    <Icon style={{color: colors.primary, fontSize: 12}} name="cart" />
                    <Text style={{fontSize: 11, fontWeight: 'bold', color: colors.primary}}>Add to cart</Text>
                  </Button>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
              <HTML html={this.state.product[1]}  />
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
