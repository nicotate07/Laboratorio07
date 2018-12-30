import React, { Component } from 'react';
import { ToastAndroid, Button, StyleSheet, Text, TextInput, Picker, View, Switch, CheckBox, Slider } from 'react-native';

function Resultado(props) {
	function calcularTasa(dias, monto) {
		tasas = [0.25, 0.275, 0.3, 0.323, 0.35, 0.385]
		if (dias < 30) {
			if (monto <= 5000) return (tasas[0]);
			if (monto <= 99999) return (tasas[2]);
			if (monto > 99999) return (tasas[4]);
		}
		if (dias >= 30) {
			if (monto <= 5000) return (tasas[1]);
			if (monto <= 99999) return (tasas[3]);
			if (monto > 99999) return (tasas[5]);
		}
	}
	function intereses(dias, monto) {
		ret = 0.0
		i = calcularTasa(dias, monto)
		ret = monto * (Math.pow((1 + i), (dias / 360.0)) - 1)
		return ret
	}
	resultado = intereses(props.plazo, props.monto)
	return <Text>Intereses ${resultado}</Text>
}

export default class AppBanco extends Component {
	constructor(props) {
		super(props);
		this.state = {
			moneda: 1,
			capitalInicial: 0,
			capitalFinal: 0,
			CUIT: '00-00000000-0',
			Monto: '0',
			Dias: 10,
			avisarMail: false,
			aceptoCondiciones: false
		};
		this.hacerPlazoFijo = this.hacerPlazoFijo.bind(this);
	}
	hacerPlazoFijo() {
		ToastAndroid.show('El plazo fijo se realizó exitosamente', ToastAndroid.LONG);
	}

	textoCUIT(text) {
		newtext = ""
		for(var index=0;index<text.length;index++){
			var c = text[index]
			if((c>='0' && c<='9') || c=='-') newtext = newtext + c
		}
		this.setState({ CUIT: newtext })
	}
	numRacional(text) {
		newtext = ""
		tieneComa = false
		for(var index=0;index<text.length;index++){
			var c = text[index]
			if(c == '.' && !tieneComa){
				newtext = newtext + c
				tieneComa = true
			}
			else if(c>='0' && c<='9') newtext = newtext + c
		}
		this.setState({ Monto: newtext })
	}

	refresh() {
		this.forceUpdate()
	}
	render() {
		return (
			<View style={styles.container}>
				<Text>Correo Electronico</Text>
				<TextInput keyboardType="email-address">correo@mail.com</TextInput>
				<Text>CUIT / CUIL</Text>
				<TextInput
					keyboardType="numeric"
					onChangeText={(text) => this.textoCUIT(text)}
					value={this.state.CUIT}
				>
				</TextInput>
				<Text>Moneda</Text>
				<Picker style={{ width: 200 }}
					selectedValue={this.state.moneda}
					onValueChange={(valor) => this.setState({ moneda: valor })}>
					<Picker.Item label="Dolar" value="1" />
					<Picker.Item label="Pesos ARS" value="2" />
				</Picker>
				<Text>Monto a invertir</Text>
				<TextInput
					keyboardType="numeric"
					onChangeText={(text) => this.numRacional(text)}
					value={this.state.Monto}
				></TextInput>
				<Text>Dias</Text>
				<Slider
					minimumValue={10}
					maximumValue={170}
					step={1}
					value={this.state.Dias}
					style={{ width: '100%' }}
					onValueChange={(val) => this.setState({ Dias: val })}
				/>
				<Text>{this.state.Dias} dias de plazo</Text>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Text>Avisar por mail antes del vencimiento</Text>
					<Switch
						value={this.state.avisarMail}
						onValueChange={(val) => this.setState({ avisarMail: val })} />
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Text>Aceptar Terminos y Condiciones</Text>
					<CheckBox value={this.state.aceptoCondiciones}
						onValueChange={(val) => this.setState({ aceptoCondiciones: val })}
					/>
				</View>
				<View style={{flex: 1,width:'100%'}}>
					<Button title="Hacer Plazo Fijo"
						color="#FF0000"
						onPress={this.hacerPlazoFijo}
						style= {{flex: 1}}
						disabled = {!this.state.aceptoCondiciones}
						/>
						<Resultado style={{flex: 1}} monto={this.state.Monto} plazo={this.state.Dias} />
				</View>
				
			</View>);
	}



}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start', backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	}
});