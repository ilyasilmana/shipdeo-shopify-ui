import React from 'react';

export default class TrackingHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  renderList = () => {
    const mapped = this.props.data.map((val) => {
      return {
        ...val,
        date: val.date_time.split(' ')[0],
      };
    });

    let current = '';
    return mapped.map((val, i) => {
      const currentDate = (current === val.date) ? '' : val.date;
      current = val.date;
      return (
        <div key={i} className="tracking-item">
          <div>{currentDate}</div>
          <div>{val.city || val.receiver_name}</div>
          <div>{val.status}</div>
        </div>
      )
    });
  }

  render() {
    return (
      <div className="tracking-history">
        {this.renderList()}
      </div>
    );
  }
}
