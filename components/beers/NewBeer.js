import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Form, Label, Input, Item, Button, View, Spinner, ActionSheet, Header, Left, Body, Icon } from 'native-base'
import { light, white, lighter, grey, green, darker, dark } from '../../utils/Colors'
import { get } from '../../utils/Api'
import CText from '../commons/CText'
import { goTo } from '../../utils/NavigationUtils';

export default class NewBeer extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)

    this.state = {
      curBeer: null,
      beerName: '',
      beerType: '',
      beerPrice: '',
      beerId: null,
      msg: '',
      loading: false,
      form: [
        { label: 'Nome da cerveja', field: 'beerName' },
        { label: 'Tipo da cerveja', field: 'beerType' },
        { label: 'Preço', field: 'beerPrice', type: 'number' },
      ],
      selected1: "key1",
      beers: [],
    }

    this.navigation = this.props.navigation;
  }

  async componentDidMount() {
    try {
      let beers = await get('users/me/beers/')

      this.setState({ beers })
    } catch(error) {
      console.log('error on get beers', error)
    }
  }

  async _updateCycle() {
    try {
      this.setState({ loading: true })
      let { cycleId } = this.props;
      let { beerId } = this.state;
      let { beerName, beerType, beerPrice } = this.state;

      beerPrice = parseFloat(beerPrice);

      if (beerId !== null) {
        let result = await get(`cycles/${cycleId}/`, 'patch', { beer: beerId })
      } else {
        let result = await get('beers/new/', 'post', {
          name: beerName,
          type_name: beerType,
          price: beerPrice,
        })

        let newBeerId = result.id;
        result = await get(`cycles/${cycleId}/`, 'patch', { beer: newBeerId })
      }
      this.setState({ loading: false, msg: 'Ciclo atualizado com sucesso' })
    } catch(error) {
      console.log('error on update cycle');
    }
  }

  _updateText = (label, text) => {
    this.setState({ [label]: text })
    if (this.state[label].length) {
      this.setState({ beerId: null })
    }
  }

  _removeSelection() {
    this.setState({ beerId: null })
  }

  render() {
    let { form, beers, beerId, loading, msg } = this.state;
    let { beerName, beerType, beerPrice } = this.state;

    let buttons = beers.map(b => ({ label: `${b.name} (${b.type_name})`, id: b.id }));
    buttons.push({ label: 'Cancelar', id: -1 });
    let cancelButton = buttons.length - 1;

    let curBeer = beers.find(b => b.id === beerId);

    let disabled = beerId === null && (!beerName.length || !beerType.length || !beerPrice.length);

    return (
      <Container>
        <Header
          androidStatusBarColor={darker}
          noShadow={true}
          style={styles.header}
        >
          <Left>
            <Button
              transparent
              onPress={() => goTo(this.navigation, 'Cycle')}
            >
              <Icon name="arrow-back" stlye={{ color: white }} />
            </Button>
          </Left>
          <Body />
        </Header>
        <Content padder contentContainerStyle={styles.content}>
          <CText
            text="Crie ou altere a cerveja deste ciclo"
            style={styles.newBeer}
          />
          <Button
            rounded
            style={{ backgroundColor: light, paddingLeft: 20, paddingRight: 20, alignSelf: 'center', marginTop: 20 }}
            onPress={() =>
              ActionSheet.show(
                {
                  options: buttons.map(b => b.label),
                  cancelButtonIndex: cancelButton,
                  title: "Selecione uma cerveja"
                },
                buttonIndex => {
                  if (buttons[buttonIndex].id !== -1) {
                    this.setState({
                      beerId: buttons[buttonIndex].id,
                      beerName: '',
                      beerType: '',
                      beerPrice: '',
                    });
                  } else {
                    this.setState({ beerId: null });
                  }
                }
              )}
          >
            <CText
              text={beerId !== null ?
                `${curBeer.name} (${curBeer.type_name})` :
                'Selecione uma cerveja existente'}
            />
          </Button>

          {beerId !== null &&
            <Button
              transparent
              onPress={() => this._removeSelection()}
              style={{ alignSelf: 'center' }}
            >
              <CText text="Remover seleção" style={{ color: grey }} />
            </Button>
          }

          <CText text="ou" style={{ textAlign: 'center', marginTop: 20 }} />

          <Form>
            {form.map((f, i) =>
              <Item key={i}>
                <Input
                  placeholder={f.label}
                  value={this.state[f.field]}
                  style={styles.font}
                  keyboardType={f.type === 'number' ? 'numeric' : 'default'}
                  onChangeText={(text) => this._updateText(f.field, text)}
                />
              </Item>
            )}
          </Form>

          <Button
            full
            rounded
            disabled={disabled}
            style={!disabled ? styles.formButton : { marginTop: 50 }}
            onPress={() => this._updateCycle()}
          >
            <CText
              text={ loading ? 'Salvando...' : 'Salvar' }
              style={{ color: white }}
            />
            {loading && <Spinner size="small" color={white} />}
          </Button>

          <CText
            text={msg}
            style={{ color: green, alignSelf: 'center', marginTop: 20 }}
          />
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: dark,
    elevation: 0
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: white,
  },
  font: {
    fontFamily: 'Lato-Regular'
  },
  formButton: {
    marginTop: 50,
    backgroundColor: light
  },
  newBeer: {
    fontSize: 30,
    textAlign: 'center',
    color: lighter,
  },
})