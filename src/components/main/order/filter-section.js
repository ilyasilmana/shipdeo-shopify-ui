import React from 'react';
import { Button, DatePicker, Form, FormLayout, Select, Popover, TextField } from '@shopify/polaris';
import { Card, CardBody } from '../../common/card';

import styles from './filter-section.module.css';
import conclass from '../../../utils/conclass';

export default class Filter extends React.Component {
  /**
   * @param {Object} props 
   * @param {boolean} props.active
   * @param {Object} props.filterValue
   */
  constructor(props) {
    super(props);

    const dateNow = new Date();

    this.state = {
      month: dateNow.getMonth(),
      year: dateNow.getFullYear(),
      startDate: dateNow,
      endDate: dateNow,
      datePickerShow: false,
    }
  }

  toggleDatePicker = () => {
    this.setState({ datePickerShow: !this.state.datePickerShow });
  }

  setSelectedDates = (date) => {
    this.setState({ startDate: date.start, endDate: date.end});
  }

  onMonthChange = (month, year) => {
    this.setState({ month, year });
  }
  
  render() {
    return (
      <Card className={conclass(styles.filterCard, this.props.active ? styles.show : styles.hide)}>
        <CardBody className="filter-card">
          <Form>
            <FormLayout>
              <FormLayout.Group condensed>
                {/* DATEPICKER */}
                <Popover
                  activator={(
                    <TextField
                      type="text"
                      value={this.state.startDate + ' - ' + this.state.endDate}
                      onChange={() => {}}
                      placeholder={'Start Date - End Date'}
                      connectedRight={(
                        <Button onClick={this.toggleDatePicker}>
                          <img src="/img/dropdown-arrow.png"/>
                        </Button>
                      )}
                    />
                  )}
                  active={this.state.datePickerShow}
                  onClose={this.toggleDatePicker}
                  fluidContent
                  fullHeight
                >
                  <div className={styles.datePickerWrapper}>
                    <DatePicker
                      month={this.state.month}
                      year={this.state.year}
                      onChange={this.setSelectedDates}
                      onMonthChange={this.onMonthChange}
                      selected={{ start: this.state.startDate, end: this.state.endDate }}
                      multiMonth
                      allowRange
                    />
                  </div>
                </Popover>
                {/* STATUS */}
                <Select
                  label=""
                  options={[
                    {label: 'Status', value: 'all'},
                  ]}
                  onChange={(value) => console.log(value)}
                  value={'all'}
                />
                {/* PAYMENT METHOD */}
                <Select
                  label=""
                  options={[
                    {label: 'Payment Method', value: 'all'},
                  ]}
                  onChange={(value) => console.log(value)}
                  value={'all'}
                />
                {/* SORTING */}
                <Select
                  label=""
                  options={[
                    {label: 'Sort By', value: 'all'},
                  ]}
                  onChange={(value) => console.log(value)}
                  value={'all'}
                />
                <div className="filter-apply">
                  <Button>Apply</Button>
                </div>
              </FormLayout.Group>
            </FormLayout>
          </Form>
        </CardBody>
      </Card>
    );
  }
}