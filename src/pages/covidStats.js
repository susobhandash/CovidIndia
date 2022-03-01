import React from 'react';
import NumberFormat from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp, faCircleDown } from '@fortawesome/free-regular-svg-icons'

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
        let host = window.location.host;

        fetch("https://" + host + "/sites/default/files/covid/covid_state_counts_ver1.json?timestamp=" + timestamp)
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
                            <div className='small-text'>{item.helpline}</div>
                        </div>
                    </span>
                    <span className='confirmed'>
                        <span>
                            <NumberFormat value={item.total} displayType={'text'} thousandSeparator={true} className='bold'/>
                            <div className='pl-5 small-text'>
                                <span className={item.diff_total > 0 ? 'death' : 'recovered'}>
                                    {
                                        item.diff_total > 0 ?
                                            <FontAwesomeIcon icon={faCircleUp} size="md" className="death" /> :
                                            <FontAwesomeIcon icon={faCircleDown} size="md" className="recovered" />
                                    }
                                    <span className='pl-5'>
                                        {item.diff_total}
                                    </span>
                                </span>
                            </div>
                        </span>
                    </span>
                    <span className='active'>
                        <span>
                            <NumberFormat value={item.active} displayType={'text'} thousandSeparator={true} className='bold' />
                            <div className='pl-5 small-text'>
                                <span className={item.diff_active > 0 ? 'recovered' : 'death'}>
                                    {
                                        item.diff_active > 0 ?
                                            <FontAwesomeIcon icon={faCircleUp} size="md" className="recovered" /> :
                                            <FontAwesomeIcon icon={faCircleDown} size="md" className="death" />
                                    }
                                    <span className='pl-5'>
                                        {item.diff_active}
                                    </span>
                                </span>
                            </div>
                        </span>
                    </span>
                    <span className='recovered'>
                        <span>
                            <NumberFormat value={item.recovered} displayType={'text'} thousandSeparator={true} className='bold' />
                            <div className='pl-5 small-text'>
                                <span className={item.diff_recovered > 0 ? 'recovered' : 'death'}>
                                    {
                                        item.diff_recovered > 0 ?
                                            <FontAwesomeIcon icon={faCircleUp} size="md" className="recovered" /> :
                                            <FontAwesomeIcon icon={faCircleDown} size="md" className="death" />
                                    }
                                    <span className='pl-5'>
                                        {item.diff_recovered}
                                    </span>
                                </span>
                            </div>
                        </span>
                    </span>
                    <span className='death'>
                        <span>
                            <NumberFormat value={item.death} displayType={'text'} thousandSeparator={true} className='bold' />
                            <div className='pl-5 small-text'>
                                <span className={item.diff_death > 0 ? 'death' : 'recovered'}>
                                    {
                                        item.diff_death > 0 ?
                                            <FontAwesomeIcon icon={faCircleUp} size="md" className="death" /> :
                                            <FontAwesomeIcon icon={faCircleDown} size="md" className="recovered" />
                                    }
                                    <span className='pl-5'>
                                        {item.diff_death}
                                    </span>
                                </span>
                            </div>
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
                        <span className='confirmed'>Total</span>
                        <span className='active'>Active</span>
                        <span className='recovered'>Recovered</span>
                        <span className='death'>Deceased</span>
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