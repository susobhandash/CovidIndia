import React from 'react';
import NumberFormat from 'react-number-format';

class VaccineCount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            items: [],
            countryInfo: {}
        }
    }

    setItems(vaccineData) {
        let countryInfo = {
            dose1: vaccineData.india_dose1,
            dose2: vaccineData.india_dose2,
            state: 'India',
            dose1_15_18: vaccineData.india_dose1_15_18,
            dose2_15_18: vaccineData.india_dose2_15_18,
            total_doses: vaccineData.india_total_doses
        };
        var items = [];
        vaccineData.vacc_st_data.forEach((item) => {
            let newItem = {
                dose1: item.dose1,
                dose2: item.dose2,
                state: item.st_name,
                dose1_15_18: item.dose1_15_18,
                dose2_15_18: item.dose2_15_18,
                total_doses: item.total_doses
            }
            items.push(newItem)
        });
        this.setState({
            isLoaded: true,
            items: items,
            countryInfo: countryInfo
        });
    }

    fetchRemoteItems() {
        const timestamp = Math.floor(Date.now() / 1000);
        let host = window.location.host;

        fetch("https://" + host + "/sites/default/files/covid/vaccine/vaccine_counts_today.json?timestamp=" + timestamp)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setItems(result);
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        this.fetchRemoteItems();
    }

    render() {
        let lists = [];
        let countryInfo;
        if (this.state.isLoaded) {
            lists = this.state.items.map((item) =>
                <div key={item.state} className='grid-row'>
                    <span className='state-name'>{item.state}</span>
                    <span><NumberFormat  value={item.dose1} displayType={'text'} thousandSeparator={true} /></span>
                    <span><NumberFormat  value={item.dose2} displayType={'text'} thousandSeparator={true} /></span>
                    <span><NumberFormat  value={item.dose1_15_18} displayType={'text'} thousandSeparator={true} /></span>
                    <span><NumberFormat  value={item.dose2_15_18} displayType={'text'} thousandSeparator={true} /></span>
                    <span><NumberFormat  value={item.total_doses} displayType={'text'} thousandSeparator={true} /></span>
                </div>
            );

            countryInfo =
                <div className='grid-row'>
                    <span className='state-name'>{this.state.countryInfo.state}</span>
                    <span><NumberFormat  value={this.state.countryInfo.dose1} displayType={'text'} thousandSeparator={true} /></span>
                    <span><NumberFormat  value={this.state.countryInfo.dose2} displayType={'text'} thousandSeparator={true} /></span>
                    <span><NumberFormat  value={this.state.countryInfo.dose1_15_18} displayType={'text'} thousandSeparator={true} /></span>
                    <span><NumberFormat  value={this.state.countryInfo.dose2_15_18} displayType={'text'} thousandSeparator={true} /></span>
                    <span><NumberFormat  value={this.state.countryInfo.total_doses} displayType={'text'} thousandSeparator={true} /></span>
                </div>
        }
        return (
            <div>
                <div className='grid grid-header'>
                    <div className='grid-row'>
                        <span className='state-name'>State</span>
                        <span>Dose 1</span>
                        <span>Dose 2</span>
                        <span>15-18 Dose 1</span>
                        <span>15-18 Dose 2</span>
                        <span>Total</span>
                    </div>
                </div>
                <div className='grid'>
                    {lists}
                </div>
                <div className='grid grid-footer'>
                    {countryInfo}
                </div>
            </div>
        );
    }
}

export default VaccineCount;