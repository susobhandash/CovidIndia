import React from 'react';
import NumberFormat from 'react-number-format';

class CovidStats extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            items: [],
            updated_on: ''
        }
    }

    fetchRemoteItems() {
        const timestamp = Math.floor(Date.now() / 1000);

        fetch("http://localhost:5000/sites/default/files/covid/covid_state_counts_ver1.json?timestamp=" + timestamp)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
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

    setItems(result) {
        let states = result['Name of State / UT'];
        let stateData = [];
        Object.keys(states).forEach((idx) => {
            let itemToPush = {
                name: result['Name of State / UT'][idx],
                abbr: result['abbreviation_code'][idx],
                name_hindi: result['states_name_hi'][idx],
                covid_facilities: result['covid_facilities'][idx],
                covid_portal: result['covid_portal_url'][idx],
                helpline: result['state_helpline'][idx],
                total: result['Total Confirmed cases'][idx],
                active: result['Active'][idx],
                death: result['Death'][idx],
                recovered: result['Cured/Discharged/Migrated'][idx],
                diff_total: result['diff_confirmed_covid_cases'][idx],
                diff_active: result['diff_active_covid_cases'][idx],
                diff_death: result['diff_death'][idx],
                diff_recovered: result['diff_cured_discharged'][idx],
            };

            stateData.push(itemToPush);
        });

        this.setState({
            isLoaded: true,
            items: stateData,
            updated_on: result['updated_on']
        });
    }

    componentDidMount() {
        this.fetchRemoteItems();
    }

    render() {
        let lists = [];

        if (this.state.isLoaded) {
            lists = this.state.items.map((item) =>
                <div key={item.abbr} className='grid-row'>
                    <span className='state-name'>
                        <div>
                            (<a href={item.covid_portal} target="_blank" rel="noopener noreferrer">{item.abbr}</a>) {item.name}
                        </div>
                    </span>
                    <span>
                        <span>
                            <NumberFormat value={item.total} displayType={'text'} thousandSeparator={true} />
                            (<span>{item.diff_total}</span>)
                        </span>
                    </span>
                    <span>
                        <span>
                            <NumberFormat value={item.active} displayType={'text'} thousandSeparator={true} />
                            (<span>{item.diff_active}</span>)
                        </span>
                    </span>
                    <span>
                        <span>
                            <NumberFormat value={item.recovered} displayType={'text'} thousandSeparator={true} />
                            (<span>{item.diff_recovered}</span>)
                        </span>
                    </span>
                    <span>
                        <span>
                            <NumberFormat value={item.death} displayType={'text'} thousandSeparator={true} />
                            (<span>{item.diff_death}</span>)
                        </span>
                    </span>
                </div>
            );
        }

        return (
            <div>
                <div className='grid grid-header'>
                    <div className='grid-row'>
                        <span className='state-name'>State</span>
                        <span>Total</span>
                        <span>Active</span>
                        <span>Recovered</span>
                        <span>Deceased</span>
                    </div>
                </div>
                <div className='grid'>
                    {lists}
                </div>
            </div>
        )
    }
}

export default CovidStats;